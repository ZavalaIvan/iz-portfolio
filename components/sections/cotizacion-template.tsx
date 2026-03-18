"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Globe, Mail, Phone } from "lucide-react"
import { cn } from "@/lib/utils"

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
}

const scopeItems = [
  "Auditoría inicial del sitio y revisión de estado actual.",
  "Optimización técnica y estructural de páginas clave.",
  "Seguimiento mensual con ajustes y mejora continua.",
]

const deliverables = [
  "Reporte de hallazgos y prioridades.",
  "Implementación o listado de ajustes.",
  "Seguimiento de métricas y visibilidad.",
]

const serviceConditions = [
  "El servicio incluye configuración inicial y seguimiento mensual.",
  "Los ajustes se priorizan con base en impacto técnico y visibilidad orgánica.",
  "Las métricas y avances se entregan en cada ciclo de seguimiento.",
]

export interface QuoteFormData {
  name: string
  company: string
  phone: string
}

export interface QuoteDocumentData extends QuoteFormData {
  quoteDate: string
  folio: string
}

const defaultQuoteData: QuoteDocumentData = {
  name: "",
  company: "",
  phone: "",
  quoteDate: "__/__/____",
  folio: "COT-SEO-001",
}

interface CotizacionTemplateDocumentProps {
  data?: QuoteDocumentData
  isPdf?: boolean
}

export function CotizacionTemplateDocument({
  data = defaultQuoteData,
  isPdf = false,
}: CotizacionTemplateDocumentProps) {
  const fieldValueClass = "mt-1 text-sm font-medium text-[#171717]"
  const pageShellClass = isPdf
    ? "h-[1056px] w-[816px] bg-white p-[32px]"
    : "w-full"
  const documentClass = cn(
    "overflow-hidden border border-[#d7d7d2] bg-white text-[#161616]",
    isPdf ? "h-full shadow-none" : "shadow-[0_18px_40px_rgba(0,0,0,0.08)]"
  )

  return (
    <section className={pageShellClass}>
      <div className={documentClass}>
        <div className={cn("grid", isPdf ? "grid-cols-[220px_1fr]" : "lg:grid-cols-[320px_1fr]")}>
        <aside className={cn("border-[#d7d7d2] bg-[#fafaf8]", isPdf ? "border-r p-6" : "border-b p-5 sm:p-8 lg:border-b-0 lg:border-r")}>
          <div className={cn("flex flex-col", isPdf ? "gap-6" : "gap-8")}>
            <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="h-[86px] w-[108px] overflow-hidden opacity-80 grayscale">
                <Image
                  src="/iz-logo.png"
                  alt="IZ logo"
                  width={128}
                  height={128}
                  className="relative top-[-16px] h-[108px] w-[108px] object-contain"
                  priority
                />
              </div>
              <span className="border border-[#d7d7d2] px-3 py-1 text-[11px] font-mono uppercase tracking-[0.22em] text-[#616161]">
                Cotización
              </span>
            </div>

            <div className="flex flex-col gap-3">
              <p className="text-[11px] font-mono uppercase tracking-[0.22em] text-[#6a6a6a]">
                Contacto
              </p>
              <div className="border border-[#dcdcd7] p-4">
                <p className="text-sm font-semibold text-[#171717]">Iván Zavala</p>
                <p className="mt-2 text-sm leading-7 text-[#555555]">
                  Desarrollo web, SEO técnico y productos digitales.
                </p>
                <div className="mt-5 flex flex-col gap-3 text-sm text-[#171717]">
                  <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center border border-[#d7d7d2] text-[#555555]">
                      <Mail className="h-4 w-4" />
                    </span>
                    <span>hola@ivanzavala.dev</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center border border-[#d7d7d2] text-[#555555]">
                      <Phone className="h-4 w-4" />
                    </span>
                    <span>+52 999 356 7229</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center border border-[#d7d7d2] text-[#555555]">
                      <Globe className="h-4 w-4" />
                    </span>
                    <span>ivanzavala.dev</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <p className="text-[11px] font-mono uppercase tracking-[0.22em] text-[#6a6a6a]">
                Datos del cliente
              </p>
              <div className="flex flex-col gap-3">
                <div className="border border-dashed border-[#d7d7d2] px-4 py-3">
                  <p className="text-[11px] font-mono uppercase tracking-[0.18em] text-[#6a6a6a]">Nombre</p>
                  <p className={fieldValueClass}>{data.name || "____________________"}</p>
                </div>
                <div className="border border-dashed border-[#d7d7d2] px-4 py-3">
                  <p className="text-[11px] font-mono uppercase tracking-[0.18em] text-[#6a6a6a]">Nombre de empresa</p>
                  <p className={fieldValueClass}>{data.company || "____________________"}</p>
                </div>
                <div className="border border-dashed border-[#d7d7d2] px-4 py-3">
                  <p className="text-[11px] font-mono uppercase tracking-[0.18em] text-[#6a6a6a]">Teléfono</p>
                  <p className={fieldValueClass}>{data.phone || "____________________"}</p>
                </div>
              </div>
            </div>
          </div>
        </aside>

        <div className={cn(isPdf ? "p-6" : "p-5 sm:p-8 lg:p-10")}>
          <div className={cn("flex flex-col", isPdf ? "gap-5" : "gap-8")}>
            <header className={cn("grid border-b border-[#d7d7d2]", isPdf ? "grid-cols-[1fr_170px] items-end gap-5 pb-6" : "gap-6 pb-8 lg:grid-cols-[1fr_220px] lg:items-end")}>
              <div className="max-w-3xl">
                <p className="text-[11px] font-mono uppercase tracking-[0.22em] text-[#6a6a6a]">
                  Propuesta comercial
                </p>
                <h1 className={cn("mt-4 font-semibold tracking-[-0.045em] text-balance", isPdf ? "max-w-[430px] text-[36px] leading-[0.98]" : "text-[2rem] leading-[1.02] sm:text-4xl md:text-5xl lg:text-[56px] lg:leading-[0.96]")}>
                  Propuesta de posicionamiento SEO.
                </h1>
                <p className={cn("mt-4 max-w-2xl text-sm text-[#555555]", isPdf ? "leading-6" : "leading-8")}>
                  Documento base para presentar alcance, entregables, tiempos e inversión con una estructura clara, profesional y lista para descarga en PDF.
                </p>
              </div>

              <div className="grid gap-3 text-sm">
                <div className="border border-[#d7d7d2] p-4">
                  <p className="text-[11px] font-mono uppercase tracking-[0.22em] text-[#6a6a6a]">Fecha</p>
                  <p className="mt-2 text-[#171717]">{data.quoteDate}</p>
                </div>
                <div className="border border-[#d7d7d2] p-4">
                  <p className="text-[11px] font-mono uppercase tracking-[0.22em] text-[#6a6a6a]">Folio</p>
                  <p className="mt-2 text-[#171717]">{data.folio}</p>
                </div>
              </div>
            </header>

            <section className={cn("grid gap-5", isPdf ? "grid-cols-[1.08fr_0.92fr]" : "lg:grid-cols-[1.1fr_0.9fr]")}>
              <div className={cn("border border-[#d7d7d2]", isPdf ? "p-5" : "p-6")}>
                <p className="text-[11px] font-mono uppercase tracking-[0.22em] text-[#6a6a6a]">
                  Alcance del servicio
                </p>
                <div className={cn("mt-5 flex flex-col", isPdf ? "gap-3" : "gap-4")}>
                  {scopeItems.map((item, index) => (
                    <div key={item} className={cn("flex items-start gap-4 border border-[#e2e2dd]", isPdf ? "p-3" : "p-4")}>
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center border border-[#d7d7d2] text-[11px] font-mono text-[#6a6a6a]">
                        0{index + 1}
                      </div>
                      <p className={cn("pt-1 text-sm text-[#171717]", isPdf ? "leading-6" : "leading-7")}>{item}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className={cn("border border-[#d7d7d2]", isPdf ? "p-5" : "p-6")}>
                <p className="text-[11px] font-mono uppercase tracking-[0.22em] text-[#6a6a6a]">
                  Resumen económico
                </p>
                <div className="mt-5 flex flex-col gap-3">
                  <div className="border border-[#e2e2dd] p-4">
                    <p className="text-[11px] font-mono uppercase tracking-[0.22em] text-[#6a6a6a]">
                      Inversión inicial
                    </p>
                    <p className="mt-3 text-2xl font-semibold tracking-tight text-[#171717]">$3,000 MXN</p>
                    <p className="mt-3 text-xs leading-6 text-[#6a6a6a]">
                      Primer mes de contratación.
                    </p>
                  </div>
                  <div className="border border-[#e2e2dd] p-4">
                    <p className="text-[11px] font-mono uppercase tracking-[0.22em] text-[#6a6a6a]">
                      Mantenimiento mensual
                    </p>
                    <p className="mt-3 text-2xl font-semibold tracking-tight text-[#171717]">$2,500 MXN</p>
                    <p className="mt-3 text-xs leading-6 text-[#6a6a6a]">
                      A partir del segundo mes en adelante.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section className={cn("grid gap-5", isPdf ? "grid-cols-[0.9fr_1.1fr]" : "lg:grid-cols-[0.9fr_1.1fr]")}>
              <div className={cn("border border-[#d7d7d2]", isPdf ? "p-5" : "p-6")}>
                <p className="text-[11px] font-mono uppercase tracking-[0.22em] text-[#6a6a6a]">
                  Entregables
                </p>
                <div className="mt-5 flex flex-col gap-3">
                  {deliverables.map((item) => (
                    <div key={item} className={cn("border border-[#e2e2dd] px-4 text-sm text-[#171717]", isPdf ? "py-2.5 leading-6" : "py-3 leading-7")}>
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              <div className={cn("border border-[#d7d7d2]", isPdf ? "p-5" : "p-6")}>
                <p className="text-[11px] font-mono uppercase tracking-[0.22em] text-[#6a6a6a]">
                  Condiciones del servicio
                </p>
                <div className="mt-5 flex flex-col gap-3">
                  {serviceConditions.map((item, index) => (
                    <div key={item} className={cn("flex items-start gap-4 border border-[#e2e2dd]", isPdf ? "p-3" : "p-4")}>
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center border border-[#d7d7d2] text-[11px] font-mono text-[#6a6a6a]">
                        0{index + 1}
                      </div>
                      <p className={cn("pt-1 text-sm text-[#171717]", isPdf ? "leading-6" : "leading-7")}>{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
      </div>
    </section>
  )
}

export function CotizacionTemplateSection() {
  return (
    <main className="min-h-screen bg-[#f3f3f1] px-4 py-8 text-[#161616] lg:px-8 lg:py-10">
      <div className="mx-auto max-w-[1120px]">
        <motion.div {...fadeUp} transition={{ duration: 0.45, delay: 0.1 }}>
          <CotizacionTemplateDocument />
        </motion.div>
      </div>
    </main>
  )
}
