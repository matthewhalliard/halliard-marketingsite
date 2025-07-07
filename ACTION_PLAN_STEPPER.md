# MMM Action Plan Stepper – Brainstorm

## 1. Purpose
Capture key information about a prospect’s marketing-measurement situation, diagnose maturity/gaps, and automatically produce:
- A numeric readiness/health score
- A tailored action plan (next steps + recommended Halliard services)
- A strong call-to-action (Calendly link) to book a meeting

## 2. User Journey Overview
1. **Landing page / site** → user clicks **“Create Action Plan”**.
2. **Stepper Wizard (5 steps + results)** opens at route `/action-plan` (root-level page).
3. User answers concise, multiple-choice questions (< 2 min total) while progress bar advances.
4. Contact details are collected on the last interactive step (results are gated until email is provided).
5. Results screen instantly shows their score, action plan, and **Schedule Demo** button.
6. Responses and score are POSTed to Formspark, which forwards to HubSpot and Slack.

## 3. Step-by-Step Breakdown

| Step | Theme | Sample Questions | Input Type |
|------|-------|------------------|------------|
| 1 | **Who Are You?** | • Are you a Brand or an Agency? | Single-choice radio |
| 2 | **Spend & Channels** | • What’s your average monthly paid media spend?<br/>• Which primary marketing channels do you invest in? (Select all that apply from *Halliard Media Channels* list below) | Radio + multi-select checkboxes |
| 3 | **Current Measurement Stack** | • How would you best describe your current measurement approach?<br/>Options (in ascending sophistication):<br/>&nbsp;&nbsp;1. I rely on ad-platform reporting<br/>&nbsp;&nbsp;2. We use a Multi-Touch Attribution (MTA) tool<br/>&nbsp;&nbsp;3. We run an MMM<br/>&nbsp;&nbsp;4. We do all of the above **and** geo/hold-out testing | Single-choice radio |
| 4 | **Goals & Timeline** | • Primary goal for the next 6 months? (Lower CAC, scale spend, prove channel value…)<br/>• Desired timeline to solve? (ASAP, 1-3 mo, 3-6 mo…) | Radio |
| 5 | **Contact Details** | • Name<br/>• Work email<br/>• Company website | Text inputs |
| 6 | **Results & Action Plan** | — | Computed output + CTA |

### Microcopy / Tone
- Conversational, jargon-free, friendly.
- Progress indicator: “Step X of 5”.
- Keep each step to ≤ 2 fields where possible.

## 4. Scoring Logic (First Pass)
We score on four dimensions, each worth **0–25 pts**; total possible = **100 pts**.

| Dimension | Criteria | Points |
|-----------|----------|--------|
| **Monthly Spend** | < $50 k → 5 pts<br/>$50–250 k → 15 pts<br/>$250 k+ → 25 pts | 0-25 |
| **Channel Diversification** (count of primary channels selected) | 1–2 → 5 pts<br/>3–5 → 15 pts<br/>6+ → 25 pts | 0-25 |
| **Measurement Stack Sophistication** | Ad-platform only → 5 pts<br/>MTA → 15 pts<br/>MMM → 20 pts<br/>MMM + Geo/Hold-out → 25 pts | 0-25 |
| **Timeline Urgency** | 6 mo+ → 5 pts<br/>3–6 mo → 15 pts<br/>ASAP / < 3 mo → 25 pts | 0-25 |

*Brand vs Agency* does not affect the score but is captured for segmentation.

### Score Bands & Messaging
| Band | Range | Label | High-level Prescription |
|------|-------|-------|-------------------------|
| **Foundational** | 0-39 | Early Stage | Focus on clean tracking & basic attribution hygiene. |
| **Progressing** | 40-69 | Building | Optimise channels & pilot MMM. |
| **Advanced** | 70-100 | Maturity | Deploy full MMM + incrementality programme. |

## 5. Action-Plan Output Template
```md
### Your Measurement Maturity Score: 58 (Progressing)

**Top Priorities for the Next 30 Days**
1. Implement server-side tracking for Meta & Google Ads.
2. Consolidate events into a single analytics schema.
3. Deploy UTM hygiene audit.

**Next 90 Days**
- Begin media mix modelling pilot.
- Set up weekly incrementality tests.

→ Ready to accelerate? **Book a 30-min strategy call → /schedule-demo**
```

## 6. Data & Integrations
- Send responses + score to **Formspark** endpoint (`https://submit-form.com/phcmKSgAi`) — Formspark forwards to HubSpot and sends Slack alert via its integrations.
- Embed Calendly widget with name/email pre-filled.
- (Optional) Use Formspark’s webhooks/Zapier to sync into Airtable or other CRMs if needed.

### 6.1 Formspark Submission Plan

We’ll POST the final payload to our Formspark endpoint after the user completes all steps and hits **“Get My Action Plan”**.

**Endpoint**

```text
https://submit-form.com/phcmKSgAi
```

**Payload Structure (JSON)**

```json
{
  "name": "{{name}}",
  "email": "{{email}}",
  "company": "{{company}}",
  "isAgency": true,
  "monthlySpend": 75000,
  "channels": ["Facebook", "YouTube", "Linear TV"],
  "measurementStack": "MTA",
  "goal": "Scale spend",
  "timeline": "1-3 months",
  "maturityScore": 58
}
```

**React (Next.js) Implementation**

```ts
import { useState } from 'react'

async function submitToFormspark(data: Record<string, any>) {
  await fetch('https://submit-form.com/phcmKSgAi', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
}

// Call this inside the final step handler
await submitToFormspark(finalPayload)
```

**Error Handling**
1. Show inline spinner while submitting.
2. On success → reveal results screen.
3. On failure → show fallback message + still display results (so they aren’t blocked).

**GDPR / Consent**
- Add a checkbox on contact step: “I agree to receive marketing emails.” Include `marketingOptIn: true/false` in payload.

**Testing Checklist**
1. Verify submission appears in Formspark dashboard.
2. Validate required fields (name, email) before POST.
3. Ensure numeric fields are numbers (not strings) when sent.
4. Confirm CORS works locally (`localhost`) and in prod.

## 7. Technical Implementation Notes
- **Route:** `pages/action-plan.tsx` (root-level Next.js page).
- **Component Library:** Use existing Tailwind + custom `Button` component.
- **State Management:** Local React state or `useReducer`; consider `zustand` if complex.
- **Stepper UI:** Horizontal progress bar; prev/next navigation.
- **Validation:** Minimal; ensure contact email is work email (no @gmail).
- **Analytics:** Fire event on start & completion.

## 8. Decisions (Previously Open Questions)
1. **Gate results until email is provided:** **Yes** — users must supply contact details before the results screen is displayed.
2. **CRM / Data destination:** **Formspark** — primary endpoint, with downstream HubSpot & Slack integrations.
3. **A/B test step order or copy:** **No** — ship a single flow initially.
4. **Page location:** **Root domain** — route `/action-plan` instead of under MMM subdirectory.


# Halliard Media Channels

## Audio
### Streaming Audio
- Spotify	https://firebasestorage.googleapis.com/v0/b/elegant-clarity-269013.appspot.com/o/Property%20logos%20-%20Halliard%202.0%2FSpotify%20logo.png?alt=media&token=c6fac1a2-7fb1-4c89-903b-5df83a673ec6
- Pandora	https://firebasestorage.googleapis.com/v0/b/elegant-clarity-269013.appspot.com/o/Property%20logos%20-%20Halliard%202.0%2FPandora%20Logo.png?alt=media&token=4f3aa137-6a76-4f1a-9179-cca7b083a641
- Amazon Music	https://firebasestorage.googleapis.com/v0/b/elegant-clarity-269013.appspot.com/o/Property%20logos%20-%20Halliard%202.0%2FAmazon%20music.png?alt=media&token=8d104d90-52cb-451a-8d75-2e12588a71fe
- Other Streaming Audio	🎶

### Radio
- AM Radio	📻
- FM Radio	📻
- Satellite Radio	📻

### Podcasts
- Podcasts	🎙️

## Video
### Streaming TV
- Netflix	https://firebasestorage.googleapis.com/v0/b/elegant-clarity-269013.appspot.com/o/Property%20logos%20-%20Halliard%202.0%2Fnetflix_logo.jpeg?alt=media&token=9153512c-bdb8-4434-b719-64d3b98e8edd
- Hulu	https://firebasestorage.googleapis.com/v0/b/elegant-clarity-269013.appspot.com/o/Property%20logos%20-%20Halliard%202.0%2Fhulu.jpg?alt=media&token=22cb3a0a-5508-4937-b47c-cdb0b8712c87
- Amazon Prime Video	https://firebasestorage.googleapis.com/v0/b/elegant-clarity-269013.appspot.com/o/Property%20logos%20-%20Halliard%202.0%2Fprime%20video.png?alt=media&token=3b0047b0-106a-40d7-a236-677fc5bef492
- Max	https://firebasestorage.googleapis.com/v0/b/elegant-clarity-269013.appspot.com/o/Property%20logos%20-%20Halliard%202.0%2Fmax.jpg?alt=media&token=fd0b71ac-1083-4b3e-a68d-20c74439269e
- Disney+	https://firebasestorage.googleapis.com/v0/b/elegant-clarity-269013.appspot.com/o/Property%20logos%20-%20Halliard%202.0%2Fdisney%20plus.jpg?alt=media&token=40a9f0f5-2712-473b-bcb7-a77c27ff9f03
- Paramount+	https://firebasestorage.googleapis.com/v0/b/elegant-clarity-269013.appspot.com/o/Property%20logos%20-%20Halliard%202.0%2FP%2B.jpg?alt=media&token=02c60ca3-e895-48d6-bb0c-eddbb9bc8fb0
- Peacock	https://firebasestorage.googleapis.com/v0/b/elegant-clarity-269013.appspot.com/o/Property%20logos%20-%20Halliard%202.0%2Fpeacock.jpg?alt=media&token=e3a2e238-afdf-48c5-88e6-a506d0fac81f
- Pluto	https://firebasestorage.googleapis.com/v0/b/elegant-clarity-269013.appspot.com/o/Property%20logos%20-%20Halliard%202.0%2Fpluto%20tv.png?alt=media&token=5ea6d4b0-291e-4d16-93b8-3f751de5089a
- Tubi	https://firebasestorage.googleapis.com/v0/b/elegant-clarity-269013.appspot.com/o/Property%20logos%20-%20Halliard%202.0%2Ftubi.png?alt=media&token=8fdc30ea-1dce-4be5-aa5f-6cd7a17d35cb

### Linear TV
- Early Morning	📺
- Daytime	📺
- Early Fringe	📺
- Primetime	📺
- Late Fringe	📺
- Cable	📺

### Movie Theater
- Movie Theater	🍿

## Digital
### Paid Social
- Facebook	https://firebasestorage.googleapis.com/v0/b/elegant-clarity-269013.appspot.com/o/Property%20logos%20-%20Halliard%202.0%2Ffacebook.png?alt=media&token=c3fdce5c-c3cc-416a-8908-e4717b445620
- Instagram	https://firebasestorage.googleapis.com/v0/b/elegant-clarity-269013.appspot.com/o/Property%20logos%20-%20Halliard%202.0%2Finstagram.jpeg?alt=media&token=25a91f14-5013-4a82-a8cf-ce3519efbfc4
- X (Twitter)	https://firebasestorage.googleapis.com/v0/b/elegant-clarity-269013.appspot.com/o/Property%20logos%20-%20Halliard%202.0%2Fx.jpg?alt=media&token=5bf8cf17-9d81-446d-9e21-3e3bae1e31f6
- Snapchat	https://firebasestorage.googleapis.com/v0/b/elegant-clarity-269013.appspot.com/o/Property%20logos%20-%20Halliard%202.0%2Fsnap.webp?alt=media&token=24fc944f-618f-4453-95d2-e89c0f7a5270
- TikTok	https://firebasestorage.googleapis.com/v0/b/elegant-clarity-269013.appspot.com/o/Property%20logos%20-%20Halliard%202.0%2Ftiktok.jpg?alt=media&token=a31f1e63-44cf-45ff-bf2c-960ca460e610
- Pinterest	https://firebasestorage.googleapis.com/v0/b/elegant-clarity-269013.appspot.com/o/Property%20logos%20-%20Halliard%202.0%2Fpinterest.png?alt=media&token=c44282fb-2f37-4e31-9dde-995a7cbbc147

### Online Video
- YouTube	https://firebasestorage.googleapis.com/v0/b/elegant-clarity-269013.appspot.com/o/Property%20logos%20-%20Halliard%202.0%2Fyoutube.jpg?alt=media&token=7ce500a1-87c5-4b25-bcf9-9bb290963ff7
- Twitch	https://firebasestorage.googleapis.com/v0/b/elegant-clarity-269013.appspot.com/o/Property%20logos%20-%20Halliard%202.0%2Ftwitch.png?alt=media&token=52a7fd74-76f5-43bd-9b9c-1559c0bfad46
- Other Online Video	💻

### Digital Properties
- Digital Display	🖥️

### Paid Search
- Paid Search	🔍

### Digital Retail
- Digital Retail	🛒

### Video Games
- Video Games	🎮

## OOH
### Billboards
- Billboards	🪧

### Transit
- Transit	🚇

### Street Media
- Street Media	🚶‍♂️

### Airport
- Airport	✈️

### Medical Facility
- Medical Facility	🏥

### Gas Station
- Gas Station	⛽

### Gym
- Gym	🏋️‍♀️

### Mall
- Mall	🏬

### Sports Stadium
- Sports Stadium	🏟️

## Print
### Magazines
- Magazines	📚

### Newspapers
- Newspapers	📰