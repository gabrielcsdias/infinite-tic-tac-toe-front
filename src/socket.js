"use client";

import { io } from "socket.io-client";

const URL =
  process.env.NODE_ENV === "production"
    ? window.location.origin
    : "http://localhost:3001";

export const socket = io(URL, {
  transports: ["websocket"],
  withCredentials: true,
  autoConnect: true,
});

socket.on("connect", () => {
  console.log("✅ Socket conectado:", socket.id);
});

socket.on("disconnect", (reason) => {
  console.log("❌ Socket desconectado:", reason);
});

socket.on("connect_error", (err) => {
  console.error("⚠️ Erro de conexão socket:", err.message);
});
