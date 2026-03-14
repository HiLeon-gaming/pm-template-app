"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, Inbox, LayoutDashboard, AlignJustify, Zap } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Triage", desc: "Inbox + triage rules + quick stats", icon: LayoutDashboard },
  { id: "compact", label: "Quick Capture", desc: "Inbox table only", icon: AlignJustify },
];

function ExecInboxTriageContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const inboxRef = useRef<HTMLDivElement>(null);
  const triageRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };
  const accent = "#EC4899"; const accentDark = "#DB2777";

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>📥 EXEC INBOX / REQUEST INTAKE (TRIAGE CONSOLE)</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; EA / Chief of Staff Command Center &nbsp;|&nbsp; ⭐ All-Star &nbsp;|&nbsp; Start Here</td></tr>
    </tbody></table>
  );

  const renderInbox = () => (
    <div ref={inboxRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(accent)}>📋 REQUEST INBOX &mdash; Capture Everything Here</div>
      <CopyButton targetRef={inboxRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>Every ask goes here first. Triage daily. Nothing lives in your head.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "4%", textAlign: "center" as const }}>#</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Date In</th>
          <th style={S.thPrimary}>Request / Ask</th>
          <th style={{ ...S.thPrimary, width: "10%" }}>From</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Priority</th>
          <th style={{ ...S.thPrimary, width: "10%" }}>Owner</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Due</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Status</th>
        </tr></thead>
        <tbody>
          {[
            { date: "03/14", req: "[Draft talking points for investor call Friday]", from: "[CEO]", pri: "🔴 High", pBg: C.badgeRedBg, pFg: C.badgeRedFg, owner: "[You]", due: "03/14", s: "In Progress", sBg: C.badgeAmberBg, sFg: C.badgeAmberFg },
            { date: "03/14", req: "[Schedule Q3 offsite — need venue options by Tue]", from: "[VP Ops]", pri: "🟡 Med", pBg: C.badgeAmberBg, pFg: C.badgeAmberFg, owner: "[EA]", due: "03/18", s: "Not Started", sBg: C.badgeBlueBg, sFg: C.badgeBlueFg },
            { date: "03/13", req: "[Send org chart update to new board member]", from: "[CEO]", pri: "🟡 Med", pBg: C.badgeAmberBg, pFg: C.badgeAmberFg, owner: "[EA]", due: "03/15", s: "In Progress", sBg: C.badgeAmberBg, sFg: C.badgeAmberFg },
            { date: "03/13", req: "[Order lunch for leadership offsite next Thursday]", from: "[CoS]", pri: "🟢 Low", pBg: C.badgeGreenBg, pFg: C.badgeGreenFg, owner: "[EA]", due: "03/19", s: "Not Started", sBg: C.badgeBlueBg, sFg: C.badgeBlueFg },
            { date: "03/12", req: "[Get contract redline back from Legal — follow up]", from: "[CEO]", pri: "🔴 High", pBg: C.badgeRedBg, pFg: C.badgeRedFg, owner: "[CoS]", due: "03/14", s: "Waiting", sBg: C.badgeGrayBg, sFg: C.badgeGrayFg },
            { date: "03/12", req: "[Compile expense reports for Q1 review]", from: "[Finance]", pri: "🟢 Low", pBg: C.badgeGreenBg, pFg: C.badgeGreenFg, owner: "[EA]", due: "03/21", s: "Not Started", sBg: C.badgeBlueBg, sFg: C.badgeBlueFg },
            { date: "", req: "[ ]", from: "[ ]", pri: "", pBg: C.badgeGrayBg, pFg: C.badgeGrayFg, owner: "[ ]", due: "", s: "", sBg: C.badgeGrayBg, sFg: C.badgeGrayFg },
            { date: "", req: "[ ]", from: "[ ]", pri: "", pBg: C.badgeGrayBg, pFg: C.badgeGrayFg, owner: "[ ]", due: "", s: "", sBg: C.badgeGrayBg, sFg: C.badgeGrayFg },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 800, fontSize: "12px", color: accent }}>{r.date ? i + 1 : ""}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "10px", fontWeight: 600 }}>{r.date}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.req}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 600 }}>{r.from}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}>{r.pri && <span style={S.badge(r.pBg, r.pFg)}>{r.pri}</span>}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.owner}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, fontSize: "10px", color: accent }}>{r.due}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}>{r.s && <span style={S.badge(r.sBg, r.sFg)}>{r.s}</span>}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderTriage = () => (
    <div ref={triageRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(accentDark)}>⚡ TRIAGE DECISION RULES</div>
      <CopyButton targetRef={triageRef} label="Copy Section" />
      <table style={LT}><tbody><tr>
        {[
          { action: "DO NOW", time: "< 5 min", rule: "If it takes under 5 minutes, do it immediately. Don\u2019t let it linger.", color: "#DC2626" },
          { action: "SCHEDULE", time: "5-30 min", rule: "Block time today or tomorrow. Assign to yourself with a due date.", color: "#F59E0B" },
          { action: "DELEGATE", time: "Someone else", rule: "Assign owner + due date. Add to Waiting On tracker for follow-up.", color: "#0EA5E9" },
          { action: "DEFER / PARK", time: "Not now", rule: "Move to parking lot or next week\u2019s queue. Don\u2019t delete \u2014 track it.", color: "#6B7280" },
        ].map((item, i) => (
          <td key={i} style={{ ...LC, width: "25%", padding: i < 3 ? "0 4px 0 0" : "0" }}>
            <table style={S.tbl}><tbody>
              <tr><td style={{ backgroundColor: item.color, color: "#FFFFFF", padding: "8px 10px", fontFamily: S.font, fontSize: "13px", fontWeight: 800, border: `1.5px solid ${C.border}`, textAlign: "center" as const }}>{item.action}</td></tr>
              <tr><td style={{ ...S.td0, textAlign: "center" as const, fontWeight: 700, fontSize: "10px", color: item.color, padding: "4px 6px" }}>{item.time}</td></tr>
              <tr><td style={{ ...S.tdAlt, fontSize: "9px", padding: "6px 8px", textAlign: "center" as const }}>{item.rule}</td></tr>
            </tbody></table>
          </td>
        ))}
      </tr></tbody></table>
    </div>
  );

  const renderStats = () => (
    <div ref={statsRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(accent)}>📊 QUICK INBOX STATS</div>
      <CopyButton targetRef={statsRef} label="Copy Section" />
      <table style={LT}><tbody><tr>
        {[
          { label: "Open Requests", value: "[6]", color: "#EC4899" },
          { label: "Due Today", value: "[2]", color: "#DC2626" },
          { label: "Waiting On Others", value: "[3]", color: "#F59E0B" },
          { label: "Completed This Week", value: "[8]", color: "#059669" },
          { label: "Avg Days to Close", value: "[2.3]", color: "#0EA5E9" },
        ].map((item, i) => (
          <td key={i} style={{ ...LC, width: "20%", padding: i < 4 ? "0 4px 0 0" : "0" }}>
            <table style={S.tbl}><tbody>
              <tr><td style={{ ...S.td0, textAlign: "center" as const, fontWeight: 800, fontSize: "24px", color: item.color, padding: "12px 6px 4px" }}>{item.value}</td></tr>
              <tr><td style={{ ...S.tdAlt, textAlign: "center" as const, fontSize: "9px", fontWeight: 600, padding: "4px 6px 8px", textTransform: "uppercase" as const, letterSpacing: "0.05em" }}>{item.label}</td></tr>
            </tbody></table>
          </td>
        ))}
      </tr></tbody></table>
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-pink-50/30">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-pink-500 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-pink-50 border border-pink-100 text-pink-700 text-xs font-semibold"><Zap size={11} />⭐ All-Star</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/ea-cos-command-center" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-pink-600 transition-colors"><ArrowLeft size={14} />Back to EA/CoS Command Center</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-pink-100 flex items-center justify-center"><Inbox size={20} className="text-pink-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">Exec Inbox / Request Intake</h2><p className="text-xs font-medium text-pink-600">⭐ All-Star &mdash; Triage Console &mdash; Capture Every Ask</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Capture every ask with priority, owner, due date, and status. The single most-used EA page. Nothing lives in your head.</p>
        </div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">View Mode</p>
          <div className="flex flex-wrap gap-2">
            {LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (
              <button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-pink-500 text-white border-pink-500 shadow-md shadow-pink-200" : "bg-white text-slate-600 border-slate-200 hover:border-pink-300 hover:text-pink-700"}`}>
                <Icon size={15} /><span>{l.label}</span><span className={`text-[10px] font-medium ${isActive ? "text-pink-200" : "text-slate-400"}`}>{l.desc}</span>
              </button>
            ); })}
          </div>
        </div>
        <div ref={fullPageRef} style={{ fontFamily: S.font }}>
          {layout === "full" && <>{renderTitleBanner()}{renderInbox()}{renderTriage()}{renderStats()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderInbox()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function ExecInboxTriagePage() { return <ThemeProvider><ExecInboxTriageContent /></ThemeProvider>; }
