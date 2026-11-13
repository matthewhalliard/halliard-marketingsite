import { HowItWorksLanding } from './plan/how-it-works'

export default function HowItWorksPage() {
  return <HowItWorksLanding path="/how-it-works" />
}

;(HowItWorksPage as any).disableNavbar = true
;(HowItWorksPage as any).fullWidth = true
;(HowItWorksPage as any).siteBg = true
