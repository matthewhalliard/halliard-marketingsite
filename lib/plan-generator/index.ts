/**
 * Server-side media plan generator for URL → sample plan lead magnet.
 * Mirrors marketing/generate-sample-plan.mjs but as a typed TS module
 * callable from Next.js API routes.
 */
import satori from 'satori'
import { Resvg } from '@resvg/resvg-js'
import { readFileSync } from 'fs'
import { join } from 'path'

// ─── Fonts (loaded once at module init) ────────────────────────────
const fontsDir = join(process.cwd(), 'node_modules', '@fontsource', 'inter', 'files')
let interRegular: Buffer, interSemiBold: Buffer, interBold: Buffer
try {
  interRegular = readFileSync(join(fontsDir, 'inter-latin-400-normal.woff'))
  interSemiBold = readFileSync(join(fontsDir, 'inter-latin-600-normal.woff'))
  interBold = readFileSync(join(fontsDir, 'inter-latin-700-normal.woff'))
} catch (e) {
  console.error('Failed to load Inter fonts:', e)
  throw e
}

// ─── Types ─────────────────────────────────────────────────────────
export type IndustryKey =
  | 'retail_apparel' | 'cpg' | 'auto' | 'financial' | 'travel'
  | 'dtc_ecommerce' | 'saas' | 'healthcare' | 'utility' | 'default'

export interface Industry {
  label: string
  defaultBudget: number
  channelMix: { audio: number; video: number; digital: number }
  metaKeywords: string[]
  bodyKeywords: string[]
}

export interface PlanMeta {
  title: string
  description: string
  ogImage: string
  themeColor: string
  keywords: string
  raw: string
}

export interface PlanSummary {
  hostname: string
  brandName: string
  industry: string
  industryKey: IndustryKey
  budget: number
  reach: string
  frequency: string
  response: string
  channelMix: { audio: number; video: number; digital: number }
}

// ─── Industry definitions ──────────────────────────────────────────
export const INDUSTRIES: Record<IndustryKey, Industry> = {
  retail_apparel: {
    label: 'Retail & Apparel', defaultBudget: 1200000,
    channelMix: { audio: 0.10, video: 0.45, digital: 0.45 },
    metaKeywords: ['apparel', 'clothing', 'fashion', 'shoes', 'sneakers', 'athleisure', 'sportswear', 'denim', 'outerwear', 'retail', 'athletes', 'jersey', 'footwear'],
    bodyKeywords: ['add to cart', 'add to bag', "men's", "women's", 'size chart', 'free returns', 'free shipping'],
  },
  cpg: {
    label: 'CPG', defaultBudget: 1500000,
    channelMix: { audio: 0.15, video: 0.55, digital: 0.30 },
    metaKeywords: ['snack', 'beverage', 'cereal', 'coffee', 'beer', 'spirits', 'consumer packaged', 'grocery', 'soda', 'candy'],
    bodyKeywords: ['nutrition facts', 'ingredients', 'flavor', 'available at'],
  },
  auto: {
    label: 'Automotive', defaultBudget: 2500000,
    channelMix: { audio: 0.15, video: 0.55, digital: 0.30 },
    metaKeywords: ['vehicle', 'truck', 'suv', 'automotive', 'dealership', 'sedan', 'electric vehicle'],
    bodyKeywords: ['mpg', 'horsepower', 'build and price', 'find a dealer', 'test drive'],
  },
  financial: {
    label: 'Financial Services', defaultBudget: 1800000,
    channelMix: { audio: 0.20, video: 0.40, digital: 0.40 },
    metaKeywords: ['banking', 'credit card', 'mortgage', 'investment', 'retirement', 'insurance', 'wealth', 'brokerage', 'financial services', 'bank'],
    bodyKeywords: ['apr', 'fdic', 'member fdic', 'apy', 'open an account'],
  },
  travel: {
    label: 'Travel & Hospitality', defaultBudget: 900000,
    channelMix: { audio: 0.15, video: 0.40, digital: 0.45 },
    metaKeywords: ['hotel', 'hotels', 'resort', 'resorts', 'casino', 'travel', 'vacation', 'tourism', 'cruise', 'airline', 'stays'],
    bodyKeywords: ['book a room', 'book now', 'check in', 'check-in', 'rooms from', 'find a hotel', 'reservation', 'destinations'],
  },
  dtc_ecommerce: {
    label: 'DTC & E-commerce', defaultBudget: 600000,
    channelMix: { audio: 0.10, video: 0.30, digital: 0.60 },
    metaKeywords: ['subscription', 'direct-to-consumer', 'd2c', 'mattress', 'skincare', 'supplements', 'wellness'],
    bodyKeywords: ['shop now', 'subscribe & save', 'try it risk-free'],
  },
  saas: {
    label: 'B2B SaaS', defaultBudget: 400000,
    channelMix: { audio: 0.05, video: 0.20, digital: 0.75 },
    metaKeywords: ['saas', 'software platform', 'crm', 'erp', 'enterprise software', 'developer tools', 'api platform'],
    bodyKeywords: ['book a demo', 'start free trial', 'pricing per seat', 'per user/month', 'trusted by teams'],
  },
  healthcare: {
    label: 'Healthcare', defaultBudget: 1100000,
    channelMix: { audio: 0.15, video: 0.50, digital: 0.35 },
    metaKeywords: ['healthcare', 'hospital', 'patient', 'medical', 'pharmacy', 'clinic', 'therapy', 'medicare'],
    bodyKeywords: ['find a doctor', 'schedule an appointment', 'talk to a doctor'],
  },
  utility: {
    label: 'Utility & Energy', defaultBudget: 800000,
    channelMix: { audio: 0.25, video: 0.45, digital: 0.30 },
    metaKeywords: ['utility', 'electric utility', 'solar', 'natural gas', 'power company'],
    bodyKeywords: ['report an outage', 'pay your bill', 'start service', 'outage map'],
  },
  default: {
    label: 'Consumer Brand', defaultBudget: 850000,
    channelMix: { audio: 0.15, video: 0.45, digital: 0.40 },
    metaKeywords: [], bodyKeywords: [],
  },
}

const DOMAIN_OVERRIDES: Record<string, string[]> = {
  travel: ['marriott', 'hilton', 'hyatt', 'ihg', 'choicehotels', 'bestwestern', 'airbnb', 'booking', 'expedia', 'kayak', 'delta', 'united', 'americanairlines', 'southwest', 'jetblue', 'carnival', 'royalcaribbean', 'mgmresorts', 'caesars', 'wynn'],
  auto: ['ford', 'chevrolet', 'gm', 'toyota', 'honda', 'nissan', 'bmw', 'mercedes-benz', 'audi', 'volkswagen', 'tesla', 'rivian', 'lucidmotors', 'hyundai', 'kia', 'subaru', 'mazda'],
  financial: ['chase', 'bankofamerica', 'wellsfargo', 'citi', 'capitalone', 'amex', 'americanexpress', 'discover', 'schwab', 'fidelity', 'vanguard', 'sofi', 'robinhood', 'coinbase'],
  retail_apparel: ['nike', 'adidas', 'underarmour', 'lululemon', 'gap', 'oldnavy', 'zara', 'hm', 'uniqlo', 'levi', 'allbirds', 'patagonia', 'thenorthface', 'rei'],
  cpg: ['coca-cola', 'cocacola', 'pepsi', 'pepsico', 'nestle', 'kraftheinz', 'generalmills', 'kelloggs', 'unilever', 'pg', 'anheuser-busch', 'constellationbrands'],
  healthcare: ['unitedhealthcare', 'cvs', 'walgreens', 'humana', 'kaiserpermanente', 'clevelandclinic', 'mayoclinic'],
  utility: ['nvenergy', 'pge', 'pgande', 'coned', 'duke-energy', 'conedison', 'dominion', 'xcelenergy', 'nationalgrid', 'firstenergy'],
  dtc_ecommerce: ['warbyparker', 'casper', 'harrys', 'dollarshaveclub', 'glossier', 'ritual', 'athleticgreens', 'drinkag1', 'brooklinen'],
}

// ─── URL fetch + parse ─────────────────────────────────────────────
async function fetchWithRedirects(url: string, redirectsLeft = 3): Promise<{ status: number; body: string }> {
  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Halliard Plan Generator)' },
      redirect: 'follow',
      signal: AbortSignal.timeout(8000),
    })
    const body = await res.text()
    return { status: res.status, body }
  } catch {
    return { status: 0, body: '' }
  }
}

export function extractMeta(html: string): PlanMeta {
  const pick = (re: RegExp) => {
    const m = html.match(re)
    return m ? m[1].trim() : ''
  }
  const title = pick(/<title[^>]*>([^<]+)<\/title>/i)
  const description =
    pick(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["']/i) ||
    pick(/<meta[^>]*property=["']og:description["'][^>]*content=["']([^"']+)["']/i)
  const ogTitle = pick(/<meta[^>]*property=["']og:title["'][^>]*content=["']([^"']+)["']/i)
  const ogImage = pick(/<meta[^>]*property=["']og:image["'][^>]*content=["']([^"']+)["']/i)
  const themeColor = pick(/<meta[^>]*name=["']theme-color["'][^>]*content=["']([^"']+)["']/i)
  const keywords = pick(/<meta[^>]*name=["']keywords["'][^>]*content=["']([^"']+)["']/i)
  return { title: ogTitle || title, description, ogImage, themeColor, keywords, raw: html.slice(0, 20000).toLowerCase() }
}

export function inferIndustry(meta: PlanMeta, hostname: string): { key: IndustryKey; industry: Industry } {
  const hostBase = hostname.replace(/^www\./, '').replace(/\..*$/, '').toLowerCase()
  const hostFull = hostname.replace(/^www\./, '').toLowerCase()
  for (const [key, domains] of Object.entries(DOMAIN_OVERRIDES)) {
    if (domains.some(d => hostBase === d || hostBase.includes(d) || hostFull.startsWith(d + '.'))) {
      return { key: key as IndustryKey, industry: INDUSTRIES[key as IndustryKey] }
    }
  }

  const metaText = `${meta.title} ${meta.description} ${meta.keywords}`.toLowerCase()
  const bodyText = meta.raw.toLowerCase()
  let best = { key: 'default' as IndustryKey, score: 0 }
  for (const [key, ind] of Object.entries(INDUSTRIES)) {
    if (key === 'default') continue
    let score = 0
    for (const kw of ind.metaKeywords) if (metaText.includes(kw)) score += 3
    for (const kw of ind.metaKeywords) if (bodyText.includes(kw)) score += 1
    for (const kw of ind.bodyKeywords) if (bodyText.includes(kw)) score += 1.5
    if (score > best.score) best = { key: key as IndustryKey, score }
  }
  if (best.score < 3) best = { key: 'default', score: 0 }
  return { key: best.key, industry: INDUSTRIES[best.key] }
}

export function extractBrandName(host: string, meta: PlanMeta): string {
  const hostBase = host.replace(/^www\./, '').replace(/\.(com|co|io|net|org|shop|ai|app).*/i, '').split('.')[0]
  const hostPretty = hostBase.replace(/[-_]/g, ' ').replace(/\b\w/g, c => c.toUpperCase())

  if (meta.title) {
    const chunks = meta.title.split(/\s+[|—–·•]\s+|\s+-\s+/).map(s => s.trim()).filter(Boolean)
    for (const chunkRaw of chunks) {
      let clean = chunkRaw
      clean = clean.replace(/\.\s+[A-Z][a-z].*$/, '').trim()
      clean = clean.replace(/^(Official\s+Site\s+of\s+|Welcome\s+to\s+|Home\s+[-—–]\s+)/i, '').trim()
      const hasCommas = clean.includes(',')
      const looksGeneric = /^(The|A|An|Best|Your|Our|Buy|Shop|Find|Get|Discover|Introducing|Welcome)\s+/i.test(clean)
      const hasHostSubstring = clean.toLowerCase().includes(hostBase.toLowerCase())
      const tooLong = clean.length >= 40 || clean.length <= 1
      if (!hasCommas && !tooLong && (!looksGeneric || hasHostSubstring)) return clean
    }
  }
  return hostPretty
}

// ─── Plan builder ──────────────────────────────────────────────────
function pctToBudget(total: number, pct: number) { return Math.round((total * pct) / 1000) * 1000 }
function fmtCurrency(v: number) {
  return v >= 1e6 ? `$${(v / 1e6).toFixed(1)}M` : v >= 1000 ? `$${Math.round(v / 1000)}K` : `$${v}`
}

interface Flight { start: string; end: string; spend: number }
interface Property { id: string; logo: string | null; spend: number; flights: Flight[] }
interface ChannelNode { id: string; type: 'channel'; children: Property[] }
interface GroupNode { id: string; type: 'group'; children: ChannelNode[] }
interface Plan {
  brandName: string
  industry: string
  budget: number
  reach: string
  frequency: string
  response: string
  startDate: Date
  endDate: Date
  channels: GroupNode[]
}

function buildPlan(industry: Industry, totalBudget: number, brandName: string, industryLabel: string): Plan {
  const audio = pctToBudget(totalBudget, industry.channelMix.audio)
  const video = pctToBudget(totalBudget, industry.channelMix.video)
  const digital = totalBudget - audio - video

  const spotify = Math.round((audio * 0.55) / 1000) * 1000
  const pandora = Math.round((audio * 0.25) / 1000) * 1000
  const podcasts = audio - spotify - pandora
  const netflix = Math.round((video * 0.40) / 1000) * 1000
  const hulu = Math.round((video * 0.30) / 1000) * 1000
  const paramount = video - netflix - hulu
  const facebook = Math.round((digital * 0.30) / 1000) * 1000
  const instagram = Math.round((digital * 0.22) / 1000) * 1000
  const tiktok = Math.round((digital * 0.16) / 1000) * 1000
  const youtube = digital - facebook - instagram - tiktok

  const reach = Math.min(84, 52 + Math.log10(Math.max(totalBudget, 1) / 100000) * 8).toFixed(1)
  const freq = (2.8 + Math.log10(Math.max(totalBudget, 1) / 100000) * 0.35).toFixed(1)
  const response = `$${Math.round((totalBudget * 0.17) / 1000)}K`

  return {
    brandName, industry: industryLabel, budget: totalBudget,
    reach: `${reach}%`, frequency: freq, response,
    startDate: new Date('2026-05-01'), endDate: new Date('2026-10-31'),
    channels: [
      { id: 'Audio', type: 'group', children: [
        { id: 'Streaming Audio', type: 'channel', children: [
          { id: 'Spotify', logo: 'Spotify', spend: spotify, flights: [
            { start: '2026-05-01', end: '2026-07-31', spend: Math.round((spotify * 0.6) / 1000) * 1000 },
            { start: '2026-08-15', end: '2026-10-31', spend: spotify - Math.round((spotify * 0.6) / 1000) * 1000 },
          ]},
          { id: 'Pandora', logo: 'Pandora', spend: pandora, flights: [{ start: '2026-05-15', end: '2026-08-31', spend: pandora }]},
        ]},
        { id: 'Podcasts', type: 'channel', children: [
          { id: 'Podcasts', logo: null, spend: podcasts, flights: [{ start: '2026-06-01', end: '2026-10-31', spend: podcasts }]},
        ]},
      ]},
      { id: 'Video', type: 'group', children: [
        { id: 'Streaming TV', type: 'channel', children: [
          { id: 'Netflix', logo: 'Netflix', spend: netflix, flights: [{ start: '2026-05-01', end: '2026-10-31', spend: netflix }]},
          { id: 'Hulu', logo: 'Hulu', spend: hulu, flights: [
            { start: '2026-05-01', end: '2026-07-15', spend: Math.round((hulu * 0.6) / 1000) * 1000 },
            { start: '2026-08-01', end: '2026-10-31', spend: hulu - Math.round((hulu * 0.6) / 1000) * 1000 },
          ]},
          { id: 'Paramount+', logo: 'Paramount+', spend: paramount, flights: [{ start: '2026-06-01', end: '2026-09-30', spend: paramount }]},
        ]},
      ]},
      { id: 'Digital', type: 'group', children: [
        { id: 'Paid Social', type: 'channel', children: [
          { id: 'Facebook', logo: 'Facebook', spend: facebook, flights: [
            { start: '2026-05-01', end: '2026-07-31', spend: Math.round((facebook * 0.65) / 1000) * 1000 },
            { start: '2026-08-15', end: '2026-10-31', spend: facebook - Math.round((facebook * 0.65) / 1000) * 1000 },
          ]},
          { id: 'Instagram', logo: 'Instagram', spend: instagram, flights: [
            { start: '2026-05-07', end: '2026-08-31', spend: Math.round((instagram * 0.65) / 1000) * 1000 },
            { start: '2026-09-01', end: '2026-10-31', spend: instagram - Math.round((instagram * 0.65) / 1000) * 1000 },
          ]},
          { id: 'TikTok', logo: 'TikTok', spend: tiktok, flights: [{ start: '2026-06-01', end: '2026-10-15', spend: tiktok }]},
        ]},
        { id: 'Online Video', type: 'channel', children: [
          { id: 'YouTube', logo: 'YouTube', spend: youtube, flights: [{ start: '2026-05-01', end: '2026-10-31', spend: youtube }]},
        ]},
      ]},
    ],
  }
}

// ─── Logo fetching (property logos) ────────────────────────────────
const logoUrls: Record<string, string> = {
  'Spotify': 'https://firebasestorage.googleapis.com/v0/b/elegant-clarity-269013.appspot.com/o/Property%20logos%20-%20Halliard%202.0%2FSpotify%20logo.png?alt=media&token=c6fac1a2-7fb1-4c89-903b-5df83a673ec6',
  'Netflix': 'https://firebasestorage.googleapis.com/v0/b/elegant-clarity-269013.appspot.com/o/Property%20logos%20-%20Halliard%202.0%2Fnetflix_logo.jpeg?alt=media&token=9153512c-bdb8-4434-b719-64d3b98e8edd',
  'Hulu': 'https://firebasestorage.googleapis.com/v0/b/elegant-clarity-269013.appspot.com/o/Property%20logos%20-%20Halliard%202.0%2Fhulu.jpg?alt=media&token=22cb3a0a-5508-4937-b47c-cdb0b8712c87',
  'Facebook': 'https://firebasestorage.googleapis.com/v0/b/elegant-clarity-269013.appspot.com/o/Property%20logos%20-%20Halliard%202.0%2Ffacebook.png?alt=media&token=c3fdce5c-c3cc-416a-8908-e4717b445620',
  'Instagram': 'https://firebasestorage.googleapis.com/v0/b/elegant-clarity-269013.appspot.com/o/Property%20logos%20-%20Halliard%202.0%2Finstagram.jpeg?alt=media&token=25a91f14-5013-4a82-a8cf-ce3519efbfc4',
  'TikTok': 'https://firebasestorage.googleapis.com/v0/b/elegant-clarity-269013.appspot.com/o/Property%20logos%20-%20Halliard%202.0%2Ftiktok.jpg?alt=media&token=a31f1e63-44cf-45ff-bf2c-960ca460e610',
  'YouTube': 'https://firebasestorage.googleapis.com/v0/b/elegant-clarity-269013.appspot.com/o/Property%20logos%20-%20Halliard%202.0%2Fyoutube.jpg?alt=media&token=7ce500a1-87c5-4b25-bcf9-9bb290963ff7',
  'Paramount+': 'https://firebasestorage.googleapis.com/v0/b/elegant-clarity-269013.appspot.com/o/Property%20logos%20-%20Halliard%202.0%2FP%2B.jpg?alt=media&token=02c60ca3-e895-48d6-bb0c-eddbb9bc8fb0',
  'Pandora': 'https://firebasestorage.googleapis.com/v0/b/elegant-clarity-269013.appspot.com/o/Property%20logos%20-%20Halliard%202.0%2FPandora%20Logo.png?alt=media&token=4f3aa137-6a76-4f1a-9179-cca7b083a641',
}

const logoDataCache = new Map<string, string>() // cross-request cache inside warm Lambda

async function fetchImageAsDataUrl(url: string): Promise<string | null> {
  if (logoDataCache.has(url)) return logoDataCache.get(url)!
  try {
    const res = await fetch(url, {
      signal: AbortSignal.timeout(6000),
      headers: { 'User-Agent': 'Mozilla/5.0' },
    })
    if (!res.ok) return null
    const ct = res.headers.get('content-type') || 'image/png'
    if (ct.includes('svg')) return null
    const buf = Buffer.from(await res.arrayBuffer())
    const dataUrl = `data:${ct};base64,${buf.toString('base64')}`
    logoDataCache.set(url, dataUrl)
    return dataUrl
  } catch {
    return null
  }
}

// ─── Render ────────────────────────────────────────────────────────
const groupStyles: Record<string, { accent: string; barBg: string; barBorder: string; barText: string }> = {
  Audio: { accent: '#F59E0B', barBg: '#FEF9C3', barBorder: '#FCD34D', barText: '#92400E' },
  Video: { accent: '#8B5CF6', barBg: '#EDE9FE', barBorder: '#C4B5FD', barText: '#5B21B6' },
  Digital: { accent: '#3B82F6', barBg: '#DBEAFE', barBorder: '#93C5FD', barText: '#1E40AF' },
}

const WIDTH = 1200
const OUTER_PAD = 40
const INNER_W = WIDTH - OUTER_PAD * 2
const ROW_H = 48
const GROUP_H = 36
const CHANNEL_H = 34
const TREE_COL_W = 240
const SPEND_COL_W = 90
const HEADER_H = 72
const WELL_H = 84
const MONTH_H = 32

async function renderPlanPng(plan: Plan, brandLogoDataUrl: string | null): Promise<Buffer> {
  const planStartMs = plan.startDate.getTime()
  const planEndMs = plan.endDate.getTime()
  const planDurationMs = planEndMs - planStartMs
  const dateToX = (s: string) => Math.max(0, Math.min(1, (new Date(s).getTime() - planStartMs) / planDurationMs))

  const months: { label: string; startPct: number; endPct: number }[] = []
  let md = new Date(plan.startDate)
  while (md <= plan.endDate) {
    const ms = new Date(md.getFullYear(), md.getMonth(), 1)
    const me = new Date(md.getFullYear(), md.getMonth() + 1, 0)
    months.push({
      label: ms.toLocaleDateString('en-US', { month: 'short' }).toUpperCase(),
      startPct: Math.max(0, dateToX(ms.toISOString())),
      endPct: Math.min(1, dateToX(me.toISOString())),
    })
    md = new Date(md.getFullYear(), md.getMonth() + 1, 1)
  }

  type Row = { type: 'group' | 'channel' | 'property'; id: string; group?: string; indent?: number; logo?: string | null; spend?: number; flights?: Flight[] }
  const flatRows: Row[] = []
  for (const g of plan.channels) {
    flatRows.push({ type: 'group', id: g.id })
    for (const ch of g.children) {
      flatRows.push({ type: 'channel', id: ch.id, group: g.id, indent: 1 })
      for (const p of ch.children) {
        flatRows.push({ type: 'property', id: p.id, logo: p.logo, spend: p.spend, flights: p.flights, indent: 2, group: g.id })
      }
    }
  }
  const rowH = (r: Row) => (r.type === 'group' ? GROUP_H : r.type === 'channel' ? CHANNEL_H : ROW_H)
  const contentH = flatRows.reduce((s, r) => s + rowH(r), 0)
  const CARD_H = HEADER_H + WELL_H + MONTH_H + contentH
  const TOTAL_H = CARD_H + OUTER_PAD * 2

  // Fetch logos in parallel
  const uniqueLogos = [...new Set(flatRows.filter(r => r.logo).map(r => r.logo as string))]
  const logoCache: Record<string, string | null> = {}
  await Promise.all(uniqueLogos.map(async k => {
    logoCache[k] = logoUrls[k] ? await fetchImageAsDataUrl(logoUrls[k]) : null
  }))

  const rowEls = flatRows.map((row, idx) => {
    const h = rowH(row)
    const isGroup = row.type === 'group'
    const isChannel = row.type === 'channel'
    const isProp = row.type === 'property'
    const indent = (row.indent || 0) * 22
    const gid = row.group || row.id
    const gs = groupStyles[gid] || groupStyles.Digital
    const isLast = idx === flatRows.length - 1

    const nameChildren: any[] = []
    if (isGroup) {
      nameChildren.push({ type: 'div', props: { style: { width: 4, height: 16, borderRadius: 2, backgroundColor: gs.accent, flexShrink: 0 } } })
      nameChildren.push({ type: 'div', props: { style: { fontSize: 11, fontWeight: 700, color: '#374151', letterSpacing: '0.05em' }, children: row.id.toUpperCase() } })
    } else if (isChannel) {
      nameChildren.push({ type: 'div', props: { style: { fontSize: 12, fontWeight: 600, color: '#6B7280' }, children: row.id } })
    } else {
      if (row.logo && logoCache[row.logo]) {
        nameChildren.push({ type: 'img', props: { src: logoCache[row.logo], width: 24, height: 24, style: { borderRadius: 5, objectFit: 'cover', flexShrink: 0 } } })
      } else {
        nameChildren.push({ type: 'div', props: { style: { width: 24, height: 24, borderRadius: 5, backgroundColor: gs.barBg, border: `1px solid ${gs.barBorder}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700, color: gs.barText, flexShrink: 0 }, children: row.id.charAt(0) } })
      }
      nameChildren.push({ type: 'div', props: { style: { fontSize: 13, fontWeight: 500, color: '#1F2937' }, children: row.id } })
    }

    const spendEl = isProp
      ? { type: 'div', props: { style: { width: SPEND_COL_W, textAlign: 'right', fontSize: 12, fontWeight: 600, color: '#374151', paddingRight: 14, flexShrink: 0 }, children: fmtCurrency(row.spend as number) } }
      : { type: 'div', props: { style: { width: SPEND_COL_W, flexShrink: 0 } } }

    const tlChildren: any[] = []
    for (const m of months) {
      tlChildren.push({ type: 'div', props: { style: { position: 'absolute', left: `${m.startPct * 100}%`, top: 0, bottom: 0, width: 1, backgroundColor: '#F3F4F6' } } })
    }
    if (isProp && row.flights) {
      for (const f of row.flights) {
        const sp = dateToX(f.start), ep = dateToX(f.end), wp = ep - sp
        tlChildren.push({
          type: 'div',
          props: {
            style: { position: 'absolute', left: `${sp * 100}%`, width: `${wp * 100}%`, height: 28, backgroundColor: gs.barBg, border: `1px solid ${gs.barBorder}`, borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center' },
            children: { type: 'div', props: { style: { fontSize: 11, fontWeight: 600, color: gs.barText }, children: fmtCurrency(f.spend) } },
          },
        })
      }
    }

    return {
      type: 'div',
      props: {
        style: { display: 'flex', height: h, alignItems: 'center', backgroundColor: isGroup ? '#FAFAFA' : '#FFFFFF', borderBottom: isLast ? 'none' : isGroup ? '1px solid #E5E7EB' : '1px solid #F5F5F5' },
        children: [
          { type: 'div', props: { style: { width: TREE_COL_W, display: 'flex', alignItems: 'center', gap: 8, paddingLeft: 16 + indent, flexShrink: 0 }, children: nameChildren } },
          spendEl,
          { type: 'div', props: { style: { flex: 1, position: 'relative', height: '100%', display: 'flex', alignItems: 'center' }, children: tlChildren } },
        ],
      },
    }
  })

  const well = (label: string, value: string) => ({
    type: 'div',
    props: {
      style: { flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 24px' },
      children: [
        { type: 'div', props: { style: { fontSize: 11, fontWeight: 600, color: '#9CA3AF', letterSpacing: '0.06em', marginBottom: 4 }, children: label } },
        { type: 'div', props: { style: { fontSize: 24, fontWeight: 700, color: '#111827' }, children: value } },
      ],
    },
  })
  const divider = () => ({ type: 'div', props: { style: { width: 1, backgroundColor: '#F3F4F6', margin: '14px 0' } } })

  const brandBadge = brandLogoDataUrl
    ? { type: 'img', props: { src: brandLogoDataUrl, width: 40, height: 40, style: { borderRadius: 8, objectFit: 'cover', flexShrink: 0 } } }
    : { type: 'div', props: { style: { width: 40, height: 40, borderRadius: 8, backgroundColor: '#E0E7FF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, fontWeight: 700, color: '#3730A3', flexShrink: 0 }, children: plan.brandName.charAt(0) } }

  const headerEl = {
    type: 'div',
    props: {
      style: { display: 'flex', height: HEADER_H, backgroundColor: '#FFFFFF', borderBottom: '1px solid #E5E7EB', alignItems: 'center', paddingLeft: 20, paddingRight: 24, gap: 14 },
      children: [
        brandBadge,
        {
          type: 'div',
          props: {
            style: { display: 'flex', flexDirection: 'column', flex: 1 },
            children: [
              { type: 'div', props: { style: { fontSize: 10, fontWeight: 700, color: '#9CA3AF', letterSpacing: '0.12em', marginBottom: 2 }, children: 'MEDIA PLAN · H2 2026' } },
              { type: 'div', props: { style: { fontSize: 18, fontWeight: 700, color: '#111827' }, children: plan.brandName } },
            ],
          },
        },
        {
          type: 'div',
          props: {
            style: { display: 'flex', flexDirection: 'column', alignItems: 'flex-end' },
            children: [
              { type: 'div', props: { style: { fontSize: 10, fontWeight: 700, color: '#9CA3AF', letterSpacing: '0.08em', marginBottom: 2 }, children: 'CATEGORY' } },
              { type: 'div', props: { style: { fontSize: 13, fontWeight: 600, color: '#374151' }, children: plan.industry } },
            ],
          },
        },
      ],
    },
  }

  const element = {
    type: 'div',
    props: {
      style: { display: 'flex', flexDirection: 'column', width: WIDTH, height: TOTAL_H, backgroundColor: '#0F172A', padding: OUTER_PAD, fontFamily: 'Inter' },
      children: [
        {
          type: 'div',
          props: {
            style: { display: 'flex', flexDirection: 'column', width: INNER_W, height: CARD_H, backgroundColor: '#FFFFFF', borderRadius: 12, overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,0.3), 0 4px 16px rgba(0,0,0,0.15)' },
            children: [
              headerEl,
              {
                type: 'div',
                props: {
                  style: { display: 'flex', height: WELL_H, borderBottom: '1px solid #E5E7EB' },
                  children: [well('BUDGET', fmtCurrency(plan.budget)), divider(), well('REACH', plan.reach), divider(), well('AVG. FREQUENCY', plan.frequency), divider(), well('RESPONSE EST.', plan.response)],
                },
              },
              {
                type: 'div',
                props: {
                  style: { display: 'flex', height: MONTH_H, backgroundColor: '#F9FAFB', borderBottom: '1px solid #E5E7EB', alignItems: 'center' },
                  children: [
                    { type: 'div', props: { style: { width: TREE_COL_W, fontSize: 10, fontWeight: 700, color: '#9CA3AF', paddingLeft: 16, letterSpacing: '0.08em', flexShrink: 0 }, children: 'MEDIA TYPE' } },
                    { type: 'div', props: { style: { width: SPEND_COL_W, fontSize: 10, fontWeight: 700, color: '#9CA3AF', textAlign: 'right', paddingRight: 14, letterSpacing: '0.08em', flexShrink: 0 }, children: 'SPEND' } },
                    {
                      type: 'div',
                      props: {
                        style: { flex: 1, position: 'relative', height: '100%', display: 'flex' },
                        children: months.map(m => ({
                          type: 'div',
                          props: {
                            style: { position: 'absolute', left: `${m.startPct * 100}%`, width: `${(m.endPct - m.startPct) * 100}%`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700, color: '#9CA3AF', letterSpacing: '0.08em', height: '100%' },
                            children: m.label,
                          },
                        })),
                      },
                    },
                  ],
                },
              },
              ...rowEls,
            ],
          },
        },
      ],
    },
  }

  const svg = await satori(element as any, {
    width: WIDTH, height: TOTAL_H,
    fonts: [
      { name: 'Inter', data: interRegular, weight: 400, style: 'normal' },
      { name: 'Inter', data: interSemiBold, weight: 600, style: 'normal' },
      { name: 'Inter', data: interBold, weight: 700, style: 'normal' },
    ],
  })
  const resvg = new Resvg(svg, { fitTo: { mode: 'width', value: WIDTH * 2 } })
  return resvg.render().asPng()
}

// ─── Public orchestration ──────────────────────────────────────────
export async function generateSamplePlan(rawUrl: string, overrideBudget?: number): Promise<{ png: Buffer; summary: PlanSummary }> {
  const urlStr = rawUrl.startsWith('http') ? rawUrl : `https://${rawUrl}`
  const u = new URL(urlStr)
  const hostname = u.hostname

  const { status, body } = await fetchWithRedirects(urlStr)
  const meta: PlanMeta = status === 200 && body
    ? extractMeta(body)
    : { title: '', description: '', ogImage: '', themeColor: '', keywords: '', raw: hostname }

  const { key, industry } = inferIndustry(meta, hostname)
  const brandName = extractBrandName(hostname, meta)
  const budget = overrideBudget || industry.defaultBudget

  const plan = buildPlan(industry, budget, brandName, industry.label)

  // Try to get a brand logo — Clearbit gives cleaner logos than Google favicons
  let brandLogo: string | null = null
  try {
    brandLogo = await fetchImageAsDataUrl(`https://logo.clearbit.com/${hostname.replace(/^www\./, '')}?size=128`)
  } catch {}
  if (!brandLogo) {
    try { brandLogo = await fetchImageAsDataUrl(`https://www.google.com/s2/favicons?domain=${hostname}&sz=128`) } catch {}
  }

  const png = await renderPlanPng(plan, brandLogo)

  const summary: PlanSummary = {
    hostname,
    brandName,
    industry: industry.label,
    industryKey: key,
    budget,
    reach: plan.reach,
    frequency: plan.frequency,
    response: plan.response,
    channelMix: industry.channelMix,
  }

  return { png, summary }
}
