"use client";

import { drawIn, el, Explainer, HM, MUTED, popIn, SKY, text, TINT, typeInto, WASH, type Ctx, type Scene } from "./explainer";

/**
 * What Halliard does while it reads a brief: reads what was written and
 * attached, sorts it into the four parts, checks the budget and timing, and
 * writes it back. Illustrative: every name and number is made up.
 */

const PARTS = ["Objective", "Audience", "Budget and timing", "What you know"];

/** A page of grey lines, returned with its lines so a scene can pick them out. */
function page(ctx: Ctx, x: number, y: number, w: number, h: number, lines: number) {
  const g = el(ctx.svg, "g", {});
  el(g, "rect", { x, y, width: w, height: h, rx: 6, fill: "#fff", stroke: HM });
  const rows = Array.from({ length: lines }, (_, i) =>
    el(g, "rect", { x: x + 12, y: y + 16 + i * 13, width: i % 4 === 3 ? (w - 24) * 0.6 : w - 24, height: 4, rx: 2, fill: TINT }),
  );
  return { g, rows };
}

/** The four parts as tinted boxes, two by two, the way the Brief tab shows them. */
function slots(ctx: Ctx, x: number, delay: number) {
  return PARTS.map((label, i) => {
    const sx = x + (i % 2) * 168;
    const sy = 22 + Math.floor(i / 2) * 100;
    const g = el(ctx.svg, "g", {});
    el(g, "rect", { x: sx, y: sy, width: 156, height: 88, rx: 10, fill: WASH });
    text(g, sx + 12, sy + 20, label.toUpperCase(), { "font-size": 10, "font-weight": 600, "letter-spacing": 0.6 });
    popIn(ctx, g, delay + i * 80);
    return { x: sx, y: sy };
  });
}

const SCENES: Scene[] = [
  {
    label: "Read",
    caption: "Reading everything you wrote, and every document you attached",
    run(ctx) {
      const { svg } = ctx;
      const answers = page(ctx, 50, 24, 130, 180, 12);
      const scan = el(svg, "rect", { x: 52, y: 30, width: 126, height: 12, fill: SKY, opacity: 0.15 });
      ctx.animate(scan, [{ transform: "translateY(0)" }, { transform: "translateY(160px)" }], {
        duration: 1800,
        iterations: 2,
        direction: "alternate",
        easing: "ease-in-out",
      });
      popIn(ctx, answers.g, 0);

      const file = el(svg, "g", {});
      el(file, "path", { d: "M250 70 h40 l14 14 v56 h-54 Z", fill: "#fff", stroke: HM });
      el(file, "path", { d: "M290 70 v14 h14", fill: "none", stroke: HM });
      text(file, 262, 122, "PDF", { "font-size": 11, "font-weight": 600 });
      popIn(ctx, file, 300);

      [0, 1, 2].forEach((k) => {
        const p = page(ctx, 360 + k * 82, 40, 70, 96, 6);
        p.g.style.transformBox = "fill-box";
        p.g.style.transformOrigin = "center";
        ctx.animate(
          p.g,
          [
            { opacity: 0, transform: `translate(${-110 - k * 82}px, 10px) scale(.4)` },
            { opacity: 1, transform: "none" },
          ],
          { duration: 600, delay: 800 + k * 350 },
        );
        const sweep = el(svg, "rect", { x: 361 + k * 82, y: 44, width: 68, height: 10, fill: SKY, opacity: 0 });
        ctx.animate(
          sweep,
          [
            { opacity: 0.18, transform: "translateY(0)" },
            { opacity: 0.18, transform: "translateY(78px)" },
            { opacity: 0, transform: "translateY(78px)" },
          ],
          { duration: 900, delay: 1900 + k * 500 },
        );
      });
      const tally = text(svg, 360, 170, "", { "font-size": 22, "font-weight": 500 });
      text(svg, 360, 188, "words read", { "font-size": 11, fill: MUTED });
      for (let i = 0; i <= 24; i++) {
        ctx.later(() => {
          tally.textContent = Math.round(1180 * (i / 24)).toLocaleString();
        }, 1200 + i * 110);
      }
    },
  },
  {
    label: "Sort",
    caption: "Sorting what you said into the audience, budget and timing, and what you know",
    run(ctx) {
      const { svg } = ctx;
      const doc = page(ctx, 40, 24, 150, 182, 13);
      const boxes = slots(ctx, 270, 100);
      const picks = [1, 5, 8, 11];
      picks.forEach((row, i) => {
        const line = doc.rows[row];
        const box = boxes[i];
        if (!line || !box) return;
        const delay = 700 + i * 650;
        ctx.animate(line, [{ fill: TINT }, { fill: SKY }], { duration: 250, delay, fill: "forwards" });
        const y = 24 + 16 + row * 13;
        const chip = el(svg, "rect", { x: 52, y, width: 126, height: 4, rx: 2, fill: SKY });
        chip.style.transformBox = "fill-box";
        chip.style.transformOrigin = "left";
        ctx.animate(
          chip,
          [
            { opacity: 1, transform: "translate(0, 0) scaleX(1)" },
            { opacity: 1, transform: `translate(${box.x + 12 - 52}px, ${box.y + 34 - y}px) scaleX(1.05)` },
          ],
          { duration: 600, delay: delay + 250, easing: "cubic-bezier(.5,0,.2,1)" },
        );
        [0, 1].forEach((n) => {
          const fill = el(svg, "rect", { x: box.x + 12, y: box.y + 46 + n * 12, width: n ? 80 : 120, height: 4, rx: 2, fill: TINT });
          popIn(ctx, fill, delay + 850 + n * 120);
        });
      });
    },
  },
  {
    label: "Check",
    caption: "Checking the budget and the dates hang together",
    run(ctx) {
      const { svg } = ctx;
      const left = 60;
      const step = 44;
      const axis = 150;
      el(svg, "line", { x1: left, y1: axis, x2: left + step * 12, y2: axis, stroke: TINT });
      "JFMAMJJASOND".split("").forEach((m, i) => {
        text(svg, left + i * step + step / 2, axis + 18, m, { "font-size": 11, fill: MUTED, "text-anchor": "middle" });
      });

      const flight = el(svg, "rect", { x: left + step * 2, y: axis - 16, width: step * 4, height: 10, rx: 5, fill: SKY });
      flight.style.transformBox = "fill-box";
      flight.style.transformOrigin = "left";
      ctx.animate(flight, [{ transform: "scaleX(0)" }, { transform: "scaleX(1)" }], { duration: 900, delay: 300 });
      text(svg, left + step * 2, axis + 38, "March to June", { "font-size": 11, fill: MUTED });

      const pin = el(svg, "g", {});
      const px = left + step * 3.5;
      el(pin, "line", { x1: px, y1: 34, x2: px, y2: axis - 16, stroke: HM, "stroke-dasharray": "3 3" });
      el(pin, "circle", { cx: px, cy: 30, r: 5, fill: HM });
      text(pin, px + 10, 34, "Launch, 15 April", { "font-weight": 500 });
      popIn(ctx, pin, 1300);

      const months = ["$25k", "$40k", "$35k", "$20k"];
      months.forEach((amount, i) => {
        const x = left + step * (2 + i) + 4;
        const h = Number(amount.slice(1, -1)) * 1.1;
        const bar = el(svg, "rect", { x, y: axis - 22 - h, width: step - 8, height: h, rx: 4, fill: WASH, stroke: TINT });
        bar.style.transformBox = "fill-box";
        bar.style.transformOrigin = "bottom";
        ctx.animate(bar, [{ transform: "scaleY(0)" }, { transform: "scaleY(1)" }], { duration: 500, delay: 1800 + i * 200 });
        popIn(ctx, text(svg, x + (step - 8) / 2, axis - 28 - h, amount, { "font-size": 11, "text-anchor": "middle" }), 2100 + i * 200);
      });

      const total = el(svg, "g", {});
      el(total, "rect", { x: 420, y: 30, width: 170, height: 52, rx: 10, fill: "#fff", stroke: HM });
      text(total, 434, 52, "$120k", { "font-size": 18, "font-weight": 500 });
      text(total, 434, 70, "adds up across four months", { "font-size": 11, fill: MUTED });
      const tick = el(total, "g", {});
      el(tick, "circle", { cx: 572, cy: 48, r: 9, fill: SKY });
      el(tick, "path", { d: "M567 48 l3.5 3.5 l6 -7", fill: "none", stroke: "#fff", "stroke-width": 1.8 });
      popIn(ctx, total, 3000);
      popIn(ctx, tick, 3400);
    },
  },
  {
    label: "Write back",
    caption: "Writing it back in plain words, so you can check it's what you meant",
    run(ctx) {
      const lines = [
        "Launch the new boat line",
        "Anglers 35 to 54, Northwest",
        "$120k, March to June",
        "Search peaks before May",
      ];
      const boxes = slots(ctx, 136, 0);
      boxes.forEach((box, i) => {
        const line = lines[i] ?? "";
        typeInto(ctx, text(ctx.svg, box.x + 12, box.y + 50, "", { "font-size": 11 }), line, 500 + i * 900);
        const under = el(ctx.svg, "path", { d: `M${box.x + 12} ${box.y + 68} h90`, stroke: TINT, "stroke-width": 4, "stroke-linecap": "round" });
        drawIn(ctx, under, 400, 500 + i * 900 + line.length * 45);
      });
    },
  },
];

export function BriefExplainer() {
  return <Explainer scenes={SCENES} />;
}
