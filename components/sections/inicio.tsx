"use client"

import { motion } from "framer-motion"
import { ArrowRight, Code2, Layers, Zap } from "lucide-react"
import type { Locale } from "@/app/page"

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
}

export function InicioSection({ onNavigate, locale }: { onNavigate: (section: string) => void; locale: Locale }) {
  const t = locale === "en"
    ? {
        availability: "Available for projects",
        titleA: "I build digital products that",
        titleB: " solve real problems",
        intro: "Full-stack web developer specialized in MVPs and digital products. I turn ideas into functional apps focused on business results.",
        viewProjects: "View projects",
        talk: "Let's talk",
        stack: "Main stack",
      }
    : {
        availability: "Disponible para proyectos",
        titleA: "Construyo productos digitales que",
        titleB: " resuelven problemas reales",
        intro: "Desarrollador web full-stack especializado en MVPs y productos digitales. Transformo ideas en aplicaciones funcionales con enfoque en resultados de negocio.",
        viewProjects: "Ver proyectos",
        talk: "Hablemos",
        stack: "Stack principal",
      }

  const featureCards = locale === "en"
    ? [
        {
          icon: <Code2 className="h-5 w-5" />,
          title: "Full-Stack",
          description: "Next.js, React, Node.js, TypeScript. Modern and scalable stack.",
        },
        {
          icon: <Rocket className="h-5 w-5" />,
          title: "Fast MVPs",
          description: "From idea to functional product. No over-engineering.",
        },
        {
          icon: <Layers className="h-5 w-5" />,
          title: "Real Product",
          description: "Business-first mindset, not just code. Measurable outcomes.",
        },
      ]
    : [
        {
          icon: <Code2 className="h-5 w-5" />,
          title: "Full-Stack",
          description: "Next.js, React, Node.js, TypeScript. Stack moderno y escalable.",
        },
        {
          icon: <Rocket className="h-5 w-5" />,
          title: "MVPs Rapidos",
          description: "De idea a producto funcional. Sin sobre-ingenieria.",
        },
        {
          icon: <Layers className="h-5 w-5" />,
          title: "Producto Real",
          description: "Enfoque en negocio, no solo en codigo. Resultados medibles.",
        },
      ]

  return (
    <div className="flex flex-col gap-16 py-8">
      <div className="flex flex-col gap-8">
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex items-center gap-3"
        >
          <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-sm text-muted-foreground font-mono">{t.availability}</span>
        </motion.div>

        <motion.h1
          {...fadeUp}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight text-balance"
        >
          {t.titleA}
          <span className="text-muted-foreground">{t.titleB}</span>
        </motion.h1>

        <motion.p
          {...fadeUp}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-lg text-muted-foreground leading-relaxed max-w-2xl"
        >
          {t.intro}
        </motion.p>

        <motion.div
          {...fadeUp}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-wrap gap-3"
        >
          <button
            onClick={() => onNavigate("proyectos-apps")}
            className="flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-md text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            {t.viewProjects}
            <ArrowRight className="h-4 w-4" />
          </button>
          <button
            onClick={() => onNavigate("contacto")}
            className="flex items-center gap-2 bg-secondary text-secondary-foreground px-5 py-2.5 rounded-md text-sm font-medium hover:bg-secondary/80 transition-colors"
          >
            {t.talk}
          </button>
        </motion.div>
      </div>

      <motion.div
        {...fadeUp}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        {featureCards.map((card) => (
          <div
            key={card.title}
            className="group flex flex-col gap-3 p-5 rounded-lg border border-border bg-card hover:bg-accent/50 transition-all duration-300 cursor-default"
          >
            <div className="flex items-center justify-center h-10 w-10 rounded-md bg-accent text-foreground">
              {card.icon}
            </div>
            <h3 className="text-sm font-semibold text-foreground">{card.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{card.description}</p>
          </div>
        ))}
      </motion.div>

      <motion.div
        {...fadeUp}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="flex flex-col gap-4"
      >
        <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{t.stack}</h2>
        <div className="flex flex-wrap gap-2">
          {["Next.js", "React", "TypeScript", "Node.js", "Tailwind CSS", "PostgreSQL", "Prisma", "Vercel", "Supabase", "Framer Motion"].map((tech) => (
            <span
              key={tech}
              className="px-3 py-1.5 text-xs font-mono text-muted-foreground bg-secondary rounded-md border border-border hover:text-foreground hover:border-muted-foreground/30 transition-all duration-200"
            >
              {tech}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

function Rocket(props: React.SVGProps<SVGSVGElement> & { className?: string }) {
  return <Zap {...(props as any)} />
}
