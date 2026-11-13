import Link from 'next/link'
import React from 'react'

const TOKEN = /\*\*(.+?)\*\*|\[([^\]]+)\]\(([^)]+)\)/g

/** Renders the guide's inline **bold** and [links](/path); site links stay in the app, others open in a new tab. */
export function Inline({ text }: { text: string }) {
  const parts: React.ReactNode[] = []
  let last = 0
  for (const m of text.matchAll(TOKEN)) {
    if (m.index! > last) parts.push(text.slice(last, m.index))
    if (m[1] !== undefined) {
      parts.push(
        <strong key={m.index} className="font-semibold text-slate-900">
          <Inline text={m[1]} />
        </strong>,
      )
    } else if (m[3].startsWith('/')) {
      parts.push(
        <Link key={m.index} href={m[3]} className="font-medium text-primary underline-offset-2 hover:underline">
          {m[2]}
        </Link>,
      )
    } else {
      parts.push(
        <a
          key={m.index}
          href={m[3]}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-primary underline-offset-2 hover:underline"
        >
          {m[2]}
        </a>,
      )
    }
    last = m.index! + m[0].length
  }
  if (last < text.length) parts.push(text.slice(last))
  return <>{parts}</>
}
