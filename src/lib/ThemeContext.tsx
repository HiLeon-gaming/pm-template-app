"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import {
  type TemplateTheme,
  type ThemeColors,
  THEMES,
  DEFAULT_THEME,
  buildStyles,
} from "./themes";

interface ThemeContextValue {
  theme: TemplateTheme;
  colors: ThemeColors;
  styles: ReturnType<typeof buildStyles>;
  setThemeById: (id: string) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<TemplateTheme>(DEFAULT_THEME);

  const setThemeById = useCallback((id: string) => {
    const found = THEMES.find((t) => t.id === id);
    if (found) setTheme(found);
  }, []);

  const value: ThemeContextValue = {
    theme,
    colors: theme.colors,
    styles: buildStyles(theme.colors),
    setThemeById,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within a ThemeProvider");
  return ctx;
}
