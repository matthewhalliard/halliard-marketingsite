import dynamic from "next/dynamic";

const FramerPage = dynamic(() => import("@/components/FramerPage"), { ssr: false });

export default function MediaPlanningTemplates() {
  return <FramerPage htmlPath="/media-planning-templates.html" />;
}

(MediaPlanningTemplates as any).disableNavbar = true; 