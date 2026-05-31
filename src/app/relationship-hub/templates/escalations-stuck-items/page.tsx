"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, Handshake, LayoutDashboard, AlignJustify, AlertTriangle } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Log", desc: "Active items + resolved + tips", icon: LayoutDashboard },
  { id: "compact", label: "Quick Log", desc: "Active items only", icon: AlignJustify },
];

function EscalationsContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef<HTMLDivElement>(null);
  const resolvedRef = useRef<HTMLDivElement>(null);
  const tipsRef = useRef<HTMLDivElement>(null);

  const accent = "#EA580C";
  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>ESCALATIONS &amp; STUCK ITEMS LOG</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; Relationship &amp; Stakeholder Management Hub &nbsp;|&nbsp; Unblock &amp; Resolve</td></tr>
    </tbody></table>
  );

  const renderActive = () => (
    <div ref={activeRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner("#DC2626")}>ACTIVE ESCALATIONS &amp; STUCK ITEMS</td></tr></tbody></table>
      <CopyButton targetRef={activeRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>Items that are blocked, stuck, or need escalation. For each item: what&apos;s stuck, why, who can unblock it, and your recommended path forward. Don&apos;t let items sit here for more than a week without action.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "4%", textAlign: "center" as const }}>#</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Severity</th>
          <th style={S.thPrimary}>What&apos;s Stuck</th>
          <th style={{ ...S.thPrimary, width: "15%" }}>Why It&apos;s Stuck</th>
          <th style={{ ...S.thPrimary, width: "10%" }}>Who Can Unblock</th>
          <th style={{ ...S.thPrimary, width: "10%" }}>Deadline</th>
          <th style={{ ...S.thPrimary, width: "15%" }}>Recommended Action</th>
        </tr></thead>
        <tbody>
          {[
            { n: "1", sev: "Critical", what: "API dependency timeline from Engineering \u2014 blocks entire sprint planning.", why: "James Wu hasn\u2019t responded to 2 follow-ups. May need manager involvement.", who: "Eng. Director", deadline: "Mar 15", action: "Ask your manager to ping Eng. Director. Include impact statement." },
            { n: "2", sev: "High", what: "Headcount approval for additional PM \u2014 team is under-resourced.", why: "HR approval process stalled. No response in 13 days.", who: "HR VP / Your Dir.", deadline: "Mar 20", action: "Escalate through your director. Quantify the cost of delay." },
            { n: "3", sev: "Medium", what: "Legal contract review for vendor agreement \u2014 procurement delayed.", why: "Legal team has competing priorities. Normal queue is 3 weeks.", who: "Legal Lead", deadline: "Mar 25", action: "Ask sponsor to flag as priority. Offer to pre-fill legal template." },
            { n: "4", sev: "[Sev]", what: "[What\u2019s blocked or stuck]", why: "[Root cause of the block]", who: "[Person who can unblock]", deadline: "[When this must be resolved]", action: "[Your recommended next step]" },
            { n: "5", sev: "[Sev]", what: "[What\u2019s blocked or stuck]", why: "[Root cause of the block]", who: "[Person who can unblock]", deadline: "[When this must be resolved]", action: "[Your recommended next step]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            const sc = r.sev === "Critical" ? { bg: C.badgeRedBg, fg: C.badgeRedFg } : r.sev === "High" ? { bg: C.badgeAmberBg, fg: C.badgeAmberFg } : r.sev === "Medium" ? { bg: "#DBEAFE", fg: "#1D4ED8" } : { bg: C.badgeGrayBg, fg: C.badgeGrayFg };
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 800, fontSize: "10px" }}>{r.n}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(sc.bg, sc.fg)}>{r.sev}</span></td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", fontWeight: 600 }}>{r.what}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", color: C.textMuted }}>{r.why}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", fontWeight: 700 }}>{r.who}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", color: "#DC2626", fontWeight: 600 }}>{r.deadline}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px" }}>{r.action}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderResolved = () => (
    <div ref={resolvedRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner("#059669")}>RECENTLY RESOLVED</td></tr></tbody></table>
      <CopyButton targetRef={resolvedRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>Items that were stuck but are now resolved. Keep these for reference &mdash; they show patterns and help you anticipate future blocks.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "15%" }}>Item</th>
          <th style={S.thPrimary}>How It Was Resolved</th>
          <th style={{ ...S.thPrimary, width: "10%" }}>Days Stuck</th>
          <th style={{ ...S.thPrimary, width: "25%" }}>Lesson Learned</th>
        </tr></thead>
        <tbody>
          {[
            { item: "Budget approval delay", how: "Director escalated to CFO. Approved within 2 days of escalation.", days: "8", lesson: "Should have escalated at day 5, not day 8. Lost a week." },
            { item: "[Resolved item]", how: "[What unblocked it]", days: "[X]", lesson: "[What you\u2019d do differently next time]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 700, color: "#059669" }}>{r.item}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px" }}>{r.how}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", textAlign: "center" as const, fontWeight: 700 }}>{r.days}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", color: C.textMuted }}>{r.lesson}</td>
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
            <thead><tr><td style={{ backgroundColor: "#FEE2E2", color: "#DC2626", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #DC2626" }}>ESCALATION PRINCIPLES</td></tr></thead>
            <tbody>
              {[
                { color: "#DC2626", tip: "Escalation is a tool, not a threat.", detail: "Frame it as \u201CI need help unblocking this\u201D not \u201CI\u2019m going over your head.\u201D" },
                { color: "#EA580C", tip: "Always try direct resolution first.", detail: "Escalate only after 2+ direct attempts have failed. Document your attempts." },
                { color: "#D97706", tip: "Include context + impact + recommendation.", detail: "Don\u2019t just escalate the problem. Propose a solution. Leaders want options, not just issues." },
                { color: "#059669", tip: "Follow up after escalation.", detail: "Escalation without follow-through is worse than no escalation. Track it to closure." },
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
            <thead><tr><td style={{ backgroundColor: "#FEF3C7", color: "#D97706", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #D97706" }}>PREVENTING STUCK ITEMS</td></tr></thead>
            <tbody>
              {[
                { color: "#D97706", tip: "Set clear deadlines upfront.", detail: "Vague requests get vague timelines. Always attach a date and reason." },
                { color: "#6366F1", tip: "Identify blockers early in planning.", detail: "During sprint/project planning, ask: \u201CWhat could block this?\u201D Address dependencies proactively." },
                { color: "#EA580C", tip: "Build relationships before you need them.", detail: "It\u2019s easier to escalate when you have a relationship with the person who can help." },
                { color: "#DC2626", tip: "Don\u2019t let items age silently.", detail: "If something has been stuck for >5 days, it needs attention. Silence is not a strategy." },
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
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-orange-50 border border-orange-100 text-orange-700 text-xs font-semibold"><AlertTriangle size={11} />Unblock</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/relationship-hub" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-rose-600 transition-colors"><ArrowLeft size={14} />Back to Relationship Hub</Link>
          <CopyAllButton targetRef={fullRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center"><Handshake size={20} className="text-orange-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">Escalations &amp; Stuck Items Log</h2><p className="text-xs font-medium text-orange-600">Unblock &bull; Resolve &bull; Learn</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Track every blocked item, escalation, and stuck dependency in one place. For each: document the context, impact, who can unblock, and your recommended action. Don&apos;t let items sit here for more than a week without movement.</p>
        </div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">View Mode</p>
          <div className="flex flex-wrap gap-2">
            {LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (
              <button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-orange-600 text-white border-orange-600 shadow-md shadow-orange-200" : "bg-white text-slate-600 border-slate-200 hover:border-orange-300 hover:text-orange-700"}`}>
                <Icon size={15} /><span>{l.label}</span><span className={`text-[10px] font-medium ${isActive ? "text-orange-200" : "text-slate-400"}`}>{l.desc}</span>
              </button>
            ); })}
          </div>
        </div>
        <div ref={fullRef} style={{ fontFamily: S.font }}>
          {layout === "full" && <>{renderTitleBanner()}{renderActive()}{renderResolved()}{renderTips()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderActive()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullRef} /></div>
      </div>
    </div>
  );
}

export default function EscalationsStuckItemsPage() { return <ThemeProvider><EscalationsContent /></ThemeProvider>; }
