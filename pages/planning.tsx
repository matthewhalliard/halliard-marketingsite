import { PlanLanding } from './plan'

// The planning tool's page, and where the planning search ads land. It was the
// homepage, word for word, until the home became the brand page.
export default function Planning() {
  return <PlanLanding path="/planning" />
}

;(Planning as any).disableNavbar = true
;(Planning as any).fullWidth = true
;(Planning as any).siteBg = true
