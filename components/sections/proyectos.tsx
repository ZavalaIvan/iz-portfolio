"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ExternalLink, Github, Globe, Rocket, FlaskConical } from "lucide-react"
import { QRCodeSVG } from "qrcode.react"
import type { Locale } from "@/app/page"

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
}

interface Project {
  name: string
  description: string
  tech: string[]
  link?: string
  github?: string
  status: string
  preview?: string
  embedUrl?: string
}

interface ProjectsSectionData {
  title: string
  description: string
  icon: React.ReactNode
  projects: Project[]
}

const CODEPEN_BASE = "https://codepen.io/Ivan-Zavala/pen/"
const CODEPEN_EMBED_BASE = "https://codepen.io/Ivan-Zavala/embed/"

const cp = (id: string) => `${CODEPEN_BASE}${id}`
const cpe = (id: string) => `${CODEPEN_EMBED_BASE}${id}?default-tab=result&theme-id=dark`

const getYouTubePreviewEmbedUrl = (url?: string) => {
  if (!url) return null

  try {
    const parsed = new URL(url)
    let videoId = ""

    if (parsed.hostname === "youtu.be") {
      videoId = parsed.pathname.slice(1)
    } else if (parsed.hostname.includes("youtube.com")) {
      videoId = parsed.searchParams.get("v") || ""
      if (!videoId && parsed.pathname.startsWith("/embed/")) {
        videoId = parsed.pathname.split("/embed/")[1] || ""
      }
    }

    if (!videoId) return null
    return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0&playsinline=1&loop=1&playlist=${videoId}&iv_load_policy=3&disablekb=1`
  } catch {
    return null
  }
}

const experimentsEs: Project[] = [
  { name: "Interfaz cinetica", description: "Exploracion de movimiento y respuesta visual en componentes interactivos.", tech: ["JavaScript", "CSS", "Animacion"], status: "CodePen", link: cp("wBWbgoN"), embedUrl: cpe("wBWbgoN") },
  { name: "Transiciones de estado", description: "Microinteracciones para mejorar feedback visual y sensacion de control.", tech: ["JavaScript", "CSS", "UI"], status: "CodePen", link: cp("wBWbJvB"), embedUrl: cpe("wBWbJvB") },
  { name: "Laboratorio de componentes", description: "Prototipo enfocado en comportamiento dinamico y ajustes de estilo en vivo.", tech: ["JavaScript", "CSS", "Componentes"], status: "CodePen", link: cp("OPJGLgg"), embedUrl: cpe("OPJGLgg") },
  { name: "Escena interactiva", description: "Prueba visual con foco en jerarquia, capas y experiencia inmersiva.", tech: ["JavaScript", "CSS", "Visual"], status: "CodePen", link: cp("ZEdGGjx"), embedUrl: cpe("ZEdGGjx") },
  { name: "Motion playground", description: "Experimentacion con ritmo, easing y secuencias para interfaces fluidas.", tech: ["JavaScript", "CSS", "UX"], status: "CodePen", link: cp("zxBQNJz"), embedUrl: cpe("zxBQNJz") },
  { name: "Prototipo responsivo", description: "Ensayo de comportamiento adaptativo para distintos anchos de pantalla.", tech: ["CSS", "Responsive", "Layout"], status: "CodePen", link: cp("emzavYR"), embedUrl: cpe("emzavYR") },
  { name: "Animaciones encadenadas", description: "Secuencias coordinadas para reforzar narrativa visual en interfaz.", tech: ["JavaScript", "CSS", "Animacion"], status: "CodePen", link: cp("EayzZwW"), embedUrl: cpe("EayzZwW") },
  { name: "Control de eventos UI", description: "Prueba de interacciones por eventos con enfasis en respuesta inmediata.", tech: ["JavaScript", "DOM", "UI"], status: "CodePen", link: cp("LEZoxrQ"), embedUrl: cpe("LEZoxrQ") },
  { name: "Patrones de interfaz", description: "Coleccion de recursos visuales aplicados a interfaces experimentales.", tech: ["CSS", "Diseno UI", "Front-End"], status: "CodePen", link: cp("RNRmKOv"), embedUrl: cpe("RNRmKOv") },
  { name: "Button balls", description: "Boton con comportamiento fisico y feedback animado en tiempo real.", tech: ["JavaScript", "CSS", "Interaccion"], status: "CodePen", link: cp("NWVmmJE"), embedUrl: cpe("NWVmmJE") },
  { name: "Exploracion de layouts", description: "Composicion de bloques y sistema de espaciado para pantallas complejas.", tech: ["CSS", "Grid", "Layout"], status: "CodePen", link: cp("OPXYpOM"), embedUrl: cpe("OPXYpOM") },
  { name: "Efectos de hover avanzados", description: "Variaciones de hover con foco en claridad, contraste y micro-feedback.", tech: ["CSS", "JavaScript", "Microinteraccion"], status: "CodePen", link: cp("ZYONeJv"), embedUrl: cpe("ZYONeJv") },
  { name: "UI dinamica", description: "Interfaz experimental que prioriza legibilidad y movimiento controlado.", tech: ["JavaScript", "CSS", "UI"], status: "CodePen", link: cp("dPXEvRr"), embedUrl: cpe("dPXEvRr") },
  { name: "Tarjetas interactivas", description: "Prueba de componentes tipo card con foco en jerarquia de contenido.", tech: ["CSS", "JavaScript", "Componentes"], status: "CodePen", link: cp("EayzWaQ"), embedUrl: cpe("EayzWaQ") },
  { name: "Estado y transicion", description: "Evaluacion de cambios de estado para lograr interacciones predecibles.", tech: ["JavaScript", "UI", "UX"], status: "CodePen", link: cp("emzavzG"), embedUrl: cpe("emzavzG") },
  { name: "Composicion visual", description: "Ejercicio de ritmo y balance visual aplicado a elementos funcionales.", tech: ["CSS", "Diseno", "Front-End"], status: "CodePen", link: cp("WbxBpOo"), embedUrl: cpe("WbxBpOo") },
  { name: "Interaccion progresiva", description: "Escalado de interacciones desde acciones simples hasta flujos completos.", tech: ["JavaScript", "DOM", "UX"], status: "CodePen", link: cp("qENGmob"), embedUrl: cpe("qENGmob") },
  { name: "Pruebas de accesibilidad visual", description: "Ajustes de contraste, tamano y feedback para mejorar comprension.", tech: ["CSS", "Accesibilidad", "UI"], status: "CodePen", link: cp("yyJWbvZ"), embedUrl: cpe("yyJWbvZ") },
  { name: "Navegacion experimental", description: "Patrones de navegacion alternativos con foco en claridad de recorrido.", tech: ["JavaScript", "UI", "Arquitectura"], status: "CodePen", link: cp("RNRmpMw"), embedUrl: cpe("RNRmpMw") },
  { name: "Sistema de estilos", description: "Prueba de consistencia visual y reutilizacion de patrones tipograficos.", tech: ["CSS", "Design System", "UI"], status: "CodePen", link: cp("ZYONexr"), embedUrl: cpe("ZYONexr") },
  { name: "Canvas de ideas", description: "Espacio de experimentacion para validar conceptos visuales rapidamente.", tech: ["JavaScript", "Canvas", "Creatividad"], status: "CodePen", link: cp("QwERpQv"), embedUrl: cpe("QwERpQv") },
  { name: "Patrones modulares", description: "Bloques de interfaz desacoplados para iterar mas rapido en prototipos.", tech: ["JavaScript", "CSS", "Modular"], status: "CodePen", link: cp("pvbmepr"), embedUrl: cpe("pvbmepr") },
  { name: "Interacciones temporizadas", description: "Pruebas con tiempos y demoras para dirigir atencion del usuario.", tech: ["JavaScript", "Animacion", "UX"], status: "CodePen", link: cp("zxBQdxP"), embedUrl: cpe("zxBQdxP") },
  { name: "Laboratorio de tipografia", description: "Exploracion de jerarquia tipografica combinada con elementos dinamicos.", tech: ["CSS", "Tipografia", "Diseno"], status: "CodePen", link: cp("gbMJRGQ"), embedUrl: cpe("gbMJRGQ") },
  { name: "Prototipo narrativo", description: "Combinacion de movimiento y contenido para contar una historia visual.", tech: ["JavaScript", "CSS", "Storytelling"], status: "CodePen", link: cp("myEYwVx"), embedUrl: cpe("myEYwVx") },
  { name: "Interfaz reactiva", description: "Ajustes de comportamiento en tiempo real segun acciones del usuario.", tech: ["JavaScript", "Estado", "UI"], status: "CodePen", link: cp("QwERvJJ"), embedUrl: cpe("QwERvJJ") },
  { name: "Cierre de coleccion", description: "Experimento final del set con sintesis de recursos visuales y tecnicos.", tech: ["JavaScript", "CSS", "CodePen"], status: "CodePen", link: cp("bNeyRjX"), embedUrl: cpe("bNeyRjX") },
]

const experimentsEn: Project[] = [
  { name: "Kinetic interface", description: "Exploration of motion and visual response in interactive components.", tech: ["JavaScript", "CSS", "Animation"], status: "CodePen", link: cp("wBWbgoN"), embedUrl: cpe("wBWbgoN") },
  { name: "State transitions", description: "Micro-interactions designed to improve visual feedback and control.", tech: ["JavaScript", "CSS", "UI"], status: "CodePen", link: cp("wBWbJvB"), embedUrl: cpe("wBWbJvB") },
  { name: "Component lab", description: "Prototype focused on dynamic behavior and live style tuning.", tech: ["JavaScript", "CSS", "Components"], status: "CodePen", link: cp("OPJGLgg"), embedUrl: cpe("OPJGLgg") },
  { name: "Interactive scene", description: "Visual experiment focused on hierarchy, layers, and immersion.", tech: ["JavaScript", "CSS", "Visual"], status: "CodePen", link: cp("ZEdGGjx"), embedUrl: cpe("ZEdGGjx") },
  { name: "Motion playground", description: "Experimenting with rhythm, easing, and sequencing for fluid interfaces.", tech: ["JavaScript", "CSS", "UX"], status: "CodePen", link: cp("zxBQNJz"), embedUrl: cpe("zxBQNJz") },
  { name: "Responsive prototype", description: "Adaptive behavior tests across different viewport sizes.", tech: ["CSS", "Responsive", "Layout"], status: "CodePen", link: cp("emzavYR"), embedUrl: cpe("emzavYR") },
  { name: "Chained animations", description: "Coordinated animation sequences to reinforce visual storytelling.", tech: ["JavaScript", "CSS", "Animation"], status: "CodePen", link: cp("EayzZwW"), embedUrl: cpe("EayzZwW") },
  { name: "UI event control", description: "Interaction tests based on events with immediate response behavior.", tech: ["JavaScript", "DOM", "UI"], status: "CodePen", link: cp("LEZoxrQ"), embedUrl: cpe("LEZoxrQ") },
  { name: "Interface patterns", description: "Collection of visual resources applied to UI experiments.", tech: ["CSS", "UI Design", "Front-End"], status: "CodePen", link: cp("RNRmKOv"), embedUrl: cpe("RNRmKOv") },
  { name: "Button balls", description: "Button experiment with physical behavior and real-time animated feedback.", tech: ["JavaScript", "CSS", "Interaction"], status: "CodePen", link: cp("NWVmmJE"), embedUrl: cpe("NWVmmJE") },
  { name: "Layout exploration", description: "Block composition and spacing system for complex screens.", tech: ["CSS", "Grid", "Layout"], status: "CodePen", link: cp("OPXYpOM"), embedUrl: cpe("OPXYpOM") },
  { name: "Advanced hover effects", description: "Hover variations focused on clarity, contrast, and micro-feedback.", tech: ["CSS", "JavaScript", "Microinteraction"], status: "CodePen", link: cp("ZYONeJv"), embedUrl: cpe("ZYONeJv") },
  { name: "Dynamic UI", description: "Interface experiment prioritizing readability and controlled motion.", tech: ["JavaScript", "CSS", "UI"], status: "CodePen", link: cp("dPXEvRr"), embedUrl: cpe("dPXEvRr") },
  { name: "Interactive cards", description: "Card component test focused on content hierarchy.", tech: ["CSS", "JavaScript", "Components"], status: "CodePen", link: cp("EayzWaQ"), embedUrl: cpe("EayzWaQ") },
  { name: "State and transition", description: "State-change evaluation for predictable interaction behavior.", tech: ["JavaScript", "UI", "UX"], status: "CodePen", link: cp("emzavzG"), embedUrl: cpe("emzavzG") },
  { name: "Visual composition", description: "Exercise in rhythm and balance applied to functional elements.", tech: ["CSS", "Design", "Front-End"], status: "CodePen", link: cp("WbxBpOo"), embedUrl: cpe("WbxBpOo") },
  { name: "Progressive interaction", description: "Scales interactions from simple actions to richer flows.", tech: ["JavaScript", "DOM", "UX"], status: "CodePen", link: cp("qENGmob"), embedUrl: cpe("qENGmob") },
  { name: "Visual accessibility tests", description: "Contrast, sizing, and feedback adjustments for better comprehension.", tech: ["CSS", "Accessibility", "UI"], status: "CodePen", link: cp("yyJWbvZ"), embedUrl: cpe("yyJWbvZ") },
  { name: "Navigation experiment", description: "Alternative navigation patterns focused on path clarity.", tech: ["JavaScript", "UI", "Architecture"], status: "CodePen", link: cp("RNRmpMw"), embedUrl: cpe("RNRmpMw") },
  { name: "Style system", description: "Visual consistency test and reusable typography patterns.", tech: ["CSS", "Design System", "UI"], status: "CodePen", link: cp("ZYONexr"), embedUrl: cpe("ZYONexr") },
  { name: "Idea canvas", description: "Sandbox to validate visual concepts quickly.", tech: ["JavaScript", "Canvas", "Creativity"], status: "CodePen", link: cp("QwERpQv"), embedUrl: cpe("QwERpQv") },
  { name: "Modular patterns", description: "Decoupled UI blocks for faster prototype iteration.", tech: ["JavaScript", "CSS", "Modular"], status: "CodePen", link: cp("pvbmepr"), embedUrl: cpe("pvbmepr") },
  { name: "Timed interactions", description: "Timing and delay experiments to guide user attention.", tech: ["JavaScript", "Animation", "UX"], status: "CodePen", link: cp("zxBQdxP"), embedUrl: cpe("zxBQdxP") },
  { name: "Typography lab", description: "Hierarchy exploration combining typography and dynamic elements.", tech: ["CSS", "Typography", "Design"], status: "CodePen", link: cp("gbMJRGQ"), embedUrl: cpe("gbMJRGQ") },
  { name: "Narrative prototype", description: "Combines motion and content to tell a visual story.", tech: ["JavaScript", "CSS", "Storytelling"], status: "CodePen", link: cp("myEYwVx"), embedUrl: cpe("myEYwVx") },
  { name: "Reactive interface", description: "Real-time behavior adjustments based on user actions.", tech: ["JavaScript", "State", "UI"], status: "CodePen", link: cp("QwERvJJ"), embedUrl: cpe("QwERvJJ") },
  { name: "Collection finale", description: "Final experiment in the set with a synthesis of visual and technical resources.", tech: ["JavaScript", "CSS", "CodePen"], status: "CodePen", link: cp("bNeyRjX"), embedUrl: cpe("bNeyRjX") },
]

const projectsData: Record<Locale, Record<string, ProjectsSectionData>> = {
  es: {
    "proyectos-sitios": {
      title: "Sitios Web",
      description: "Sitios web corporativos y de presentacion, optimizados para SEO y rendimiento.",
      icon: <Globe className="h-5 w-5" />,
      projects: [
        { name: "Exploracion visual de arquitectura con stack moderno (Next.js + React)", description: "Proyecto personal orientado a exploracion visual de arquitectura y fotografia arquitectonica, implementado con React y Next.js utilizando generacion de sitios estaticos (SSG) para optimizar performance y tiempos de carga. La interfaz se construyo con Tailwind CSS y componentes de shadcn/ui sobre Radix UI, priorizando composicion visual, jerarquia tipografica y layout responsive. Se integro analitica con GA4, optimizacion de carga de fuentes via Google Font API, y se configuro despliegue en SiteGround con Nginx como proxy reverso. El pipeline de desarrollo utiliza Turbopack y Priority Hints para mejorar la priorizacion de recursos criticos en el render inicial. El proyecto funciona como sandbox para probar arquitectura de frontend, performance en SSG y patrones de UI reutilizables para futuros proyectos productivos.", tech: ["Next.js", "React", "SSG", "Tailwind CSS", "shadcn/ui", "Radix UI", "Performance", "Nginx", "GA4"], status: "Demo", link: "https://ivanz88.sg-host.com/", preview: "https://i.imgur.com/ZSqN1vt.gif" },
        { name: "Sistema de e-commerce interactivo para marca de moda", description: "Proyecto demo de e-commerce para marca de moda, implementado con React y Next.js (SSG), con arquitectura de frontend orientada a performance y motion UI. La experiencia integra animaciones complejas con GSAP para transiciones de secciones, estados de componentes y narrativa visual, y Lenis para scroll suave sincronizado con animaciones. Se implemento flujo de catalogo, galeria de producto y carrito de compra en frontend, con composicion modular de componentes reutilizables. Se optimizo el render inicial mediante Priority Hints, carga progresiva de media y control de ejecucion de animaciones en dispositivos moviles.", tech: ["Next.js", "React", "E-commerce", "GSAP", "Lenis", "Motion Design", "SSG", "Performance", "GA4", "Nginx"], status: "Demo", link: "https://ivanz92.sg-host.com/", preview: "https://youtu.be/HnEAPewnPX0" },
        { name: "Sistema de motion y layout dinamico para estudio creativo (Next.js)", description: "Proyecto demo para explorar motion design y narrativa visual en un sitio para despacho de interiorismo, implementado con React y Next.js (SSG). Se integraron animaciones con GSAP para control de timelines y transiciones entre secciones, y Lenis para scroll suave con sincronizacion de animaciones. El layout se construyo con flujos no lineales y componentes modulares, reutilizando patrones previos dentro del ecosistema de Next.js. Se priorizo performance en el render inicial mediante Priority Hints, carga progresiva de assets y control de ejecucion de animaciones en moviles, funcionando como laboratorio de UI/motion para prototipar interacciones reutilizables en proyectos productivos.", tech: ["Next.js", "React", "GSAP", "Lenis", "Motion Design", "SSG", "Performance", "Nginx", "GA4"], status: "Demo", link: "https://ivanz89.sg-host.com/", preview: "https://youtu.be/-2bu2h-BvPo" },
        { name: "Galeria minimalista para fotografia arquitectonica con scroll cinematico (GSAP)", description: "Proyecto demo enfocado en una galeria visual minimalista para presentar imagenes de gran formato y alto impacto visual. Implementado en HTML, CSS y JavaScript con scroll suave mediante Lenis y animaciones controladas con GSAP para reforzar la transicion entre escenas sin sobrecargar la interfaz. Se priorizo una composicion limpia, tipografia contenida y jerarquia visual enfocada en el contenido, con optimizacion de carga de imagenes y distribucion de assets via CDN (Cloudflare / jsDelivr / unpkg). Se integro GA4 para instrumentar navegacion basica dentro de la experiencia visual.", tech: ["HTML", "CSS", "JavaScript", "GSAP", "Lenis", "Minimal UI", "Image Gallery", "CDN", "GA4", "Performance"], status: "Demo", link: "https://ivanz90.sg-host.com/", preview: "https://youtu.be/8C29lbWuEvw" },
        { name: "Arquitectura de motion UI para sitio de estudio de interiorismo", description: "Proyecto demo para un estudio de arquitectura, implementado con React y Next.js (SSG), con enfoque en microanimaciones y motion UI para enriquecer la experiencia sin saturar la interfaz. Las transiciones y estados de componentes se resolvieron con Framer Motion, y el scroll suave con Lenis para sincronizar animaciones con la navegacion. La UI se construyo con Tailwind CSS y componentes de shadcn/ui sobre Radix UI, priorizando accesibilidad, composicion modular y consistencia visual. Se optimizo el render inicial con Priority Hints, se integro GA4 para analitica de interaccion y se desplego bajo Nginx como proxy reverso en SiteGround, cuidando performance y estabilidad en produccion.", tech: ["Next.js", "React", "Framer Motion", "Lenis", "Tailwind CSS", "shadcn/ui", "Radix UI", "SSG", "Performance", "GA4", "Nginx"], status: "Demo", link: "https://ivanz90.sg-host.com/", preview: "https://youtu.be/PZfKFIgPr1w" },
        { name: "Bienes Raices - Integracion personalizada de EasyBroker en WordPress", description: "Se desarrollo un sitio web inmobiliario en WordPress utilizando su CMS para la gestion de contenido por parte del cliente. Debido a que EasyBroker no expone una API publica oficial, se implemento una integracion personalizada mediante un plugin propio que consume, normaliza y mapea los datos de propiedades hacia estructuras internas de WordPress (custom post types y meta fields). La sincronizacion del catalogo se resolvio mediante procesos automatizados con control de cache y actualizacion periodica para evitar impactos de performance. El frontend se monto sobre una plantilla seleccionada por el cliente, adaptada a su branding, con renderizado de listados, fichas de propiedad y filtros, manteniendo una arquitectura escalable para futuras extensiones.", tech: ["WordPress", "Plugin Development", "API Integration", "Custom Post Types", "Data Mapping", "Performance"], status: "Live", link: "https://negocianterealestate.com/", preview: "https://youtu.be/hjv3JFzTsJE" },
        { name: "Landing page estatica para marca gastronomica", description: "Se desarrollo un sitio web estatico utilizando HTML, CSS y JavaScript puro, sin frameworks, priorizando control total del layout y bajo overhead en el frontend. El requerimiento principal fue traducir la identidad visual del restaurante -oscura, elegante y de caracter masculino- a una experiencia web basada en composicion visual, fotografia de alto contraste y jerarquia tipografica. El sitio se estructuro como una landing page informativa orientada a branding y presentacion del concepto. Se integro OpenTable para el flujo de reservaciones directamente desde el sitio, manteniendo la experiencia del usuario dentro del ecosistema del restaurante. Adicionalmente, se desarrollo un popup de anuncios en la carga inicial para comunicar promociones y eventos temporales, se optimizo el peso de imagenes, estructura responsive y compatibilidad cross-browser, manteniendo el diseno consistente en distintos dispositivos sin dependencias externas.", tech: ["HTML", "CSS", "JavaScript", "Static Site", "OpenTable Integration", "UI Branding", "Performance"], status: "Live", link: "https://cienfuegos.mx/", preview: "https://youtu.be/tvaE6EzjBPI" },
        { name: "Experimento de UI animada para marca gastronomica", description: "Se desarrollo una landing page interactiva en HTML, CSS y JavaScript con enfoque en motion y microinteracciones para evitar una experiencia estatica. Las animaciones se implementaron con GSAP para control de timelines y estados de UI, y la navegacion de galerias y carruseles con Swiper. La interfaz se construyo de forma modular mediante templates en el frontend para reutilizar componentes animados. Se integro analitica con GA4 via Google Tag Manager y se priorizo performance mediante lazy loading de media, optimizacion de assets y control de ejecucion de animaciones en dispositivos moviles. Las imagenes del demo fueron generadas con IA como placeholders para validar narrativa visual antes de produccion final.", tech: ["HTML", "CSS", "JavaScript", "GSAP", "Microinteractions", "Swiper.js", "lit-html", "GA4", "Tag Manager", "Performance"], status: "Demo", link: "https://ivanz31.sg-host.com/", preview: "https://youtu.be/o9kQovpPLWI" },
        { name: "Sistema de galeria con scroll libre en dos ejes", description: "Se desarrollo una galeria visual interactiva en HTML, CSS y JavaScript con navegacion libre en ambos ejes (horizontal y vertical), permitiendo explorar el contenido mediante scroll continuo en multiples direcciones. La experiencia se apoya en animaciones y control de estado con GSAP para manejar transiciones, inercia de movimiento y feedback visual durante la navegacion. La arquitectura del frontend prioriza control de performance y fluidez en la manipulacion del viewport, con carga optimizada de imagenes y control de eventos de scroll para evitar jank en dispositivos de bajo rendimiento. Se integro analitica con GA4 para instrumentar interaccion del usuario dentro del canvas visual, y se desplego bajo Nginx con CDN (jsDelivr) para distribucion eficiente de assets estaticos.", tech: ["HTML", "CSS", "JavaScript", "GSAP", "Interactive Gallery", "2D Scrolling", "Performance", "GA4", "Nginx", "CDN"], status: "Demo", link: "https://ivanz87.sg-host.com/", preview: "https://youtu.be/6d3KezAIlL0" },
      ],
    },
    "proyectos-apps": {
      title: "Apps Web",
      description: "Aplicaciones web completas, listas para produccion.",
      icon: <Globe className="h-5 w-5" />,
      projects: [
        { name: "SaaS Dashboard", description: "Panel de control para gestion de suscripciones y metricas de negocio en tiempo real.", tech: ["Next.js", "TypeScript", "Supabase", "Stripe"], status: "Produccion", link: "#", preview: "/gifs/web-template.gif" },
        { name: "E-commerce Headless", description: "Tienda online con CMS headless, pasarela de pago y gestion de inventario automatizada.", tech: ["React", "Node.js", "PostgreSQL", "Tailwind"], status: "Produccion", link: "#", preview: "/gifs/web-template.gif" },
        { name: "Plataforma de Reservas", description: "Sistema de reservas con calendario interactivo, notificaciones y pagos integrados.", tech: ["Next.js", "Prisma", "Resend", "Vercel"], status: "Produccion", link: "#", preview: "/gifs/web-template.gif" },
      ],
    },
    "proyectos-mvps": {
      title: "MVPs",
      description: "Productos minimos viables entregados en tiempo record.",
      icon: <Rocket className="h-5 w-5" />,
      projects: [
        { name: "ValidaBot", description: "Herramienta de validacion de ideas de negocio con encuestas automatizadas y analisis de mercado.", tech: ["Next.js", "OpenAI", "Supabase"], status: "Beta", link: "#" },
        { name: "QuickInvoice", description: "Generador de facturas para freelancers con envio automatico y tracking de pagos.", tech: ["React", "Node.js", "PDF", "Stripe"], status: "Lanzado", link: "#" },
        { name: "FitTrack", description: "App de seguimiento de rutinas de ejercicio con progresion visual y estadisticas.", tech: ["Next.js", "Supabase", "Charts"], status: "MVP", link: "#" },
      ],
    },
    "proyectos-experimentos": {
      title: "Experimentos",
      description: "Exploraciones tecnicas y proyectos personales.",
      icon: <FlaskConical className="h-5 w-5" />,
      projects: experimentsEs,
    },
  },
  en: {
    "proyectos-sitios": {
      title: "Websites",
      description: "Corporate and marketing websites optimized for SEO and performance.",
      icon: <Globe className="h-5 w-5" />,
      projects: [
        { name: "TechCorp Corporate Website", description: "Corporate website with integrated CMS, multilingual support, and advanced SEO optimization.", tech: ["Next.js", "TypeScript", "TailwindCSS", "Strapi CMS"], status: "Production", link: "#", preview: "/gifs/web-template.gif" },
        { name: "Design Portfolio", description: "Professional digital portfolio with interactive gallery, animation, and direct contact.", tech: ["React", "Framer Motion", "Tailwind", "SendGrid"], status: "Production", link: "#", preview: "/gifs/web-template.gif" },
        { name: "Blog + Ecommerce Website", description: "Integrated blog and store platform with dynamic articles and shopping cart.", tech: ["Next.js", "MDX", "Stripe", "PostgreSQL"], status: "Production", link: "#", preview: "/gifs/web-template.gif" },
      ],
    },
    "proyectos-apps": {
      title: "Web Apps",
      description: "Complete web applications ready for production.",
      icon: <Globe className="h-5 w-5" />,
      projects: [
        { name: "SaaS Dashboard", description: "Control panel for subscriptions and real-time business metrics.", tech: ["Next.js", "TypeScript", "Supabase", "Stripe"], status: "Production", link: "#", preview: "/gifs/web-template.gif" },
        { name: "Headless Ecommerce", description: "Online store with headless CMS, payment gateway, and automated inventory management.", tech: ["React", "Node.js", "PostgreSQL", "Tailwind"], status: "Production", link: "#", preview: "/gifs/web-template.gif" },
        { name: "Booking Platform", description: "Reservation system with interactive calendar, notifications, and integrated payments.", tech: ["Next.js", "Prisma", "Resend", "Vercel"], status: "Production", link: "#", preview: "/gifs/web-template.gif" },
      ],
    },
    "proyectos-mvps": {
      title: "MVPs",
      description: "Minimum viable products delivered in record time.",
      icon: <Rocket className="h-5 w-5" />,
      projects: [
        { name: "ValidaBot", description: "Business idea validation tool with automated surveys and market analysis.", tech: ["Next.js", "OpenAI", "Supabase"], status: "Beta", link: "#" },
        { name: "QuickInvoice", description: "Invoice generator for freelancers with automated sending and payment tracking.", tech: ["React", "Node.js", "PDF", "Stripe"], status: "Launched", link: "#" },
        { name: "FitTrack", description: "Workout tracking app with visual progression and analytics.", tech: ["Next.js", "Supabase", "Charts"], status: "MVP", link: "#" },
      ],
    },
    "proyectos-experimentos": {
      title: "Experiments",
      description: "Technical explorations and personal projects.",
      icon: <FlaskConical className="h-5 w-5" />,
      projects: experimentsEn,
    },
  },
}

export function ProyectosSection({ type, locale }: { type: "proyectos-sitios" | "proyectos-apps" | "proyectos-mvps" | "proyectos-experimentos"; locale: Locale }) {
  const data = projectsData[locale][type]
  const showQR = type === "proyectos-sitios" || type === "proyectos-apps"
  const isExperiments = type === "proyectos-experimentos"
  const [hoveredProject, setHoveredProject] = useState<string | null>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(typeof window !== "undefined" ? window.innerWidth < 768 : false)
    check()
    window.addEventListener("resize", check)
    return () => window.removeEventListener("resize", check)
  }, [])

  return (
    <div className="flex flex-col gap-10 py-8">
      <div className="flex flex-col gap-3">
        <motion.div {...fadeUp} transition={{ duration: 0.5, delay: 0.1 }} className="flex items-center gap-3">
          <div className="flex items-center justify-center h-9 w-9 rounded-md bg-accent text-foreground">{data.icon}</div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">{data.title}</h1>
          </div>
        </motion.div>
        <motion.p {...fadeUp} transition={{ duration: 0.5, delay: 0.2 }} className="text-muted-foreground text-sm">{data.description}</motion.p>
      </div>

      <div className="flex flex-col gap-4">
        {data.projects.map((project, i) => {
          const youtubePreviewUrl = getYouTubePreviewEmbedUrl(project.preview)
          const previewAlt = locale === "en" ? `Preview of ${project.name}` : `Preview de ${project.name}`

          return isExperiments && !project.embedUrl ? null : <motion.div
            key={`${type}-${project.name}-${i}`}
            {...fadeUp}
            transition={{ duration: 0.4, delay: 0.15 * (i + 1) }}
            className={`group relative flex ${showQR ? "flex-col lg:flex-row lg:gap-6 gap-4" : "flex-col gap-4"} ${isExperiments ? "overflow-hidden rounded-2xl border border-border/70 bg-card/70 p-0 hover:border-primary/40" : "p-5 rounded-lg border border-border bg-card hover:border-muted-foreground/20"} transition-all duration-300`}
            onMouseEnter={() => (showQR && !isMobile) && setHoveredProject(project.name)}
            onMouseLeave={() => {
              if (showQR && !isMobile) setHoveredProject(null)
              setMousePosition({ x: 0, y: 0 })
            }}
            onMouseMove={(e) => {
              if (!isMobile && showQR) {
                const rect = e.currentTarget.getBoundingClientRect()
                const x = (e.clientX - rect.left - rect.width / 2) * -0.5
                const y = (e.clientY - rect.top - rect.height / 2) * -0.5
                setMousePosition({ x, y })
              }
            }}
            onClick={() => showQR && isMobile && setHoveredProject(hoveredProject === project.name ? null : project.name)}
          >
            {showQR && (
              <div className="flex-shrink-0 flex items-center">
                <div className="p-2 bg-white rounded-md">
                  <QRCodeSVG value={project.link || `${project.name}`} size={100} level="H" includeMargin={false} />
                </div>
              </div>
            )}

            <AnimatePresence>
              {showQR && hoveredProject === project.name && project.preview && (
                <>
                  {!isMobile && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8, y: -20, x: 0 }}
                      animate={{ opacity: 1, scale: 1, y: 0, x: mousePosition.x }}
                      exit={{ opacity: 0, scale: 0.8, y: -20, x: 0 }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      className="absolute lg:-top-32 lg:right-0 top-0 left-1/2 -translate-x-1/2 lg:translate-x-0 z-50 pointer-events-none"
                    >
                      <div className="relative">
                        {youtubePreviewUrl ? (
                          <iframe
                            src={youtubePreviewUrl}
                            title={previewAlt}
                            className="w-56 sm:w-64 aspect-video rounded-lg border border-border bg-black"
                            loading="lazy"
                            allow="autoplay; encrypted-media; picture-in-picture"
                            referrerPolicy="strict-origin-when-cross-origin"
                            style={{ boxShadow: "0 20px 40px rgba(0, 0, 0, 0.45), 0 12px 24px rgba(0, 0, 0, 0.32)", transform: `translateY(${mousePosition.y}px)` }}
                          />
                        ) : (
                          <img
                            src={project.preview}
                            alt={previewAlt}
                            className="w-56 sm:w-64 h-auto rounded-lg border border-border"
                            style={{ boxShadow: "0 20px 40px rgba(0, 0, 0, 0.45), 0 12px 24px rgba(0, 0, 0, 0.32)", transform: `translateY(${mousePosition.y}px)` }}
                          />
                        )}
                      </div>
                    </motion.div>
                  )}

                  {isMobile && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.18 }}
                      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
                      onClick={() => setHoveredProject(null)}
                    >
                      <div className="w-full max-w-md">
                        {youtubePreviewUrl ? (
                          <iframe
                            src={youtubePreviewUrl}
                            title={previewAlt}
                            className="w-full aspect-video rounded-lg border border-border bg-black"
                            loading="lazy"
                            allow="autoplay; encrypted-media; picture-in-picture"
                            referrerPolicy="strict-origin-when-cross-origin"
                            style={{ boxShadow: "0 20px 40px rgba(0, 0, 0, 0.45)" }}
                          />
                        ) : (
                          <img
                            src={project.preview}
                            alt={previewAlt}
                            className="w-full h-auto rounded-lg border border-border"
                            style={{ boxShadow: "0 20px 40px rgba(0, 0, 0, 0.45)" }}
                          />
                        )}
                      </div>
                    </motion.div>
                  )}
                </>
              )}
            </AnimatePresence>

            {isExperiments ? (
              <div className="flex flex-col">
                <div className="relative w-full bg-black">
                  <iframe
                    src={project.embedUrl}
                    title={locale === "en" ? `Embed of ${project.name}` : `Embed de ${project.name}`}
                    className="h-[320px] w-full md:h-[420px]"
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  />
                </div>
                <div className="flex flex-col gap-3 p-4 md:p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex flex-col gap-1.5">
                      <h3 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors">{project.name}</h3>
                      <span className="inline-flex items-center px-2 py-0.5 text-[11px] font-mono rounded-sm bg-accent text-muted-foreground w-fit">{project.status}</span>
                    </div>
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-all"
                        aria-label={locale === "en" ? `View ${project.name} on CodePen` : `Ver ${project.name} en CodePen`}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{project.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tech.map((t) => (
                      <span key={`${project.name}-${t}`} className="px-2 py-1 text-[11px] font-mono text-muted-foreground bg-secondary rounded-sm">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex-1 flex flex-col gap-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex flex-col gap-1.5">
                    <h3 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors">{project.name}</h3>
                    <span className="inline-flex items-center px-2 py-0.5 text-[11px] font-mono rounded-sm bg-accent text-muted-foreground w-fit">{project.status}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-all"
                        aria-label={locale === "en" ? `View ${project.name}` : `Ver ${project.name}`}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    )}
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-all"
                        aria-label={locale === "en" ? `${project.name} GitHub` : `GitHub de ${project.name}`}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Github className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {project.tech.map((t) => (
                    <span key={`${project.name}-${t}`} className="px-2 py-1 text-[11px] font-mono text-muted-foreground bg-secondary rounded-sm">{t}</span>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        })}
      </div>
    </div>
  )
}









