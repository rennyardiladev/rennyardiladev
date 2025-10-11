"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Globe } from "lucide-react"

interface LanguageSelectorProps {
  className?: string
  variant?: "default" | "compact"
}

export default function LanguageSelector({ className = "", variant = "default" }: LanguageSelectorProps) {
  const [currentLanguage, setCurrentLanguage] = useState('es')

  useEffect(() => {
    // Get current language from localStorage
    const savedLanguage = localStorage.getItem('language') || 'es'
    setCurrentLanguage(savedLanguage)
  }, [])

  const switchLanguage = (newLanguage: string) => {
    setCurrentLanguage(newLanguage)
    localStorage.setItem('language', newLanguage)

    // Dispatch custom event to notify other components
    window.dispatchEvent(new CustomEvent('languageChange', { detail: newLanguage }))
  }

  if (variant === "compact") {
    return (
      <button
        className={`text-white/80 hover:text-white p-2 rounded-md hover:bg-white/20 transition-colors ${className}`}
        onClick={() => switchLanguage(currentLanguage === 'es' ? 'en' : 'es')}
        aria-label={`Cambiar a ${currentLanguage === 'es' ? 'inglés' : 'español'}`}
        title={`Cambiar a ${currentLanguage === 'es' ? 'inglés' : 'español'}`}
      >
        <Globe className="w-4 h-4" />
      </button>
    )
  }

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <button
        onClick={() => switchLanguage('es')}
        className={`px-3 py-1 rounded-md text-sm transition-colors ${
          currentLanguage === 'es'
            ? 'bg-white/20 text-white border border-white/30'
            : 'text-white/80 border border-white/30 hover:bg-white/10'
        }`}
      >
        Español
      </button>
      <button
        onClick={() => switchLanguage('en')}
        className={`px-3 py-1 rounded-md text-sm transition-colors ${
          currentLanguage === 'en'
            ? 'bg-white/20 text-white border border-white/30'
            : 'text-white/80 border border-white/30 hover:bg-white/10'
        }`}
      >
        English
      </button>
    </div>
  )
}