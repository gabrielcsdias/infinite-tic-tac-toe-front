import { io } from "socket.io-client";

const URL =
  process.env.NODE_ENV === "production"
    ? window.location.origin // produção: usa o mesmo domínio do frontend
    : "http://localhost:3001"; // dev: conecta ao servidor local

export const socket = io(URL, {
  transports: ["websocket"], // força websocket, evita long polling
  withCredentials: true, // envia cookies se precisar
  autoConnect: true, // conecta automaticamente
});

// logs úteis pra debug
socket.on("connect", () => {
  console.log("✅ Socket conectado:", socket.id);
});

socket.on("disconnect", (reason) => {
  console.log("❌ Socket desconectado:", reason);
});

socket.on("connect_error", (err) => {
  console.error("⚠️ Erro de conexão socket:", err.message);
});
