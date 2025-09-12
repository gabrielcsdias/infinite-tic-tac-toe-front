"use client";

export default function Button({ children, onClick, primary, secondary, className = "" }) {
  let bgClass = "";
  if (primary) {
    bgClass = "bg-[var(--primary)]";
  } else if (secondary) {
    bgClass = "bg-[var(--secondary)]";
  } else {
    bgClass = "bg-gray-400";
  }

  return (
    <button
      className={`${bgClass} text-white px-4 py-2 rounded-xl cursor-pointer font-bold ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}