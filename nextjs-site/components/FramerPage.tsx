import React, { useEffect, useState } from "react";
import Head from "next/head";

interface Props {
  htmlPath: string; // path inside /public
}

export default function FramerPage({ htmlPath }: Props) {
  const [html, setHtml] = useState<string | null>(null);
  const [style, setStyle] = useState<string | null>(null);
  const [headHtml, setHeadHtml] = useState<string | null>(null);

  useEffect(() => {
    fetch(htmlPath)
      .then((res) => res.text())
      .then((text) => {
        // Extract <head> content
        const headMatch = text.match(/<head[^>]*>([\s\S]*?)<\/head>/i);

        // Extract <style> from head for critical CSS
        const styleMatch = headMatch ? headMatch[1].match(/<style[\s\S]*?<\/style>/i) : null;
        if (styleMatch) setStyle(styleMatch[0]);

        // Collect title + meta/og tags (but skip Framer preload/link/script)
        if (headMatch) {
          const tempHead = new DOMParser().parseFromString(headMatch[1], "text/html");
          // Title
          const title = tempHead.querySelector("title");
          const metas = tempHead.querySelectorAll("meta[name='description'], meta[property^='og:']");
          const fragments: string[] = [];
          if (title) fragments.push(title.outerHTML);
          metas.forEach((m) => fragments.push(m.outerHTML));
          if (fragments.length) setHeadHtml(fragments.join("\n"));
        }

        // Grab body inner HTML & optional class attribute
        const match = text.match(/<body([^>]*)>([\s\S]*?)<\/body>/i);
        let bodyInner = text;
        let wrapperStart = "<div>";
        if (match) {
          const attrs = match[1] || "";
          const classMatch = attrs.match(/class=("|')(.*?)("|')/i);
          const classAttr = classMatch ? classMatch[2] : undefined;

          // Keep Framer body intact; removing nodes causes hydration mismatch inside Framer's React.
          // Strip timestamp-varying appear script blocks to stabilise markup
          bodyInner = match[2].replace(/<script[^>]*type="framer\/appear"[\s\S]*?<\/script>/gi, "");
          wrapperStart = classAttr ? `<div class="${classAttr}">` : "<div>";
        }
        setHtml(`${wrapperStart}${bodyInner}</div>`);

        // Inject any script tags (same logic as pricing)
        const parser = new DOMParser();
        const doc = parser.parseFromString(text, "text/html");

        // Polyfill Array.find if needed before Framer runtime executes
        if (!(Array.prototype as any).find) {
          // eslint-disable-next-line no-extend-native
          Object.defineProperty(Array.prototype, "find", {
            value: function (predicate: any, thisArg?: any) {
              if (this == null) throw new TypeError("Array.prototype.find called on null or undefined");
              if (typeof predicate !== "function") throw new TypeError("predicate must be a function");
              const list = Object(this);
              const length = list.length >>> 0;
              for (let i = 0; i < length; i++) {
                const value = list[i];
                if (predicate.call(thisArg, value, i, list)) return value;
              }
              return undefined;
            },
            configurable: true,
            writable: true,
          });
        }

        // Some browsers (e.g., Safari 13) do not expose NodeList.prototype.find even if Array.find exists.
        // Framer’s runtime calls `.find` directly on the result of querySelectorAll/children, which is a NodeList.
        // We shim this by delegating to Array.prototype.find so implementation stays spec-compliant.
        const installCollectionFind = (
          proto: any,
        ) => {
          if (!proto.find) {
            // eslint-disable-next-line no-extend-native
            Object.defineProperty(proto, "find", {
              value: function (predicate: any, thisArg?: any) {
                return Array.prototype.find.call(this, predicate, thisArg);
              },
              configurable: true,
              writable: true,
            });
          }
        };
        // Apply to both live HTMLCollections and static NodeLists
        installCollectionFind(NodeList.prototype);
        // Some older browsers use HTMLCollection for e.g. `children`
        // which also lacks find
        // TS may complain but browsers will ignore if not present
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        if (typeof HTMLCollection !== "undefined") installCollectionFind(HTMLCollection.prototype);

        // Shim JSON.parse so Framer runtime gracefully handles "undefined" or invalid JSON 
        // without us mutating the generated <script> tags (which would break hydration).
        const originalJSONParse = JSON.parse.bind(JSON);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (JSON as any).parse = function (arg: any, ...rest: any[]) {
          if (arg === undefined || arg === "undefined") return {};
          try {
            return originalJSONParse(arg, ...rest);
          } catch {
            return {};
          }
        };

        const deferredInline: string[] = [];
        doc.querySelectorAll("script").forEach((s) => {
          const scriptType = s.getAttribute("type");
          const src = s.getAttribute("src");
          const scriptId = s.getAttribute("id");
          if (src) {
            if (document.querySelector(`script[src='${src}']`)) return;
            const el = document.createElement("script");
            el.src = src;
            el.async = false;
            if (scriptType) el.type = scriptType;
            document.head.appendChild(el);
          } else {
            if (scriptType && scriptType.includes("ld+json")) return;
            const inlineCode = s.textContent;
            if (!inlineCode) return;

            // GA / PostHog snippets mutate globals – run them after Framer mount
            if (/(gtag\('\w+.*?|posthog\.init)/.test(inlineCode)) {
              deferredInline.push(inlineCode);
              return;
            }

            // ------------------------------------------------------------------
            // Prevent duplicate execution of the same inline script.
            // This happens, for instance, with PostHog’s bootstrap snippet which
            // monkey-patches Array.push each time it runs, causing infinite
            // recursion if executed twice during a client-side route change.
            // ------------------------------------------------------------------
            const globalObj = window as unknown as { __executedInlineScripts?: Set<string> };
            if (!globalObj.__executedInlineScripts) {
              globalObj.__executedInlineScripts = new Set<string>();
            }
            const key = inlineCode.trim();
            if (globalObj.__executedInlineScripts.has(key)) return;
            globalObj.__executedInlineScripts.add(key);
            // ------------------------------------------------------------------

            if (scriptType === "framer/appear") {
              const dataScript = document.createElement("script");
              dataScript.type = scriptType;
              if (scriptId) dataScript.id = scriptId;
              dataScript.textContent = inlineCode;
              document.head.appendChild(dataScript);
              return;
            }

            const inlineScript = document.createElement("script");
            if (scriptType) inlineScript.type = scriptType;
            if (scriptId) inlineScript.id = scriptId;
            inlineScript.textContent = inlineCode;
            document.body.appendChild(inlineScript);
          }
        });

        // After React commits HTML to DOM, trigger framer:init and run deferred scripts
        setTimeout(() => {
          window.dispatchEvent(new Event("framer:init"));
          if (deferredInline.length) {
            deferredInline.forEach((code) => {
              const s = document.createElement("script");
              s.textContent = code;
              document.body.appendChild(s);
            });
          }
        }, 0);

        // Helpers for Framer appear
        interface FramerGlobals {
          [key: string]: { text: string } | undefined;
        }

        const setFramerData = (id: string, prop: string) => {
          const el = document.getElementById(id) as HTMLScriptElement | null;
          const globalObj = window as unknown as FramerGlobals;
          if (el && !globalObj[prop]) {
            globalObj[prop] = { text: el.textContent ?? "" };
          }
        };
        setFramerData("__framer__appearAnimationsContent", "__framer__appearAnimationsContent");
        setFramerData("__framer__breakpoints", "__framer__breakpoints");

        // Ensure Framer doesn’t attempt a fragile hydration – force a fresh client render.
        const patchReactHydrate = () => {
          // Runtime React (bundled with Framer) attaches to window.ReactDOM
          // *after* its scripts execute, but Next’s copy is already here, so we
          // patch both if present and again once Framer loads.
          const apply = (RD: any) => {
            if (!RD || !RD.createRoot) return;
            RD.hydrate = (...args: any[]) => {
              const container = args[1];
              const root = RD.createRoot(container);
              root.render(args[0]);
            };
          };
          // Patch current ReactDOM (from Next)
          // eslint-disable-next-line @typescript-eslint/no-var-requires
          try {
            // In React 18+ createRoot is exported from react-dom/client
            // but Next still attaches full ReactDOM to window for compat.
            // We require lazily to avoid adding to bundle if tree-shaken.
            // eslint-disable-next-line import/no-extraneous-dependencies
            apply(require("react-dom/client"));
          } catch {
            /* ignore */
          }
          // Also patch global once Framer’s bundle adds its ReactDOM
          const observer = new MutationObserver(() => {
            if ((window as any).ReactDOM && (window as any).ReactDOM.createRoot) {
              apply((window as any).ReactDOM);
              observer.disconnect();
            }
          });
          observer.observe(document.documentElement, { childList: true, subtree: true });
        };
        patchReactHydrate();

        // removed DOM mutations that changed Framer's script tags to preserve hydration integrity
      })
      .catch((err) => console.error("Failed to load Framer HTML", err));
  }, [htmlPath]);

  const Placeholder = (
    <div
      data-framer-page
      suppressHydrationWarning
      className="overflow-x-hidden"
    />
  );

  if (typeof window === "undefined") {
    // Server-side: return placeholder only so markup matches client shell
    return Placeholder;
  }

  if (!html) {
    // First client render (before fetch completes)
    return Placeholder;
  }

  return (
    <>
      {(style || headHtml) && (
        <Head>
          {style && (
            <style dangerouslySetInnerHTML={{ __html: style.replace(/<style[^>]*>|<\/style>/g, "") }} />
          )}
          {headHtml && (
            // eslint-disable-next-line react/no-danger
            <div dangerouslySetInnerHTML={{ __html: headHtml }} />
          )}
        </Head>
      )}
      {/* eslint-disable-next-line react/no-danger */}
      <div
        data-framer-page
        suppressHydrationWarning
        className="overflow-x-hidden"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </>
  );
} 