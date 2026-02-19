"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

// ============================================================
// DEMO 7: Spring vs Tween Comparison
//
// VOCABULARY:
//   spring     — physics-based: overshoots and settles. Defined by stiffness/damping/mass or visualDuration/bounce
//   tween      — time-based: follows an easing curve over exact duration. Predictable, mechanical
//   easing     — the acceleration curve of a tween. ease-in (slow start), ease-out (slow end), ease-in-out, linear
//   cubic-bezier — custom easing curve defined by 4 control points. Lets you craft precise timing feels
//   duration   — exact time in seconds for a tween. Springs don't have fixed duration — they settle naturally
//
// THE KEY INSIGHT:
//   Springs feel alive because they respond to velocity and overshoot.
//   Tweens feel controlled because they follow a fixed curve.
//   Use springs for movement/scale. Use tweens for opacity/color.
// ============================================================

function AnimatedBar({
  label,
  sublabel,
  transition,
}: {
  label: string;
  sublabel: string;
  transition: object;
}) {
  const [toggled, setToggled] = useState(false);

  return (
    <div className="space-y-2">
      <div
        className="relative h-10 w-72 cursor-pointer rounded-xl bg-neutral-200 overflow-hidden"
        onClick={() => setToggled(!toggled)}
      >
        <motion.div
          className="absolute inset-y-0 left-0 w-12 rounded-xl bg-white shadow-md"
          animate={{ x: toggled ? 240 : 0 }}
          transition={transition}
        />
      </div>
      <div className="flex justify-between">
        <p className="text-[11px] font-mono text-neutral-500">{label}</p>
        <p className="text-[10px] text-neutral-400">{sublabel}</p>
      </div>
    </div>
  );
}

function ScaleComparison() {
  const [toggled, setToggled] = useState(false);

  return (
    <div className="space-y-4">
      <button
        onClick={() => setToggled(!toggled)}
        className="rounded-lg bg-neutral-200 px-3 py-1.5 text-xs font-medium text-neutral-600 transition-colors hover:bg-neutral-300 cursor-pointer"
      >
        Toggle
      </button>
      <div className="flex gap-8">
        <div className="space-y-2 text-center">
          <motion.div
            className="h-24 w-24 rounded-xl bg-white shadow-md mx-auto"
            animate={{ scale: toggled ? 1.3 : 1 }}
            transition={{ type: "spring", visualDuration: 0.4, bounce: 0.25 }}
          />
          <p className="text-[11px] font-mono text-neutral-500">spring</p>
        </div>
        <div className="space-y-2 text-center">
          <motion.div
            className="h-24 w-24 rounded-xl bg-white shadow-md mx-auto"
            animate={{ scale: toggled ? 1.3 : 1 }}
            transition={{ type: "tween", duration: 0.4, ease: "easeInOut" }}
          />
          <p className="text-[11px] font-mono text-neutral-500">tween</p>
        </div>
        <div className="space-y-2 text-center">
          <motion.div
            className="h-24 w-24 rounded-xl bg-white shadow-md mx-auto"
            animate={{ scale: toggled ? 1.3 : 1 }}
            transition={{ type: "tween", duration: 0.4, ease: "linear" }}
          />
          <p className="text-[11px] font-mono text-neutral-500">linear</p>
        </div>
      </div>
    </div>
  );
}

export default function SpringVsTweenPage() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-16 px-6 py-16">
      <div className="max-w-lg">
        <Link href="/" className="text-xs text-neutral-400 hover:text-neutral-900 transition-colors">
          ← Back
        </Link>
        <h1 className="mt-2 text-2xl font-bold tracking-tight">
          05 — Spring vs Tween
        </h1>
        <p className="mt-1 text-sm text-neutral-500 max-w-md">
          Click the tracks to toggle. Springs overshoot and settle. Tweens
          follow a fixed curve. Feel the difference — springs feel alive, tweens feel controlled.
        </p>
      </div>

      {/* --- Slide comparison --- */}
      <section className="space-y-6">
        <h2 className="text-xs font-mono text-neutral-400 uppercase tracking-widest">
          Slide — click each track
        </h2>
        <div className="space-y-4">
          <AnimatedBar
            label="spring (bounce: 0.25)"
            sublabel="overshoots, settles"
            transition={{ type: "spring", visualDuration: 0.5, bounce: 0.25 }}
          />
          <AnimatedBar
            label="spring (bounce: 0)"
            sublabel="no overshoot, still springy accel"
            transition={{ type: "spring", visualDuration: 0.5, bounce: 0 }}
          />
          <AnimatedBar
            label="tween (ease-out)"
            sublabel="fast start, slow end"
            transition={{ type: "tween", duration: 0.5, ease: "easeOut" }}
          />
          <AnimatedBar
            label="tween (ease-in)"
            sublabel="slow start, fast end"
            transition={{ type: "tween", duration: 0.5, ease: "easeIn" }}
          />
          <AnimatedBar
            label="tween (ease-in-out)"
            sublabel="slow-fast-slow"
            transition={{ type: "tween", duration: 0.5, ease: "easeInOut" }}
          />
          <AnimatedBar
            label="tween (linear)"
            sublabel="constant speed — robotic"
            transition={{ type: "tween", duration: 0.5, ease: "linear" }}
          />
        </div>
      </section>

      {/* --- Scale comparison --- */}
      <section className="space-y-4">
        <h2 className="text-xs font-mono text-neutral-400 uppercase tracking-widest">
          Scale — spring vs tween vs linear
        </h2>
        <ScaleComparison />
      </section>
    </main>
  );
}
