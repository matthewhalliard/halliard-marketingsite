"use client";

import { drawIn, el, Explainer, HM, MUTED, pill, popIn, SKY, text, TINT, WASH, type Scene } from "./explainer";

/**
 * How a campaign comes to be, for the Campaigns page before there are any:
 * brief, plan, confirmation, then live. Illustrative: every name and number is
 * made up, and none of it is read from the account.
 */

const SCENES: Scene[] = [
  {
    label: "Brief",
    caption: "You describe the campaign or drop in an RFP, and Halliard reads it",
    run(ctx) {
      const { svg } = ctx;
      el(svg, "rect", { x: 90, y: 20, width: 150, height: 190, rx: 8, fill: "#fff", stroke: HM });
      for (let i = 0; i < 11; i++) {
        el(svg, "rect", { x: 106, y: 40 + i * 15, width: i % 4 === 3 ? 70 : 118, height: 5, rx: 2.5, fill: TINT });
      }
      const scan = el(svg, "rect", { x: 92, y: 30, width: 146, height: 14, fill: SKY, opacity: 0.15 });
      ctx.animate(scan, [{ transform: "translateY(0)" }, { transform: "translateY(165px)" }], {
        duration: 2400,
        iterations: 2,
        direction: "alternate",
        easing: "ease-in-out",
      });
      const facts: [number, string, number][] = [
        [1, "Summer launch", 300],
        [3, "$25k, eight weeks", 950],
        [6, "Adults 21 to 34", 1600],
        [9, "Austin", 2250],
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
    label: "Plan",
    caption: "It drafts a media plan and models the reach before any money is spent",
    run(ctx) {
      const { svg } = ctx;
      const channels: [string, number, string][] = [
        ["Connected TV", 210, "$11k"],
        ["Social", 150, "$8k"],
        ["Streaming audio", 90, "$4k"],
        ["Search", 50, "$2k"],
      ];
      channels.forEach(([name, width, spend], i) => {
        const y = 40 + i * 42;
        text(svg, 60, y + 14, name, { "font-size": 12, fill: MUTED });
        el(svg, "rect", { x: 180, y, width: 240, height: 20, rx: 6, fill: WASH });
        const bar = el(svg, "rect", { x: 180, y, width, height: 20, rx: 6, fill: i === 0 ? HM : SKY });
        bar.style.transformBox = "fill-box";
        bar.style.transformOrigin = "left center";
        ctx.animate(bar, [{ transform: "scaleX(0)" }, { transform: "scaleX(1)" }], {
          duration: 700,
          delay: 200 + i * 220,
        });
        const label = text(svg, 190 + width, y + 14, spend, { "font-size": 12, "font-weight": 500 });
        popIn(ctx, label, 650 + i * 220);
      });

      const card = el(svg, "g", {});
      el(card, "rect", { x: 460, y: 50, width: 140, height: 120, rx: 10, fill: "#fff", stroke: HM });
      text(card, 476, 76, "Reach", { "font-size": 11, fill: MUTED });
      const reach = text(card, 476, 104, "0%", { "font-size": 26, "font-weight": 500 });
      text(card, 476, 130, "Frequency", { "font-size": 11, fill: MUTED });
      text(card, 476, 152, "4.1 a week", { "font-size": 15, "font-weight": 500 });
      popIn(ctx, card, 1300);
      for (let n = 0; n <= 58; n += 2) {
        ctx.later(() => (reach.textContent = `${n}%`), 1500 + n * 22);
      }
    },
  },
  {
    label: "Confirm",
    caption: "You check the plan and confirm it. Nothing is bought until you do",
    run(ctx) {
      const { svg } = ctx;
      const card = el(svg, "g", {});
      el(card, "rect", { x: 170, y: 24, width: 300, height: 182, rx: 12, fill: "#fff", stroke: HM });
      text(card, 192, 54, "Summer launch, Austin", { "font-size": 14, "font-weight": 500 });
      text(card, 192, 74, "$25k · 58% reach · four channels", { "font-size": 11, fill: MUTED });
      for (let i = 0; i < 3; i++) {
        el(card, "rect", { x: 192, y: 92 + i * 16, width: i === 2 ? 150 : 250, height: 6, rx: 3, fill: TINT });
      }
      popIn(ctx, card, 0);

      const button = el(svg, "g", {});
      const face = el(button, "rect", { x: 192, y: 154, width: 132, height: 34, rx: 17, fill: HM });
      const label = text(button, 222, 176, "Confirm plan", { "font-size": 13, fill: "#fff", "font-weight": 500 });
      popIn(ctx, button, 500);

      const cursor = el(svg, "path", {
        d: "M0 0 L0 16 L4.5 12 L8 19 L10.5 18 L7 11 L13 11 Z",
        fill: "#fff",
        stroke: HM,
        "stroke-width": 1.2,
      });
      ctx.animate(
        cursor,
        [
          { transform: "translate(520px, 210px)", opacity: 0 },
          { transform: "translate(520px, 210px)", opacity: 1, offset: 0.2 },
          { transform: "translate(290px, 172px)", opacity: 1 },
        ],
        { duration: 1300, delay: 900 },
      );
      ctx.animate(face, [{ transform: "scale(1)" }, { transform: "scale(.94)" }, { transform: "scale(1)" }], {
        duration: 260,
        delay: 2250,
      });
      ctx.later(() => {
        face.setAttribute("fill", SKY);
        label.textContent = "Confirmed";
        label.setAttribute("x", "230");
      }, 2350);
      const tick = el(svg, "path", {
        d: "M432 52 l8 8 l16 -18",
        fill: "none",
        stroke: SKY,
        "stroke-width": 3,
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
      });
      drawIn(ctx, tick, 400, 2500);
    },
  },
  {
    label: "Live",
    caption: "Halliard buys it and keeps it pacing, and every result lands in your portal",
    run(ctx) {
      const { svg } = ctx;
      el(svg, "rect", { x: 40, y: 20, width: 560, height: 190, rx: 12, fill: "#fff", stroke: HM });
      text(svg, 62, 48, "Summer launch, Austin", { "font-size": 13, "font-weight": 500 });
      const live = el(svg, "g", {});
      el(live, "rect", { x: 226, y: 34, width: 44, height: 20, rx: 10, fill: WASH, stroke: TINT });
      text(live, 236, 48, "Live", { "font-size": 11 });
      popIn(ctx, live, 200);

      el(svg, "line", { x1: 62, y1: 180, x2: 420, y2: 180, stroke: TINT });
      const planned = el(svg, "path", {
        d: "M62 180 L420 70",
        fill: "none",
        stroke: SKY,
        opacity: 0.45,
        "stroke-width": 1.5,
        "stroke-dasharray": "4 4",
      });
      ctx.animate(planned, [{ opacity: 0 }, { opacity: 0.45 }], { duration: 400, delay: 300 });
      const spend = el(svg, "path", {
        d: "M62 180 C 110 168, 150 150, 200 138 S 300 110, 330 98",
        fill: "none",
        stroke: HM,
        "stroke-width": 2.5,
        "stroke-linecap": "round",
      });
      drawIn(ctx, spend, 2200, 500);
      text(svg, 62, 198, "Spend against plan", { "font-size": 11, fill: MUTED });

      const stats: [string, string][] = [
        ["Spent", "$11.2k"],
        ["Reach so far", "41%"],
        ["Pacing", "On plan"],
      ];
      stats.forEach(([label, value], i) => {
        const g = el(svg, "g", {});
        text(g, 458, 84 + i * 42, label, { "font-size": 11, fill: MUTED });
        text(g, 458, 102 + i * 42, value, { "font-size": 15, "font-weight": 500 });
        popIn(ctx, g, 1200 + i * 350);
      });
    },
  },
];

export function CampaignsExplainer() {
  return <Explainer scenes={SCENES} />;
}
