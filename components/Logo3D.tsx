"use client"

import { useEffect, useRef, useState } from "react"
import { useTheme } from "next-themes"

export default function Logo3D({ modelRef }: { modelRef: any }) {
  const [ready, setReady] = useState(false)
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === "dark"
  const originalColorsRef = useRef<Map<number, [number, number, number, number]>>(new Map())

  useEffect(() => {
    let cancelled = false

    const loadModelViewerScript = (src: string) =>
      new Promise<void>((resolve, reject) => {
        const existing = document.querySelector(`script[src="${src}"]`) as HTMLScriptElement | null
        if (existing) {
          if ((window as any).customElements?.get("model-viewer")) {
            resolve()
            return
          }
          existing.addEventListener("load", () => resolve(), { once: true })
          existing.addEventListener("error", () => reject(new Error(`No se pudo cargar ${src}`)), { once: true })
          return
        }

        const script = document.createElement("script")
        script.type = "module"
        script.src = src
        script.onload = () => resolve()
        script.onerror = () => reject(new Error(`No se pudo cargar ${src}`))
        document.head.appendChild(script)
      })

    const ensureModelViewer = async () => {
      if (!(window as any).customElements?.get("model-viewer")) {
        const sources = [
          "https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js",
          "https://cdn.jsdelivr.net/npm/@google/model-viewer/dist/model-viewer.min.js",
        ]

        let loaded = false
        for (const src of sources) {
          try {
            await loadModelViewerScript(src)
            loaded = true
            break
          } catch {
            // intenta la siguiente CDN
          }
        }

        if (!loaded) return
      }

      await (window as any).customElements.whenDefined("model-viewer")
      if (!cancelled) setReady(true)
    }

    ensureModelViewer().catch(() => {
      // fallback silencioso: mantiene placeholder si no hay red/CDN
    })

    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    if (!ready) return

    const mv: any = modelRef.current
    if (!mv) return

    const applyMaterialTheme = () => {
      const materials = mv?.model?.materials as any[] | undefined
      if (!materials?.length) return

      materials.forEach((mat, index) => {
        const pbr = mat?.pbrMetallicRoughness
        if (!pbr?.setBaseColorFactor || !pbr?.baseColorFactor) return

        if (!originalColorsRef.current.has(index)) {
          const base = pbr.baseColorFactor as [number, number, number, number]
          originalColorsRef.current.set(index, [base[0], base[1], base[2], base[3]])
        }

        if (isDark) {
          pbr.setBaseColorFactor([1, 1, 1, 1])
        } else {
          const original = originalColorsRef.current.get(index)
          if (original) pbr.setBaseColorFactor(original)
        }
      })
    }

    if (mv.model) {
      applyMaterialTheme()
      return
    }

    mv.addEventListener("load", applyMaterialTheme, { once: true })
    return () => mv.removeEventListener("load", applyMaterialTheme)
  }, [ready, isDark, modelRef])

  if (!ready) {
    return (
      <img
        src="/logo-ivan-zavala.jpg"
        alt="Logo Ivan Zavala"
        style={{
          width: 56,
          height: 56,
          borderRadius: 6,
          objectFit: "cover",
          display: "block",
        }}
      />
    )
  }

  return (
    // @ts-ignore
    <model-viewer
      src="/3d/logo-ivan-zavala.glb"
      alt="Logotipo 3D de Iván Zavala"
      className="h-14 w-14 rounded-sm"
      scale="0.02 0.02 0.02"
      reveal="auto"
      loading="eager"
      camera-target="auto auto auto"
      camera-orbit="0deg 75deg 4.5m"
      min-camera-orbit="auto auto 3.5m"
      max-camera-orbit="auto auto 7m"
      camera-controls
      interaction-prompt="none"
      environment-image="neutral"
      exposure={isDark ? "1.65" : "1.4"}
      shadow-intensity={isDark ? "0.08" : "0.6"}
      shadow-softness={isDark ? "1.6" : "1"}
      auto-play
     ref={(el: HTMLElement | null) => {
       if (el) modelRef.current = el
       }}

      style={{
        width: 56,
        height: 56,
        background: "transparent",
        filter: "none",
        display: "block",
        overflow: "visible",
        transformStyle: "flat",
        zIndex: 20,
      }}
    />
  )
}
