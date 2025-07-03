import "@/polyfills/find";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Inter } from "next/font/google";
import Layout from "@/components/Layout";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export default function App({ Component, pageProps }: AppProps) {
  // Pages can set `Component.disableNavbar = true` to hide the React navbar
  const hideNav = (Component as any).disableNavbar ?? false;
  const fullWidth = (Component as any).fullWidth ?? false;

  return (
    <main className={inter.variable + " font-sans"}>
      <Layout hideNavbar={hideNav} fullWidth={fullWidth}>
        <Component {...pageProps} />
      </Layout>
    </main>
  );
}
