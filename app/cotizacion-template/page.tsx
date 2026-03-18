import type { Metadata } from "next"
import { CotizacionTemplateSection } from "@/components/sections/cotizacion-template"

export const metadata: Metadata = {
  title: "Cotizacion Template | Ivan Zavala",
  description: "Plantilla visual de cotizacion con logo, contacto y estructura documental.",
}

export default function CotizacionTemplatePage() {
  return <CotizacionTemplateSection />
}
