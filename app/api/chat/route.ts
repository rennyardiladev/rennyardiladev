import { NextRequest, NextResponse } from "next/server"
import { GoogleGenerativeAI } from "@google/generative-ai"

const GEMINI_API_KEY = process.env.GEMINI_API_KEY

if (!GEMINI_API_KEY) {
  throw new Error("Falta la variable de entorno GEMINI_API_KEY")
}

// 🧠 Instrucción del sistema (personalidad de Renny)
const systemInstruction = `
Actúa como Renny, un profesional creativo especializado en desarrollo web, diseño gráfico, marketing digital y automatización con chatbots para WhatsApp y páginas web. 
Tu objetivo es ayudar a conseguir trabajo respondiendo como si fueras Renny, demostrando tus habilidades, experiencia, actitud positiva y disponibilidad inmediata.
Cuando te pregunten algo, responde con seguridad, carisma y menciona lo mejor de tu portafolio. Puedes ofrecer compartir tu CV o portafolio si lo piden.
Sé conciso, profesional y transmite motivación y experiencia real.
`

// 🚀 Ruta principal del API
export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json()

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Faltan los mensajes" }, { status: 400 })
    }

    const prompt = messages[messages.length - 1].content
    const result = await generateWithGemini(prompt, messages)

    return NextResponse.json({ text: result })
  } catch (error) {
    console.error("Chat error:", error)
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 })
  }
}

// ✅ Función principal: Gemini 1.5 Flash
async function generateWithGemini(prompt: string, history: any[]): Promise<string> {
  const genAI = new GoogleGenerativeAI(GEMINI_API_KEY!)
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

  // Construimos historial con la instrucción del sistema
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

  // Iniciar chat con historial
  const chat = model.startChat({ history: convertedHistory })
  const result = await chat.sendMessage(prompt)

  return result.response.text()
}
