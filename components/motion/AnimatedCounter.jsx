// components/motion/AnimatedCounter.jsx
"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "motion/react";

export function AnimatedCounter({
  target,
  suffix = "",
  decimal = false,
  className,
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(
          decimal ? parseFloat(current.toFixed(1)) : Math.floor(current),
        );
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isInView, target, decimal]);

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={className}
    >
      {decimal ? count.toFixed(1) : count.toLocaleString()}
      {suffix}
    </motion.span>
  );
}
