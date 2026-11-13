import { LandingHeader, SIGN_UP_URL } from './landing/kit'

// Pages without a header of their own get the site's shared one.
export default function SiteHeader() {
  return <LandingHeader href={SIGN_UP_URL} cta="Start planning free" />
}
