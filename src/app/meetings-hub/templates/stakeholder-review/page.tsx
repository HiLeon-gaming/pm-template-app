"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, Presentation, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Review", desc: "Demo script + feedback + decisions + actions", icon: LayoutDashboard },
  { id: "compact", label: "Quick Review", desc: "Agenda + feedback only", icon: AlignJustify },
];

function StakeholderReviewContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const agendaRef = useRef<HTMLDivElement>(null);
  const feedbackRef = useRef<HTMLDivElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);

  const accent = "#EA580C"; const accentDark = "#C2410C";

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>🎤 STAKEHOLDER REVIEW / DEMO</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; Meetings Hub Pro &nbsp;|&nbsp; Project &amp; Delivery</td></tr>
    </tbody></table>
  );

  const renderHeader = () => (
    <div ref={headerRef} style={{ marginBottom: "12px" }}>
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "18%" }}>Project</td><td style={{ ...S.td0, width: "32%" }}>[Project Name]</td><td style={{ ...S.tdLabel, width: "18%" }}>Date</td><td style={{ ...S.td0, width: "32%" }}>[MM/DD/YYYY]</td></tr>
        <tr><td style={S.tdLabelAlt}>Sprint / Phase</td><td style={{ ...S.tdAlt, fontWeight: 700, color: accent }}>[Sprint 12 / Phase 2]</td><td style={S.tdLabelAlt}>Duration</td><td style={S.tdAlt}>[45 minutes]</td></tr>
        <tr><td style={S.tdLabel}>Presenter(s)</td><td style={S.td0}>[Name 1, Name 2]</td><td style={S.tdLabel}>Stakeholders</td><td style={S.td0}>[VP Product, Director Eng, Client Rep]</td></tr>
      </tbody></table>
      <CopyButton targetRef={headerRef} label="Copy Section" />
    </div>
  );

  const renderAgenda = () => (
    <div ref={agendaRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(accent)}>📋 DEMO AGENDA</div>
      <CopyButton targetRef={agendaRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Time</th>
          <th style={{ ...S.thPrimary, width: "5%", textAlign: "center" as const }}>Mins</th>
          <th style={S.thPrimary}>Topic / Demo Item</th>
          <th style={{ ...S.thPrimary, width: "12%" }}>Presenter</th>
          <th style={{ ...S.thPrimary, width: "25%" }}>Key Points / Script Notes</th>
        </tr></thead>
        <tbody>
          {[
            { time: "0:00", mins: "5", topic: "[Welcome + context — what are we showing today?]", presenter: "[PM]", notes: "[Set the stage — sprint goal, what was committed]" },
            { time: "0:05", mins: "10", topic: "[Feature demo #1 — user authentication flow]", presenter: "[Dev 1]", notes: "[Show login → registration → password reset]" },
            { time: "0:15", mins: "10", topic: "[Feature demo #2 — dashboard analytics]", presenter: "[Dev 2]", notes: "[Show charts, filters, export functionality]" },
            { time: "0:25", mins: "5", topic: "[Feature demo #3 — API integration progress]", presenter: "[Dev 3]", notes: "[Show API calls working — test data]" },
            { time: "0:30", mins: "10", topic: "[Q&A + stakeholder feedback]", presenter: "[All]", notes: "[Capture feedback verbatim — don\u2019t defend, listen]" },
            { time: "0:40", mins: "5", topic: "[Next steps + what\u2019s coming next sprint]", presenter: "[PM]", notes: "[Preview next sprint priorities, any decisions needed]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, fontSize: "11px", color: accentDark }}>{r.time}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "10px" }}>{r.mins}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.topic}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 600 }}>{r.presenter}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", color: C.textMuted }}>{r.notes}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderFeedback = () => (
    <div ref={feedbackRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(accentDark)}>💬 STAKEHOLDER FEEDBACK</div>
      <CopyButton targetRef={feedbackRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "15%" }}>Stakeholder</th>
          <th style={S.thPrimary}>Feedback</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Type</th>
          <th style={{ ...S.thPrimary, width: "15%" }}>Action Required?</th>
        </tr></thead>
        <tbody>
          {[
            { sh: "[VP Product]", fb: "[Loved the dashboard — wants to add export to PDF]", type: "Enhancement", tBg: C.badgeBlueBg, tFg: C.badgeBlueFg, action: "[Add to backlog — P2]" },
            { sh: "[Director Eng]", fb: "[Concerned about API performance under load]", type: "Risk", tBg: C.badgeAmberBg, tFg: C.badgeAmberFg, action: "[Schedule load test — Dev 3]" },
            { sh: "[Client Rep]", fb: "[Very positive — exceeded expectations on auth flow]", type: "Praise", tBg: C.badgeGreenBg, tFg: C.badgeGreenFg, action: "[None — share with team]" },
            { sh: "[VP Product]", fb: "[Wants to move go-live date up by 1 week]", type: "Decision", tBg: C.badgeRedBg, tFg: C.badgeRedFg, action: "[Discuss feasibility — PM]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 700, fontSize: "10px", color: accent }}>{r.sh}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.fb}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.tBg, r.tFg)}>{r.type}</span></td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px" }}>{r.action}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderActions = () => (
    <div ref={actionsRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(accent)}>✅ DECISIONS &amp; NEXT STEPS</div>
      <CopyButton targetRef={actionsRef} label="Copy Section" />
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "22%" }}>Decisions Made</td><td style={S.td0}>[List all decisions from this review]</td></tr>
        <tr><td style={S.tdLabelAlt}>Approved Items</td><td style={{ ...S.tdAlt, fontWeight: 700, color: "#059669" }}>[What was accepted / signed off?]</td></tr>
        <tr><td style={S.tdLabel}>Changes Requested</td><td style={{ ...S.td0, color: "#DC2626" }}>[What needs rework or modification?]</td></tr>
        <tr><td style={S.tdLabelAlt}>Backlog Additions</td><td style={S.tdAlt}>[New items to add to backlog from feedback]</td></tr>
        <tr><td style={S.tdLabel}>Next Review</td><td style={{ ...S.td0, fontWeight: 700, color: accent }}>[Date / Time — what will we show?]</td></tr>
      </tbody></table>
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-orange-50/30">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-orange-500 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-orange-50 border border-orange-100 text-orange-700 text-xs font-semibold"><Presentation size={11} />Review</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/meetings-hub" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-orange-600 transition-colors"><ArrowLeft size={14} />Back to Meetings Hub Pro</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center"><Presentation size={20} className="text-orange-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">Stakeholder Review / Demo</h2><p className="text-xs font-medium text-orange-600">Demo Script &bull; Feedback Capture &bull; Decisions</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Demo agenda with script notes, structured stakeholder feedback capture, and clear decisions and next steps.</p>
        </div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">View Mode</p>
          <div className="flex flex-wrap gap-2">
            {LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (
              <button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-orange-500 text-white border-orange-500 shadow-md shadow-orange-200" : "bg-white text-slate-600 border-slate-200 hover:border-orange-300 hover:text-orange-700"}`}>
                <Icon size={15} /><span>{l.label}</span><span className={`text-[10px] font-medium ${isActive ? "text-orange-200" : "text-slate-400"}`}>{l.desc}</span>
              </button>
            ); })}
          </div>
        </div>
        <div ref={fullPageRef} style={{ fontFamily: S.font }}>
          {layout === "full" && <>{renderTitleBanner()}{renderHeader()}{renderAgenda()}{renderFeedback()}{renderActions()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderHeader()}{renderAgenda()}{renderFeedback()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function StakeholderReviewPage() { return <ThemeProvider><StakeholderReviewContent /></ThemeProvider>; }
