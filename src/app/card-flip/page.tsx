"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

// ============================================================
// DEMO 5: Card Flip (3D)
//
// VOCABULARY:
//   rotateY / rotateX   — rotation around the Y or X axis (3D transform)
//   perspective          — how "deep" the 3D effect feels. Lower = more dramatic
//   backface-visibility  — whether the back of a rotated element is visible
//   transform-style      — "preserve-3d" lets children exist in 3D space
//
// THE PATTERN:
//   Two faces (front + back) stacked on top of each other.
//   Front starts at rotateY(0), back starts at rotateY(180).
//   On flip: front goes to 180, back goes to 0 (or 360).
//   backface-visibility: hidden ensures only the facing side shows.
// ============================================================

const spring = { type: "spring" as const, visualDuration: 0.5, bounce: 0.1 };

function FlipCard({ perspective, label, sublabel }: { perspective: number; label: string; sublabel: string }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div className="space-y-2 text-center">
      <div
        className="relative h-40 w-28 cursor-pointer"
        style={{ perspective }}
        onClick={() => setFlipped(!flipped)}
      >
        <motion.div
          className="absolute inset-0 rounded-xl bg-white shadow-lg"
          style={{ backfaceVisibility: "hidden" }}
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={spring}
        />
        <motion.div
          className="absolute inset-0 rounded-xl bg-neutral-800 shadow-lg"
          style={{ backfaceVisibility: "hidden" }}
          animate={{ rotateY: flipped ? 360 : 180 }}
          transition={spring}
        />
      </div>
      <p className="text-[11px] font-mono text-neutral-500">{label}</p>
      <p className="text-[10px] text-neutral-400">{sublabel}</p>
    </div>
  );
}

function AxisCard({ axis, label }: { axis: "Y" | "X"; label: string }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div className="space-y-2 text-center">
      <div
        className="relative h-40 w-28 cursor-pointer"
        style={{ perspective: 800 }}
        onClick={() => setFlipped(!flipped)}
      >
        <motion.div
          className="absolute inset-0 rounded-xl bg-white shadow-lg"
          style={{ backfaceVisibility: "hidden" }}
          animate={axis === "Y" ? { rotateY: flipped ? 180 : 0 } : { rotateX: flipped ? 180 : 0 }}
          transition={spring}
        />
        <motion.div
          className="absolute inset-0 rounded-xl bg-neutral-800 shadow-lg"
          style={{ backfaceVisibility: "hidden" }}
          animate={axis === "Y" ? { rotateY: flipped ? 360 : 180 } : { rotateX: flipped ? 360 : 180 }}
          transition={spring}
        />
      </div>
      <p className="text-[11px] font-mono text-neutral-500">rotate{axis}</p>
      <p className="text-[10px] text-neutral-400">{label}</p>
    </div>
  );
}

function TiltCard() {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  return (
    <div className="space-y-2 text-center">
      <div style={{ perspective: 600 }}>
        <motion.div
          className="h-40 w-28 rounded-xl bg-white shadow-lg cursor-pointer"
          animate={{ rotateX: tilt.x, rotateY: tilt.y }}
          transition={{ type: "spring", visualDuration: 0.2, bounce: 0.1 }}
          onMouseMove={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const x = (e.clientY - rect.top - rect.height / 2) / -2.5;
            const y = (e.clientX - rect.left - rect.width / 2) / 2.5;
            setTilt({ x, y });
          }}
          onMouseLeave={() => setTilt({ x: 0, y: 0 })}
        />
      </div>
      <p className="text-[11px] font-mono text-neutral-500">mouse tilt</p>
      <p className="text-[10px] text-neutral-400">rotateX + rotateY from cursor</p>
    </div>
  );
}

export default function CardFlipPage() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-16 px-6 py-16">
      <div className="max-w-lg">
        <Link href="/" className="text-xs text-neutral-400 hover:text-neutral-900 transition-colors">
          ← Back
        </Link>
        <h1 className="mt-2 text-2xl font-bold tracking-tight">
          04 — Card Flip (3D)
        </h1>
        <p className="mt-1 text-sm text-neutral-500 max-w-md">
          Click cards to flip them. 3D transforms create depth — perspective
          controls how dramatic the effect is, axis controls which way it turns.
        </p>
      </div>

      {/* --- ROW 1: Perspective comparison --- */}
      <section className="space-y-4">
        <h2 className="text-xs font-mono text-neutral-400 uppercase tracking-widest">
          Perspective depth
        </h2>
        <div className="flex gap-8">
          <FlipCard perspective={200} label="200px" sublabel="extreme, warped" />
          <FlipCard perspective={600} label="600px" sublabel="dramatic" />
          <FlipCard perspective={1200} label="1200px" sublabel="subtle" />
          <FlipCard perspective={3000} label="3000px" sublabel="almost flat" />
        </div>
      </section>

      {/* --- ROW 2: Axis comparison --- */}
      <section className="space-y-4">
        <h2 className="text-xs font-mono text-neutral-400 uppercase tracking-widest">
          Rotation axis
        </h2>
        <div className="flex gap-8">
          <AxisCard axis="Y" label="horizontal flip" />
          <AxisCard axis="X" label="vertical flip" />
          <TiltCard />
        </div>
      </section>
    </main>
  );
}
