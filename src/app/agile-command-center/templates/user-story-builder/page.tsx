"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, PenTool, LayoutDashboard, AlignJustify, Zap } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Builder", desc: "Story + AC + details", icon: LayoutDashboard },
  { id: "compact", label: "Quick Story", desc: "Story + AC only", icon: AlignJustify },
];

function UserStoryBuilderContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const storyRef = useRef<HTMLDivElement>(null);
  const acRef = useRef<HTMLDivElement>(null);
  const detailRef = useRef<HTMLDivElement>(null);
  const edgeRef = useRef<HTMLDivElement>(null);

  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };
  const accent = "#EF4444"; const accentDark = "#B91C1C";

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>✏️ USER STORY + ACCEPTANCE CRITERIA BUILDER</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; Agile / Scrum Delivery Command Center &nbsp;|&nbsp; ⭐ All-Star &nbsp;|&nbsp; Backlog System</td></tr>
    </tbody></table>
  );

  const renderStory = () => (
    <div ref={storyRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accent)}>📝 USER STORY</td></tr></tbody></table>
      <CopyButton targetRef={storyRef} label="Copy Section" />
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "18%" }}>Story ID</td><td style={{ ...S.td0, width: "32%" }}>[S-###]</td><td style={{ ...S.tdLabel, width: "18%" }}>Epic</td><td style={{ ...S.td0, width: "32%" }}>[Epic Name / ID]</td></tr>
        <tr><td style={S.tdLabelAlt}>Sprint</td><td style={S.tdAlt}>[Sprint #]</td><td style={S.tdLabelAlt}>Points</td><td style={S.tdAlt}>[## pts]</td></tr>
        <tr><td style={{ ...S.tdLabel, fontWeight: 700, color: accent }}>Priority</td><td style={S.td0}><span style={S.badge(C.badgeRedBg, C.badgeRedFg)}>[Must / Should / Could]</span></td><td style={S.tdLabel}>Assigned To</td><td style={S.td0}>[Developer Name]</td></tr>
      </tbody></table>
      <table style={{ ...S.tbl, marginTop: "4px" }}><tbody>
        <tr><td style={{ backgroundColor: accent + "15", padding: "14px 16px", fontFamily: S.font, fontSize: "13px", fontWeight: 700, border: `1.5px solid ${accent}40`, color: C.primary }}>
          As a <span style={{ color: accent, fontWeight: 800 }}>[type of user]</span>,<br />
          I want <span style={{ color: accent, fontWeight: 800 }}>[goal / action]</span>,<br />
          So that <span style={{ color: accent, fontWeight: 800 }}>[benefit / value]</span>.
        </td></tr>
      </tbody></table>
    </div>
  );

  const renderAC = () => (
    <div ref={acRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accentDark)}>✅ ACCEPTANCE CRITERIA (Given/When/Then)</td></tr></tbody></table>
      <CopyButton targetRef={acRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>Each AC = one testable scenario. If all pass, the story is done.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "5%", textAlign: "center" as const }}>AC#</th>
          <th style={{ ...S.thPrimary, width: "28%" }}>GIVEN (Context)</th>
          <th style={{ ...S.thPrimary, width: "28%" }}>WHEN (Action)</th>
          <th style={S.thPrimary}>THEN (Expected Result)</th>
          <th style={{ ...S.thPrimary, width: "7%", textAlign: "center" as const }}>Pass?</th>
        </tr></thead>
        <tbody>
          {[
            { g: "[I am on the checkout page with items in my cart]", w: "[I click “Place Order”]", t: "[I see order confirmation with order number and email is sent]", pass: "☐" },
            { g: "[I enter an invalid credit card number]", w: "[I click “Pay”]", t: "[I see a clear error message and can retry without losing my cart]", pass: "☐" },
            { g: "[I have a saved address from a previous order]", w: "[I start checkout]", t: "[My saved address is pre-filled and I can edit or confirm]", pass: "☐" },
            { g: "[Add context]", w: "[Add action]", t: "[Add expected result]", pass: "☐" },
            { g: "[Add context]", w: "[Add action]", t: "[Add expected result]", pass: "☐" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 800, color: accent, fontSize: "12px" }}>{i + 1}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.g}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.w}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.t}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "15px" }}>{r.pass}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderDetail = () => (
    <div ref={detailRef} style={{ marginBottom: "12px" }}>
      <table style={LT}><tbody><tr>
        <td style={{ ...LC, width: "50%", paddingRight: "5px" }}>
          <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accent)}>📋 STORY DETAILS</td></tr></tbody></table>
          <table style={S.tbl}><tbody>
            <tr><td style={{ ...S.tdLabel, width: "30%" }}>Business Context</td><td style={S.td0}>[Why does this story matter? What problem does it solve?]</td></tr>
            <tr><td style={S.tdLabelAlt}>Dependencies</td><td style={S.tdAlt}>[Other stories, APIs, teams, or vendors this depends on]</td></tr>
            <tr><td style={S.tdLabel}>Assumptions</td><td style={S.td0}>[What are we assuming to be true for this story?]</td></tr>
            <tr><td style={S.tdLabelAlt}>UX / Design Link</td><td style={S.tdAlt}>[Link to Figma / mockup / wireframe]</td></tr>
            <tr><td style={S.tdLabel}>Technical Notes</td><td style={S.td0}>[API endpoints, DB changes, architecture notes]</td></tr>
          </tbody></table>
        </td>
        <td style={{ ...LC, width: "50%", paddingLeft: "5px" }}>
          <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accentDark)}>⚠️ EDGE CASES &amp; RISKS</td></tr></tbody></table>
          <table style={S.tbl}>
            <thead><tr>
              <th style={{ ...S.thSecondary, width: "5%", textAlign: "center" as const }}>#</th>
              <th style={S.thSecondary}>Edge Case / Risk</th>
              <th style={{ ...S.thSecondary, width: "30%" }}>How to Handle</th>
            </tr></thead>
            <tbody>
              {[
                { edge: "[Payment timeout after 30 seconds]", how: "[Show friendly error + retry button]" },
                { edge: "[User navigates away mid-checkout]", how: "[Preserve cart for 30 minutes]" },
                { edge: "[Double-click on Place Order]", how: "[Disable button after first click]" },
                { edge: "[Add edge case]", how: "" },
              ].map((r, i) => {
                const bg = i % 2 === 1 ? C.rowAlt : C.white;
                return (
                  <tr key={i}>
                    <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700 }}>{i + 1}</td>
                    <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.edge}</td>
                    <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.how}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </td>
      </tr></tbody></table>
      <CopyButton targetRef={detailRef} label="Copy Section" />
    </div>
  );

  const renderFooter = () => (
    <table style={{ ...S.tbl, marginTop: "8px" }}><tbody><tr>
      <td style={{ backgroundColor: C.primary, color: C.footerText, padding: "8px 20px", fontSize: "10px", fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.06em" }}>
        ExecNoteShop &nbsp;&bull;&nbsp; Agile / Scrum Delivery Command Center &nbsp;&bull;&nbsp; &copy; 2026 All Rights Reserved
      </td>
    </tr></tbody></table>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-red-50/30">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-red-600 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-100 text-amber-700 text-xs font-semibold"><Zap size={11} />⭐ All-Star</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/agile-command-center" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-red-600 transition-colors"><ArrowLeft size={14} />Back to Agile Command Center</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center"><PenTool size={20} className="text-red-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">User Story + Acceptance Criteria Builder</h2><p className="text-xs font-medium text-red-600">⭐ All-Star &mdash; Cleaner Stories = Faster Delivery, Fewer Bugs</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Structured story format with Given/When/Then acceptance criteria, edge cases, dependencies, and technical notes.</p>
        </div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">View Mode</p>
          <div className="flex flex-wrap gap-2">
            {LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (
              <button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-red-600 text-white border-red-600 shadow-md shadow-red-200" : "bg-white text-slate-600 border-slate-200 hover:border-red-300 hover:text-red-700"}`}>
                <Icon size={15} /><span>{l.label}</span><span className={`text-[10px] font-medium ${isActive ? "text-red-200" : "text-slate-400"}`}>{l.desc}</span>
              </button>
            ); })}
          </div>
        </div>
        <div ref={fullPageRef} style={{ fontFamily: S.font }}>
          {layout === "full" && <>{renderTitleBanner()}{renderStory()}{renderAC()}{renderDetail()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderStory()}{renderAC()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function UserStoryBuilderPage() { return <ThemeProvider><UserStoryBuilderContent /></ThemeProvider>; }
