"use client";

import { motion } from "framer-motion";
import Link from "next/link";

// ============================================================
// DEMO 1: Hover Scale + Shadow Lift
//
// VOCABULARY:
//   scale      — multiplier on element size. 1 = normal, 1.05 = 5% bigger
//   translateY — vertical offset in pixels. Negative = upward ("lift")
//   box-shadow — layered shadow beneath element. More blur + offset = higher elevation
//   transition — how a property animates between values (duration, easing, spring)
//
// THE PATTERN:
//   Resting state → Hover state → Resting state
//   Each card has a "resting" set of values and a "hover" set.
//   The transition config defines HOW it moves between them.
// ============================================================

// --- CONCEPT: Shadow tiers ---
// Shadows create perceived elevation. More layers = more realistic.
// Each tier represents a different "height" off the surface.
// Convention: sm → md → lg → xl (or tier-1 through tier-4)
const SHADOW = {
  rest: "0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.06)",
  hover: "0 20px 40px rgba(0,0,0,0.15), 0 8px 16px rgba(0,0,0,0.1)",
};

// --- CONCEPT: Spring transition ---
// Springs feel organic because they overshoot slightly and settle.
// visualDuration: how long the animation *appears* to take (not physics time)
// bounce: 0 = no overshoot (critically damped), 0.5 = bouncy
const spring = { type: "spring" as const, visualDuration: 0.3, bounce: 0.15 };

export default function HoverLiftPage() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-16 px-6 py-16">
      <div>
        <Link href="/" className="text-xs text-neutral-400 hover:text-neutral-900 transition-colors">
          ← Back
        </Link>
        <h1 className="mt-2 text-2xl font-bold tracking-tight">
          01 — Hover Scale + Shadow Lift
        </h1>
        <p className="mt-1 text-sm text-neutral-500 max-w-md">
          Hover each card. Notice how scale + translateY + shadow work together
          to create the illusion of lifting off the surface.
        </p>
      </div>

      {/* --- ROW 1: Isolating each property --- */}
      <section className="space-y-4">
        <h2 className="text-xs font-mono text-neutral-500 uppercase tracking-widest">
          Properties isolated
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {/* Scale only */}
          <div className="space-y-2 text-center">
            <motion.div
              className="h-32 w-24 mx-auto rounded-xl bg-white cursor-pointer"
              style={{ boxShadow: SHADOW.rest }}
              whileHover={{ scale: 1.08 }}
              transition={spring}
            />
            <p className="text-[11px] font-mono text-neutral-500">scale: 1.08</p>
          </div>

          {/* TranslateY only */}
          <div className="space-y-2 text-center">
            <motion.div
              className="h-32 w-24 mx-auto rounded-xl bg-white cursor-pointer"
              style={{ boxShadow: SHADOW.rest }}
              whileHover={{ y: -12 }}
              transition={spring}
            />
            <p className="text-[11px] font-mono text-neutral-500">y: -12</p>
          </div>

          {/* Shadow only */}
          <div className="space-y-2 text-center">
            <motion.div
              className="h-32 w-24 mx-auto rounded-xl bg-white cursor-pointer"
              style={{ boxShadow: SHADOW.rest }}
              whileHover={{ boxShadow: SHADOW.hover }}
              transition={{ duration: 0.3 }}
            />
            <p className="text-[11px] font-mono text-neutral-500">shadow only</p>
          </div>

          {/* All three combined */}
          <div className="space-y-2 text-center">
            <motion.div
              className="h-32 w-24 mx-auto rounded-xl bg-white cursor-pointer"
              style={{ boxShadow: SHADOW.rest }}
              whileHover={{
                scale: 1.05,
                y: -8,
                boxShadow: SHADOW.hover,
              }}
              transition={spring}
            />
            <p className="text-[11px] font-mono text-neutral-500">combined</p>
          </div>
        </div>
      </section>

      {/* --- ROW 2: Spring parameters --- */}
      <section className="space-y-4">
        <h2 className="text-xs font-mono text-neutral-500 uppercase tracking-widest">
          Spring feel comparison
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {/* No bounce — critically damped */}
          <div className="space-y-2 text-center">
            <motion.div
              className="h-32 w-24 mx-auto rounded-xl bg-white cursor-pointer"
              style={{ boxShadow: SHADOW.rest }}
              whileHover={{ scale: 1.08, y: -8, boxShadow: SHADOW.hover }}
              transition={{ type: "spring", visualDuration: 0.3, bounce: 0 }}
            />
            <p className="text-[11px] font-mono text-neutral-500">bounce: 0</p>
            <p className="text-[10px] text-neutral-400">stiff, no overshoot</p>
          </div>

          {/* Subtle bounce */}
          <div className="space-y-2 text-center">
            <motion.div
              className="h-32 w-24 mx-auto rounded-xl bg-white cursor-pointer"
              style={{ boxShadow: SHADOW.rest }}
              whileHover={{ scale: 1.08, y: -8, boxShadow: SHADOW.hover }}
              transition={{ type: "spring", visualDuration: 0.3, bounce: 0.15 }}
            />
            <p className="text-[11px] font-mono text-neutral-500">bounce: 0.15</p>
            <p className="text-[10px] text-neutral-400">subtle, professional</p>
          </div>

          {/* Medium bounce */}
          <div className="space-y-2 text-center">
            <motion.div
              className="h-32 w-24 mx-auto rounded-xl bg-white cursor-pointer"
              style={{ boxShadow: SHADOW.rest }}
              whileHover={{ scale: 1.08, y: -8, boxShadow: SHADOW.hover }}
              transition={{ type: "spring", visualDuration: 0.4, bounce: 0.3 }}
            />
            <p className="text-[11px] font-mono text-neutral-500">bounce: 0.3</p>
            <p className="text-[10px] text-neutral-400">playful</p>
          </div>

          {/* High bounce */}
          <div className="space-y-2 text-center">
            <motion.div
              className="h-32 w-24 mx-auto rounded-xl bg-white cursor-pointer"
              style={{ boxShadow: SHADOW.rest }}
              whileHover={{ scale: 1.08, y: -8, boxShadow: SHADOW.hover }}
              transition={{ type: "spring", visualDuration: 0.5, bounce: 0.5 }}
            />
            <p className="text-[11px] font-mono text-neutral-500">bounce: 0.5</p>
            <p className="text-[10px] text-neutral-400">bouncy, cartoon</p>
          </div>
        </div>
      </section>

      {/* --- ROW 3: Scale magnitude --- */}
      <section className="space-y-4">
        <h2 className="text-xs font-mono text-neutral-500 uppercase tracking-widest">
          Scale magnitude
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {[1.02, 1.05, 1.1, 1.2].map((s) => (
            <div key={s} className="space-y-2 text-center">
              <motion.div
                className="h-32 w-24 mx-auto rounded-xl bg-white cursor-pointer"
                style={{ boxShadow: SHADOW.rest }}
                whileHover={{
                  scale: s,
                  y: -8,
                  boxShadow: SHADOW.hover,
                }}
                transition={spring}
              />
              <p className="text-[11px] font-mono text-neutral-500">
                scale: {s}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
