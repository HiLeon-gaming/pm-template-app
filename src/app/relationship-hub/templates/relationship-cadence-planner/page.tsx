"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, Handshake, LayoutDashboard, AlignJustify, BookOpen } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Planner", desc: "Cadence table + guidelines + tips + overdue alerts", icon: LayoutDashboard },
  { id: "compact", label: "Quick Cadence", desc: "Cadence table only", icon: AlignJustify },
];

function CadenceContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullRef = useRef<HTMLDivElement>(null);
  const cadRef = useRef<HTMLDivElement>(null);
  const guideRef = useRef<HTMLDivElement>(null);
  const tipsRef = useRef<HTMLDivElement>(null);

  const accent = "#E11D48";
  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>RELATIONSHIP CADENCE PLANNER</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; Relationship &amp; Stakeholder Management Hub &nbsp;|&nbsp; Touchpoint Schedule</td></tr>
    </tbody></table>
  );

  const renderCadence = () => (
    <div ref={cadRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accent)}>STAKEHOLDER TOUCHPOINT CADENCE</td></tr></tbody></table>
      <CopyButton targetRef={cadRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>Set the right check-in frequency for each stakeholder. The #1 relationship mistake is only talking to people when you need something. This planner ensures you stay proactive. Review and update every Monday.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "4%", textAlign: "center" as const }}>#</th>
          <th style={{ ...S.thPrimary, width: "15%" }}>Stakeholder</th>
          <th style={{ ...S.thPrimary, width: "10%" }}>Type</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Priority</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Health</th>
          <th style={{ ...S.thPrimary, width: "10%" }}>Cadence</th>
          <th style={{ ...S.thPrimary, width: "10%" }}>Preferred Channel</th>
          <th style={{ ...S.thPrimary, width: "9%", textAlign: "center" as const }}>Last Touch</th>
          <th style={{ ...S.thPrimary, width: "9%", textAlign: "center" as const }}>Next Due</th>
          <th style={{ ...S.thPrimary, width: "7%", textAlign: "center" as const }}>Status</th>
        </tr></thead>
        <tbody>
          {[
            { n: "1", name: "Maria Lopez", type: "Sponsor", pri: "Critical", prBg: C.badgeRedBg, prFg: C.badgeRedFg, health: "Green", hBg: C.badgeGreenBg, hFg: C.badgeGreenFg, cad: "Weekly", ch: "1:1 meeting", last: "Mar 10", next: "Mar 17", s: "On Track", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg },
            { n: "2", name: "David Park", type: "Decision Maker", pri: "Critical", prBg: C.badgeRedBg, prFg: C.badgeRedFg, health: "Red", hBg: C.badgeRedBg, hFg: C.badgeRedFg, cad: "Biweekly", ch: "Email + call", last: "Mar 1", next: "Mar 15", s: "Overdue", sBg: C.badgeRedBg, sFg: C.badgeRedFg },
            { n: "3", name: "Sarah Chen", type: "Champion", pri: "High", prBg: C.badgeAmberBg, prFg: C.badgeAmberFg, health: "Amber", hBg: C.badgeAmberBg, hFg: C.badgeAmberFg, cad: "Biweekly", ch: "Teams chat", last: "Mar 12", next: "Mar 26", s: "On Track", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg },
            { n: "4", name: "James Wu", type: "Blocker", pri: "High", prBg: C.badgeAmberBg, prFg: C.badgeAmberFg, health: "Amber", hBg: C.badgeAmberBg, hFg: C.badgeAmberFg, cad: "Weekly", ch: "1:1 meeting", last: "Mar 11", next: "Mar 18", s: "On Track", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg },
            { n: "5", name: "Lisa Tran", type: "Gatekeeper", pri: "Med", prBg: C.badgeGreenBg, prFg: C.badgeGreenFg, health: "Green", hBg: C.badgeGreenBg, hFg: C.badgeGreenFg, cad: "Monthly", ch: "Email", last: "Feb 28", next: "Mar 28", s: "On Track", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg },
            { n: "6", name: "Tom Rivera", type: "Influencer", pri: "Med", prBg: C.badgeGreenBg, prFg: C.badgeGreenFg, health: "Green", hBg: C.badgeGreenBg, hFg: C.badgeGreenFg, cad: "Monthly", ch: "Lunch / coffee", last: "Mar 5", next: "Apr 5", s: "On Track", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg },
            { n: "7", name: "[Enter name]", type: "[Type]", pri: "[H/M/L]", prBg: C.badgeGrayBg, prFg: C.badgeGrayFg, health: "[RAG]", hBg: C.badgeGrayBg, hFg: C.badgeGrayFg, cad: "[Freq]", ch: "[Channel]", last: "[Date]", next: "[Date]", s: "[Status]", sBg: C.badgeGrayBg, sFg: C.badgeGrayFg },
            { n: "8", name: "[Enter name]", type: "[Type]", pri: "[H/M/L]", prBg: C.badgeGrayBg, prFg: C.badgeGrayFg, health: "[RAG]", hBg: C.badgeGrayBg, hFg: C.badgeGrayFg, cad: "[Freq]", ch: "[Channel]", last: "[Date]", next: "[Date]", s: "[Status]", sBg: C.badgeGrayBg, sFg: C.badgeGrayFg },
            { n: "9", name: "[Enter name]", type: "[Type]", pri: "[H/M/L]", prBg: C.badgeGrayBg, prFg: C.badgeGrayFg, health: "[RAG]", hBg: C.badgeGrayBg, hFg: C.badgeGrayFg, cad: "[Freq]", ch: "[Channel]", last: "[Date]", next: "[Date]", s: "[Status]", sBg: C.badgeGrayBg, sFg: C.badgeGrayFg },
            { n: "10", name: "[Enter name]", type: "[Type]", pri: "[H/M/L]", prBg: C.badgeGrayBg, prFg: C.badgeGrayFg, health: "[RAG]", hBg: C.badgeGrayBg, hFg: C.badgeGrayFg, cad: "[Freq]", ch: "[Channel]", last: "[Date]", next: "[Date]", s: "[Status]", sBg: C.badgeGrayBg, sFg: C.badgeGrayFg },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 800, fontSize: "12px", color: accent }}>{r.n}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 700 }}>{r.name}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px" }}>{r.type}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.prBg, r.prFg)}>{r.pri}</span></td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.hBg, r.hFg)}>{r.health}</span></td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.cad}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px" }}>{r.ch}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "10px" }}>{r.last}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "10px", fontWeight: 700 }}>{r.next}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.sBg, r.sFg)}>{r.s}</span></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderGuidelines = () => (
    <div ref={guideRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner("#059669")}>CADENCE GUIDELINES BY STAKEHOLDER TYPE</td></tr></tbody></table>
      <CopyButton targetRef={guideRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>Use these as starting points. Adjust based on relationship health, project phase, and how much is at stake with each person.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "15%" }}>Stakeholder Type</th>
          <th style={{ ...S.thPrimary, width: "15%" }}>Default Cadence</th>
          <th style={S.thPrimary}>Increase Cadence When...</th>
          <th style={{ ...S.thPrimary, width: "25%" }}>Decrease Cadence When...</th>
        </tr></thead>
        <tbody>
          {[
            { type: "Sponsor", cad: "Weekly", up: "Major decisions pending, project at risk, quarterly planning, or budget reviews", down: "Stable phase with no decisions; they explicitly ask for less", color: accent },
            { type: "Champion", cad: "Biweekly", up: "They need ammunition to advocate, after a big win, or during org changes", down: "No active advocacy needed and relationship is stable", color: "#059669" },
            { type: "Decision Maker", cad: "Monthly + as needed", up: "Approaching a key decision point, approval gate, or contract renewal", down: "No pending decisions in their domain for 60+ days", color: "#8B5CF6" },
            { type: "Blocker", cad: "Weekly until resolved", up: "Their concerns are escalating, blocking critical path, or affecting team morale", down: "Never decrease until the blocking behavior is fully resolved", color: "#DC2626" },
            { type: "Influencer", cad: "Monthly", up: "Organizational changes, new initiatives, or you need to shift opinions", down: "Influence is aligned and stable; no upcoming contentious decisions", color: "#0EA5E9" },
            { type: "End User / SME", cad: "Biweekly (active)", up: "Requirements gathering, UAT, testing, or major feedback cycles", down: "Between active work phases; shift to monthly updates", color: "#D97706" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 800, color: r.color }}>{r.type}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 700 }}>{r.cad}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.up}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", color: C.textMuted }}>{r.down}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderTips = () => (
    <div ref={tipsRef} style={{ marginBottom: "12px" }}>
      <CopyButton targetRef={tipsRef} label="Copy Section" />
      <table style={LT}><tbody><tr>
        <td style={{ ...LC, width: "50%", paddingRight: "4px" }}>
          <table style={S.tbl}>
            <thead><tr><td style={{ backgroundColor: "#D1FAE5", color: "#059669", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #059669" }}>CADENCE BEST PRACTICES</td></tr></thead>
            <tbody>
              {[
                { color: "#059669", tip: "Review this planner every Monday.", detail: "5 minutes: who is overdue? Who do I need to reach out to this week?" },
                { color: "#0EA5E9", tip: "Vary the format.", detail: "Not every touchpoint needs to be a meeting. A quick Slack check-in or a shared article counts." },
                { color: "#8B5CF6", tip: "Match channel to person.", detail: "Some people prefer email. Others prefer face-to-face. Use what works for THEM, not you." },
                { color: "#D97706", tip: "Cadence \u2260 calendar invites.", detail: "An informal coffee counts as a touchpoint. So does forwarding a relevant article with a personal note." },
                { color: accent, tip: "Track overdue contacts.", detail: "If a Critical stakeholder is 2+ weeks overdue, that is an emergency. Act today." },
              ].map((r, i) => {
                const bg = i % 2 === 1 ? C.rowAlt : C.white;
                return (
                  <tr key={i}><td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", padding: "5px 10px" }}>
                    <strong style={{ color: r.color }}>{r.tip}</strong><br />
                    <span style={{ fontSize: "9px", color: C.textMuted }}>{r.detail}</span>
                  </td></tr>
                );
              })}
            </tbody>
          </table>
        </td>
        <td style={{ ...LC, width: "50%", paddingLeft: "4px" }}>
          <table style={S.tbl}>
            <thead><tr><td style={{ backgroundColor: "#FEE2E2", color: "#DC2626", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #DC2626" }}>OVERDUE ALERT THRESHOLDS</td></tr></thead>
            <tbody>
              {[
                { score: "On Track", bg: C.badgeGreenBg, fg: C.badgeGreenFg, desc: "Next touchpoint is upcoming or completed recently. No action needed beyond maintaining rhythm." },
                { score: "Due Soon", bg: C.badgeAmberBg, fg: C.badgeAmberFg, desc: "Touchpoint due within 2 days. Prepare now — review their profile, plan your goal for the interaction." },
                { score: "Overdue", bg: C.badgeRedBg, fg: C.badgeRedFg, desc: "Past due date. Reach out TODAY. Every day overdue = trust erosion. Critical stakeholders: same-day action." },
              ].map((r, i) => {
                const rowBg = i % 2 === 1 ? C.rowAlt : C.white;
                return (
                  <tr key={i}><td style={{ ...S.td0, backgroundColor: rowBg, fontSize: "10px", padding: "6px 10px" }}>
                    <span style={S.badge(r.bg, r.fg)}>{r.score}</span><br />
                    <span style={{ fontSize: "9px", color: C.textMuted }}>{r.desc}</span>
                  </td></tr>
                );
              })}
              <tr><td style={{ ...S.td0, fontSize: "9px", padding: "6px 10px", lineHeight: "1.6" }}>
                <strong style={{ color: "#DC2626" }}>Rule:</strong> If a Critical-priority stakeholder is Overdue by more than 1 week, treat it as a relationship emergency. Reach out immediately, even if you don&apos;t have a specific agenda.
              </td></tr>
            </tbody>
          </table>
        </td>
      </tr></tbody></table>
    </div>
  );

  const renderFooter = () => (
    <table style={{ ...S.tbl, marginTop: "8px" }}><tbody><tr>
      <td style={{ backgroundColor: C.primary, color: C.footerText, padding: "8px 20px", fontSize: "10px", fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.06em" }}>
        ExecNoteShop &bull; Relationship &amp; Stakeholder Management Hub &bull; &copy; 2026 All Rights Reserved
      </td>
    </tr></tbody></table>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-rose-50/30">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-rose-600 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-50 border border-rose-100 text-rose-700 text-xs font-semibold"><BookOpen size={11} />Planner</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/relationship-hub" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-rose-600 transition-colors"><ArrowLeft size={14} />Back to Relationship Hub</Link>
          <CopyAllButton targetRef={fullRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-rose-100 flex items-center justify-center"><Handshake size={20} className="text-rose-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">Relationship Cadence Planner</h2><p className="text-xs font-medium text-rose-600">Touchpoint Schedule &bull; Never Let a Relationship Go Cold</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Define how often you should connect with each stakeholder and track whether you&apos;re keeping up. The biggest relationship killer is silence. This planner ensures you stay proactive instead of only reaching out when you need something.</p>
        </div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">View Mode</p>
          <div className="flex flex-wrap gap-2">
            {LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (
              <button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-rose-600 text-white border-rose-600 shadow-md shadow-rose-200" : "bg-white text-slate-600 border-slate-200 hover:border-rose-300 hover:text-rose-700"}`}>
                <Icon size={15} /><span>{l.label}</span><span className={`text-[10px] font-medium ${isActive ? "text-rose-200" : "text-slate-400"}`}>{l.desc}</span>
              </button>
            ); })}
          </div>
        </div>
        <div ref={fullRef} style={{ fontFamily: S.font }}>
          {layout === "full" && <>{renderTitleBanner()}{renderCadence()}{renderGuidelines()}{renderTips()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderCadence()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullRef} /></div>
      </div>
    </div>
  );
}

export default function RelationshipCadencePlannerPage() { return <ThemeProvider><CadenceContent /></ThemeProvider>; }
