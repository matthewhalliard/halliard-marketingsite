import dynamic from "next/dynamic";

const FramerPage = dynamic(() => import("@/components/FramerPage"), { ssr: false });

export default function HowHalliardWorks() {
  return <FramerPage htmlPath="/how-halliard-works.html" />;
}

(HowHalliardWorks as any).disableNavbar = true; 