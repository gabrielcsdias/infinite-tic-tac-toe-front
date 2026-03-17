"use client";
import { motion } from "framer-motion";
import CellO from "./CellO";
import CellX from "./CellX";

export default function Cell({
  value,
  index,
  borderClasses,
  disabled,
  onClick,
  className = "",
  nextDisappear,
}) {
  const isX = value === "X";
  const color = isX ? "var(--foreground)" : "var(--muted)";

  return (
    <motion.div
      className={`
        relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32
        flex items-center justify-center text-2xl font-bold cursor-pointer select-none
        ${borderClasses} ${className}
        ${!disabled ? "cell-hover" : ""}
      `}
      style={{ backgroundColor: "var(--card)" }}
      onClick={() => !disabled && onClick(index)}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{
        type: "spring",
        stiffness: 500,
        damping: 30,
        delay: index * 0.02,
      }}
      whileTap={!disabled ? { scale: 0.95 } : {}}
    >
      {value && (
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 20,
          }}
        >
          {isX ? (
            <CellX
              className={nextDisappear === index ? "fade-animation" : "scale-in"}
              color={color}
            />
          ) : (
            <CellO
                className={`rotate-12 ${nextDisappear === index ? "fade-animation" : "scale-in"}`}
                color={color}
              />
          )}
        </motion.div>
      )}
      {!disabled && !value && (
        <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-20 transition-opacity">
          <div
            className="w-8 h-8 rounded-full"
            style={{ backgroundColor: color }}
          />
        </div>
      )}
    </motion.div>
  );
}
