"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

// ============================================================
// DEMO 9: Shared Layout Animation (Morph)
//
// VOCABULARY:
//   layoutId         — shared ID that links two separate DOM elements for morph animation
//   AnimatePresence  — wrapper that keeps exiting elements in the DOM for exit animations
//   layout           — prop that auto-animates an element's position/size when it changes
//   morph transition — element appears to transform from one shape/position into another
//
// THE PATTERN:
//   Two (or more) components render elements with the same layoutId.
//   Only one is mounted at a time (or they switch positions).
//   Framer Motion morphs between them — animating position, size, and border-radius.
//   This creates the illusion of one element transforming into another.
// ============================================================

// --- Section 1: Tab indicator ---
const TABS = ["Overview", "Features", "Pricing", "About"];

function TabDemo() {
  const [active, setActive] = useState(0);

  return (
    <section className="space-y-4">
      <h2 className="text-xs font-mono text-neutral-400 uppercase tracking-widest">
        layoutId — tab indicator
      </h2>
      <div className="flex gap-1 rounded-xl bg-neutral-200 p-1">
        {TABS.map((tab, i) => (
          <button
            key={tab}
            onClick={() => setActive(i)}
            className="relative rounded-lg px-2 sm:px-4 py-2 text-xs sm:text-sm font-medium cursor-pointer"
          >
            {active === i && (
              <motion.div
                layoutId="tab-indicator"
                className="absolute inset-0 rounded-lg bg-white shadow-sm"
                transition={{ type: "spring", visualDuration: 0.35, bounce: 0.15 }}
              />
            )}
            <span className={`relative z-10 ${active === i ? "text-neutral-900" : "text-neutral-500"}`}>
              {tab}
            </span>
          </button>
        ))}
      </div>
      <p className="text-[11px] font-mono text-neutral-500">
        One white pill, same layoutId — slides between tabs
      </p>
    </section>
  );
}

// --- Section 2: Card expand ---
const ITEMS = [
  { id: "a", title: "Card A" },
  { id: "b", title: "Card B" },
  { id: "c", title: "Card C" },
  { id: "d", title: "Card D" },
];

function CardExpandDemo() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <section className="space-y-4">
      <h2 className="text-xs font-mono text-neutral-400 uppercase tracking-widest">
        layoutId — card expand morph
      </h2>
      <div className="relative">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {ITEMS.map((item) => (
            <motion.div
              key={item.id}
              layoutId={`card-${item.id}`}
              onClick={() => setSelected(item.id)}
              className="h-24 rounded-xl bg-white shadow-md cursor-pointer"
              whileHover={{ scale: 1.03 }}
            />
          ))}
        </div>

        <AnimatePresence>
          {selected && (
            <>
              <motion.div
                className="fixed inset-0 bg-black/20 z-40"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelected(null)}
              />
              <div className="fixed inset-0 flex items-center justify-center z-50" onClick={() => setSelected(null)}>
                <motion.div
                  layoutId={`card-${selected}`}
                  className="h-64 w-80 rounded-2xl bg-white shadow-xl cursor-pointer"
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            </>
          )}
        </AnimatePresence>
      </div>
      <p className="text-[11px] font-mono text-neutral-500">
        Small card morphs into large card — same layoutId, different size/position
      </p>
    </section>
  );
}

// --- Section 3: Toggle between layouts ---
function ToggleLayoutDemo() {
  const [isGrid, setIsGrid] = useState(true);
  const items = ["1", "2", "3", "4", "5", "6"];

  return (
    <section className="space-y-4">
      <div className="flex items-center gap-3">
        <h2 className="text-xs font-mono text-neutral-400 uppercase tracking-widest">
          layout — grid vs list toggle
        </h2>
        <button
          onClick={() => setIsGrid(!isGrid)}
          className="rounded-lg bg-neutral-200 px-3 py-1.5 text-xs font-medium text-neutral-600 transition-colors hover:bg-neutral-300 cursor-pointer"
        >
          {isGrid ? "List" : "Grid"}
        </button>
      </div>
      <div className={isGrid ? "grid grid-cols-3 gap-2 w-full max-w-64" : "flex flex-col gap-2 w-full max-w-64"}>
        {items.map((item) => (
          <motion.div
            key={item}
            layout
            transition={{ type: "spring", visualDuration: 0.4, bounce: 0.1 }}
            className={`rounded-xl bg-white shadow-md flex items-center justify-center font-mono text-sm text-neutral-400 ${
              isGrid ? "h-20" : "h-10"
            }`}
          >
            {item}
          </motion.div>
        ))}
      </div>
      <p className="text-[11px] font-mono text-neutral-500">
        layout prop animates the position + size change between grid and list
      </p>
    </section>
  );
}

export default function SharedLayoutPage() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-16 px-6 py-16">
      <div className="max-w-lg">
        <Link href="/" className="text-xs text-neutral-400 hover:text-neutral-900 transition-colors">
          ← Back
        </Link>
        <h1 className="mt-2 text-2xl font-bold tracking-tight">
          07 — Shared Layout Animation
        </h1>
        <p className="mt-1 text-sm text-neutral-500 max-w-md">
          layoutId creates morph transitions between separate DOM elements.
          One element appears to transform into another — position, size, and shape.
        </p>
      </div>

      <div className="flex flex-col gap-16 w-full max-w-md">
        <TabDemo />
        <CardExpandDemo />
        <ToggleLayoutDemo />
      </div>
    </main>
  );
}
