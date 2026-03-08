"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, Zap, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Capture", desc: "Header + notes + decisions + actions", icon: LayoutDashboard },
  { id: "compact", label: "Ultra-Quick", desc: "Minimal fields only", icon: AlignJustify },
];

function QuickCaptureContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const captureRef = useRef<HTMLDivElement>(null);

  const accent = "#3B82F6"; const accentDark = "#2563EB";

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>⚡ MEETING NOTES QUICK CAPTURE</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; Meetings Hub Pro &nbsp;|&nbsp; ⭐ All-Star &nbsp;|&nbsp; 30-Second Setup</td></tr>
    </tbody></table>
  );

  const renderHeader = () => (
    <div ref={headerRef} style={{ marginBottom: "12px" }}>
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "18%" }}>Meeting</td><td style={{ ...S.td0, width: "32%" }}>[Title / Who called it]</td><td style={{ ...S.tdLabel, width: "18%" }}>Date / Time</td><td style={{ ...S.td0, width: "32%" }}>[MM/DD/YYYY HH:MM]</td></tr>
        <tr><td style={S.tdLabelAlt}>With</td><td style={S.tdAlt}>[Attendees]</td><td style={S.tdLabelAlt}>Type</td><td style={{ ...S.tdAlt, fontWeight: 600 }}>[Ad-hoc / Quick call / Check-in]</td></tr>
      </tbody></table>
      <CopyButton targetRef={headerRef} label="Copy Section" />
    </div>
  );

  const renderCapture = () => (
    <div ref={captureRef} style={{ marginBottom: "12px" }}>
      <CopyButton targetRef={captureRef} label="Copy Section" />
      <div style={S.sectionBanner(accent)}>📝 WHAT WAS DISCUSSED</div>
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.td0, minHeight: "80px", padding: "12px 14px", fontSize: "11px", lineHeight: "1.8" }}>
          [Free-form notes. Just capture the key points.]<br /><br />
          &bull;&nbsp;<br />
          &bull;&nbsp;<br />
          &bull;&nbsp;
        </td></tr>
      </tbody></table>

      <div style={{ ...S.sectionBanner(accentDark), marginTop: "8px" }}>📌 DECISIONS MADE</div>
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.td0, padding: "10px 14px", fontSize: "11px", lineHeight: "1.8" }}>
          1.&nbsp;[Decision]<br />
          2.&nbsp;[Decision]<br />
          3.&nbsp;[Decision]
        </td></tr>
      </tbody></table>

      <div style={{ ...S.sectionBanner(accent), marginTop: "8px" }}>✅ ACTION ITEMS</div>
      <table style={S.tbl}>
        <thead><tr>
          <th style={S.thPrimary}>Action</th>
          <th style={{ ...S.thPrimary, width: "18%" }}>Owner</th>
          <th style={{ ...S.thPrimary, width: "14%", textAlign: "center" as const }}>Due</th>
        </tr></thead>
        <tbody>
          {[1, 2, 3, 4].map((i) => (
            <tr key={i}>
              <td style={{ ...(i % 2 === 0 ? S.tdAlt : S.td0), fontSize: "11px" }}>[Action item]</td>
              <td style={{ ...(i % 2 === 0 ? S.tdAlt : S.td0), fontSize: "10px" }}>[Name]</td>
              <td style={{ ...(i % 2 === 0 ? S.tdAlt : S.td0), textAlign: "center" as const, fontSize: "10px", fontWeight: 700, color: accent }}>[Date]</td>
            </tr>
          ))}
        </tbody>
      </table>

      {layout === "full" && (
        <>
          <div style={{ ...S.sectionBanner("#EA580C"), marginTop: "8px" }}>🅿️ PARKING LOT / FOLLOW-UP</div>
          <table style={S.tbl}><tbody>
            <tr><td style={{ ...S.td0, padding: "10px 14px", fontSize: "11px", lineHeight: "1.8" }}>
              &bull; [Topic to revisit later]<br />
              &bull; [Topic to bring to next meeting]<br />
              &bull; [Person to loop in]
            </td></tr>
          </tbody></table>
          <table style={{ ...S.tbl, marginTop: "4px" }}><tbody>
            <tr><td style={{ ...S.tdLabel, width: "22%" }}>Follow-up needed?</td><td style={S.td0}>[Yes / No — If yes, who sends the recap?]</td></tr>
            <tr><td style={S.tdLabelAlt}>Next meeting?</td><td style={S.tdAlt}>[Schedule? Same group? Different topic?]</td></tr>
          </tbody></table>
        </>
      )}
    </div>
  );

  const renderFooter = () => (
    <table style={{ ...S.tbl, marginTop: "8px" }}><tbody><tr>
      <td style={{ backgroundColor: C.primary, color: C.footerText, padding: "8px 20px", fontSize: "10px", fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.06em" }}>
        ExecNoteShop &nbsp;&bull;&nbsp; Meetings Hub Pro &nbsp;&bull;&nbsp; &copy; 2026 All Rights Reserved
      </td>
    </tr></tbody></table>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-blue-500 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-semibold"><Zap size={11} />⭐ All-Star</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/meetings-hub" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-blue-600 transition-colors"><ArrowLeft size={14} />Back to Meetings Hub Pro</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center"><Zap size={20} className="text-blue-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">Meeting Notes Quick Capture</h2><p className="text-xs font-medium text-blue-600">⭐ All-Star &mdash; 30-Second Setup for Ad-Hoc Calls</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Ultra-fast page for unplanned calls and quick meetings. Just capture what matters: notes, decisions, actions.</p>
        </div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">View Mode</p>
          <div className="flex flex-wrap gap-2">
            {LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (
              <button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-blue-500 text-white border-blue-500 shadow-md shadow-blue-200" : "bg-white text-slate-600 border-slate-200 hover:border-blue-300 hover:text-blue-700"}`}>
                <Icon size={15} /><span>{l.label}</span><span className={`text-[10px] font-medium ${isActive ? "text-blue-200" : "text-slate-400"}`}>{l.desc}</span>
              </button>
            ); })}
          </div>
        </div>
        <div ref={fullPageRef} style={{ fontFamily: S.font }}>
          {renderTitleBanner()}{renderHeader()}{renderCapture()}{renderFooter()}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function QuickCapturePage() { return <ThemeProvider><QuickCaptureContent /></ThemeProvider>; }
