import Head from "next/head";
import { ReactNode } from "react";
import SiteHeader from "./SiteHeader";
import Footer from "./Footer";
import Script from "next/script";

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
        {/* The link preview every page shares. Video where the app plays it
            (iMessage, Slack, Discord, X), the still elsewhere (LinkedIn, email).
            Absolute URLs: crawlers ignore relative ones. A page that wants its
            own preview sets the same tags with the same keys. */}
        <meta key="og:video" property="og:video" content="https://www.halliardmedia.com/og/homepage.mp4" />
        <meta key="og:video:secure_url" property="og:video:secure_url" content="https://www.halliardmedia.com/og/homepage.mp4" />
        <meta key="og:video:type" property="og:video:type" content="video/mp4" />
        <meta key="og:video:width" property="og:video:width" content="1200" />
        <meta key="og:video:height" property="og:video:height" content="630" />
        <meta key="og:image" property="og:image" content="https://www.halliardmedia.com/og/homepage-poster.jpg" />
        <meta key="og:image:width" property="og:image:width" content="1200" />
        <meta key="og:image:height" property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://www.halliardmedia.com/og/homepage-poster.jpg" />
      </Head>
      {/* Analytics & Support Scripts */}
      {/* Google Tag (gtag.js) */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=AW-672346912"
        strategy="lazyOnload"
      />
      <Script id="gtag-init" strategy="lazyOnload">
        {`window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'AW-672346912');`}
      </Script>

      {/* Intercom widget */}
      <Script id="intercom-init" strategy="lazyOnload">
        {`window.intercomSettings={api_base:"https://api-iam.intercom.io",app_id:"wn7lt9pz"};(function(){var w=window;var ic=w.Intercom;if(typeof ic==="function"){ic('reattach_activator');ic('update',w.intercomSettings);}else{var d=document;var i=function(){i.c(arguments);};i.q=[];i.c=function(args){i.q.push(args);};w.Intercom=i;var l=function(){var s=d.createElement('script');s.type='text/javascript';s.async=true;s.src='https://widget.intercom.io/widget/wn7lt9pz';var x=d.getElementsByTagName('script')[0];x.parentNode.insertBefore(s,x);};if(document.readyState==='complete'){l();}else if(w.attachEvent){w.attachEvent('onload',l);}else{w.addEventListener('load',l,false);}}})();`}
      </Script>

      {/* Apollo.io tracker */}
      <Script id="apollo-tracker" strategy="lazyOnload">
        {`(function initApollo(){var n=Math.random().toString(36).substring(7),o=document.createElement('script');o.src='https://assets.apollo.io/micro/website-tracker/tracker.iife.js?nocache='+n;o.async=true;o.defer=true;o.onload=function(){window.trackingFunctions&&window.trackingFunctions.onLoad({appId:'6633937fe44c720438f9de6f'})};document.head.appendChild(o);})();`}
      </Script>

      {/* Clearbit tag */}
      <Script
        src="https://tag.clearbitscripts.com/v1/pk_b621e607f5fe8c8cea98c5299b50b224/tags.js"
        strategy="lazyOnload"
        referrerPolicy="strict-origin-when-cross-origin"
      />

      {!hideNavbar && <SiteHeader />}
      <main className={fullWidth ? "w-full" : "mx-auto max-w-7xl px-4"}>{children}</main>
      <Footer />
    </>
  );
} 