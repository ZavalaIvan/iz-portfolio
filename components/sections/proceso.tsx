"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight, Phone } from "lucide-react"
import type { Locale } from "@/app/page"
import { WorkflowIcon } from "@/components/ui/workflow"
import { DollarSignIcon } from "@/components/ui/dollar-sign"

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
}

const getSteps = (locale: Locale) =>
  locale === "en"
    ? [
        {
          number: "01",
          title: "Discovery",
          description: "I understand your business, users, and problem to solve. We define scope, priorities, and success metrics.",
        },
        {
          number: "02",
          title: "Design & Architecture",
          description: "I design the UI and technical architecture. Fast prototypes validate ideas before writing code.",
        },
        {
          number: "03",
          title: "Iterative Development",
          description: "I build in short sprints with frequent deliveries. Continuous feedback keeps the project aligned.",
        },
        {
          number: "04",
          title: "Launch",
          description: "Production deploy, domain setup, analytics, and monitoring. Your product is ready for real users.",
        },
        {
          number: "05",
          title: "Iteration & Support",
          description: "Data-driven improvements, bug fixes, and ongoing support so your product keeps evolving.",
        },
      ]
    : [
        {
          number: "01",
          title: "Descubrimiento",
          description: "Entiendo tu negocio, tus usuarios y el problema que quieres resolver. Definimos alcance, prioridades y metricas de exito.",
        },
        {
          number: "02",
          title: "Diseno & Arquitectura",
          description: "Diseno la interfaz y la arquitectura tecnica. Prototipos rapidos para validar antes de escribir codigo.",
        },
        {
          number: "03",
          title: "Desarrollo Iterativo",
          description: "Construyo por sprints cortos con entregas frecuentes. Feedback continuo para ajustar el rumbo.",
        },
        {
          number: "04",
          title: "Lanzamiento",
          description: "Deploy a produccion, configuracion de dominio, analytics y monitoreo. Tu producto listo para usuarios reales.",
        },
        {
          number: "05",
          title: "Iteracion & Soporte",
          description: "Mejoras basadas en datos reales, correccion de bugs y soporte continuo. Tu producto evoluciona contigo.",
        },
      ]

const getPricingModels = (locale: Locale) =>
  locale === "en"
    ? [
        {
          name: "Web Design",
          description: "For brands that need a clear, professional web presence ready to convert.",
          features: [
            "UX/UI design for corporate sites or landing pages",
            "Content structure and visual hierarchy",
            "Responsive design (desktop, tablet, mobile)",
            "Clickable prototype and base style system",
          ],
          highlight: false,
        },
        {
          name: "MVP Sprint",
          description: "Ideal for validating an idea quickly.",
          features: ["Functional product in 2-4 weeks", "Up to 5 core features", "1 revision round", "Deploy included"],
          highlight: false,
        },
        {
          name: "Complete Product",
          description: "For projects that need more depth.",
          features: ["Development in 4-8 weeks", "Unlimited prioritized features", "Continuous revisions", "30-day post-launch support"],
          highlight: true,
        },
        {
          name: "Monthly Retainer",
          description: "Continuous support and development for your product.",
          features: ["Dedicated monthly hours", "Priority communication", "Iterative improvements", "Monitoring and maintenance"],
          highlight: false,
        },
        {
          name: "Technical Support",
          description: "Continuous support to keep your product stable, secure, and fast.",
          features: [
            "Preventive and corrective maintenance",
            "Dependency updates and critical patches",
            "Uptime and error baseline monitoring",
            "Help desk with defined response times",
          ],
          highlight: false,
        },
        {
          name: "SEO Positioning",
          description: "Technical and content optimization to improve organic visibility and attract qualified traffic.",
          features: [
            "Initial on-page and technical SEO audit",
            "Metadata, structure, and internal linking optimization",
            "Core Web Vitals performance improvements",
            "Monthly reporting and iteration roadmap",
          ],
          highlight: false,
        },
      ]
    : [
        {
          name: "Diseno Web",
          description: "Para marcas que necesitan una presencia profesional, clara y lista para convertir.",
          features: [
            "Diseno UX/UI para web corporativa o landing page",
            "Estructura de contenidos y jerarquia visual",
            "Diseno responsive (desktop, tablet y movil)",
            "Prototipo navegable y sistema de estilos base",
          ],
          highlight: false,
        },
        {
          name: "MVP Sprint",
          description: "Ideal para validar una idea rapidamente.",
          features: ["Producto funcional en 2-4 semanas", "Hasta 5 funcionalidades core", "1 ronda de revisiones", "Deploy incluido"],
          highlight: false,
        },
        {
          name: "Producto Completo",
          description: "Para proyectos que necesitan mas profundidad.",
          features: ["Desarrollo de 4-8 semanas", "Funcionalidades ilimitadas (priorizadas)", "Revisiones continuas", "Soporte post-lanzamiento 30 dias"],
          highlight: true,
        },
        {
          name: "Retainer Mensual",
          description: "Soporte y desarrollo continuo para tu producto.",
          features: ["Horas dedicadas al mes", "Prioridad en comunicacion", "Mejoras iterativas", "Monitoreo y mantenimiento"],
          highlight: false,
        },
        {
          name: "Soporte Tecnico",
          description: "Acompanamiento continuo para mantener estabilidad, seguridad y rendimiento del producto.",
          features: [
            "Mantenimiento preventivo y correctivo",
            "Actualizacion de dependencias y parches criticos",
            "Mesa de ayuda con tiempos de respuesta definidos",
            "Monitoreo base de uptime y errores",
          ],
          highlight: false,
        },
        {
          name: "Posicionamiento SEO",
          description: "Optimizacion tecnica y de contenidos para aumentar visibilidad organica y atraer trafico de calidad.",
          features: [
            "Auditoria SEO on-page y tecnica inicial",
            "Optimizacion de estructura, metadatos y enlazado interno",
            "Mejoras de rendimiento Core Web Vitals",
            "Seguimiento con reportes y plan de iteracion mensual",
          ],
          highlight: false,
        },
      ]

export function MetodologiaSection({ locale }: { locale: Locale }) {
  const steps = getSteps(locale)

  return (
    <div className="flex flex-col gap-10 py-8">
      <div className="flex flex-col gap-3">
        <motion.div {...fadeUp} transition={{ duration: 0.5, delay: 0.1 }} className="flex items-center gap-3">
          <div className="flex items-center justify-center h-9 w-9 rounded-md bg-accent text-foreground">
            <WorkflowIcon size={20} />
          </div>
          <h1 className="text-2xl font-bold tracking-tight">{locale === "en" ? "Methodology" : "Metodologia"}</h1>
        </motion.div>
        <motion.p {...fadeUp} transition={{ duration: 0.5, delay: 0.15 }} className="text-sm text-muted-foreground">
          {locale === "en"
            ? "A clear and predictable process designed to deliver value from sprint one."
            : "Un proceso claro y predecible, pensado para entregar valor desde el primer sprint."}
        </motion.p>
      </div>

      <div className="flex flex-col gap-0">
        {steps.map((step, i) => (
          <motion.div
            key={step.number}
            {...fadeUp}
            transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
            className="group relative flex gap-6 pb-8 last:pb-0"
          >
            {i < steps.length - 1 && (
              <div className="absolute left-[19px] top-10 bottom-0 w-px bg-border" />
            )}

            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-secondary border border-border text-xs font-mono text-muted-foreground shrink-0 transition-all duration-300 group-hover:border-white/80 group-hover:bg-white/10 group-hover:text-white group-hover:[text-shadow:0_0_8px_rgba(255,255,255,0.95)] group-hover:shadow-[0_0_10px_rgba(255,255,255,0.75),0_0_24px_rgba(255,255,255,0.45),inset_0_0_12px_rgba(255,255,255,0.35)]">
              {step.number}
            </div>

            <div className="flex flex-col gap-1.5 pt-1.5">
              <h3 className="text-sm font-semibold text-foreground">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export function PreciosSection({ onNavigate, locale }: { onNavigate: (section: string) => void; locale: Locale }) {
  const [hoveredModel, setHoveredModel] = useState<string | null>(null)
  const pricingModels = getPricingModels(locale)

  return (
    <div className="flex flex-col gap-10 py-8">
      <div className="flex flex-col gap-3">
        <motion.div {...fadeUp} transition={{ duration: 0.5, delay: 0.1 }} className="flex items-center gap-3">
          <div className="flex items-center justify-center h-9 w-9 rounded-md bg-accent text-foreground">
            <DollarSignIcon size={20} />
          </div>
          <h1 className="text-2xl font-bold tracking-tight">{locale === "en" ? "Pricing / Models" : "Precios / Modelos"}</h1>
        </motion.div>
        <motion.p {...fadeUp} transition={{ duration: 0.5, delay: 0.15 }} className="text-sm text-muted-foreground">
          {locale === "en"
            ? "Flexible models adapted to each project type and budget."
            : "Modelos flexibles adaptados a cada tipo de proyecto y presupuesto."}
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {pricingModels.map((model, i) => {
          const isHovered = hoveredModel === model.name
          const hasHoveredModel = hoveredModel !== null
          const isDimmed = hasHoveredModel && !isHovered

          return (
            <motion.div
              key={model.name}
              {...fadeUp}
              transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
              onMouseEnter={() => setHoveredModel(model.name)}
              onMouseLeave={() => setHoveredModel(null)}
              className={`flex flex-col gap-4 p-5 rounded-lg border transition-all duration-300 ${
                model.highlight
                  ? "border-foreground/20 bg-accent/50"
                  : "border-border bg-card"
              } ${
                isHovered
                  ? "z-10 -translate-y-1 scale-[1.015] border-white/85 bg-white/[0.08] shadow-[0_0_16px_rgba(255,255,255,0.45),0_0_36px_rgba(255,255,255,0.2),inset_0_0_18px_rgba(255,255,255,0.12)]"
                  : ""
              } ${isDimmed ? "scale-[0.94] opacity-40 saturate-0 brightness-50 blur-[0.4px]" : ""}`}
            >
              {model.highlight && (
                <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400">
                  {locale === "en" ? "Most popular" : "Mas popular"}
                </span>
              )}
              <div className="flex flex-col gap-1">
                <h3 className="text-base font-semibold text-foreground">{model.name}</h3>
                <p className="text-xs text-muted-foreground">{model.description}</p>
              </div>
              <ul className="flex flex-col gap-2">
                {model.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="text-emerald-400 mt-1 shrink-0">{">"}</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          )
        })}
      </div>

      <motion.div {...fadeUp} transition={{ duration: 0.5, delay: 0.5 }} className="p-5 rounded-lg border border-border bg-card">
        <p className="text-sm text-muted-foreground leading-relaxed">
          {locale === "en"
            ? "Every project is unique. Pricing is defined after a discovery call where we align on real scope."
            : "Cada proyecto es unico. Los precios se definen despues de una llamada de descubrimiento donde entendemos el alcance real."}
          <button
            onClick={() => onNavigate("contacto")}
            className="group inline-flex items-center gap-1 ml-1 text-foreground font-medium hover:underline"
          >
            <Phone className="h-3 w-3 text-emerald-400 opacity-0 -translate-x-1 scale-75 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0 group-hover:scale-100" />
            {locale === "en" ? "Schedule call" : "Agendar llamada"}
            <ArrowRight className="h-3 w-3" />
          </button>
        </p>
      </motion.div>
    </div>
  )
}
