"use client";

import { useTheme } from "next-themes";
import { useEffect, useState, useRef, useSyncExternalStore } from "react";
import { Sun, Moon } from "lucide-react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";

const emptySubscribe = () => () => {};

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false);
  const shouldReduceMotion = useReducedMotion();
  const [showTooltip, setShowTooltip] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  if (!mounted) {
    return (
      <div className="w-9 h-9 rounded-full border border-black/5 dark:border-white/10 bg-transparent flex items-center justify-center">
        <span className="sr-only">Toggle theme</span>
      </div>
    );
  }

  const isDark = resolvedTheme === "dark";

  const toggleTheme = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setShowTooltip(false);
    setTheme(isDark ? "light" : "dark");
  };

  const handleMouseEnter = () => {
    timerRef.current = setTimeout(() => {
      setShowTooltip(true);
    }, 3000);
  };

  const handleMouseLeave = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setShowTooltip(false);
  };

  return (
    <div className="relative flex items-center" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <button
        onClick={toggleTheme}
        className="relative w-9 h-9 rounded-full border border-black/5 dark:border-white/10 bg-black/5 dark:bg-black/40 backdrop-blur-sm flex items-center justify-center text-muted-foreground hover:bg-black/10 dark:hover:bg-black/60 hover:text-foreground dark:hover:text-primary transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary touch-active group"
        aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      >
        <div className="relative w-4 h-4 flex items-center justify-center">
          <motion.div
            initial={false}
            animate={{
              scale: isDark ? 1 : 0,
              opacity: isDark ? 1 : 0,
              rotate: shouldReduceMotion ? 0 : (isDark ? 0 : 90),
            }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 flex items-center justify-center group-hover:drop-shadow-[0_0_8px_rgba(255,229,0,0.15)]"
          >
            <Sun className="w-4 h-4" />
          </motion.div>

          <motion.div
            initial={false}
            animate={{
              scale: isDark ? 0 : 1,
              opacity: isDark ? 0 : 1,
              rotate: shouldReduceMotion ? 0 : (isDark ? -90 : 0),
            }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <Moon className="w-4 h-4" />
          </motion.div>
        </div>
      </button>

      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute top-[calc(100%+0.5rem)] right-0 md:right-auto md:left-1/2 md:-translate-x-1/2 whitespace-nowrap px-3 py-1.5 bg-foreground text-background text-[10px] uppercase tracking-widest font-medium rounded-md pointer-events-none z-50 shadow-md"
          >
            Switch to {isDark ? "light" : "dark"} mode
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
