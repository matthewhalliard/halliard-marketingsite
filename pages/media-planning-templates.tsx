import dynamic from "next/dynamic";

const FramerPage = dynamic(() => import("@/components/FramerPage"), { ssr: false });

export default function MediaPlanningTemplates() {
  return <FramerPage htmlPath="/framer-pages/media-planning-templates.txt" />;
}

(MediaPlanningTemplates as any).disableNavbar = true; 
(MediaPlanningTemplates as any).hideFooter = true;
