"use client";

import React, { useCallback, useState } from "react";
import { Copy, Check } from "lucide-react";
import { copyElementToClipboard } from "@/lib/copyUtils";

interface CopyButtonProps {
  targetRef: React.RefObject<HTMLElement | null>;
  label?: string;
  size?: "sm" | "md";
}

export default function CopyButton({
  targetRef,
  label = "Copy",
  size = "sm",
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    if (!targetRef.current) return;
    await copyElementToClipboard(targetRef.current);
    setCopied(true);
    targetRef.current.classList.add("copy-flash");
    setTimeout(() => {
      setCopied(false);
      targetRef.current?.classList.remove("copy-flash");
    }, 1500);
  }, [targetRef]);

  const sizeClasses =
    size === "sm"
      ? "px-2.5 py-1 text-xs gap-1"
      : "px-3.5 py-1.5 text-sm gap-1.5";

  return (
    <button
      data-copy-exclude
      onClick={handleCopy}
      className={`inline-flex items-center ${sizeClasses} rounded-md font-medium transition-all duration-200 cursor-pointer ${
        copied
          ? "bg-emerald-100 text-emerald-700 border border-emerald-300"
          : "bg-white text-slate-600 border border-slate-300 hover:bg-indigo-50 hover:text-indigo-700 hover:border-indigo-300"
      }`}
    >
      {copied ? (
        <>
          <Check size={size === "sm" ? 12 : 14} />
          Copied!
        </>
      ) : (
        <>
          <Copy size={size === "sm" ? 12 : 14} />
          {label}
        </>
      )}
    </button>
  );
}
