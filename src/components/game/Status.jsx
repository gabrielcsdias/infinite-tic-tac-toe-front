"use client";

export default function Status({
  waitingForPlayer,
  leftPlayer,
  playerSymbol,
  turn,
  winner,
  roomCode,
}) {
  return (
    <div>
      <div className="mb-4 text-center flex flex-row justify-center gap-4">
        <p className="text-[var(--secondary)]">
          Room: <span className="text-[var(--primary)]">{roomCode}</span>
        </p>
        <p className="text-[var(--secondary)]">
          You are:{" "}
          <span style={{ color: playerSymbol === "X" ? "#ef4444" : "#3b82f6" }}>
            {playerSymbol}
          </span>
        </p>
      </div>
      {/* text to indicate whose turn it is */}
      <div className="mb-4 text-center">
        {leftPlayer && (
          <p className="text-[var(--secondary)]">
            Player
            <span style={{ color: leftPlayer === "X" ? "#ef4444" : "#3b82f6" }}>
              {" "}
              {leftPlayer}{" "}
            </span>
            left the room.
          </p>
        )}
        {waitingForPlayer ? (
          <p className="text-[var(--secondary)]">Waiting for another player</p>
        ) : winner ? (
          <p className="text-[var(--secondary)]">
            <span className="text-[var(--primary)]">
              {turn == "X" ? "O" : "X"}
            </span>{" "}
            is the winner!
          </p>
        ) : turn === playerSymbol ? (
          <p className="text-[var(--primary)]">It's your turn!</p>
        ) : (
          <p className="text-[var(--secondary)]">Waiting for opponent...</p>
        )}
      </div>
    </div>
  );
}
