"use client";

import { motion } from "framer-motion";

const RING = "#f59e0b";
const HALO = "#fcd34d";

export function Shimmer({
  show,
  radius,
  glowPad = 6,
}: {
  show: boolean;
  accent?: string;
  radius: string | number;
  glowPad?: number;
}) {
  if (!show) return null;
  const r = typeof radius === "number" ? `${radius}px` : radius;
  const outerR = typeof radius === "number" ? `${radius + glowPad}px` : radius;

  return (
    <>
      <motion.span
        aria-hidden
        animate={{ opacity: [0.55, 0.95, 0.55], scale: [1, 1.04, 1] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute"
        style={{
          inset: -glowPad,
          borderRadius: outerR,
          background: `radial-gradient(ellipse at center, ${HALO}66 0%, ${RING}22 50%, transparent 75%)`,
          filter: "blur(5px)",
        }}
      />
      <motion.span
        aria-hidden
        animate={{ opacity: [0.9, 0.5, 0.9] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute inset-0"
        style={{
          borderRadius: r,
          boxShadow: `0 0 14px ${HALO}88, 0 0 28px ${RING}55`,
        }}
      />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden"
        style={{ borderRadius: r }}
      >
        <motion.span
          animate={{ x: ["-180%", "320%"] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut", repeatDelay: 1.4 }}
          className="absolute top-0 bottom-0 w-[55%] -skew-x-12"
          style={{
            background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.85) 50%, transparent 100%)",
          }}
        />
      </span>
    </>
  );
}
