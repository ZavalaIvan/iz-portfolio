"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { motion } from "framer-motion"
import { Blocks, Code2, CodeXml, MapPin, Megaphone, Palette, Rocket } from "lucide-react"
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

type ExperienceIconName = "product" | "senior-dev" | "frontend" | "marketing" | "design"

function ExperienceIcon({ icon, isDark }: { icon: ExperienceIconName; isDark: boolean }) {
  const icons = {
    product: Rocket,
    "senior-dev": CodeXml,
    frontend: Blocks,
    marketing: Megaphone,
    design: Palette,
  }

  const Icon = icons[icon]

  return (
    <motion.div
      animate={{ y: [0, -1.5, 0], scale: [1, 1.04, 1] }}
      transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
      className={`flex items-center justify-center h-8 w-8 rounded-md shrink-0 ${
        isDark
          ? "border border-emerald-400/20 bg-secondary shadow-[0_0_18px_rgba(16,185,129,0.08)]"
          : "border border-slate-900/12 bg-slate-950/[0.03] shadow-[0_8px_18px_rgba(15,23,42,0.08)]"
      }`}
    >
      <Icon className={isDark ? "h-4 w-4 text-emerald-400" : "h-4 w-4 text-slate-900"} />
    </motion.div>
  )
}

export function SobreMiSection({ locale }: { locale: Locale }) {
  const { theme } = useTheme()

  const t = locale === "en"
  ? {
      title: "About me",
      role: "Full-Stack Web Developer & Product Builder",
      intro: [
        "I am a full-stack web developer focused on building digital products that create real business impact. I do not just write code — I think in product, users, and outcomes.",
        "My specialty is transforming ideas into functional solutions, taking them from zero to a product ready for real users. I work with startups, founders, and companies that need to move fast without compromising quality, scalability, or user experience.",
        "My background started in design and marketing. I began as a graphic designer focused on branding, building strong and coherent visual identities. Over time, I expanded into digital marketing and brand positioning, understanding not only how a brand looks, but how it communicates, competes, and connects with its audience.",
        "Today, that strategic foundation defines how I build. Every project integrates design, user experience, brand narrative, and business objectives. I do not just develop interfaces — I build products aligned with a clear vision and commercial intention.",
        "I believe the best technology is invisible: users should not notice the tech stack, only a clean, intuitive, and efficient experience that simply works.",
      ],
      experience: "Experience",
      values: "Values",
    }
  : {
      title: "Sobre mi",
      role: "Desarrollador Web Full-Stack & Product Builder",
      intro: [
        "Soy desarrollador web full-stack con enfoque en construir productos digitales que generan impacto real en los negocios. No solo escribo codigo: pienso en el producto, en los usuarios y en los resultados.",
        "Mi especialidad es transformar ideas en soluciones funcionales, llevandolas desde cero hasta un producto listo para usuarios reales. Trabajo con startups, emprendedores y empresas que necesitan moverse rapido sin comprometer la calidad, la escalabilidad ni la experiencia.",
        "Mi trayectoria comenzo en el diseño y el marketing. Inicie como diseñador grafico enfocado en branding, construyendo identidades visuales solidas y coherentes. Con el tiempo, expandi mi enfoque hacia el marketing digital y el posicionamiento de marca, entendiendo no solo como se ve una marca, sino como se comunica, como compite y como conecta con su audiencia.",
        "Esa base estrategica hoy define mi manera de desarrollar: cada proyecto que construyo integra diseño, experiencia de usuario, narrativa de marca y objetivos de negocio. No desarrollo solo interfaces; construyo productos alineados con una vision clara y una intencion comercial definida.",
        "Creo que la mejor tecnologia es la que desaparece: los usuarios no deberian notar el stack tecnico, solo una experiencia intuitiva, limpia y eficiente que simplemente funciona.",
      ],
      experience: "Experiencia",
      values: "Valores",
    };
    
  const experienceItems = locale === "en"
    ? [
        {
          role: "Full-Stack Developer & Product Builder",
          icon: "product" as const,
          period: "2022 - Present",
          summary: "Development of MVPs and digital products for startups and growing businesses.",
          highlights: [
            "Build digital products end-to-end, from concept through launch.",
            "Design full-stack architectures focused on scalability.",
            "Integrate UX, brand narrative, and business goals into each product.",
            "Develop with a focus on performance, user experience, and market validation.",
            "Collaborate directly with founders to define product strategy and technical roadmap.",
          ],
        },
        {
          role: "Senior Web Developer",
          icon: "senior-dev" as const,
          period: "2019 - 2022",
          summary: "Led web development for enterprise clients and established brands.",
          highlights: [
            "Directed technical decisions and application architecture.",
            "Built advanced experiences with JavaScript, React, and GSAP.",
            "Optimized performance and interactive UX.",
            "Coordinated frontend teams with design and marketing.",
          ],
        },
        {
          role: "Frontend Developer",
          icon: "frontend" as const,
          period: "2015 - 2019",
          summary: "Responsible for modern interfaces focused on user experience.",
          highlights: [
            "Built applications with HTML, CSS, JavaScript, and WordPress.",
            "Created reusable component systems.",
            "Designed and executed UX/UI improvements.",
            "Worked closely with product and design teams.",
          ],
        },
        {
          role: "Digital Marketing Specialist",
          icon: "marketing" as const,
          period: "2012 - 2015",
          summary: "Managed digital campaigns and brand positioning in competitive markets.",
          highlights: [
            "Defined digital advertising strategies.",
            "Created conversion-focused content.",
            "Developed brand positioning and communication.",
            "Analyzed metrics and optimized results.",
          ],
        },
        {
          role: "Graphic Designer (Branding & Advertising)",
          icon: "design" as const,
          period: "2010 - 2012",
          summary: "Built visual identities and advertising assets for emerging brands.",
          highlights: [
            "Designed corporate identity systems.",
            "Developed print and digital advertising pieces.",
            "Defined coherent and strategic visual guidelines.",
          ],
        },
      ]
    : [
        {
          role: "Desarrollador Full-Stack & Product Builder",
          icon: "product" as const,
          period: "2022 - Presente",
          summary: "Diseño y desarrollo productos digitales end-to-end para startups y negocios en crecimiento.",
          highlights: [
            "Construcción de MVPs desde cero hasta lanzamiento.",
            "Arquitectura full-stack orientada a escalabilidad.",
            "Integración de UX, narrativa de marca y objetivos comerciales en cada producto.",
            "Desarrollo con enfoque en performance, experiencia de usuario y validación de mercado.",
            "Colaboración directa con founders para definir estrategia de producto y roadmap técnico.",
          ],
        },
        {
          role: "Desarrollador Web Senior",
          icon: "senior-dev" as const,
          period: "2019 - 2022",
          summary: "Lideré el desarrollo técnico de proyectos web para clientes corporativos y marcas consolidadas.",
          highlights: [
            "Dirección técnica y toma de decisiones arquitectónicas.",
            "Desarrollo avanzado con JavaScript, React y animaciones con GSAP.",
            "Optimización de performance y experiencia interactiva.",
            "Coordinación de equipo frontend y colaboración con diseño y marketing.",
          ],
        },
        {
          role: "Desarrollador Frontend",
          icon: "frontend" as const,
          period: "2015 - 2019",
          summary: "Responsable del desarrollo de interfaces modernas enfocadas en experiencia de usuario.",
          highlights: [
            "Implementación de aplicaciones con HTML, CSS, JavaScript y WordPress.",
            "Creación de sistemas de componentes reutilizables.",
            "Diseño y ejecución de mejoras UX/UI.",
            "Colaboración cercana con equipos de producto y diseño.",
          ],
        },
        {
          role: "Especialista en Marketing Digital",
          icon: "marketing" as const,
          period: "2012 - 2015",
          summary: "Gestión de campañas digitales y posicionamiento de marca en entornos competitivos.",
          highlights: [
            "Estrategias de publicidad digital (ads).",
            "Creación de contenido orientado a conversión.",
            "Desarrollo de posicionamiento y comunicación de marca.",
            "Análisis de métricas y optimización de resultados.",
          ],
        },
        {
          role: "Diseñador Gráfico (Branding & Publicidad)",
          icon: "design" as const,
          period: "2010 - 2012",
          summary: "Construcción de identidades visuales y materiales publicitarios para marcas emergentes.",
          highlights: [
            "Diseño de identidad corporativa.",
            "Desarrollo de piezas publicitarias impresas y digitales.",
            "Definición de lineamientos visuales coherentes y estratégicos.",
          ],
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
              <ExperienceIcon icon={exp.icon} isDark={theme === "dark"} />
              <div className="flex flex-col gap-1">
                <h3 className="text-sm font-semibold text-foreground">{exp.role}</h3>
                <p className="text-xs text-muted-foreground">{exp.period}</p>
                <p className="text-sm text-muted-foreground mt-1">{exp.summary}</p>
                <ul className="mt-2 flex flex-col gap-2">
                  {exp.highlights.map((highlight) => (
                    <li key={highlight} className="flex items-start gap-2.5 text-sm text-muted-foreground leading-relaxed">
                      <span
                        className={`mt-1.5 flex h-3.5 w-3.5 items-center justify-center rounded-sm shrink-0 ${
                          theme === "dark"
                            ? "border border-emerald-400/50 bg-emerald-400/10 shadow-[0_0_12px_rgba(52,211,153,0.2)]"
                            : "border border-slate-900/15 bg-slate-950/[0.03] shadow-[0_6px_14px_rgba(15,23,42,0.08)]"
                        }`}
                      >
                        <span className={theme === "dark" ? "h-1.5 w-1.5 rounded-[2px] bg-emerald-400" : "h-1.5 w-1.5 rounded-[2px] bg-slate-900"} />
                      </span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
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
