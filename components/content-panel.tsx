"use client"

import { AnimatePresence, motion } from "framer-motion"
import type { SectionId } from "./sidebar-nav"
import type { Locale } from "@/app/page"
import { InicioSection } from "./sections/inicio"
import { ProyectosSection } from "./sections/proyectos"
import { ServiciosSection } from "./sections/servicios"
import { MetodologiaSection, PreciosSection } from "./sections/proceso"
import { SobreMiSection } from "./sections/sobre-mi"
import { ContactoSection } from "./sections/contacto"

interface ContentPanelProps {
  activeSection: SectionId
  onNavigate: (section: SectionId) => void
  locale: Locale
}

export function ContentPanel({ activeSection, onNavigate, locale }: ContentPanelProps) {
  const handleNavigate = (section: string) => {
    onNavigate(section as SectionId)
  }

  const renderContent = () => {
    switch (activeSection) {
      case "inicio":
        return <InicioSection onNavigate={handleNavigate} locale={locale} />
      case "proyectos-sitios":
        return <ProyectosSection type="proyectos-sitios" locale={locale} />
      case "proyectos-apps":
        return <ProyectosSection type="proyectos-apps" locale={locale} />
      case "proyectos-mvps":
        return <ProyectosSection type="proyectos-mvps" locale={locale} />
      case "proyectos-experimentos":
        return <ProyectosSection type="proyectos-experimentos" locale={locale} />
      case "servicios-mvps":
        return <ServiciosSection type="servicios-mvps" onNavigate={handleNavigate} locale={locale} />
      case "servicios-automatizacion":
        return <ServiciosSection type="servicios-automatizacion" onNavigate={handleNavigate} locale={locale} />
      case "servicios-soporte":
        return <ServiciosSection type="servicios-soporte" onNavigate={handleNavigate} locale={locale} />
      case "proceso-metodologia":
        return <MetodologiaSection locale={locale} />
      case "proceso-precios":
        return <PreciosSection onNavigate={handleNavigate} locale={locale} />
      case "sobre-mi":
        return <SobreMiSection locale={locale} />
      case "contacto":
        return <ContactoSection locale={locale} />
      default:
        return <InicioSection onNavigate={handleNavigate} locale={locale} />
    }
  }

  return (
    <main className="flex-1 min-h-screen overflow-y-auto">
      <div className="max-w-3xl mx-auto px-6 lg:px-12 py-12 lg:py-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{
              duration: 0.3,
              ease: [0.4, 0, 0.2, 1],
            }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </div>
    </main>
  )
}
