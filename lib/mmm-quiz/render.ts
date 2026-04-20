/**
 * MMM Readiness Score card renderer — Satori + Resvg.
 *
 * Output: 1200×1200 PNG suitable for sharing on LinkedIn, embedding in emails,
 * or inline on the results page.
 */
import satori from 'satori'
import { Resvg } from '@resvg/resvg-js'
import { readFileSync } from 'fs'
import { join } from 'path'
import type { ScoringResult } from './scoring'
import type { Narrative } from './narrative'
import { scoreTier } from './scoring'

const fontsDir = join(process.cwd(), 'node_modules', '@fontsource', 'inter', 'files')
const interRegular = readFileSync(join(fontsDir, 'inter-latin-400-normal.woff'))
const interSemiBold = readFileSync(join(fontsDir, 'inter-latin-600-normal.woff'))
const interBold = readFileSync(join(fontsDir, 'inter-latin-700-normal.woff'))

const WIDTH = 1200
const HEIGHT = 1500

export async function renderScoreCard(result: ScoringResult, narrative: Narrative): Promise<Buffer> {
  const tier = scoreTier(result.total, result.hardBlockers)
  const tierColor =
    tier.tone === 'strong'  ? { bg: '#DBEAFE', border: '#60A5FA', text: '#1E40AF', accent: '#3B82F6' } :
    tier.tone === 'emerging' ? { bg: '#FEF3C7', border: '#FCD34D', text: '#92400E', accent: '#F59E0B' } :
                               { bg: '#FEE2E2', border: '#FCA5A5', text: '#991B1B', accent: '#EF4444' }

  const subScoreRow = (label: string, val: number, blurb: string) => {
    const pct = Math.max(0, Math.min(100, val))
    const barColor = val >= 75 ? '#10B981' : val >= 50 ? '#F59E0B' : '#EF4444'
    return {
      type: 'div',
      props: {
        style: { display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 18 },
        children: [
          {
            type: 'div',
            props: {
              style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
              children: [
                { type: 'div', props: { style: { fontSize: 16, fontWeight: 700, color: '#111827' }, children: label } },
                { type: 'div', props: { style: { fontSize: 18, fontWeight: 700, color: '#111827' }, children: `${val}/100` } },
              ],
            },
          },
          // Bar
          {
            type: 'div',
            props: {
              style: { display: 'flex', width: '100%', height: 10, borderRadius: 6, backgroundColor: '#F3F4F6', overflow: 'hidden' },
              children: {
                type: 'div',
                props: { style: { width: `${pct}%`, height: '100%', backgroundColor: barColor } },
              },
            },
          },
          { type: 'div', props: { style: { fontSize: 13, color: '#6B7280' }, children: blurb } },
        ],
      },
    }
  }

  const unlockRow = (idx: number, title: string, body: string) => ({
    type: 'div',
    props: {
      style: { display: 'flex', gap: 14, alignItems: 'flex-start', marginBottom: 14 },
      children: [
        {
          type: 'div',
          props: {
            style: { width: 32, height: 32, borderRadius: 16, backgroundColor: '#EFF6FF', border: '1px solid #DBEAFE', color: '#1E40AF', fontSize: 14, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
            children: String(idx),
          },
        },
        {
          type: 'div',
          props: {
            style: { display: 'flex', flexDirection: 'column', gap: 3, flex: 1 },
            children: [
              { type: 'div', props: { style: { fontSize: 16, fontWeight: 700, color: '#111827' }, children: title } },
              { type: 'div', props: { style: { fontSize: 13, color: '#4B5563', lineHeight: 1.45 }, children: body } },
            ],
          },
        },
      ],
    },
  })

  const element = {
    type: 'div',
    props: {
      style: {
        display: 'flex', flexDirection: 'column', width: WIDTH, height: HEIGHT,
        backgroundColor: '#0F172A', padding: 40, fontFamily: 'Inter',
      },
      children: [
        // Card
        {
          type: 'div',
          props: {
            style: {
              display: 'flex', flexDirection: 'column', flex: 1,
              backgroundColor: '#FFFFFF', borderRadius: 20, overflow: 'hidden',
              boxShadow: '0 20px 60px rgba(0,0,0,0.3), 0 4px 16px rgba(0,0,0,0.15)',
            },
            children: [
              // Header strip
              {
                type: 'div',
                props: {
                  style: { display: 'flex', padding: '28px 40px', borderBottom: '1px solid #E5E7EB', backgroundColor: '#F9FAFB', alignItems: 'center', justifyContent: 'space-between' },
                  children: [
                    {
                      type: 'div',
                      props: {
                        style: { display: 'flex', flexDirection: 'column' },
                        children: [
                          { type: 'div', props: { style: { fontSize: 12, fontWeight: 700, color: '#9CA3AF', letterSpacing: '0.12em', marginBottom: 4 }, children: 'HALLIARD · MMM READINESS REPORT' } },
                          { type: 'div', props: { style: { fontSize: 22, fontWeight: 700, color: '#111827' }, children: narrative.profileSentence } },
                        ],
                      },
                    },
                  ],
                },
              },
              // Score hero
              {
                type: 'div',
                props: {
                  style: { display: 'flex', padding: '36px 40px 32px 40px', borderBottom: '1px solid #E5E7EB', alignItems: 'center', gap: 36 },
                  children: [
                    // Big number
                    {
                      type: 'div',
                      props: {
                        style: { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: 220, height: 160, borderRadius: 16, backgroundColor: tierColor.bg, border: `2px solid ${tierColor.border}`, flexShrink: 0 },
                        children: [
                          { type: 'div', props: { style: { fontSize: 72, fontWeight: 700, color: tierColor.text, lineHeight: 1 }, children: String(result.total) } },
                          { type: 'div', props: { style: { fontSize: 14, fontWeight: 600, color: tierColor.text, marginTop: 6, letterSpacing: '0.04em' }, children: 'out of 100' } },
                        ],
                      },
                    },
                    // Tier + summary
                    {
                      type: 'div',
                      props: {
                        style: { display: 'flex', flexDirection: 'column', flex: 1, gap: 10 },
                        children: [
                          {
                            type: 'div',
                            props: {
                              style: { display: 'flex', alignItems: 'center', gap: 12 },
                              children: [
                                { type: 'div', props: { style: { padding: '6px 14px', borderRadius: 999, backgroundColor: tierColor.accent, color: '#FFFFFF', fontSize: 13, fontWeight: 700, letterSpacing: '0.04em' }, children: tier.label.toUpperCase() } },
                              ],
                            },
                          },
                          { type: 'div', props: { style: { fontSize: 16, color: '#4B5563', lineHeight: 1.5 }, children: narrative.ctaLine } },
                        ],
                      },
                    },
                  ],
                },
              },
              // Sub-scores + Unlocks (two columns)
              {
                type: 'div',
                props: {
                  style: { display: 'flex', flex: 1, padding: '32px 40px', gap: 40 },
                  children: [
                    // Left: sub-scores
                    {
                      type: 'div',
                      props: {
                        style: { display: 'flex', flexDirection: 'column', width: 480 },
                        children: [
                          { type: 'div', props: { style: { fontSize: 12, fontWeight: 700, color: '#9CA3AF', letterSpacing: '0.12em', marginBottom: 18 }, children: 'SCORE BREAKDOWN' } },
                          subScoreRow('Data Readiness',    result.subScores.data,        narrative.subScoreBlurbs.data),
                          subScoreRow('Channel Mix',       result.subScores.mix,         narrative.subScoreBlurbs.mix),
                          subScoreRow('Business Scale',    result.subScores.scale,       narrative.subScoreBlurbs.scale),
                          subScoreRow('Measurement Maturity', result.subScores.measurement, narrative.subScoreBlurbs.measurement),
                        ],
                      },
                    },
                    // Right: unlocks
                    {
                      type: 'div',
                      props: {
                        style: { display: 'flex', flexDirection: 'column', flex: 1 },
                        children: [
                          { type: 'div', props: { style: { fontSize: 12, fontWeight: 700, color: '#9CA3AF', letterSpacing: '0.12em', marginBottom: 18 }, children: 'TOP 3 UNLOCKS' } },
                          unlockRow(1, narrative.topUnlocks[0].title, narrative.topUnlocks[0].body),
                          unlockRow(2, narrative.topUnlocks[1].title, narrative.topUnlocks[1].body),
                          unlockRow(3, narrative.topUnlocks[2].title, narrative.topUnlocks[2].body),
                        ],
                      },
                    },
                  ],
                },
              },
              // Footer
              {
                type: 'div',
                props: {
                  style: { display: 'flex', padding: '16px 40px', borderTop: '1px solid #E5E7EB', backgroundColor: '#F9FAFB', alignItems: 'center', justifyContent: 'space-between' },
                  children: [
                    { type: 'div', props: { style: { fontSize: 11, fontWeight: 600, color: '#9CA3AF', letterSpacing: '0.08em' }, children: 'halliardmedia.com · MMM in 4 weeks, $25K flat' } },
                    { type: 'div', props: { style: { fontSize: 11, fontWeight: 600, color: '#9CA3AF' }, children: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) } },
                  ],
                },
              },
            ],
          },
        },
      ],
    },
  }

  const svg = await satori(element as any, {
    width: WIDTH, height: HEIGHT,
    fonts: [
      { name: 'Inter', data: interRegular, weight: 400, style: 'normal' },
      { name: 'Inter', data: interSemiBold, weight: 600, style: 'normal' },
      { name: 'Inter', data: interBold, weight: 700, style: 'normal' },
    ],
  })
  const resvg = new Resvg(svg, { fitTo: { mode: 'width', value: WIDTH * 2 } })
  return resvg.render().asPng()
}
