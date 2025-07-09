import Head from "next/head";
import { ReactNode } from "react";
import Navbar from "./Navbar";
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

      {/* PostHog analytics */}
      <Script id="posthog-init" strategy="lazyOnload">
        {`!function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))} }(p=t.createElement("script")).type="text/javascript",p.crossOrigin="anonymous",p.async=!0,p.src=s.api_host.replace(".i.posthog.com","-assets.i.posthog.com")+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="init capture identify alias people.set people.set_once set_config register register_once reset get_distinct_id get_feature_flag on isFeatureEnabled reloadFeatureFlags".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);posthog.init('phc_rm24NXJh9Ln1hG99DNI3ecrkA2fbT2xK8UQfyPP0ELT',{api_host:'https://us.i.posthog.com',person_profiles:'identified_only'});`}
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

      {!hideNavbar && <Navbar />}
      <main className={fullWidth ? "w-full" : "mx-auto max-w-7xl px-4"}>{children}</main>
      <Footer />
    </>
  );
} 