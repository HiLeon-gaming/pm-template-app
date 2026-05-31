"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, Handshake, LayoutDashboard, AlignJustify, Send } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Builder", desc: "Template + example + tips", icon: LayoutDashboard },
  { id: "compact", label: "Quick Builder", desc: "Template only", icon: AlignJustify },
];

function UpdateContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullRef = useRef<HTMLDivElement>(null);
  const templateRef = useRef<HTMLDivElement>(null);
  const exampleRef = useRef<HTMLDivElement>(null);
  const tipsRef = useRef<HTMLDivElement>(null);

  const accent = "#059669";
  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>STAKEHOLDER UPDATE BUILDER (SHORT)</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; Relationship &amp; Stakeholder Management Hub &nbsp;|&nbsp; Quick Status Update</td></tr>
    </tbody></table>
  );

  const renderTemplate = () => (
    <div ref={templateRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accent)}>STATUS UPDATE TEMPLATE</td></tr></tbody></table>
      <CopyButton targetRef={templateRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>A quick, structured status update for email, Slack, or Teams. Takes 5 minutes to write. Keeps stakeholders informed without scheduling another meeting. Use the PRANK format: Progress, Risks, Asks, Next Steps, Key Dates.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "20%" }}>Section</th>
          <th style={S.thPrimary}>Content</th>
        </tr></thead>
        <tbody>
          {[
            { label: "To / Audience", value: "[Who is this update for? Name or group.]" },
            { label: "Date", value: "[Update date]" },
            { label: "Subject Line", value: "[Project Name] Status Update \u2014 [Date] \u2014 [Overall RAG: \ud83d\udfe2/\ud83d\udfe1/\ud83d\udd34]" },
            { label: "\ud83d\udfe2 PROGRESS", value: "[2\u20133 bullets: What was accomplished since last update? Key milestones hit?]" },
            { label: "\ud83d\udd34 RISKS / BLOCKERS", value: "[1\u20132 bullets: What could go wrong? What\u2019s blocked? Be honest, not optimistic.]" },
            { label: "\u2753 ASKS / NEEDS", value: "[What do you need from the reader? Decisions? Resources? Approvals? Be specific.]" },
            { label: "\u27a1\ufe0f NEXT STEPS", value: "[What\u2019s happening next? Who\u2019s doing what?]" },
            { label: "\ud83d\udcc5 KEY DATES", value: "[Upcoming deadlines, milestones, or meetings that matter]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 700, color: accent }}>{r.label}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.value}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderExample = () => (
    <div ref={exampleRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner("#6366F1")}>EXAMPLE: COMPLETED UPDATE</td></tr></tbody></table>
      <CopyButton targetRef={exampleRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr><th style={{ ...S.thPrimary, textAlign: "left" as const }}>Example Status Update</th></tr></thead>
        <tbody>
          <tr><td style={{ ...S.td0, fontSize: "10px", padding: "12px 16px", lineHeight: "1.7", backgroundColor: "#F8FAFC" }}>
            <strong>Subject:</strong> Data Platform Migration Status \u2014 Mar 14 \u2014 \ud83d\udfe1 Amber<br /><br />
            <strong style={{ color: accent }}>\ud83d\udfe2 PROGRESS:</strong><br />
            &bull; Vendor selected (Vendor X) \u2014 approved by SteerCo Mar 13<br />
            &bull; Contract sent to Legal for review<br />
            &bull; Technical architecture doc 80% complete<br /><br />
            <strong style={{ color: "#DC2626" }}>\ud83d\udd34 RISKS / BLOCKERS:</strong><br />
            &bull; Legal review may take 3 weeks (standard queue). Asking sponsor to expedite.<br />
            &bull; API dependency timeline still pending from Engineering (3 days overdue).<br /><br />
            <strong style={{ color: "#D97706" }}>\u2753 ASKS:</strong><br />
            &bull; Maria: Can you flag the Legal review as priority? Contact: [Legal Lead]<br />
            &bull; James: Need the API timeline by EOD Friday to avoid sprint planning delay.<br /><br />
            <strong style={{ color: "#0EA5E9" }}>\u27a1\ufe0f NEXT STEPS:</strong><br />
            &bull; Finalize architecture doc (Owner: You, Due: Mar 18)<br />
            &bull; Security audit kickoff (Owner: James, Due: Mar 20)<br /><br />
            <strong style={{ color: "#6366F1" }}>\ud83d\udcc5 KEY DATES:</strong><br />
            &bull; Mar 18: Architecture doc complete<br />
            &bull; Mar 20: Next check-in<br />
            &bull; Mar 22: Contract expected back from Legal
          </td></tr>
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
            <thead><tr><td style={{ backgroundColor: "#DCFCE7", color: "#059669", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #059669" }}>UPDATE WRITING RULES</td></tr></thead>
            <tbody>
              {[
                { color: "#059669", tip: "Keep it under 150 words.", detail: "If they have to scroll, they won\u2019t read it. Be ruthlessly concise." },
                { color: "#0EA5E9", tip: "Lead with the overall RAG status.", detail: "Green/Amber/Red in the subject line lets people triage before opening." },
                { color: "#8B5CF6", tip: "Be honest about risks.", detail: "Hiding risks in updates is career-ending. Surface them early with a plan." },
                { color: "#D97706", tip: "Make asks specific and actionable.", detail: "\u201CNeed your help\u201D is vague. \u201CCan you flag Legal review as priority by Friday?\u201D is actionable." },
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
            <thead><tr><td style={{ backgroundColor: "#FEF3C7", color: "#D97706", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #D97706" }}>WHEN TO SEND UPDATES</td></tr></thead>
            <tbody>
              {[
                { color: "#D97706", tip: "Weekly for active projects.", detail: "Same day, same time, every week. Consistency builds confidence." },
                { color: "#DC2626", tip: "Immediately when something changes.", detail: "New risk? Missed deadline? Don\u2019t wait for the weekly update. Send now." },
                { color: "#EA580C", tip: "Before they have to ask.", detail: "If a stakeholder asks for an update, you\u2019re already late. Be proactive." },
                { color: "#059669", tip: "After every significant meeting.", detail: "Combine with your follow-up email for maximum efficiency." },
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
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-semibold"><Send size={11} />Quick Update</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/relationship-hub" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-rose-600 transition-colors"><ArrowLeft size={14} />Back to Relationship Hub</Link>
          <CopyAllButton targetRef={fullRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center"><Handshake size={20} className="text-emerald-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">Stakeholder Update Builder (Short)</h2><p className="text-xs font-medium text-emerald-600">Quick Status &bull; Progress, Risks, Asks, Next Steps</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">A quick, structured status update for email, Slack, or Teams. Takes 5 minutes to write. Uses the PRANK format (Progress, Risks, Asks, Next Steps, Key Dates) to keep stakeholders informed without scheduling another meeting.</p>
        </div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">View Mode</p>
          <div className="flex flex-wrap gap-2">
            {LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (
              <button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-200" : "bg-white text-slate-600 border-slate-200 hover:border-emerald-300 hover:text-emerald-700"}`}>
                <Icon size={15} /><span>{l.label}</span><span className={`text-[10px] font-medium ${isActive ? "text-emerald-200" : "text-slate-400"}`}>{l.desc}</span>
              </button>
            ); })}
          </div>
        </div>
        <div ref={fullRef} style={{ fontFamily: S.font }}>
          {layout === "full" && <>{renderTitleBanner()}{renderTemplate()}{renderExample()}{renderTips()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderTemplate()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullRef} /></div>
      </div>
    </div>
  );
}

export default function StakeholderUpdateShortPage() { return <ThemeProvider><UpdateContent /></ThemeProvider>; }
