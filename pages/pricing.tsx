/* eslint-disable @typescript-eslint/no-explicit-any */
import dynamic from "next/dynamic";

// Re-use the shared FramerPage loader so we don’t maintain two copies
const FramerPage = dynamic(() => import("@/components/FramerPage"), { ssr: false });

export default function Pricing() {
  return <FramerPage htmlPath="/pricing-framer.html" />;
}

(Pricing as any).disableNavbar = true;
(Pricing as any).fullWidth = true; 