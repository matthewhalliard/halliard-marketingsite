import dynamic from "next/dynamic";

const FramerPage = dynamic(() => import("@/components/FramerPage"), { ssr: false });

export default function MediaPlanningGuide() {
  return <FramerPage htmlPath="/guide-media-planning-guide.html" />;
}

(MediaPlanningGuide as any).disableNavbar = true; 