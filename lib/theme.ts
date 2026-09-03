"use client";

import { useCallback, useEffect, useState } from "react";

export const THEME_KEY = "corestate-theme";
export type Theme = "light" | "dark";

export function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.classList.toggle("dark", theme === "dark");
  root.classList.toggle("light", theme === "light");
  root.style.colorScheme = theme;
}

function persistTheme(theme: Theme) {
  localStorage.setItem(THEME_KEY, theme);
  document.cookie = `${THEME_KEY}=${theme}; Path=/; Max-Age=31536000; SameSite=Lax`;
}

export function readTheme(): Theme {
  if (typeof document === "undefined") return "light";
  if (document.documentElement.classList.contains("dark")) return "dark";
  if (document.documentElement.classList.contains("light")) return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>("light");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setTheme(readTheme());
    setReady(true);

    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onSystem = () => {
      if (localStorage.getItem(THEME_KEY)) return;
      const next: Theme = mq.matches ? "dark" : "light";
      applyTheme(next);
      setTheme(next);
    };
    mq.addEventListener("change", onSystem);
    return () => mq.removeEventListener("change", onSystem);
  }, []);

  const toggle = useCallback(() => {
    const next: Theme = readTheme() === "dark" ? "light" : "dark";
    applyTheme(next);
    persistTheme(next);
    setTheme(next);
  }, []);

  return { theme, toggle, ready };
}
