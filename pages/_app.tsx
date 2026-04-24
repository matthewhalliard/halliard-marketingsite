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
