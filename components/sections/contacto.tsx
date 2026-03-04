"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Send, Github, Linkedin, Instagram, Code2, MessageCircle, ArrowUpRight, Copy, Check } from "lucide-react"
import type { Locale } from "@/app/page"
import { MailCheckIcon } from "@/components/ui/mail-check"

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
}

const socialLinks = [
  { name: "GitHub", icon: <Github className="h-4 w-4" />, href: "https://github.com/ZavalaIvan" },
  { name: "LinkedIn", icon: <Linkedin className="h-4 w-4" />, href: "https://www.linkedin.com/in/ivan-zavala-562ab62a0/" },
  { name: "Instagram", icon: <Instagram className="h-4 w-4" />, href: "https://www.instagram.com/ivanzavalagutierrez/" },
  { name: "CodePen", icon: <Code2 className="h-4 w-4" />, href: "https://codepen.io/Ivan-Zavala" },
]

export function ContactoSection({ locale }: { locale: Locale }) {
  const [copied, setCopied] = useState(false)

  const t = locale === "en"
    ? {
        title: "Contact",
        subtitle: "Do you have a project in mind? Let's talk.",
        copyEmail: "Copy email",
        response: "I reply in less than 24 hours. Tell me about your project and we can schedule a call.",
        whatsappCta: "Chat on WhatsApp",
        social: "Social",
        ctaTitle: "Ready to build your next product?",
        ctaText: "Send me an email with a short summary of your project. No pressure, no formalities. Just a conversation to see if we are a good fit.",
        sendEmail: "Send email",
      }
    : {
        title: "Contacto",
        subtitle: "Tienes un proyecto en mente? Hablemos.",
        copyEmail: "Copiar email",
        response: "Respondo en menos de 24 horas. Cuentame sobre tu proyecto y agendamos una llamada.",
        whatsappCta: "Escribirme por WhatsApp",
        social: "Redes",
        ctaTitle: "Listo para construir tu proximo producto?",
        ctaText: "Enviame un email con una breve descripcion de tu proyecto. Sin compromiso, sin formalidades. Solo una conversacion para ver si encajamos.",
        sendEmail: "Enviar email",
      }

  const copyEmail = () => {
    navigator.clipboard.writeText("hola@ivanzavala.dev")
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex flex-col gap-10 py-8">
      <div className="flex flex-col gap-3">
        <motion.div {...fadeUp} transition={{ duration: 0.5, delay: 0.1 }} className="flex items-center gap-3">
          <div className="flex items-center justify-center h-9 w-9 rounded-md bg-accent text-foreground">
            <MailCheckIcon size={20} />
          </div>
          <h1 className="text-2xl font-bold tracking-tight">{t.title}</h1>
        </motion.div>
        <motion.p {...fadeUp} transition={{ duration: 0.5, delay: 0.15 }} className="text-sm text-muted-foreground">
          {t.subtitle}
        </motion.p>
      </div>

      <motion.div
        {...fadeUp}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="p-6 rounded-lg border border-border bg-card"
      >
        <div className="flex flex-col gap-4">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Email</h2>
          <div className="flex items-center gap-3">
            <span className="text-lg font-mono text-foreground">hola@ivanzavala.dev</span>
            <button
              onClick={copyEmail}
              className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-all"
              aria-label={t.copyEmail}
            >
              {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
            </button>
          </div>
          <p className="text-sm text-muted-foreground">
            {t.response}
          </p>
        </div>
      </motion.div>

      <motion.div {...fadeUp} transition={{ duration: 0.5, delay: 0.3 }} className="flex flex-col gap-4">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{t.social}</h2>
        <div className="flex flex-col gap-2">
          {socialLinks.map((link, i) => (
            <motion.a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.35 + i * 0.05 }}
              className="group flex items-center justify-between p-3 rounded-md border border-border bg-card hover:border-muted-foreground/20 hover:bg-accent/50 transition-all duration-300"
            >
              <div className="flex items-center gap-3">
                <span className="text-muted-foreground group-hover:text-foreground transition-colors">
                  {link.icon}
                </span>
                <span className="text-sm font-medium text-foreground">{link.name}</span>
              </div>
              <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 duration-200" />
            </motion.a>
          ))}
        </div>
      </motion.div>

      <motion.div
        {...fadeUp}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="p-6 rounded-lg border border-border bg-accent/30"
      >
        <div className="flex flex-col gap-3">
          <h3 className="text-base font-semibold text-foreground text-balance">
            {t.ctaTitle}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {t.ctaText}
          </p>
          <div className="flex flex-wrap items-center gap-2 mt-2">
            <a
              href="mailto:hola@ivanzavala.dev"
              className="flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-md text-sm font-medium hover:bg-primary/90 transition-colors w-fit"
            >
              {t.sendEmail}
              <Send className="h-4 w-4" />
            </a>
            <a
              href="https://wa.me/9993567229"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/25 transition-colors text-sm font-medium"
              aria-label={t.whatsappCta}
            >
              <MessageCircle className="h-4 w-4" />
              {t.whatsappCta}
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
