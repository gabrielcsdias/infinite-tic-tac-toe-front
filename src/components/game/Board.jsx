"use client";
import { motion } from "framer-motion";
import Cell from "./Cell";

export default function Board({
  board,
  turn,
  playerSymbol,
  winner,
  waitingForPlayer,
  onMove,
  nextDisappear,
}) {
  return (
    <motion.div
      className="card p-3 sm:p-4 md:p-6"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: 0.1 }}
    >
      <div className="board grid grid-cols-3 gap-0 bg-[var(--board-line)] rounded-xl overflow-hidden shadow-2xl">
        {board.map((cell, index) => {
          const row = Math.floor(index / 3);
          const col = index % 3;

          const borderClasses = [
            row < 2 ? "border-b-2 sm:border-b-4" : "",
            col < 2 ? "border-r-2 sm:border-r-4" : "",
            "border-[var(--board-line)]",
          ].join(" ");

          return (
            <Cell
              key={index}
              value={cell}
              index={index}
              borderClasses={borderClasses}
              disabled={
                !!cell || turn !== playerSymbol || winner || waitingForPlayer
              }
              onClick={onMove}
              nextDisappear={nextDisappear}
            />
          );
        })}
      </div>
    </motion.div>
  );
}
