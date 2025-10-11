"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Sun, Moon, Star, CloudRain } from "lucide-react"
import { cn } from "@/lib/utils"

interface MobileNavProps {
  timeOfDayBackgrounds: {
    name: string
    gradient: string
    time: string
    elements: string
    textColor: string
    sectionId: string
  }[]
  scrollToSection: (sectionId: string) => void
  textColor: string
}

export default function MobileNav({ timeOfDayBackgrounds, scrollToSection, textColor }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false)

  const handleNavigationClick = (sectionId: string) => {
    scrollToSection(sectionId)
    setIsOpen(false) // Cierra el menú después de navegar
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className={cn("text-white", textColor)}>
          <Menu className="w-6 h-6" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-[250px] sm:w-[300px] bg-black/80 backdrop-blur-lg border-l border-white/20 p-6"
      >
        <nav className="flex flex-col gap-6 pt-10">
          {timeOfDayBackgrounds.map((item, index) => (
            <button
              key={item.sectionId}
              onClick={() => handleNavigationClick(item.sectionId)}
              className="text-white text-lg font-medium hover:text-purple-400 transition-colors flex items-center gap-3"
            >
              {item.sectionId === "hero" && <Sun className="w-5 h-5 text-orange-400" />}
              {item.sectionId === "sobre-mí" && <Sun className="w-5 h-5 text-yellow-400" />}
              {item.sectionId === "habilidades" && <CloudRain className="w-5 h-5 text-blue-300" />}
              {item.sectionId === "proyectos" && <Moon className="w-5 h-5 text-yellow-200" />}
              {item.sectionId === "contacto" && <Star className="w-5 h-5 text-white" />}
              {item.name}
            </button>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  )
}
