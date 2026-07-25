// components/motion/Blob.jsx
"use client";

import { motion } from "motion/react";

export function Blob({ className, duration = 8, delay = 0 }) {
  return (
    <motion.div
      animate={{
        borderRadius: [
          "60% 40% 30% 70% / 60% 30% 70% 40%",
          "30% 60% 70% 40% / 50% 60% 30% 60%",
          "50% 60% 30% 60% / 30% 60% 70% 40%",
          "60% 30% 60% 40% / 60% 40% 30% 70%",
          "60% 40% 30% 70% / 60% 30% 70% 40%",
        ],
      }}
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
