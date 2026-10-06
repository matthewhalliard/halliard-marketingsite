import { BarChart3, CalendarCheck, FileText, Layers, ListChecks, MapPin, Search, Target, Tv, Upload, Users } from 'lucide-react'
import type { Step } from '../landing/kit'
import { AudienceScene, BriefScene, StrategyScene } from './step-visuals'

/** The planning steps, shared by /plan and /plan/how-it-works. */
export const PLAN_STEPS: Step[] = [
  {
    icon: FileText,
    label: 'The brief',
    title: 'Send a brief the way you would to a planner',
    body: 'No forms to fill. Halliard reads what you wrote and anything you attached, then writes it back in plain words so you can check it is what you meant.',
    points: [
      { icon: Upload, text: 'Write it in your own words, or drop in the RFP' },
      { icon: ListChecks, text: 'The goal, budget, timing and audience, pulled out for you' },
      { icon: CalendarCheck, text: 'A check that the budget and the dates hang together' },
    ],
    frame: 'Brief',
    Scene: BriefScene,
  },
  {
    icon: Users,
    label: 'Audiences',
    title: 'Audiences sized, and placed on the map',
    body: 'Each audience is matched to what a survey panel actually asked, counted one filter at a time, and pinned to where they live.',
    points: [
      { icon: MapPin, text: 'Down to the DMA and the ZIP, named by neighbourhood' },
      { icon: BarChart3, text: 'Sized from real panel answers, not guesses' },
      { icon: Tv, text: 'The media each audience consumes, ranked' },
    ],
    frame: 'Audiences',
    Scene: AudienceScene,
  },
  {
    icon: Target,
    label: 'Strategy and plan',
    title: 'A role for every dollar, and the reach it buys',
    body: 'Halliard researches the category before it plans, writes each strategy as a role for media, then fits channels to it and models what they reach.',
    points: [
      { icon: Search, text: 'The category, the competition and live search demand' },
      { icon: Layers, text: 'Each strategy with its own audience, budget and flight' },
      { icon: BarChart3, text: 'Reach and frequency modelled before anything is bought' },
    ],
    frame: 'Strategy',
    Scene: StrategyScene,
  },
]

