"use client";

import { drawIn, el, Explainer, HM, MUTED, pill, popIn, searchIcon, SKY, text, TINT, typeInto, WASH, type Scene } from "./explainer";

/**
 * What Halliard does while it drafts strategies. Illustrative: every name and
 * number is made up, and none of it is read from the run.
 */

const SCENES: Scene[] = [
  {
    label: "Brief",
    caption: "Reading your brief for the goal, the budget, the timing and who it's for",
    run(ctx) {
      const { svg } = ctx;
      el(svg, "rect", { x: 90, y: 20, width: 150, height: 190, rx: 8, fill: "#fff", stroke: HM });
      for (let i = 0; i < 11; i++) {
        el(svg, "rect", { x: 106, y: 40 + i * 15, width: i % 4 === 3 ? 70 : 118, height: 5, rx: 2.5, fill: TINT });
      }
      const scan = el(svg, "rect", { x: 92, y: 30, width: 146, height: 14, fill: SKY, opacity: 0.15 });
      ctx.animate(scan, [{ transform: "translateY(0)" }, { transform: "translateY(165px)" }], {
        duration: 2600,
        iterations: 2,
        direction: "alternate",
        easing: "ease-in-out",
      });
      const facts: [number, string, number][] = [
        [1, "Goal: spring launch", 250],
        [3, "Budget: $120k", 900],
        [6, "Anglers, 35 to 54", 1550],
        [9, "Pacific Northwest", 2200],
      ];
      facts.forEach(([row, label, delay], i) => {
        const y = 40 + row * 15;
        const mark = el(svg, "rect", { x: 106, y: y - 2, width: 118, height: 9, rx: 3, fill: SKY, opacity: 0 });
        ctx.animate(mark, [{ opacity: 0 }, { opacity: 0.35 }], { duration: 300, delay });
        const thread = el(svg, "path", {
          d: `M228 ${y + 2} C 280 ${y + 2}, 290 ${38 + i * 46}, 340 ${38 + i * 46}`,
          fill: "none",
          stroke: TINT,
        });
        drawIn(ctx, thread, 500, delay + 150);
        pill(ctx, 345, 26 + i * 46, label, delay + 450);
      });
    },
  },
  {
    label: "Web",
    caption: "Searching the web and reading the articles, reports and reviews that matter",
    run(ctx) {
      const { svg } = ctx;
      const browser = el(svg, "g", {});
      el(browser, "rect", { x: 30, y: 14, width: 300, height: 204, rx: 10, fill: "#fff", stroke: HM });
      [0, 1, 2].forEach((k) => el(browser, "circle", { cx: 46 + k * 11, cy: 28, r: 3, fill: TINT }));
      el(browser, "line", { x1: 30, y1: 40, x2: 330, y2: 40, stroke: TINT });
      el(browser, "rect", { x: 44, y: 50, width: 272, height: 24, rx: 12, fill: WASH });
      searchIcon(browser, 59, 61, 4.5);
      typeInto(ctx, text(browser, 74, 66, ""), "drift boat market trends 2026", 150);

      const results: [string, string][] = [
        ["Drift boat sales climb as anglers…", "fishingindustry.com"],
        ["2026 outdoor spending report", "outdoorreport.org"],
        ["Best drift boats, reviewed", "riverjournal.com"],
        ["Why guides are switching boats", "flyguides.net"],
      ];
      const rows = results.map(([title, url], i) => {
        const y = 86 + i * 32;
        const g = el(svg, "g", {});
        text(g, 48, y + 10, title, { "font-size": 11, fill: SKY });
        text(g, 48, y + 22, url, { "font-size": 11, fill: MUTED });
        popIn(ctx, g, 1500 + i * 120);
        return y;
      });

      const cursor = el(svg, "rect", { x: 40, y: 82, width: 280, height: 30, rx: 6, fill: SKY, opacity: 0 });
      const notes: [string, number][] = [
        ["Sales up 12% since 2024", 0],
        ["Spend peaks before May", 1],
        ["Buyers want stability", 2],
      ];
      notes.forEach(([note, row], k) => {
        const delay = 2100 + k * 900;
        const y = rows[row] ?? 0;
        ctx.animate(
          cursor,
          [
            { opacity: 0.12, transform: `translateY(${y - 86}px)` },
            { opacity: 0.12, transform: `translateY(${y - 86}px)` },
          ],
          { duration: 700, delay, fill: k === notes.length - 1 ? "forwards" : "none" },
        );

        const page = el(svg, "g", {});
        el(page, "rect", { x: 360, y: 30, width: 70, height: 90, rx: 6, fill: "#fff", stroke: HM, "stroke-width": 0.75 });
        for (let j = 0; j < 6; j++) {
          el(page, "rect", { x: 370, y: 44 + j * 11, width: j === 2 ? 38 : 50, height: 4, rx: 2, fill: j === 3 ? SKY : TINT });
        }
        page.style.transformBox = "fill-box";
        page.style.transformOrigin = "center";
        ctx.animate(
          page,
          [
            { opacity: 0, transform: `translate(-150px, ${y - 60}px) scale(.3)` },
            { opacity: 1, transform: `translate(${k * 14}px, ${k * 10}px) rotate(${(k - 1) * 5}deg)` },
          ],
          { duration: 600, delay: delay + 150 },
        );

        const thread = el(svg, "path", {
          d: `M${432 + k * 14} ${82 + k * 10} C 470 ${82 + k * 10}, 460 ${52 + k * 58}, 482 ${52 + k * 58}`,
          fill: "none",
          stroke: SKY,
        });
        drawIn(ctx, thread, 400, delay + 650);

        const g = el(svg, "g", {});
        el(g, "rect", { x: 484, y: 40 + k * 58, width: 140, height: 26, rx: 6, fill: WASH, stroke: SKY, "stroke-width": 0.5 });
        text(g, 494, 57 + k * 58, note, { "font-size": 11 });
        popIn(ctx, g, delay + 800);
      });
    },
  },
  {
    label: "Category",
    caption: "Sizing the category: how many people search for it, and when",
    run(ctx) {
      const { svg } = ctx;
      const base = 190;
      const volumes = [38, 44, 52, 70, 96, 128, 150, 142, 110, 80, 58, 46];
      el(svg, "line", { x1: 110, y1: base, x2: 530, y2: base, stroke: TINT });
      const points: string[] = [];
      volumes.forEach((v, i) => {
        const x = 120 + i * 34;
        const bar = el(svg, "rect", { x, y: base - v, width: 22, height: v, rx: 3, fill: i >= 4 && i <= 7 ? SKY : TINT });
        bar.style.transformBox = "fill-box";
        bar.style.transformOrigin = "bottom";
        ctx.animate(bar, [{ transform: "scaleY(0)" }, { transform: "scaleY(1)" }], { duration: 600, delay: 120 + i * 90 });
        text(svg, x + 7, base + 16, "JFMAMJJASOND".charAt(i), { "font-size": 11, fill: MUTED });
        points.push(`${x + 11} ${base - v - 14}`);
      });
      const trend = el(svg, "path", {
        d: `M${points.join(" L")}`,
        fill: "none",
        stroke: HM,
        "stroke-width": 1.5,
        "stroke-linejoin": "round",
      });
      drawIn(ctx, trend, 1400, 1300);

      const count = text(svg, 120, 30, "0", { "font-size": 22, "font-weight": 500 });
      text(svg, 120, 48, "monthly searches at peak", { "font-size": 11, fill: MUTED });
      const peak = 48200;
      if (ctx.instant) count.textContent = peak.toLocaleString();
      else
        for (let i = 0; i <= 30; i++) {
          ctx.later(() => {
            count.textContent = Math.round(peak * (1 - Math.pow(1 - i / 30, 3))).toLocaleString();
          }, 800 + i * 53);
        }
      pill(ctx, 390, 22, "Peaks May to August", 2600);
    },
  },
  {
    label: "Competition",
    caption: "Scanning the competition: who's spending, where, and what they say",
    run(ctx) {
      const { svg } = ctx;
      const cx = 200;
      const cy = 115;
      [90, 62, 34].forEach((r) => el(svg, "circle", { cx, cy, r, fill: "none", stroke: TINT }));
      el(svg, "line", { x1: cx - 90, y1: cy, x2: cx + 90, y2: cy, stroke: TINT, "stroke-width": 0.5 });
      el(svg, "line", { x1: cx, y1: cy - 90, x2: cx, y2: cy + 90, stroke: TINT, "stroke-width": 0.5 });
      const sweep = el(svg, "path", { d: `M${cx} ${cy} L${cx + 90} ${cy} A90 90 0 0 0 ${cx + 78} ${cy - 45} Z`, fill: SKY, opacity: 0.22 });
      sweep.style.transformOrigin = `${cx}px ${cy}px`;
      ctx.animate(sweep, [{ transform: "rotate(0deg)" }, { transform: "rotate(-360deg)" }], {
        duration: 2400,
        iterations: 2,
        easing: "linear",
      });
      el(svg, "circle", { cx, cy, r: 5, fill: HM });

      const rivals: [number, number, string, string][] = [
        [60, -30, "Rival A", "Heavy on search"],
        [-50, -55, "Rival B", "Video in spring"],
        [-70, 40, "Rival C", "Price-led social"],
        [30, 65, "Rival D", "Quiet since March"],
      ];
      rivals.forEach(([dx, dy, name, note], i) => {
        const delay = 500 + i * 600;
        const fill = i === 3 ? TINT : SKY;
        popIn(ctx, el(svg, "circle", { cx: cx + dx, cy: cy + dy, r: 6, fill }), delay);
        const ping = el(svg, "circle", { cx: cx + dx, cy: cy + dy, r: 6, fill: "none", stroke: SKY, opacity: 0 });
        ctx.animate(ping, [{ r: 6, opacity: 0.9 }, { r: 20, opacity: 0 }], { duration: 900, delay });

        const y = 34 + i * 44;
        const g = el(svg, "g", {});
        el(g, "rect", { x: 340, y, width: 220, height: 36, rx: 8, fill: WASH });
        el(g, "circle", { cx: 356, cy: y + 18, r: 5, fill });
        text(g, 370, y + 15, name, { "font-weight": 500 });
        text(g, 370, y + 29, note, { "font-size": 11, fill: MUTED });
        popIn(ctx, g, delay + 200);
      });
    },
  },
  {
    label: "Search demand",
    caption: "Listening to what people actually type when they're in the market",
    run(ctx) {
      const { svg } = ctx;
      const box = el(svg, "g", {});
      el(box, "rect", { x: 150, y: 24, width: 340, height: 36, rx: 18, fill: "#fff", stroke: HM });
      searchIcon(box, 172, 40, 6);
      const query = text(box, 190, 47, "", { "font-size": 14 });
      const caret = el(box, "rect", { x: 190, y: 33, width: 1.5, height: 16, fill: HM });
      ctx.animate(caret, [{ opacity: 1 }, { opacity: 0 }], { duration: 500, iterations: 10, easing: "steps(1)" });
      typeInto(ctx, query, "best drift boat for beginners", 0, () =>
        caret.setAttribute("x", String(192 + query.getComputedTextLength())),
      );

      const related: [string, string][] = [
        ["drift boat vs raft", "2.9k"],
        ["used drift boats near me", "1.4k"],
        ["how to row a drift boat", "880"],
        ["fly fishing trips oregon", "5.1k"],
        ["drift boat price", "3.3k"],
        ["guided float trips", "720"],
      ];
      related.forEach(([label, volume], k) => {
        const x = 60 + (k % 3) * 185 + (k >= 3 ? 40 : 0);
        const y = 100 + Math.floor(k / 3) * 58;
        pill(ctx, x, y, label, 1900 + k * 260);
        popIn(ctx, text(svg, x + label.length * 6.6 + 28, y + 16, `${volume}/mo`, { "font-size": 11, fill: SKY }), 2100 + k * 260);
      });
    },
  },
  {
    label: "Strategies",
    caption: "Writing the roles media could play, each with its audience, budget and evidence",
    run(ctx) {
      const { svg } = ctx;
      const sources: [number, string][] = [
        [30, "Brief"],
        [90, "Web"],
        [150, "Category"],
        [210, "Search"],
      ];
      sources.forEach(([y, label], i) => {
        popIn(ctx, el(svg, "circle", { cx: 40, cy: y, r: 5, fill: i % 2 ? HM : SKY }), i * 120);
        text(svg, 52, y + 4, label, { "font-size": 11, fill: MUTED });
      });

      const cards: [string, string, string][] = [
        ["Build consideration", "Anglers, 35 to 54", "$48k"],
        ["Capture spring demand", "High-intent search", "$42k"],
        ["Win back lapsed buyers", "Past customers", "$30k"],
      ];
      cards.forEach(([role, audience, budget], i) => {
        const x = 200 + i * 148;
        const y = 40;
        sources.forEach(([sy]) => {
          const thread = el(svg, "path", {
            d: `M45 ${sy} C 150 ${sy}, ${x - 20} ${y + 75}, ${x} ${y + 75}`,
            fill: "none",
            stroke: TINT,
            "stroke-width": 0.75,
          });
          drawIn(ctx, thread, 700, 400 + i * 450);
        });

        const g = el(svg, "g", {});
        el(g, "rect", { x, y, width: 132, height: 150, rx: 10, fill: "#fff", stroke: HM });
        el(g, "rect", { x: x + 12, y: y + 14, width: 22, height: 4, rx: 2, fill: SKY });
        const words = role.split(" ");
        text(g, x + 12, y + 38, words.slice(0, 2).join(" "), { "font-weight": 500 });
        if (words.length > 2) text(g, x + 12, y + 53, words.slice(2).join(" "), { "font-weight": 500 });
        text(g, x + 12, y + 78, audience, { "font-size": 11, fill: MUTED });
        el(g, "rect", { x: x + 12, y: y + 90, width: 100, height: 4, rx: 2, fill: TINT });
        el(g, "rect", { x: x + 12, y: y + 100, width: 76, height: 4, rx: 2, fill: TINT });
        el(g, "line", { x1: x + 12, y1: y + 118, x2: x + 120, y2: y + 118, stroke: TINT, "stroke-width": 0.5 });
        text(g, x + 12, y + 137, budget, { "font-size": 15, "font-weight": 500 });
        g.style.transformBox = "fill-box";
        g.style.transformOrigin = "center";
        ctx.animate(
          g,
          [
            { opacity: 0, transform: "translateY(18px) rotate(-3deg)" },
            { opacity: 1, transform: "none" },
          ],
          { duration: 650, delay: 900 + i * 450, easing: "cubic-bezier(.3,1.4,.5,1)" },
        );
      });
    },
  },
];

export function StrategyExplainer() {
  return <Explainer scenes={SCENES} />;
}
