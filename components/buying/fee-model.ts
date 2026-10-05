/**
 * Halliard's campaign fee, as the client portal computes it. A copy of the
 * rules in Halliard3's packages/pubmatic/src/campaign-fee.ts (RULES and
 * estimateBuyerHours): keep the two in step, or the pricing page quotes a
 * different fee from the one the portal shows on a campaign.
 *
 * The estimate is a freelance media buyer's hours to plan, set up, launch,
 * monitor and report on the campaign, at an hourly rate, with a minimum;
 * Halliard's fee is a share of that.
 */

export const RULES = {
  complexity: { base: 1.0, isVideo: 0.25, usesDataSegments: 0.25, geoFinerThanDma: 0.25, isBiddable: 0.5 },
  planning: { base: 2, perPlatform: 1, perPackage: 0.5 },
  setup: { perPlatform: 1, perComplexityPoint: 2 },
  launch: { perPlatform: 0.5, perPackage: 0.25 },
  wrapReport: { base: 1.5, perExtraPlatform: 0.5 },
  monitoring: { perPlatform: 0.75, perComplexityPoint: 0.5 },
  weeklyReport: 0.5,
  steadyStateAfterWeeks: 4,
  steadyStateFactor: 0.7,
  deliveryRiskFactor: 1.25,
  lowFactor: 0.8,
  highFactor: 1.2,
  hourlyRate: 85,
  minimumProjectFee: 1500,
  halliardShare: 0.3,
} as const

export interface FeeInput {
  weeks: number
  platforms: number
  packages: number
  /** Video or CTV creative: specs and completion goals. */
  video: boolean
  /** Third-party audience segments. */
  segments: boolean
  /** ZIP, radius or custom geography. */
  finerThanDma: boolean
  /** Auction buying (social, open exchange) rather than fixed-CPM deals. */
  auction: boolean
  /** A narrow audience or geography that is likely to under-pace. */
  deliveryRisk: boolean
}

const round1 = (n: number) => Math.round(n * 10) / 10

export function estimateFee(input: FeeInput) {
  const c = RULES.complexity
  const perPackage =
    c.base +
    (input.video ? c.isVideo : 0) +
    (input.segments ? c.usesDataSegments : 0) +
    (input.finerThanDma ? c.geoFinerThanDma : 0) +
    (input.auction ? c.isBiddable : 0)
  const complexity = perPackage * input.packages
  const { platforms, packages } = input
  // After the first weeks a campaign settles down and needs less attention.
  const activeWeeks =
    Math.min(input.weeks, RULES.steadyStateAfterWeeks) +
    Math.max(0, input.weeks - RULES.steadyStateAfterWeeks) * RULES.steadyStateFactor

  const planning = RULES.planning.base + RULES.planning.perPlatform * platforms + RULES.planning.perPackage * packages
  const setup = RULES.setup.perPlatform * platforms + RULES.setup.perComplexityPoint * complexity
  const launch = RULES.launch.perPlatform * platforms + RULES.launch.perPackage * packages
  const monitoring =
    (RULES.monitoring.perPlatform * platforms + RULES.monitoring.perComplexityPoint * complexity) *
    activeWeeks *
    (input.deliveryRisk ? RULES.deliveryRiskFactor : 1)
  const reporting =
    RULES.weeklyReport * activeWeeks + RULES.wrapReport.base + RULES.wrapReport.perExtraPlatform * (platforms - 1)

  const hours = planning + setup + launch + monitoring + reporting
  const freelancer = Math.max(RULES.minimumProjectFee, Math.round(hours * RULES.hourlyRate))
  return {
    hours: round1(hours),
    lowHours: round1(hours * RULES.lowFactor),
    highHours: round1(hours * RULES.highFactor),
    breakdown: [
      { label: 'Planning', hours: round1(planning) },
      { label: 'Setup', hours: round1(setup) },
      { label: 'Launch', hours: round1(launch) },
      { label: 'Monitoring', hours: round1(monitoring) },
      { label: 'Reporting', hours: round1(reporting) },
    ],
    freelancer,
    halliard: Math.round(freelancer * RULES.halliardShare),
    minimumApplied: freelancer === RULES.minimumProjectFee,
  }
}
