"use client"

import { useState, useCallback } from "react"
import { SidebarNav, type SectionId } from "@/components/sidebar-nav"
import { ContentPanel } from "@/components/content-panel"

export type Locale = "es" | "en"

export default function Page() {
  const [activeSection, setActiveSection] = useState<SectionId>("inicio")
  const [locale, setLocale] = useState<Locale>("es")

  const handleNavigate = useCallback((section: SectionId) => {
    setActiveSection(section)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [])

  return (
    <div className="flex min-h-screen">
      <SidebarNav activeSection={activeSection} onNavigate={handleNavigate} locale={locale} onLocaleChange={setLocale} />
      <ContentPanel activeSection={activeSection} onNavigate={handleNavigate} locale={locale} />
    </div>
  )
}
