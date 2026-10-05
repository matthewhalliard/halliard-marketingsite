"use client";

import * as React from "react";
import { Pause, Play } from "lucide-react";

import clsx from "clsx";

/**
 * A looping explainer of what Halliard is doing while it works: a few scenes,
 * one after another, with clickable steps and a pause. Each page supplies its
 * own scenes. Plain SVG driven by the Web Animations API, no library.
 *
 * Scenes are illustrative. Ported from Halliard3's client portal explainers
 * (apps/web/components/client); keep the two in step when one changes.
 */

const NS = "http://www.w3.org/2000/svg";
const SCENE_MS = 5200;

// The portal's palette (globals.css). Orange is reserved for decisions, so it
// appears nowhere here.
export const HM = "#263285";
export const SKY = "#4f6fd8";
export const TINT = "#d3e4ff";
export const WASH = "#eef4ff";
export const MUTED = "#64748b";

export interface Ctx {
  svg: SVGSVGElement;
  animate: (el: Element, frames: Keyframe[], options: KeyframeAnimationOptions) => void;
  later: (fn: () => void, ms: number) => void;
  instant: boolean;
}

export interface Scene {
  label: string;
  caption: string;
  run: (ctx: Ctx) => void;
}

export function el<K extends keyof SVGElementTagNameMap>(
  parent: Element,
  tag: K,
  attrs: Record<string, string | number>,
): SVGElementTagNameMap[K] {
  const node = document.createElementNS(NS, tag);
  for (const [k, v] of Object.entries(attrs)) node.setAttribute(k, String(v));
  parent.appendChild(node);
  return node;
}

export function text(parent: Element, x: number, y: number, value: string, attrs: Record<string, string | number> = {}) {
  const t = el(parent, "text", { x, y, "font-size": 12, fill: HM, ...attrs });
  t.textContent = value;
  return t;
}

export function popIn(ctx: Ctx, node: SVGGraphicsElement, delay: number) {
  node.style.transformBox = "fill-box";
  node.style.transformOrigin = "center";
  ctx.animate(
    node,
    [
      { opacity: 0, transform: "translateY(8px) scale(.9)" },
      { opacity: 1, transform: "none" },
    ],
    { duration: 450, delay },
  );
}

export function drawIn(ctx: Ctx, path: SVGPathElement, duration: number, delay: number) {
  const length = path.getTotalLength();
  path.style.strokeDasharray = String(length);
  ctx.animate(path, [{ strokeDashoffset: length }, { strokeDashoffset: 0 }], { duration, delay });
}

export function pill(ctx: Ctx, x: number, y: number, label: string, delay: number) {
  const g = el(ctx.svg, "g", {});
  el(g, "rect", { x, y, width: label.length * 6.6 + 22, height: 24, rx: 12, fill: WASH, stroke: TINT });
  text(g, x + 11, y + 16, label);
  popIn(ctx, g, delay);
  return g;
}

export function typeInto(ctx: Ctx, node: SVGTextElement, value: string, delay: number, onStep?: () => void) {
  if (ctx.instant) {
    node.textContent = value;
    onStep?.();
    return;
  }
  for (let i = 0; i <= value.length; i++) {
    ctx.later(() => {
      node.textContent = value.slice(0, i);
      onStep?.();
    }, delay + i * 45);
  }
}

export function searchIcon(parent: Element, cx: number, cy: number, r: number) {
  el(parent, "circle", { cx, cy, r, fill: "none", stroke: HM, "stroke-width": 1.4 });
  el(parent, "line", { x1: cx + r * 0.7, y1: cy + r * 0.7, x2: cx + r * 1.5, y2: cy + r * 1.5, stroke: HM, "stroke-width": 1.4 });
}

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

function subscribeReducedMotion(onChange: () => void) {
  const query = window.matchMedia(REDUCED_MOTION);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

function prefersReducedMotion() {
  return window.matchMedia(REDUCED_MOTION).matches;
}

export function Explainer({ scenes }: { scenes: Scene[] }) {
  const svgRef = React.useRef<SVGSVGElement>(null);
  const [scene, setScene] = React.useState(0);
  const [paused, setPaused] = React.useState(false);
  const reduced = React.useSyncExternalStore(subscribeReducedMotion, prefersReducedMotion, () => false);
  const animations = React.useRef<Animation[]>([]);
  const current = scenes[scene] as Scene;

  // Draw the scene. With reduced motion, each scene is drawn finished -- every
  // animation at its end, every delayed step run at once -- and only changes
  // when a step is picked.
  React.useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    svg.replaceChildren();
    const timers: number[] = [];
    animations.current = [];
    const ctx: Ctx = {
      svg,
      instant: reduced,
      animate: (node, frames, options) => {
        const a = node.animate(frames, {
          fill: "both",
          easing: "cubic-bezier(.2,.8,.2,1)",
          ...options,
          ...(reduced ? { duration: 0, delay: 0, iterations: 1 } : {}),
        });
        animations.current.push(a);
      },
      later: (fn, ms) => {
        if (reduced) fn();
        else timers.push(window.setTimeout(fn, ms));
      },
    };
    current.run(ctx);
    return () => {
      timers.forEach((t) => window.clearTimeout(t));
      animations.current.forEach((a) => a.cancel());
      svg.replaceChildren();
    };
  }, [current, reduced]);

  // Pausing freezes the scene's animations; the step timer below stops too.
  React.useEffect(() => {
    animations.current.forEach((a) => (paused ? a.pause() : a.play()));
  }, [paused, scene]);

  return (
    <div>
      <svg
        ref={svgRef}
        viewBox="0 0 640 230"
        className="mx-auto block w-full max-w-[720px] [&_text]:font-sans"
        role="img"
        aria-label={`${current.label}: ${current.caption}`}
      />
      <p className="mx-auto mt-2 min-h-[22px] max-w-[56ch] text-sm text-slate-600" aria-live="polite">
        {current.caption}
      </p>
      <div className="mx-auto mt-4 flex max-w-[720px] items-start gap-1.5">
        {scenes.map((s, i) => (
          <button
            key={s.label}
            type="button"
            onClick={() => setScene(i)}
            className={clsx(
              "relative flex-1 border-t-2 pt-2 text-left text-[11px] transition-colors",
              i === scene ? "border-tint text-slate-900" : i < scene ? "border-tint text-slate-500" : "border-slate-200 text-slate-500",
            )}
          >
            {i === scene ? (
              <span
                key={`${scene}-${reduced}`}
                className="absolute -top-0.5 left-0 h-0.5 bg-primary"
                style={
                  reduced
                    ? { width: "100%" }
                    : {
                        animationName: "explainer-step",
                        animationDuration: `${SCENE_MS}ms`,
                        animationTimingFunction: "linear",
                        animationFillMode: "forwards",
                        animationPlayState: paused ? "paused" : "running",
                      }
                }
                onAnimationEnd={() => setScene((n) => (n + 1) % scenes.length)}
              />
            ) : null}
            {i + 1}. {s.label}
          </button>
        ))}
      </div>
      {reduced ? null : (
        <div className="mx-auto mt-3 flex max-w-[720px] justify-end">
          <button
            type="button"
            onClick={() => setPaused((p) => !p)}
            className="inline-flex items-center gap-1 rounded-lg px-2 py-1 text-xs text-slate-500 hover:bg-slate-100 hover:text-slate-700"
          >
            {paused ? <Play className="size-3" aria-hidden /> : <Pause className="size-3" aria-hidden />}
            {paused ? "Play" : "Pause"}
          </button>
        </div>
      )}
      <style>{`@keyframes explainer-step { from { width: 0 } to { width: 100% } }`}</style>
    </div>
  );
}
