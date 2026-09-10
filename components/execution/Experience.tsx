import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  MotionConfig,
  useInView,
  useReducedMotion,
} from "motion/react";
import s from "../../styles/Execution.module.css";

type CtaProps = {
  onBrief: () => void;
  calendarUrl: string;
  onCall: () => void;
};
const ease = [0.22, 1, 0.36, 1] as const;
const stages = ["Brief", "Plan", "Live"];
function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d={diagonal ? "M6 18 18 6M6 6h12v12" : "M4 12h15m-6-6 6 6-6 6"}
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function Mark() {
  return (
    <svg viewBox="0 0 36 40" fill="none" aria-hidden="true">
      <path d="M4 36 16 4l5 20L4 36Z" fill="currentColor" />
      <path d="m19 4 13 32-9-8-4-24Z" fill="currentColor" opacity=".55" />
    </svg>
  );
}
function Reveal({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={false}
      whileInView={reduce ? {} : { opacity: [0.75, 1], y: [16, 0] }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.65, ease }}
    >
      {children}
    </motion.div>
  );
}
function Label({
  children,
  light = false,
}: {
  children: React.ReactNode;
  light?: boolean;
}) {
  return (
    <p className={`${s.label} ${light ? s.lightLabel : ""}`}>
      <span />
      {children}
    </p>
  );
}
function Brand({ light = false }: { light?: boolean }) {
  return (
    <Link
      href="/"
      aria-label="Halliard home"
      className={`${s.brand} ${light ? s.brandLight : ""}`}
    >
      <Mark />
      <span>
        Halliard<span className={s.brandPeriod}>.</span>
      </span>
    </Link>
  );
}
export function ExecutionHeader({ onBrief, calendarUrl, onCall }: CtaProps) {
  return (
    <header className={s.header}>
      <a href="#execution-content" className={s.skip}>
        Skip to content
      </a>
      <div className={s.nav}>
        <Brand />
        <nav aria-label="Main navigation">
          <a href="#how-it-works">How it works</a>
          <a href="#your-control">Your control</a>
          <a href="#execution-pricing">Pricing</a>
        </nav>
        <a
          href={calendarUrl}
          onClick={onCall}
          className={s.navCall}
          target="_blank"
          rel="noreferrer"
        >
          Let’s talk <Arrow diagonal />
        </a>
        <a href="#brief" onClick={onBrief} className={s.navCta}>
          Send a brief <Arrow />
        </a>
      </div>
    </header>
  );
}
function Platform({ name }: { name: string }) {
  return (
    <span
      className={`${s.platform} ${name === "Meta" ? s.meta : name === "YouTube" ? s.youtube : s.google}`}
      aria-hidden="true"
    >
      {name === "Meta"
        ? "∞"
        : name === "YouTube"
          ? "▶"
          : name === "Display"
            ? "▧"
            : "G"}
    </span>
  );
}
function PacingChart({ variant = 0 }: { variant?: number }) {
  const reduce = useReducedMotion();
  return (
    <svg
      className={s.chart}
      viewBox="0 0 480 154"
      role="img"
      aria-label="Illustrative cumulative spend following planned pacing"
    >
      <defs>
        <linearGradient
          id={`chart-fill-${variant}`}
          x1="0"
          y1="0"
          x2="0"
          y2="1"
        >
          <stop offset="0%" stopColor="#86bdf8" stopOpacity=".28" />
          <stop offset="100%" stopColor="#86bdf8" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[25, 65, 105, 145].map((y) => (
        <line
          key={y}
          x1="0"
          y1={y}
          x2="480"
          y2={y}
          stroke="currentColor"
          strokeOpacity=".12"
        />
      ))}
      <path
        d="M0 138 48 128 96 108 144 102 192 75 240 81 288 48 336 42 384 25 432 27 480 7V154H0Z"
        fill={`url(#chart-fill-${variant})`}
      />
      <path
        d="M0 144 480 10"
        stroke="currentColor"
        strokeOpacity=".35"
        strokeDasharray="4 6"
      />
      <motion.path
        d="M0 138 48 128 96 108 144 102 192 75 240 81 288 48 336 42 384 25 432 27 480 7"
        fill="none"
        stroke="#a4ceff"
        strokeWidth="2.5"
        initial={{ pathLength: reduce ? 1 : 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.8, ease }}
      />
      <circle cx="478" cy="8" r="4" fill="#d3f5a5" />
    </svg>
  );
}
function CampaignConsole() {
  const [stage, setStage] = useState(1);
  const [playing, setPlaying] = useState(true);
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref, { amount: 0.25 });
  useEffect(() => {
    if (!playing || reduce || !visible) return;
    const t = setInterval(() => setStage((v) => (v + 1) % 3), 6200);
    return () => clearInterval(t);
  }, [playing, reduce, visible]);
  return (
    <div ref={ref} className={s.consoleScene}>
      <div className={s.orbit} />
      <div className={s.orbitTwo} />
      <div className={s.sceneCoordinate}>H / EXECUTION SYSTEM</div>
      <motion.div
        className={s.console}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease }}
      >
        <div className={s.consoleTop}>
          <div className={s.consoleBrand}>
            <Mark />
            Halliard <span>/</span> Workspace
          </div>
          <span className={s.liveDot}>CONNECTED</span>
        </div>
        <div className={s.consoleBody}>
          <div className={s.consoleHeading}>
            <div>
              <span className={s.micro}>CAMPAIGN / 024</span>
              <h3>Summer, in motion.</h3>
            </div>
            <span className={s.sample}>SAMPLE</span>
          </div>
          <div
            className={s.stageTabs}
            role="group"
            aria-label="Campaign demo stage"
          >
            {stages.map((x, i) => (
              <button
                key={x}
                onClick={() => {
                  setStage(i);
                  setPlaying(false);
                }}
                aria-pressed={stage === i}
                className={stage === i ? s.stageActive : ""}
              >
                <span>0{i + 1}</span>
                {x}
                {i < 2 ? <span className={s.stageArrow}>→</span> : null}
              </button>
            ))}
          </div>
          <div className={s.stageContent}>
            <AnimatePresence mode="wait">
              <motion.div
                key={stage}
                initial={reduce ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.3, ease }}
              >
                {stage === 0 ? (
                  <>
                    <div className={s.briefFile}>
                      <span className={s.fileIcon}>↗</span>
                      <div>
                        <b>New business. Ready to move.</b>
                        <p>Client brief · Summer acquisition</p>
                      </div>
                      <span className={s.fileCheck}>✓</span>
                    </div>
                    <div className={s.briefRows}>
                      {[
                        ["OBJECTIVE", "Acquire new customers"],
                        ["AUDIENCE", "Homeowners · 30–55"],
                        ["FLIGHT", "Jun 01 — Jun 30"],
                        ["MEDIA BUDGET", "$50,000"],
                      ].map(([a, b]) => (
                        <div key={a}>
                          <span>{a}</span>
                          <b>{b}</b>
                        </div>
                      ))}
                    </div>
                    <div className={s.consoleNote}>
                      <span className={s.signalDot} />
                      Your strategy. Our starting point.
                    </div>
                  </>
                ) : stage === 1 ? (
                  <>
                    <div className={s.planSummary}>
                      <div>
                        <span className={s.micro}>PLANNED MEDIA</span>
                        <strong>
                          $50,000<span>.00</span>
                        </strong>
                      </div>
                      <span className={s.reviewBadge}>For your review</span>
                    </div>
                    <div className={s.allocation}>
                      {[
                        ["Meta", 42, "$21,000"],
                        ["Google", 32, "$16,000"],
                        ["YouTube", 18, "$9,000"],
                        ["Display", 8, "$4,000"],
                      ].map(([name, width, value], i) => (
                        <div key={name} className={s.allocationRow}>
                          <Platform name={String(name)} />
                          <span>{name}</span>
                          <div className={s.barTrack}>
                            <motion.div
                              initial={{
                                width: reduce ? `${Number(width) * 2}%` : 0,
                              }}
                              animate={{ width: `${Number(width) * 2}%` }}
                              transition={{
                                duration: 0.8,
                                delay: i * 0.1,
                                ease,
                              }}
                              className={s["bar" + i]}
                            />
                          </div>
                          <b>{value}</b>
                        </div>
                      ))}
                    </div>
                    <div className={s.consoleNote}>
                      <span className={s.signalDot} />
                      Nothing launches until you approve.
                    </div>
                  </>
                ) : (
                  <>
                    <div className={s.planSummary}>
                      <div>
                        <span className={s.micro}>MEDIA DELIVERED</span>
                        <strong>
                          $24,860<span>.00</span>
                        </strong>
                      </div>
                      <span className={s.greenBadge}>On pace ↗</span>
                    </div>
                    <PacingChart />
                    <div className={s.chartLegend}>
                      <span>JUN 01</span>
                      <span>— Actual &nbsp; ··· Planned</span>
                      <span>JUN 15</span>
                    </div>
                    <div className={s.consoleNote}>
                      <span className={s.signalDot} />
                      Every channel. One clear view.
                    </div>
                  </>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
        <div className={s.consoleBottom}>
          <span>
            <span className={s.signalDot} />
            Your accounts. Your control.
          </span>
          <button
            onClick={() => setPlaying((v) => !v)}
            aria-label={
              playing ? "Pause campaign animation" : "Play campaign animation"
            }
          >
            {playing ? "Ⅱ" : "▷"}
          </button>
        </div>
      </motion.div>
      <div className={s.floatingReceipt}>
        <span className={s.receiptIcon}>✓</span>
        <div>
          <b>Human accountability. Built in.</b>
          <span>Plan reviewed before launch</span>
        </div>
        <span className={s.receiptLine} />
      </div>
      <div className={s.sceneCaption}>
        <span>01 — BRIEF TO LIVE</span>
        <span>ILLUSTRATIVE WORKSPACE</span>
      </div>
    </div>
  );
}
export function ExecutionHero(props: CtaProps) {
  return (
    <MotionConfig reducedMotion="user">
      <section className={s.hero}>
        <div className={s.heroGrid}>
          <div className={s.heroCopy}>
            <Label>FOR INDEPENDENT AGENCIES</Label>
            <h1>
              Your next
              <br />
              media team.
              <br />
              <span>Already here.</span>
            </h1>
            <p className={s.heroDescription}>
              You win the business. We plan, build, and run the media—on your
              accounts, with you in control.
            </p>
            <div className={s.heroActions}>
              <a
                href="#brief"
                className={s.primaryButton}
                onClick={props.onBrief}
              >
                Get my free plan <Arrow />
              </a>
              <a
                href={props.calendarUrl}
                className={s.textButton}
                onClick={props.onCall}
                target="_blank"
                rel="noreferrer"
              >
                Book a 20-min call <Arrow diagonal />
              </a>
            </div>
            <div className={s.heroTerms}>
              <span>48-hour plan</span>
              <span>No commitment</span>
              <span>7% of media</span>
            </div>
          </div>
          <CampaignConsole />
        </div>
        <div className={s.proofBar}>
          <span>BUILT FOR THE INDEPENDENTS.</span>
          <div>
            <span className={s.proofRule} />
            Running media for <strong>Lewis Media Partners</strong>
          </div>
          <a href="#how-it-works">
            Meet your execution team <span>↓</span>
          </a>
        </div>
      </section>
    </MotionConfig>
  );
}
export function CapacitySection() {
  return (
    <section className={s.capacity}>
      <div className={s.wrap}>
        <Label>MORE CAPACITY. ZERO HEADCOUNT.</Label>
        <div className={s.capacityGrid}>
          <h2>
            Keep winning.
            <br />
            <span>We’ll keep up.</span>
          </h2>
          <p>
            New clients shouldn’t mean another hiring search, another
            overwhelmed buyer, or another late night assembling campaigns.
          </p>
          <div className={s.capacityMetric}>
            <strong>
              6<span>→ 1</span>
            </strong>
            <p>
              Planning through reconciliation.
              <br />
              One accountable team.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
export function ApprovalSection() {
  const [decision, setDecision] = useState<"pending" | "approved" | "returned">(
    "pending",
  );
  return (
    <section id="your-control" className={s.approval}>
      <div className={s.wrap}>
        <div className={s.approvalGrid}>
          <Reveal className={s.approvalCopy}>
            <Label light>HUMAN JUDGMENT. VISIBLE BY DESIGN.</Label>
            <h2>
              Every decision.
              <br />
              Out in the open.
            </h2>
            <p>
              Halliard does the work. You keep the final say. Review the
              thinking, approve the change, and see exactly what happened.
            </p>
            <ul>
              <li>
                <span>01</span>Your approval before spend
              </li>
              <li>
                <span>02</span>Thresholds you control
              </li>
              <li>
                <span>03</span>A human on every exception
              </li>
            </ul>
            <a href="#brief" className={s.darkTextLink}>
              Put us to work <Arrow />
            </a>
          </Reveal>
          <Reveal className={s.approvalDemo}>
            <div className={s.demoTop}>
              <span>
                <span className={s.signalDot} />
                DECISION ROOM
              </span>
              <span>INTERACTIVE DEMO</span>
            </div>
            <div className={s.decisionCard}>
              <div className={s.decisionMeta}>
                <span>OPTIMIZATION / 014</span>
                <span
                  className={
                    decision === "approved" ? s.approvedState : s.pendingState
                  }
                >
                  {decision === "approved"
                    ? "✓ Approved"
                    : decision === "returned"
                      ? "↩ Sent back"
                      : "● Awaiting you"}
                </span>
              </div>
              <h3>
                Put the next $2,400
                <br />
                where intent is higher.
              </h3>
              <p>
                Shift budget from Meta prospecting to Google non-brand search.
              </p>
              <div className={s.transfer}>
                <div>
                  <Platform name="Meta" />
                  <span>Meta</span>
                  <b>− $2,400</b>
                </div>
                <div className={s.transferPath}>
                  <span />
                  <Arrow />
                  <span />
                </div>
                <div>
                  <Platform name="Google" />
                  <span>Google Search</span>
                  <b>+ $2,400</b>
                </div>
              </div>
              <div className={s.reason}>
                <span>THE THINKING</span>
                <p>
                  Search is capturing stronger intent. Move budget within the
                  approved total, then review delivery.
                </p>
              </div>
              <div className={s.reviewer}>
                <span className={s.avatar}>H</span>
                <span>
                  Halliard media team
                  <br />
                  <b>Reviewed · No increase in total spend</b>
                </span>
              </div>
              <div className={s.decisionActions}>
                {decision === "pending" ? (
                  <>
                    <button
                      className={s.approveButton}
                      onClick={() => setDecision("approved")}
                    >
                      Approve change <span>✓</span>
                    </button>
                    <button onClick={() => setDecision("returned")}>
                      Send back <span>↩</span>
                    </button>
                  </>
                ) : (
                  <div className={s.decisionResult} role="status">
                    <span>
                      {decision === "approved"
                        ? "✓ Approval recorded in the sample audit log."
                        : "↩ Returned to the team for review."}
                    </span>
                    <button onClick={() => setDecision("pending")}>
                      Reset demo
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div className={s.auditTrail}>
              <span className={s.auditLine} />
              <span className={s.signalDot} />
              <span>
                {decision === "approved"
                  ? "Just now · You approved the budget shift"
                  : decision === "returned"
                    ? "Just now · You requested a revision"
                    : "09:14 · Proposal reviewed by Halliard"}
              </span>
              <span>LOGGED ↗</span>
            </div>
            <p className={s.demoDisclaimer}>
              Sample workflow. Demo actions do not affect real campaigns.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
const services = [
  {
    name: "Planning",
    desc: "A clear plan for your next win.",
    body: "Channels, budgets, flighting, and pacing. A complete media plan back within 48 hours.",
    label: "01 / THE PLAN",
  },
  {
    name: "Buying",
    desc: "Built right. Ready for launch.",
    body: "Campaigns built and launched on your own Meta and Google platforms, with approval before spend.",
    label: "02 / THE BUILD",
  },
  {
    name: "Trafficking",
    desc: "Every detail in its place.",
    body: "Creative rotation, UTMs, naming conventions, and exclusions. The work behind a clean launch.",
    label: "03 / THE DETAILS",
  },
  {
    name: "Daily QA",
    desc: "Small signals. Early action.",
    body: "Pacing, delivery, spend anomalies, and creative fatigue checked every business day.",
    label: "04 / THE WATCH",
  },
  {
    name: "Recap",
    desc: "Clarity your clients can use.",
    body: "A written account of what happened, why it matters, and what to do next.",
    label: "05 / THE STORY",
  },
  {
    name: "Reconciliation",
    desc: "Every dollar accounted for.",
    body: "Platform spend matched to invoice, matched to plan. A clear close to every flight.",
    label: "06 / THE CLOSE",
  },
];
export function ExecutionServices() {
  const [active, setActive] = useState(0);
  const item = services[active];
  return (
    <section id="how-it-works" className={s.services}>
      <div className={s.wrap}>
        <div className={s.sectionHeading}>
          <div>
            <Label>THE WHOLE JOB. HANDLED.</Label>
            <h2>
              From first brief
              <br />
              to final dollar.
            </h2>
          </div>
          <p>
            Six disciplines. One team that takes
            <br />
            the work all the way through.
          </p>
        </div>
        <div className={s.servicesGrid}>
          <div
            className={s.serviceTabs}
            role="group"
            aria-label="Explore execution services"
          >
            {services.map((service, i) => (
              <button
                key={service.name}
                aria-pressed={active === i}
                onClick={() => setActive(i)}
                className={active === i ? s.serviceActive : ""}
              >
                <span>0{i + 1}</span>
                <b>{service.name}</b>
                <Arrow />
              </button>
            ))}
          </div>
          <div className={s.servicePanel}>
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.22 }}
              >
                <div className={s.servicePanelTop}>
                  <span>{item.label}</span>
                  <span>ILLUSTRATIVE OUTPUT</span>
                </div>
                <ServiceVisual active={active} />
                <div className={s.servicePanelCopy}>
                  <h3>{item.desc}</h3>
                  <p>{item.body}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
function ServiceVisual({ active }: { active: number }) {
  if (active === 0)
    return (
      <div className={s.timelineVisual}>
        <div className={s.timelineHead}>
          <span>CHANNEL ALLOCATION</span>
          {["W01", "W02", "W03", "W04"].map((x) => (
            <span key={x}>{x}</span>
          ))}
        </div>
        {["Meta", "Google", "YouTube", "Display"].map((x, i) => (
          <div className={s.timelineRow} key={x}>
            <span>
              <Platform name={x} />
              {x}
            </span>
            <div>
              <motion.span
                initial={{ scaleX: 0.3 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.55, delay: i * 0.08 }}
                style={{ marginLeft: `${i * 7}%`, width: `${95 - i * 11}%` }}
              >
                {
                  [
                    "Prospecting + retargeting",
                    "Capture demand",
                    "Build consideration",
                    "Stay in view",
                  ][i]
                }
              </motion.span>
            </div>
          </div>
        ))}
      </div>
    );
  if (active === 3)
    return (
      <div className={s.qaVisual}>
        <div>
          <span className={s.micro}>DAILY PACING CHECK</span>
          <strong>
            99.4% <span>On track ↗</span>
          </strong>
        </div>
        <PacingChart variant={1} />
        <p>
          <span className={s.signalDot} />
          Spend reviewed. No exceptions today.
        </p>
      </div>
    );
  if (active === 4)
    return (
      <div className={s.reportVisual}>
        <div>
          <span>MONTHLY RECAP</span>
          <b>
            A clearer view
            <br />
            of what comes next.
          </b>
          <p>01 Performance &nbsp; 02 Learnings &nbsp; 03 Next steps</p>
        </div>
        <div className={s.reportBars}>
          {[38, 56, 49, 73, 65, 85, 97].map((n, i) => (
            <motion.i
              key={i}
              initial={{ height: 0 }}
              animate={{ height: `${n}%` }}
              transition={{ duration: 0.6, delay: i * 0.07 }}
            />
          ))}
        </div>
      </div>
    );
  if (active === 5)
    return (
      <div className={s.reconcileVisual}>
        {[
          ["Approved plan", "$50,000.00"],
          ["Platform spend", "$49,860.00"],
          ["Media invoice", "$49,860.00"],
        ].map(([a, b], i) => (
          <div key={a}>
            <span>
              0{i + 1} / {a}
            </span>
            <strong>{b}</strong>
            <span className={s.reconcileStatus}>
              {i === 0 ? "Budget reference" : "✓ Matched"}
            </span>
          </div>
        ))}
        <p>
          <span>UNSPENT BUDGET</span>
          <b>$140.00</b>
        </p>
      </div>
    );
  return (
    <div className={s.checklistVisual}>
      <div className={s.checklistTitle}>
        <span>{active === 1 ? "LAUNCH READINESS" : "CREATIVE & TRACKING"}</span>
        <b>4 / 4 checked</b>
      </div>
      {(active === 1
        ? [
            "Campaign structure configured",
            "Audiences & exclusions applied",
            "Budget limits verified",
            "Ready for agency approval",
          ]
        : [
            "Creative formats validated",
            "UTM parameters applied",
            "Naming conventions checked",
            "Destination URLs verified",
          ]
      ).map((x, i) => (
        <motion.div
          key={x}
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.1 }}
        >
          <span>✓</span>
          {x}
          <span>PASS</span>
        </motion.div>
      ))}
    </div>
  );
}
export function OwnershipSection() {
  const [connected, setConnected] = useState(true);
  return (
    <section className={s.ownership}>
      <div className={s.wrap}>
        <div className={s.ownershipGrid}>
          <Reveal>
            <Label>YOUR BUSINESS STAYS YOURS.</Label>
            <h2>
              Your seats.
              <br />
              Your clients.
              <br />
              <span>Always.</span>
            </h2>
            <p>
              We operate inside your accounts. Media is billed directly to you.
              Your history, pixels, and audiences stay exactly where they
              belong.
            </p>
            <p className={s.ownershipSmall}>
              Never Agency of Record. Never a media markup.
            </p>
          </Reveal>
          <Reveal className={s.ownershipGraphic}>
            <div className={s.agencyBoundary}>
              <div className={s.boundaryHeading}>
                <span>YOUR AGENCY</span>
                <span>↗ YOU OWN THIS</span>
              </div>
              <div className={s.platformGrid}>
                {["Meta", "Google", "YouTube", "Display"].map((x) => (
                  <div key={x}>
                    <Platform name={x} />
                    <b>{x}</b>
                    <span>Agency-owned</span>
                  </div>
                ))}
              </div>
              <div className={s.assetStrip}>
                <span>✓ Accounts</span>
                <span>✓ Audiences</span>
                <span>✓ History</span>
              </div>
            </div>
            <div
              className={`${s.connection} ${connected ? "" : s.disconnected}`}
            >
              <span />
              <span>{connected ? "PARTNER ACCESS" : "ACCESS REVOKED"}</span>
              <span />
            </div>
            <div className={s.partner}>
              <Brand />
              <button onClick={() => setConnected((v) => !v)}>
                {connected ? "Disconnect demo" : "Reconnect demo"}{" "}
                <span>{connected ? "×" : "+"}</span>
              </button>
            </div>
            <p className={s.ownershipStatus} role="status">
              {connected
                ? "Try disconnecting. Everything above stays yours."
                : "Halliard disconnected. Your accounts and data stay with you."}
            </p>
            <div className={s.roadmap}>
              ON THE ROADMAP <span>CTV · OOH · TV · Radio · Audio</span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
export function ExecutionFinal({ onBrief }: { onBrief: () => void }) {
  return (
    <section className={s.final}>
      <div className={s.wrap}>
        <Label light>LET’S GET TO WORK.</Label>
        <h2>
          Your next pitch.
          <br />
          <span>Our next plan.</span>
        </h2>
        <a href="#brief" onClick={onBrief} className={s.finalButton}>
          Send us a brief <Arrow diagonal />
        </a>
        <p>Two minutes from you. A full plan within 48 hours.</p>
        <div className={s.finalLines} />
      </div>
    </section>
  );
}
export function ExecutionFooter() {
  return (
    <footer className={s.footer}>
      <div className={s.wrap}>
        <Brand />
        <span>Independent by design.</span>
        <div>
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
          <a href="mailto:matthew@halliardmedia.com">
            Contact <Arrow diagonal />
          </a>
        </div>
        <small>© {new Date().getFullYear()} Halliard Media Inc.</small>
      </div>
    </footer>
  );
}
