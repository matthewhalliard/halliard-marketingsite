import "@/polyfills/find";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import { Inter, Lexend } from "next/font/google";
import Layout from "@/components/Layout";
import { trackPixel } from "@/lib/meta-pixel";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const lexend = Lexend({ subsets: ["latin"], variable: "--font-lexend" });

export default function App({ Component, pageProps }: AppProps) {
  // Pages can set `Component.disableNavbar = true` to hide the React navbar
  const hideNav = (Component as any).disableNavbar ?? false;
  const fullWidth = (Component as any).fullWidth ?? false;
  const siteBg = (Component as any).siteBg ?? false;

  // Global sign-up CTA click tracker. Any click on a link pointing at
  // app.halliardmedia.com/sign-up fires both InitiateCheckout (funnel
  // intent signal) and CompleteRegistration (optimization target for
  // Meta ads, since the actual app sign-up doesn't have the pixel yet).
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = (e.target as HTMLElement | null)?.closest('a[href]');
      if (!target) return;
      const href = (target as HTMLAnchorElement).href || '';
      if (href.includes('app.halliardmedia.com/sign-up')) {
        trackPixel('InitiateCheckout', {
          content_name: 'signup_click',
          source: 'marketing_site',
        });
        trackPixel('CompleteRegistration', {
          content_name: 'signup_click',
          source: 'marketing_site',
          status: 'click',
        });
        // Google Ads conversion on the same proxy. Without it a search click
        // that signs up records nothing, since the app carries no Google tag.
        // Uses the account's existing lead conversion action; swap the label
        // for a dedicated "Sign-up click" action once one exists.
        if (typeof (window as any).gtag === 'function') {
          (window as any).gtag('event', 'conversion', {
            send_to: 'AW-672346912/qEmHCJ6L_pgcEKDmzMAC',
            value: 50.0,
            currency: 'USD',
          });
        }
        // OpenAI Ads conversion event (signup CTA click — same proxy as Meta
        // CompleteRegistration above, since the app doesn't carry the pixel).
        if (typeof (window as any).oaiq === 'function') {
          (window as any).oaiq('measure', 'registration_completed', {
            type: 'customer_action',
            amount: 0,
            currency: 'USD',
          });
        }
      }
    };
    document.addEventListener('click', handler, { capture: true });
    return () => document.removeEventListener('click', handler, { capture: true });
  }, []);

  return (
    <main className={`${inter.variable} ${lexend.variable} font-sans ${siteBg ? 'bg-site' : ''}`}>
      <Layout hideNavbar={hideNav} fullWidth={fullWidth}>
        <Component {...pageProps} />
      </Layout>
    </main>
  );
}
