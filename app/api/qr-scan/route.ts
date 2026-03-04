import { NextRequest, NextResponse } from "next/server"

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

const tableEndpoint = () => `${SUPABASE_URL}/rest/v1/qr_reads`
const rpcEndpoint = () => `${SUPABASE_URL}/rest/v1/rpc/increment_qr_read`

function getHeaders() {
  return {
    apikey: SUPABASE_KEY || "",
    Authorization: `Bearer ${SUPABASE_KEY || ""}`,
    "Content-Type": "application/json",
  }
}

function isConfigured() {
  return Boolean(SUPABASE_URL && SUPABASE_KEY)
}

function isValidRedirectTarget(url: string) {
  try {
    const parsed = new URL(url)
    return parsed.protocol === "https:" || parsed.protocol === "http:"
  } catch {
    return false
  }
}

async function incrementQrCounter(key: string) {
  if (!isConfigured()) return

  const rpcRes = await fetch(rpcEndpoint(), {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({ p_qr_key: key }),
  })

  if (rpcRes.ok) return

  const readRes = await fetch(
    `${tableEndpoint()}?select=qr_key,scans&qr_key=eq.${encodeURIComponent(key)}&limit=1`,
    { method: "GET", headers: getHeaders(), cache: "no-store" }
  )
  if (!readRes.ok) return

  const existing = (await readRes.json()) as Array<{ scans: number }>
  const current = Number(existing[0]?.scans || 0)
  const next = current + 1

  await fetch(`${tableEndpoint()}?on_conflict=qr_key`, {
    method: "POST",
    headers: {
      ...getHeaders(),
      Prefer: "resolution=merge-duplicates,return=minimal",
    },
    body: JSON.stringify([{ qr_key: key, scans: next }]),
  })
}

export async function GET(request: NextRequest) {
  const key = (request.nextUrl.searchParams.get("key") || "").trim()
  const to = (request.nextUrl.searchParams.get("to") || "").trim()

  if (!to || !isValidRedirectTarget(to)) {
    return NextResponse.json({ error: "Invalid redirect target." }, { status: 400 })
  }

  if (key) {
    await incrementQrCounter(key)
  }

  return NextResponse.redirect(to, { status: 307 })
}
