import dynamic from "next/dynamic";

const FramerPage = dynamic(() => import("@/components/FramerPage"), { ssr: false });

export default function DownloadTemplate() {
  return <FramerPage htmlPath="/framer-pages/media-planning-templates-download.txt" />;
}

(DownloadTemplate as any).disableNavbar = true; 
(DownloadTemplate as any).hideFooter = true;
