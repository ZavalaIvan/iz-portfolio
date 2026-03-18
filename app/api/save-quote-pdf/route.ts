import { mkdir, writeFile } from "fs/promises"
import { NextRequest, NextResponse } from "next/server"
import path from "path"

interface SaveQuotePayload {
  fileName?: string
  pdfBase64?: string
  quoteData?: unknown
}

function sanitizeFileName(fileName: string) {
  return fileName
    .toLowerCase()
    .replace(/[^a-z0-9._-]+/g, "-")
    .replace(/(^-|-$)/g, "")
}

export async function POST(request: NextRequest) {
  const body = (await request.json().catch(() => null)) as SaveQuotePayload | null
  const fileName = body?.fileName?.trim()
  const pdfBase64 = body?.pdfBase64?.trim()

  if (!fileName || !pdfBase64) {
    return NextResponse.json({ error: "Missing file data." }, { status: 400 })
  }

  try {
    const quotesDir = path.join(process.cwd(), "generated-quotes")
    await mkdir(quotesDir, { recursive: true })

    const safeFileName = sanitizeFileName(fileName.endsWith(".pdf") ? fileName : `${fileName}.pdf`)
    const filePath = path.join(quotesDir, safeFileName)
    const pdfBuffer = Buffer.from(pdfBase64, "base64")

    await writeFile(filePath, pdfBuffer)

    return NextResponse.json({
      ok: true,
      filePath,
    })
  } catch {
    return NextResponse.json({ error: "Failed to save PDF copy." }, { status: 500 })
  }
}
