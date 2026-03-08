"use client";

import React from "react";
import { Palette } from "lucide-react";
import { THEMES } from "@/lib/themes";
import { useTheme } from "@/lib/ThemeContext";

export default function ThemeSwitcher() {
  const { theme: activeTheme, setThemeById } = useTheme();

  return (
    <div
      data-copy-exclude
      className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm mb-6"
    >
      <div className="flex items-center gap-2 mb-3">
        <Palette size={16} className="text-slate-500" />
        <span className="text-sm font-semibold text-slate-700">
          Color Theme
        </span>
      </div>
      <div className="flex flex-wrap gap-2">
        {THEMES.map((t) => {
          const isActive = t.id === activeTheme.id;
          return (
            <button
              key={t.id}
              onClick={() => setThemeById(t.id)}
              className={`group flex items-center gap-2.5 px-3.5 py-2 rounded-lg border text-left transition-all duration-150 cursor-pointer ${
                isActive
                  ? "border-indigo-400 bg-indigo-50 ring-2 ring-indigo-200"
                  : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
              }`}
            >
              {/* Color swatches */}
              <div className="flex gap-0.5 shrink-0">
                {t.swatches.map((color, i) => (
                  <div
                    key={i}
                    className="w-4 h-4 rounded-sm"
                    style={{
                      backgroundColor: color,
                      border: "1px solid rgba(0,0,0,0.1)",
                    }}
                  />
                ))}
              </div>
              <div className="min-w-0">
                <p
                  className={`text-xs font-semibold leading-tight ${
                    isActive ? "text-indigo-700" : "text-slate-700"
                  }`}
                >
                  {t.name}
                </p>
                <p className="text-[10px] text-slate-400 leading-tight mt-0.5 truncate">
                  {t.description}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
