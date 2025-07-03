import dynamic from "next/dynamic";

// Load FramerPage lazily to keep initial bundle lean
const FramerPage = dynamic(() => import("@/components/FramerPage"), {
  ssr: false,
});

export default function Home() {
  return <FramerPage htmlPath="/home-framer.html" />;
}

(Home as any).disableNavbar = true;
(Home as any).fullWidth = true;
