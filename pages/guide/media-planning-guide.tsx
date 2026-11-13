import dynamic from "next/dynamic";

const FramerPage = dynamic(() => import("@/components/FramerPage"), { ssr: false });

export default function MediaPlanningGuide() {
  return <FramerPage htmlPath="/framer-pages/guide-media-planning-guide.txt" />;
}

(MediaPlanningGuide as any).disableNavbar = true; 
(MediaPlanningGuide as any).hideFooter = true;
