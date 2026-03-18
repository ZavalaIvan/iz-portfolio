import React from "react"
import {
  Document,
  Image,
  Page,
  StyleSheet,
  Text,
  View,
  pdf,
} from "@react-pdf/renderer"
import type { QuoteDocumentData } from "@/components/sections/cotizacion-template"

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#f3f3f1",
    padding: 18,
    fontSize: 10,
    color: "#161616",
  },
  shell: {
    backgroundColor: "#ffffff",
    border: "1 solid #d7d7d2",
    flexDirection: "row",
    minHeight: "100%",
  },
  sidebar: {
    width: 182,
    backgroundColor: "#fafaf8",
    borderRight: "1 solid #d7d7d2",
    padding: 14,
    gap: 14,
  },
  main: {
    flex: 1,
    padding: 14,
    gap: 14,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 12,
  },
  badge: {
    border: "1 solid #d7d7d2",
    paddingVertical: 5,
    paddingHorizontal: 10,
    fontSize: 8,
    letterSpacing: 1.5,
    textTransform: "uppercase",
    color: "#616161",
    minWidth: 84,
    textAlign: "center",
  },
  sectionLabel: {
    fontSize: 8,
    letterSpacing: 1.6,
    textTransform: "uppercase",
    color: "#6a6a6a",
    marginBottom: 10,
  },
  contactCard: {
    border: "1 solid #dcdcd7",
    padding: 12,
    gap: 8,
  },
  clientField: {
    border: "1 dashed #d7d7d2",
    padding: 10,
    gap: 4,
  },
  fieldLabel: {
    fontSize: 8,
    letterSpacing: 1.2,
    textTransform: "uppercase",
    color: "#6a6a6a",
  },
  fieldValue: {
    fontSize: 10,
    color: "#171717",
  },
  metaValueCompact: {
    fontSize: 8.5,
    color: "#171717",
  },
  header: {
    borderBottom: "1 solid #d7d7d2",
    paddingBottom: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  headerText: {
    flex: 1,
    maxWidth: 372,
  },
  title: {
    fontSize: 21,
    lineHeight: 1.08,
    fontWeight: 700,
    marginTop: 8,
  },
  paragraph: {
    marginTop: 8,
    color: "#555555",
    lineHeight: 1.45,
  },
  metaColumn: {
    width: 122,
    gap: 6,
  },
  metaCard: {
    border: "1 solid #d7d7d2",
    padding: 8,
    gap: 4,
  },
  twoCol: {
    flexDirection: "row",
    gap: 10,
  },
  col: {
    flex: 1,
  },
  panel: {
    border: "1 solid #d7d7d2",
    padding: 10,
    gap: 8,
  },
  listItem: {
    border: "1 solid #e2e2dd",
    padding: 8,
    flexDirection: "row",
    gap: 8,
  },
  indexBox: {
    width: 24,
    height: 24,
    border: "1 solid #d7d7d2",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 8,
    color: "#6a6a6a",
  },
  listText: {
    flex: 1,
    fontSize: 9.5,
    lineHeight: 1.4,
    color: "#171717",
  },
  amountCard: {
    border: "1 solid #e2e2dd",
    padding: 8,
    gap: 4,
  },
  amount: {
    fontSize: 16,
    fontWeight: 700,
    color: "#171717",
  },
  note: {
    fontSize: 8,
    lineHeight: 1.35,
    color: "#6a6a6a",
  },
  plainItem: {
    border: "1 solid #e2e2dd",
    paddingVertical: 7,
    paddingHorizontal: 8,
    fontSize: 9.5,
    lineHeight: 1.4,
    color: "#171717",
  },
  iconRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  iconBox: {
    width: 22,
    height: 22,
    border: "1 solid #d7d7d2",
    alignItems: "center",
    justifyContent: "center",
    color: "#555555",
    fontSize: 9,
  },
  logo: {
    width: 152,
    height: 152,
    objectFit: "contain",
  },
  logoWrap: {
    width: 152,
    height: 60,
    overflow: "hidden",
    justifyContent: "flex-start",
  },
})

function IconGlyph({ glyph }: { glyph: string }) {
  return (
    <View style={styles.iconBox}>
      <Text>{glyph}</Text>
    </View>
  )
}

function QuotePdfDocument({
  data,
  logoSrc,
}: {
  data: QuoteDocumentData
  logoSrc: string
}) {
  return (
    <Document>
      <Page size="LETTER" style={styles.page}>
        <View style={styles.shell}>
          <View style={styles.sidebar}>
            <View style={styles.row}>
              <View style={styles.logoWrap}>
                <Image src={logoSrc} style={[styles.logo, { marginTop: -18, marginLeft: -54 }]} />
              </View>
              <Text style={styles.badge}>Cotización</Text>
            </View>

            <View>
              <Text style={styles.sectionLabel}>Contacto</Text>
              <View style={styles.contactCard}>
                <Text style={{ fontSize: 11, fontWeight: 700 }}>Iván Zavala</Text>
                <Text style={{ fontSize: 10, lineHeight: 1.6, color: "#555555" }}>
                  Desarrollo web, SEO técnico y productos digitales.
                </Text>
                <View style={{ gap: 8, marginTop: 6 }}>
                  <View style={styles.iconRow}>
                    <IconGlyph glyph="@" />
                    <Text>hola@ivanzavala.dev</Text>
                  </View>
                  <View style={styles.iconRow}>
                    <IconGlyph glyph="T" />
                    <Text>+52 999 356 7229</Text>
                  </View>
                  <View style={styles.iconRow}>
                    <IconGlyph glyph="W" />
                    <Text>ivanzavala.dev</Text>
                  </View>
                </View>
              </View>
            </View>

            <View>
              <Text style={styles.sectionLabel}>Datos del cliente</Text>
              <View style={{ gap: 8 }}>
                <View style={styles.clientField}>
                  <Text style={styles.fieldLabel}>Nombre</Text>
                  <Text style={styles.fieldValue}>{data.name || "____________________"}</Text>
                </View>
                <View style={styles.clientField}>
                  <Text style={styles.fieldLabel}>Nombre de empresa</Text>
                  <Text style={styles.fieldValue}>{data.company || "____________________"}</Text>
                </View>
                <View style={styles.clientField}>
                  <Text style={styles.fieldLabel}>Teléfono</Text>
                  <Text style={styles.fieldValue}>{data.phone || "____________________"}</Text>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.main}>
            <View style={styles.header}>
              <View style={styles.headerText}>
                <Text style={styles.sectionLabel}>Propuesta comercial</Text>
                <Text style={styles.title}>Propuesta de{"\n"}posicionamiento SEO.</Text>
                <Text style={styles.paragraph}>
                  Documento base para presentar alcance, entregables, tiempos e inversión con una
                  estructura clara, profesional y lista para descarga en PDF.
                </Text>
              </View>

              <View style={styles.metaColumn}>
                <View style={styles.metaCard}>
                  <Text style={styles.fieldLabel}>Fecha</Text>
                  <Text style={styles.fieldValue}>{data.quoteDate}</Text>
                </View>
                <View style={styles.metaCard}>
                  <Text style={styles.fieldLabel}>Folio</Text>
                  <Text style={styles.metaValueCompact}>{data.folio}</Text>
                </View>
              </View>
            </View>

            <View style={styles.twoCol}>
              <View style={styles.col}>
                <View style={styles.panel}>
                  <Text style={styles.sectionLabel}>Alcance del servicio</Text>
                  {[
                    "Auditoría inicial del sitio y revisión de estado actual.",
                    "Optimización técnica y estructural de páginas clave.",
                    "Seguimiento mensual con ajustes y mejora continua.",
                  ].map((item, index) => (
                    <View key={item} style={styles.listItem}>
                      <View style={styles.indexBox}>
                        <Text>{`0${index + 1}`}</Text>
                      </View>
                      <Text style={styles.listText}>{item}</Text>
                    </View>
                  ))}
                </View>
              </View>

              <View style={[styles.col, { maxWidth: 220 }]}>
                <View style={styles.panel}>
                  <Text style={styles.sectionLabel}>Resumen económico</Text>
                  <View style={styles.amountCard}>
                    <Text style={styles.fieldLabel}>Inversión inicial</Text>
                    <Text style={styles.amount}>$3,000 MXN</Text>
                    <Text style={styles.note}>Primer mes de contratación.</Text>
                  </View>
                  <View style={styles.amountCard}>
                    <Text style={styles.fieldLabel}>Mantenimiento mensual</Text>
                    <Text style={styles.amount}>$2,500 MXN</Text>
                    <Text style={styles.note}>A partir del segundo mes en adelante.</Text>
                  </View>
                </View>
              </View>
            </View>

            <View style={styles.twoCol}>
              <View style={[styles.col, { maxWidth: 240 }]}>
                <View style={styles.panel}>
                  <Text style={styles.sectionLabel}>Entregables</Text>
                  {[
                    "Reporte de hallazgos y prioridades.",
                    "Implementación o listado de ajustes.",
                    "Seguimiento de métricas y visibilidad.",
                  ].map((item) => (
                    <Text key={item} style={styles.plainItem}>
                      {item}
                    </Text>
                  ))}
                </View>
              </View>

              <View style={styles.col}>
                <View style={styles.panel}>
                  <Text style={styles.sectionLabel}>Condiciones del servicio</Text>
                  {[
                    "El servicio incluye configuración inicial y seguimiento mensual.",
                    "Los ajustes se priorizan con base en impacto técnico y visibilidad orgánica.",
                    "Las métricas y avances se entregan en cada ciclo de seguimiento.",
                  ].map((item, index) => (
                    <View key={item} style={styles.listItem}>
                      <View style={styles.indexBox}>
                        <Text>{`0${index + 1}`}</Text>
                      </View>
                      <Text style={styles.listText}>{item}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  )
}

export async function generateQuotePdfBlob(data: QuoteDocumentData, logoSrc: string) {
  return pdf(<QuotePdfDocument data={data} logoSrc={logoSrc} />).toBlob()
}
