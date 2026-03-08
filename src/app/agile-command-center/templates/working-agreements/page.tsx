"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, Handshake, LayoutDashboard, AlignJustify, Zap } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Agreement", desc: "All sections", icon: LayoutDashboard },
  { id: "compact", label: "Quick Norms", desc: "Summary only", icon: AlignJustify },
];

function WorkingAgreementsContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const commRef = useRef<HTMLDivElement>(null);
  const meetingsRef = useRef<HTMLDivElement>(null);
  const workRef = useRef<HTMLDivElement>(null);
  const conflictRef = useRef<HTMLDivElement>(null);
  const sigRef = useRef<HTMLDivElement>(null);

  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };
  const accent = "#0EA5E9"; const accentDark = "#0369A1";

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>🤝 WORKING AGREEMENTS + TEAM NORMS</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; Agile / Scrum Delivery Command Center &nbsp;|&nbsp; Our Rules, Our Culture</td></tr>
    </tbody></table>
  );

  const renderHeader = () => (
    <div ref={headerRef} style={{ marginBottom: "12px" }}>
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "18%" }}>Team Name</td><td style={{ ...S.td0, width: "32%" }}>[Team Name]</td><td style={{ ...S.tdLabel, width: "18%" }}>Created</td><td style={{ ...S.td0, width: "32%" }}>[MM/DD/YYYY]</td></tr>
        <tr><td style={S.tdLabelAlt}>Last Reviewed</td><td style={S.tdAlt}>[MM/DD/YYYY]</td><td style={S.tdLabelAlt}>Review Cadence</td><td style={S.tdAlt}>[Every 3 sprints or when team composition changes]</td></tr>
      </tbody></table>
      <CopyButton targetRef={headerRef} label="Copy Section" />
    </div>
  );

  const normCard = (title: string, emoji: string, color: string, norms: { norm: string; detail: string }[]) => (
    <table style={S.tbl}>
      <thead><tr><td style={{ backgroundColor: color, color: C.white, padding: "10px 14px", fontFamily: S.font, fontSize: "13px", fontWeight: 800, border: `1.5px solid ${C.border}` }}>{emoji} {title}</td></tr></thead>
      <tbody>
        {norms.map((n, i) => (
          <tr key={i}>
            <td style={{ ...S.td0, backgroundColor: i % 2 === 0 ? C.white : C.rowAlt, fontSize: "11px", padding: "6px 12px" }}>
              <strong style={{ color: C.primary }}>{n.norm}</strong> — {n.detail}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  const renderComm = () => (
    <div ref={commRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(accent)}>💬 COMMUNICATION NORMS</div>
      <CopyButton targetRef={commRef} label="Copy Section" />
      <table style={LT}><tbody><tr>
        <td style={{ ...LC, width: "50%", paddingRight: "5px" }}>
          {normCard("CHANNELS", "📡", accentDark, [
            { norm: "Slack #team-channel", detail: "Day-to-day questions, quick updates, and FYIs" },
            { norm: "Slack DM or Huddle", detail: "Urgent items that need immediate attention" },
            { norm: "Email", detail: "External stakeholders, formal decisions, and approvals" },
            { norm: "OneNote (this pack)", detail: "Sprint artifacts, decisions, retro actions, and metrics" },
          ])}
        </td>
        <td style={{ ...LC, width: "50%", paddingLeft: "5px" }}>
          {normCard("RESPONSE TIMES", "⏱️", "#059669", [
            { norm: "Slack — same day", detail: "Acknowledge within 4 hours; respond fully within 8 hours" },
            { norm: "Urgent / Blockers", detail: "Respond within 1 hour during working hours" },
            { norm: "Email — 24 hours", detail: "Acknowledge receipt; full response within 48 hours if complex" },
            { norm: "After hours", detail: "No expectation to respond outside working hours unless on-call" },
          ])}
        </td>
      </tr></tbody></table>
    </div>
  );

  const renderMeetings = () => (
    <div ref={meetingsRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(accentDark)}>📅 MEETING EXPECTATIONS</div>
      <CopyButton targetRef={meetingsRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={S.thSecondary}>Ceremony</th>
          <th style={{ ...S.thSecondary, width: "10%", textAlign: "center" as const }}>Duration</th>
          <th style={{ ...S.thSecondary, width: "14%", textAlign: "center" as const }}>Cadence</th>
          <th style={{ ...S.thSecondary, width: "36%" }}>Our Agreement</th>
        </tr></thead>
        <tbody>
          {[
            { cer: "Daily Scrum / Standup", dur: "15 min", cad: "Daily", agree: "Start on time, no laptops, 3 questions only, park deep-dives" },
            { cer: "Sprint Planning", dur: "1–2 hrs", cad: "Sprint start", agree: "PO presents refined stories; team estimates; commitment is a team decision" },
            { cer: "Backlog Refinement", dur: "45 min", cad: "Mid-sprint", agree: "PO brings 2 sprints of stories; team asks questions and sizes" },
            { cer: "Sprint Review / Demo", dur: "30–60 min", cad: "Sprint end", agree: "Demo working software only; stakeholders give honest feedback" },
            { cer: "Retrospective", dur: "30–45 min", cad: "Sprint end", agree: "Safe space; focus on process not people; actions must have owners" },
            { cer: "Stakeholder Update", dur: "15 min", cad: "Weekly", agree: "SM or PO sends update; keep it brief; call out asks clearly" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 700, fontSize: "12px" }}>{r.cer}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "11px" }}>{r.dur}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(C.badgeBlueBg, C.badgeBlueFg)}>{r.cad}</span></td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{r.agree}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderWork = () => (
    <div ref={workRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(accent)}>⚙️ WORK PRACTICES</div>
      <CopyButton targetRef={workRef} label="Copy Section" />
      <table style={LT}><tbody><tr>
        <td style={{ ...LC, width: "50%", paddingRight: "5px" }}>
          {normCard("CODE & QUALITY", "🔧", "#DC2626", [
            { norm: "Code reviews required", detail: "Every PR needs at least 1 reviewer before merge" },
            { norm: "Test coverage", detail: "Unit tests for all new features; no merge with failing tests" },
            { norm: "Definition of Done", detail: "Story isn't done until DoD checklist is complete" },
            { norm: "Documentation", detail: "Update docs same sprint as feature delivery" },
          ])}
        </td>
        <td style={{ ...LC, width: "50%", paddingLeft: "5px" }}>
          {normCard("WIP & FOCUS", "🎯", "#F59E0B", [
            { norm: "WIP limit: 2 per person", detail: "No more than 2 active stories per individual" },
            { norm: "Finish before starting", detail: "Complete in-progress work before pulling new stories" },
            { norm: "Core hours: 10 AM–3 PM", detail: "Available for collaboration; protect deep work outside" },
            { norm: "Focus blocks", detail: "Respect \u201CDo Not Disturb\u201D signals — no interruptions" },
          ])}
        </td>
      </tr></tbody></table>
    </div>
  );

  const renderConflict = () => (
    <div ref={conflictRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(accentDark)}>⚖️ CONFLICT RESOLUTION</div>
      <CopyButton targetRef={conflictRef} label="Copy Section" />
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "22%" }}>Step 1 — Direct</td><td style={S.td0}>[Discuss the issue directly with the person involved — assume positive intent]</td></tr>
        <tr><td style={S.tdLabelAlt}>Step 2 — Facilitate</td><td style={S.tdAlt}>[If unresolved, bring to SM for facilitated conversation]</td></tr>
        <tr><td style={S.tdLabel}>Step 3 — Escalate</td><td style={S.td0}>[If still unresolved, escalate to PO or management with clear context]</td></tr>
        <tr><td style={{ ...S.tdLabelAlt, fontWeight: 700, color: accent }}>Ground Rule</td><td style={{ ...S.tdAlt, fontWeight: 600 }}>We disagree openly, decide together, and commit fully once decided.</td></tr>
      </tbody></table>
    </div>
  );

  const renderSignoff = () => (
    <div ref={sigRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(accent)}>✍️ TEAM SIGN-OFF</div>
      <CopyButton targetRef={sigRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>By adding your name below, you agree to uphold these working agreements and hold each other accountable.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "5%", textAlign: "center" as const }}>#</th>
          <th style={S.thPrimary}>Name</th>
          <th style={{ ...S.thPrimary, width: "20%" }}>Role</th>
          <th style={{ ...S.thPrimary, width: "14%", textAlign: "center" as const }}>Date</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Signed</th>
        </tr></thead>
        <tbody>
          {Array.from({ length: 8 }).map((_, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, color: C.textMuted }}>{i + 1}</td>
                <td style={{ ...S.td0, backgroundColor: bg }}>&nbsp;</td>
                <td style={{ ...S.td0, backgroundColor: bg }}>&nbsp;</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}>&nbsp;</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "15px" }}>☐</td>
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
        ExecNoteShop &nbsp;&bull;&nbsp; Agile / Scrum Delivery Command Center &nbsp;&bull;&nbsp; &copy; 2026 All Rights Reserved
      </td>
    </tr></tbody></table>
  );

  const renderFullLayout = () => (
    <>{renderTitleBanner()}{renderHeader()}{renderComm()}{renderMeetings()}{renderWork()}{renderConflict()}{renderSignoff()}{renderFooter()}</>
  );

  const renderCompactLayout = () => (
    <>{renderTitleBanner()}{renderHeader()}{renderComm()}{renderMeetings()}{renderConflict()}{renderFooter()}</>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-sky-50/30">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-sky-600 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-sky-50 border border-sky-100 text-sky-700 text-xs font-semibold"><Handshake size={11} />Team Norms</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/agile-command-center" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-sky-600 transition-colors"><ArrowLeft size={14} />Back to Agile Command Center</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-sky-100 flex items-center justify-center"><Handshake size={20} className="text-sky-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">Working Agreements + Team Norms</h2><p className="text-xs font-medium text-sky-600">Our Rules, Our Culture &mdash; Reduce Friction, Increase Predictability</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Communication channels, response times, meeting expectations, WIP limits, code practices, conflict resolution, and team sign-off.</p>
        </div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">View Mode</p>
          <div className="flex flex-wrap gap-2">
            {LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (
              <button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-sky-600 text-white border-sky-600 shadow-md shadow-sky-200" : "bg-white text-slate-600 border-slate-200 hover:border-sky-300 hover:text-sky-700"}`}>
                <Icon size={15} /><span>{l.label}</span><span className={`text-[10px] font-medium ${isActive ? "text-sky-200" : "text-slate-400"}`}>{l.desc}</span>
              </button>
            ); })}
          </div>
        </div>
        <div ref={fullPageRef} style={{ fontFamily: S.font }}>
          {layout === "full" && renderFullLayout()}
          {layout === "compact" && renderCompactLayout()}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function WorkingAgreementsPage() { return <ThemeProvider><WorkingAgreementsContent /></ThemeProvider>; }
