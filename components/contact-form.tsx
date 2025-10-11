"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Mail, Send } from "lucide-react"

export default function ContactForm() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Basic validation
    if (!name || !email || !message) {
      alert("Por favor, rellena todos los campos.")
      setIsSubmitting(false)
      return
    }

    // Simulate API call
    setTimeout(() => {
      console.log("Formulario enviado:", { name, email, message })
      alert("¡Mensaje enviado con éxito! Me pondré en contacto contigo pronto.")
      setName("")
      setEmail("")
      setMessage("")
      setIsSubmitting(false)
    }, 1500)
  }

  return (
    <Card className="bg-black/20 backdrop-blur-md border-white/20 shadow-xl max-w-lg mx-auto">
      <CardHeader className="text-center">
        <Mail className="w-10 h-10 text-white/80 mx-auto mb-4" />
        <CardTitle className="text-white text-2xl">Envíame un Mensaje</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="sr-only">
              Nombre
            </label>
            <Input
              id="name"
              type="text"
              placeholder="Tu Nombre"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-white/10 border-white/30 text-white placeholder:text-white/60 focus:ring-purple-500 focus:border-purple-500"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="sr-only">
              Email
            </label>
            <Input
              id="email"
              type="email"
              placeholder="Tu Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white/10 border-white/30 text-white placeholder:text-white/60 focus:ring-purple-500 focus:border-purple-500"
              required
            />
          </div>
          <div>
            <label htmlFor="message" className="sr-only">
              Mensaje
            </label>
            <Textarea
              id="message"
              placeholder="Tu Mensaje"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={5}
              className="bg-white/10 border-white/30 text-white placeholder:text-white/60 focus:ring-purple-500 focus:border-purple-500 resize-y"
              required
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white shadow-lg flex items-center gap-2"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Enviando..." : "Enviar Mensaje"}
            <Send className="w-4 h-4" />
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
