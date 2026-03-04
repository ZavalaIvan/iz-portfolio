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

export async function GET(request: NextRequest) {
  if (!isConfigured()) {
    return NextResponse.json({ error: "Supabase is not configured." }, { status: 500 })
  }

  const rawKeys = request.nextUrl.searchParams.get("keys") || ""
  const keys = rawKeys.split(",").map((k) => k.trim()).filter(Boolean)

  if (keys.length === 0) {
    return NextResponse.json({ counts: {} })
  }

  const inClause = keys.map((k) => `"${k.replaceAll('"', '\\"')}"`).join(",")
  const url = `${tableEndpoint()}?select=qr_key,scans&qr_key=in.(${encodeURIComponent(inClause)})`

  const response = await fetch(url, { method: "GET", headers: getHeaders(), cache: "no-store" })
  if (!response.ok) {
    return NextResponse.json({ error: "Failed to read QR counters." }, { status: 500 })
  }

  const rows = (await response.json()) as Array<{ qr_key: string; scans: number }>
  const counts = keys.reduce<Record<string, number>>((acc, key) => {
    acc[key] = 0
    return acc
  }, {})

  rows.forEach((row) => {
    counts[row.qr_key] = Number(row.scans || 0)
  })

  return NextResponse.json({ counts })
}

export async function POST(request: NextRequest) {
  if (!isConfigured()) {
    return NextResponse.json({ error: "Supabase is not configured." }, { status: 500 })
  }

  const body = (await request.json().catch(() => null)) as { key?: string } | null
  const key = body?.key?.trim()
  if (!key) {
    return NextResponse.json({ error: "Missing key." }, { status: 400 })
  }

  const rpcRes = await fetch(rpcEndpoint(), {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({ p_qr_key: key }),
  })

  if (rpcRes.ok) {
    const rpcData = (await rpcRes.json().catch(() => null)) as { scans?: number } | Array<{ scans?: number }> | null
    const count = Array.isArray(rpcData) ? Number(rpcData[0]?.scans || 0) : Number(rpcData?.scans || 0)
    return NextResponse.json({ count })
  }

  const readRes = await fetch(
    `${tableEndpoint()}?select=qr_key,scans&qr_key=eq.${encodeURIComponent(key)}&limit=1`,
    { method: "GET", headers: getHeaders(), cache: "no-store" }
  )

  if (!readRes.ok) {
    return NextResponse.json({ error: "Failed to read current counter." }, { status: 500 })
  }

  const existing = (await readRes.json()) as Array<{ qr_key: string; scans: number }>
  const current = Number(existing[0]?.scans || 0)
  const next = current + 1

  const upsertRes = await fetch(`${tableEndpoint()}?on_conflict=qr_key`, {
    method: "POST",
    headers: {
      ...getHeaders(),
      Prefer: "resolution=merge-duplicates,return=representation",
    },
    body: JSON.stringify([{ qr_key: key, scans: next }]),
  })

  if (!upsertRes.ok) {
    return NextResponse.json({ error: "Failed to update counter." }, { status: 500 })
  }

  return NextResponse.json({ count: next })
}
