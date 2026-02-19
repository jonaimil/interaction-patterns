"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

// ============================================================
// DEMO 10: Presence Animation (Enter/Exit)
//
// VOCABULARY:
//   AnimatePresence  — wrapper that detects when children mount/unmount and runs animations
//   initial          — starting state when element first mounts
//   animate          — target state to animate toward
//   exit             — state to animate to before unmounting (requires AnimatePresence)
//   mode             — "sync" (default), "wait" (old exits before new enters), "popLayout"
//   key              — React key that triggers mount/unmount cycle on change
//
// THE KEY INSIGHT:
//   Normally, React removes elements instantly on unmount — no exit animation possible.
//   AnimatePresence intercepts the unmount, plays the exit animation, THEN removes the element.
//   Without it, elements just vanish. With it, they can fade, slide, or scale out gracefully.
// ============================================================

// --- Section 1: Basic mount/unmount ---
function BasicPresenceDemo() {
  const [show, setShow] = useState(true);

  return (
    <section className="space-y-4">
      <div className="flex items-center gap-3">
        <h2 className="text-xs font-mono text-neutral-400 uppercase tracking-widest">
          Basic enter/exit
        </h2>
        <button
          onClick={() => setShow(!show)}
          className="rounded-lg bg-neutral-200 px-3 py-1.5 text-xs font-medium text-neutral-600 transition-colors hover:bg-neutral-300 cursor-pointer"
        >
          {show ? "Remove" : "Add"}
        </button>
      </div>
      <div className="flex gap-8">
        {/* Without AnimatePresence */}
        <div className="space-y-2 text-center">
          <div className="flex h-40 w-28 items-center justify-center">
            {show && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-32 w-24 rounded-xl bg-white shadow-lg"
              />
            )}
          </div>
          <p className="text-[11px] font-mono text-neutral-500">no AnimatePresence</p>
          <p className="text-[10px] text-neutral-400">enters smooth, vanishes instantly</p>
        </div>

        {/* With AnimatePresence */}
        <div className="space-y-2 text-center">
          <div className="flex h-40 w-28 items-center justify-center">
            <AnimatePresence>
              {show && (
                <motion.div
                  key="presence-card"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ type: "spring", visualDuration: 0.3, bounce: 0.1 }}
                  className="h-32 w-24 rounded-xl bg-white shadow-lg"
                />
              )}
            </AnimatePresence>
          </div>
          <p className="text-[11px] font-mono text-neutral-500">with AnimatePresence</p>
          <p className="text-[10px] text-neutral-400">enters and exits smoothly</p>
        </div>
      </div>
    </section>
  );
}

// --- Section 2: Exit directions ---
function ExitDirectionsDemo() {
  const [show, setShow] = useState(true);

  const directions = [
    { label: "fade", exit: { opacity: 0 } },
    { label: "scale down", exit: { opacity: 0, scale: 0.5 } },
    { label: "slide up", exit: { opacity: 0, y: -50 } },
    { label: "slide right", exit: { opacity: 0, x: 50 } },
  ];

  return (
    <section className="space-y-4">
      <div className="flex items-center gap-3">
        <h2 className="text-xs font-mono text-neutral-400 uppercase tracking-widest">
          Exit directions
        </h2>
        <button
          onClick={() => setShow(!show)}
          className="rounded-lg bg-neutral-200 px-3 py-1.5 text-xs font-medium text-neutral-600 transition-colors hover:bg-neutral-300 cursor-pointer"
        >
          {show ? "Remove" : "Add"}
        </button>
      </div>
      <div className="flex gap-8">
        {directions.map(({ label, exit }) => (
          <div key={label} className="space-y-2 text-center">
            <div className="flex h-40 w-24 items-center justify-center">
              <AnimatePresence>
                {show && (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={exit}
                    transition={{ type: "spring", visualDuration: 0.35, bounce: 0.1 }}
                    className="h-32 w-20 rounded-xl bg-white shadow-lg"
                  />
                )}
              </AnimatePresence>
            </div>
            <p className="text-[11px] font-mono text-neutral-500">{label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// --- Section 3: Mode comparison (swap content) ---
function ModeDemo() {
  const [index, setIndex] = useState(0);
  const colors = ["bg-white", "bg-neutral-200", "bg-neutral-300", "bg-neutral-400"];

  return (
    <section className="space-y-4">
      <div className="flex items-center gap-3">
        <h2 className="text-xs font-mono text-neutral-400 uppercase tracking-widest">
          AnimatePresence mode
        </h2>
        <button
          onClick={() => setIndex((i) => (i + 1) % colors.length)}
          className="rounded-lg bg-neutral-200 px-3 py-1.5 text-xs font-medium text-neutral-600 transition-colors hover:bg-neutral-300 cursor-pointer"
        >
          Next
        </button>
      </div>
      <div className="flex gap-10">
        {/* mode="sync" */}
        <div className="space-y-2 text-center">
          <div className="relative flex h-40 w-28 items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-neutral-300">
            <AnimatePresence mode="sync">
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ type: "spring", visualDuration: 0.35, bounce: 0.1 }}
                className={`absolute h-32 w-24 rounded-xl shadow-lg ${colors[index]}`}
              />
            </AnimatePresence>
          </div>
          <p className="text-[11px] font-mono text-neutral-500">mode: &quot;sync&quot;</p>
          <p className="text-[10px] text-neutral-400">old + new animate together</p>
        </div>

        {/* mode="wait" */}
        <div className="space-y-2 text-center">
          <div className="relative flex h-40 w-28 items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-neutral-300">
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ type: "spring", visualDuration: 0.35, bounce: 0.1 }}
                className={`absolute h-32 w-24 rounded-xl shadow-lg ${colors[index]}`}
              />
            </AnimatePresence>
          </div>
          <p className="text-[11px] font-mono text-neutral-500">mode: &quot;wait&quot;</p>
          <p className="text-[10px] text-neutral-400">old exits, then new enters</p>
        </div>

        {/* mode="popLayout" */}
        <div className="space-y-2 text-center">
          <div className="relative flex h-40 w-28 items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-neutral-300">
            <AnimatePresence mode="popLayout">
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ type: "spring", visualDuration: 0.35, bounce: 0.1 }}
                className={`h-32 w-24 rounded-xl shadow-lg ${colors[index]}`}
              />
            </AnimatePresence>
          </div>
          <p className="text-[11px] font-mono text-neutral-500">mode: &quot;popLayout&quot;</p>
          <p className="text-[10px] text-neutral-400">exiting pops out of flow</p>
        </div>
      </div>
    </section>
  );
}

export default function PresencePage() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-16 px-6 py-16">
      <div className="max-w-lg">
        <Link href="/" className="text-xs text-neutral-400 hover:text-neutral-900 transition-colors">
          ← Back
        </Link>
        <h1 className="mt-2 text-2xl font-bold tracking-tight">
          08 — Presence Animation
        </h1>
        <p className="mt-1 text-sm text-neutral-500 max-w-md">
          React unmounts elements instantly — no exit animation possible.
          AnimatePresence intercepts unmount, plays the exit, then removes.
          Without it, elements vanish. With it, they leave gracefully.
        </p>
      </div>

      <BasicPresenceDemo />
      <ExitDirectionsDemo />
      <ModeDemo />
    </main>
  );
}
