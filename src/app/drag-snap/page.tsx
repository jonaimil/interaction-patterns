"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

// ============================================================
// DEMO 2: Drag and Snap Back
//
// VOCABULARY:
//   drag            — enables dragging. true = free, "x" = horizontal only, "y" = vertical only
//   dragConstraints — bounds the drag area. { top, right, bottom, left } in px, or a ref to a parent
//   dragElastic     — rubber-band effect beyond constraints. 0 = hard wall, 1 = full stretch
//   dragMomentum    — whether element keeps sliding after release (like a flick)
//   dragTransition  — spring config for the snap-back when released
//
// THE PATTERN:
//   Grab → Drag (within/beyond constraints) → Release → Snap back
//   The "feel" of a drag interaction is shaped by elasticity and snap-back spring.
// ============================================================

const snapSpring = { type: "spring" as const, visualDuration: 0.5, bounce: 0.25 };

export default function DragSnapPage() {
  const boundRef1 = useRef<HTMLDivElement>(null);
  const boundRef2 = useRef<HTMLDivElement>(null);
  const boundRef3 = useRef<HTMLDivElement>(null);
  const boundRef4 = useRef<HTMLDivElement>(null);

  return (
    <main className="flex min-h-screen flex-col items-center gap-16 px-6 py-16">
      <div className="max-w-lg">
        <Link href="/" className="text-xs text-neutral-400 hover:text-neutral-900 transition-colors">
          ← Back
        </Link>
        <h1 className="mt-2 text-2xl font-bold tracking-tight">
          02 — Drag and Snap Back
        </h1>
        <p className="mt-1 text-sm text-neutral-500 max-w-md">
          Grab and drag each card. Feel how axis lock, elasticity, and momentum
          change the interaction. Release to see the snap-back.
        </p>
      </div>

      {/* --- ROW 1: Drag axis --- */}
      <section className="space-y-4">
        <h2 className="text-xs font-mono text-neutral-400 uppercase tracking-widest">
          Drag axis
        </h2>
        <div className="flex gap-8">
          {/* X only */}
          <div className="space-y-2 text-center">
            <motion.div
              className="h-32 w-24 rounded-xl bg-white shadow-lg cursor-grab active:cursor-grabbing"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.5}
              dragTransition={{ bounceStiffness: 300, bounceDamping: 20 }}
            />
            <p className="text-[11px] font-mono text-neutral-500">drag: &quot;x&quot;</p>
            <p className="text-[10px] text-neutral-400">horizontal only</p>
          </div>

          {/* Y only */}
          <div className="space-y-2 text-center">
            <motion.div
              className="h-32 w-24 rounded-xl bg-white shadow-lg cursor-grab active:cursor-grabbing"
              drag="y"
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={0.5}
              dragTransition={{ bounceStiffness: 300, bounceDamping: 20 }}
            />
            <p className="text-[11px] font-mono text-neutral-500">drag: &quot;y&quot;</p>
            <p className="text-[10px] text-neutral-400">vertical only</p>
          </div>

          {/* Free */}
          <div className="space-y-2 text-center">
            <motion.div
              className="h-32 w-24 rounded-xl bg-white shadow-lg cursor-grab active:cursor-grabbing"
              drag
              dragConstraints={{ top: 0, bottom: 0, left: 0, right: 0 }}
              dragElastic={0.5}
              dragTransition={{ bounceStiffness: 300, bounceDamping: 20 }}
            />
            <p className="text-[11px] font-mono text-neutral-500">drag: true</p>
            <p className="text-[10px] text-neutral-400">free movement</p>
          </div>
        </div>
      </section>

      {/* --- ROW 2: Elasticity --- */}
      <section className="space-y-4">
        <h2 className="text-xs font-mono text-neutral-400 uppercase tracking-widest">
          dragElastic — rubber band feel
        </h2>
        <div className="flex gap-8">
          {[0, 0.2, 0.5, 1.0].map((elastic) => (
            <div key={elastic} className="space-y-2 text-center">
              <motion.div
                className="h-32 w-24 rounded-xl bg-white shadow-lg cursor-grab active:cursor-grabbing"
                drag
                dragConstraints={{ top: 0, bottom: 0, left: 0, right: 0 }}
                dragElastic={elastic}
                dragTransition={{ bounceStiffness: 300, bounceDamping: 20 }}
              />
              <p className="text-[11px] font-mono text-neutral-500">
                elastic: {elastic}
              </p>
              <p className="text-[10px] text-neutral-400">
                {elastic === 0 && "hard wall"}
                {elastic === 0.2 && "tight"}
                {elastic === 0.5 && "natural"}
                {elastic === 1.0 && "full stretch"}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* --- ROW 3: Bounded area (drag within a box) --- */}
      <section className="space-y-4">
        <h2 className="text-xs font-mono text-neutral-400 uppercase tracking-widest">
          dragConstraints — bounded area via ref
        </h2>
        <div className="flex gap-8">
          {/* Small box */}
          <div className="space-y-2 text-center">
            <div
              ref={boundRef1}
              className="relative flex h-48 w-48 items-center justify-center rounded-2xl border-2 border-dashed border-neutral-300"
            >
              <motion.div
                className="h-16 w-12 rounded-lg bg-white shadow-lg cursor-grab active:cursor-grabbing"
                drag
                dragConstraints={boundRef1}
                dragElastic={0.1}
              />
            </div>
            <p className="text-[11px] font-mono text-neutral-500">ref constraint</p>
            <p className="text-[10px] text-neutral-400">stays inside parent</p>
          </div>

          {/* Larger box */}
          <div className="space-y-2 text-center">
            <div
              ref={boundRef2}
              className="relative flex h-48 w-48 items-center justify-center rounded-2xl border-2 border-dashed border-neutral-300"
            >
              <motion.div
                className="h-16 w-12 rounded-lg bg-white shadow-lg cursor-grab active:cursor-grabbing"
                drag
                dragConstraints={boundRef2}
                dragElastic={0.5}
              />
            </div>
            <p className="text-[11px] font-mono text-neutral-500">ref + elastic 0.5</p>
            <p className="text-[10px] text-neutral-400">rubber band at edges</p>
          </div>
        </div>
      </section>

      {/* --- ROW 4: Momentum --- */}
      <section className="space-y-4">
        <h2 className="text-xs font-mono text-neutral-400 uppercase tracking-widest">
          dragMomentum — flick vs stop
        </h2>
        <div className="flex gap-8">
          <div className="space-y-2 text-center">
            <div
              ref={boundRef3}
              className="relative flex h-48 w-48 items-center justify-center rounded-2xl border-2 border-dashed border-neutral-300"
            >
              <motion.div
                className="h-16 w-12 rounded-lg bg-white shadow-lg cursor-grab active:cursor-grabbing"
                drag
                dragConstraints={boundRef3}
                dragMomentum={true}
                dragElastic={0.1}
              />
            </div>
            <p className="text-[11px] font-mono text-neutral-500">momentum: true</p>
            <p className="text-[10px] text-neutral-400">flick it — slides after release</p>
          </div>

          <div className="space-y-2 text-center">
            <div
              ref={boundRef4}
              className="relative flex h-48 w-48 items-center justify-center rounded-2xl border-2 border-dashed border-neutral-300"
            >
              <motion.div
                className="h-16 w-12 rounded-lg bg-white shadow-lg cursor-grab active:cursor-grabbing"
                drag
                dragConstraints={boundRef4}
                dragMomentum={false}
                dragElastic={0.1}
              />
            </div>
            <p className="text-[11px] font-mono text-neutral-500">momentum: false</p>
            <p className="text-[10px] text-neutral-400">stops exactly where you drop it</p>
          </div>
        </div>
      </section>
    </main>
  );
}
