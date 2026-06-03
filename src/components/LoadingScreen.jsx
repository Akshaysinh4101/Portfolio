import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const LoadingScreen = ({ onComplete }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 1200; // 1.2s total loading time
    const intervalTime = 12;
    const increment = 100 / (duration / intervalTime);

    const timer = setInterval(() => {
      setCount((prev) => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            onComplete();
          }, 300);
          return 100;
        }
        return Math.floor(next);
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -100, transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-between bg-[#050508] p-10 select-none"
    >
      {/* Top Decorator */}
      <div className="w-full flex justify-between text-xs text-slate-500 font-mono tracking-widest uppercase">
        <span>Systems Online</span>
        <span>Akshaysinh Vaghela © 2026</span>
      </div>

      {/* Center Text Reveal */}
      <div className="flex flex-col items-center gap-4">
        <div className="overflow-hidden">
          <motion.h1
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="heading-font text-3xl md:text-5xl font-bold tracking-tight text-white"
          >
            AKSHAYSINH
          </motion.h1>
        </div>
        <div className="overflow-hidden">
          <motion.p
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
            className="text-xs md:text-sm font-mono text-purple-400 tracking-[0.25em] uppercase"
          >
            Senior Backend Architect
          </motion.p>
        </div>
      </div>

      {/* Counter Progress */}
      <div className="w-full max-w-md flex flex-col gap-3">
        <div className="flex items-end justify-between font-mono">
          <span className="text-xs text-slate-500 uppercase tracking-wider">Initializing Portfolios</span>
          <span className="text-3xl md:text-4xl font-light text-purple-400">{count}%</span>
        </div>
        <div className="h-[2px] w-full bg-white/5 overflow-hidden rounded-full">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${count}%` }}
            transition={{ ease: "easeInOut" }}
            className="h-full bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500"
          />
        </div>
      </div>
    </motion.div>
  );
};
export default LoadingScreen;
