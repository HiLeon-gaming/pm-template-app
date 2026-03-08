"use client";

import React, { useCallback, useState } from "react";
import { ClipboardCopy, Check } from "lucide-react";
import { copyElementToClipboard } from "@/lib/copyUtils";

interface CopyAllButtonProps {
  targetRef: React.RefObject<HTMLElement | null>;
}

export default function CopyAllButton({ targetRef }: CopyAllButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    if (!targetRef.current) return;
    await copyElementToClipboard(targetRef.current);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [targetRef]);

  return (
    <button
      data-copy-exclude
      onClick={handleCopy}
      className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-sm transition-all duration-200 cursor-pointer shadow-sm ${
        copied
          ? "bg-emerald-600 text-white shadow-emerald-200"
          : "bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-200"
      }`}
    >
      {copied ? (
        <>
          <Check size={16} />
          Entire Template Copied!
        </>
      ) : (
        <>
          <ClipboardCopy size={16} />
          Copy Entire Template
        </>
      )}
    </button>
  );
}
