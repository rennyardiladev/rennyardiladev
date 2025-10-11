"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send, X, Bot, User, Languages, Globe } from "lucide-react"
import { cn } from "@/lib/utils"
import LanguageSelector from "@/components/language-selector"

interface Message {
  role: "user" | "assistant"
  content: string
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showWelcomeBubble, setShowWelcomeBubble] = useState(false) // New state for the welcome bubble
  const [currentTip, setCurrentTip] = useState("") // Current tip to display
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Tips in both languages
  const tips: { [key: string]: string[] } = {
    es: [
      "¡Hola! ¿Te puedo ayudar en algo?",
      "¿Necesitas ayuda con desarrollo web?",
      "¡Pregúntame sobre diseño gráfico!",
      "¿Quieres saber más sobre chatbots?",
      "¡Estoy aquí para asistirte!",
      "¿Tienes dudas sobre programación?",
      "¡Puedo ayudarte con tu proyecto!",
      "¿Quieres consejos de marketing digital?"
    ],
    en: [
      "Hello! Can I help you with something?",
      "Do you need help with web development?",
      "Ask me about graphic design!",
      "Want to know more about chatbots?",
      "I'm here to assist you!",
      "Do you have programming questions?",
      "I can help you with your project!",
      "Want digital marketing tips?"
    ]
  }

  // Get current language from localStorage or default to Spanish
  const getCurrentLanguage = () => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('language') || 'es'
    }
    return 'es'
  }

  const [currentLanguage, setCurrentLanguage] = useState(getCurrentLanguage())

  // Language switching function
  const switchLanguage = (newLanguage: string) => {
    setCurrentLanguage(newLanguage)
    localStorage.setItem('language', newLanguage)
    // Update current tip when language changes
    const currentTips = tips[newLanguage] || tips.es
    const randomTip = currentTips[Math.floor(Math.random() * currentTips.length)]
    setCurrentTip(randomTip)
  }

  // Welcome messages in both languages
  const welcomeMessages: { [key: string]: string } = {
    es: "¡Hola! Soy tu asistente. Pregúntame sobre desarrollo web, diseño gráfico o chatbots.",
    en: "Hello! I'm your assistant. Ask me about web development, graphic design or chatbots."
  }

  // Error messages in both languages
  const errorMessages: { [key: string]: string } = {
    es: "Lo siento, hubo un error al procesar tu solicitud.",
    en: "Sorry, there was an error processing your request."
  }

  // Chatbot titles in both languages
  const chatbotTitles: { [key: string]: string } = {
    es: "Asistente DevMarketing",
    en: "DevMarketing Assistant"
  }

  // Input placeholders in both languages
  const inputPlaceholders: { [key: string]: string } = {
    es: "Escribe tu mensaje...",
    en: "Type your message..."
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Listen for language changes from other components
  useEffect(() => {
    const handleLanguageChange = (event: CustomEvent) => {
      const newLanguage = event.detail
      setCurrentLanguage(newLanguage)
      // Update current tip when language changes
      const currentTips = tips[newLanguage] || tips.es
      const randomTip = currentTips[Math.floor(Math.random() * currentTips.length)]
      setCurrentTip(randomTip)
    }

    window.addEventListener('languageChange', handleLanguageChange as EventListener)

    return () => {
      window.removeEventListener('languageChange', handleLanguageChange as EventListener)
    }
  }, [])

  // Effect to show the welcome bubble after a delay on initial load
  useEffect(() => {
    // Select a random tip based on current language
    const currentTips = tips[currentLanguage] || tips.es
    const randomTip = currentTips[Math.floor(Math.random() * currentTips.length)]
    setCurrentTip(randomTip)

    // Show bubble after random delay between 2-5 seconds
    const randomDelay = 2000 + Math.random() * 3000

    const timer = setTimeout(() => {
      if (!isOpen) {
        // Only show if chatbot is not already open
        setShowWelcomeBubble(true)
      }
    }, randomDelay)

    // Hide the bubble automatically after some time if not interacted with
    const autoHideTimer = setTimeout(() => {
      setShowWelcomeBubble(false)
    }, 12000) // Hide after 12 seconds

    return () => {
      clearTimeout(timer)
      clearTimeout(autoHideTimer)
    }
  }, []) // Empty dependency array means it runs only once on mount

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim() === "") return

    const newMessage: Message = { role: "user", content: input }
    setMessages((prevMessages) => [...prevMessages, newMessage])
    setInput("")
    setIsLoading(true)
    setShowWelcomeBubble(false) // Hide welcome bubble when user sends a message

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: [...messages, newMessage] }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      const assistantMessage: Message = { role: "assistant", content: data.text }
      setMessages((prevMessages) => [...prevMessages, assistantMessage])
    } catch (error) {
      console.error("Error sending message:", error)
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: "assistant", content: errorMessages[currentLanguage] || errorMessages.es },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const handleOpenChatbot = () => {
    setIsOpen(true)
    setShowWelcomeBubble(false) // Hide welcome bubble when chatbot is opened
  }

  const handleCloseChatbot = () => {
    setIsOpen(false)
    // The welcome bubble will not reappear immediately after closing, only on a new page load
  }

  const handleDismissWelcomeBubble = () => {
    setShowWelcomeBubble(false)
    sessionStorage.setItem("hasShownChatbotWelcome", "true") // Mark as dismissed for this session
  }

  return (
    <>
      {/* Welcome Bubble (appears when chatbot is closed) */}
      {!isOpen && showWelcomeBubble && (
        <div className="fixed bottom-24 right-6 z-50 animate-fade-in">
          {" "}
          {/* Position above the button */}
          <div className="bg-purple-50 text-purple-800 p-3 rounded-lg shadow-md max-w-[180px] text-sm relative flex items-center justify-between gap-2">
            <span>{currentTip}</span>
            <button
              className="h-6 w-6 text-purple-600 hover:bg-purple-100 rounded-md"
              onClick={handleDismissWelcomeBubble}
              aria-label="Cerrar notificación"
            >
              <X className="w-4 h-4" />
            </button>
            {/* Small triangle/tail to make it look like a speech bubble */}
            <div className="absolute bottom-0 right-3 w-0 h-0 border-x-8 border-x-transparent border-t-8 border-t-purple-50 translate-y-full"></div>
          </div>
        </div>
      )}

      {/* Chatbot Toggle Button */}
      {!isOpen && (
        <Button
          className="fixed bottom-6 right-6 rounded-full p-4 shadow-lg bg-purple-600 hover:bg-purple-700 transition-all duration-300 z-50"
          onClick={handleOpenChatbot} // Use the new handler
          aria-label="Abrir Chatbot"
        >
          <Bot className="w-6 h-6 text-white" />
        </Button>
      )}

      {/* Chatbot Modal */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-80 h-[500px] bg-white rounded-lg shadow-xl flex flex-col z-50 border border-gray-200">
          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-600 to-indigo-700 text-white rounded-t-lg">
            <h3 className="font-semibold flex items-center gap-2">
              <Bot className="w-5 h-5" />
              {chatbotTitles[currentLanguage] || chatbotTitles.es}
            </h3>
            <div className="flex items-center gap-2">
              <LanguageSelector variant="compact" />
              <button className="hover:bg-white/20 rounded-md p-1" onClick={handleCloseChatbot} aria-label="Cerrar Chatbot">
                <X className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
            {messages.length === 0 && (
              <div className="flex justify-center mt-10">
                <div className="max-w-[70%] p-3 rounded-lg shadow-sm bg-purple-50 text-purple-800 text-center">
                  {welcomeMessages[currentLanguage] || welcomeMessages.es}
                </div>
              </div>
            )}
            {messages.map((msg, index) => (
              <div
                key={index}
                className={cn("flex items-start gap-3", msg.role === "user" ? "justify-end" : "justify-start")}
              >
                {msg.role === "assistant" && (
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                    <Bot className="w-4 h-4" />
                  </div>
                )}
                <div
                  className={cn(
                    "max-w-[70%] p-3 rounded-lg shadow-sm",
                    msg.role === "user"
                      ? "bg-blue-500 text-white rounded-br-none"
                      : "bg-gray-100 text-gray-800 rounded-bl-none",
                  )}
                >
                  {msg.content}
                </div>
                {msg.role === "user" && (
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex items-start gap-3 justify-start">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="max-w-[70%] p-3 rounded-lg shadow-sm bg-gray-100 text-gray-800 rounded-bl-none">
                  <div className="flex space-x-1">
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.4s" }}
                    ></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200 flex gap-2">
            <Input
              type="text"
              placeholder={inputPlaceholders[currentLanguage] || inputPlaceholders.es}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1"
              disabled={isLoading}
            />
            <button
              type="submit"
              className="h-10 w-10 rounded-md bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              disabled={isLoading}
            >
              <Send className="w-4 h-4 text-white" />
            </button>
          </form>
        </div>
      )}
    </>
  )
}
