"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, AlertTriangle, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Register", desc: "Risks + responses + summary", icon: LayoutDashboard },
  { id: "compact", label: "Quick Register", desc: "Risk log only", icon: AlignJustify },
];

function RiskRegisterContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const registerRef = useRef<HTMLDivElement>(null);
  const responseRef = useRef<HTMLDivElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);

  const descStyle: React.CSSProperties = {
    fontFamily: S.font, fontSize: "11px", fontStyle: "italic", color: "#475569",
    padding: "10px 14px", lineHeight: "1.6", borderBottom: `1px solid ${C.border}`, backgroundColor: C.white,
  };
  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "0px" }}>
      <tbody>
        <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${C.accent}`, textAlign: "center" as const }}>&#x26A0;&#xFE0F; RISK REGISTER</td></tr>
        <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; PM Command Center &nbsp;|&nbsp; PMBOK Aligned</td></tr>
        <tr><td style={descStyle}>
          <strong style={{ fontStyle: "italic" }}>The Risk Register is the central repository for all identified project risks, their probability, impact, response strategies, and current status.</strong> It is a living document updated throughout the project lifecycle.<br /><br />
          Use this template during <strong style={{ fontStyle: "italic" }}>risk identification and throughout monitoring</strong>. Aligns with PMBOK Risk Management &#x2014; Planning &amp; Monitoring Process Groups.
        </td></tr>
      </tbody>
    </table>
  );

  const renderHeader = () => (
    <div ref={headerRef} style={{ marginBottom: "12px" }}>
      <table style={S.tbl}>
        <tbody>
          <tr><td style={{ ...S.tdLabel, width: "18%" }}>Project Name</td><td style={{ ...S.td0, width: "32%" }}>[Project Name]</td><td style={{ ...S.tdLabel, width: "18%" }}>Last Updated</td><td style={{ ...S.td0, width: "32%" }}>[MM/DD/YYYY]</td></tr>
          <tr><td style={S.tdLabelAlt}>Project Manager</td><td style={S.tdAlt}>[Name, PMP]</td><td style={S.tdLabelAlt}>Risk Owner</td><td style={S.tdAlt}>[PM / Risk Manager]</td></tr>
        </tbody>
      </table>
      <CopyButton targetRef={headerRef} label="Copy Section" />
    </div>
  );

  const risks = [
    { id: "R1", desc: "[e.g., Key developer leaves mid-project]", cat: "Resource", cBg: C.badgeBlueBg, cFg: C.badgeBlueFg, prob: "Med", imp: "High", score: "12", sBg: C.badgeRedBg, sFg: C.badgeRedFg, sLbl: "High", strategy: "Mitigate", owner: "[PM]", status: "Open", stBg: C.badgeRedBg, stFg: C.badgeRedFg },
    { id: "R2", desc: "[e.g., Requirements scope creep beyond baseline]", cat: "Scope", cBg: C.badgeAmberBg, cFg: C.badgeAmberFg, prob: "High", imp: "High", score: "16", sBg: C.badgeRedBg, sFg: C.badgeRedFg, sLbl: "Critical", strategy: "Mitigate", owner: "[BA]", status: "Open", stBg: C.badgeRedBg, stFg: C.badgeRedFg },
    { id: "R3", desc: "[e.g., Third-party API changes break integration]", cat: "Technical", cBg: C.badgeGreenBg, cFg: C.badgeGreenFg, prob: "Med", imp: "Med", score: "9", sBg: C.badgeAmberBg, sFg: C.badgeAmberFg, sLbl: "Medium", strategy: "Accept", owner: "[Arch]", status: "Monitoring", stBg: C.badgeAmberBg, stFg: C.badgeAmberFg },
    { id: "R4", desc: "[e.g., Vendor delivers late on integration work]", cat: "Schedule", cBg: C.badgeRedBg, cFg: C.badgeRedFg, prob: "Med", imp: "High", score: "12", sBg: C.badgeRedBg, sFg: C.badgeRedFg, sLbl: "High", strategy: "Transfer", owner: "[PM]", status: "Open", stBg: C.badgeRedBg, stFg: C.badgeRedFg },
    { id: "R5", desc: "[e.g., Budget overrun due to underestimated effort]", cat: "Cost", cBg: C.badgeRedBg, cFg: C.badgeRedFg, prob: "Low", imp: "High", score: "8", sBg: C.badgeAmberBg, sFg: C.badgeAmberFg, sLbl: "Medium", strategy: "Mitigate", owner: "[PM]", status: "Monitoring", stBg: C.badgeAmberBg, stFg: C.badgeAmberFg },
    { id: "R6", desc: "[e.g., User adoption lower than expected]", cat: "Stakeholder", cBg: C.badgeBlueBg, cFg: C.badgeBlueFg, prob: "Med", imp: "Med", score: "9", sBg: C.badgeAmberBg, sFg: C.badgeAmberFg, sLbl: "Medium", strategy: "Mitigate", owner: "[Change Mgr]", status: "Open", stBg: C.badgeRedBg, stFg: C.badgeRedFg },
    { id: "R7", desc: "[e.g., Security vulnerability discovered in testing]", cat: "Technical", cBg: C.badgeGreenBg, cFg: C.badgeGreenFg, prob: "Low", imp: "Very High", score: "10", sBg: C.badgeRedBg, sFg: C.badgeRedFg, sLbl: "High", strategy: "Avoid", owner: "[QA Lead]", status: "Closed", stBg: C.badgeGreenBg, stFg: C.badgeGreenFg },
    { id: "[R#]", desc: "[Add risk]", cat: "&#x2014;", cBg: C.badgeGrayBg, cFg: C.badgeGrayFg, prob: "", imp: "", score: "", sBg: C.badgeGrayBg, sFg: C.badgeGrayFg, sLbl: "&#x2014;", strategy: "", owner: "", status: "&#x2014;", stBg: C.badgeGrayBg, stFg: C.badgeGrayFg },
  ];

  const renderRegister = () => (
    <div ref={registerRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner()}>&#x1F4CB; RISK LOG</div>
      <CopyButton targetRef={registerRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "5%", textAlign: "center" as const }}>ID</th>
          <th style={S.thPrimary}>Risk Description</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Category</th>
          <th style={{ ...S.thPrimary, width: "5%", textAlign: "center" as const }}>P</th>
          <th style={{ ...S.thPrimary, width: "5%", textAlign: "center" as const }}>I</th>
          <th style={{ ...S.thPrimary, width: "5%", textAlign: "center" as const }}>Score</th>
          <th style={{ ...S.thPrimary, width: "7%", textAlign: "center" as const }}>Rating</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Strategy</th>
          <th style={{ ...S.thPrimary, width: "7%" }}>Owner</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Status</th>
        </tr></thead>
        <tbody>
          {risks.map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (<tr key={i}>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, color: C.secondary, fontSize: "10px" }}>{r.id}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{r.desc}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={{ ...S.badge(r.cBg, r.cFg), fontSize: "9px" }}>{r.cat}</span></td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "10px", fontWeight: 600 }}>{r.prob}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "10px", fontWeight: 600 }}>{r.imp}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 800 }}>{r.score}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.sBg, r.sFg)}>{r.sLbl}</span></td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "10px", fontWeight: 600 }}>{r.strategy}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.owner}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.stBg, r.stFg)}>{r.status}</span></td>
            </tr>);
          })}
        </tbody>
      </table>
      <p style={S.subNote}>P = Probability (1-5) &#x2022; I = Impact (1-5) &#x2022; Score = P &#xD7; I &#x2022; Rating: Critical (16-25) | High (10-15) | Medium (5-9) | Low (1-4)</p>
    </div>
  );

  const renderResponse = () => (
    <div ref={responseRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(C.secondary)}>&#x1F6E1;&#xFE0F; RISK RESPONSE PLANS</div>
      <CopyButton targetRef={responseRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thSecondary, width: "6%", textAlign: "center" as const }}>ID</th>
          <th style={{ ...S.thSecondary, width: "10%", textAlign: "center" as const }}>Strategy</th>
          <th style={S.thSecondary}>Response Plan</th>
          <th style={{ ...S.thSecondary, width: "12%" }}>Trigger</th>
          <th style={{ ...S.thSecondary, width: "10%", textAlign: "right" as const }}>Contingency $</th>
        </tr></thead>
        <tbody>
          {[
            { id: "R1", strat: "Mitigate", stratBg: C.badgeAmberBg, stratFg: C.badgeAmberFg, plan: "[Cross-train 2 backup developers; document all critical knowledge; maintain vendor bench availability]", trigger: "[Resignation notice]", cost: "$[15,000]" },
            { id: "R2", strat: "Mitigate", stratBg: C.badgeAmberBg, stratFg: C.badgeAmberFg, plan: "[Enforce change control process; require CCB approval for all scope changes; weekly scope review meetings]", trigger: "[>3 CRs/month]", cost: "$[20,000]" },
            { id: "R3", strat: "Accept", stratBg: C.badgeGreenBg, stratFg: C.badgeGreenFg, plan: "[Monitor vendor API changelog weekly; build abstraction layer; maintain API version pinning]", trigger: "[Breaking change announced]", cost: "$[5,000]" },
            { id: "R4", strat: "Transfer", stratBg: C.badgeBlueBg, stratFg: C.badgeBlueFg, plan: "[Include penalty clauses in contract; require weekly progress reports; identify backup vendor]", trigger: "[>5 day delay]", cost: "$[10,000]" },
            { id: "R5", strat: "Mitigate", stratBg: C.badgeAmberBg, stratFg: C.badgeAmberFg, plan: "[Monthly EVM reviews; early warning at CPI <0.95; re-estimate at each phase gate]", trigger: "[CPI <0.90]", cost: "$[12,775]" },
            { id: "R6", strat: "Mitigate", stratBg: C.badgeAmberBg, stratFg: C.badgeAmberFg, plan: "[Early stakeholder engagement; champion network; pilot group feedback; incentive program]", trigger: "[<60% adoption at 2 weeks]", cost: "$[8,000]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (<tr key={i}>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, color: C.secondary }}>{r.id}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.stratBg, r.stratFg)}>{r.strat}</span></td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{r.plan}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.trigger}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "right" as const, fontWeight: 600 }}>{r.cost}</td>
            </tr>);
          })}
        </tbody>
      </table>
      <p style={S.subNote}>Strategies: <strong>Avoid</strong> (eliminate threat) &#x2022; <strong>Mitigate</strong> (reduce P or I) &#x2022; <strong>Transfer</strong> (shift to 3rd party) &#x2022; <strong>Accept</strong> (acknowledge &amp; monitor) &#x2022; <strong>Escalate</strong> (above PM authority)</p>
    </div>
  );

  const renderSummary = () => (
    <div ref={summaryRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner()}>&#x1F4CA; RISK SUMMARY DASHBOARD</div>
      <CopyButton targetRef={summaryRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thSecondary, width: "20%" }}>Rating</th>
          <th style={{ ...S.thSecondary, width: "10%", textAlign: "center" as const }}>Open</th>
          <th style={{ ...S.thSecondary, width: "10%", textAlign: "center" as const }}>Monitoring</th>
          <th style={{ ...S.thSecondary, width: "10%", textAlign: "center" as const }}>Closed</th>
          <th style={{ ...S.thSecondary, width: "10%", textAlign: "center" as const }}>Total</th>
          <th style={S.thSecondary}>Trend</th>
        </tr></thead>
        <tbody>
          <tr><td style={S.td0}><span style={S.badge(C.badgeRedBg, C.badgeRedFg)}>Critical</span></td><td style={{ ...S.td0, textAlign: "center" as const, fontWeight: 700 }}>[1]</td><td style={{ ...S.td0, textAlign: "center" as const }}>[0]</td><td style={{ ...S.td0, textAlign: "center" as const }}>[0]</td><td style={{ ...S.td0, textAlign: "center" as const, fontWeight: 700 }}>[1]</td><td style={{ ...S.td0, fontSize: "11px" }}>[Stable &#x2014; scope creep risk requires active management]</td></tr>
          <tr><td style={S.tdAlt}><span style={S.badge(C.badgeRedBg, C.badgeRedFg)}>High</span></td><td style={{ ...S.tdAlt, textAlign: "center" as const, fontWeight: 700 }}>[2]</td><td style={{ ...S.tdAlt, textAlign: "center" as const }}>[0]</td><td style={{ ...S.tdAlt, textAlign: "center" as const }}>[1]</td><td style={{ ...S.tdAlt, textAlign: "center" as const, fontWeight: 700 }}>[3]</td><td style={{ ...S.tdAlt, fontSize: "11px" }}>[Improving &#x2014; security risk closed after remediation]</td></tr>
          <tr><td style={S.td0}><span style={S.badge(C.badgeAmberBg, C.badgeAmberFg)}>Medium</span></td><td style={{ ...S.td0, textAlign: "center" as const, fontWeight: 700 }}>[1]</td><td style={{ ...S.td0, textAlign: "center" as const }}>[2]</td><td style={{ ...S.td0, textAlign: "center" as const }}>[0]</td><td style={{ ...S.td0, textAlign: "center" as const, fontWeight: 700 }}>[3]</td><td style={{ ...S.td0, fontSize: "11px" }}>[Stable &#x2014; monitoring API and budget risks]</td></tr>
          <tr><td style={S.tdAlt}><span style={S.badge(C.badgeGreenBg, C.badgeGreenFg)}>Low</span></td><td style={{ ...S.tdAlt, textAlign: "center" as const, fontWeight: 700 }}>[0]</td><td style={{ ...S.tdAlt, textAlign: "center" as const }}>[0]</td><td style={{ ...S.tdAlt, textAlign: "center" as const }}>[0]</td><td style={{ ...S.tdAlt, textAlign: "center" as const, fontWeight: 700 }}>[0]</td><td style={{ ...S.tdAlt, fontSize: "11px" }}>[None identified at this rating]</td></tr>
        </tbody>
      </table>
      <table style={{ ...S.tbl, marginTop: "8px" }}>
        <tbody>
          <tr><td style={{ ...S.tdLabel, width: "28%" }}>Total Risks Identified</td><td style={S.td0}>[7] risks across [5] categories</td></tr>
          <tr><td style={S.tdLabelAlt}>Open / Active Risks</td><td style={S.tdAlt}>[4] open + [2] monitoring = [6] active</td></tr>
          <tr><td style={S.tdLabel}>Total Contingency Allocated</td><td style={S.td0}>$[62,775] &#x2014; $[8,000] used &#x2014; $[54,775] remaining</td></tr>
          <tr><td style={S.tdLabelAlt}>Top Risk This Period</td><td style={S.tdAlt}>[R2 &#x2014; Scope creep: 3 CRs submitted this week, approaching trigger threshold]</td></tr>
          <tr><td style={S.tdLabel}>Next Risk Review</td><td style={S.td0}>[MM/DD/YYYY] &#x2014; [Weekly risk review meeting with project team]</td></tr>
        </tbody>
      </table>
    </div>
  );

  const renderFooter = () => (
    <table style={{ ...S.tbl, marginTop: "8px" }}>
      <tbody><tr><td style={{ backgroundColor: C.primary, color: C.footerText, padding: "8px 20px", fontSize: "10px", fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.06em" }}>ExecNoteShop &#x2022; PM Command Center &#x2022; &#xA9; 2026 All Rights Reserved</td></tr></tbody>
    </table>
  );

  const renderFullLayout = () => (
    <>{renderTitleBanner()}{renderHeader()}{renderRegister()}{renderResponse()}{renderSummary()}{renderFooter()}</>
  );

  const renderCompactLayout = () => (
    <>{renderTitleBanner()}{renderHeader()}{renderRegister()}{renderFooter()}</>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/20">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold"><AlertTriangle size={11} /> Risk</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/pm-command-center" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-indigo-600 transition-colors"><ArrowLeft size={14} /> Back to PM Command Center</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center"><AlertTriangle size={20} className="text-indigo-600" /></div>
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900">Risk Register</h2>
              <p className="text-xs font-medium text-indigo-600">PMBOK Risk Management &#x2022; Planning &amp; Monitoring</p>
            </div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Central repository for identified risks with probability, impact, response strategies, and status tracking. Full Register includes response plans and dashboard; Quick Register shows the risk log only.</p>
        </div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Layout</p>
          <div className="flex flex-wrap gap-2">
            {LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (
              <button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-200" : "bg-white text-slate-600 border-slate-200 hover:border-indigo-300 hover:text-indigo-700"}`}>
                <Icon size={15} /> <span>{l.label}</span> <span className={`text-[10px] font-medium ${isActive ? "text-indigo-200" : "text-slate-400"}`}>{l.desc}</span>
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

export default function RiskRegisterPage() {
  return (<ThemeProvider><RiskRegisterContent /></ThemeProvider>);
}
