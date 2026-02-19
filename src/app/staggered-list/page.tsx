"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

// ============================================================
// DEMO 3: Staggered List Enter
//
// VOCABULARY:
//   variants         — named animation states (objects) you assign to parent + children
//   staggerChildren  — delay (seconds) between each child starting its animation
//   delayChildren    — delay before the FIRST child starts
//   when             — "beforeChildren" | "afterChildren" — sequencing parent vs kids
//   orchestration    — coordinating timing of multiple elements as a group
//
// THE PATTERN:
//   Parent has a "container" variant with stagger config.
//   Children have an "item" variant with their own animation.
//   When parent enters "visible" state, children fire one by one.
//   The stagger delay controls the cascade/wave effect.
// ============================================================

// --- CONCEPT: Container variant ---
// The parent doesn't visually animate — it just orchestrates timing.
// staggerChildren: seconds between each child starting
// delayChildren: seconds before the first child begins
const container = (stagger: number) => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: stagger,
      delayChildren: 0.1,
    },
  },
});

// --- CONCEPT: Item variants ---
// Each child defines its own hidden → visible transition.
// The parent's stagger controls WHEN each child starts.
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", visualDuration: 0.4, bounce: 0.1 } },
};

const fadeLeft = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { type: "spring", visualDuration: 0.4, bounce: 0.1 } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { type: "spring", visualDuration: 0.3, bounce: 0.2 } },
};

const popIn = {
  hidden: { opacity: 0, scale: 0.3, y: 10 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", visualDuration: 0.35, bounce: 0.35 } },
};

const ITEMS = Array.from({ length: 6 }, (_, i) => i);

function ReplayButton({ onReplay }: { onReplay: () => void }) {
  return (
    <button
      onClick={onReplay}
      className="rounded-lg bg-neutral-200 px-3 py-1.5 text-xs font-medium text-neutral-600 transition-colors hover:bg-neutral-300 cursor-pointer"
    >
      Replay
    </button>
  );
}

export default function StaggeredListPage() {
  const [keys, setKeys] = useState({
    stagger: 0,
    directions: 0,
    timing: 0,
  });

  const replay = (section: keyof typeof keys) =>
    setKeys((k) => ({ ...k, [section]: k[section] + 1 }));

  return (
    <main className="flex min-h-screen flex-col items-center gap-16 px-6 py-16">
      <div className="max-w-lg">
        <Link href="/" className="text-xs text-neutral-400 hover:text-neutral-900 transition-colors">
          ← Back
        </Link>
        <h1 className="mt-2 text-2xl font-bold tracking-tight">
          03 — Staggered List Enter
        </h1>
        <p className="mt-1 text-sm text-neutral-500 max-w-md">
          Watch how elements enter one by one. The stagger delay controls
          the cascade — too fast feels simultaneous, too slow feels sluggish.
        </p>
      </div>

      {/* --- ROW 1: Stagger timing comparison --- */}
      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <h2 className="text-xs font-mono text-neutral-400 uppercase tracking-widest">
            staggerChildren timing
          </h2>
          <ReplayButton onReplay={() => replay("stagger")} />
        </div>
        <div className="flex gap-10">
          {[0, 0.05, 0.12, 0.25].map((stagger) => (
            <div key={`${stagger}-${keys.stagger}`} className="space-y-2 text-center">
              <motion.div
                className="flex flex-col gap-2"
                variants={container(stagger)}
                initial="hidden"
                animate="visible"
              >
                {ITEMS.map((i) => (
                  <motion.div
                    key={i}
                    className="h-8 w-24 rounded-lg bg-white shadow-md"
                    variants={fadeUp}
                  />
                ))}
              </motion.div>
              <p className="text-[11px] font-mono text-neutral-500">
                {stagger === 0 ? "no stagger" : `${stagger}s`}
              </p>
              <p className="text-[10px] text-neutral-400">
                {stagger === 0 && "all at once"}
                {stagger === 0.05 && "fast wave"}
                {stagger === 0.12 && "natural"}
                {stagger === 0.25 && "dramatic"}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* --- ROW 2: Entry directions --- */}
      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <h2 className="text-xs font-mono text-neutral-400 uppercase tracking-widest">
            Entry direction variants
          </h2>
          <ReplayButton onReplay={() => replay("directions")} />
        </div>
        <div className="flex gap-10">
          {[
            { label: "fade up", sublabel: "y: 20 → 0", variant: fadeUp },
            { label: "fade left", sublabel: "x: -30 → 0", variant: fadeLeft },
            { label: "scale in", sublabel: "scale: 0.8 → 1", variant: scaleIn },
            { label: "pop in", sublabel: "scale: 0.3 + bounce", variant: popIn },
          ].map(({ label, sublabel, variant }) => (
            <div key={`${label}-${keys.directions}`} className="space-y-2 text-center">
              <motion.div
                className="flex flex-col gap-2"
                variants={container(0.1)}
                initial="hidden"
                animate="visible"
              >
                {ITEMS.map((i) => (
                  <motion.div
                    key={i}
                    className="h-8 w-24 rounded-lg bg-white shadow-md"
                    variants={variant}
                  />
                ))}
              </motion.div>
              <p className="text-[11px] font-mono text-neutral-500">{label}</p>
              <p className="text-[10px] text-neutral-400">{sublabel}</p>
            </div>
          ))}
        </div>
      </section>

      {/* --- ROW 3: Real-world pattern — list items --- */}
      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <h2 className="text-xs font-mono text-neutral-400 uppercase tracking-widest">
            Realistic list pattern
          </h2>
          <ReplayButton onReplay={() => replay("timing")} />
        </div>
        <motion.div
          key={keys.timing}
          className="flex w-80 flex-col gap-2"
          variants={container(0.08)}
          initial="hidden"
          animate="visible"
        >
          {[
            { w: "w-full", h: "h-10" },
            { w: "w-full", h: "h-10" },
            { w: "w-full", h: "h-10" },
            { w: "w-full", h: "h-10" },
            { w: "w-full", h: "h-10" },
            { w: "w-3/4", h: "h-10" },
          ].map((bar, i) => (
            <motion.div
              key={i}
              className={`${bar.w} ${bar.h} rounded-lg bg-white shadow-md`}
              variants={fadeUp}
            />
          ))}
        </motion.div>
        <p className="text-[11px] font-mono text-neutral-500 text-center">
          stagger: 0.08s — fade up — realistic list skeleton
        </p>
      </section>
    </main>
  );
}
