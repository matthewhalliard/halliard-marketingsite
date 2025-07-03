import dynamic from "next/dynamic";

const FramerPage = dynamic(() => import("@/components/FramerPage"), { ssr: false });

export default function Principles() {
  return <FramerPage htmlPath="/principles.html" />;
}

(Principles as any).disableNavbar = true; 