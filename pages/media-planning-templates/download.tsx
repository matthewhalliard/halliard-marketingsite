import dynamic from "next/dynamic";

const FramerPage = dynamic(() => import("@/components/FramerPage"), { ssr: false });

export default function DownloadTemplate() {
  return <FramerPage htmlPath="/media-planning-templates-download.html" />;
}

(DownloadTemplate as any).disableNavbar = true; 