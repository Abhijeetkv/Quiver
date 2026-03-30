import React from "react";
import DottedGlowBackground from "@/components/ui/dotted-glow-background";

export function Background() {
  return (
    <div className="fixed inset-0 -z-10">
      <div className="absolute inset-0 " />

      <DottedGlowBackground
        className="pointer-events-none opacity-40 dark:opacity-100"
        opacity={1}
        gap={10}
        radius={1.6}
        colorLightVar="--color-neutral-500"
        glowColorLightVar="--color-neutral-600"
        colorDarkVar="--color-neutral-400"
        glowColorDarkVar="--color-sky-800"
        backgroundOpacity={0}
        speedMin={0.3}
        speedMax={1.6}
        speedScale={1}
      />
    </div>
  );
}
