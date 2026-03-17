"use client";
import { motion } from "framer-motion";

export default function Spinner({ size = "md", className = "" }) {
  const sizes = {
    sm: 16,
    md: 24,
    lg: 40,
    xl: 64,
  };

  const strokeWidth = {
    sm: 3,
    md: 4,
    lg: 5,
    xl: 6,
  };

  return (
    <motion.div
      className={className}
      animate={{ rotate: 360 }}
      transition={{
        duration: 1,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      <svg
        width={sizes[size]}
        height={sizes[size]}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth={strokeWidth[size]}
          strokeLinecap="round"
          strokeDasharray="31.4 31.4"
          opacity="0.3"
        />
        <motion.circle
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth={strokeWidth[size]}
          strokeLinecap="round"
          initial={{ strokeDasharray: "0 100" }}
          animate={{ strokeDasharray: "50 50" }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </svg>
    </motion.div>
  );
}
