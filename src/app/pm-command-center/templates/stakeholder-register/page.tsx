
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
  { id: "full", label: "Full Register", desc: "Grid + register + engagement", icon: LayoutDashboard },
  { id: "compact", label: "Quick Register", desc: "Register + actions only", icon: AlignJustify },
];

function StakeholderRegisterContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const registerRef = useRef<HTMLDivElement>(null);
  const engagementRef = useRef<HTMLDivElement>(null);
  const commRef = useRef<HTMLDivElement>(null);

  const descStyle: React.CSSProperties = {
    fontFamily: S.font, fontSize: "11px", fontStyle: "italic", color: "#475569",
    padding: "10px 14px", lineHeight: "1.6", borderBottom: `1px solid ${C.border}`,
    backgroundColor: C.white,
  };

  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "0px" }}>
      <tbody>
        <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${C.accent}`, textAlign: "center" as const }}>👥 STAKEHOLDER REGISTER</td></tr>
        <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; PM Command Center &nbsp;|&nbsp; PMBOK Aligned</td></tr>
        <tr><td style={descStyle}>
          <strong style={{ fontStyle: "italic" }}>The Stakeholder Register identifies all individuals and groups who can affect or be affected by the project.</strong> It captures their interest, influence, engagement level, communication preferences, and management strategies.<br /><br />
          Use this template during <strong style={{ fontStyle: "italic" }}>project initiation and throughout planning</strong> to ensure all stakeholders are identified and managed. Aligns with PMBOK Stakeholder Management — Initiating Process Group.
        </td></tr>
      </tbody>
    </table>
  );

  const renderHeader = () => (
    <div ref={headerRef} style={{ marginBottom: "12px" }}>
      <table style={S.tbl}>
        <tbody>
          <tr><td style={{ ...S.tdLabel, width: "18%" }}>Project Name</td><td style={{ ...S.td0, width: "32%" }}>[Project Name]</td><td style={{ ...S.tdLabel, width: "18%" }}>Date</td><td style={{ ...S.td0, width: "32%" }}>[MM/DD/YYYY]</td></tr>
          <tr><td style={S.tdLabelAlt}>Project Manager</td><td style={S.tdAlt}>[Name, PMP]</td><td style={S.tdLabelAlt}>Version</td><td style={S.tdAlt}>[1.0]</td></tr>
        </tbody>
      </table>
      <CopyButton targetRef={headerRef} label="Copy Section" />
    </div>
  );

  const quadrants = [
    { label: "KEEP SATISFIED", sub: "High Power / Low Interest", color: "#D97706", bg: "#FEF3C7", items: ["[e.g., CFO]", "[e.g., Legal]", "[Add]"] },
    { label: "MANAGE CLOSELY", sub: "High Power / High Interest", color: "#DC2626", bg: "#FEE2E2", items: ["[e.g., Project Sponsor]", "[e.g., VP Engineering]", "[Add]"] },
    { label: "MONITOR", sub: "Low Power / Low Interest", color: "#6B7280", bg: "#F3F4F6", items: ["[e.g., External vendor]", "[e.g., Adjacent teams]", "[Add]"] },
    { label: "KEEP INFORMED", sub: "Low Power / High Interest", color: "#2563EB", bg: "#DBEAFE", items: ["[e.g., End users]", "[e.g., Training team]", "[Add]"] },
  ];

  const renderGrid = () => (
    <div ref={gridRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner()}>📊 POWER / INTEREST GRID</div>
      <CopyButton targetRef={gridRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "4px" }}>Map each stakeholder into the appropriate quadrant based on their power to influence outcomes and interest in the project.</p>
      <table style={LT}>
        <tbody>
          <tr>
            {[quadrants[0], quadrants[1]].map((q, i) => (
              <td key={i} style={{ ...LC, width: "50%", paddingRight: i === 0 ? "4px" : "0", paddingLeft: i === 1 ? "4px" : "0" }}>
                <table style={S.tbl}>
                  <thead><tr><td style={{ backgroundColor: q.bg, color: q.color, padding: "10px 12px", fontFamily: S.font, fontSize: "13px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: `3px solid ${q.color}` }}>
                    {q.label}<div style={{ fontSize: "9px", fontWeight: 500, marginTop: "1px", opacity: 0.8 }}>{q.sub}</div>
                  </td></tr></thead>
                  <tbody>{q.items.map((item, j) => (<tr key={j}><td style={{ ...S.td0, backgroundColor: j % 2 === 1 ? C.rowAlt : C.white, height: "26px", fontSize: "11px" }}>{item}</td></tr>))}</tbody>
                </table>
              </td>
            ))}
          </tr>
          <tr><td colSpan={2} style={{ height: "6px", border: "none" }} /></tr>
          <tr>
            {[quadrants[2], quadrants[3]].map((q, i) => (
              <td key={i} style={{ ...LC, width: "50%", paddingRight: i === 0 ? "4px" : "0", paddingLeft: i === 1 ? "4px" : "0" }}>
                <table style={S.tbl}>
                  <thead><tr><td style={{ backgroundColor: q.bg, color: q.color, padding: "10px 12px", fontFamily: S.font, fontSize: "13px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: `3px solid ${q.color}` }}>
                    {q.label}<div style={{ fontSize: "9px", fontWeight: 500, marginTop: "1px", opacity: 0.8 }}>{q.sub}</div>
                  </td></tr></thead>
                  <tbody>{q.items.map((item, j) => (<tr key={j}><td style={{ ...S.td0, backgroundColor: j % 2 === 1 ? C.rowAlt : C.white, height: "26px", fontSize: "11px" }}>{item}</td></tr>))}</tbody>
                </table>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );

  const STAKEHOLDERS = [
    { name: "[e.g., Sarah Chen]", role: "Executive Sponsor", org: "[Dept]", power: "High", interest: "High", attitude: "Champion", pBg: "#FEE2E2", pFg: "#DC2626", aBg: "#D1FAE5", aFg: "#059669" },
    { name: "[e.g., James Liu]", role: "VP Engineering", org: "[Dept]", power: "High", interest: "Medium", attitude: "Supportive", pBg: "#FEF3C7", pFg: "#D97706", aBg: "#DBEAFE", aFg: "#2563EB" },
    { name: "[e.g., Maria Gomez]", role: "End User Lead", org: "[Dept]", power: "Low", interest: "High", attitude: "Neutral", pBg: "#DBEAFE", pFg: "#2563EB", aBg: "#F3F4F6", aFg: "#6B7280" },
    { name: "[e.g., David Park]", role: "CFO", org: "[Dept]", power: "High", interest: "Low", attitude: "Resistant", pBg: "#FEE2E2", pFg: "#DC2626", aBg: "#FEE2E2", aFg: "#DC2626" },
    { name: "[Add stakeholder]", role: "", org: "", power: "—", interest: "—", attitude: "—", pBg: "#F3F4F6", pFg: "#6B7280", aBg: "#F3F4F6", aFg: "#6B7280" },
  ];

  const renderRegister = () => (
    <div ref={registerRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(C.secondary)}>📋 STAKEHOLDER REGISTER</div>
      <CopyButton targetRef={registerRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "16%" }}>Name</th>
          <th style={{ ...S.thPrimary, width: "14%" }}>Role / Title</th>
          <th style={{ ...S.thPrimary, width: "10%" }}>Org / Dept</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Power</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Interest</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Attitude</th>
          <th style={S.thPrimary}>Engagement Strategy</th>
        </tr></thead>
        <tbody>
          {STAKEHOLDERS.map((s, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (<tr key={i}>
              <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 600 }}>{s.name}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{s.role}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{s.org}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(s.pBg, s.pFg)}>{s.power}</span></td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(s.pBg, s.pFg)}>{s.interest}</span></td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(s.aBg, s.aFg)}>{s.attitude}</span></td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{i === 0 ? "[e.g., Weekly syncs, co-create requirements, include in all reviews]" : ""}&nbsp;</td>
            </tr>);
          })}
        </tbody>
      </table>
    </div>
  );

  const renderEngagement = () => (
    <div ref={engagementRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner()}>🎯 ENGAGEMENT ASSESSMENT</div>
      <CopyButton targetRef={engagementRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thSecondary, width: "20%" }}>Stakeholder</th>
          <th style={{ ...S.thSecondary, width: "16%", textAlign: "center" as const }}>Current Level</th>
          <th style={{ ...S.thSecondary, width: "16%", textAlign: "center" as const }}>Desired Level</th>
          <th style={S.thSecondary}>Actions to Close Gap</th>
        </tr></thead>
        <tbody>
          {[
            { who: "[Sponsor]", cur: "Supportive", cBg: C.badgeGreenBg, cFg: C.badgeGreenFg, des: "Leading", dBg: C.badgeBlueBg, dFg: C.badgeBlueFg, act: "[Schedule monthly executive briefings; involve in steering committee]" },
            { who: "[VP Eng]", cur: "Neutral", cBg: C.badgeGrayBg, cFg: C.badgeGrayFg, des: "Supportive", dBg: C.badgeGreenBg, dFg: C.badgeGreenFg, act: "[Technical deep-dive sessions; early architecture review]" },
            { who: "[End Users]", cur: "Resistant", cBg: C.badgeRedBg, cFg: C.badgeRedFg, des: "Supportive", dBg: C.badgeGreenBg, dFg: C.badgeGreenFg, act: "[Demos, pilot group, feedback loops, champion network]" },
            { who: "[Add]", cur: "—", cBg: C.badgeGrayBg, cFg: C.badgeGrayFg, des: "—", dBg: C.badgeGrayBg, dFg: C.badgeGrayFg, act: "" },
          ].map((e, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (<tr key={i}>
              <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 600, fontSize: "11px" }}>{e.who}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(e.cBg, e.cFg)}>{e.cur}</span></td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(e.dBg, e.dFg)}>{e.des}</span></td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{e.act}</td>
            </tr>);
          })}
        </tbody>
      </table>
      <p style={S.subNote}>Engagement levels per PMBOK: <strong>Unaware</strong> → <strong>Resistant</strong> → <strong>Neutral</strong> → <strong>Supportive</strong> → <strong>Leading</strong></p>
    </div>
  );

  const renderComm = () => (
    <div ref={commRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(C.secondary)}>📬 COMMUNICATION PREFERENCES</div>
      <CopyButton targetRef={commRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thSecondary, width: "16%" }}>Stakeholder</th>
          <th style={{ ...S.thSecondary, width: "14%" }}>Preferred Method</th>
          <th style={{ ...S.thSecondary, width: "12%", textAlign: "center" as const }}>Frequency</th>
          <th style={S.thSecondary}>Key Information Needs</th>
          <th style={{ ...S.thSecondary, width: "12%" }}>Owner</th>
        </tr></thead>
        <tbody>
          {[
            { who: "[Sponsor]", method: "1:1 Meeting", freq: "Weekly", info: "[Project health, risks, decisions needed, budget status]", owner: "[PM]" },
            { who: "[VP Eng]", method: "Email + Review", freq: "Bi-weekly", info: "[Technical risks, architecture decisions, resource needs]", owner: "[PM]" },
            { who: "[End Users]", method: "Demo / Workshop", freq: "Sprint-based", info: "[Feature previews, training schedule, feedback collection]", owner: "[BA]" },
            { who: "[CFO]", method: "Steering Comm.", freq: "Monthly", info: "[Budget actuals vs forecast, ROI progress, milestone status]", owner: "[PM]" },
            { who: "[Add]", method: "", freq: "", info: "", owner: "" },
          ].map((row, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (<tr key={i}>
              <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 600, fontSize: "11px" }}>{row.who}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{row.method}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "11px" }}>{row.freq}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{row.info}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{row.owner}</td>
            </tr>);
          })}
        </tbody>
      </table>
    </div>
  );

  const renderFooter = () => (
    <table style={{ ...S.tbl, marginTop: "8px" }}>
      <tbody><tr><td style={{ backgroundColor: C.primary, color: C.footerText, padding: "8px 20px", fontSize: "10px", fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.06em" }}>ExecNoteShop • PM Command Center • © 2026 All Rights Reserved</td></tr></tbody>
    </table>
  );

  const renderFullLayout = () => (
    <>{renderTitleBanner()}{renderHeader()}{renderGrid()}{renderRegister()}
      <table style={LT}><tbody><tr>
        <td style={{ ...LC, width: "50%", paddingRight: "6px" }}>{renderEngagement()}</td>
        <td style={{ ...LC, width: "50%", paddingLeft: "6px" }}>{renderComm()}</td>
      </tr></tbody></table>
      {renderFooter()}
    </>
  );

  const renderCompactLayout = () => (
    <>{renderTitleBanner()}{renderHeader()}{renderRegister()}{renderComm()}{renderFooter()}</>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/20">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold"><Users size={11} /> Stakeholder</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/pm-command-center" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-indigo-600 transition-colors"><ArrowLeft size={14} /> Back to PM Command Center</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center"><Users size={20} className="text-indigo-600" /></div>
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900">Stakeholder Register</h2>
              <p className="text-xs font-medium text-indigo-600">PMBOK Stakeholder Management • Initiating Process Group</p>
            </div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Identifies all stakeholders with power/interest grid, engagement assessment, and communication preferences. Full Register includes the grid; Quick Register is a compact register + communications view.</p>
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

export default function StakeholderRegisterPage() {
  return (<ThemeProvider><StakeholderRegisterContent /></ThemeProvider>);
}
