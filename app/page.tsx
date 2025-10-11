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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import Chatbot from "@/components/chatbot"
import MobileNav from "@/components/mobile-nav"
import ContactForm from "@/components/contact-form"
import LanguageSelector from "@/components/language-selector"
import ProjectPreview from "@/components/ProjectPreview"

export default function Portfolio() {
  const [isVisible, setIsVisible] = useState(false)
  const [currentTimeOfDay, setCurrentTimeOfDay] = useState(0)
  const [currentLanguage, setCurrentLanguage] = useState('es')
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [previewViewMode, setPreviewViewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop')
  const [isMobile, setIsMobile] = useState(false)

  // Detectar si es móvil
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  function handlePreview(url: string) {
    setPreviewUrl(url.trim()) // Elimina espacios innecesarios
    setPreviewViewMode('desktop')
  }

  const getModalDimensions = () => {
    switch (previewViewMode) {
      case 'desktop':
        return {
          width: '95vw',
          height: '90vh',
          maxWidth: '1400px',
          maxHeight: '95vh'
        }
      case 'tablet':
        return {
          width: '768px',
          height: '85vh',
          maxWidth: '900px',
          maxHeight: '90vh'
        }
      case 'mobile':
        return {
          width: '414px',
          height: '75vh',
          maxWidth: '500px',
          maxHeight: '85vh'
        }
      default:
        return {
          width: '95vw',
          height: '90vh',
          maxWidth: '1400px',
          maxHeight: '95vh'
        }
    }
  }

  // Cerrar modal con Escape
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && previewUrl) {
        setPreviewUrl(null)
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [previewUrl])

  // Reset view mode al abrir
  useEffect(() => {
    if (previewUrl) {
      setPreviewViewMode('desktop')
    }
  }, [previewUrl])

  const sectionRefs = useRef<(HTMLElement | null)[]>([])
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
      name: "Tarde Lluviosa",
      gradient: "from-gray-700 via-blue-800 to-purple-900",
      time: "16:00 - 19:59",
      elements: "rainy-afternoon",
      textColor: "text-white",
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
    const savedLanguage = localStorage.getItem('language') || 'es'
    setCurrentLanguage(savedLanguage)

    sectionRefs.current = timeOfDayBackgrounds.map((bg) => document.getElementById(bg.sectionId))

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.1) {
            const sectionId = entry.target.id
            const index = timeOfDayBackgrounds.findIndex((bg) => bg.sectionId === sectionId)
            if (index !== -1) {
              setCurrentTimeOfDay(index)
            }
          }
        })
      },
      { threshold: 0.1 },
    )

    sectionRefs.current.forEach((section) => {
      if (section) observer.observe(section)
    })

    return () => {
      sectionRefs.current.forEach((section) => {
        if (section) observer.unobserve(section)
      })
    }
  }, [])

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
          demoUrl: "https://rifasloscuatrofantasticos.com",
        },
        {
          title: "SaaS Dashboard",
          description: "Dashboard analítico con estrategia de growth integrada",
          tech: ["React", "D3.js", "Analytics"],
          metrics: "150% ↑ Retención",
          demoUrl: "https://tiendatexas.com",
        },
        {
          title: "Marketing Automation",
          description: "Sistema de automatización que redujo CAC en 60%",
          tech: ["Node.js", "APIs", "Email"],
          metrics: "60% ↓ CAC",
          demoUrl: "https://marketing-automation-demo.com",
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
          demoUrl: "https://rifasloscuatrofantasticos.com",
        },
        {
          title: "SaaS Dashboard",
          description: "Analytics dashboard with integrated growth strategy",
          tech: ["React", "D3.js", "Analytics"],
          metrics: "150% ↑ Retention",
          demoUrl: "https://example-dashboard.com",
        },
        {
          title: "Marketing Automation",
          description: "Automation system that reduced CAC by 60%",
          tech: ["Node.js", "APIs", "Email"],
          metrics: "60% ↓ CAC",
          demoUrl: "https://marketing-automation-demo.com",
        },
      ],
      contactTitle: "Ready for the next level?",
      contactSubtitle: "Let's combine development and marketing to create something extraordinary. Let's talk about your project.",
      startProject: "Start Project",
      footer: "© 2025 RennyArdila. Development with ❤️ and lots of coffee.",
    },
  }

  const currentContent = content[currentLanguage] || content.es

  const SkyElements = () => {
    const elements = currentBackground.elements

    if (elements === "sunrise") {
      return (
        <>
          <div className="absolute top-[10vh] right-[10vw] animate-pulse">
            <Sun className="w-12 h-12 sm:w-16 sm:h-16 text-orange-400 drop-shadow-lg" />
          </div>
          <div className="absolute top-[15vh] left-[10vw] opacity-60">
            <div className="w-16 h-6 sm:w-20 sm:h-8 bg-white/30 rounded-full"></div>
          </div>
        </>
      )
    }

    if (elements === "noon") {
      return (
        <>
          <div className="absolute top-[5vh] right-1/3 animate-spin" style={{ animationDuration: "20s" }}>
            <Sun className="w-16 h-16 sm:w-20 sm:h-20 text-yellow-400 drop-shadow-xl" />
          </div>
        </>
      )
    }

    if (elements === "rainy-afternoon") {
      return (
        <>
          <div className="absolute top-[5vh] left-[20vw] w-48 h-20 sm:w-64 sm:h-24 bg-gray-600/50 rounded-full blur-md"></div>
          <div className="absolute top-[10vh] right-[25vw] w-60 h-24 sm:w-80 sm:h-32 bg-gray-700/60 rounded-full blur-md"></div>
        </>
      )
    }

    if (elements === "night") {
      return (
        <>
          <div className="absolute top-[8vh] right-[12vw] animate-pulse">
            <Moon className="w-10 h-10 sm:w-14 sm:h-14 text-yellow-200 drop-shadow-lg" />
          </div>
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={`night-star-${i}`}
              className="absolute animate-twinkle"
              style={{
                top: `${Math.random() * 80}vh`,
                left: `${Math.random() * 90}vw`,
                animationDelay: `${Math.random() * 3}s`,
                opacity: `${0.5 + Math.random() * 0.5}`,
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
          {Array.from({ length: 25 }).map((_, i) => (
            <div
              key={`deep-night-star-${i}`}
              className="absolute opacity-20 animate-twinkle"
              style={{
                top: `${Math.random() * 90}vh`,
                left: `${Math.random() * 95}vw`,
                animationDelay: `${Math.random() * 4}s`,
                opacity: `${0.1 + Math.random() * 0.2}`,
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
    <div className={`main-scroll-container bg-gradient-to-br ${currentBackground.gradient} transition-all duration-1000 ease-in-out min-h-screen`}>
      {/* Sky Elements solo en escritorio */}
      {!isMobile && (
        <div className="fixed inset-0 pointer-events-none z-10">
          <SkyElements />
        </div>
      )}

      {/* Navegación */}
      <nav className="fixed top-0 w-full z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-3 sm:py-4">
            <div className={`${currentBackground.textColor} font-bold text-lg sm:text-xl`}>
              {"<Renny"}
              <span className="text-purple-600">Ardila</span>
              {"/>"}
            </div>
            <div className="hidden md:flex items-center space-x-6">
              {currentContent.navItems.map((item: string, index: number) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(timeOfDayBackgrounds[index].sectionId)}
                  className={`${currentBackground.textColor} opacity-80 hover:opacity-100 transition-colors text-sm sm:text-base`}
                >
                  {item}
                </button>
              ))}
              <LanguageSelector />
            </div>
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

      {/* Hero */}
      <section id="hero" className="section-snap relative z-20 pt-20 sm:pt-24">
        <div className={`max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 text-center transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <div className="mb-6 sm:mb-8">
            <div className="inline-flex items-center gap-2 bg-black/20 text-white/90 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm mb-4 sm:mb-6 backdrop-blur-sm border border-white/20">
              <Zap className="w-3 h-3 sm:w-4 sm:h-4" />
              {currentContent.availableForProjects}
            </div>
            <h1 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold ${currentBackground.textColor} mb-4 sm:mb-6 flex flex-col items-center drop-shadow-lg px-2`}>
              <span className="flex items-center flex-wrap justify-center gap-1 sm:gap-2">
                {currentContent.mainTitle.split(' & ')[0]}
                <img
                  src="/placeholder.svg?height=60&width=60"
                  alt="Profile"
                  className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 rounded-full border-2 border-white/30 inline-block shadow-lg"
                />
                {currentContent.mainTitle.split(' & ')[1] || 'Marketing'}
              </span>
            </h1>
            <p className={`text-base sm:text-lg md:text-xl ${currentBackground.textColor} opacity-90 mb-6 sm:mb-8 max-w-2xl mx-auto drop-shadow-md px-2 sm:px-0`}>
              {currentContent.subtitle}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-8 sm:mb-12">
            <button
              className="bg-black/20 hover:bg-black/30 text-white border border-white/30 backdrop-blur-sm shadow-lg px-4 py-2.5 sm:px-6 sm:py-3 rounded-md flex items-center gap-1.5 sm:gap-2 text-sm sm:text-base"
              onClick={() => scrollToSection("proyectos")}
            >
              {currentContent.viewProjects}
              <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
            </button>
            <button
              className="border-white/30 text-white hover:bg-white/10 bg-transparent backdrop-blur-sm px-4 py-2.5 sm:px-6 sm:py-3 rounded-md border text-sm sm:text-base"
              onClick={() => scrollToSection("contacto")}
            >
              {currentContent.contact}
            </button>
          </div>

          <div className="flex justify-center mt-6">
            <button
              onClick={() => scrollToSection("sobre-mí")}
              className={`${currentBackground.textColor} opacity-70 hover:opacity-100 transition-colors animate-bounce`}
            >
              <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>
        </div>
      </section>

      {/* Sobre Mí */}
      <section id="sobre-mí" className="section-snap relative z-20">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-24 pb-12">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className={`text-3xl sm:text-4xl font-bold ${currentBackground.textColor} mb-3 sm:mb-4 drop-shadow-lg`}>{currentContent.aboutTitle}</h2>
            <p className={`${currentBackground.textColor} opacity-90 text-base sm:text-lg max-w-2xl mx-auto px-2`}>
              {currentContent.aboutSubtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 sm:gap-12">
            <div>
              <Card className="bg-black/20 backdrop-blur-md p-6 sm:p-8 rounded-2xl border border-white/20 shadow-xl">
                <CardHeader>
                  <Code className="w-10 h-10 sm:w-12 sm:h-12 text-white/80 mb-3 sm:mb-4" />
                  <CardTitle className="text-white text-lg sm:text-xl">{currentContent.developerTitle}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-white/80 text-sm sm:text-base mb-4 sm:mb-6">
                    {currentContent.developerDescription}
                  </p>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {currentContent.developerTech.map((tech: string) => (
                      <Badge key={tech} className="bg-white/20 text-white border-white/30 text-xs sm:text-sm px-2 py-1">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card className="bg-black/20 backdrop-blur-md p-6 sm:p-8 rounded-2xl border border-white/20 shadow-xl">
                <CardHeader>
                  <TrendingUp className="w-10 h-10 sm:w-12 sm:h-12 text-white/80 mb-3 sm:mb-4" />
                  <CardTitle className="text-white text-lg sm:text-xl">{currentContent.marketingTitle}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-white/80 text-sm sm:text-base mb-4 sm:mb-6">
                    {currentContent.marketingDescription}
                  </p>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {currentContent.marketingTech.map((tech: string) => (
                      <Badge key={tech} className="bg-white/20 text-white border-white/30 text-xs sm:text-sm px-2 py-1">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Habilidades */}
      <section id="habilidades" className="section-snap relative z-20">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-24 pb-12">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className={`text-3xl sm:text-4xl font-bold ${currentBackground.textColor} mb-3 sm:mb-4 drop-shadow-lg`}>{currentContent.skillsTitle}</h2>
            <p className={`${currentBackground.textColor} opacity-90 text-base sm:text-lg`}>{currentContent.skillsSubtitle}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
            <Card className="bg-black/20 backdrop-blur-md border-white/20 shadow-xl">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2 text-lg sm:text-xl">
                  <Code className="w-4 h-4 sm:w-5 sm:h-5 text-white/80" />
                  {currentContent.developmentTitle}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 sm:space-y-4 p-4 sm:p-6">
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  {currentContent.developmentFeatures.map((feature: string, index: number) => (
                    <div key={index} className="flex items-center gap-1.5 sm:gap-2 text-white/80 text-sm sm:text-base">
                      {index === 0 && <Database className="w-3 h-3 sm:w-4 sm:h-4" />}
                      {index === 1 && <Smartphone className="w-3 h-3 sm:w-4 sm:h-4" />}
                      {index === 2 && <Palette className="w-3 h-3 sm:w-4 sm:h-4" />}
                      {index === 3 && <Zap className="w-3 h-3 sm:w-4 sm:h-4" />}
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
                <Separator className="bg-white/20" />
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {currentContent.developmentSkills.map((skill: string) => (
                    <Badge key={skill} className="border-white/30 text-white/90 bg-white/10 text-xs sm:text-sm px-2 py-1">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-black/20 backdrop-blur-md border-white/20 shadow-xl">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2 text-lg sm:text-xl">
                  <Target className="w-4 h-4 sm:w-5 sm:h-5 text-white/80" />
                  {currentContent.marketingSkillTitle}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 sm:space-y-4 p-4 sm:p-6">
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  {currentContent.marketingFeatures.map((feature: string, index: number) => (
                    <div key={index} className="flex items-center gap-1.5 sm:gap-2 text-white/80 text-sm sm:text-base">
                      {index === 0 && <BarChart3 className="w-3 h-3 sm:w-4 sm:h-4" />}
                      {index === 1 && <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4" />}
                      {index === 2 && <Target className="w-3 h-3 sm:w-4 sm:h-4" />}
                      {index === 3 && <Zap className="w-3 h-3 sm:w-4 sm:h-4" />}
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
                <Separator className="bg-white/20" />
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {currentContent.marketingSkills.map((skill: string) => (
                    <Badge key={skill} className="border-white/30 text-white/90 bg-white/10 text-xs sm:text-sm px-2 py-1">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Proyectos */}
      <section id="proyectos" className="section-snap relative z-20">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-24 pb-12">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className={`text-3xl sm:text-4xl font-bold ${currentBackground.textColor} mb-3 sm:mb-4 drop-shadow-lg`}>
              {currentContent.projectsTitle}
            </h2>
            <p className={`${currentBackground.textColor} opacity-90 text-base sm:text-lg`}>
              {currentContent.projectsSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {currentContent.projects.map((project: any, index: number) => (
              <Card
                key={index}
                className="bg-black/20 backdrop-blur-md border-white/20 hover:bg-black/30 transition-all duration-300 group shadow-xl min-w-0"
              >
                <CardHeader>
                  <div className="w-full h-24 sm:h-32 bg-gradient-to-r from-white/10 to-white/5 rounded-lg mb-3 sm:mb-4 flex items-center justify-center backdrop-blur-sm border border-white/20">
                    <Code className="w-6 h-6 sm:w-8 sm:h-8 text-white/80" />
                  </div>
                  <CardTitle className="text-white text-base sm:text-lg truncate">{project.title}</CardTitle>
                  <CardDescription className="text-white/80 text-xs sm:text-sm">{project.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {project.tech.map((tech: string) => (
                      <Badge key={tech} className="text-xs bg-white/20 text-white border-white/30 px-1.5 py-0.5">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-green-300 font-semibold text-xs sm:text-sm">{project.metrics}</span>
                    <button
                      className="text-white/80 hover:text-white group-hover:translate-x-0.5 transition-transform p-1.5 rounded-md hover:bg-white/10"
                      onClick={() => handlePreview(project.demoUrl)}
                    >
                      <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
                    </button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contacto */}
      <section id="contacto" className="section-snap relative z-20">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-24 pb-16 text-center">
          <h2 className={`text-3xl sm:text-4xl font-bold ${currentBackground.textColor} mb-3 sm:mb-4 drop-shadow-lg`}>
            {currentContent.contactTitle}
          </h2>
          <p className={`${currentBackground.textColor} opacity-90 text-base sm:text-lg mb-8 sm:mb-12 max-w-2xl mx-auto px-2`}>
            {currentContent.contactSubtitle}
          </p>

          <div className="mb-8 sm:mb-12 max-w-lg mx-auto">
            <ContactForm />
          </div>

          <div className="flex justify-center gap-6 mb-8">
            <a
              href="https://github.com/devmarketing"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/80 hover:text-purple-400 transition-colors"
            >
              <Github className="w-8 h-8 sm:w-10 sm:h-10" />
            </a>
            <a
              href="https://linkedin.com/in/devmarketing"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/80 hover:text-purple-400 transition-colors"
            >
              <Linkedin className="w-8 h-8 sm:w-10 sm:h-10" />
            </a>
            <a
              href="https://instagram.com/devmarketing"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/80 hover:text-purple-400 transition-colors"
            >
              <Instagram className="w-8 h-8 sm:w-10 sm:h-10" />
            </a>
          </div>

          <button className="bg-black/20 hover:bg-black/30 text-white border border-white/30 backdrop-blur-sm shadow-lg px-4 py-2.5 sm:px-6 sm:py-3 rounded-md flex items-center gap-1.5 sm:gap-2 text-sm sm:text-base">
            {currentContent.startProject}
            <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 px-4 sm:px-6 lg:px-8 border-t border-white/20 relative z-20">
        <div className="max-w-screen-xl mx-auto text-center">
          <p className={`${currentBackground.textColor} opacity-70 text-xs sm:text-sm`}>
            © 2025 RennyArdila. {currentContent.footer.replace('© 2025 RennyArdila. ', '')}
          </p>
        </div>
      </footer>

      {/* Project Preview Modal */}
      {previewUrl && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60] overflow-auto animate-in fade-in duration-300"
          onClick={() => setPreviewUrl(null)}
        >
          <div className="min-h-full flex items-center justify-center p-1 sm:p-4">
            <div
              className="relative bg-white rounded-lg overflow-hidden shadow-2xl transition-all duration-500 ease-in-out w-full"
              style={{
                width: getModalDimensions().width,
                height: getModalDimensions().height,
                maxWidth: getModalDimensions().maxWidth,
                maxHeight: getModalDimensions().maxHeight,
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute top-3 left-3 right-3 z-10 flex items-center justify-between">
                <div className="flex items-center gap-2 sm:gap-3">
                  <h3 className="text-sm sm:text-base font-semibold text-gray-800 bg-white/90 px-2.5 py-1 rounded-md">
                    Vista Previa del Proyecto
                  </h3>
                  <span className="text-xs sm:text-sm bg-purple-600 text-white px-1.5 py-0.5 rounded-md">
                    {previewViewMode === 'desktop' ? 'Web' : previewViewMode === 'tablet' ? 'Tablet' : 'Móvil'}
                  </span>
                </div>
                <button
                  className="bg-black/50 hover:bg-black/70 text-white rounded-full p-1.5 sm:p-2 transition-colors text-sm sm:text-base w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center"
                  onClick={() => setPreviewUrl(null)}
                >
                  ✕
                </button>
              </div>
              <ProjectPreview
                url={previewUrl}
                title="Proyecto"
                currentViewMode={previewViewMode}
                onViewModeChange={setPreviewViewMode}
              />
            </div>
          </div>
        </div>
      )}

      {/* Chatbot */}
      <Chatbot />
    </div>
  )
}