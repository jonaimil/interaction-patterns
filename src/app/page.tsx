import Link from "next/link";

const DEMOS = [
  { id: 1, slug: "hover-lift", title: "Hover Scale + Shadow Lift", concepts: "scale, translateY, box-shadow, transition" },
  { id: 2, slug: "drag-snap", title: "Drag and Snap Back", concepts: "drag, dragConstraints, dragElastic, gestures" },
  { id: 3, slug: "staggered-list", title: "Staggered List Enter", concepts: "staggerChildren, delayChildren, orchestration" },
  { id: 4, slug: "card-flip", title: "Card Flip (3D)", concepts: "rotateY, perspective, backface-visibility" },
  { id: 5, slug: "spring-vs-tween", title: "Spring vs Tween Comparison", concepts: "stiffness, damping, mass, duration, easing" },
  { id: 6, slug: "gesture-carousel", title: "Gesture-Driven Carousel", concepts: "onPan, useMotionValue, useTransform, velocity" },
  { id: 7, slug: "shared-layout", title: "Shared Layout Animation", concepts: "layoutId across components, AnimatePresence" },
  { id: 8, slug: "presence", title: "Presence Animation", concepts: "initial, animate, exit, mount/unmount lifecycle" },
];

export default function Home() {
  return (
    <main className="mx-auto max-w-md px-6 py-16">
      <h1 className="text-3xl font-bold tracking-tight">Interaction Patterns</h1>
      <p className="mt-2 text-sm text-neutral-400">
        8 interactive demos. Feel the difference, learn the vocabulary.
      </p>
      <p className="mt-1 text-sm text-neutral-500">
        by Jon Aimil Sejera Sarwar
      </p>

      <div className="mt-10 flex flex-col gap-1">
        {DEMOS.map((demo) => (
          <Link
            key={demo.id}
            href={`/${demo.slug}`}
            className="group flex items-baseline gap-4 rounded-lg px-4 py-3 transition-colors hover:bg-black/5"
          >
            <span className="text-sm font-mono text-neutral-400 tabular-nums shrink-0">
              {String(demo.id).padStart(2, "0")}
            </span>
            <div>
              <span className="text-sm font-medium group-hover:text-neutral-900 transition-colors">
                {demo.title}
              </span>
              <p className="text-xs text-neutral-400 font-mono mt-0.5">
                {demo.concepts}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
