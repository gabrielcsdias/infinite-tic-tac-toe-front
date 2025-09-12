"use client";
import Cell from "./Cell";

export default function Board({ board, turn, playerSymbol, winner, waitingForPlayer, onMove, nextDisappear }) {
  return (
    <div className="board grid grid-cols-3 p-1">
      {board.map((cell, index) => {
        const row = Math.floor(index / 3);
        const col = index % 3;

        const borderClasses = [
          row < 2 ? "border-b-4" : "",
          col < 2 ? "border-r-4" : "",
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
  );
}
