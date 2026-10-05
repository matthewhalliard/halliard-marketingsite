"use client";

import { drawIn, el, Explainer, HM, MUTED, pill, popIn, SKY, text, TINT, typeInto, WASH, type Scene } from "./explainer";

/**
 * What Halliard does while it drafts audiences: reads who the brief wants to
 * reach, puts it in the survey panel's terms, sizes it, and writes each
 * audience. Illustrative: every name and number is made up.
 */

/** A fixed scatter in [0, 1), so the same dots drop out every time. */
function scatter(i: number) {
  const x = Math.sin(i * 12.9898 + 78.233) * 43758.5453;
  return x - Math.floor(x);
}

const SCENES: Scene[] = [
  {
    label: "Who",
    caption: "Reading who you want to reach, in your words",
    run(ctx) {
      const { svg } = ctx;
      el(svg, "rect", { x: 40, y: 20, width: 560, height: 46, rx: 10, fill: "#fff", stroke: HM });
      const quote = text(svg, 60, 48, "", { "font-size": 15 });
      const words = "Anglers 35 to 54 in the Pacific Northwest who fish from a boat";
      typeInto(ctx, quote, words, 100);

      const phrases: [string, string, number][] = [
        ["Anglers", "Interest: fishing", 70],
        ["35 to 54", "Age: 35 to 54", 215],
        ["Pacific Northwest", "Region: OR, WA, ID", 360],
        ["fish from a boat", "Fishes from a boat", 505],
      ];
      const typed = 100 + words.length * 45;
      ctx.later(() => {
        phrases.forEach(([phrase, tag, tagX], i) => {
          const start = words.indexOf(phrase);
          const x = 60 + quote.getSubStringLength(0, start);
          const width = quote.getSubStringLength(start, phrase.length);
          const delay = i * 380;
          const mark = el(svg, "rect", { x, y: 54, width, height: 3, rx: 1.5, fill: SKY });
          mark.style.transformBox = "fill-box";
          mark.style.transformOrigin = "left";
          ctx.animate(mark, [{ transform: "scaleX(0)" }, { transform: "scaleX(1)" }], { duration: 350, delay });
          const thread = el(svg, "path", {
            d: `M${x + width / 2} 60 C ${x + width / 2} 110, ${tagX} 100, ${tagX} 140`,
            fill: "none",
            stroke: TINT,
          });
          drawIn(ctx, thread, 450, delay + 250);
          pill(ctx, tagX - (tag.length * 6.6 + 22) / 2, 142, tag, delay + 600);
        });
      }, typed);
    },
  },
  {
    label: "Panel terms",
    caption: "Matching each part to the questions the survey panel actually asked",
    run(ctx) {
      const { svg } = ctx;
      const rows: [string, string, string][] = [
        ["Age: 35 to 54", "Q3 Age", "35 to 44, 45 to 54"],
        ["Interest: fishing", "Q18 Hobbies", "Fishing"],
        ["Region: OR, WA, ID", "Region", "Oregon, Washington, Idaho"],
        ["Fishes from a boat", "Q22 Owns a boat", "Yes"],
      ];
      text(svg, 40, 22, "Your words", { "font-size": 11, fill: MUTED });
      text(svg, 330, 22, "The panel's questions", { "font-size": 11, fill: MUTED });
      rows.forEach(([tag, question, answer], i) => {
        const y = 34 + i * 48;
        const delay = 200 + i * 650;
        pill(ctx, 40, y + 6, tag, i * 150);
        const thread = el(svg, "path", {
          d: `M${40 + tag.length * 6.6 + 24} ${y + 18} C 280 ${y + 18}, 290 ${y + 18}, 328 ${y + 18}`,
          fill: "none",
          stroke: SKY,
        });
        drawIn(ctx, thread, 450, delay + 300);

        const row = el(svg, "g", {});
        el(row, "rect", { x: 330, y, width: 270, height: 36, rx: 8, fill: WASH });
        text(row, 344, y + 15, question, { "font-weight": 500 });
        text(row, 344, y + 29, answer, { "font-size": 11, fill: MUTED });
        popIn(ctx, row, delay + 600);

        const tick = el(svg, "g", {});
        el(tick, "circle", { cx: 582, cy: y + 18, r: 9, fill: SKY });
        el(tick, "path", { d: `M577 ${y + 18} l3.5 3.5 l6 -7`, fill: "none", stroke: "#fff", "stroke-width": 1.8 });
        popIn(ctx, tick, delay + 900);
      });
    },
  },
  {
    label: "Size",
    caption: "Counting how many people match, one filter at a time",
    run(ctx) {
      const { svg } = ctx;
      const cols = 24;
      const dots = Array.from({ length: cols * 9 }, (_, i) => {
        const dot = el(svg, "circle", { cx: 50 + (i % cols) * 14, cy: 40 + Math.floor(i / cols) * 18, r: 4.5, fill: TINT });
        popIn(ctx, dot, (i % cols) * 12 + Math.floor(i / cols) * 20);
        return { dot, r: scatter(i) };
      });

      const steps: [string, string, number][] = [
        ["Northwest adults", "11.2M", 1],
        ["Aged 35 to 54", "3.6M", 0.45],
        ["Fish", "610k", 0.2],
        ["From a boat", "240k", 0.09],
      ];
      const count = text(svg, 430, 54, "", { "font-size": 26, "font-weight": 500 });
      text(svg, 430, 72, "people in the audience", { "font-size": 11, fill: MUTED });
      steps.forEach(([label, size, keep], i) => {
        const delay = 500 + i * 900;
        const line = el(svg, "g", {});
        el(line, "circle", { cx: 436, cy: 100 + i * 26, r: 3, fill: i === steps.length - 1 ? SKY : HM });
        text(line, 446, 104 + i * 26, label);
        text(line, 600, 104 + i * 26, size, { "text-anchor": "end", fill: MUTED, "font-size": 11 });
        popIn(ctx, line, delay);
        ctx.later(() => {
          count.textContent = size;
        }, delay);
        dots.forEach(({ dot, r }) => {
          if (r >= keep) ctx.animate(dot, [{ opacity: 1 }, { opacity: 0.18 }], { duration: 500, delay, fill: "forwards" });
        });
      });
      dots
        .filter(({ r }) => r < 0.09)
        .forEach(({ dot }) => {
          ctx.animate(dot, [{ fill: TINT, r: 4.5 }, { fill: SKY, r: 6 }, { fill: SKY, r: 4.5 }], { duration: 600, delay: 3400, fill: "forwards" });
        });
    },
  },
  {
    label: "Audiences",
    caption: "Writing each audience: who they are, how many, and where",
    run(ctx) {
      const { svg } = ctx;
      const cards: [string, string, string, number][] = [
        ["Weekend boat anglers", "240k", "Oregon, Washington, Idaho", 7],
        ["Aspiring drift boaters", "180k", "Oregon, Washington", 5],
        ["Guides and outfitters", "12k", "Pacific Northwest", 2],
      ];
      cards.forEach(([name, size, where, people], i) => {
        const x = 40 + i * 192;
        const y = 24;
        const g = el(svg, "g", {});
        el(g, "rect", { x, y, width: 176, height: 180, rx: 10, fill: "#fff", stroke: HM });
        for (let p = 0; p < 8; p++) {
          el(g, "circle", { cx: x + 20 + p * 14, cy: y + 24, r: 5, fill: p < people ? SKY : TINT });
        }
        text(g, x + 14, y + 58, name, { "font-weight": 500 });
        text(g, x + 14, y + 92, size, { "font-size": 22, "font-weight": 500 });
        text(g, x + 14, y + 108, "people", { "font-size": 11, fill: MUTED });
        el(g, "line", { x1: x + 14, y1: y + 124, x2: x + 162, y2: y + 124, stroke: TINT, "stroke-width": 0.5 });
        text(g, x + 14, y + 144, where, { "font-size": 11, fill: MUTED });
        el(g, "rect", { x: x + 14, y: y + 156, width: 110, height: 4, rx: 2, fill: TINT });
        g.style.transformBox = "fill-box";
        g.style.transformOrigin = "center";
        ctx.animate(
          g,
          [
            { opacity: 0, transform: "translateY(18px) rotate(-3deg)" },
            { opacity: 1, transform: "none" },
          ],
          { duration: 650, delay: 300 + i * 500, easing: "cubic-bezier(.3,1.4,.5,1)" },
        );
      });
    },
  },
];

export function AudienceExplainer() {
  return <Explainer scenes={SCENES} />;
}
