import { SampleLanding } from './plan/sample'

export default function SamplePage() {
  return <SampleLanding path="/sample" />
}

;(SamplePage as any).disableNavbar = true
;(SamplePage as any).fullWidth = true
;(SamplePage as any).siteBg = true
