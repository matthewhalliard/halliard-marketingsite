import dynamic from "next/dynamic";

// Lazy-load FramerPage to keep bundle lean
const FramerPage = dynamic(() => import("@/components/FramerPage"), {
  ssr: false,
});

export default function Home() {
  return <FramerPage htmlPath="/home-framer.html" />;
}

// Custom layout flags used by _app
(Home as any).disableNavbar = true;
(Home as any).fullWidth = true; 