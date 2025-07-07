import "@/polyfills/find";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Inter, Lexend } from "next/font/google";
import Layout from "@/components/Layout";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const lexend = Lexend({ subsets: ["latin"], variable: "--font-lexend" });

export default function App({ Component, pageProps }: AppProps) {
  // Pages can set `Component.disableNavbar = true` to hide the React navbar
  const hideNav = (Component as any).disableNavbar ?? false;
  const fullWidth = (Component as any).fullWidth ?? false;
  const siteBg = (Component as any).siteBg ?? false;

  return (
    <main className={`${inter.variable} ${lexend.variable} font-sans ${siteBg ? 'bg-site' : ''}`}>
      <Layout hideNavbar={hideNav} fullWidth={fullWidth}>
        <Component {...pageProps} />
      </Layout>
    </main>
  );
}
