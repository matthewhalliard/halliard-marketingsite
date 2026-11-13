import dynamic from "next/dynamic";

const FramerPage = dynamic(() => import("@/components/FramerPage"), { ssr: false });

export default function Principles() {
  return <FramerPage htmlPath="/framer-pages/principles.txt" />;
}

(Principles as any).disableNavbar = true; 
(Principles as any).hideFooter = true;
