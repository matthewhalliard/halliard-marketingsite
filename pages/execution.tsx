import Head from "next/head";
import { MotionConfig } from "motion/react";
import React, { useEffect, useState } from "react";
import { Container } from "../components/mmm/Container";
import { trackCta } from "../lib/track";
import { trackPixel } from "@/lib/meta-pixel";
import styles from "../styles/Execution.module.css";
import {
  ExecutionHeader,
  ExecutionHero,
  CapacitySection,
  ApprovalSection,
  ExecutionServices,
  OwnershipSection,
  ExecutionFinal,
  ExecutionFooter,
} from "../components/execution/Experience";

const CALENDAR_URL =
  "https://calendar.google.com/calendar/appointments/schedules/AcZssZ1jtM9RZtwp5-TuTTBbXg9Wkc9VEV1dLDUpVS-ajVsNJOoJSBGQDyd7hZ-S_x7mVHGYpZTRPHW2?gv=true";

const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "gclid",
  "fbclid",
  "li_fat_id",
];

// ---------- helpers ----------

function setCookie(name: string, value: string, days = 30) {
  if (typeof document === "undefined") return;
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`;
}

function getCookie(name: string): string {
  if (typeof document === "undefined") return "";
  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${name}=`));
  return match ? decodeURIComponent(match.split("=")[1] || "") : "";
}

function persistUtms() {
  if (typeof window === "undefined") return;
  const params = new URLSearchParams(window.location.search);
  UTM_KEYS.forEach((k) => {
    const v = params.get(k);
    if (v) setCookie(`hal_${k}`, v);
  });
}

function readUtms(): Record<string, string> {
  const out: Record<string, string> = {};
  UTM_KEYS.forEach((k) => {
    const v = getCookie(`hal_${k}`);
    if (v) out[k] = v;
  });
  return out;
}

function fireBriefIntent(location: string) {
  try {
    trackCta("execution_brief_intent_click", location);
    const w = window as unknown as {
      posthog?: {
        capture: (event: string, properties: Record<string, unknown>) => void;
      };
      gtag?: (
        command: string,
        event: string,
        properties: Record<string, unknown>,
      ) => void;
    };
    if (w?.posthog?.capture) {
      w.posthog.capture("execution_brief_intent_click", {
        location,
        page: "/execution",
      });
    }
    trackPixel("Lead", {
      content_name: "execution_brief_intent_click",
      source: "execution_lp",
      location,
    });
  } catch {
    // never break the page
  }
}

function fireBookCall(location: string) {
  try {
    trackCta("execution_book_call_click", location);
    const w = window as unknown as {
      posthog?: {
        capture: (event: string, properties: Record<string, unknown>) => void;
      };
      gtag?: (
        command: string,
        event: string,
        properties: Record<string, unknown>,
      ) => void;
    };
    if (w?.posthog?.capture) {
      w.posthog.capture("execution_book_call_click", {
        location,
        page: "/execution",
      });
    }
    if (w?.gtag) {
      w.gtag("event", "conversion", {
        send_to: "AW-672346912/qEmHCJ6L_pgcEKDmzMAC",
      });
    }
    trackPixel("Lead", {
      content_name: "execution_book_call_click",
      source: "execution_lp",
      location,
    });
  } catch {
    // swallow
  }
}

function fireBriefSubmitted(payload: Record<string, unknown>) {
  try {
    const w = window as unknown as {
      posthog?: {
        capture: (event: string, properties: Record<string, unknown>) => void;
      };
      gtag?: (
        command: string,
        event: string,
        properties: Record<string, unknown>,
      ) => void;
    };
    if (w?.posthog?.capture) {
      w.posthog.capture("execution_brief_submitted", {
        page: "/execution",
        agency: payload.agency,
        budget: payload.budget,
        channels: payload.channels,
      });
    }
    if (w?.gtag) {
      w.gtag("event", "conversion", {
        send_to: "AW-672346912/qEmHCJ6L_pgcEKDmzMAC",
      });
    }
    trackPixel("Lead", {
      content_name: "execution_brief_submitted",
      source: "execution_lp",
    });
  } catch {
    // swallow
  }
}

function ComparisonSection() {
  const rows: Array<[string, string, string, string, string, string]> = [
    // criterion, Halliard, Hire, Pathlabs, InvisiblePPC, Concord
    ["A human is accountable", "Yes", "Yes", "Yes", "Sometimes", "No"],
    ["Agent does the repetitive work", "Yes", "No", "No", "Templated", "Yes"],
    ["Runs on your seats and accounts", "Yes", "Yes", "Yes", "Yes", "Yes"],
    ["Single visible fee", "Yes", "Salary", "Retainer", "Yes", "Software fee"],
    [
      "Independent (not owned by a vendor)",
      "Yes",
      "Yes",
      "No (MiQ)",
      "Yes",
      "Yes",
    ],
    [
      "Cross-channel by default",
      "Yes",
      "Depends",
      "Yes",
      "Google + Meta",
      "Yes",
    ],
    [
      "Onboarding time",
      "48 hrs",
      "3 mo",
      "2\u20134 wks",
      "1 wk",
      "1\u20132 wks",
    ],
    ["Cancel any month", "Yes", "HR event", "Yes", "Yes", "Contract"],
  ];
  return (
    <section id="execution-pricing" className="py-16 sm:py-24 bg-white">
      <Container className="">
        <div className="mx-auto max-w-2xl text-center mb-12">
          <h2 className="font-display text-3xl tracking-tight text-slate-900 sm:text-4xl">
            7% of media. Nothing else.
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            You already know the alternatives. Here&rsquo;s the honest read.
          </p>
        </div>
        <div className="mx-auto max-w-5xl overflow-x-auto rounded-2xl border border-tint shadow-lg bg-white">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                <th className="text-left px-5 py-4 font-semibold">Criterion</th>
                <th className="px-5 py-4 font-semibold text-primary">
                  Halliard
                </th>
                <th className="px-5 py-4 font-semibold">Hire a buyer</th>
                <th className="px-5 py-4 font-semibold">Pathlabs</th>
                <th className="px-5 py-4 font-semibold">InvisiblePPC</th>
                <th className="px-5 py-4 font-semibold">Concord</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r[0]} className="border-t border-tint">
                  <td className="text-left px-5 py-4 text-slate-700 font-medium">
                    {r[0]}
                  </td>
                  <td className="px-5 py-4 text-center bg-primary/5 text-primary font-semibold">
                    {r[1]}
                  </td>
                  <td className="px-5 py-4 text-center text-slate-600">
                    {r[2]}
                  </td>
                  <td className="px-5 py-4 text-center text-slate-600">
                    {r[3]}
                  </td>
                  <td className="px-5 py-4 text-center text-slate-600">
                    {r[4]}
                  </td>
                  <td className="px-5 py-4 text-center text-slate-600">
                    {r[5]}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Container>
    </section>
  );
}

function FitSection() {
  const yes = [
    "You run agency clients on Meta and Google (and want more)",
    "You&rsquo;re capacity-constrained on buyers or trafficking",
    "You want a plan for a pitch this week",
    "You want one visible fee, not a media markup",
  ];
  const no = [
    "You have an in-house trading desk",
    "You want us to hold the money (we don&rsquo;t)",
    "You need us to be Agency of Record",
    "You want templated single-channel PPC for $445/mo",
  ];
  return (
    <section className="py-16 sm:py-24 bg-slate-50 border-y border-tint">
      <Container className="">
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="rounded-2xl bg-white p-8 shadow-lg border border-tint">
            <h3 className="font-display text-2xl font-medium text-slate-900 mb-4">
              For you if&hellip;
            </h3>
            <ul className="space-y-3 text-slate-700">
              {yes.map((y) => (
                <li key={y} className="flex gap-3">
                  <span className="text-primary font-bold">&#10003;</span>
                  <span dangerouslySetInnerHTML={{ __html: y }} />
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl bg-white p-8 shadow-lg border border-tint">
            <h3 className="font-display text-2xl font-medium text-slate-900 mb-4">
              Not for you if&hellip;
            </h3>
            <ul className="space-y-3 text-slate-700">
              {no.map((n) => (
                <li key={n} className="flex gap-3">
                  <span className="text-slate-400 font-bold">&times;</span>
                  <span dangerouslySetInnerHTML={{ __html: n }} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}

function BriefForm() {
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [briefStarted, setBriefStarted] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  function onFirstFocus() {
    if (briefStarted) return;
    setBriefStarted(true);
    try {
      const w = window as unknown as {
        posthog?: {
          capture: (event: string, properties: Record<string, unknown>) => void;
        };
        gtag?: (
          command: string,
          event: string,
          properties: Record<string, unknown>,
        ) => void;
      };
      if (w?.posthog?.capture) {
        w.posthog.capture("execution_brief_started", { page: "/execution" });
      }
      trackPixel("Lead", {
        content_name: "execution_brief_started",
        source: "execution_lp",
      });
    } catch {
      // swallow
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg(null);
    const form = e.currentTarget;
    const data = new FormData(form);

    // Honeypot
    if (String(data.get("website") || "")) {
      setStatus("success");
      return;
    }

    const channels = data.getAll("channels").map(String);

    const payload: Record<string, unknown> = {
      name: String(data.get("name") || ""),
      email: String(data.get("email") || ""),
      agency: String(data.get("agency") || ""),
      client: String(data.get("client") || ""),
      budget: String(data.get("budget") || ""),
      channels,
      goal: String(data.get("goal") || ""),
      source: "execution_lp",
      page: "/execution",
      submitted_at: new Date().toISOString(),
      ...readUtms(),
      referrer: typeof document !== "undefined" ? document.referrer : "",
    };

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`Status ${res.status}`);
      fireBriefSubmitted(payload);
      setStatus("success");
      form.reset();
    } catch (err) {
      console.error("Brief submission failed", err);
      setStatus("error");
      setErrorMsg(
        "Something went wrong. Please email matthew@halliardmedia.com directly.",
      );
    }
  }

  return (
    <section id="brief" className="py-20 sm:py-24 bg-white scroll-mt-24">
      <Container className="">
        <div className="mx-auto max-w-2xl">
          <div className="text-center mb-10">
            <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-3">
              Send a brief
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-medium tracking-tight text-slate-900">
              Two minutes. A full plan back within 48 hours.
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              Free. No commitment. If you want it live, we run it on your
              platforms for 7% of media.
            </p>
          </div>

          {status === "success" ? (
            <div
              role="status"
              className="rounded-2xl border border-tint bg-white p-8 text-center shadow-lg"
            >
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary text-2xl">
                &#10003;
              </div>
              <h3 className="font-display text-2xl font-medium text-slate-900">
                Got it.
              </h3>
              <p className="mt-3 text-slate-600">
                Your plan will be in your inbox within 48 hours. If anything in
                the brief is unclear, we&rsquo;ll email you first rather than
                guess.
              </p>
              <p className="mt-4 text-sm text-slate-500">
                Urgent?{" "}
                <a
                  className="text-primary underline"
                  href="mailto:matthew@halliardmedia.com"
                >
                  matthew@halliardmedia.com
                </a>
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              onFocus={onFirstFocus}
              className="rounded-2xl border border-tint bg-white p-6 sm:p-8 shadow-lg space-y-5"
            >
              {/* Honeypot */}
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                className="absolute -left-[9999px] h-0 w-0 opacity-0"
                aria-hidden="true"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-slate-700"
                  >
                    Your name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    placeholder="Jane Buyer"
                    className="mt-1.5 block w-full rounded-md border border-slate-300 bg-white px-3 py-2.5 text-base text-slate-900 placeholder-slate-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <div>
                  <label
                    htmlFor="agency"
                    className="block text-sm font-medium text-slate-700"
                  >
                    Agency
                  </label>
                  <input
                    id="agency"
                    name="agency"
                    type="text"
                    required
                    autoComplete="organization"
                    placeholder="Your agency"
                    className="mt-1.5 block w-full rounded-md border border-slate-300 bg-white px-3 py-2.5 text-base text-slate-900 placeholder-slate-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-slate-700"
                >
                  Work email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  inputMode="email"
                  placeholder="jane@youragency.com"
                  className="mt-1.5 block w-full rounded-md border border-slate-300 bg-white px-3 py-2.5 text-base text-slate-900 placeholder-slate-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="client"
                    className="block text-sm font-medium text-slate-700"
                  >
                    Client or brand
                  </label>
                  <input
                    id="client"
                    name="client"
                    type="text"
                    placeholder="Acme Co."
                    className="mt-1.5 block w-full rounded-md border border-slate-300 bg-white px-3 py-2.5 text-base text-slate-900 placeholder-slate-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <div>
                  <label
                    htmlFor="budget"
                    className="block text-sm font-medium text-slate-700"
                  >
                    Monthly media budget
                  </label>
                  <select
                    id="budget"
                    name="budget"
                    required
                    defaultValue=""
                    className="mt-1.5 block w-full rounded-md border border-slate-300 bg-white px-3 py-2.5 text-base text-slate-900 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  >
                    <option value="" disabled>
                      Select
                    </option>
                    <option>Under $10,000</option>
                    <option>$10,000 to $25,000</option>
                    <option>$25,000 to $75,000</option>
                    <option>$75,000 to $200,000</option>
                    <option>Over $200,000</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700">
                  Channels in scope
                </label>
                <div className="mt-2 grid grid-cols-2 sm:grid-cols-3 gap-2 text-sm">
                  {["Meta", "Google", "CTV", "OOH", "TV or Radio", "Other"].map(
                    (c) => (
                      <label
                        key={c}
                        className="flex items-center gap-2 rounded-md border border-slate-200 px-3 py-2 hover:border-primary/40 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          name="channels"
                          value={c}
                          className="rounded border-slate-300 text-primary focus:ring-primary/30"
                        />
                        <span className="text-slate-700">{c}</span>
                      </label>
                    ),
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="goal"
                  className="block text-sm font-medium text-slate-700"
                >
                  What does the client need this campaign to do?
                </label>
                <textarea
                  id="goal"
                  name="goal"
                  rows={3}
                  required
                  placeholder="Objective, audience, geography, timing. Whatever you'd tell a new buyer on day one."
                  className="mt-1.5 block w-full rounded-md border border-slate-300 bg-white px-3 py-2.5 text-base text-slate-900 placeholder-slate-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>

              {status === "error" && errorMsg && (
                <p role="alert" className="text-sm text-red-600">
                  {errorMsg}
                </p>
              )}

              <button
                type="submit"
                disabled={status === "submitting"}
                className="w-full inline-flex items-center justify-center rounded-full bg-primary py-3 px-6 text-base font-semibold text-white hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === "submitting" ? "Sending\u2026" : "Get my free plan"}
              </button>

              <p className="text-xs text-slate-500 text-center">
                No credit card, no contract. We never contact your client.
              </p>
            </form>
          )}
        </div>
      </Container>
    </section>
  );
}

function FaqSection() {
  const items = [
    {
      q: "I\u2019m not handing an AI my client\u2019s money.",
      a: "You shouldn\u2019t. You approve the plan before anything spends. Every in-flight change goes through the internal portal and gets logged. A person signs the exceptions. Nothing runs on autopilot.",
    },
    {
      q: "How is this different from hiring Pathlabs?",
      a: "Pathlabs was acquired by MiQ in 2024 \u2014 they\u2019re now a media vendor\u2019s white-label team. We don\u2019t sell media, ever. We charge one visible fee for the work, on your seats.",
    },
    {
      q: "Why 7% when InvisiblePPC is $445/mo?",
      a: "InvisiblePPC does templated single-platform PPC. We build cross-channel plans, run them on your seats, and stay accountable to a person you can call.",
    },
    {
      q: "What about Concord and other agent tools?",
      a: "Concord is software your team runs. If you have buyers with capacity, look at Concord. Most agencies we talk to don\u2019t \u2014 they need the work done, not another tool to run.",
    },
    {
      q: "Our money is in TV \u2014 do you do that?",
      a: "Not yet. TV, radio and OOH are on the roadmap. Today we run Meta, Google, YouTube and Display where we have your seats. We\u2019ll tell you if what you need isn\u2019t in our lane.",
    },
    {
      q: "Can we cancel?",
      a: "Month to month. Revoke partner access anytime. You own the accounts \u2014 we just operate them.",
    },
    {
      q: "Who owns the client relationship?",
      a: "You do. Always. We\u2019re never Agency of Record and we never contact your client directly.",
    },
  ];
  return (
    <section className="py-16 sm:py-24 bg-white">
      <Container className="">
        <div className="mx-auto max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl tracking-tight text-slate-900 sm:text-4xl">
              The honest answers
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              What agencies ask us on the first call.
            </p>
          </div>
          <div className="divide-y divide-tint border-y border-tint">
            {items.map((it) => (
              <details key={it.q} className="group py-5">
                <summary className="flex justify-between items-center gap-4 cursor-pointer list-none">
                  <span className="font-medium text-slate-900">{it.q}</span>
                  <span className="text-primary transition-transform group-open:rotate-45 text-xl leading-none">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-slate-600 leading-relaxed">{it.a}</p>
              </details>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

export default function ExecutionPage() {
  useEffect(() => {
    persistUtms();
    try {
      const w = window as unknown as {
        posthog?: {
          capture: (event: string, properties: Record<string, unknown>) => void;
        };
        gtag?: (
          command: string,
          event: string,
          properties: Record<string, unknown>,
        ) => void;
      };
      if (w?.posthog?.capture) {
        w.posthog.capture("execution_page_view", {
          page: "/execution",
          ...readUtms(),
        });
      }
    } catch {
      // swallow
    }
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <div className={styles.page}>
        <Head>
          <title>
            Halliard &mdash; Media execution for independent agencies. 7% of
            media, nothing else.
          </title>
          <meta
            name="description"
            content="Send us a brief. We plan, build and run it on your own platforms. You approve the plan and see every decision. 7% of media, nothing else. Not agency of record."
          />
          <link
            rel="canonical"
            href="https://www.halliardmedia.com/execution"
          />
          <meta
            property="og:title"
            content="Halliard \u2014 Media execution for independent agencies"
          />
          <meta
            property="og:description"
            content="Send us a brief. Full plan back within 48 hours, free. 7% of media, nothing else."
          />
          <meta property="og:type" content="website" />
          <meta
            property="og:url"
            content="https://www.halliardmedia.com/execution"
          />
          <meta name="twitter:card" content="summary_large_image" />
        </Head>
        <ExecutionHeader
          onBrief={() => fireBriefIntent("nav")}
          calendarUrl={CALENDAR_URL}
          onCall={() => fireBookCall("nav")}
        />
        <div id="execution-content">
          <ExecutionHero
            onBrief={() => fireBriefIntent("hero")}
            calendarUrl={CALENDAR_URL}
            onCall={() => fireBookCall("hero")}
          />
          <CapacitySection />
          <ApprovalSection />
          <ExecutionServices />
          <OwnershipSection />
          <ComparisonSection />
          <FitSection />
          <BriefForm />
          <FaqSection />
          <ExecutionFinal onBrief={() => fireBriefIntent("final")} />
        </div>
        <ExecutionFooter />
      </div>
    </MotionConfig>
  );
}

ExecutionPage.disableNavbar = true;
ExecutionPage.fullWidth = true;
