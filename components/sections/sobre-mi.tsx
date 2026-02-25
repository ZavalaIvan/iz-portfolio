"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { motion } from "framer-motion"
import { MapPin, Calendar, Code2 } from "lucide-react"
import { useTheme } from "next-themes"
import type { Locale } from "@/app/page"
import { UserIcon } from "@/components/ui/user"

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
}

const SPHERE_CONFIG = {
  autoRotateSpeed: 0.22,
  dragSensitivity: 0.5,
  momentumFriction: 0.94,
  maxRotationX: 60,
  resumeDelay: 1800,
}

const techLogos = [
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", alt: "React" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg", alt: "Next.js" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg", alt: "TypeScript" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", alt: "JavaScript" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", alt: "Node.js" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg", alt: "Express" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg", alt: "PostgreSQL" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prisma/prisma-original.svg", alt: "Prisma" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg", alt: "Supabase" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg", alt: "Docker" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg", alt: "Vercel" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg", alt: "AWS" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg", alt: "Google Cloud" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg", alt: "Tailwind CSS" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/framer/framer-original.svg", alt: "Framer Motion" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg", alt: "Git" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg", alt: "GitHub" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg", alt: "Figma" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-plain.svg", alt: "Adobe Photoshop" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/illustrator/illustrator-plain.svg", alt: "Adobe Illustrator" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/premierepro/premierepro-plain.svg", alt: "Adobe Premiere Pro" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/aftereffects/aftereffects-plain.svg", alt: "Adobe After Effects" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg", alt: "Google Ads / Analytics" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/wordpress/wordpress-plain.svg", alt: "WordPress SEO" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/facebook/facebook-original.svg", alt: "Meta Ads" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cloudflare/cloudflare-original.svg", alt: "Cloudflare" },
]

function getSphereSize(width: number) {
  if (width <= 480) return { container: 300, item: 50 }
  if (width <= 768) return { container: 360, item: 60 }
  return { container: 540, item: 84 }
}

function fibonacciSphere(samples: number, i: number) {
  const phi = Math.PI * (3 - Math.sqrt(5))
  const y = 1 - (i / (samples - 1)) * 2
  const radiusAtY = Math.sqrt(1 - y * y)
  const theta = phi * i
  return {
    x: Math.cos(theta) * radiusAtY,
    y,
    z: Math.sin(theta) * radiusAtY,
  }
}

function TechSphere({ isDark }: { isDark: boolean }) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])
  const [failedLogos, setFailedLogos] = useState<Record<string, boolean>>({})
  const [sphereSize, setSphereSize] = useState(() =>
    typeof window === "undefined" ? { container: 540, item: 108 } : getSphereSize(window.innerWidth)
  )

  const points = useMemo(
    () => techLogos.map((_, i) => fibonacciSphere(techLogos.length, i)),
    []
  )

  useEffect(() => {
    const onResize = () => setSphereSize(getSphereSize(window.innerWidth))
    onResize()
    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, [])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const radius = sphereSize.container * 0.44
    const offset = sphereSize.container / 2
    const state = {
      rotationX: -10,
      rotationY: 0,
      isDragging: false,
      previousX: 0,
      previousY: 0,
      velocityX: 0,
      velocityY: 0,
      autoRotate: true,
      lastPointerId: -1,
    }

    let momentumTimer: ReturnType<typeof setInterval> | null = null
    let resumeTimer: ReturnType<typeof setTimeout> | null = null
    let rafId = 0

    const clearTimers = () => {
      if (momentumTimer) {
        clearInterval(momentumTimer)
        momentumTimer = null
      }
      if (resumeTimer) {
        clearTimeout(resumeTimer)
        resumeTimer = null
      }
    }

    const updatePositions = () => {
      const radX = (state.rotationX * Math.PI) / 180
      const radY = (state.rotationY * Math.PI) / 180

      itemRefs.current.forEach((item, index) => {
        if (!item) return
        const p = points[index]

        const x1 = p.x * Math.cos(radY) - p.z * Math.sin(radY)
        const z1 = p.x * Math.sin(radY) + p.z * Math.cos(radY)
        const y1 = p.y * Math.cos(radX) - z1 * Math.sin(radX)
        const z2 = p.y * Math.sin(radX) + z1 * Math.cos(radX)

        const depthScale = (z2 + 1.5) / 2.5
        const translateX = x1 * radius
        const translateY = y1 * radius

        item.style.transform = `translate(-50%, -50%) translate(${translateX + offset}px, ${translateY + offset}px) scale(${0.5 + depthScale * 0.6})`
        item.style.zIndex = `${Math.round((z2 + 1) * 60)}`
        item.style.opacity = `${0.35 + depthScale * 0.65}`
      })
    }

    const clampX = () => {
      state.rotationX = Math.max(-SPHERE_CONFIG.maxRotationX, Math.min(SPHERE_CONFIG.maxRotationX, state.rotationX))
    }

    const onPointerDown = (e: PointerEvent) => {
      state.isDragging = true
      state.autoRotate = false
      state.lastPointerId = e.pointerId
      state.previousX = e.clientX
      state.previousY = e.clientY
      state.velocityX = 0
      state.velocityY = 0
      clearTimers()
      container.setPointerCapture(e.pointerId)
    }

    const onPointerMove = (e: PointerEvent) => {
      if (!state.isDragging || e.pointerId !== state.lastPointerId) return
      const deltaX = e.clientX - state.previousX
      const deltaY = e.clientY - state.previousY

      state.velocityX = deltaX * SPHERE_CONFIG.dragSensitivity
      state.velocityY = deltaY * SPHERE_CONFIG.dragSensitivity * 0.6
      state.rotationY += state.velocityX
      state.rotationX += state.velocityY
      clampX()

      state.previousX = e.clientX
      state.previousY = e.clientY
      updatePositions()
    }

    const onPointerUp = (e: PointerEvent) => {
      if (!state.isDragging || e.pointerId !== state.lastPointerId) return
      state.isDragging = false
      container.releasePointerCapture(e.pointerId)

      momentumTimer = setInterval(() => {
        if (Math.abs(state.velocityX) < 0.1 && Math.abs(state.velocityY) < 0.1) {
          if (momentumTimer) clearInterval(momentumTimer)
          momentumTimer = null
          resumeTimer = setTimeout(() => {
            state.autoRotate = true
          }, SPHERE_CONFIG.resumeDelay)
          return
        }

        state.velocityX *= SPHERE_CONFIG.momentumFriction
        state.velocityY *= SPHERE_CONFIG.momentumFriction
        state.rotationY += state.velocityX
        state.rotationX += state.velocityY
        clampX()
        updatePositions()
      }, 16)
    }

    const animate = () => {
      if (state.autoRotate && !state.isDragging) {
        state.rotationY += SPHERE_CONFIG.autoRotateSpeed
        updatePositions()
      }
      rafId = requestAnimationFrame(animate)
    }

    container.addEventListener("pointerdown", onPointerDown)
    window.addEventListener("pointermove", onPointerMove)
    window.addEventListener("pointerup", onPointerUp)

    updatePositions()
    animate()

    return () => {
      cancelAnimationFrame(rafId)
      clearTimers()
      container.removeEventListener("pointerdown", onPointerDown)
      window.removeEventListener("pointermove", onPointerMove)
      window.removeEventListener("pointerup", onPointerUp)
    }
  }, [points, sphereSize.container])

  return (
    <div className="relative flex items-center justify-center select-none" style={{ width: sphereSize.container, height: sphereSize.container }}>
      <div
        className="pointer-events-none absolute rounded-full"
        style={{
          width: sphereSize.container * 0.78,
          height: sphereSize.container * 0.78,
          background: isDark
            ? "radial-gradient(circle, rgba(255,255,255,0.28) 0%, rgba(255,255,255,0.14) 36%, rgba(255,255,255,0.04) 58%, transparent 74%)"
            : "radial-gradient(circle, rgba(0,0,0,0.22) 0%, rgba(0,0,0,0.14) 36%, rgba(0,0,0,0.05) 58%, transparent 74%)",
        }}
      />
      <div
        ref={containerRef}
        className="relative touch-none cursor-grab active:cursor-grabbing"
        style={{ width: sphereSize.container, height: sphereSize.container, transformStyle: "preserve-3d" }}
      >
        {techLogos.map((item, i) => (
          <div
            key={item.alt}
            ref={(el) => { itemRefs.current[i] = el }}
            className="absolute left-0 top-0 flex items-center justify-center rounded-2xl border border-white/20 bg-white/95 shadow-[0_10px_34px_rgba(0,0,0,0.15)]"
            style={{
              width: sphereSize.item,
              height: sphereSize.item,
              padding: Math.round(sphereSize.item * 0.13),
              backfaceVisibility: "hidden",
              transition: "box-shadow 0.25s ease",
            }}
          >
            {failedLogos[item.alt] ? (
              <span className="text-[10px] font-semibold text-slate-700 text-center leading-tight px-1">
                {item.alt.split(" ").slice(0, 2).map((w) => w[0]).join("")}
              </span>
            ) : (
              <img
                src={item.src}
                alt={item.alt}
                title={item.alt}
                onError={() => setFailedLogos((prev) => ({ ...prev, [item.alt]: true }))}
                style={{
                  maxWidth: Math.round(sphereSize.item * 0.72),
                  maxHeight: Math.round(sphereSize.item * 0.5),
                  objectFit: "contain",
                  pointerEvents: "none",
                }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export function SobreMiSection({ locale }: { locale: Locale }) {
  const { theme } = useTheme()

  const t = locale === "en"
    ? {
        title: "About me",
        role: "Web Developer & Product Builder",
        intro: [
          "I am a full-stack web developer focused on building digital products that create real business impact. I do not just write code, I think in product, users, and outcomes.",
          "My specialty is taking ideas from zero to a functional product ready for real users. I work with startups and businesses that need to move fast without compromising quality.",
          "I believe the best technology is invisible: users should not notice the stack, only an experience that works.",
        ],
        experience: "Experience",
        values: "Values",
      }
    : {
        title: "Sobre mi",
        role: "Desarrollador Web & Product Builder",
        intro: [
          "Soy desarrollador web full-stack con enfoque en construir productos digitales que generan impacto real en los negocios. No solo escribo codigo: pienso en el producto, en los usuarios y en los resultados.",
          "Mi especialidad es llevar ideas desde cero hasta un producto funcional listo para usuarios reales. Trabajo con startups, emprendedores y empresas que necesitan moverse rapido sin comprometer la calidad.",
          "Creo que la mejor tecnologia es la que desaparece: los usuarios no deberian notar el stack tecnico, solo una experiencia que funciona.",
        ],
        experience: "Experiencia",
        values: "Valores",
      }

  const experienceItems = locale === "en"
    ? [
        {
          role: "Full-Stack Developer & Product Builder",
          company: "Freelance",
          period: "2022 - Present",
          description: "Development of MVPs and digital products for startups and businesses.",
        },
        {
          role: "Senior Web Developer",
          company: "Digital Agency",
          period: "2020 - 2022",
          description: "Technical leadership in high-impact web projects for enterprise clients.",
        },
        {
          role: "Frontend Developer",
          company: "Tech Startup",
          period: "2018 - 2020",
          description: "Built user interfaces with React and component design systems.",
        },
      ]
    : [
        {
          role: "Desarrollador Full-Stack & Product Builder",
          company: "Freelance",
          period: "2022 - Presente",
          description: "Desarrollo de MVPs y productos digitales para startups y negocios.",
        },
        {
          role: "Desarrollador Web Senior",
          company: "Agencia Digital",
          period: "2020 - 2022",
          description: "Liderazgo tecnico en proyectos web de alto impacto para clientes corporativos.",
        },
        {
          role: "Desarrollador Frontend",
          company: "Startup Tech",
          period: "2018 - 2020",
          description: "Desarrollo de interfaces de usuario con React y diseno de sistemas de componentes.",
        },
      ]

  const valueItems = locale === "en"
    ? [
        { title: "Pragmatism", description: "The best solution is the one that works and ships on time." },
        { title: "Clarity", description: "Direct communication, no unnecessary jargon." },
        { title: "Quality", description: "Clean code, intuitive interfaces, durable products." },
        { title: "Impact", description: "Every line of code should create business value." },
      ]
    : [
        { title: "Pragmatismo", description: "La mejor solucion es la que funciona y se entrega a tiempo." },
        { title: "Claridad", description: "Comunicacion directa, sin jerga innecesaria." },
        { title: "Calidad", description: "Codigo limpio, interfaces intuitivas, productos que duran." },
        { title: "Impacto", description: "Cada linea de codigo debe aportar valor al negocio." },
      ]

  return (
    <div className="flex flex-col gap-10 py-8">
      <div className="flex flex-col gap-6">
        <motion.div {...fadeUp} transition={{ duration: 0.5, delay: 0.1 }} className="flex items-center gap-3">
          <div className="flex items-center justify-center h-9 w-9 rounded-md bg-accent text-foreground">
            <UserIcon size={20} />
          </div>
          <h1 className="text-2xl font-bold tracking-tight">{t.title}</h1>
        </motion.div>

        <motion.div {...fadeUp} transition={{ duration: 0.5, delay: 0.2 }} className="flex items-center gap-6">
          <img
            src={theme === "light"
              ? "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Iva%CC%81n%20Zavala%20-%20Logotipos_Si%CC%81mbolo-OX2gTSRLKkyuwwhLQviltBSK2kTmvf.jpg"
              : "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Iva%CC%81n%20Zavala%20-%20Logotipos_Si%CC%81mbolo%20copia%203-zgdHPescRfuE1x79003LfznmLGwqie.jpg"
            }
            alt="Ivan Zavala"
            className="h-20 w-20 rounded-lg border border-border"
          />
          <div className="flex flex-col gap-1">
            <h2 className="text-lg font-bold text-foreground">Ivan Zavala</h2>
            <p className="text-sm text-muted-foreground">{t.role}</p>
            <div className="flex items-center gap-3 mt-1">
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <MapPin className="h-3 w-3" />
                {locale === "en" ? "Remote" : "Remoto"}
              </span>
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <Code2 className="h-3 w-3" />
                Full-Stack
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div {...fadeUp} transition={{ duration: 0.5, delay: 0.3 }} className="flex flex-col gap-4">
        <div className="p-6 rounded-lg border border-border bg-card">
          <div className="flex flex-col gap-4 text-sm text-muted-foreground leading-relaxed">
            {t.intro.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </motion.div>

      <motion.div {...fadeUp} transition={{ duration: 0.5, delay: 0.4 }} className="flex flex-col gap-4">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{t.experience}</h2>
        <div className="flex flex-col gap-3">
          {experienceItems.map((exp, i) => (
            <motion.div
              key={exp.period}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.45 + i * 0.1 }}
              className="flex gap-4 p-4 rounded-lg border border-border bg-card hover:border-muted-foreground/20 transition-all duration-300"
            >
              <div className="flex items-center justify-center h-8 w-8 rounded-md bg-secondary shrink-0">
                <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="text-sm font-semibold text-foreground">{exp.role}</h3>
                <p className="text-xs text-muted-foreground">
                  {exp.company} <span className="text-border mx-1">|</span> {exp.period}
                </p>
                <p className="text-sm text-muted-foreground mt-1">{exp.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div {...fadeUp} transition={{ duration: 0.5, delay: 0.6 }} className="flex flex-col gap-4">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{t.values}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {valueItems.map((value) => (
            <div
              key={value.title}
              className="flex flex-col gap-1.5 p-4 rounded-lg bg-secondary/50"
            >
              <h3 className="text-sm font-semibold text-foreground">{value.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{value.description}</p>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div {...fadeUp} transition={{ duration: 0.5, delay: 0.75 }} className="flex flex-col items-center gap-6">
        <h2 className="text-sm font-semibold tracking-wide text-foreground">
          {locale === "en" ? "Technologies and tools I work with" : "Tecnologias y herramientas que manejo"}
        </h2>
        <TechSphere isDark={theme === "dark"} />
      </motion.div>
    </div>
  )
}
