"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, Users, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Analysis", desc: "Grid + register + plan", icon: LayoutDashboard },
  { id: "compact", label: "Quick Map", desc: "Register + actions", icon: AlignJustify },
];

function StakeholderContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const registerRef = useRef<HTMLDivElement>(null);
  const commRef = useRef<HTMLDivElement>(null);
  const riskRef = useRef<HTMLDivElement>(null);

  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };

  const descStyle: React.CSSProperties = {
    fontFamily: S.font, fontSize: "11px", fontStyle: "italic", color: "#475569",
    padding: "10px 14px", lineHeight: "1.6", borderBottom: `1px solid ${C.border}`,
    backgroundColor: C.white,
  };

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "0px" }}>
      <tbody>
        <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${C.accent}`, textAlign: "center" as const }}>👥 STAKEHOLDER ANALYSIS &amp; MAP</td></tr>
        <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; Business Analyst Command Center &nbsp;|&nbsp; BABOK Aligned</td></tr>
        <tr><td style={descStyle}>
          <strong style={{ fontStyle: "italic" }}>This template helps you identify, classify, and manage all stakeholders on your project or initiative.</strong> It combines a Power/Interest grid for visual mapping with a detailed stakeholder register for tracking influence, attitudes, and communication needs.<br /><br />
          Ideal for <strong style={{ fontStyle: "italic" }}>project kickoffs, requirements planning,</strong> or <strong style={{ fontStyle: "italic" }}>stakeholder engagement strategy sessions</strong>. Aligns with BABOK Knowledge Area: Stakeholder Engagement.
        </td></tr>
      </tbody>
    </table>
  );

  const renderDateHeader = () => (
    <div ref={headerRef} style={{ marginBottom: "12px" }}>
      <table style={S.tbl}>
        <tbody>
          <tr>
            <td style={{ ...S.tdLabel, width: "14%" }}>Project</td>
            <td style={{ ...S.td0, width: "36%" }}>[Project / Initiative Name]</td>
            <td style={{ ...S.tdLabel, width: "14%" }}>Date</td>
            <td style={{ ...S.td0, width: "36%" }}>[MM/DD/YYYY]</td>
          </tr>
          <tr>
            <td style={S.tdLabelAlt}>Business Analyst</td>
            <td style={S.tdAlt}>[Your Name]</td>
            <td style={S.tdLabelAlt}>Version</td>
            <td style={S.tdAlt}>[1.0]</td>
          </tr>
        </tbody>
      </table>
      <CopyButton targetRef={headerRef} label="Copy Section" />
    </div>
  );

  const quadrants = [
    { label: "KEEP SATISFIED", sub: "High Power / Low Interest", color: "#D97706", bg: "#FEF3C7", items: ["[e.g., CFO — needs budget approvals only]", "[e.g., Legal — consulted on compliance]", "[Add stakeholder]"] },
    { label: "MANAGE CLOSELY", sub: "High Power / High Interest", color: "#DC2626", bg: "#FEE2E2", items: ["[e.g., Product Owner — daily decisions]", "[e.g., VP Engineering — technical authority]", "[Add stakeholder]"] },
    { label: "MONITOR", sub: "Low Power / Low Interest", color: "#6B7280", bg: "#F3F4F6", items: ["[e.g., External vendor support team]", "[e.g., Adjacent team leads]", "[Add stakeholder]"] },
    { label: "KEEP INFORMED", sub: "Low Power / High Interest", color: "#2563EB", bg: "#DBEAFE", items: ["[e.g., End users / Customer support]", "[e.g., Training team]", "[Add stakeholder]"] },
  ];

  const renderPowerInterestGrid = () => (
    <div ref={gridRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner()}>📊 POWER / INTEREST GRID</td></tr></tbody></table>
      <CopyButton targetRef={gridRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "4px" }}>Map each stakeholder into the appropriate quadrant based on their power to influence outcomes and their interest in the project.</p>
      <table style={LT}>
        <tbody>
          <tr>
            {[quadrants[0], quadrants[1]].map((q, i) => (
              <td key={i} style={{ ...LC, width: "50%", paddingRight: i === 0 ? "4px" : "0", paddingLeft: i === 1 ? "4px" : "0" }}>
                <table style={S.tbl}>
                  <thead>
                    <tr><td style={{ backgroundColor: q.bg, color: q.color, padding: "10px 12px", fontFamily: S.font, fontSize: "13px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: `3px solid ${q.color}` }}>
                      {q.label}<div style={{ fontSize: "9px", fontWeight: 500, marginTop: "1px", opacity: 0.8 }}>{q.sub}</div>
                    </td></tr>
                  </thead>
                  <tbody>
                    {q.items.map((item, j) => (
                      <tr key={j}><td style={{ ...S.td0, backgroundColor: j % 2 === 1 ? C.rowAlt : C.white, height: "26px", fontSize: "11px" }}>{item}</td></tr>
                    ))}
                  </tbody>
                </table>
              </td>
            ))}
          </tr>
          <tr><td colSpan={2} style={{ height: "6px", border: "none" }} /></tr>
          <tr>
            {[quadrants[2], quadrants[3]].map((q, i) => (
              <td key={i} style={{ ...LC, width: "50%", paddingRight: i === 0 ? "4px" : "0", paddingLeft: i === 1 ? "4px" : "0" }}>
                <table style={S.tbl}>
                  <thead>
                    <tr><td style={{ backgroundColor: q.bg, color: q.color, padding: "10px 12px", fontFamily: S.font, fontSize: "13px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: `3px solid ${q.color}` }}>
                      {q.label}<div style={{ fontSize: "9px", fontWeight: 500, marginTop: "1px", opacity: 0.8 }}>{q.sub}</div>
                    </td></tr>
                  </thead>
                  <tbody>
                    {q.items.map((item, j) => (
                      <tr key={j}><td style={{ ...S.td0, backgroundColor: j % 2 === 1 ? C.rowAlt : C.white, height: "26px", fontSize: "11px" }}>{item}</td></tr>
                    ))}
                  </tbody>
                </table>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );

  const STAKEHOLDERS = [
    { name: "[e.g., Sarah Chen]", role: "Product Owner", org: "[Dept/Org]", power: "High", interest: "High", attitude: "Champion", pBg: "#FEE2E2", pFg: "#DC2626", aBg: "#D1FAE5", aFg: "#059669" },
    { name: "[e.g., James Liu]", role: "VP Engineering", org: "[Dept/Org]", power: "High", interest: "Medium", attitude: "Supportive", pBg: "#FEF3C7", pFg: "#D97706", aBg: "#DBEAFE", aFg: "#2563EB" },
    { name: "[e.g., Maria Gomez]", role: "End User Lead", org: "[Dept/Org]", power: "Low", interest: "High", attitude: "Neutral", pBg: "#DBEAFE", pFg: "#2563EB", aBg: "#F3F4F6", aFg: "#6B7280" },
    { name: "[e.g., David Park]", role: "CFO", org: "[Dept/Org]", power: "High", interest: "Low", attitude: "Resistant", pBg: "#FEE2E2", pFg: "#DC2626", aBg: "#FEE2E2", aFg: "#DC2626" },
    { name: "[Add stakeholder]", role: "", org: "", power: "—", interest: "—", attitude: "—", pBg: "#F3F4F6", pFg: "#6B7280", aBg: "#F3F4F6", aFg: "#6B7280" },
    { name: "[Add stakeholder]", role: "", org: "", power: "—", interest: "—", attitude: "—", pBg: "#F3F4F6", pFg: "#6B7280", aBg: "#F3F4F6", aFg: "#6B7280" },
  ];

  const renderRegister = () => (
    <div ref={registerRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(C.secondary)}>📋 STAKEHOLDER REGISTER</td></tr></tbody></table>
      <CopyButton targetRef={registerRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead>
          <tr>
            <th style={{ ...S.thPrimary, width: "16%" }}>Name</th>
            <th style={{ ...S.thPrimary, width: "14%" }}>Role / Title</th>
            <th style={{ ...S.thPrimary, width: "12%" }}>Org / Dept</th>
            <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Power</th>
            <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Interest</th>
            <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Attitude</th>
            <th style={S.thPrimary}>Engagement Strategy</th>
          </tr>
        </thead>
        <tbody>
          {STAKEHOLDERS.map((s, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 600 }}>{s.name}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{s.role}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{s.org}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(s.pBg, s.pFg)}>{s.power}</span></td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(s.pBg, s.pFg)}>{s.interest}</span></td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(s.aBg, s.aFg)}>{s.attitude}</span></td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{i === 0 ? "[e.g., Weekly syncs, co-create requirements, include in all reviews]" : ""}&nbsp;</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderCommPlan = () => (
    <div ref={commRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner()}>📬 COMMUNICATION PLAN</td></tr></tbody></table>
      <CopyButton targetRef={commRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead>
          <tr>
            <th style={{ ...S.thPrimary, width: "16%" }}>Stakeholder</th>
            <th style={{ ...S.thPrimary, width: "14%" }}>Method</th>
            <th style={{ ...S.thPrimary, width: "12%", textAlign: "center" as const }}>Frequency</th>
            <th style={S.thPrimary}>Key Message / Content</th>
            <th style={{ ...S.thPrimary, width: "12%" }}>Owner</th>
          </tr>
        </thead>
        <tbody>
          {[
            { who: "[Product Owner]", method: "1:1 Meeting", freq: "Weekly", msg: "[Requirements status, open questions, decisions needed]", owner: "[BA]" },
            { who: "[VP Engineering]", method: "Email Update", freq: "Bi-weekly", msg: "[Technical feasibility, risk escalations]", owner: "[BA]" },
            { who: "[End Users]", method: "Workshop", freq: "Sprint-based", msg: "[Demo, feedback, UAT progress]", owner: "[BA + PO]" },
            { who: "[CFO]", method: "Steering Committee", freq: "Monthly", msg: "[Budget status, ROI metrics, milestone updates]", owner: "[PM]" },
            { who: "[Add stakeholder]", method: "", freq: "", msg: "", owner: "" },
          ].map((row, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 600, fontSize: "11px" }}>{row.who}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{row.method}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "11px" }}>{row.freq}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{row.msg}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{row.owner}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderRisk = () => (
    <div ref={riskRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(C.secondary)}>⚠️ STAKEHOLDER RISKS &amp; MITIGATIONS</td></tr></tbody></table>
      <CopyButton targetRef={riskRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead>
          <tr>
            <th style={{ ...S.thSecondary, width: "20%" }}>Stakeholder</th>
            <th style={S.thSecondary}>Risk</th>
            <th style={{ ...S.thSecondary, width: "10%", textAlign: "center" as const }}>Severity</th>
            <th style={{ ...S.thSecondary, width: "30%" }}>Mitigation</th>
          </tr>
        </thead>
        <tbody>
          {[
            { who: "[e.g., CFO]", risk: "[e.g., May withdraw funding if ROI unclear by Month 3]", sev: "High", sevBg: "#FEE2E2", sevFg: "#DC2626", mit: "[e.g., Schedule ROI review at Month 2; prepare metrics dashboard]" },
            { who: "[e.g., End Users]", risk: "[e.g., Low adoption if not involved in design]", sev: "Med", sevBg: "#FEF3C7", sevFg: "#D97706", mit: "[e.g., Include in every sprint demo; create champion network]" },
            { who: "[Add]", risk: "", sev: "—", sevBg: "#F3F4F6", sevFg: "#6B7280", mit: "" },
          ].map((row, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 600, fontSize: "11px" }}>{row.who}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{row.risk}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(row.sevBg, row.sevFg)}>{row.sev}</span></td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{row.mit}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderFooter = () => (
    <table style={{ ...S.tbl, marginTop: "8px" }}>
      <tbody><tr><td style={{ backgroundColor: C.primary, color: C.footerText, padding: "8px 20px", fontSize: "10px", fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.06em" }}>ExecNoteShop &nbsp;&bull;&nbsp; Business Analyst Command Center &nbsp;&bull;&nbsp; &copy; 2026 All Rights Reserved</td></tr></tbody>
    </table>
  );

  const renderFullLayout = () => (
    <>
      {renderTitleBanner()}{renderDateHeader()}{renderPowerInterestGrid()}{renderRegister()}
      <table style={LT}><tbody><tr>
        <td style={{ ...LC, width: "55%", paddingRight: "8px" }}>{renderCommPlan()}</td>
        <td style={{ ...LC, width: "45%", paddingLeft: "8px" }}>{renderRisk()}</td>
      </tr></tbody></table>
      {renderFooter()}
    </>
  );

  const renderCompactLayout = () => (
    <>{renderTitleBanner()}{renderDateHeader()}{renderRegister()}{renderCommPlan()}{renderFooter()}</>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-violet-50/20">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-violet-50 border border-violet-100 text-violet-700 text-xs font-semibold"><Users size={11} /> Stakeholder</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/ba-command-center" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-violet-600 transition-colors"><ArrowLeft size={14} /> Back to BA Command Center</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-violet-100 flex items-center justify-center"><Users size={20} className="text-violet-600" /></div>
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900">Stakeholder Analysis &amp; Map</h2>
              <p className="text-xs font-medium text-violet-600">Power/Interest Grid &bull; Register &bull; Communication Plan</p>
            </div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Identify, classify, and manage all project stakeholders with a 4-quadrant power/interest grid, detailed register, communication plan, and risk mitigations. Full Analysis includes the grid; Quick Map is a compact register + actions view.</p>
        </div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Layout</p>
          <div className="flex flex-wrap gap-2">
            {LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (
              <button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-violet-600 text-white border-violet-600 shadow-md shadow-violet-200" : "bg-white text-slate-600 border-slate-200 hover:border-violet-300 hover:text-violet-700"}`}>
                <Icon size={15} /> <span>{l.label}</span> <span className={`text-[10px] font-medium ${isActive ? "text-violet-200" : "text-slate-400"}`}>{l.desc}</span>
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

export default function StakeholderAnalysisPage() {
  return (<ThemeProvider><StakeholderContent /></ThemeProvider>);
}
