// components/motion/FadeIn.jsx
"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export function FadeIn({
  children,
  delay = 0,
  direction = "up",
  distance = 30,
  className,
}) {
  const axis = direction === "up" || direction === "down" ? "y" : "x";
  const sign = direction === "up" || direction === "left" ? 1 : -1;

  return (
    <motion.div
      initial={{ opacity: 0, [axis]: sign * distance }}
      whileInView={{ opacity: 1, [axis]: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={cn("will-change-transform", className)}
    >
      {children}
    </motion.div>
  );
}
