import React, { useState } from 'react'
import { MessageSquare } from 'lucide-react'

// "Start in ChatGPT / Claude": a cheap test of whether visitors want to start
// planning inside an AI chat. Each button opens a new chat with a starter
// prompt already typed. Until Halliard has its own connector the chat can only
// read this public site, so every prompt asks for a rough draft and ends by
// asking how to get real reach numbers in Halliard: the chat hands back to
// sign-up.
//
// Copy rules: no prices, and never name a ratings company. Say "market".

export type AiAssistant = 'chatgpt' | 'claude'

export const STARTER_PROMPTS = {
  agency: {
    label: 'Agency planner',
    text:
      'I plan media at an agency. Read halliardmedia.com to see how Halliard plans media, then help me draft a plan for a client campaign. ' +
      'First ask me for the client, product, goal, market, budget and dates. ' +
      'Then suggest the target audiences, a channel mix with a rough budget split, and a ballpark reach and frequency estimate, ' +
      'and say which assumptions it rests on. ' +
      'Finally, tell me how to get real reach numbers for this plan in Halliard, and how to sign up.',
  },
  brand: {
    label: 'Brand marketer',
    text:
      'I run marketing for a brand. Read halliardmedia.com to see how Halliard plans media, then help me plan our next campaign. ' +
      'First ask me for the brand, product, goal, budget and dates. ' +
      'Then draft who we should reach, which channels to use and roughly how much to put in each, ' +
      'and a ballpark of how many people we would reach and how often. ' +
      'Finally, tell me how to get real reach numbers for this plan in Halliard, and how to sign up.',
  },
  regional: {
    label: 'Regional advertiser',
    text:
      'I advertise a business in one region. Read halliardmedia.com to see how Halliard plans local media, then help me draft a plan. ' +
      'First ask me for the business, the market or towns I serve, my budget and dates. ' +
      'Then suggest who to reach in my market, which channels fit a local budget (TV, radio, streaming, social, search), ' +
      'and a ballpark reach estimate for the market. ' +
      'Finally, tell me how to get real reach numbers for my market in Halliard, and how to sign up.',
  },
} as const

export type StarterPrompt = keyof typeof STARTER_PROMPTS

const ASSISTANTS: { key: AiAssistant; label: string; url: (q: string) => string }[] = [
  { key: 'chatgpt', label: 'Start in ChatGPT', url: q => `https://chatgpt.com/?q=${encodeURIComponent(q)}` },
  { key: 'claude', label: 'Start in Claude', url: q => `https://claude.ai/new?q=${encodeURIComponent(q)}` },
]

/** The new-chat URL for an assistant, with the starter prompt prefilled. */
export function aiChatUrl(assistant: AiAssistant, prompt: StarterPrompt): string {
  return ASSISTANTS.find(a => a.key === assistant)!.url(STARTER_PROMPTS[prompt].text)
}

/**
 * The visitor picks who they are (agency planner by default, the homepage's
 * audience), then an assistant. `onStart` reports the click; the link opens
 * in a new tab so the page stays where it was.
 */
export function StartInAiChat({
  onStart,
  className = '',
}: {
  onStart: (assistant: AiAssistant, prompt: StarterPrompt) => void
  className?: string
}) {
  const [prompt, setPrompt] = useState<StarterPrompt>('agency')

  return (
    <div className={className}>
      <p className="text-sm font-medium text-slate-700">Rather start in an AI chat? I&rsquo;m a&hellip;</p>
      <div role="radiogroup" aria-label="I am a" className="mt-2 flex flex-wrap justify-center lg:justify-start gap-2">
        {(Object.keys(STARTER_PROMPTS) as StarterPrompt[]).map(key => {
          const selected = key === prompt
          return (
            <button
              key={key}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => setPrompt(key)}
              className={
                'rounded-full px-3 py-1 text-sm ring-1 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ' +
                (selected ? 'bg-tint text-primary ring-primary/40 font-medium' : 'text-slate-600 ring-slate-200 hover:ring-slate-300 hover:text-slate-900')
              }
            >
              {STARTER_PROMPTS[key].label}
            </button>
          )
        })}
      </div>
      <div className="mt-3 flex flex-wrap justify-center lg:justify-start gap-3">
        {ASSISTANTS.map(a => (
          <a
            key={a.key}
            href={aiChatUrl(a.key, prompt)}
            target="_blank"
            rel="noopener noreferrer"
            data-assistant={a.key}
            onClick={() => onStart(a.key, prompt)}
            className="group inline-flex items-center justify-center rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-700 ring-1 ring-slate-200 hover:text-slate-900 hover:ring-slate-300 active:bg-slate-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            <MessageSquare className="mr-2 h-4 w-4 text-primary" aria-hidden />
            {a.label}
          </a>
        ))}
      </div>
    </div>
  )
}
