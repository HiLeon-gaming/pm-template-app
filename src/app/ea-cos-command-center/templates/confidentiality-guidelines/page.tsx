"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, Lock, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Guidelines", desc: "Classification + rules + checklist", icon: LayoutDashboard },
  { id: "compact", label: "Quick Rules", desc: "Essential rules only", icon: AlignJustify },
];

function ConfidentialityContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const classRef = useRef<HTMLDivElement>(null);
  const rulesRef = useRef<HTMLDivElement>(null);
  const checkRef = useRef<HTMLDivElement>(null);

  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };
  const accent = "#8B5CF6"; const accentDark = "#7C3AED";

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>🔒 CONFIDENTIALITY &amp; SENSITIVE NOTES GUIDELINES</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; EA / Chief of Staff Command Center &nbsp;|&nbsp; Start Here</td></tr>
    </tbody></table>
  );

  const renderClassification = () => (
    <div ref={classRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accent)}>🏷️ INFORMATION CLASSIFICATION LEVELS</td></tr></tbody></table>
      <CopyButton targetRef={classRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>Use these tags consistently when storing notes. Add the tag in brackets at the top of any sensitive page.</p>
      <table style={LT}><tbody><tr>
        {[
          { level: "PUBLIC", desc: "Can be shared externally. No restrictions.", color: "#059669", examples: "Press releases, published reports, company blog posts" },
          { level: "INTERNAL", desc: "For employees only. Not for external sharing.", color: "#0EA5E9", examples: "Org charts, internal processes, team meeting notes" },
          { level: "CONFIDENTIAL", desc: "Need-to-know basis. Limited distribution.", color: "#F59E0B", examples: "Financial forecasts, HR matters, pending decisions" },
          { level: "RESTRICTED", desc: "Highly sensitive. Exec eyes only.", color: "#DC2626", examples: "M&A activity, legal matters, personnel actions, board strategy" },
        ].map((item, i) => (
          <td key={i} style={{ ...LC, width: "25%", padding: i < 3 ? "0 4px 0 0" : "0" }}>
            <table style={S.tbl}><tbody>
              <tr><td style={{ backgroundColor: item.color, color: "#FFFFFF", padding: "8px 10px", fontFamily: S.font, fontSize: "13px", fontWeight: 800, border: `1.5px solid ${C.border}`, textAlign: "center" as const }}>🏷️ {item.level}</td></tr>
              <tr><td style={{ ...S.td0, textAlign: "center" as const, fontWeight: 600, fontSize: "10px", padding: "6px 8px" }}>{item.desc}</td></tr>
              <tr><td style={{ ...S.tdAlt, fontSize: "9px", padding: "6px 8px", fontStyle: "italic" }}>{item.examples}</td></tr>
            </tbody></table>
          </td>
        ))}
      </tr></tbody></table>
    </div>
  );

  const renderRules = () => (
    <div ref={rulesRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accentDark)}>📜 HANDLING RULES</td></tr></tbody></table>
      <CopyButton targetRef={rulesRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={S.thPrimary}>Rule</th>
          <th style={{ ...S.thPrimary, width: "50%" }}>How to Apply</th>
        </tr></thead>
        <tbody>
          {[
            { rule: "Default to INTERNAL", how: "If unsure, treat it as internal. Better to over-protect than under-protect." },
            { rule: "Label sensitive pages", how: "Add [CONFIDENTIAL] or [RESTRICTED] at the top of any sensitive page in your notebook." },
            { rule: "Separate sensitive notes", how: "Use a dedicated OneNote section for RESTRICTED content. Password-protect if possible." },
            { rule: "Never share via chat", how: "Sensitive topics should not be discussed in Slack/Teams channels. Use private messages or verbal." },
            { rule: "Redact before sharing", how: "When sharing meeting notes externally, remove confidential items first." },
            { rule: "Lock your screen", how: "Always lock your computer when stepping away. Exec notes should not be visible." },
            { rule: "Destroy when done", how: "Delete notes that are no longer needed. Don’t keep sensitive info “just in case.”" },
            { rule: "Know your audience", how: "Before sharing any document, ask: “Who should NOT see this?”" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 700, fontSize: "11px", color: accent }}>{r.rule}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.how}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderChecklist = () => (
    <div ref={checkRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner("#DC2626")}>✅ QUICK SELF-CHECK BEFORE SHARING</td></tr></tbody></table>
      <CopyButton targetRef={checkRef} label="Copy Section" />
      <table style={S.tbl}><tbody>
        {[
          "Is the classification label correct?",
          "Am I sharing with the right people only?",
          "Have I removed any RESTRICTED or CONFIDENTIAL items from shared versions?",
          "Would the exec be comfortable if this were forwarded?",
          "Is there a better way to share this (verbal, private message, in-person)?",
          "Have I checked for names, numbers, or details that should be redacted?",
        ].map((item, i) => {
          const bg = i % 2 === 1 ? C.rowAlt : C.white;
          return (
            <tr key={i}>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px", padding: "8px 14px" }}>☐ {item}</td>
            </tr>
          );
        })}
      </tbody></table>
    </div>
  );

  const renderFooter = () => (
    <table style={{ ...S.tbl, marginTop: "8px" }}><tbody><tr>
      <td style={{ backgroundColor: C.primary, color: C.footerText, padding: "8px 20px", fontSize: "10px", fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.06em" }}>
        ExecNoteShop &nbsp;&bull;&nbsp; EA / Chief of Staff Command Center &nbsp;&bull;&nbsp; &copy; 2026 All Rights Reserved
      </td>
    </tr></tbody></table>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50/30">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-purple-600 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-purple-50 border border-purple-100 text-purple-700 text-xs font-semibold"><Lock size={11} />Security</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/ea-cos-command-center" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-purple-600 transition-colors"><ArrowLeft size={14} />Back to EA/CoS Command Center</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center"><Lock size={20} className="text-purple-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">Confidentiality &amp; Sensitive Notes Guidelines</h2><p className="text-xs font-medium text-purple-600">How to Handle Sensitive Information</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Classification levels, handling rules, and a quick self-check before sharing sensitive executive information.</p>
        </div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">View Mode</p>
          <div className="flex flex-wrap gap-2">
            {LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (
              <button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-purple-600 text-white border-purple-600 shadow-md shadow-purple-200" : "bg-white text-slate-600 border-slate-200 hover:border-purple-300 hover:text-purple-700"}`}>
                <Icon size={15} /><span>{l.label}</span><span className={`text-[10px] font-medium ${isActive ? "text-purple-200" : "text-slate-400"}`}>{l.desc}</span>
              </button>
            ); })}
          </div>
        </div>
        <div ref={fullPageRef} style={{ fontFamily: S.font }}>
          {layout === "full" && <>{renderTitleBanner()}{renderClassification()}{renderRules()}{renderChecklist()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderClassification()}{renderRules()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function ConfidentialityGuidelinesPage() { return <ThemeProvider><ConfidentialityContent /></ThemeProvider>; }
