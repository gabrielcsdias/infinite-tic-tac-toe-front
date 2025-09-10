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
          Sala: <span className="text-[var(--primary)]">{roomCode}</span>
        </p>
        <p className="text-[var(--secondary)]">
          Você é:{" "}
          <span style={{ color: playerSymbol === "X" ? "#ef4444" : "#3b82f6" }}>
            {playerSymbol}
          </span>
        </p>
      </div>
      {/* texto para dizer de quem é o turno atual */}
      <div className="mb-4 text-center">
        {leftPlayer && (
          <p className="text-[var(--secondary)]">
            O jogador
            <span style={{ color: leftPlayer === "X" ? "#ef4444" : "#3b82f6" }}>
              {" "}
              {leftPlayer}{" "}
            </span>
            saiu da sala.
          </p>
        )}
        {waitingForPlayer ? (
          <p className="text-[var(--secondary)]">Aguardando outro Jogador</p>
        ) : winner ? (
          <p className="text-[var(--secondary)]">
            <span className="text-[var(--primary)]">
              {turn == "X" ? "O" : "X"}
            </span>{" "}
            é o vencedor!
          </p>
        ) : turn === playerSymbol ? (
          <p className="text-[var(--primary)]">É o seu turno!</p>
        ) : (
          <p className="text-[var(--secondary)]">Aguarde o adversário...</p>
        )}
      </div>
    </div>
  );
}
