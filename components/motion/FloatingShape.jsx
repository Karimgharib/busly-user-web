// components/motion/FloatingShape.jsx
"use client";

import { motion } from "motion/react";

export function FloatingShape({
  className,
  duration = 4,
  distance = 20,
  delay = 0,
}) {
  return (
    <motion.div
      animate={{ y: [-distance, distance, -distance] }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
      className={className}
    />
  );
}
