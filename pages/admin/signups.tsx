import { useEffect, useState } from 'react'
import Head from 'next/head'

type Row = {
  email: string
  signedUpAt: string | null
  firstName: string | null
  lastName: string | null
  lastActiveAt: string | null
  lastSignInAt: string | null
  utmSource: string | null
  utmCampaign: string | null
  referrer: string | null
  geo: string | null
  flowStatus: string | null
  category: string | null
  companyName: string | null
  personalSentence: string | null
  dayInFlow: number | null
  nextEmailAt: string | null
  nextEmailSubject: string | null
  eventCount30d: number | null
}

type Payload = {
  generatedAt: string
  totalSignups: number
  inFlow: number
  replied: number
  skipped: number
  rows: Row[]
}

function statusColor(status: string | null, category: string | null) {
  if (status === 'replied') return 'bg-green-100 text-green-800'
  if (status === 'in_flow') return 'bg-blue-100 text-blue-800'
  if (status?.startsWith('skipped_junk')) return 'bg-gray-100 text-gray-500'
  if (status?.startsWith('skipped_competitor')) return 'bg-amber-100 text-amber-800'
  if (status?.startsWith('skipped')) return 'bg-gray-200 text-gray-700'
  if (status === 'awaiting_shutdown') return 'bg-red-100 text-red-800'
  return 'bg-gray-50 text-gray-500'
}

function fmt(iso: string | null): string {
  if (!iso) return '—'
  const d = new Date(iso)
  return d.toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })
}

function daysAgo(iso: string | null): string {
  if (!iso) return '—'
  const diffMs = Date.now() - new Date(iso).getTime()
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24))
  if (days === 0) {
    const hrs = Math.floor(diffMs / (1000 * 60 * 60))
    return hrs <= 0 ? 'just now' : `${hrs}h ago`
  }
  if (days === 1) return '1d ago'
  return `${days}d ago`
}

export default function AdminSignups() {
  const [token, setToken] = useState<string>('')
  const [data, setData] = useState<Payload | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const saved = typeof window !== 'undefined' ? localStorage.getItem('halliard_admin_token') : ''
    if (saved) setToken(saved)
  }, [])

  const load = async (t: string) => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`/api/admin/signups?token=${encodeURIComponent(t)}`)
      if (!res.ok) {
        setError(`Error ${res.status}`)
        setData(null)
      } else {
        const json = await res.json()
        setData(json)
        localStorage.setItem('halliard_admin_token', t)
      }
    } catch (e: any) {
      setError(e?.message || 'fetch error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Head>
        <title>Admin · Signup Flow · Halliard</title>
        <meta name="robots" content="noindex,nofollow" />
      </Head>
      <div className="min-h-screen bg-gray-50 text-gray-900 p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold mb-4">Signup Flow Dashboard</h1>

          {!data && (
            <div className="bg-white p-6 rounded shadow mb-4">
              <label className="block text-sm font-medium mb-2">Admin token</label>
              <div className="flex gap-2">
                <input
                  type="password"
                  value={token}
                  onChange={(e) => setToken(e.target.value)}
                  className="flex-1 border rounded px-3 py-2"
                  placeholder="ADMIN_DASH_TOKEN"
                />
                <button
                  onClick={() => load(token)}
                  disabled={!token || loading}
                  className="bg-black text-white px-4 py-2 rounded disabled:opacity-50"
                >
                  {loading ? 'Loading…' : 'Load'}
                </button>
              </div>
              {error && <p className="text-red-600 mt-2 text-sm">{error}</p>}
            </div>
          )}

          {data && (
            <>
              <div className="grid grid-cols-4 gap-4 mb-6">
                <Stat label="Total signups" value={data.totalSignups} />
                <Stat label="In flow" value={data.inFlow} color="blue" />
                <Stat label="Replied" value={data.replied} color="green" />
                <Stat label="Skipped" value={data.skipped} color="gray" />
              </div>

              <div className="text-xs text-gray-500 mb-2 flex justify-between">
                <span>Last generated: {fmt(data.generatedAt)}</span>
                <button onClick={() => load(token)} className="underline">Refresh</button>
              </div>

              <div className="bg-white rounded shadow overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-100 text-left">
                    <tr>
                      <th className="px-3 py-2">Email</th>
                      <th className="px-3 py-2">Signed up</th>
                      <th className="px-3 py-2">Category</th>
                      <th className="px-3 py-2">Status</th>
                      <th className="px-3 py-2">Next email</th>
                      <th className="px-3 py-2">Source</th>
                      <th className="px-3 py-2">Geo</th>
                      <th className="px-3 py-2">Last active</th>
                      <th className="px-3 py-2">Events</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.rows.map((r) => (
                      <tr key={r.email} className="border-t hover:bg-gray-50">
                        <td className="px-3 py-2">
                          <div className="font-medium">{r.email}</div>
                          {r.companyName && (
                            <div className="text-xs text-gray-500">{r.companyName}</div>
                          )}
                        </td>
                        <td className="px-3 py-2 text-xs">
                          <div>{fmt(r.signedUpAt)}</div>
                          <div className="text-gray-500">{daysAgo(r.signedUpAt)}</div>
                        </td>
                        <td className="px-3 py-2 text-xs">{r.category || '—'}</td>
                        <td className="px-3 py-2">
                          <span className={`text-xs px-2 py-1 rounded ${statusColor(r.flowStatus, r.category)}`}>
                            {r.flowStatus || '—'}
                          </span>
                        </td>
                        <td className="px-3 py-2 text-xs">
                          {r.nextEmailAt ? (
                            <>
                              <div>{fmt(r.nextEmailAt)}</div>
                              <div className="text-gray-500 truncate max-w-[180px]">{r.nextEmailSubject}</div>
                            </>
                          ) : '—'}
                        </td>
                        <td className="px-3 py-2 text-xs">
                          {r.utmSource ? `${r.utmSource}/${r.utmCampaign || '-'}` : r.referrer || 'direct'}
                        </td>
                        <td className="px-3 py-2 text-xs">{r.geo || '—'}</td>
                        <td className="px-3 py-2 text-xs">{daysAgo(r.lastActiveAt)}</td>
                        <td className="px-3 py-2 text-xs text-right">{r.eventCount30d ?? '—'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <p className="text-xs text-gray-500 mt-4">
                Showing last {data.rows.length} signups from Clerk. Flow state updated by cron on Mac mini.
              </p>
            </>
          )}
        </div>
      </div>
    </>
  )
}

function Stat({ label, value, color = 'black' }: { label: string; value: number; color?: string }) {
  const colorClass: Record<string, string> = {
    black: 'text-gray-900',
    blue: 'text-blue-700',
    green: 'text-green-700',
    gray: 'text-gray-500',
  }
  return (
    <div className="bg-white rounded shadow p-4">
      <div className="text-xs text-gray-500 uppercase tracking-wide">{label}</div>
      <div className={`text-3xl font-bold mt-1 ${colorClass[color]}`}>{value}</div>
    </div>
  )
}
