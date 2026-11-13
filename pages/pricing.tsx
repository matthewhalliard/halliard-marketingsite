import { PricingLanding } from './plan/pricing'

export default function PricingPage() {
  return <PricingLanding path="/pricing" />
}

;(PricingPage as any).disableNavbar = true
;(PricingPage as any).fullWidth = true
;(PricingPage as any).siteBg = true
