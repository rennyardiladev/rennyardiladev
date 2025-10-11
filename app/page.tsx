"use client"

import { useState, useEffect, useRef } from "react"
import {
  ArrowRight,
  Code,
  TrendingUp,
  Github,
  Linkedin,
  ExternalLink,
  ChevronDown,
  Zap,
  Target,
  Palette,
  Database,
  Smartphone,
  BarChart3,
  Sun,
  Moon,
  Star,
  Instagram,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import Chatbot from "@/components/chatbot" // Importar el componente Chatbot
import MobileNav from "@/components/mobile-nav" // Importar el nuevo componente de navegación móvil
import ContactForm from "@/components/contact-form" // Importar el nuevo componente de formulario de contacto
import LanguageSelector from "@/components/language-selector" // Importar el selector de idioma

export default function Portfolio() {
  const [isVisible, setIsVisible] = useState(false)
  const [currentTimeOfDay, setCurrentTimeOfDay] = useState(0) // Index del momento del día actual
  const [currentLanguage, setCurrentLanguage] = useState('es') // Estado del idioma actual

  // Referencias a las secciones para el IntersectionObserver
  const sectionRefs = useRef<(HTMLElement | null)[]>([])

  // Diferentes fondos y elementos para cada momento del día, mapeados a secciones
  const timeOfDayBackgrounds = [
    {
      name: "Amanecer",
      gradient: "from-pink-300 via-orange-200 to-yellow-100",
      time: "05:00 - 08:59",
      elements: "sunrise",
      textColor: "text-orange-900",
      sectionId: "hero",
    },
    {
      name: "Mediodía",
      gradient: "from-blue-400 via-cyan-300 to-yellow-200",
      time: "09:00 - 15:59",
      elements: "noon",
      textColor: "text-blue-900",
      sectionId: "sobre-mí",
    },
    {
      name: "Tarde Lluviosa", // Nuevo nombre
      gradient: "from-gray-700 via-blue-800 to-purple-900", // Nuevo gradiente para lluvia
      time: "16:00 - 19:59",
      elements: "rainy-afternoon", // Nuevo tipo de elemento
      textColor: "text-white", // Color de texto para fondo oscuro
      sectionId: "habilidades",
    },
    {
      name: "Noche",
      gradient: "from-indigo-900 via-purple-800 to-blue-900",
      time: "20:00 - 00:59",
      elements: "night",
      textColor: "text-white",
      sectionId: "proyectos",
    },
    {
      name: "Madrugada",
      gradient: "from-gray-900 via-black to-gray-900",
      time: "01:00 - 04:59",
      elements: "deep-night",
      textColor: "text-white",
      sectionId: "contacto",
    },
  ]

  useEffect(() => {
    setIsVisible(true)

    // Get current language from localStorage
    const savedLanguage = localStorage.getItem('language') || 'es'
    setCurrentLanguage(savedLanguage)

    // Asigna las referencias a los elementos de las secciones
    sectionRefs.current = timeOfDayBackgrounds.map((bg) => document.getElementById(bg.sectionId))

    // Configura el IntersectionObserver
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Si la sección está visible en al menos un 10%
          if (entry.isIntersecting && entry.intersectionRatio >= 0.1) {
            const sectionId = entry.target.id
            const index = timeOfDayBackgrounds.findIndex((bg) => bg.sectionId === sectionId)
            if (index !== -1) {
              setCurrentTimeOfDay(index) // Actualiza el momento del día al índice de la sección visible
            }
          }
        })
      },
      { threshold: 0.1 }, // Umbral de visibilidad para activar el cambio
    )

    // Observa cada sección
    sectionRefs.current.forEach((section) => {
      if (section) {
        observer.observe(section)
      }
    })

    // Limpieza del observador al desmontar el componente
    return () => {
      sectionRefs.current.forEach((section) => {
        if (section) {
          observer.unobserve(section)
        }
      })
    }
  }, []) // Se ejecuta solo una vez al montar

  // Listen for language changes from LanguageSelector
  useEffect(() => {
    const handleLanguageChange = (event: CustomEvent) => {
      setCurrentLanguage(event.detail)
    }

    window.addEventListener('languageChange', handleLanguageChange as EventListener)

    return () => {
      window.removeEventListener('languageChange', handleLanguageChange as EventListener)
    }
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    element?.scrollIntoView({ behavior: "smooth" })
  }

  const currentBackground = timeOfDayBackgrounds[currentTimeOfDay]

  // Content translations
  const content: { [key: string]: any } = {
    es: {
      navItems: ["Inicio", "Sobre mí", "Habilidades", "Proyectos", "Contacto"],
      availableForProjects: "Disponible para proyectos",
      mainTitle: "Desarrollo & Marketing",
      subtitle: "Combino código limpio con estrategias de marketing efectivas, diseño gráfico impactante y la implementación de chatbots e IA para crear experiencias digitales que no solo funcionan, sino que también convierten y cautivan.",
      viewProjects: "Ver Proyectos",
      contact: "Contactar",
      aboutTitle: "Sobre Mí",
      aboutSubtitle: "La intersección perfecta entre tecnología y estrategia comercial",
      developerTitle: "Desarrollador Full-Stack",
      developerDescription: "Especializado en React, Next.js, Node.js y tecnologías modernas. Creo aplicaciones web escalables y performantes con las mejores prácticas de la industria.",
      developerTech: ["React", "Next.js", "TypeScript", "Node.js", "Chatbots"],
      marketingTitle: "Experto en Marketing Digital",
      marketingDescription: "Estrategias de marketing digital, SEO, SEM, analytics y conversión. Transformo visitantes en clientes a través de experiencias optimizadas.",
      marketingTech: ["SEO/SEM", "Analytics", "CRO", "Social Media", "Diseño Gráfico", "Aumento de Seguidores"],
      skillsTitle: "Habilidades",
      skillsSubtitle: "Tecnologías y herramientas que domino",
      developmentTitle: "Desarrollo",
      developmentFeatures: ["Frontend & Backend", "Responsive Design", "UI/UX Design", "Performance"],
      developmentSkills: ["JavaScript", "TypeScript", "React", "Next.js", "Node.js", "Python", "PostgreSQL", "MongoDB", "Chatbots"],
      marketingSkillTitle: "Marketing",
      marketingFeatures: ["Analytics & Data", "Growth Hacking", "Conversion Rate", "Automation"],
      marketingSkills: ["Google Ads", "Facebook Ads", "SEO", "Email Marketing", "Content Strategy", "A/B Testing", "Google Analytics", "HubSpot", "Diseño Gráfico", "Aumento de Seguidores"],
      projectsTitle: "Proyectos Destacados",
      projectsSubtitle: "Casos de éxito donde desarrollo y marketing se unen",
      projects: [
        {
          title: "E-commerce Platform",
          description: "Plataforma completa con +300% aumento en conversiones",
          tech: ["Next.js", "Stripe", "SEO"],
          metrics: "300% ↑ Conversiones",
        },
        {
          title: "SaaS Dashboard",
          description: "Dashboard analítico con estrategia de growth integrada",
          tech: ["React", "D3.js", "Analytics"],
          metrics: "150% ↑ Retención",
        },
        {
          title: "Marketing Automation",
          description: "Sistema de automatización que redujo CAC en 60%",
          tech: ["Node.js", "APIs", "Email"],
          metrics: "60% ↓ CAC",
        },
      ],
      contactTitle: "¿Listo para el siguiente nivel?",
      contactSubtitle: "Combinemos desarrollo y marketing para crear algo extraordinario. Hablemos de tu proyecto.",
      startProject: "Iniciar Proyecto",
      footer: "© 2025 RennyArdila. Desarrollo con ❤️ y mucho café.",
    },
    en: {
      navItems: ["Home", "About", "Skills", "Projects", "Contact"],
      availableForProjects: "Available for projects",
      mainTitle: "Development & Marketing",
      subtitle: "I combine clean code with effective marketing strategies, impactful graphic design and chatbot and AI implementation to create digital experiences that not only work, but also convert and captivate.",
      viewProjects: "View Projects",
      contact: "Contact",
      aboutTitle: "About Me",
      aboutSubtitle: "The perfect intersection between technology and business strategy",
      developerTitle: "Full-Stack Developer",
      developerDescription: "Specialized in React, Next.js, Node.js and modern technologies. I create scalable and performant web applications with industry best practices.",
      developerTech: ["React", "Next.js", "TypeScript", "Node.js", "Chatbots"],
      marketingTitle: "Digital Marketing Expert",
      marketingDescription: "Digital marketing strategies, SEO, SEM, analytics and conversion. I transform visitors into customers through optimized experiences.",
      marketingTech: ["SEO/SEM", "Analytics", "CRO", "Social Media", "Graphic Design", "Follower Growth"],
      skillsTitle: "Skills",
      skillsSubtitle: "Technologies and tools I master",
      developmentTitle: "Development",
      developmentFeatures: ["Frontend & Backend", "Responsive Design", "UI/UX Design", "Performance"],
      developmentSkills: ["JavaScript", "TypeScript", "React", "Next.js", "Node.js", "Python", "PostgreSQL", "MongoDB", "Chatbots"],
      marketingSkillTitle: "Marketing",
      marketingFeatures: ["Analytics & Data", "Growth Hacking", "Conversion Rate", "Automation"],
      marketingSkills: ["Google Ads", "Facebook Ads", "SEO", "Email Marketing", "Content Strategy", "A/B Testing", "Google Analytics", "HubSpot", "Graphic Design", "Follower Growth"],
      projectsTitle: "Featured Projects",
      projectsSubtitle: "Success cases where development and marketing unite",
      projects: [
        {
          title: "E-commerce Platform",
          description: "Complete platform with +300% increase in conversions",
          tech: ["Next.js", "Stripe", "SEO"],
          metrics: "300% ↑ Conversions",
        },
        {
          title: "SaaS Dashboard",
          description: "Analytics dashboard with integrated growth strategy",
          tech: ["React", "D3.js", "Analytics"],
          metrics: "150% ↑ Retention",
        },
        {
          title: "Marketing Automation",
          description: "Automation system that reduced CAC by 60%",
          tech: ["Node.js", "APIs", "Email"],
          metrics: "60% ↓ CAC",
        },
      ],
      contactTitle: "Ready for the next level?",
      contactSubtitle: "Let's combine development and marketing to create something extraordinary. Let's talk about your project.",
      startProject: "Start Project",
      footer: "© 2025 RennyArdila. Development with ❤️ and lots of coffee.",
    },
  }

  const currentContent = content[currentLanguage] || content.es

  // Componente para renderizar elementos del cielo según el momento del día
  const SkyElements = () => {
    const elements = currentBackground.elements

    if (elements === "sunrise") {
      return (
        <>
          {/* Sol del amanecer */}
          <div className="absolute top-[10vh] right-[10vw] animate-pulse">
            <Sun className="w-16 h-16 text-orange-400 drop-shadow-lg" />
          </div>
          {/* Nubes del amanecer */}
          <div className="absolute top-[15vh] left-[10vw] opacity-60">
            <div className="w-20 h-8 bg-white/30 rounded-full"></div>
          </div>
          <div className="absolute top-[20vh] right-[20vw] opacity-40">
            <div className="w-16 h-6 bg-white/20 rounded-full"></div>
          </div>
        </>
      )
    }

    if (elements === "noon") {
      return (
        <>
          {/* Sol del mediodía */}
          <div className="absolute top-[5vh] right-1/3 animate-spin" style={{ animationDuration: "20s" }}>
            <Sun className="w-20 h-20 text-yellow-400 drop-shadow-xl" />
          </div>
          {/* Nubes blancas */}
          <div className="absolute top-[12vh] left-[5vw] opacity-70">
            <div className="w-24 h-10 bg-white/40 rounded-full"></div>
          </div>
          <div className="absolute top-[8vh] left-1/2 opacity-50">
            <div className="w-18 h-8 bg-white/30 rounded-full"></div>
          </div>
          <div className="absolute top-[18vh] right-[10vw] opacity-60">
            <div className="w-22 h-9 bg-white/35 rounded-full"></div>
          </div>
        </>
      )
    }

    if (elements === "rainy-afternoon") {
      // Nuevo caso para tarde lluviosa
      return (
        <>
          {/* Nubes de lluvia */}
          <div className="absolute top-[5vh] left-[25vw] w-64 h-24 bg-gray-600/50 rounded-full blur-md"></div>
          <div className="absolute top-[10vh] right-[33vw] w-80 h-32 bg-gray-700/60 rounded-full blur-md"></div>
          <div className="absolute top-[0vh] left-[50vw] w-72 h-28 bg-gray-500/40 rounded-full blur-md"></div>

          {/* Gotas de lluvia */}
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="raindrop"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`, // Retraso aleatorio para cada gota
                animationDuration: `${1.5 + Math.random() * 1}s`, // Duración aleatoria para velocidad
              }}
            />
          ))}
        </>
      )
    }

    if (elements === "night") {
      return (
        <>
          {/* Luna */}
          <div className="absolute top-[8vh] right-[12vw] animate-pulse">
            <Moon className="w-14 h-14 text-yellow-200 drop-shadow-lg" />
          </div>
          {/* Estrellas - Más estrellas y ajustes de tamaño/opacidad */}
          {Array.from({ length: 30 }).map((_, i) => (
            <div
              key={`night-star-${i}`}
              className="absolute animate-twinkle"
              style={{
                top: `${Math.random() * 80}vh`,
                left: `${Math.random() * 90}vw`,
                animationDelay: `${Math.random() * 3}s`,
                opacity: `${0.5 + Math.random() * 0.5}`, // Opacidad variada
              }}
            >
              <Star
                className={`w-${Math.floor(Math.random() * 3) + 2} h-${Math.floor(Math.random() * 3) + 2} text-white fill-white`}
              />
            </div>
          ))}
        </>
      )
    }

    if (elements === "deep-night") {
      return (
        <>
          {/* Estrellas muy tenues para la madrugada - Más estrellas y ajustes de tamaño/opacidad */}
          {Array.from({ length: 40 }).map((_, i) => (
            <div
              key={`deep-night-star-${i}`}
              className="absolute opacity-20 animate-twinkle"
              style={{
                top: `${Math.random() * 90}vh`,
                left: `${Math.random() * 95}vw`,
                animationDelay: `${Math.random() * 4}s`,
                opacity: `${0.1 + Math.random() * 0.2}`, // Opacidad muy tenue
              }}
            >
              <Star
                className={`w-${Math.floor(Math.random() * 2) + 1} h-${Math.floor(Math.random() * 2) + 1} text-white fill-white`}
              />
            </div>
          ))}
        </>
      )
    }

    return null
  }

  return (
    <div
      className={`main-scroll-container bg-gradient-to-br ${currentBackground.gradient} transition-all duration-1000 ease-in-out`}
    >
      {/* Elementos del cielo (fijos en la ventana, no se desplazan con el contenido) */}
      <div className="fixed inset-0 pointer-events-none z-10">
        <SkyElements />
      </div>

      {/* Navegación (fija en la ventana) */}
      <nav className="fixed top-0 w-full z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className={`${currentBackground.textColor} font-bold text-xl`}>
              {"<Renny"}
              <span className="text-purple-600">Ardila</span>
              {"/>"}
            </div>
            {/* Navegación de escritorio */}
            <div className="hidden md:flex items-center space-x-8">
              <div className="flex space-x-6">
                {currentContent.navItems.map((item: string, index: number) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(timeOfDayBackgrounds[index].sectionId)}
                    className={`${currentBackground.textColor} opacity-80 hover:opacity-100 transition-colors`}
                  >
                    {item}
                  </button>
                ))}
              </div>
              <LanguageSelector />
            </div>
            {/* Menú de hamburguesa para móvil */}
            <div className="md:hidden">
              <MobileNav
                timeOfDayBackgrounds={timeOfDayBackgrounds}
                scrollToSection={scrollToSection}
                textColor={currentBackground.textColor}
              />
            </div>
          </div>
        </div>
      </nav>

      {/* Secciones del Portfolio (cada una ocupa una "página" y se ajusta al scroll) */}
      <section id="hero" className="section-snap relative z-20">
        <div
          className={`max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 text-center transition-all duration-1000 pt-24 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 bg-black/20 text-white/90 px-4 py-2 rounded-full text-sm mb-6 backdrop-blur-sm border border-white/20">
              <Zap className="w-4 h-4" />
              {currentContent.availableForProjects}
            </div>
            <h1
              className={`text-5xl md:text-7xl font-bold ${currentBackground.textColor} mb-6 flex flex-col items-center drop-shadow-lg`}
            >
              <span className="flex items-center">
                {currentContent.mainTitle.split(' & ')[0]}
                <img
                  src="/placeholder.svg?height=60&width=60"
                  alt="Profile"
                  className="w-12 h-12 md:w-16 md:h-16 rounded-full border-2 border-white/30 inline-block mx-1 shadow-lg"
                />
                {currentContent.mainTitle.split(' & ')[1] || 'Marketing'}
              </span>
            </h1>
            <p className={`text-xl ${currentBackground.textColor} opacity-90 mb-8 max-w-2xl mx-auto drop-shadow-md`}>
              {currentContent.subtitle}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button
              className="bg-black/20 hover:bg-black/30 text-white border border-white/30 backdrop-blur-sm shadow-lg px-6 py-3 rounded-md flex items-center gap-2"
              onClick={() => scrollToSection("proyectos")}
            >
              {currentContent.viewProjects}
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              className="border-white/30 text-white hover:bg-white/10 bg-transparent backdrop-blur-sm px-6 py-3 rounded-md border"
              onClick={() => scrollToSection("contacto")}
            >
              {currentContent.contact}
            </button>
          </div>

          <div className="flex justify-center">
            <button
              onClick={() => scrollToSection("sobre-mí")}
              className={`${currentBackground.textColor} opacity-70 hover:opacity-100 transition-colors animate-bounce`}
            >
              <ChevronDown className="w-6 h-6" />
            </button>
          </div>
        </div>
      </section>

      <section id="sobre-mí" className="section-snap relative z-20">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
          <div className="text-center mb-16">
            <h2 className={`text-4xl font-bold ${currentBackground.textColor} mb-4 drop-shadow-lg`}>{currentContent.aboutTitle}</h2>
            <p className={`${currentBackground.textColor} opacity-90 text-lg max-w-2xl mx-auto`}>
              {currentContent.aboutSubtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <Card className="bg-black/20 backdrop-blur-md p-8 rounded-2xl border border-white/20 shadow-xl">
                <CardHeader>
                  <Code className="w-12 h-12 text-white/80 mb-4" />
                  <CardTitle className="text-white">{currentContent.developerTitle}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-white/80 mb-6">
                    {currentContent.developerDescription}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {currentContent.developerTech.map((tech: string) => (
                      <span key={tech} className="bg-white/20 text-white border border-white/30 px-2 py-1 rounded-md text-sm">
                        {tech}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card className="bg-black/20 backdrop-blur-md p-8 rounded-2xl border border-white/20 shadow-xl">
                <CardHeader>
                  <TrendingUp className="w-12 h-12 text-white/80 mb-4" />
                  <CardTitle className="text-white">{currentContent.marketingTitle}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-white/80 mb-6">
                    {currentContent.marketingDescription}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {currentContent.marketingTech.map((tech: string) => (
                      <span key={tech} className="bg-white/20 text-white border border-white/30 px-2 py-1 rounded-md text-sm">
                        {tech}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section id="habilidades" className="section-snap relative z-20">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
          <div className="text-center mb-16">
            <h2 className={`text-4xl font-bold ${currentBackground.textColor} mb-4 drop-shadow-lg`}>{currentContent.skillsTitle}</h2>
            <p className={`${currentBackground.textColor} opacity-90 text-lg`}>{currentContent.skillsSubtitle}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-black/20 backdrop-blur-md border-white/20 shadow-xl">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Code className="w-5 h-5 text-white/80" />
                  {currentContent.developmentTitle}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  {currentContent.developmentFeatures.map((feature: string, index: number) => (
                    <div key={index} className="flex items-center gap-2 text-white/80">
                      {index === 0 && <Database className="w-4 h-4" />}
                      {index === 1 && <Smartphone className="w-4 h-4" />}
                      {index === 2 && <Palette className="w-4 h-4" />}
                      {index === 3 && <Zap className="w-4 h-4" />}
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
                <Separator className="bg-white/20" />
                <div className="flex flex-wrap gap-2">
                  {currentContent.developmentSkills.map((skill: string) => (
                    <span key={skill} className="border border-white/30 text-white/90 bg-white/10 px-2 py-1 rounded-md text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-black/20 backdrop-blur-md border-white/20 shadow-xl">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Target className="w-5 h-5 text-white/80" />
                  {currentContent.marketingSkillTitle}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  {currentContent.marketingFeatures.map((feature: string, index: number) => (
                    <div key={index} className="flex items-center gap-2 text-white/80">
                      {index === 0 && <BarChart3 className="w-4 h-4" />}
                      {index === 1 && <TrendingUp className="w-4 h-4" />}
                      {index === 2 && <Target className="w-4 h-4" />}
                      {index === 3 && <Zap className="w-4 h-4" />}
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
                <Separator className="bg-white/20" />
                <div className="flex flex-wrap gap-2">
                  {currentContent.marketingSkills.map((skill: string) => (
                    <span key={skill} className="border border-white/30 text-white/90 bg-white/10 px-2 py-1 rounded-md text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="proyectos" className="section-snap relative z-20">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
          <div className="text-center mb-16">
            <h2 className={`text-4xl font-bold ${currentBackground.textColor} mb-4 drop-shadow-lg`}>
              {currentContent.projectsTitle}
            </h2>
            <p className={`${currentBackground.textColor} opacity-90 text-lg`}>
              {currentContent.projectsSubtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentContent.projects.map((project: any, index: number) => (
              <Card
                key={index}
                className="bg-black/20 backdrop-blur-md border-white/20 hover:bg-black/30 transition-all duration-300 group shadow-xl"
              >
                <CardHeader>
                  <div
                    className={`w-full h-32 bg-gradient-to-r ${project.color} rounded-lg mb-4 flex items-center justify-center backdrop-blur-sm border border-white/20`}
                  >
                    <Code className="w-8 h-8 text-white/80" />
                  </div>
                  <CardTitle className="text-white">{project.title}</CardTitle>
                  <CardDescription className="text-white/80">{project.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech: string) => (
                      <span key={tech} className="text-xs bg-white/20 text-white border border-white/30 px-2 py-1 rounded-md">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-green-300 font-semibold text-sm">{project.metrics}</span>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-white/80 hover:text-white group-hover:translate-x-1 transition-transform"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="contacto" className="section-snap relative z-20">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 text-center">
          <h2 className={`text-4xl font-bold ${currentBackground.textColor} mb-4 drop-shadow-lg`}>
            {currentContent.contactTitle}
          </h2>
          <p className={`${currentBackground.textColor} opacity-90 text-lg mb-12 max-w-2xl mx-auto`}>
            {currentContent.contactSubtitle}
          </p>

          {/* Contact Form */}
          <div className="mb-12">
            <ContactForm />
          </div>

          {/* Social Media Icons */}
          <div className="flex justify-center gap-8 mb-12">
            <a
              href="https://github.com/devmarketing" // Reemplaza con tu URL de GitHub
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/80 hover:text-purple-400 transition-colors"
              aria-label="Visitar perfil de GitHub"
            >
              <Github className="w-10 h-10" />
            </a>
            <a
              href="https://linkedin.com/in/devmarketing" // Reemplaza con tu URL de LinkedIn
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/80 hover:text-purple-400 transition-colors"
              aria-label="Visitar perfil de LinkedIn"
            >
              <Linkedin className="w-10 h-10" />
            </a>
            <a
              href="https://instagram.com/devmarketing" // Reemplaza con tu URL de Instagram
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/80 hover:text-purple-400 transition-colors"
              aria-label="Visitar perfil de Instagram"
            >
              <Instagram className="w-10 h-10" />
            </a>
          </div>

          <button
            className="bg-black/20 hover:bg-black/30 text-white border border-white/30 backdrop-blur-sm shadow-lg px-6 py-3 rounded-md flex items-center gap-2"
          >
            {currentContent.startProject}
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* El footer no es una sección de pantalla completa, se mostrará al final de la última sección */}
      <footer className="py-8 px-4 sm:px-6 lg:px-8 border-t border-white/20 relative z-20">
        <div className="max-w-screen-xl mx-auto text-center">
          <p className={`${currentBackground.textColor} opacity-70 flex items-center justify-center gap-0`}>
            © 2025 RennyArdila. {currentContent.footer}
          </p>
        </div>
      </footer>

      {/* Componente Chatbot */}
      <Chatbot />
    </div>
  )
}
