"use client"

import { useState, useEffect } from "react"
import { Monitor, Smartphone, Tablet, RefreshCw, Maximize } from "lucide-react"

interface ProjectPreviewProps {
  url: string
  title: string
  onClose?: () => void
  onViewModeChange?: (mode: ViewMode) => void
  currentViewMode?: ViewMode
}

type ViewMode = 'desktop' | 'tablet' | 'mobile'

export default function ProjectPreview({
  url,
  title,
  onViewModeChange,
  currentViewMode,
}: ProjectPreviewProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<ViewMode>(currentViewMode || 'desktop')
  const [refreshKey, setRefreshKey] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  // Detectar si es móvil
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const handleIframeLoad = () => {
    setIsLoading(false)
  }

  const handleIframeError = () => {
    setIsLoading(false)
    setError("No se pudo cargar la vista previa del proyecto")
  }

  const handleRefresh = () => {
    setIsLoading(true)
    setError(null)
    setRefreshKey(prev => prev + 1)
  }

  const getAutoViewMode = (): ViewMode => {
    if (typeof window !== 'undefined') {
      const width = window.innerWidth
      if (width < 640) return 'mobile'
      if (width < 1024) return 'tablet'
      return 'desktop'
    }
    return 'desktop'
  }

  const changeViewMode = (newMode: ViewMode) => {
    setViewMode(newMode)
    if (onViewModeChange) {
      onViewModeChange(newMode)
    }
  }

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.ctrlKey || event.metaKey) {
      switch (event.key) {
        case '1':
          event.preventDefault()
          changeViewMode('desktop')
          break
        case '2':
          event.preventDefault()
          changeViewMode('tablet')
          break
        case '3':
          event.preventDefault()
          changeViewMode('mobile')
          break
        case 'r':
          event.preventDefault()
          handleRefresh()
          break
      }
    }
  }

  // Definir dimensiones por modo
  const getIframeDimensions = () => {
    switch (viewMode) {
      case 'desktop':
        return { width: 1400, height: 900, label: 'Escritorio' }
      case 'tablet':
        return { width: 768, height: 1024, label: 'Tablet' }
      case 'mobile':
        return { width: 375, height: 812, label: 'Móvil' }
      default:
        return { width: 1400, height: 900, label: 'Escritorio' }
    }
  }

  const { width: iframeWidth, height: iframeHeight, label } = getIframeDimensions()

  return (
    <div className="relative w-full h-full bg-gray-100" onKeyDown={handleKeyDown} tabIndex={0}>
      {/* Controles de vista */}
      <div className="absolute top-3 left-3 z-20 flex items-center gap-1 bg-white/90 rounded-lg p-1.5 shadow-lg text-xs">
        <button
          onClick={() => changeViewMode('desktop')}
          className={`flex items-center gap-1 px-2 py-1.5 rounded transition-colors ${
            viewMode === 'desktop'
              ? 'bg-purple-600 text-white'
              : 'text-gray-700 hover:bg-gray-100'
          }`}
          title="Vista de escritorio (Web)"
        >
          <Monitor className="w-3.5 h-3.5" />
          <span>Web</span>
        </button>

        <button
          onClick={() => changeViewMode('tablet')}
          className={`flex items-center gap-1 px-2 py-1.5 rounded transition-colors ${
            viewMode === 'tablet'
              ? 'bg-purple-600 text-white'
              : 'text-gray-700 hover:bg-gray-100'
          }`}
          title="Vista de tablet"
        >
          <Tablet className="w-3.5 h-3.5" />
          <span>Tablet</span>
        </button>

        <button
          onClick={() => changeViewMode('mobile')}
          className={`flex items-center gap-1 px-2 py-1.5 rounded transition-colors ${
            viewMode === 'mobile'
              ? 'bg-purple-600 text-white'
              : 'text-gray-700 hover:bg-gray-100'
          }`}
          title="Vista móvil"
        >
          <Smartphone className="w-3.5 h-3.5" />
          <span>Móvil</span>
        </button>

        <div className="w-px h-5 bg-gray-300 mx-1"></div>

        <button
          onClick={() => changeViewMode(getAutoViewMode())}
          className="flex items-center gap-1 px-2 py-1.5 rounded text-gray-700 hover:bg-gray-100"
          title="Modo automático"
        >
          <Maximize className="w-3.5 h-3.5" />
        </button>

        <button
          onClick={handleRefresh}
          className="flex items-center gap-1 px-2 py-1.5 rounded text-gray-700 hover:bg-gray-100"
          title="Refrescar"
        >
          <RefreshCw className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Atajos (solo en escritorio) */}
      {!isMobile && (
        <div className="absolute bottom-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded">
          Atajos: Ctrl+1 Web, Ctrl+2 Tablet, Ctrl+3 Móvil, Ctrl+R Refrescar
        </div>
      )}

      {/* Mensaje informativo en móvil (modo desktop o tablet) */}
      {isMobile && (viewMode === 'desktop' || viewMode === 'tablet') && (
        <div className="absolute top-12 left-3 bg-white/10 text-white text-xs px-2 py-1 rounded z-20 max-w-[80%]">
          👆 Desliza dentro del recuadro para ver la versión completa
        </div>
      )}

      {/* Estados de carga y error */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-10">
          <div className="text-center">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-purple-600 mx-auto mb-3"></div>
            <p className="text-gray-600 text-sm">Cargando proyecto...</p>
          </div>
        </div>
      )}

      {error ? (
        <div className="flex items-center justify-center h-full bg-gray-100">
          <div className="text-center text-red-600 p-4">
            <p className="font-medium">⚠️ Error al cargar el proyecto</p>
            <p className="text-sm mt-1">{error}</p>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center h-full p-2">
          {viewMode === 'mobile' ? (
            /* Modo móvil: contenedor fijo centrado sin scroll */
            <div
              className="relative bg-white rounded-lg shadow-xl overflow-hidden border border-gray-200"
              style={{
                width: `${iframeWidth}px`,
                height: `${iframeHeight}px`,
                maxWidth: '95vw',
                maxHeight: '85vh',
              }}
            >
              <iframe
                key={`${url}-${refreshKey}-${viewMode}`}
                src={url}
                className="w-full h-full border-0"
                title={`Vista previa: ${title} - ${label}`}
                onLoad={handleIframeLoad}
                onError={handleIframeError}
                sandbox="allow-scripts allow-same-origin allow-forms"
              />
            </div>
          ) : (
            /* Modos desktop y tablet: iframe fijo con scroll interno */
            <div
              className="relative bg-white rounded-lg shadow-xl overflow-auto border border-gray-200"
              style={{
                width: '100%',
                height: '100%',
                maxWidth: viewMode === 'desktop' ? '1400px' : '800px',
                maxHeight: '90vh',
              }}
            >
              <iframe
                key={`${url}-${refreshKey}-${viewMode}`}
                src={url}
                className="border-0"
                style={{ width: `${iframeWidth}px`, height: `${iframeHeight}px` }}
                title={`Vista previa: ${title} - ${label}`}
                onLoad={handleIframeLoad}
                onError={handleIframeError}
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals"
              />
            </div>
          )}
        </div>
      )}
    </div>
  )
}