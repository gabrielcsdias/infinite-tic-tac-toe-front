"use client";
import { useState, useEffect } from "react";
import { io } from "socket.io-client";

export function useSocket() {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const URL =
      process.env.NEXT_PUBLIC_BACKEND_URL ||
      (process.env.NODE_ENV === "development" ? "http://localhost:3001" : "");

    const newSocket = io(URL, {
      transports: ["websocket"],
      withCredentials: true,
      autoConnect: true,
    });

    setSocket(newSocket);

    newSocket.on("connect", () =>
      console.log("✅ Socket conectado:", newSocket.id)
    );
    newSocket.on("disconnect", (reason) =>
      console.log("❌ Socket desconectado:", reason)
    );
    newSocket.on("connect_error", (err) =>
      console.error("⚠️ Erro de conexão socket:", err.message)
    );

    return () => newSocket.close();
  }, []);

  return socket;
}
