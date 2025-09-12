"use client";
import Board from "@/components/game/Board";
import Status from "@/components/game/Status";
import Button from "@/components/ui/Button";
import { socket } from "@/socket";
import React from "react";

export default function Home() {
  const [isConnected, setIsConnected] = React.useState(false);
  const [page, setPage] = React.useState("home");
  const [roomCode, setRoomCode] = React.useState("");
  const [waitingForPlayer, setWaitingForPlayer] = React.useState(false);
  const [leftPlayer, setLeftPlayer] = React.useState("");
  const [playerSymbol, setPlayerSymbol] = React.useState("");
  const [turn, setTurn] = React.useState("X");
  const [board, setBoard] = React.useState([]);
  const [winner, setWinner] = React.useState(null);
  const [nextDisappear, setNextDisappear] = React.useState(null);

  React.useEffect(() => {
    if (!socket) return;

    socket.on("connect", () => {
      setIsConnected(true);
      console.log("✅ Conectado ao servidor:", socket.id);
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
      console.log("❌ Desconectado do servidor");
    });

    socket.on("room-created", (data) => {
      console.log("📥 Sala recebida:", data);
      setWaitingForPlayer(true);
      setRoomCode(data.code);
      setPlayerSymbol(data.symbol);
      setBoard(data.board);
      setTurn(data.turn);
      setPage("game");
    });

    socket.on("room-joined", (data) => {
      console.log("📥 Jogo iniciado:", data);
      if (data.roomCode) setRoomCode(data.roomCode);
      setPlayerSymbol(data.symbol);
      setBoard(data.board);
      setTurn(data.turn);
      setPage("game");
    });

    socket.on("player-joined", (data) => {
      console.log("📥 Jogador entrou na sala:", data);
      setWaitingForPlayer(false);
      setLeftPlayer("");
      setBoard(data.board);
      setTurn(data.turn);
    });

    socket.on("move-made", (data) => {
      console.log("📥 Movimento recebido:", data);
      setBoard(data.board);
      setTurn(data.turn);
      setWinner(data.winner);
    });

    socket.on("player-left", (data) => {
      console.log("📥 Jogador saiu da sala:", data);
      setWaitingForPlayer(true);
      setLeftPlayer(data.leftSymbol);
    });

    socket.on("left-room", () => {
      setPage("home");
      setRoomCode("");
      setWaitingForPlayer(false);
      setLeftPlayer("");
      setPlayerSymbol("");
      setTurn("X");
      setBoard([]);
      setWinner(null);
    });

    socket.on("rematch-started", (data) => {
      console.log("📥 Revanche iniciada:", data);
      setBoard(data.board);
      setTurn(data.turn);
      setWinner(null);
    });

    socket.on("next-disappear", (data) => {
      console.log("📥 Next disappear:", data);
      setNextDisappear(data);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("room-created");
      socket.off("room-joined");
      socket.off("player-joined");
      socket.off("move-made");
      socket.off("player-left");
      socket.off("left-room");
      socket.off("rematch-started");
      socket.off("next-disappear");
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4 p-2">
      <h1 className="font-bold text-4xl text-[var(--foreground)] font-asimovian">
        INFINITE TIC-TAC-TOE
      </h1>
      {page === "home" && (
        <div className="flex flex-col items-center">
          <p className="mb-6 max-w-xl text-center text-lg text-gray-400">
            Play Infinite Tic Tac Toe online with your friends. An endless board
            version of the classic Tic Tac Toe, available for multiplayer
            matches in real time.
          </p>
          <div className="buttons">
            <Button
              primary
              onClick={() => {
                setPage("starting-room");
              }}
            >
              PLAY
            </Button>
          </div>
        </div>
      )}
      {page === "starting-room" && (
        <div className="buttons flex flex-col gap-4">
          <Button
            primary
            onClick={() => {
              setPage("create-room");
            }}
          >
            CREATE A ROOM
          </Button>
          <Button
            primary
            onClick={() => {
              setPage("join-room");
            }}
          >
            JOIN A ROOM
          </Button>
          <Button
            secondary
            onClick={() => {
              setPage("home");
            }}
          >
            BACK
          </Button>
        </div>
      )}
      {page === "create-room" && (
        <div className="buttons flex flex-col gap-4">
          <Button
            primary
            onClick={() => {
              socket.emit("create-room", { isPublic: true });
            }}
          >
            CREATE PUBLIC ROOM
          </Button>
          <Button
            primary
            onClick={() => {
              socket.emit("create-room", { isPublic: false });
            }}
          >
            CREATE PRIVATE ROOM
          </Button>
          <Button
            secondary
            onClick={() => {
              setPage("starting-room");
            }}
          >
            BACK
          </Button>
        </div>
      )}
      {page === "join-room" && (
        <div className="buttons flex flex-col gap-4">
          <Button
            primary
            onClick={() => {
              socket.emit("join-random-room");
            }}
          >
            JOIN RANDOM ROOM
          </Button>
          <div className="flex flex-row items-center justify-center">
            <input
              type="text"
              placeholder="Room Code"
              value={roomCode}
              onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
              className="border border-[var(--board-line)] px-4 py-2 rounded-xl mr-2 text-center w-full max-w-1/2"
              maxLength={6}
            />
            <Button
              primary
              className="w-full max-w-1/2"
              onClick={() => {
                socket.emit("join-room", { code: roomCode });
              }}
            >
              JOIN
            </Button>
          </div>
          <Button
            secondary
            onClick={() => {
              setPage("starting-room");
            }}
          >
            BACK
          </Button>
        </div>
      )}
      {page === "game" && (
        <div>
          <Status
            waitingForPlayer={waitingForPlayer}
            leftPlayer={leftPlayer}
            playerSymbol={playerSymbol}
            turn={turn}
            winner={winner}
            roomCode={roomCode}
          />
          <Board
            board={board}
            turn={turn}
            playerSymbol={playerSymbol}
            winner={winner}
            waitingForPlayer={waitingForPlayer}
            onMove={(index) => {
              socket.emit("make-move", { roomCode, index });
            }}
            nextDisappear={nextDisappear}
          />
          <div className="flex flex-col justify-center">
            {winner && (
              <Button
                primary
                className="mt-4"
                onClick={() => {
                  socket.emit("rematch", { roomCode });
                }}
              >
                REMATCH
              </Button>
            )}
            <Button
              secondary
              className="mt-4"
              onClick={() => {
                socket.emit("leave-room", { roomCode });
              }}
            >
              LEAVE ROOM
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
