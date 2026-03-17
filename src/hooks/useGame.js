import { useState, useEffect, useCallback } from "react";
import { socket } from "@/lib/socket";
import { toast } from "sonner";

export function useGame() {
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(true);
  const [page, setPage] = useState("home");
  const [roomCode, setRoomCode] = useState("");
  const [waitingForPlayer, setWaitingForPlayer] = useState(false);
  const [leftPlayer, setLeftPlayer] = useState("");
  const [playerSymbol, setPlayerSymbol] = useState("");
  const [turn, setTurn] = useState("X");
  const [board, setBoard] = useState([]);
  const [winner, setWinner] = useState(null);
  const [nextDisappear, setNextDisappear] = useState(null);
  const [isJoining, setIsJoining] = useState(false);
  const [scores, setScores] = useState({ X: 0, O: 0 });

  useEffect(() => {
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
      setScores(data.scores || { X: 0, O: 0 });
      setPage("game");
    });

    socket.on("room-joined", (data) => {
      setIsJoining(false);
      if (data.roomCode) setRoomCode(data.roomCode);
      setScores(data.scores || { X: 0, O: 0 });
      setPlayerSymbol(data.symbol);
      setBoard(data.board);
      setTurn(data.turn);
      setPage("game");
    });

    socket.on("player-joined", (data) => {
      setWaitingForPlayer(false);
      setLeftPlayer("");
      setWinner(null);
      setBoard(data.board);
      setTurn(data.turn);
      setScores(data.scores || { X: 0, O: 0 });
    });

    socket.on("move-made", (data) => {
      setBoard(data.board);
      setTurn(data.turn);
      setWinner(data.winner);
      if (data.scores) setScores(data.scores);
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
      setScores({ X: 0, O: 0 });
    });

    socket.on("rematch-started", (data) => {
      setBoard(data.board);
      setTurn(data.turn);
      setWinner(null);
      if (data.scores) setScores(data.scores);
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

  const handleCreateRoom = useCallback((isPublic) => {
    socket.emit("create-room", { isPublic });
  }, []);

  const handleJoinRoom = useCallback((code = null) => {
    setIsJoining(true);
    socket.emit(code ? "join-room" : "join-random-room", code ? { code } : {});
  }, []);

  const handleLeaveRoom = useCallback(() => {
    socket.emit("leave-room", { roomCode });
  }, [roomCode]);

  const handleRematch = useCallback(() => {
    socket.emit("rematch", { roomCode });
  }, [roomCode]);

  const handleMove = useCallback((index) => {
    socket.emit("make-move", { roomCode, index });
  }, [roomCode]);

  return {
    // States
    isConnected,
    isConnecting,
    page,
    roomCode,
    waitingForPlayer,
    leftPlayer,
    playerSymbol,
    turn,
    board,
    winner,
    nextDisappear,
    isJoining,
    scores,
    // Page setters
    setPage,
    setRoomCode,
    setIsJoining,
    // Actions
    handleCreateRoom,
    handleJoinRoom,
    handleLeaveRoom,
    handleRematch,
    handleMove,
  };
}
