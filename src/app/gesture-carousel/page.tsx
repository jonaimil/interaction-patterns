"use client";

import { useState, useRef } from "react";
import { motion, useMotionValue, useTransform, animate, PanInfo } from "framer-motion";
import Link from "next/link";

// ============================================================
// DEMO 8: Gesture-Driven Carousel
//
// VOCABULARY:
//   useMotionValue  — reactive value that updates without re-rendering. Drives animations efficiently
//   useTransform    — derives a new motion value from another (e.g., x position → opacity)
//   onPan / onDrag  — gesture handlers that fire during pointer movement
//   velocity        — speed + direction of the gesture. Used for flick/swipe detection
//   animate()       — imperative function to animate a motion value to a target
//
// THE PATTERN:
//   Track horizontal drag with useMotionValue(x).
//   Derive visual effects (scale, opacity, rotation) from x using useTransform.
//   On release, use velocity to determine if it's a swipe or a snap-back.
// ============================================================

const CARDS = [0, 1, 2, 3, 4];
const CARD_WIDTH = 240;
const GAP = 16;
const STEP = CARD_WIDTH + GAP;

export default function GestureCarouselPage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const x = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    const velocity = info.velocity.x;
    const offset = info.offset.x;

    // How many cards to skip based on flick speed
    // 300-800px/s = 1 card, 800-1400px/s = 2 cards, 1400+ = 3 cards
    const velocitySteps = Math.min(Math.floor(Math.abs(velocity) / 600) + 1, 3);
    const offsetSteps = Math.round(Math.abs(offset) / STEP) || 0;
    const steps = Math.max(velocitySteps, offsetSteps);

    let newIndex = activeIndex;
    if (velocity < -300 || offset < -STEP / 3) {
      newIndex = Math.min(activeIndex + steps, CARDS.length - 1);
    } else if (velocity > 300 || offset > STEP / 3) {
      newIndex = Math.max(activeIndex - steps, 0);
    }

    setActiveIndex(newIndex);
    animate(x, -newIndex * STEP, {
      type: "spring",
      visualDuration: 0.4,
      bounce: 0.15,
    });
  };

  return (
    <main className="flex min-h-screen flex-col items-center gap-16 px-6 py-16">
      <div className="max-w-lg">
        <Link href="/" className="text-xs text-neutral-400 hover:text-neutral-900 transition-colors">
          ← Back
        </Link>
        <h1 className="mt-2 text-2xl font-bold tracking-tight">
          06 — Gesture-Driven Carousel
        </h1>
        <p className="mt-1 text-sm text-neutral-500 max-w-md">
          Drag the cards horizontally. Flick fast to swipe, drag slow and release
          to snap. The velocity of your gesture decides the outcome.
        </p>
      </div>

      {/* --- Carousel --- */}
      <section className="space-y-6 w-full max-w-sm">
        <h2 className="text-xs font-mono text-neutral-400 uppercase tracking-widest">
          Swipe carousel — velocity detection
        </h2>
        <div className="overflow-hidden rounded-2xl p-4 -m-4 pb-8" ref={containerRef}>
          <motion.div
            className="flex gap-4 cursor-grab active:cursor-grabbing"
            style={{ x }}
            drag="x"
            dragConstraints={{
              left: -(CARDS.length - 1) * STEP,
              right: 0,
            }}
            dragElastic={0.15}
            onDragEnd={handleDragEnd}
          >
            {CARDS.map((card) => (
              <CardItem key={card} index={card} x={x} />
            ))}
          </motion.div>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2">
          {CARDS.map((_, i) => (
            <div
              key={i}
              className={`h-2 w-2 rounded-full transition-colors ${
                i === activeIndex ? "bg-neutral-800" : "bg-neutral-300"
              }`}
            />
          ))}
        </div>
        <p className="text-[11px] font-mono text-neutral-500 text-center">
          velocity threshold: 300px/s — flick fast or drag past 1/3
        </p>
      </section>

      {/* --- useTransform demo --- */}
      <section className="space-y-4">
        <h2 className="text-xs font-mono text-neutral-400 uppercase tracking-widest">
          useTransform — derive values from drag
        </h2>
        <TransformDemo />
      </section>
    </main>
  );
}

function CardItem({ index, x }: { index: number; x: ReturnType<typeof useMotionValue> }) {
  const cardCenter = index * STEP + CARD_WIDTH / 2;
  const scale = useTransform(x, [-(cardCenter + CARD_WIDTH), -cardCenter + CARD_WIDTH / 2, -(cardCenter - CARD_WIDTH * 1.5)], [0.9, 1, 0.9]);
  const opacity = useTransform(x, [-(cardCenter + CARD_WIDTH), -cardCenter + CARD_WIDTH / 2, -(cardCenter - CARD_WIDTH * 1.5)], [0.5, 1, 0.5]);

  return (
    <motion.div
      className="h-64 min-w-[240px] rounded-xl bg-white shadow-lg flex items-center justify-center"
      style={{ scale, opacity }}
    >
      <span className="text-4xl font-mono text-neutral-300">{index + 1}</span>
    </motion.div>
  );
}

function TransformDemo() {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-150, 0, 150], [-15, 0, 15]);
  const opacity = useTransform(x, [-150, 0, 150], [0.3, 1, 0.3]);
  const scale = useTransform(x, [-150, 0, 150], [0.85, 1, 0.85]);
  const background = useTransform(x, [-150, 0, 150], ["#fecaca", "#ffffff", "#bbf7d0"]);

  return (
    <div className="flex flex-col items-center gap-4">
      <motion.div
        className="h-40 w-28 rounded-xl shadow-lg cursor-grab active:cursor-grabbing"
        style={{ x, rotate, opacity, scale, background }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.8}
      />
      <div className="text-center">
        <p className="text-[11px] font-mono text-neutral-500">
          x → rotate, opacity, scale, background color
        </p>
        <p className="text-[10px] text-neutral-400">
          drag left = red + tilt left, drag right = green + tilt right
        </p>
      </div>
    </div>
  );
}
