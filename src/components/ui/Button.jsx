"use client";
import { motion } from "framer-motion";
import Spinner from "./Spinner";

export default function Button({
  children,
  onClick,
  primary,
  secondary,
  loading,
  disabled,
  icon: Icon,
  className = "",
}) {
  const baseClasses = "flex items-center justify-center gap-2 font-medium transition-all rounded-lg cursor-pointer";

  if (primary) {
    return (
      <motion.button
        className={`${baseClasses} bg-[var(--primary)] text-[var(--background)] px-6 py-3 ${className}`}
        onClick={onClick}
        disabled={disabled || loading}
        whileHover={{ opacity: 0.9 }}
        whileTap={{ scale: 0.98 }}
      >
        {loading ? (
          <Spinner size="sm" className="text-[var(--background)]" />
        ) : Icon ? (
          <Icon className="w-4 h-4" />
        ) : null}
        {children}
      </motion.button>
    );
  }

  if (secondary) {
    return (
      <motion.button
        className={`${baseClasses} bg-[var(--secondary)] text-[var(--background)] px-6 py-3 ${className}`}
        onClick={onClick}
        disabled={disabled || loading}
        whileHover={{ opacity: 0.8 }}
        whileTap={{ scale: 0.98 }}
      >
        {loading ? (
          <Spinner size="sm" className="text-[var(--background)]" />
        ) : Icon ? (
          <Icon className="w-4 h-4" />
        ) : null}
        {children}
      </motion.button>
    );
  }

  return (
    <motion.button
      className={`${baseClasses} bg-gray-400 text-white px-6 py-3 ${className}`}
      onClick={onClick}
      disabled={disabled || loading}
      whileHover={{ opacity: 0.8 }}
      whileTap={{ scale: 0.98 }}
    >
      {loading ? <Spinner size="sm" className="text-white" /> : null}
      {children}
    </motion.button>
  );
}
