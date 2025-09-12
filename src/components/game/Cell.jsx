"use client";

import CellO from "../ui/CellO";
import CellX from "../ui/CellX";

export default function Cell({
  value,
  index,
  borderClasses,
  disabled,
  onClick,
  className = "",
  nextDisappear,
}) {
  return (
    <div
      className={`w-16 h-16 flex items-center justify-center text-2xl font-bold cursor-pointer select-none p-2 ${borderClasses} ${className}`}
      style={{ color: value === "X" ? "#EF4444" : "#3B82F6" }}
      onClick={() => !disabled && onClick(index)}
    >
      {value ? (
        value == "X" ? (
          <CellX className={nextDisappear === index ? "fade-animation" : ""} />
        ) : (
          <CellO
            className={`rotate-45 ${
              nextDisappear === index ? "fade-animation" : ""
            }`}
          />
        )
      ) : (
        ""
      )}
    </div>
  );
}
