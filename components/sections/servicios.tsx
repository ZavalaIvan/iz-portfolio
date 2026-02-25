"use client"

import { motion } from "framer-motion"
import { Check, ArrowRight, Palette, PenTool, Sparkles, Clapperboard } from "lucide-react"
import type { Locale } from "@/app/page"
import { ZapIcon } from "@/components/ui/zap"
import { WrenchIcon } from "@/components/ui/wrench"
import { AudioLinesIcon } from "@/components/ui/audio-lines"

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
}

const brandingIconVariants = {
  rest: { opacity: 0, scale: 0.65, x: 0, y: 0, rotate: 0 },
  hover: (custom: { x: number; y: number; rotate: number; delay: number }) => ({
    opacity: 1,
    scale: 1,
    x: custom.x,
    y: custom.y,
    rotate: custom.rotate,
    transition: { type: "spring", stiffness: 260, damping: 18, delay: custom.delay },
  }),
}

interface ServiceData {
  title: string
  subtitle: string
  icon: React.ReactNode
  description: string
  features: string[]
  cta: string
  includesTitle: string
}

const getServiciosData = (locale: Locale): Record<string, ServiceData> => ({
  "servicios-mvps": {
    title: locale === "en" ? "MVP Development" : "Desarrollo de MVPs",
    subtitle: locale === "en" ? "From idea to functional product" : "De idea a producto funcional",
    icon: <ZapIcon size={20} />,
    description:
      locale === "en"
        ? "I build your minimum viable product with the right technology, focused on validating your business idea quickly without sacrificing quality."
        : "Construyo tu producto minimo viable con la tecnologia correcta, enfocado en validar tu idea de negocio lo mas rapido posible sin sacrificar calidad.",
    features: locale === "en"
      ? [
          "Product analysis and planning",
          "Functional interface design",
          "End-to-end full-stack development",
          "Production deploy and setup",
          "Feedback-driven iterations",
          "Technical documentation included",
        ]
      : [
          "Analisis y planificacion de producto",
          "Diseno de interfaz funcional",
          "Desarrollo full-stack completo",
          "Deploy y configuracion en produccion",
          "Iteraciones basadas en feedback",
          "Documentacion tecnica incluida",
        ],
    cta: locale === "en" ? "Contact me for your MVP" : "Contactame para tu MVP",
    includesTitle: locale === "en" ? "What's included?" : "Que incluye?",
  },
  "servicios-automatizacion": {
    title: locale === "en" ? "Automation" : "Automatizacion",
    subtitle: locale === "en" ? "Less manual work, more outcomes" : "Menos trabajo manual, mas resultados",
    icon: <WrenchIcon size={20} />,
    description:
      locale === "en"
        ? "I automate repetitive business processes, from tool integrations to complete workflows that save hours every day."
        : "Automatizo procesos repetitivos en tu negocio: desde integraciones entre herramientas hasta flujos de trabajo completos que ahorran horas de trabajo diario.",
    features: locale === "en"
      ? [
          "API and service integrations",
          "Workflow automation",
          "Webhooks and real-time events",
          "Automated reports",
          "Cross-platform data sync",
          "Configurable monitoring and alerts",
        ]
      : [
          "Integracion de APIs y servicios",
          "Automatizacion de flujos de trabajo",
          "Webhooks y eventos en tiempo real",
          "Reportes automaticos",
          "Sincronizacion de datos entre plataformas",
          "Monitoreo y alertas configurables",
        ],
    cta: locale === "en" ? "Automate your business" : "Automatiza tu negocio",
    includesTitle: locale === "en" ? "What's included?" : "Que incluye?",
  },
  "servicios-soporte": {
    title: locale === "en" ? "Technical Support" : "Soporte Tecnico",
    subtitle: locale === "en" ? "Your product always running" : "Tu producto siempre funcionando",
    icon: <AudioLinesIcon size={20} />,
    description:
      locale === "en"
        ? "Continuous maintenance, incremental improvements, and technical support to keep your digital product running smoothly."
        : "Mantenimiento continuo, mejoras incrementales y soporte tecnico para que tu producto digital funcione sin interrupciones.",
    features: locale === "en"
      ? [
          "Preventive and corrective maintenance",
          "Dependency updates",
          "Performance optimization",
          "Uptime and error monitoring",
          "Iterative UX improvements",
          "Priority support via Slack or email",
        ]
      : [
          "Mantenimiento preventivo y correctivo",
          "Actualizaciones de dependencias",
          "Optimizacion de rendimiento",
          "Monitoreo de uptime y errores",
          "Mejoras iterativas de UX",
          "Soporte prioritario por Slack o email",
        ],
    cta: locale === "en" ? "Request support" : "Solicita soporte",
    includesTitle: locale === "en" ? "What's included?" : "Que incluye?",
  },
})

export function ServiciosSection({ type, onNavigate, locale }: { type: "servicios-mvps" | "servicios-automatizacion" | "servicios-soporte"; onNavigate: (section: string) => void; locale: Locale }) {
  const data = getServiciosData(locale)[type]
  const automationExamples = locale === "en"
    ? [
        { title: "Sales lead flow", description: "Automatically capture leads from forms, score them, and send them to your CRM with instant notifications.", image: "/gifs/web-template.gif" },
        { title: "Billing and follow-up", description: "Generate invoices, send reminders, and update payment status without manual tracking.", image: "/gifs/web-template.gif" },
        { title: "Executive reporting", description: "Build daily and weekly reports from multiple tools and deliver them automatically to your team.", image: "/gifs/web-template.gif" },
      ]
    : [
        { title: "Flujo de leads de ventas", description: "Captura leads desde formularios, calificalos y envialos a tu CRM con notificaciones inmediatas.", image: "/gifs/web-template.gif" },
        { title: "Facturacion y seguimiento", description: "Genera facturas, envia recordatorios y actualiza estados de pago sin gestion manual.", image: "/gifs/web-template.gif" },
        { title: "Reportes ejecutivos", description: "Construye reportes diarios y semanales desde varias herramientas y entregalos automaticamente a tu equipo.", image: "/gifs/web-template.gif" },
      ]
  const supportExamples = locale === "en"
    ? [
        { title: "Mail server + web support", description: "Technical support focused on email server setup, DNS records (SPF, DKIM, DMARC), deliverability issues, and website incidents.", image: "/gifs/web-template.gif" },
        { title: "Performance and stability", description: "Continuous support to detect bottlenecks, reduce downtime, and keep your web platform stable.", image: "/gifs/web-template.gif" },
        { title: "Maintenance and updates", description: "Dependency updates, security patches, and preventive checks to avoid production issues.", image: "/gifs/web-template.gif" },
      ]
    : [
        { title: "Soporte de correo + web", description: "Soporte tecnico enfocado en configuracion de servidores de correo, registros DNS (SPF, DKIM, DMARC), entregabilidad e incidencias web.", image: "/gifs/web-template.gif" },
        { title: "Rendimiento y estabilidad", description: "Soporte continuo para detectar cuellos de botella, reducir caidas y mantener estable tu plataforma web.", image: "/gifs/web-template.gif" },
        { title: "Mantenimiento y actualizaciones", description: "Actualizacion de dependencias, parches de seguridad y revisiones preventivas para evitar problemas en produccion.", image: "/gifs/web-template.gif" },
      ]

  return (
    <div className="flex flex-col gap-10 py-8">
      <div className="flex flex-col gap-3">
        <motion.div {...fadeUp} transition={{ duration: 0.5, delay: 0.1 }} className="flex items-center gap-3">
          <div className="flex items-center justify-center h-9 w-9 rounded-md bg-accent text-foreground">
            {data.icon}
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">{data.title}</h1>
          </div>
        </motion.div>
        <motion.p {...fadeUp} transition={{ duration: 0.5, delay: 0.15 }} className="text-sm text-muted-foreground">
          {data.subtitle}
        </motion.p>
      </div>

      <motion.div
        {...fadeUp}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="p-6 rounded-lg border border-border bg-card"
      >
        <p className="text-sm text-muted-foreground leading-relaxed">{data.description}</p>
      </motion.div>

      <motion.div {...fadeUp} transition={{ duration: 0.5, delay: 0.3 }} className="flex flex-col gap-4">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          {data.includesTitle}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {data.features.map((feature, i) => (
            <motion.div
              key={feature}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.35 + i * 0.05 }}
              className="flex items-start gap-3 p-3 rounded-md bg-secondary/50"
            >
              <Check className="h-4 w-4 mt-0.5 text-emerald-400 shrink-0" />
              <span className="text-sm text-foreground">{feature}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {type === "servicios-mvps" && (
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.5, delay: 0.42 }}
          initial="rest"
          whileHover="hover"
          className="relative overflow-visible p-5 rounded-lg border border-border bg-accent/30"
        >
          <div className="pointer-events-none absolute inset-0">
            <motion.span
              custom={{ x: -34, y: -26, rotate: -14, delay: 0 }}
              variants={brandingIconVariants}
              className="absolute left-6 top-6 z-10 flex h-8 w-8 items-center justify-center rounded-full border border-white/40 bg-background/90 text-foreground shadow-[0_0_12px_rgba(255,255,255,0.45)]"
            >
              <Palette className="h-4 w-4" />
            </motion.span>
            <motion.span
              custom={{ x: 34, y: -28, rotate: 10, delay: 0.03 }}
              variants={brandingIconVariants}
              className="absolute right-6 top-7 z-10 flex h-8 w-8 items-center justify-center rounded-full border border-white/40 bg-background/90 text-foreground shadow-[0_0_12px_rgba(255,255,255,0.45)]"
            >
              <Sparkles className="h-4 w-4" />
            </motion.span>
            <motion.span
              custom={{ x: -36, y: 24, rotate: -8, delay: 0.06 }}
              variants={brandingIconVariants}
              className="absolute left-5 bottom-6 z-10 flex h-8 w-8 items-center justify-center rounded-full border border-white/40 bg-background/90 text-foreground shadow-[0_0_12px_rgba(255,255,255,0.45)]"
            >
              <PenTool className="h-4 w-4" />
            </motion.span>
            <motion.span
              custom={{ x: 36, y: 24, rotate: 12, delay: 0.09 }}
              variants={brandingIconVariants}
              className="absolute right-5 bottom-6 z-10 flex h-8 w-8 items-center justify-center rounded-full border border-white/40 bg-background/90 text-foreground shadow-[0_0_12px_rgba(255,255,255,0.45)]"
            >
              <Clapperboard className="h-4 w-4" />
            </motion.span>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="text-sm font-semibold text-foreground">
              {locale === "en" ? "No logo or branding yet?" : "No tienes logo o branding?"}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {locale === "en"
                ? "I can include complementary services to complete your MVP: visual design, branding, animation, and video editing, so your product launches with a solid and professional identity."
                : "Tambien puedo incluir servicios complementarios para completar tu MVP: diseno visual, branding, animacion y edicion de video, para que tu producto salga con una identidad solida y profesional."}
            </p>
          </div>
        </motion.div>
      )}

      <motion.div {...fadeUp} transition={{ duration: 0.5, delay: 0.5 }}>
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => onNavigate("contacto")}
            className="flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-md text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            {data.cta}
            <ArrowRight className="h-4 w-4" />
          </button>

          {type === "servicios-mvps" && (
            <button
              onClick={() => onNavigate("proyectos-mvps")}
              className="flex items-center gap-2 bg-secondary text-secondary-foreground px-5 py-2.5 rounded-md text-sm font-medium hover:bg-secondary/80 transition-colors"
            >
              {locale === "en" ? "See MVP examples" : "Ver ejemplos de MVP"}
            </button>
          )}
        </div>
      </motion.div>

      {type === "servicios-automatizacion" && (
        <motion.div {...fadeUp} transition={{ duration: 0.5, delay: 0.6 }} className="flex flex-col gap-4">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            {locale === "en" ? "Examples" : "EJEMPLOS"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {automationExamples.map((example, i) => (
              <motion.div
                key={example.title}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.65 + i * 0.06 }}
                className="overflow-hidden rounded-lg border border-border bg-card"
              >
                <img src={example.image} alt={example.title} className="h-36 w-full object-cover" />
                <div className="flex flex-col gap-1.5 p-3">
                  <h3 className="text-sm font-semibold text-foreground">{example.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{example.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {type === "servicios-soporte" && (
        <motion.div {...fadeUp} transition={{ duration: 0.5, delay: 0.6 }} className="flex flex-col gap-4">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            {locale === "en" ? "Examples" : "EJEMPLOS"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {supportExamples.map((example, i) => (
              <motion.div
                key={example.title}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.65 + i * 0.06 }}
                className="overflow-hidden rounded-lg border border-border bg-card"
              >
                <img src={example.image} alt={example.title} className="h-36 w-full object-cover" />
                <div className="flex flex-col gap-1.5 p-3">
                  <h3 className="text-sm font-semibold text-foreground">{example.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{example.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  )
}
