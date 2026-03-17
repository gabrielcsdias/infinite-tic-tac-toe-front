"use client";
import { motion, AnimatePresence } from "framer-motion";
import Board from "@/components/game/Board";
import Status from "@/components/game/Status";
import Button from "@/components/ui/Button";
import Spinner from "@/components/ui/Spinner";
import { socket } from "@/socket";
import React from "react";
import { toast } from "sonner";
import { IconRefresh, IconCopy } from "@/components/ui/Icons";

const pageVariants = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
};

export default function Home() {
  const [isConnected, setIsConnected] = React.useState(false);
  const [isConnecting, setIsConnecting] = React.useState(true);
  const [page, setPage] = React.useState("home");
  const [roomCode, setRoomCode] = React.useState("");
  const [waitingForPlayer, setWaitingForPlayer] = React.useState(false);
  const [leftPlayer, setLeftPlayer] = React.useState("");
  const [playerSymbol, setPlayerSymbol] = React.useState("");
  const [turn, setTurn] = React.useState("X");
  const [board, setBoard] = React.useState([]);
  const [winner, setWinner] = React.useState(null);
  const [nextDisappear, setNextDisappear] = React.useState(null);
  const [isJoining, setIsJoining] = React.useState(false);

  React.useEffect(() => {
    if (!socket) return;

    const handleConnect = () => {
      setIsConnected(true);
      setIsConnecting(false);
    };

    const handleDisconnect = () => {
      setIsConnected(false);
      setIsConnecting(true);
    };

    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);

    socket.on("room-created", (data) => {
      setIsJoining(false);
      setWaitingForPlayer(true);
      setRoomCode(data.code);
      setPlayerSymbol(data.symbol);
      setBoard(data.board);
      setTurn(data.turn);
      setPage("game");
    });

    socket.on("room-joined", (data) => {
      setIsJoining(false);
      if (data.roomCode) setRoomCode(data.roomCode);
      setPlayerSymbol(data.symbol);
      setBoard(data.board);
      setTurn(data.turn);
      setPage("game");
    });

    socket.on("player-joined", (data) => {
      setWaitingForPlayer(false);
      setLeftPlayer("");
      setBoard(data.board);
      setTurn(data.turn);
    });

    socket.on("move-made", (data) => {
      setBoard(data.board);
      setTurn(data.turn);
      setWinner(data.winner);
    });

    socket.on("player-left", (data) => {
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
      setBoard(data.board);
      setTurn(data.turn);
      setWinner(null);
    });

    socket.on("next-disappear", (data) => {
      setNextDisappear(data);
    });

    socket.on("error", (data) => {
      toast.error(data);
      setIsJoining(false);
    });

    if (socket.connected) {
      setIsConnecting(false);
    }

    return () => {
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
      socket.off("room-created");
      socket.off("room-joined");
      socket.off("player-joined");
      socket.off("move-made");
      socket.off("player-left");
      socket.off("left-room");
      socket.off("rematch-started");
      socket.off("next-disappear");
      socket.off("error");
    };
  }, []);

  const handleCreateRoom = (isPublic) => {
    socket.emit("create-room", { isPublic });
  };

  const handleJoinRoom = (code = null) => {
    setIsJoining(true);
    socket.emit(code ? "join-room" : "join-random-room", code ? { code } : {});
  };

  const renderPage = () => {
    switch (page) {
      case "home":
        return (
          <motion.div
            key="home"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="flex flex-col items-center text-center"
          >

            <p className="mb-8 max-w-md text-base sm:text-lg text-[var(--muted)] leading-relaxed">
              Play Infinite Tic Tac Toe online with friends. An endless board
              version of the classic game with real-time multiplayer.
            </p>
            <Button primary onClick={() => setPage("starting-room")}>
              PLAY NOW
            </Button>
            {!isConnected && !isConnecting && (
              <p className="mt-4 text-sm text-[var(--error)]">
                Server disconnected
              </p>
            )}
          </motion.div>
        );

      case "starting-room":
        return (
          <motion.div
            key="starting-room"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="flex flex-col gap-4 w-full max-w-xs"
          >
            <h2 className="text-xl font-semibold text-center mb-2">
              Choose Option
            </h2>
            <Button primary onClick={() => { setIsJoining(false); setPage("create-room"); }}>
              CREATE A ROOM
            </Button>
            <Button primary onClick={() => { setIsJoining(false); setRoomCode(""); setPage("join-room"); }}>
              JOIN A ROOM
            </Button>
            <Button secondary onClick={() => setPage("home")}>
              BACK
            </Button>
          </motion.div>
        );

      case "create-room":
        return (
          <motion.div
            key="create-room"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="flex flex-col gap-4 w-full max-w-xs"
          >
            <h2 className="text-xl font-semibold text-center mb-2">
              Create Room
            </h2>
            <Button primary onClick={() => handleCreateRoom(true)}>
              PUBLIC ROOM
            </Button>
            <Button primary onClick={() => handleCreateRoom(false)}>
              PRIVATE ROOM
            </Button>
            <Button secondary onClick={() => setPage("starting-room")}>
              BACK
            </Button>
          </motion.div>
        );

      case "join-room":
        return (
          <motion.div
            key="join-room"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="flex flex-col gap-4 w-full max-w-xs"
          >
            <h2 className="text-xl font-semibold text-center mb-2">
              Join Room
            </h2>
            <Button
              primary
              onClick={() => handleJoinRoom()}
              loading={isJoining}
            >
              JOIN RANDOM
            </Button>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Room Code"
                value={roomCode}
                onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
                className="flex-1 border-2 border-[var(--border)] rounded-xl text-center font-mono text-lg bg-[var(--card)] text-[var(--foreground)]"
                maxLength={6}
              />
              <Button
                primary
                onClick={() => handleJoinRoom(roomCode)}
                loading={isJoining}
                disabled={roomCode.length < 4}
              >
                JOIN
              </Button>
            </div>
            <Button secondary onClick={() => setPage("starting-room")}>
              BACK
            </Button>
          </motion.div>
        );

      case "game":
        return (
          <motion.div
            key="game"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="flex flex-col items-center"
          >
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
            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              {winner && (
                <Button
                  primary
                  icon={IconRefresh}
                  onClick={() => {
                    socket.emit("rematch", { roomCode });
                  }}
                >
                  REMATCH
                </Button>
              )}
              <Button
                secondary
                onClick={() => {
                  socket.emit("leave-room", { roomCode });
                }}
              >
                LEAVE ROOM
              </Button>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6">
      <motion.h1
        className="font-bold text-2xl sm:text-3xl md:text-4xl text-center mb-8 tracking-tight"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Infinite Tic-Tac-Toe
      </motion.h1>

      {isConnecting ? (
        <motion.div
          className="flex flex-col items-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <Spinner size="xl" className="text-[var(--primary)]" />
          <p className="text-[var(--muted)]">Connecting to server...</p>
        </motion.div>
      ) : (
        <AnimatePresence mode="wait">{renderPage()}</AnimatePresence>
      )}

      <motion.div
        className="fixed bottom-4 text-xs text-[var(--muted)]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        {isConnected ? (
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[var(--success)]" />
            Connected
          </span>
        ) : (
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[var(--error)]" />
            Disconnected
          </span>
        )}
      </motion.div>
    </div>
  );
}
