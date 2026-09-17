"use client";

import { useEffect, useRef, useState } from "react";
import { stats } from "@/data/portfolio";

function useCountUp(target, active, duration = 1400) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setValue(target);
      return;
    }

    let frame;
    const start = performance.now();
    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      setValue(Math.round(target * eased));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, active, duration]);

  return value;
}

function Stat({ item, active }) {
  const value = useCountUp(item.value, active);
  return (
    <div className="rounded-xl border border-ink-700/70 bg-ink-900/50 px-4 py-4">
      <dd className="font-display text-2xl font-bold text-mist-100 sm:text-3xl">
        {value}
        {item.suffix}
      </dd>
      <dt className="mt-1 text-xs leading-snug text-mist-400">{item.label}</dt>
    </div>
  );
}

export default function Stats() {
  const ref = useRef(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <dl ref={ref} className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4">
      {stats.map((item) => (
        <Stat key={item.label} item={item} active={active} />
      ))}
    </dl>
  );
}
