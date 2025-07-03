import Head from "next/head";
import { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

interface Props {
  title?: string;
  description?: string;
  children: ReactNode;
  hideNavbar?: boolean;
  /** If true, skips the centered container and lets content span the full viewport width */
  fullWidth?: boolean;
}

export default function Layout({ title = "Halliard | Ultrafast Media Planning Tool", description = "The media planning tool for ambitious marketing teams", children, hideNavbar = false, fullWidth = false }: Props) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {!hideNavbar && <Navbar />}
      <main className={fullWidth ? "w-full" : "mx-auto max-w-7xl px-4"}>{children}</main>
      <Footer />
    </>
  );
} 