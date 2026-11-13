import { PlanLanding } from './plan'

// The homepage is the planning landing page, the way into the client portal.
// The old homepage sold the previous app; git history has it.
export default function Home() {
  return <PlanLanding path="/" />
}

;(Home as any).disableNavbar = true
;(Home as any).fullWidth = true
;(Home as any).siteBg = true
