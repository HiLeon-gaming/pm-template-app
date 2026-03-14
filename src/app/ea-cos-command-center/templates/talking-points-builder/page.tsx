"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, MessageSquare, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Builder", desc: "Messages + objections + phrasing options", icon: LayoutDashboard },
  { id: "compact", label: "Quick Points", desc: "Key messages only", icon: AlignJustify },
];

function TalkingPointsContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const contextRef = useRef<HTMLDivElement>(null);
  const pointsRef = useRef<HTMLDivElement>(null);
  const objectionsRef = useRef<HTMLDivElement>(null);

  const accent = "#F59E0B";

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>EXEC TALKING POINTS BUILDER</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; EA / Chief of Staff Command Center &nbsp;|&nbsp; Meetings Engine</td></tr>
    </tbody></table>
  );

  const renderContext = () => (
    <div ref={contextRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(accent)}>CONTEXT</div>
      <CopyButton targetRef={contextRef} label="Copy Section" />
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "22%" }}>Occasion / Event</td><td style={{ ...S.td0, fontWeight: 700 }}>[Meeting name, presentation, call, email]</td></tr>
        <tr><td style={S.tdLabelAlt}>Audience</td><td style={S.tdAlt}>[Who is the exec speaking to?]</td></tr>
        <tr><td style={S.tdLabel}>Goal of Communication</td><td style={{ ...S.td0, fontWeight: 700, color: accent }}>[Inform / Persuade / Align / Decide / Inspire]</td></tr>
        <tr><td style={S.tdLabelAlt}>Tone</td><td style={S.tdAlt}>[Formal / Conversational / Urgent / Reassuring]</td></tr>
      </tbody></table>
    </div>
  );

  const renderPoints = () => (
    <div ref={pointsRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner("#059669")}>KEY MESSAGES</div>
      <CopyButton targetRef={pointsRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "5%", textAlign: "center" as const }}>#</th>
          <th style={{ ...S.thPrimary, width: "25%" }}>Message Theme</th>
          <th style={S.thPrimary}>Suggested Phrasing</th>
          <th style={{ ...S.thPrimary, width: "20%" }}>Supporting Data / Proof</th>
        </tr></thead>
        <tbody>
          {[
            { theme: "[Opening / Context]", phrasing: "[\"Thanks for making time. Today I want to share where we stand on X and get your input on Y.\"]", data: "[N/A — rapport building]" },
            { theme: "[Core Message]", phrasing: "[\"We've seen a 25% improvement in Q1 results driven by our focus on operational efficiency.\"]", data: "[Q1 dashboard, page 3]" },
            { theme: "[The Ask / Proposal]", phrasing: "[\"I'd like to propose we invest in X to capitalize on this momentum.\"]", data: "[Business case, ROI model]" },
            { theme: "[Addressing Concerns]", phrasing: "[\"I know there are concerns about cost — here's how we mitigate that risk.\"]", data: "[Risk mitigation plan]" },
            { theme: "[Close / Next Steps]", phrasing: "[\"If we're aligned, here's what happens next. I'll send a recap by EOD.\"]", data: "[Action plan ready]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 800, fontSize: "14px", color: accent }}>{i + 1}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 600 }}>{r.theme}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontStyle: "italic" }}>{r.phrasing}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.data}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderObjections = () => (
    <div ref={objectionsRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner("#DC2626")}>ANTICIPATED OBJECTIONS &amp; RESPONSES</div>
      <CopyButton targetRef={objectionsRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={S.thPrimary}>If They Say...</th>
          <th style={S.thPrimary}>Respond With...</th>
        </tr></thead>
        <tbody>
          {[
            { obj: "[\"This is too expensive.\"]", resp: "[\"The ROI analysis shows payback in 6 months. Here's the data...\"]" },
            { obj: "[\"We need more time to evaluate.\"]", resp: "[\"I understand. Can we agree on a decision date? Delay costs us X per week.\"]" },
            { obj: "[\"What about the competition?\"]", resp: "[\"Our approach differentiates because...\"]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 600, color: "#DC2626" }}>{r.obj}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontStyle: "italic", color: "#059669" }}>{r.resp}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderFooter = () => (
    <table style={{ ...S.tbl, marginTop: "8px" }}><tbody><tr>
      <td style={{ backgroundColor: C.primary, color: C.footerText, padding: "8px 20px", fontSize: "10px", fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.06em" }}>
        ExecNoteShop &bull; EA / Chief of Staff Command Center &bull; &copy; 2026 All Rights Reserved
      </td>
    </tr></tbody></table>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-amber-50/30">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-amber-500 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-100 text-amber-700 text-xs font-semibold"><MessageSquare size={11} />Points</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/ea-cos-command-center" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-amber-600 transition-colors"><ArrowLeft size={14} />Back to EA/CoS Command Center</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center"><MessageSquare size={20} className="text-amber-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">Exec Talking Points Builder</h2><p className="text-xs font-medium text-amber-600">Key Messages + Phrasing + Objection Prep</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Key messages, phrasing options, objections, responses. Fast prep for any exec communication.</p>
        </div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">View Mode</p>
          <div className="flex flex-wrap gap-2">
            {LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (
              <button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-amber-500 text-white border-amber-500 shadow-md shadow-amber-200" : "bg-white text-slate-600 border-slate-200 hover:border-amber-300 hover:text-amber-700"}`}>
                <Icon size={15} /><span>{l.label}</span><span className={`text-[10px] font-medium ${isActive ? "text-amber-200" : "text-slate-400"}`}>{l.desc}</span>
              </button>
            ); })}
          </div>
        </div>
        <div ref={fullPageRef} style={{ fontFamily: S.font }}>
          {layout === "full" && <>{renderTitleBanner()}{renderContext()}{renderPoints()}{renderObjections()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderContext()}{renderPoints()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function TalkingPointsBuilderPage() { return <ThemeProvider><TalkingPointsContent /></ThemeProvider>; }
