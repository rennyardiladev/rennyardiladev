import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
  throw new Error("Falta la variable de entorno GEMINI_API_KEY");
}

// 🧠 Personalidad base del chatbot (Renny)
const baseInstruction = `
Actúa como Renny, un profesional creativo especializado en desarrollo web, diseño gráfico, marketing digital y automatización con chatbots para WhatsApp y páginas web.
Tu objetivo es ayudar a conseguir trabajo respondiendo como si fueras Renny, demostrando tus habilidades, experiencia, actitud positiva y disponibilidad inmediata.
Sé conciso, profesional y transmite motivación, experiencia real y respuestas cortas de máximo 7 palabras.
`;

/**
 * Detecta si el texto está principalmente en inglés o español.
 */
function detectarIdioma(text: string): "es" | "en" {
  const englishWords = text.match(/\b(the|and|is|are|you|for|work|hello|job|project)\b/gi)?.length || 0;
  const spanishWords = text.match(/\b(el|la|de|y|es|para|hola|trabajo|proyecto|gracias)\b/gi)?.length || 0;
  return englishWords > spanishWords ? "en" : "es";
}

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Faltan los mensajes" }, { status: 400 });
    }

    const prompt = messages[messages.length - 1].content;
    const idioma = detectarIdioma(prompt);

    const result = await generateWithGemini(prompt, messages, idioma);

    return NextResponse.json({ text: result });
  } catch (error) {
    console.error("Chat error:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}

// ✅ Función principal con detección de idioma y fallback automático
async function generateWithGemini(prompt: string, history: any[], idioma: "es" | "en"): Promise<string> {
  const genAI = new GoogleGenerativeAI(GEMINI_API_KEY!);

  let model;
  try {
    model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
  } catch {
    model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-latest" });
  }

  // 🧩 Contexto multilingüe
  const systemInstruction =
    idioma === "en"
      ? `${baseInstruction}\nRespond in fluent, natural English with charisma.`
      : `${baseInstruction}\nResponde en español natural y profesional.`;

  const conversation = `
${systemInstruction}

Historial:
${history
  .map((msg) => `${msg.role === "assistant" ? "Renny" : "Usuario"}: ${msg.content}`)
  .join("\n")}

Usuario: ${prompt}
`;

  try {
    const result = await model.generateContent(conversation);
    return result.response.text();
  } catch (error: any) {
    console.error("Gemini API error:", error);

    // ⚡ Reintenta automáticamente con el modelo alternativo si 404
    if (String(error).includes("404")) {
      const altModel = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });
      const result = await altModel.generateContent(conversation);
      return result.response.text();
    }

    throw error;
  }
}
