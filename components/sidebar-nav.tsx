"use client"

import { useState, useEffect, useRef } from "react"
import dynamic from "next/dynamic"
import { motion, AnimatePresence } from "framer-motion"
import type { Locale } from "@/app/page"
import {
  Home,
  FolderOpen,
  Briefcase,
  GitBranch,
  User,
  Mail,
  Globe,
  AppWindow,
  Rocket,
  FlaskConical,
  Zap,
  Wrench,
  HeadphonesIcon,
  Workflow,
  DollarSign,
  ChevronDown,
  X,
  Menu,
  Sun,
  Moon,
} from "lucide-react"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"

// 👉 Import dinámico del Logo 3D (SIN SSR)
const Logo3D = dynamic(() => import("./Logo3D"), { ssr: false })

export type SectionId =
  | "inicio"
  | "proyectos-sitios"
  | "proyectos-apps"
  | "proyectos-mvps"
  | "proyectos-experimentos"
  | "servicios-mvps"
  | "servicios-automatizacion"
  | "servicios-soporte"
  | "proceso-metodologia"
  | "proceso-precios"
  | "sobre-mi"
  | "contacto"

interface NavItem {
  id: SectionId | string
  label: string
  icon: React.ReactNode
  children?: { id: SectionId; label: string; icon: React.ReactNode }[]
}

const getNavItems = (locale: Locale): NavItem[] => [
  { id: "inicio", label: locale === "en" ? "Home" : "Inicio", icon: <Home className="h-4 w-4" /> },
  {
    id: "proyectos",
    label: locale === "en" ? "Projects" : "Proyectos",
    icon: <FolderOpen className="h-4 w-4" />,
    children: [
      { id: "proyectos-sitios", label: locale === "en" ? "Websites" : "Sitios web", icon: <Globe className="h-3.5 w-3.5" /> },
      { id: "proyectos-apps", label: locale === "en" ? "Web apps" : "Apps web", icon: <AppWindow className="h-3.5 w-3.5" /> },
      { id: "proyectos-mvps", label: "MVPs", icon: <Rocket className="h-3.5 w-3.5" /> },
      { id: "proyectos-experimentos", label: locale === "en" ? "Experiments" : "Experimentos", icon: <FlaskConical className="h-3.5 w-3.5" /> },
    ],
  },
  {
    id: "servicios",
    label: locale === "en" ? "Services" : "Servicios",
    icon: <Briefcase className="h-4 w-4" />,
    children: [
      { id: "servicios-mvps", label: "MVPs", icon: <Zap className="h-3.5 w-3.5" /> },
      { id: "servicios-automatizacion", label: locale === "en" ? "Automation" : "Automatizacion", icon: <Wrench className="h-3.5 w-3.5" /> },
      { id: "servicios-soporte", label: locale === "en" ? "Support" : "Soporte", icon: <HeadphonesIcon className="h-3.5 w-3.5" /> },
    ],
  },
  {
    id: "proceso",
    label: locale === "en" ? "Process" : "Proceso",
    icon: <GitBranch className="h-4 w-4" />,
    children: [
      { id: "proceso-metodologia", label: locale === "en" ? "Methodology" : "Metodologia", icon: <Workflow className="h-3.5 w-3.5" /> },
      { id: "proceso-precios", label: locale === "en" ? "Pricing / Models" : "Precios / Modelos", icon: <DollarSign className="h-3.5 w-3.5" /> },
    ],
  },
  { id: "sobre-mi", label: locale === "en" ? "About me" : "Sobre mi", icon: <User className="h-4 w-4" /> },
  { id: "contacto", label: locale === "en" ? "Contact" : "Contacto", icon: <Mail className="h-4 w-4" /> },
]
interface SidebarNavProps {
  activeSection: SectionId
  onNavigate: (section: SectionId) => void
  locale: Locale
  onLocaleChange: (locale: Locale) => void
}

export function SidebarNav({ activeSection, onNavigate, locale, onLocaleChange }: SidebarNavProps) {
  const [expandedGroups, setExpandedGroups] = useState<string[]>([])
  const [mobileOpen, setMobileOpen] = useState(false)
  const navItems = getNavItems(locale)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // refs para el logo 3D
  const modelRef = useRef<HTMLElement | null>(null)
  const modelContainerRef = useRef<HTMLDivElement | null>(null)
  const modelReadyRef = useRef(false)

  // rotación por scroll
  const accumulated = useRef({ deg: 0 })
  const targetDeg = useRef(0)

  // zoom suave
  const zoomTarget = useRef(1)
  const zoomCurrent = useRef(1)
  const zoomTimeout = useRef<any>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    const lastScroll = { y: window.scrollY || window.pageYOffset }
    const sensitivity = 0.6

    const onScrollDelta = (delta: number) => {
      accumulated.current.deg += delta * sensitivity
      targetDeg.current = accumulated.current.deg

      zoomTarget.current = 2.10
      if (zoomTimeout.current) clearTimeout(zoomTimeout.current)
      zoomTimeout.current = setTimeout(() => {
        zoomTarget.current = 1
      }, 120)
    }

    const onScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset
      const delta = scrollY - lastScroll.y
      lastScroll.y = scrollY
      onScrollDelta(delta)
    }

    const onWheel = (e: WheelEvent) => onScrollDelta(e.deltaY)

    let lastTouchY: number | null = null
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches && e.touches.length) {
        const y = e.touches[0].clientY
        if (lastTouchY !== null) onScrollDelta(lastTouchY - y)
        lastTouchY = y
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("wheel", onWheel, { passive: true })
    window.addEventListener("touchmove", onTouchMove, { passive: true })

    let rafId: number
    const tick = () => {
      const mv: any = modelRef.current

      if (mv && mv.setAttribute && mv.loaded) {
        modelReadyRef.current = true

        let az = Math.round(targetDeg.current) % 360
        if (az < 0) az += 360

        const elevation = 75
        const baseRadius = 5.0
        zoomCurrent.current += (zoomTarget.current - zoomCurrent.current) * 0.12
        const radius = `${(baseRadius / zoomCurrent.current).toFixed(2)}m`

        // Camara fija al centro; el modelo rota sobre su propio eje.
        mv.setAttribute("camera-orbit", `0deg ${elevation}deg ${radius}`)
        mv.setAttribute("orientation", `${az}deg 0deg 0deg`)
      }

      rafId = requestAnimationFrame(tick)
    }

    rafId = requestAnimationFrame(tick)

    lastScroll.y = window.scrollY || window.pageYOffset

    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("wheel", onWheel)
      window.removeEventListener("touchmove", onTouchMove)

      if (zoomTimeout.current) {
        clearTimeout(zoomTimeout.current)
        zoomTimeout.current = null
      }

      cancelAnimationFrame(rafId)
    }
  }, [mounted])

  const toggleGroup = (groupId: string) => {
    setExpandedGroups((prev) =>
      prev.includes(groupId) ? prev.filter((id) => id !== groupId) : [...prev, groupId]
    )
  }

  const handleNavigate = (section: SectionId) => {
    onNavigate(section)
    setMobileOpen(false)
  }

  const isActive = (itemId: string, children?: { id: SectionId }[]) => {
    if (children) return children.some((child) => child.id === activeSection)
    return itemId === activeSection
  }

  const sidebarContent = (
    <nav className="flex flex-col h-full" role="navigation" aria-label={locale === "en" ? "Main navigation" : "Navegacion principal"}>
      <div className="px-6 py-8">
        <button onClick={() => handleNavigate("inicio")} className="flex items-center gap-3 group">
          <div
            ref={(el) => {modelContainerRef.current = el}}
            style={{
              width: 72,
              height: 72,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "visible",
            }}
          >
            <Logo3D modelRef={modelRef} />
          </div>

          <span className="text-sm font-semibold text-foreground tracking-tight">
            iván zavala
          </span>
        </button>
      </div>

      {/* resto del sidebar EXACTAMENTE igual */}
      <div className="flex-1 px-3 overflow-y-auto">
        <ul className="flex flex-col gap-0.5">
          {navItems.map((item) => {
            const hasChildren = !!item.children
            const isExpanded = expandedGroups.includes(item.id)
            const active = isActive(item.id, item.children)

            return (
              <li key={item.id}>
                <button
                  onClick={() => (hasChildren ? toggleGroup(item.id) : handleNavigate(item.id as SectionId))}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm transition-all duration-200",
                    "hover:bg-accent/60",
                    active && !hasChildren && "bg-accent text-foreground",
                    active && hasChildren && "text-foreground",
                    !active && "text-muted-foreground"
                  )}
                >
                  <motion.span
                    initial={false}
                    animate={
                      active
                        ? { y: [0, -2, 0], scale: 1.08 }
                        : { y: 0, scale: 1 }
                    }
                    whileHover={{ y: -1, scale: 1.12 }}
                    transition={
                      active
                        ? { duration: 1.8, repeat: Infinity, ease: "easeInOut" }
                        : { duration: 0.18, ease: [0.4, 0, 0.2, 1] }
                    }
                    className={cn("transition-colors duration-200", active ? "text-foreground" : "text-muted-foreground")}
                  >
                    {item.icon}
                  </motion.span>
                  <span className="flex-1 text-left font-medium">{item.label}</span>
                  {hasChildren && (
                    <motion.span animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
                      <ChevronDown className="h-3.5 w-3.5" />
                    </motion.span>
                  )}
                </button>

                <AnimatePresence initial={false}>
                  {hasChildren && isExpanded && (
                    <motion.ul
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="ml-4 border-l border-border pl-2 py-1">
                        {item.children!.map((child) => (
                          <li key={child.id}>
                            <button
                              onClick={() => handleNavigate(child.id)}
                              className={cn(
                                "flex w-full items-center gap-2.5 rounded-md px-3 py-2 text-[13px] transition-all duration-200",
                                "hover:bg-accent/60",
                                activeSection === child.id
                                  ? "bg-accent text-foreground"
                                  : "text-muted-foreground"
                              )}
                            >
                              <span className={cn("transition-colors duration-200", activeSection === child.id ? "text-foreground" : "text-muted-foreground")}>
                                {child.icon}
                              </span>
                              <span>{child.label}</span>
                            </button>
                          </li>
                        ))}
                      </div>
                    </motion.ul>
                  )}
                </AnimatePresence>
              </li>
            )
          })}
        </ul>
      </div>

      <div className="px-4 py-5 border-t border-border flex flex-col gap-4">
        {mounted && (
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="flex items-center gap-3 w-full rounded-md px-3 py-2.5 text-sm text-muted-foreground hover:bg-accent/60 hover:text-foreground transition-all duration-200"
          >
            <motion.div
              key={theme}
              initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </motion.div>
            <span className="font-medium">
              {theme === "dark" ? (locale === "en" ? "Light mode" : "Modo claro") : (locale === "en" ? "Dark mode" : "Modo oscuro")}
            </span>
          </button>
        )}

        <button
          onClick={() => onLocaleChange(locale === "es" ? "en" : "es")}
          className="flex items-center gap-3 w-full rounded-md px-3 py-2.5 text-sm text-muted-foreground hover:bg-accent/60 hover:text-foreground transition-all duration-200"
          aria-label={locale === "en" ? "Change language" : "Cambiar idioma"}
        >
          <Globe className="h-4 w-4" />
          <span className="font-medium">
            {locale === "en" ? "Language: English" : "Idioma: Espanol"}
          </span>
        </button>

        <p className="text-xs text-muted-foreground font-mono px-3">
          {locale === "en" ? "< building products />" : "< construyendo productos />"}
        </p>
      </div>
    </nav>
  )

  return (
    <>
      <button
        onClick={() => setMobileOpen(true)}
        className="fixed top-4 left-4 z-50 lg:hidden bg-card border border-border rounded-md p-2 text-foreground"
      >
        <Menu className="h-5 w-5" />
      </button>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="fixed top-0 left-0 bottom-0 w-[260px] bg-sidebar-background border-r border-sidebar-border z-50 lg:hidden"
            >
              <button
                onClick={() => setMobileOpen(false)}
                className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
              >
                <X className="h-5 w-5" />
              </button>
              {sidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <aside className="hidden lg:flex lg:flex-col lg:w-[260px] lg:min-w-[260px] h-screen bg-sidebar-background border-r border-sidebar-border sticky top-0">
        {sidebarContent}
      </aside>
    </>
  )
}





