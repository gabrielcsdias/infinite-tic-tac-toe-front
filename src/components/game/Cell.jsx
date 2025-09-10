"use client";

import CellO from "../ui/CellO";
import CellX from "../ui/CellX";

export default function Cell({ value, index, borderClasses, disabled, onClick }) {
  return (
    <div
      className={`w-16 h-16 flex items-center justify-center text-2xl font-bold cursor-pointer select-none p-2 ${borderClasses}`}
      style={{ color: value === "X" ? "#EF4444" : "#3B82F6" }}
      onClick={() => !disabled && onClick(index)}
    >
      {value ? value == 'X' ? <CellX /> : <CellO className="rotate-45" /> : ""}
    </div>
  );
}
