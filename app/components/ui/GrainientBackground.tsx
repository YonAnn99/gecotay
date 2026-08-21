"use client";

import Grainient from "./Grainient";

// Full-page animated background, swapped in for the old AuroraBackground.
// Same positioning contract (fixed, full viewport, behind everything,
// non-interactive) so it drops into every page with zero prop changes.
// Preset values below are the ones tuned in reactbits.dev's Background
// Studio (color1 matches the brand's primary green).
export default function GrainientBackground() {
  return (
    <div className="fixed inset-0 w-full h-full -z-50 pointer-events-none">
      <Grainient
        color1="#AAC637"
        color2="#0e0e0e"
        color3="#080807"
        timeSpeed={0.65}
        colorBalance={0}
        warpStrength={1}
        warpFrequency={5}
        warpSpeed={2}
        warpAmplitude={50}
        blendAngle={0}
        blendSoftness={0.05}
        rotationAmount={500}
        noiseScale={2}
        grainAmount={0.1}
        grainScale={2}
        grainAnimated={false}
        contrast={1.5}
        gamma={1}
        saturation={1}
        centerX={0}
        centerY={0}
        zoom={0.9}
      />
    </div>
  );
}
