"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, Users, LayoutDashboard, AlignJustify, Zap } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Meeting", desc: "Agenda + updates + decisions + actions", icon: LayoutDashboard },
  { id: "compact", label: "Quick Meeting", desc: "Roundtable + actions only", icon: AlignJustify },
];

function WeeklyStaffContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const roundRef = useRef<HTMLDivElement>(null);
  const topicsRef = useRef<HTMLDivElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);

  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };
  const accent = "#059669"; const accentDark = "#047857";

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>👥 WEEKLY STAFF MEETING</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; Meetings Hub Pro &nbsp;|&nbsp; ⭐ All-Star &nbsp;|&nbsp; Team Meetings</td></tr>
    </tbody></table>
  );

  const renderHeader = () => (
    <div ref={headerRef} style={{ marginBottom: "12px" }}>
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "18%" }}>Team / Dept</td><td style={{ ...S.td0, width: "32%" }}>[Your Team Name]</td><td style={{ ...S.tdLabel, width: "18%" }}>Date</td><td style={{ ...S.td0, width: "32%" }}>[MM/DD/YYYY]</td></tr>
        <tr><td style={S.tdLabelAlt}>Facilitator</td><td style={S.tdAlt}>[Your Name]</td><td style={S.tdLabelAlt}>Duration</td><td style={{ ...S.tdAlt, fontWeight: 700, color: accent }}>[45 minutes]</td></tr>
        <tr><td style={S.tdLabel}>Attendees</td><td colSpan={3} style={S.td0}>[Name 1, Name 2, Name 3, Name 4, Name 5]</td></tr>
      </tbody></table>
      <CopyButton targetRef={headerRef} label="Copy Section" />
    </div>
  );

  const renderRound = () => (
    <div ref={roundRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accent)}>🔄 ROUNDTABLE UPDATES (2 min each)</td></tr></tbody></table>
      <CopyButton targetRef={roundRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>Each person shares: 1) Top win, 2) Top priority, 3) Any blocker. Keep it to 2 minutes max.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={S.thPrimary}>Team Member</th>
          <th style={{ ...S.thPrimary, width: "25%" }}>Top Win</th>
          <th style={{ ...S.thPrimary, width: "25%" }}>Top Priority</th>
          <th style={{ ...S.thPrimary, width: "20%" }}>Blocker / Need</th>
        </tr></thead>
        <tbody>
          {["[Name 1]", "[Name 2]", "[Name 3]", "[Name 4]", "[Name 5]"].map((name, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 700, fontSize: "11px", color: accent }}>{name}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>[Win]</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>[Priority]</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>[Blocker or “None”]</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderTopics = () => (
    <div ref={topicsRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accentDark)}>📋 DISCUSSION TOPICS</td></tr></tbody></table>
      <CopyButton targetRef={topicsRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "5%", textAlign: "center" as const }}>#</th>
          <th style={S.thPrimary}>Topic</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Type</th>
          <th style={{ ...S.thPrimary, width: "12%" }}>Lead</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Time</th>
          <th style={{ ...S.thPrimary, width: "20%" }}>Outcome / Notes</th>
        </tr></thead>
        <tbody>
          {[
            { topic: "[Q2 priorities alignment — any changes?]", type: "Discussion", tBg: C.badgeBlueBg, tFg: C.badgeBlueFg, lead: "[You]", time: "10 min", outcome: "" },
            { topic: "[Cross-team dependency update — API team]", type: "Update", tBg: C.badgeGreenBg, tFg: C.badgeGreenFg, lead: "[Tech Lead]", time: "5 min", outcome: "" },
            { topic: "[New hire onboarding — coverage plan]", type: "Decision", tBg: C.badgeAmberBg, tFg: C.badgeAmberFg, lead: "[HR]", time: "5 min", outcome: "" },
            { topic: "[Customer escalation — response strategy]", type: "Discussion", tBg: C.badgeBlueBg, tFg: C.badgeBlueFg, lead: "[PM]", time: "5 min", outcome: "" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 800, fontSize: "14px", color: accent }}>{i + 1}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.topic}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.tBg, r.tFg)}>{r.type}</span></td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 600 }}>{r.lead}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, fontSize: "10px", color: accent }}>{r.time}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.outcome}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderActions = () => (
    <div ref={actionsRef} style={{ marginBottom: "12px" }}>
      <table style={LT}><tbody><tr>
        <td style={{ ...LC, width: "50%", paddingRight: "4px" }}>
          <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accent)}>✅ DECISIONS &amp; ACTIONS</td></tr></tbody></table>
          <table style={S.tbl}>
            <thead><tr>
              <th style={S.thPrimary}>Item</th>
              <th style={{ ...S.thPrimary, width: "20%" }}>Owner</th>
              <th style={{ ...S.thPrimary, width: "18%", textAlign: "center" as const }}>Due</th>
            </tr></thead>
            <tbody>
              {[1, 2, 3, 4].map((i) => (
                <tr key={i}>
                  <td style={{ ...(i % 2 === 0 ? S.tdAlt : S.td0), fontSize: "10px" }}>[Action / Decision]</td>
                  <td style={{ ...(i % 2 === 0 ? S.tdAlt : S.td0), fontSize: "10px" }}>[Name]</td>
                  <td style={{ ...(i % 2 === 0 ? S.tdAlt : S.td0), textAlign: "center" as const, fontSize: "10px", fontWeight: 700, color: accent }}>[Date]</td>
                </tr>
              ))}
            </tbody>
          </table>
        </td>
        <td style={{ ...LC, width: "50%", paddingLeft: "4px" }}>
          <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner("#EA580C")}>🅿️ PARKING LOT &amp; NEXT WEEK</td></tr></tbody></table>
          <table style={S.tbl}><tbody>
            <tr><td style={{ ...S.tdLabel, width: "35%" }}>Parking Lot</td><td style={S.td0}>[Items deferred — add to next week]</td></tr>
            <tr><td style={S.tdLabelAlt}>Announcements</td><td style={S.tdAlt}>[Team-wide announcements or FYIs]</td></tr>
            <tr><td style={S.tdLabel}>Next Meeting</td><td style={{ ...S.td0, fontWeight: 700, color: accent }}>[Date / Time — same cadence]</td></tr>
            <tr><td style={S.tdLabelAlt}>Follow-Up Owner</td><td style={S.tdAlt}>[Name — sends recap within 24 hours]</td></tr>
          </tbody></table>
        </td>
      </tr></tbody></table>
      <CopyButton targetRef={actionsRef} label="Copy Section" />
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50/30">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-500 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-semibold"><Zap size={11} />⭐ All-Star</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/meetings-hub" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-emerald-600 transition-colors"><ArrowLeft size={14} />Back to Meetings Hub Pro</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center"><Users size={20} className="text-emerald-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">Weekly Staff Meeting</h2><p className="text-xs font-medium text-emerald-600">⭐ All-Star &mdash; Roundtable + Topics + Actions</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Structured agenda for your weekly team meeting. Roundtable updates, discussion topics, decisions, and parking lot.</p>
        </div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">View Mode</p>
          <div className="flex flex-wrap gap-2">
            {LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (
              <button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-emerald-500 text-white border-emerald-500 shadow-md shadow-emerald-200" : "bg-white text-slate-600 border-slate-200 hover:border-emerald-300 hover:text-emerald-700"}`}>
                <Icon size={15} /><span>{l.label}</span><span className={`text-[10px] font-medium ${isActive ? "text-emerald-200" : "text-slate-400"}`}>{l.desc}</span>
              </button>
            ); })}
          </div>
        </div>
        <div ref={fullPageRef} style={{ fontFamily: S.font }}>
          {layout === "full" && <>{renderTitleBanner()}{renderHeader()}{renderRound()}{renderTopics()}{renderActions()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderHeader()}{renderRound()}{renderActions()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function WeeklyStaffPage() { return <ThemeProvider><WeeklyStaffContent /></ThemeProvider>; }
