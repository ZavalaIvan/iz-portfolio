import type { Metadata } from "next"
import { SeoPresentationSection } from "@/components/sections/seo-presentation"

export const metadata: Metadata = {
  title: "SEO Presentation | Ivan Zavala",
  description: "Presentacion breve de servicios SEO: que es, por que importa y que incluye exactamente.",
}

export default function SeoPresentationPage() {
  return <SeoPresentationSection />
}
