"use client";
import { motion, AnimatePresence } from "framer-motion";
import Spinner from "../ui/Spinner";
import { IconTrophy } from "../ui/Icons";
import { toast } from "sonner";

export default function Status({
  waitingForPlayer,
  leftPlayer,
  playerSymbol,
  turn,
  winner,
  roomCode,
  scores = { X: 0, O: 0 },
}) {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(roomCode);
    toast.success("Room code copied!");
  };

  const xColor = "var(--accent-x)";
  const oColor = "var(--accent-o)";
  const primaryColor = "var(--primary)";
  const mutedColor = "var(--muted)";

  return (
    <motion.div
      className="mb-6"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="card p-4 mb-4">
        <div className="flex flex-row justify-center gap-4 text-sm sm:text-base">
          <motion.button
            className="flex items-center gap-2 bg-[var(--board-bg)] px-3 py-1.5 rounded-lg hover:opacity-70 transition-opacity text-sm"
            onClick={copyToClipboard}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="text-[var(--muted)]">Room</span>
            <span className="font-mono font-medium tracking-wider">
              {roomCode}
            </span>
          </motion.button>
          <div className="flex items-center gap-2 bg-[var(--board-bg)] px-3 py-1.5 rounded-lg text-sm">
            <span className="text-[var(--muted)]">You</span>
            <span className="font-bold" style={{ color: playerSymbol === "X" ? xColor : oColor }}>
              {playerSymbol}
            </span>
          </div>
        </div>
      </div>

      <div className="text-center">
        <AnimatePresence mode="wait">
          {leftPlayer ? (
            <motion.div
              key="left"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="flex flex-col items-center gap-1"
            >
              <span className="text-sm">Player <span className="font-bold">{leftPlayer}</span> left</span>
              <span className="text-xs text-[var(--muted)]">Waiting for new opponent...</span>
            </motion.div>
          ) : waitingForPlayer ? (
            <motion.div
              key="waiting"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center justify-center gap-2"
            >
              <Spinner size="sm" />
              <span className="text-sm">Waiting for opponent...</span>
            </motion.div>
          ) : winner ? (
            <motion.div
              key="winner"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center gap-2"
            >
              <IconTrophy
                className="w-6 h-6"
                color={winner === "X" ? xColor : oColor}
              />
              <span className="font-medium" style={{ color: primaryColor }}>
                {winner} Wins
              </span>
              <span className="text-sm text-[var(--muted)]">
                {scores.X} - {scores.O}
              </span>
            </motion.div>
          ) : turn === playerSymbol ? (
            <motion.div
              key="your-turn"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm font-medium"
              style={{ color: primaryColor }}
            >
              Your turn
            </motion.div>
          ) : (
            <motion.div
              key="waiting-opponent"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm"
              style={{ color: mutedColor }}
            >
              Waiting...
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
