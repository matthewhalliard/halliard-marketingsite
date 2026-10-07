// The new journey's own PostHog project, "Halliard3": the one the portal at
// client.halliardmedia.com reports to. It must be the portal's key: PostHog's
// cookie is set on .halliardmedia.com and named after the key, so only a shared
// key makes a landing-page visitor and the account they sign up as one person.
//
// Its own module, so the server (instrumentation.ts) can read it without
// pulling in the landing-page components.
export const HALLIARD3_KEY = 'phc_n4aY5ANpBjV97gm6oDPFKekmXkRo962Y2b3tKa88cdRS'
