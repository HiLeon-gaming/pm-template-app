"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, Lightbulb, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Brainstorm", desc: "Ideas + evaluation + shortlist + tips", icon: LayoutDashboard },
  { id: "compact", label: "Quick Capture", desc: "Idea table only", icon: AlignJustify },
];

function InitiativeBrainstormContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullRef = useRef<HTMLDivElement>(null);
  const ideasRef = useRef<HTMLDivElement>(null);
  const evalRef = useRef<HTMLDivElement>(null);
  const shortRef = useRef<HTMLDivElement>(null);
  const tipsRef = useRef<HTMLDivElement>(null);

  const accent = "#D97706";

  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>INITIATIVE BRAINSTORM &amp; SELECTION</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; OKR &amp; Operating Rhythm Hub &nbsp;|&nbsp; What Work Moves Key Results?</td></tr>
    </tbody></table>
  );

  const renderIdeas = () => (
    <div ref={ideasRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(accent)}>INITIATIVE IDEAS (Brainstorm All Options)</div>
      <CopyButton targetRef={ideasRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>List every possible project, initiative, or action that could move a Key Result. Don&apos;t filter yet — just capture. You&apos;ll prioritize in the next section.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "5%", textAlign: "center" as const }}>#</th>
          <th style={S.thPrimary}>Initiative Idea</th>
          <th style={{ ...S.thPrimary, width: "12%", textAlign: "center" as const }}>Links to KR</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Est. Effort</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Est. Impact</th>
          <th style={{ ...S.thPrimary, width: "10%" }}>Proposed By</th>
        </tr></thead>
        <tbody>
          {[
            { idea: "Hire 3 support agents and onboard within 4 weeks", kr: "KR 1.1", effort: "Med", impact: "High", by: "[Support]" },
            { idea: "Migrate from Zendesk to Intercom for faster ticketing", kr: "KR 1.1", effort: "High", impact: "High", by: "[IT]" },
            { idea: "Redesign customer onboarding email sequence (7-day drip)", kr: "KR 1.2", effort: "Low", impact: "Med", by: "[Product]" },
            { idea: "Build interactive product walkthrough (in-app)", kr: "KR 1.2", effort: "High", impact: "High", by: "[Product]" },
            { idea: "Launch detractor recovery program (call within 24 hrs)", kr: "KR 1.3", effort: "Med", impact: "High", by: "[CX]" },
            { idea: "Run LinkedIn paid ad campaign ($10K/mo budget)", kr: "KR 2.1", effort: "Med", impact: "Med", by: "[Marketing]" },
            { idea: "Publish 8 case studies from existing customers", kr: "KR 2.2", effort: "Med", impact: "High", by: "[Marketing]" },
            { idea: "Build enterprise sales playbook with templates", kr: "KR 2.2", effort: "Med", impact: "High", by: "[Sales]" },
            { idea: "Pre-clear legal terms with standard enterprise contract", kr: "KR 2.3", effort: "Med", impact: "Med", by: "[Legal]" },
            { idea: "Run recruiter sprint for VP Engineering role", kr: "KR 3.1", effort: "Low", impact: "High", by: "[HR]" },
            { idea: "Launch monthly pulse survey + manager action plans", kr: "KR 3.2", effort: "Low", impact: "Med", by: "[PeopleOps]" },
            { idea: "[Your idea here]", kr: "[KR #]", effort: "", impact: "", by: "" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            const eBg = r.effort === "High" ? C.badgeRedBg : r.effort === "Med" ? C.badgeAmberBg : r.effort === "Low" ? C.badgeGreenBg : "transparent";
            const eFg = r.effort === "High" ? C.badgeRedFg : r.effort === "Med" ? C.badgeAmberFg : r.effort === "Low" ? C.badgeGreenFg : C.textMuted;
            const iBg = r.impact === "High" ? C.badgeGreenBg : r.impact === "Med" ? C.badgeAmberBg : r.impact === "Low" ? C.badgeRedBg : "transparent";
            const iFg = r.impact === "High" ? C.badgeGreenFg : r.impact === "Med" ? C.badgeAmberFg : r.impact === "Low" ? C.badgeRedFg : C.textMuted;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 800, fontSize: "12px", color: accent }}>{i + 1}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.idea}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "9px", fontWeight: 700, color: "#7C3AED" }}>{r.kr}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}>{r.effort && <span style={S.badge(eBg, eFg)}>{r.effort}</span>}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}>{r.impact && <span style={S.badge(iBg, iFg)}>{r.impact}</span>}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px" }}>{r.by}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderEval = () => (
    <div ref={evalRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner("#7C3AED")}>EVALUATION CRITERIA (How to Pick Winners)</div>
      <CopyButton targetRef={evalRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={S.thPrimary}>Criterion</th>
          <th style={{ ...S.thPrimary, width: "50%" }}>Questions to Ask</th>
        </tr></thead>
        <tbody>
          {[
            { crit: "Impact on Key Result", q: "How much will this move the needle? Is the impact direct and measurable?" },
            { crit: "Effort / Cost", q: "How many people, hours, and dollars does this require? Can we do it this quarter?" },
            { crit: "Speed to Impact", q: "How quickly will we see results? Days? Weeks? Months?" },
            { crit: "Dependencies", q: "Does this require other teams, tools, or approvals? More deps = more risk." },
            { crit: "Reversibility", q: "If this doesn't work, can we undo it easily? Lower risk = easier to try." },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 700, color: "#7C3AED" }}>{r.crit}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.q}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderShortAndTips = () => (
    <div ref={shortRef} style={{ marginBottom: "12px" }}>
      <CopyButton targetRef={shortRef} label="Copy Section" />
      <table style={LT}><tbody><tr>
        <td style={{ ...LC, width: "58%", paddingRight: "4px" }}>
          <table style={S.tbl}>
            <thead><tr><td style={{ backgroundColor: "#D1FAE5", color: "#059669", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #059669" }}>✅ SELECTED INITIATIVES</td></tr></thead>
            <tbody>
              {[
                { kr: "KR 1.1", init: "Hire 3 support agents + onboard by Wk 4", owner: "[HR + Support]", s: "In Progress", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg },
                { kr: "KR 1.2", init: "Redesign onboarding email sequence", owner: "[Product]", s: "Planning", sBg: C.badgeBlueBg, sFg: C.badgeBlueFg },
                { kr: "KR 1.3", init: "Launch detractor recovery program", owner: "[CX]", s: "Not Started", sBg: C.badgeAmberBg, sFg: C.badgeAmberFg },
                { kr: "KR 2.1", init: "Run LinkedIn paid campaign", owner: "[Marketing]", s: "In Progress", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg },
                { kr: "KR 2.2", init: "Enterprise playbook + 4 case studies", owner: "[Sales+Mktg]", s: "Planning", sBg: C.badgeBlueBg, sFg: C.badgeBlueFg },
                { kr: "KR 3.1", init: "Recruiter sprint for VP Eng + 4 ICs", owner: "[HR]", s: "In Progress", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg },
              ].map((r, i) => {
                const bg = i % 2 === 1 ? C.rowAlt : C.white;
                return (
                  <tr key={i}>
                    <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", padding: "5px 10px" }}>
                      <span style={{ color: "#7C3AED", fontWeight: 700, fontSize: "9px" }}>{r.kr}</span> <strong>{r.init}</strong> <span style={S.badge(r.sBg, r.sFg)}>{r.s}</span><br />
                      <span style={{ fontSize: "9px", color: C.textMuted }}>{r.owner}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </td>
        <td style={{ ...LC, width: "42%", paddingLeft: "4px" }}>
          <table style={S.tbl}>
            <thead><tr><td style={{ backgroundColor: "#FEE2E2", color: "#DC2626", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #DC2626" }}>💡 BRAINSTORM TIPS</td></tr></thead>
            <tbody>
              {[
                { color: accent, tip: "Brainstorm first, evaluate second.", detail: "Capture everything, then filter. Don't shoot down ideas early." },
                { color: "#059669", tip: "High-impact, low-effort first.", detail: "Quick wins build momentum and free capacity for bigger bets." },
                { color: "#DC2626", tip: "Every KR needs \u2265 1 initiative.", detail: "A Key Result without an initiative is just a wish." },
                { color: "#7C3AED", tip: "Limit to 5\u20138 initiatives total.", detail: "More = no focus. Use the Stop Doing list to create room." },
              ].map((r, i) => {
                const bg = i % 2 === 1 ? C.rowAlt : C.white;
                return (
                  <tr key={i}>
                    <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", padding: "5px 10px" }}>
                      <strong style={{ color: r.color }}>{r.tip}</strong><br />
                      <span style={{ fontSize: "9px", color: C.textMuted }}>{r.detail}</span>
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-amber-50/30">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-amber-600 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-100 text-amber-700 text-xs font-semibold"><Lightbulb size={11} />Brainstorm</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/okr-hub" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-amber-600 transition-colors"><ArrowLeft size={14} />Back to OKR Hub</Link>
          <CopyAllButton targetRef={fullRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center"><Lightbulb size={20} className="text-amber-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">Initiative Brainstorm &amp; Selection</h2><p className="text-xs font-medium text-amber-600">What Work Moves Key Results?</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Brainstorm all possible projects, evaluate, and select the best ones. The bridge between goals and action.</p>
        </div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">View Mode</p>
          <div className="flex flex-wrap gap-2">
            {LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (
              <button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-amber-600 text-white border-amber-600 shadow-md shadow-amber-200" : "bg-white text-slate-600 border-slate-200 hover:border-amber-300 hover:text-amber-700"}`}>
                <Icon size={15} /><span>{l.label}</span><span className={`text-[10px] font-medium ${isActive ? "text-amber-200" : "text-slate-400"}`}>{l.desc}</span>
              </button>
            ); })}
          </div>
        </div>
        <div ref={fullRef} style={{ fontFamily: S.font }}>
          {layout === "full" && <>{renderTitleBanner()}{renderIdeas()}{renderEval()}{renderShortAndTips()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderIdeas()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullRef} /></div>
      </div>
    </div>
  );
}

export default function InitiativeBrainstormPage() { return <ThemeProvider><InitiativeBrainstormContent /></ThemeProvider>; }
