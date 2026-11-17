import type { NextApiRequest, NextApiResponse } from "next";

/**
 * Whether this visitor may be measured for advertising (the Meta pixel).
 * Same rules as Halliard3's apps/web/lib/ad-consent.ts and the network sites:
 *
 * - Global Privacy Control (`Sec-GPC: 1`) is a legally binding opt-out of
 *   "sharing" in California and the states that copy it, and a pixel is sharing.
 * - The EEA, the UK and Switzerland need opt-in consent before a pixel loads.
 *   This site has no consent banner, so visitors there get no pixel.
 *
 * pages/_document.tsx asks this route before loading Meta's script.
 */
const CONSENT_FIRST_COUNTRIES = new Set([
  "AT", "BE", "BG", "HR", "CY", "CZ", "DK", "EE", "FI", "FR", "DE", "GR", "HU", "IE",
  "IT", "LV", "LT", "LU", "MT", "NL", "PL", "PT", "RO", "SK", "SI", "ES", "SE",
  "IS", "LI", "NO",
  "GB", "CH",
]);

export default function handler(req: NextApiRequest, res: NextApiResponse<{ allowed: boolean }>) {
  const gpc = req.headers["sec-gpc"] === "1";
  const country = String(req.headers["x-vercel-ip-country"] ?? "").toUpperCase();
  // No country header (local development) counts as outside those countries.
  const allowed = !gpc && !CONSENT_FIRST_COUNTRIES.has(country);
  res.setHeader("Cache-Control", "private, no-store");
  res.status(200).json({ allowed });
}
