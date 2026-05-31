"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, Crosshair, LayoutDashboard, AlignJustify, Zap } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Cockpit", desc: "Top 3 + tasks + blockers + Friday test", icon: LayoutDashboard },
  { id: "compact", label: "Quick View", desc: "Top 3 outcomes only", icon: AlignJustify },
];

function WeeklyPrioritiesContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullRef = useRef<HTMLDivElement>(null);
  const topRef = useRef<HTMLDivElement>(null);
  const tasksRef = useRef<HTMLDivElement>(null);
  const blockRef = useRef<HTMLDivElement>(null);
  const fridayRef = useRef<HTMLDivElement>(null);

  const accent = "#059669";

  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>WEEKLY PRIORITIES COCKPIT</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; OKR &amp; Operating Rhythm Hub &nbsp;|&nbsp; &#11088; All-Star &nbsp;|&nbsp; Week of [DATE]</td></tr>
    </tbody></table>
  );

  const renderTop = () => (
    <div ref={topRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accent)}>TOP 3 OUTCOMES THIS WEEK</td></tr></tbody></table>
      <CopyButton targetRef={topRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>If you could only accomplish 3 things this week, what would they be? These should directly move a Key Result forward.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "5%", textAlign: "center" as const }}>#</th>
          <th style={S.thPrimary}>Outcome (What &ldquo;Done&rdquo; Looks Like)</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Links to KR</th>
          <th style={{ ...S.thPrimary, width: "10%" }}>Owner</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Status</th>
        </tr></thead>
        <tbody>
          {[
            { n: "1", outcome: "[e.g., 2 new support agents hired and offer letters signed]", kr: "KR 1.1", owner: "[HR]", s: "In Progress", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg },
            { n: "2", outcome: "[e.g., Onboarding email sequence draft reviewed and approved by Product]", kr: "KR 1.2", owner: "[Product]", s: "Not Started", sBg: C.badgeAmberBg, sFg: C.badgeAmberFg },
            { n: "3", outcome: "[e.g., LinkedIn ad campaign live with $5K budget approved]", kr: "KR 2.1", owner: "[Marketing]", s: "In Progress", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 800, fontSize: "16px", color: accent }}>{r.n}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 600 }}>{r.outcome}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "9px", fontWeight: 700, color: "#7C3AED" }}>{r.kr}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px" }}>{r.owner}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.sBg, r.sFg)}>{r.s}</span></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderTasks = () => (
    <div ref={tasksRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner("#D97706")}>KEY TASKS TO COMPLETE THIS WEEK</td></tr></tbody></table>
      <CopyButton targetRef={tasksRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "3%", textAlign: "center" as const }}>&#9744;</th>
          <th style={S.thPrimary}>Task</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Supports</th>
          <th style={{ ...S.thPrimary, width: "10%" }}>Owner</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Due</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Priority</th>
        </tr></thead>
        <tbody>
          {[
            { task: "Draft job descriptions for 2 support agent roles", sup: "Outcome 1", owner: "[HR]", due: "Tue", pri: "High", priBg: C.badgeRedBg, priFg: C.badgeRedFg },
            { task: "Post roles on LinkedIn, Indeed, and internal referral channel", sup: "Outcome 1", owner: "[Recruiter]", due: "Wed", pri: "High", priBg: C.badgeRedBg, priFg: C.badgeRedFg },
            { task: "Review onboarding email copy with CX team", sup: "Outcome 2", owner: "[Product]", due: "Wed", pri: "Med", priBg: C.badgeAmberBg, priFg: C.badgeAmberFg },
            { task: "Set up LinkedIn Campaign Manager account", sup: "Outcome 3", owner: "[Marketing]", due: "Mon", pri: "High", priBg: C.badgeRedBg, priFg: C.badgeRedFg },
            { task: "Create 3 ad variations for A/B testing", sup: "Outcome 3", owner: "[Content]", due: "Thu", pri: "Med", priBg: C.badgeAmberBg, priFg: C.badgeAmberFg },
            { task: "Update KR scoreboard with this week's metrics", sup: "All KRs", owner: "[Ops]", due: "Fri", pri: "High", priBg: C.badgeRedBg, priFg: C.badgeRedFg },
            { task: "[Your task here]", sup: "", owner: "", due: "", pri: "", priBg: "transparent", priFg: C.textMuted },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "14px" }}>&#9744;</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.task}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "9px", fontWeight: 600, color: accent }}>{r.sup}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px" }}>{r.owner}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "10px", fontWeight: 700 }}>{r.due}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}>{r.pri && <span style={S.badge(r.priBg, r.priFg)}>{r.pri}</span>}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderBlockAndFriday = () => (
    <div ref={blockRef} style={{ marginBottom: "12px" }}>
      <CopyButton targetRef={blockRef} label="Copy Section" />
      <table style={LT}><tbody><tr>
        <td style={{ ...LC, width: "55%", paddingRight: "4px" }}>
          <table style={S.tbl}>
            <thead><tr><td style={{ backgroundColor: "#FEE2E2", color: "#DC2626", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #DC2626" }}>⚠️ BLOCKERS &amp; RISKS THIS WEEK</td></tr></thead>
            <tbody>
              {[
                { blocker: "[Budget approval for LinkedIn ads pending CFO sign-off]", impact: "Delays Outcome 3 by 1 week", who: "[CFO]", next: "Send approval request by EOD Mon" },
                { blocker: "[Legal template for enterprise contract not started]", impact: "Blocks enterprise deals", who: "[Legal Lead]", next: "Escalate to COO if not started by Wed" },
                { blocker: "[Your blocker here]", impact: "", who: "", next: "" },
              ].map((r, i) => {
                const bg = i % 2 === 1 ? C.rowAlt : C.white;
                return (
                  <tr key={i}>
                    <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", padding: "6px 10px" }}>
                      <span style={{ fontWeight: 600, color: "#DC2626" }}>{r.blocker}</span><br />
                      {r.impact && <span style={{ fontSize: "9px", color: C.textMuted }}>Impact: {r.impact} &nbsp;|&nbsp; Unblock: <span style={{ fontWeight: 700 }}>{r.who}</span> &nbsp;|&nbsp; Next: {r.next}</span>}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </td>
        <td style={{ ...LC, width: "45%", paddingLeft: "4px" }}>
          <table style={S.tbl}>
            <thead><tr><td style={{ backgroundColor: "#EDE9FE", color: "#7C3AED", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #7C3AED" }}>✅ FRIDAY TEST</td></tr></thead>
            <tbody>
              {[
                "2 offer letters sent to support agent candidates.",
                "Onboarding email draft reviewed and feedback incorporated.",
                "LinkedIn campaign live and first impressions data visible.",
                "KR scoreboard updated with Week [X] metrics.",
                "[Your Friday test here]",
              ].map((item, i) => {
                const bg = i % 2 === 1 ? C.rowAlt : C.white;
                return (
                  <tr key={i}>
                    <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", padding: "5px 10px" }}>
                      &#9744; {item}
                    </td>
                  </tr>
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
        ExecNoteShop &bull; OKR &amp; Operating Rhythm Hub &bull; &copy; 2026 All Rights Reserved
      </td>
    </tr></tbody></table>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50/30">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-600 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-semibold"><Zap size={11} />All-Star</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/okr-hub" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-emerald-600 transition-colors"><ArrowLeft size={14} />Back to OKR Hub</Link>
          <CopyAllButton targetRef={fullRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center"><Crosshair size={20} className="text-emerald-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">Weekly Priorities Cockpit</h2><p className="text-xs font-medium text-emerald-600">&#11088; All-Star &mdash; Top 3 Outcomes This Week</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Top outcomes, key tasks, blockers, and &ldquo;what must be true by Friday.&rdquo; Makes execution real.</p>
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
          {layout === "full" && <>{renderTitleBanner()}{renderTop()}{renderTasks()}{renderBlockAndFriday()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderTop()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullRef} /></div>
      </div>
    </div>
  );
}

export default function WeeklyPrioritiesCockpitPage() { return <ThemeProvider><WeeklyPrioritiesContent /></ThemeProvider>; }
