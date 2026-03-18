"use client"

import { FormEvent, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import Image from "next/image"
import { BarChart3, CheckCircle2, FileSearch, LineChart, Search, Wrench, X } from "lucide-react"
import { generateQuotePdfBlob } from "@/components/pdf/quote-pdf"
import {
  type QuoteDocumentData,
  type QuoteFormData,
} from "@/components/sections/cotizacion-template"

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
}

const importancePoints = [
  "Google necesita entender con claridad de qué trata cada página.",
  "Un sitio útil pero mal estructurado puede pasar desapercibido.",
  "SEO conecta contenido, código, velocidad e intención de búsqueda.",
]

const includedItems = [
  {
    title: "Auditoría SEO inicial",
    description: "Revisión técnica y editorial para detectar indexación, estructura, contenido duplicado y páginas débiles.",
    icon: <FileSearch className="h-5 w-5" />,
  },
  {
    title: "Investigación de palabras clave",
    description: "Mapeo de consultas reales para alinear páginas con lo que los usuarios buscan.",
    icon: <Search className="h-5 w-5" />,
  },
  {
    title: "Arquitectura y enlazado interno",
    description: "Organización del sitio para distribuir contexto, autoridad y rutas de navegación.",
    icon: <LineChart className="h-5 w-5" />,
  },
  {
    title: "Optimización on-page",
    description: "Ajuste de títulos, metadescripciones, encabezados, URLs, textos alternativos y jerarquía de contenido.",
    icon: <CheckCircle2 className="h-5 w-5" />,
  },
  {
    title: "SEO técnico",
    description: "Validación de sitemap, robots, canonicals, redirecciones, errores de rastreo y estado de indexación.",
    icon: <Wrench className="h-5 w-5" />,
  },
  {
    title: "Rendimiento y Core Web Vitals",
    description: "Mejoras de carga, estabilidad visual y respuesta para reducir fricción técnica.",
    icon: <BarChart3 className="h-5 w-5" />,
  },
  {
    title: "Actualización mensual",
    description: "Cada mes se revisan palabras clave, cambios de posición, nuevas oportunidades y ajustes prioritarios.",
    icon: <CheckCircle2 className="h-5 w-5" />,
  },
  {
    title: "Estadísticas y métricas",
    description: "Entrega de resultados con métricas de visibilidad, clics, impresiones, posicionamiento y avances técnicos.",
    icon: <BarChart3 className="h-5 w-5" />,
  },
]

const processSteps = [
  {
    number: "01",
    title: "Diagnóstico",
    text: "Se revisa cómo está construido el sitio, qué páginas tiene y qué tan entendible resulta para buscadores.",
  },
  {
    number: "02",
    title: "Priorización",
    text: "Los hallazgos se ordenan por impacto: indexación, estructura, contenido, enlaces y rendimiento.",
  },
  {
    number: "03",
    title: "Implementación",
    text: "Se aplican ajustes técnicos y editoriales sobre páginas clave, templates o componentes compartidos.",
  },
  {
    number: "04",
    title: "Medición",
    text: "Se comparan cambios en cobertura, impresiones, clics, posición media y estado técnico del sitio.",
  },
  {
    number: "05",
    title: "Mantenimiento",
    text: "El proceso se repite de forma continua con ajustes, seguimiento y nuevas prioridades para mantener el crecimiento activo.",
  },
]

export function SeoPresentationSection() {
  const [quoteFormOpen, setQuoteFormOpen] = useState(false)
  const [quoteFormData, setQuoteFormData] = useState<QuoteFormData>({
    name: "",
    company: "",
    phone: "",
  })
  const [isDownloadingQuote, setIsDownloadingQuote] = useState(false)

  const createQuoteMeta = () => {
    const now = new Date()
    const pad = (value: number) => String(value).padStart(2, "0")
    const quoteDate = `${pad(now.getDate())}/${pad(now.getMonth() + 1)}/${now.getFullYear()}`
    const folio = `COT-SEO-${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}-${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}`
    return { quoteDate, folio }
  }

  const handleDownloadQuote = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!quoteFormData.name || !quoteFormData.company || !quoteFormData.phone) {
      return
    }

    try {
      setIsDownloadingQuote(true)
      const meta = createQuoteMeta()
      const nextDocumentData: QuoteDocumentData = {
        ...quoteFormData,
        ...meta,
      }

      const safeCompanyName = nextDocumentData.company
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "")

      const fileName = `${nextDocumentData.folio.toLowerCase()}-${safeCompanyName || "cliente"}.pdf`
      const logoResponse = await fetch("/iz-logo-negro.png")
      const logoBlob = await logoResponse.blob()
      const logoDataUrl = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader()
        reader.onloadend = () => resolve(String(reader.result || ""))
        reader.onerror = () => reject(new Error("No se pudo leer el logo."))
        reader.readAsDataURL(logoBlob)
      })

      const pdfBlob = await generateQuotePdfBlob(nextDocumentData, logoDataUrl)

      const downloadUrl = URL.createObjectURL(pdfBlob)
      const link = document.createElement("a")
      link.href = downloadUrl
      link.download = fileName
      link.click()
      URL.revokeObjectURL(downloadUrl)

      const fileBuffer = await pdfBlob.arrayBuffer()
      const bytes = new Uint8Array(fileBuffer)
      let binary = ""
      bytes.forEach((byte) => {
        binary += String.fromCharCode(byte)
      })
      const pdfBase64 = btoa(binary)

      await fetch("/api/save-quote-pdf", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fileName,
          pdfBase64,
          quoteData: nextDocumentData,
        }),
      })
    } finally {
      setIsDownloadingQuote(false)
    }
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-background">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.05),transparent_30%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.08] [background-image:linear-gradient(to_right,hsl(var(--foreground))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--foreground))_1px,transparent_1px)] [background-size:72px_72px]" />

      <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-4 sm:px-6 sm:py-6 lg:gap-8 lg:px-12 lg:py-8">
        <motion.section
          {...fadeUp}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="relative overflow-hidden rounded-[2.25rem] border border-white/10 bg-card/95 shadow-[0_24px_80px_rgba(0,0,0,0.28)]"
        >
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
          <div className="pointer-events-none absolute left-0 top-0 h-48 w-48 rounded-full bg-white/[0.04] blur-3xl" />
          <div className="pointer-events-none absolute right-4 top-2 h-[74px] w-[86px] overflow-hidden opacity-45 grayscale sm:right-6 sm:h-[84px] sm:w-[100px] lg:right-12 lg:top-4 lg:h-[108px] lg:w-[128px]">
            <Image
              src="/iz-logo.png"
              alt="IZ logo"
              width={128}
              height={128}
              className="absolute left-0 top-[-15px] h-[86px] w-[86px] object-contain sm:h-[100px] sm:w-[100px] lg:top-[-20px] lg:h-[128px] lg:w-[128px]"
              priority
            />
          </div>

          <div className="flex min-h-[78vh] flex-col p-5 sm:p-8 lg:p-12">
            <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-5 pr-20 sm:pb-6 sm:pr-24 lg:pr-32">
              <span className="w-fit rounded-full border border-white/10 bg-background/80 px-3 py-1 text-[10px] font-mono uppercase tracking-[0.22em] text-muted-foreground backdrop-blur-sm sm:text-[11px] sm:tracking-[0.28em]">
                SEO / PRESENTACIÓN
              </span>
            </div>

            <div className="grid flex-1 gap-8 pt-8 sm:gap-10 sm:pt-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
              <div className="flex max-w-4xl flex-col gap-6">
                <div className="flex items-center gap-3 text-[11px] font-mono uppercase tracking-[0.24em] text-muted-foreground">
                  <span className="h-px w-10 bg-border" />
                  <span>Resumen ejecutivo</span>
                </div>
                <h1 className="max-w-4xl text-[2.5rem] font-semibold tracking-[-0.04em] text-balance leading-[0.98] sm:text-5xl md:text-6xl lg:text-[4.75rem] lg:leading-[0.96]">
                  SEO es la capa que ayuda a que <span className="text-muted-foreground">un sitio sea interpretable, rastreable y encontrable.</span>
                </h1>
                <p className="max-w-2xl text-[15px] leading-7 text-muted-foreground md:text-lg md:leading-8">
                  No se limita a escribir palabras clave. Involucra arquitectura de información, contenido, metadatos, rendimiento y consistencia técnica.
                </p>
              </div>

              <div className="grid gap-3">
                <div className="rounded-[1.6rem] border border-white/10 bg-background/60 p-5 backdrop-blur-sm">
                  <p className="text-[11px] font-mono uppercase tracking-[0.24em] text-muted-foreground">Entrada</p>
                  <p className="mt-3 text-sm leading-7 text-foreground">Páginas, código, contenido y estructura.</p>
                </div>
                <div className="rounded-[1.6rem] border border-white/10 bg-secondary/50 p-5">
                  <p className="text-[11px] font-mono uppercase tracking-[0.24em] text-muted-foreground">Proceso</p>
                  <p className="mt-3 text-sm leading-7 text-foreground">Rastreo, interpretación, indexación y evaluación.</p>
                </div>
                <div className="rounded-[1.6rem] border border-white/10 bg-background/60 p-5 backdrop-blur-sm">
                  <p className="text-[11px] font-mono uppercase tracking-[0.24em] text-muted-foreground">Salida</p>
                  <p className="mt-3 text-sm leading-7 text-foreground">Mayor claridad para buscadores y mejor visibilidad orgánica.</p>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        <section className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-card/95 p-5 sm:p-8 shadow-[0_18px_50px_rgba(0,0,0,0.18)]"
          >
            <div className="flex h-full min-h-[62vh] flex-col justify-between">
              <div>
                <p className="text-[11px] font-mono uppercase tracking-[0.24em] text-muted-foreground">
                  Por qué importa
                </p>
                <h2 className="mt-5 max-w-xl text-[2rem] font-semibold tracking-[-0.035em] leading-[1.02] md:text-[2.6rem] md:leading-tight">
                  Un sitio puede existir y aun así no ser entendible para un buscador.
                </h2>
              </div>

              <div className="mt-8 grid gap-3">
                {importancePoints.map((item, index) => (
                  <div key={item} className="flex items-start gap-4 rounded-[1.35rem] border border-white/10 bg-secondary/45 p-4">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 bg-background text-[11px] font-mono text-muted-foreground">
                      0{index + 1}
                    </div>
                    <span className="pt-1 text-sm leading-7 text-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            {...fadeUp}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-card/95 p-5 sm:p-8 shadow-[0_18px_50px_rgba(0,0,0,0.18)]"
          >
            <div className="pointer-events-none absolute inset-y-8 left-8 hidden w-px bg-gradient-to-b from-white/0 via-white/15 to-white/0 md:block" />
            <div className="md:pl-5">
              <p className="text-[11px] font-mono uppercase tracking-[0.24em] text-muted-foreground">
                Qué hace SEO en la práctica
              </p>
              <div className="mt-6 grid flex-1 gap-4 md:grid-cols-2">
                <div className="rounded-[1.45rem] border border-white/10 bg-background/70 p-5 backdrop-blur-sm">
                  <h3 className="text-base font-semibold tracking-tight text-foreground">Reduce ambigüedad</h3>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">
                    Define con precisión qué tema trabaja cada página y cómo se relaciona con las demás.
                  </p>
                </div>
                <div className="rounded-[1.45rem] border border-white/10 bg-background/70 p-5 backdrop-blur-sm">
                  <h3 className="text-base font-semibold tracking-tight text-foreground">Corrige fricción técnica</h3>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">
                    Evita errores que bloquean rastreo, indexación o experiencia de carga.
                  </p>
                </div>
                <div className="rounded-[1.45rem] border border-white/10 bg-background/70 p-5 backdrop-blur-sm">
                  <h3 className="text-base font-semibold tracking-tight text-foreground">Ordena contenido</h3>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">
                    Mejora jerarquía, encabezados, semántica y profundidad de información.
                  </p>
                </div>
                <div className="rounded-[1.45rem] border border-white/10 bg-background/70 p-5 backdrop-blur-sm">
                  <h3 className="text-base font-semibold tracking-tight text-foreground">Facilita medición</h3>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">
                    Permite observar qué páginas ganan impresiones, clics y estabilidad técnica.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        <section className="flex flex-col gap-6">
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-card/95 p-5 sm:p-8 shadow-[0_18px_50px_rgba(0,0,0,0.18)]"
          >
            <div className="grid gap-8 lg:grid-cols-[1fr_0.55fr] lg:items-end">
              <div>
                <p className="text-[11px] font-mono uppercase tracking-[0.24em] text-muted-foreground">
                  Qué incluye exactamente
                </p>
                <h2 className="mt-4 text-[2rem] font-semibold tracking-[-0.035em] leading-[1.02] md:text-[2.8rem]">
                  Componentes del servicio
                </h2>
                <p className="mt-4 max-w-3xl text-sm leading-8 text-muted-foreground">
                  El servicio combina configuración inicial con seguimiento mensual. No todos los sitios requieren lo mismo, pero estas son las piezas base del trabajo continuo.
                </p>
                <p className="mt-2 max-w-3xl text-sm leading-8 text-muted-foreground">
                  Además del arranque técnico, cada mes se revisan palabras clave, comportamiento de páginas, oportunidades de contenido, ajustes operativos y métricas de resultado.
                </p>
              </div>

              <div className="grid gap-3 text-sm">
                <div className="rounded-[1.4rem] border border-white/10 bg-background/65 p-4">
                  <p className="text-[11px] font-mono uppercase tracking-[0.24em] text-muted-foreground">Modalidad</p>
                  <p className="mt-2 leading-7 text-foreground">Configuración inicial + operación continua.</p>
                </div>
                <div className="rounded-[1.4rem] border border-white/10 bg-secondary/45 p-4">
                  <p className="text-[11px] font-mono uppercase tracking-[0.24em] text-muted-foreground">Ritmo</p>
                  <p className="mt-2 leading-7 text-foreground">Revisión mensual, ajustes y entrega de métricas.</p>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {includedItems.map((item, index) => (
              <motion.div
                key={item.title}
                {...fadeUp}
                transition={{ duration: 0.4, delay: 0.35 + index * 0.05 }}
                className="group relative flex min-h-[220px] flex-col gap-5 overflow-hidden rounded-[1.75rem] border border-white/10 bg-card/95 p-5 shadow-[0_14px_30px_rgba(0,0,0,0.14)] transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-card sm:min-h-[250px] sm:p-6"
              >
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-accent text-foreground">
                    {item.icon}
                  </div>
                  <span className="text-[11px] font-mono text-muted-foreground">0{index + 1}</span>
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-base font-semibold tracking-tight text-foreground">{item.title}</h3>
                  <p className="text-sm leading-7 text-muted-foreground">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <motion.section
          {...fadeUp}
          transition={{ duration: 0.5, delay: 0.55 }}
          className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-card/95 p-5 sm:p-8 shadow-[0_18px_50px_rgba(0,0,0,0.18)] lg:p-10"
        >
          <p className="text-[11px] font-mono uppercase tracking-[0.24em] text-muted-foreground">
            Flujo de trabajo
          </p>
          <div className="mt-5 max-w-3xl">
            <p className="text-sm leading-8 text-muted-foreground">
              SEO no se resuelve en una sola intervención. Funciona mejor como un ciclo de revisión, implementación, medición y mantenimiento mensual.
            </p>
          </div>
          <div className="relative mt-8 grid gap-4 lg:grid-cols-5">
            {processSteps.map((step) => (
              <div key={step.number} className="relative rounded-[1.5rem] border border-white/10 bg-secondary/45 p-5 backdrop-blur-sm">
                <div className="relative z-10 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-background text-[11px] font-mono text-muted-foreground">
                  {step.number}
                </div>
                <h3 className="mt-4 text-base font-semibold tracking-tight text-foreground">{step.title}</h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{step.text}</p>
              </div>
            ))}
          </div>
        </motion.section>

        <motion.section
          {...fadeUp}
          transition={{ duration: 0.5, delay: 0.65 }}
          className="relative rounded-[2rem] border border-white/10 bg-card/95 p-5 sm:p-8 shadow-[0_18px_50px_rgba(0,0,0,0.18)] lg:p-10"
        >
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="text-[11px] font-mono uppercase tracking-[0.24em] text-muted-foreground">
                Siguiente paso
              </p>
              <h2 className="mt-4 max-w-2xl text-[2rem] font-semibold tracking-[-0.035em] leading-[1.02] md:text-[2.6rem] md:leading-tight">
                Si quieres que tu sitio empiece a ganar visibilidad en Google, escríbeme y lo revisamos.
              </h2>
            </div>

            <div className="relative flex w-full flex-col gap-3 overflow-visible sm:w-auto">
              <a
                href="https://wa.me/529993567229?text=Hola%2C%20vi%20la%20presentacion%20de%20SEO%20y%20me%20gustaria%20mas%20info."
                target="_blank"
                rel="noreferrer"
                className="inline-flex w-full items-center justify-center rounded-xl border border-emerald-500/30 bg-emerald-500/12 px-6 py-3 text-sm font-medium text-emerald-300 transition-colors hover:bg-emerald-500/18 sm:w-auto"
              >
                Escribir por WhatsApp
              </a>
              <button
                type="button"
                onClick={() => setQuoteFormOpen((prev) => !prev)}
                className="inline-flex w-full items-center justify-center rounded-xl border border-white/10 bg-background/60 px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-accent sm:w-auto"
              >
                Descargar cotización
              </button>
              <AnimatePresence>
                {quoteFormOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 26, scale: 0.94, rotateX: -10 }}
                    animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
                    exit={{ opacity: 0, y: 18, scale: 0.96, rotateX: -6 }}
                    transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
                    style={{ transformOrigin: "bottom center" }}
                    className="absolute bottom-[calc(100%+14px)] left-0 right-0 z-30 sm:bottom-[calc(100%+18px)] sm:left-[-12px] sm:right-[-12px]"
                  >
                    <div className="pointer-events-none absolute inset-x-8 bottom-[-22px] h-14 rounded-full bg-black/40 blur-2xl" />
                    <div className="pointer-events-none absolute inset-0 rounded-[1.5rem] bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_55%)]" />
                    <div className="relative rounded-[1.5rem] border border-white/10 bg-background/95 p-4 shadow-[0_30px_80px_rgba(0,0,0,0.42),0_10px_24px_rgba(0,0,0,0.22)] backdrop-blur-md">
                      <form className="flex flex-col gap-3" onSubmit={handleDownloadQuote}>
                        <div className="flex items-center justify-between gap-3">
                          <p className="text-[11px] font-mono uppercase tracking-[0.24em] text-muted-foreground">
                            Descargar cotización
                          </p>
                          <button
                            type="button"
                            onClick={() => setQuoteFormOpen(false)}
                            className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-background/70 text-muted-foreground transition-colors hover:text-foreground"
                            aria-label="Cerrar formulario"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                        <input
                          type="text"
                          placeholder="Nombre"
                          value={quoteFormData.name}
                          onChange={(event) =>
                            setQuoteFormData((prev) => ({ ...prev, name: event.target.value }))
                          }
                          required
                          className="h-11 rounded-xl border border-white/10 bg-background px-4 text-sm text-foreground outline-none placeholder:text-muted-foreground/80 focus:border-white/20"
                        />
                        <input
                          type="text"
                          placeholder="Empresa"
                          value={quoteFormData.company}
                          onChange={(event) =>
                            setQuoteFormData((prev) => ({ ...prev, company: event.target.value }))
                          }
                          required
                          className="h-11 rounded-xl border border-white/10 bg-background px-4 text-sm text-foreground outline-none placeholder:text-muted-foreground/80 focus:border-white/20"
                        />
                        <input
                          type="tel"
                          placeholder="Teléfono"
                          value={quoteFormData.phone}
                          onChange={(event) =>
                            setQuoteFormData((prev) => ({ ...prev, phone: event.target.value }))
                          }
                          required
                          className="h-11 rounded-xl border border-white/10 bg-background px-4 text-sm text-foreground outline-none placeholder:text-muted-foreground/80 focus:border-white/20"
                        />
                        <button
                          type="submit"
                          disabled={isDownloadingQuote}
                          className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-primary px-4 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                        >
                          {isDownloadingQuote ? "Generando PDF..." : "Descargar"}
                        </button>
                      </form>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.section>
      </div>
    </main>
  )
}
