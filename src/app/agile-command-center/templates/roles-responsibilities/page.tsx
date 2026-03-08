"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, Users, LayoutDashboard, AlignJustify, Zap } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Map", desc: "Detailed RACI", icon: LayoutDashboard },
  { id: "compact", label: "Quick Reference", desc: "Role cards", icon: AlignJustify },
];

function RolesContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const coreRef = useRef<HTMLDivElement>(null);
  const raciRef = useRef<HTMLDivElement>(null);
  const stakeholderRef = useRef<HTMLDivElement>(null);
  const escRef = useRef<HTMLDivElement>(null);

  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };
  const accent = "#0EA5E9"; const accentDark = "#0369A1";

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>👥 ROLES &amp; RESPONSIBILITIES MAP</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; Agile / Scrum Delivery Command Center &nbsp;|&nbsp; Who Does What</td></tr>
    </tbody></table>
  );

  const renderHeader = () => (
    <div ref={headerRef} style={{ marginBottom: "12px" }}>
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "18%" }}>Product / Project</td><td style={{ ...S.td0, width: "32%" }}>[Product Name]</td><td style={{ ...S.tdLabel, width: "18%" }}>Team Name</td><td style={{ ...S.td0, width: "32%" }}>[Team Name]</td></tr>
        <tr><td style={S.tdLabelAlt}>Last Updated</td><td style={S.tdAlt}>[MM/DD/YYYY]</td><td style={S.tdLabelAlt}>Team Size</td><td style={S.tdAlt}>[X members]</td></tr>
      </tbody></table>
      <CopyButton targetRef={headerRef} label="Copy Section" />
    </div>
  );

  const roleCard = (title: string, emoji: string, color: string, person: string, responsibilities: string[]) => (
    <table style={S.tbl}>
      <thead><tr><td style={{ backgroundColor: color, color: C.white, padding: "10px 14px", fontFamily: S.font, fontSize: "13px", fontWeight: 800, border: `1.5px solid ${C.border}` }}>{emoji} {title}</td></tr></thead>
      <tbody>
        <tr><td style={{ ...S.tdLabel, fontSize: "10px", padding: "6px 12px" }}>Assigned To</td></tr>
        <tr><td style={{ ...S.td0, fontSize: "12px", fontWeight: 700, padding: "6px 12px" }}>{person}</td></tr>
        <tr><td style={{ ...S.tdLabelAlt, fontSize: "10px", padding: "6px 12px" }}>Key Responsibilities</td></tr>
        {responsibilities.map((r, i) => (
          <tr key={i}><td style={{ ...S.td0, backgroundColor: i % 2 === 0 ? C.white : C.rowAlt, fontSize: "11px", padding: "4px 12px" }}>• {r}</td></tr>
        ))}
      </tbody>
    </table>
  );

  const renderCore = () => (
    <div ref={coreRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(accent)}>🏅 CORE SCRUM ROLES</div>
      <CopyButton targetRef={coreRef} label="Copy Section" />
      <table style={LT}><tbody><tr>
        <td style={{ ...LC, width: "33.3%", paddingRight: "4px" }}>
          {roleCard("PRODUCT OWNER", "🎯", "#8B5CF6", "[Name]", [
            "Owns the product backlog and prioritization",
            "Defines acceptance criteria for stories",
            "Makes scope and trade-off decisions",
            "Represents stakeholder interests",
            "Accepts/rejects completed work at review",
          ])}
        </td>
        <td style={{ ...LC, width: "33.3%", paddingLeft: "4px", paddingRight: "4px" }}>
          {roleCard("SCRUM MASTER", "🛡️", accent, "[Name]", [
            "Facilitates Scrum ceremonies",
            "Removes impediments and blockers",
            "Coaches team on Agile practices",
            "Shields team from distractions",
            "Tracks and improves team health",
          ])}
        </td>
        <td style={{ ...LC, width: "33.3%", paddingLeft: "4px" }}>
          {roleCard("DEVELOPMENT TEAM", "⚙️", "#059669", "[X members]", [
            "Self-organizes to deliver sprint commitment",
            "Estimates and breaks down stories",
            "Builds, tests, and delivers increments",
            "Participates in all ceremonies",
            "Raises impediments early",
          ])}
        </td>
      </tr></tbody></table>
    </div>
  );

  const renderRaci = () => (
    <div ref={raciRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(accentDark)}>📋 DECISION RACI MATRIX</div>
      <CopyButton targetRef={raciRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "4px" }}>R = Responsible &nbsp;|&nbsp; A = Accountable &nbsp;|&nbsp; C = Consulted &nbsp;|&nbsp; I = Informed</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={S.thPrimary}>Decision / Activity</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>PO</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>SM</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Dev Team</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Stakeholders</th>
        </tr></thead>
        <tbody>
          {[
            { d: "Backlog prioritization", po: "A/R", sm: "C", dev: "C", sh: "I" },
            { d: "Sprint goal setting", po: "A", sm: "R", dev: "C", sh: "I" },
            { d: "Story estimation", po: "I", sm: "C", dev: "A/R", sh: "—" },
            { d: "Sprint commitment", po: "C", sm: "C", dev: "A/R", sh: "I" },
            { d: "Impediment removal", po: "C", sm: "A/R", dev: "R", sh: "C" },
            { d: "Scope change mid-sprint", po: "A", sm: "C", dev: "C", sh: "I" },
            { d: "Accepting completed work", po: "A/R", sm: "I", dev: "R", sh: "I" },
            { d: "Process improvement (retro)", po: "C", sm: "A/R", dev: "R", sh: "I" },
            { d: "Release decision", po: "A", sm: "C", dev: "R", sh: "I" },
            { d: "Budget / resource allocation", po: "C", sm: "I", dev: "I", sh: "A/R" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            const cellStyle = (val: string) => {
              const isAR = val.includes("A") || val.includes("R");
              return { ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: isAR ? 800 : 400, color: isAR ? accent : C.textMuted, fontSize: "12px" };
            };
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 600, fontSize: "11px" }}>{r.d}</td>
                <td style={cellStyle(r.po)}>{r.po}</td>
                <td style={cellStyle(r.sm)}>{r.sm}</td>
                <td style={cellStyle(r.dev)}>{r.dev}</td>
                <td style={cellStyle(r.sh)}>{r.sh}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderStakeholders = () => (
    <div ref={stakeholderRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(accent)}>🤝 KEY STAKEHOLDERS</div>
      <CopyButton targetRef={stakeholderRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={S.thSecondary}>Name</th>
          <th style={{ ...S.thSecondary, width: "20%" }}>Role / Title</th>
          <th style={{ ...S.thSecondary, width: "22%" }}>Interest</th>
          <th style={{ ...S.thSecondary, width: "16%", textAlign: "center" as const }}>Update Cadence</th>
          <th style={{ ...S.thSecondary, width: "14%", textAlign: "center" as const }}>Format</th>
        </tr></thead>
        <tbody>
          {[
            { name: "[Executive Sponsor]", role: "[VP Engineering]", interest: "Budget, timeline, ROI", cadence: "Bi-weekly", format: "Email" },
            { name: "[Business Lead]", role: "[Director Product]", interest: "Feature priorities, market fit", cadence: "Weekly", format: "Meeting" },
            { name: "[Operations]", role: "[Ops Manager]", interest: "Release impact, support readiness", cadence: "Sprint end", format: "Slack" },
            { name: "[Add stakeholder]", role: "", interest: "", cadence: "", format: "" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 600, fontSize: "12px" }}>{r.name}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{r.role}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{r.interest}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "11px" }}>{r.cadence}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}>{r.format && <span style={S.badge(C.badgeBlueBg, C.badgeBlueFg)}>{r.format}</span>}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderEscalation = () => (
    <div ref={escRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(accentDark)}>🚨 ESCALATION PATH</div>
      <CopyButton targetRef={escRef} label="Copy Section" />
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "22%" }}>Level 1 — Team</td><td style={S.td0}>[Try to resolve within the team during Daily Scrum — SM facilitates]</td></tr>
        <tr><td style={S.tdLabelAlt}>Level 2 — SM + PO</td><td style={S.tdAlt}>[SM escalates to PO for scope/priority decisions; PO escalates vendor/budget issues]</td></tr>
        <tr><td style={S.tdLabel}>Level 3 — Leadership</td><td style={S.td0}>[Use Blocker Escalation template — formal ask to sponsor/management]</td></tr>
        <tr><td style={{ ...S.tdLabelAlt, fontWeight: 700, color: accent }}>Escalation SLA</td><td style={{ ...S.tdAlt, fontWeight: 600 }}>[Blockers must escalate within 24 hours if team cannot resolve]</td></tr>
      </tbody></table>
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
    <>{renderTitleBanner()}{renderHeader()}{renderCore()}{renderRaci()}
      <table style={LT}><tbody><tr>
        <td style={{ ...LC, width: "55%", paddingRight: "8px" }}>{renderStakeholders()}</td>
        <td style={{ ...LC, width: "45%", paddingLeft: "8px" }}>{renderEscalation()}</td>
      </tr></tbody></table>
      {renderFooter()}
    </>
  );

  const renderCompactLayout = () => (
    <>{renderTitleBanner()}{renderHeader()}{renderCore()}{renderEscalation()}{renderFooter()}</>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-sky-50/30">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-sky-600 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-sky-50 border border-sky-100 text-sky-700 text-xs font-semibold"><Users size={11} />Team Roles</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/agile-command-center" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-sky-600 transition-colors"><ArrowLeft size={14} />Back to Agile Command Center</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-sky-100 flex items-center justify-center"><Users size={20} className="text-sky-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">Roles &amp; Responsibilities Map</h2><p className="text-xs font-medium text-sky-600">Who Does What &mdash; Scrum Team + Stakeholders</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Clear role definitions, RACI matrix for key decisions, stakeholder directory, and escalation path. Prevents confusion and bottlenecks.</p>
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

export default function RolesResponsibilitiesPage() { return <ThemeProvider><RolesContent /></ThemeProvider>; }
