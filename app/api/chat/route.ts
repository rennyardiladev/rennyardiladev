import { NextRequest, NextResponse } from "next/server"
import { GoogleGenerativeAI } from "@google/generative-ai"

const GEMINI_API_KEY = process.env.GEMINI_API_KEY
const GROQ_API_KEY = process.env.GROQ_API_KEY
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY
const HF_API_KEY = process.env.HF_API_KEY

if (!GEMINI_API_KEY || !GROQ_API_KEY || !OPENROUTER_API_KEY || !HF_API_KEY) {
  throw new Error("Faltan una o más variables de entorno necesarias")
}

const systemInstruction = `
Actúa como Renny, un profesional creativo especializado en desarrollo web, diseño gráfico, marketing digital y automatización con chatbots para WhatsApp y páginas web. 
Tu objetivo es ayudar a conseguir trabajo respondiendo como si fueras Renny, demostrando tus habilidades, experiencia, actitud positiva y disponibilidad inmediata.
Cuando te pregunten algo, responde con seguridad, carisma y menciona lo mejor de tu portafolio. Puedes ofrecer compartir tu CV o portafolio si lo piden.
Sé conciso, profesional y transmite motivación y experiencia real.
`

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json()

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Faltan los mensajes" }, { status: 400 })
    }

    const prompt = messages[messages.length - 1].content
    const result = await fallbackGenerate(prompt, messages)

    return NextResponse.json({ text: result })
  } catch (error) {
    console.error("Chat error:", error)
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 })
  }
}

// 🔁 IA Fallback con prioridad: Gemini → Groq → OpenRouter → HuggingFace
async function fallbackGenerate(prompt: string, history: any[]): Promise<string> {
  const providers = [tryGemini, tryGroq, tryOpenRouter, tryHuggingFace]

  for (const fn of providers) {
    try {
      const result = await fn(prompt, history)
      if (result) return result
    } catch (err) {
      console.warn("Error en proveedor:", err)
    }
  }

  throw new Error("Todas las IAs fallaron")
}

// ✅ GEMINI (con systemInstruction inyectado)
async function tryGemini(prompt: string, history: any[]): Promise<string> {
  const genAI = new GoogleGenerativeAI(GEMINI_API_KEY!)
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

  // 👇 Inyectar systemInstruction como primer mensaje
  const convertedHistory = [
    {
      role: "user",
      parts: [{ text: systemInstruction }],
    },
    ...history
      .filter((m) => m.role === "user" || m.role === "assistant")
      .map((msg) => ({
        role: msg.role === "assistant" ? "model" : "user",
        parts: [{ text: msg.content }],
      })),
  ]

  const chat = model.startChat({ history: convertedHistory })

  const result = await chat.sendMessage(prompt)
  return result.response.text()
}

// ✅ GROQ
async function tryGroq(prompt: string, history: any[]): Promise<string> {
  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${GROQ_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "llama3-8b-8192",
      messages: [
        { role: "system", content: systemInstruction },
        ...history,
      ],
      temperature: 0.7,
      max_tokens: 2048,
    }),
  })

  const data = await response.json()
  return data.choices?.[0]?.message?.content || "Respuesta vacía de Groq"
}

// ✅ OPENROUTER
async function tryOpenRouter(prompt: string, history: any[]): Promise<string> {
  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${OPENROUTER_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "meta-llama/llama-3-8b-instruct:nitro",
      messages: [
        { role: "system", content: systemInstruction },
        ...history,
      ],
    }),
  })

  const data = await response.json()
  return data.choices?.[0]?.message?.content || "Respuesta vacía de OpenRouter"
}

// ✅ HuggingFace (sin historial)
async function tryHuggingFace(prompt: string): Promise<string> {
  const response = await fetch("https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.1", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${HF_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ inputs: `${systemInstruction}\n\n${prompt}` }),
  })

  const data = await response.json()
  if (typeof data === "string") return data
  if (Array.isArray(data) && data[0]?.generated_text) return data[0].generated_text

  throw new Error("Respuesta inválida de HuggingFace")
}
