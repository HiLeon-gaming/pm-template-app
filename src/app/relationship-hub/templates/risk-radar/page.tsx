"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, Handshake, LayoutDashboard, AlignJustify, Radar } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Radar", desc: "Risk register + mitigations + tips", icon: LayoutDashboard },
  { id: "compact", label: "Quick Radar", desc: "Risk register only", icon: AlignJustify },
];

function RadarContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullRef = useRef<HTMLDivElement>(null);
  const riskRef = useRef<HTMLDivElement>(null);
  const mitigRef = useRef<HTMLDivElement>(null);
  const tipsRef = useRef<HTMLDivElement>(null);

  const accent = "#6366F1";
  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>RISK RADAR (STAKEHOLDER-DRIVEN RISKS)</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; Relationship &amp; Stakeholder Management Hub &nbsp;|&nbsp; Anticipate &amp; Mitigate</td></tr>
    </tbody></table>
  );

  const renderRisks = () => (
    <div ref={riskRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner("#DC2626")}>STAKEHOLDER RISK REGISTER</td></tr></tbody></table>
      <CopyButton targetRef={riskRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>Risks that originate from or are amplified by stakeholder dynamics. These are often the risks that blindside PMs because they&apos;re political, not technical. Review monthly. Update when the landscape shifts.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "4%", textAlign: "center" as const }}>#</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Severity</th>
          <th style={S.thPrimary}>Risk Description</th>
          <th style={{ ...S.thPrimary, width: "10%" }}>Source</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Likelihood</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Impact</th>
          <th style={{ ...S.thPrimary, width: "15%" }}>Mitigation</th>
          <th style={{ ...S.thPrimary, width: "8%" }}>Owner</th>
        </tr></thead>
        <tbody>
          {[
            { n: "1", sev: "Critical", desc: "Sponsor leaves company or changes role. Lose executive air cover and budget authority.", src: "Maria Lopez", like: "Low", impact: "Critical", mit: "Build relationship with deputy. Document sponsor commitments.", owner: "You" },
            { n: "2", sev: "High", desc: "Engineering team deprioritizes API dependency. Sprint planning blocked indefinitely.", src: "James Wu", like: "Medium", impact: "High", mit: "Escalate through Eng. Director. Offer to reduce scope.", owner: "You" },
            { n: "3", sev: "High", desc: "Finance pulls budget mid-quarter due to company-wide cuts.", src: "David Park", like: "Medium", impact: "High", mit: "Proactive monthly budget comms. Show ROI early.", owner: "You" },
            { n: "4", sev: "Medium", desc: "Marketing team disengages, resulting in weak go-to-market for Phase 2.", src: "Sarah Chen", like: "Medium", impact: "Medium", mit: "Re-engage Sarah. Include in planning early.", owner: "You" },
            { n: "5", sev: "[Sev]", desc: "[What could go wrong because of stakeholder dynamics?]", src: "[Who]", like: "[H/M/L]", impact: "[H/M/L]", mit: "[What you’ll do to prevent or reduce it]", owner: "[Who]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            const sc = r.sev === "Critical" ? { bg: C.badgeRedBg, fg: C.badgeRedFg } : r.sev === "High" ? { bg: C.badgeAmberBg, fg: C.badgeAmberFg } : r.sev === "Medium" ? { bg: "#DBEAFE", fg: "#1D4ED8" } : { bg: C.badgeGrayBg, fg: C.badgeGrayFg };
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 800, fontSize: "10px" }}>{r.n}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(sc.bg, sc.fg)}>{r.sev}</span></td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px" }}>{r.desc}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", fontWeight: 700 }}>{r.src}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", textAlign: "center" as const, fontWeight: 600 }}>{r.like}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", textAlign: "center" as const, fontWeight: 600 }}>{r.impact}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", color: C.textMuted }}>{r.mit}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", fontWeight: 700 }}>{r.owner}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderMitig = () => (
    <div ref={mitigRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner("#D97706")}>EARLY WARNING SIGNALS</td></tr></tbody></table>
      <CopyButton targetRef={mitigRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>For each risk, define the early warning signals that would tell you the risk is materializing. If you see these signals, activate your mitigation plan immediately.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "15%" }}>Risk</th>
          <th style={S.thPrimary}>Early Warning Signals</th>
          <th style={{ ...S.thPrimary, width: "25%" }}>Trigger Action</th>
        </tr></thead>
        <tbody>
          {[
            { risk: "Sponsor departure", signals: "Sponsor mentions career changes. Starts delegating more. Less engaged in details. Organizational restructuring rumors.", trigger: "Immediately brief deputy. Document all commitments in writing. Secure budget approval in writing." },
            { risk: "Eng. deprioritization", signals: "James stops attending meetings. API work not in sprint backlog. His manager mentions competing priorities.", trigger: "Escalate to Eng. Director same day. Present impact data." },
            { risk: "Budget cut", signals: "Company-wide hiring freeze. David asks for “justification” docs. CFO email about cost reduction.", trigger: "Accelerate ROI demonstration. Prepare Phase 2 “lean” version." },
            { risk: "[Risk name]", signals: "[What would you see/hear first if this risk was materializing?]", trigger: "[What you’d do the moment you see these signals]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 700, color: "#D97706" }}>{r.risk}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px" }}>{r.signals}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", color: C.textMuted }}>{r.trigger}</td>
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
            <thead><tr><td style={{ backgroundColor: "#EDE9FE", color: "#6366F1", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #6366F1" }}>STAKEHOLDER RISK PRINCIPLES</td></tr></thead>
            <tbody>
              {[
                { color: "#6366F1", tip: "Political risks are harder to see than technical risks.", detail: "They don’t show up in Jira. You have to read the room and ask the right questions." },
                { color: "#059669", tip: "Every key stakeholder is a risk.", detail: "What if they leave? What if they change priorities? What if they lose budget?" },
                { color: "#0EA5E9", tip: "Mitigate before the risk materializes.", detail: "Once a stakeholder risk fires, it’s often too late. Proactive mitigation is essential." },
                { color: "#D97706", tip: "Don’t put all your eggs in one basket.", detail: "If everything depends on one sponsor, you’re one departure away from disaster." },
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
            <thead><tr><td style={{ backgroundColor: "#FEE2E2", color: "#DC2626", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #DC2626" }}>COMMON STAKEHOLDER RISKS</td></tr></thead>
            <tbody>
              {[
                { color: "#DC2626", tip: "Sponsor departure or role change.", detail: "Build relationships with multiple leaders. Never depend on just one person." },
                { color: "#EA580C", tip: "Organizational restructuring.", detail: "Re-orgs shuffle priorities and reporting lines. Stay plugged into org dynamics." },
                { color: "#D97706", tip: "Priority shifts (theirs, not yours).", detail: "Their Q2 priority may not be your Q2 priority. Align early and check often." },
                { color: "#6366F1", tip: "Hidden resistance from new stakeholders.", detail: "New people in the landscape may not share the history or the buy-in." },
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
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-violet-50 border border-violet-100 text-violet-700 text-xs font-semibold"><Radar size={11} />Risk</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/relationship-hub" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-rose-600 transition-colors"><ArrowLeft size={14} />Back to Relationship Hub</Link>
          <CopyAllButton targetRef={fullRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-violet-100 flex items-center justify-center"><Handshake size={20} className="text-violet-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">Risk Radar (Stakeholder-Driven Risks)</h2><p className="text-xs font-medium text-violet-600">Anticipate &bull; Mitigate &bull; Monitor</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Stakeholder risks are the ones that blindside PMs because they&apos;re political, not technical. Sponsor departures, priority shifts, budget cuts, hidden resistance. This radar helps you identify, assess, and mitigate the people-driven risks before they derail your work.</p>
        </div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">View Mode</p>
          <div className="flex flex-wrap gap-2">
            {LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (
              <button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-violet-600 text-white border-violet-600 shadow-md shadow-violet-200" : "bg-white text-slate-600 border-slate-200 hover:border-violet-300 hover:text-violet-700"}`}>
                <Icon size={15} /><span>{l.label}</span><span className={`text-[10px] font-medium ${isActive ? "text-violet-200" : "text-slate-400"}`}>{l.desc}</span>
              </button>
            ); })}
          </div>
        </div>
        <div ref={fullRef} style={{ fontFamily: S.font }}>
          {layout === "full" && <>{renderTitleBanner()}{renderRisks()}{renderMitig()}{renderTips()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderRisks()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullRef} /></div>
      </div>
    </div>
  );
}

export default function RiskRadarPage() { return <ThemeProvider><RadarContent /></ThemeProvider>; }
