"use client";

import Grainient from "./Grainient";

// Full-page animated background, swapped in for the old AuroraBackground.
// Same positioning contract (fixed, full viewport, behind everything,
// non-interactive) so it drops into every page with zero prop changes.
// Preset values below start from the reactbits.dev Background Studio config
// (color1 matches the brand's primary green), with three tweaks to remove a
// "split into quadrants" artifact: the shader's per-pixel rotation depends
// on tuv.x * tuv.y, which sits at ~0 along the screen's exact horizontal and
// vertical center lines when centerX/centerY are 0 — pinning a straight,
// unmoving blend edge right through the middle. Offsetting the center
// breaks that symmetry; a softer blendSoftness and a gentler rotationAmount
// keep the transition organic instead of a hard-edged block split.
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
        blendSoftness={0.22}
        rotationAmount={280}
        noiseScale={2}
        grainAmount={0.1}
        grainScale={2}
        grainAnimated={false}
        contrast={1.5}
        gamma={1}
        saturation={1}
        centerX={0.35}
        centerY={-0.22}
        zoom={0.9}
      />
    </div>
  );
}
