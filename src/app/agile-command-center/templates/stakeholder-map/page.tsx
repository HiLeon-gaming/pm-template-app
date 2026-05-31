"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, Users2, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Map", desc: "Grid + Comm plan", icon: LayoutDashboard },
  { id: "compact", label: "Comm Plan Only", desc: "Quick reference", icon: AlignJustify },
];

function StakeholderMapContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const commRef = useRef<HTMLDivElement>(null);
  const engRef = useRef<HTMLDivElement>(null);

  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };
  const accent = "#8B5CF6"; const accentDark = "#6D28D9";

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>🤝 STAKEHOLDER MAP + COMMUNICATION PLAN</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; Agile / Scrum Delivery Command Center &nbsp;|&nbsp; Product Strategy &amp; Value</td></tr>
    </tbody></table>
  );

  const renderHeader = () => (
    <div ref={headerRef} style={{ marginBottom: "12px" }}>
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "18%" }}>Product</td><td style={{ ...S.td0, width: "32%" }}>[Product Name]</td><td style={{ ...S.tdLabel, width: "18%" }}>Last Updated</td><td style={{ ...S.td0, width: "32%" }}>[MM/DD/YYYY]</td></tr>
        <tr><td style={S.tdLabelAlt}>Maintained By</td><td style={S.tdAlt}>[SM / PO Name]</td><td style={S.tdLabelAlt}>Review Cadence</td><td style={S.tdAlt}>[Quarterly or when team changes]</td></tr>
      </tbody></table>
      <CopyButton targetRef={headerRef} label="Copy Section" />
    </div>
  );

  const renderGrid = () => (
    <div ref={gridRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accent)}>📊 POWER / INTEREST GRID</td></tr></tbody></table>
      <CopyButton targetRef={gridRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>Place each stakeholder in the appropriate quadrant based on their power and interest level.</p>
      <table style={LT}><tbody><tr>
        <td style={{ ...LC, width: "50%", paddingRight: "4px", paddingBottom: "6px" }}>
          <table style={S.tbl}>
            <thead><tr><td style={{ backgroundColor: "#DC2626", color: C.white, padding: "10px 14px", fontFamily: S.font, fontSize: "13px", fontWeight: 800, border: `1.5px solid ${C.border}` }}>🔴 HIGH POWER + HIGH INTEREST → Manage Closely</td></tr></thead>
            <tbody>
              {["[Executive Sponsor — needs weekly updates, approval on scope]", "[Product Director — final say on feature priority]", "[Add stakeholder]"].map((s, i) => (
                <tr key={i}><td style={{ ...S.td0, backgroundColor: i % 2 === 0 ? C.white : C.rowAlt, fontSize: "11px", padding: "6px 12px" }}>{s}</td></tr>
              ))}
            </tbody>
          </table>
        </td>
        <td style={{ ...LC, width: "50%", paddingLeft: "4px", paddingBottom: "6px" }}>
          <table style={S.tbl}>
            <thead><tr><td style={{ backgroundColor: "#F59E0B", color: C.white, padding: "10px 14px", fontFamily: S.font, fontSize: "13px", fontWeight: 800, border: `1.5px solid ${C.border}` }}>🟡 HIGH POWER + LOW INTEREST → Keep Satisfied</td></tr></thead>
            <tbody>
              {["[CTO — cares about tech debt and architecture decisions]", "[Finance VP — cares about budget, not daily details]", "[Add stakeholder]"].map((s, i) => (
                <tr key={i}><td style={{ ...S.td0, backgroundColor: i % 2 === 0 ? C.white : C.rowAlt, fontSize: "11px", padding: "6px 12px" }}>{s}</td></tr>
              ))}
            </tbody>
          </table>
        </td>
      </tr><tr>
        <td style={{ ...LC, width: "50%", paddingRight: "4px" }}>
          <table style={S.tbl}>
            <thead><tr><td style={{ backgroundColor: "#0891B2", color: C.white, padding: "10px 14px", fontFamily: S.font, fontSize: "13px", fontWeight: 800, border: `1.5px solid ${C.border}` }}>🔵 LOW POWER + HIGH INTEREST → Keep Informed</td></tr></thead>
            <tbody>
              {["[QA Team Lead — wants to know upcoming test windows]", "[Customer Success — wants to preview features for clients]", "[Add stakeholder]"].map((s, i) => (
                <tr key={i}><td style={{ ...S.td0, backgroundColor: i % 2 === 0 ? C.white : C.rowAlt, fontSize: "11px", padding: "6px 12px" }}>{s}</td></tr>
              ))}
            </tbody>
          </table>
        </td>
        <td style={{ ...LC, width: "50%", paddingLeft: "4px" }}>
          <table style={S.tbl}>
            <thead><tr><td style={{ backgroundColor: "#059669", color: C.white, padding: "10px 14px", fontFamily: S.font, fontSize: "13px", fontWeight: 800, border: `1.5px solid ${C.border}` }}>🟢 LOW POWER + LOW INTEREST → Monitor</td></tr></thead>
            <tbody>
              {["[IT Security — periodic compliance review only]", "[HR — only if hiring/staffing changes needed]", "[Add stakeholder]"].map((s, i) => (
                <tr key={i}><td style={{ ...S.td0, backgroundColor: i % 2 === 0 ? C.white : C.rowAlt, fontSize: "11px", padding: "6px 12px" }}>{s}</td></tr>
              ))}
            </tbody>
          </table>
        </td>
      </tr></tbody></table>
    </div>
  );

  const renderComm = () => (
    <div ref={commRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accentDark)}>📬 COMMUNICATION PLAN</td></tr></tbody></table>
      <CopyButton targetRef={commRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={S.thPrimary}>Stakeholder</th>
          <th style={{ ...S.thPrimary, width: "14%" }}>Quadrant</th>
          <th style={{ ...S.thPrimary, width: "14%", textAlign: "center" as const }}>Frequency</th>
          <th style={{ ...S.thPrimary, width: "12%", textAlign: "center" as const }}>Format</th>
          <th style={{ ...S.thPrimary, width: "12%", textAlign: "center" as const }}>Owner</th>
        </tr></thead>
        <tbody>
          {[
            { name: "[Executive Sponsor]", quad: "Manage Closely", qBg: C.badgeRedBg, qFg: C.badgeRedFg, freq: "Weekly", fmt: "Email + Meeting", owner: "[PO]" },
            { name: "[Product Director]", quad: "Manage Closely", qBg: C.badgeRedBg, qFg: C.badgeRedFg, freq: "Bi-weekly", fmt: "Meeting", owner: "[PO]" },
            { name: "[CTO]", quad: "Keep Satisfied", qBg: C.badgeAmberBg, qFg: C.badgeAmberFg, freq: "Monthly", fmt: "Email", owner: "[SM]" },
            { name: "[Finance VP]", quad: "Keep Satisfied", qBg: C.badgeAmberBg, qFg: C.badgeAmberFg, freq: "Monthly", fmt: "Report", owner: "[PO]" },
            { name: "[QA Team Lead]", quad: "Keep Informed", qBg: C.badgeBlueBg, qFg: C.badgeBlueFg, freq: "Sprint end", fmt: "Slack", owner: "[SM]" },
            { name: "[Customer Success]", quad: "Keep Informed", qBg: C.badgeBlueBg, qFg: C.badgeBlueFg, freq: "Sprint end", fmt: "Demo invite", owner: "[PO]" },
            { name: "[Add stakeholder]", quad: "—", qBg: C.badgeGrayBg, qFg: C.badgeGrayFg, freq: "", fmt: "", owner: "" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 600, fontSize: "11px" }}>{r.name}</td>
                <td style={{ ...S.td0, backgroundColor: bg }}><span style={S.badge(r.qBg, r.qFg)}>{r.quad}</span></td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "11px" }}>{r.freq}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "11px" }}>{r.fmt}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "11px" }}>{r.owner}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderEngagement = () => (
    <div ref={engRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accent)}>🎯 ENGAGEMENT ACTIONS</td></tr></tbody></table>
      <CopyButton targetRef={engRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thSecondary, width: "5%", textAlign: "center" as const }}>☐</th>
          <th style={S.thSecondary}>Action</th>
          <th style={{ ...S.thSecondary, width: "14%", textAlign: "center" as const }}>Owner</th>
          <th style={{ ...S.thSecondary, width: "14%", textAlign: "center" as const }}>Due</th>
          <th style={{ ...S.thSecondary, width: "10%", textAlign: "center" as const }}>Done</th>
        </tr></thead>
        <tbody>
          {[
            { a: "Schedule recurring bi-weekly with Product Director", owner: "[PO]", due: "[Date]" },
            { a: "Send first executive summary to Sponsor", owner: "[SM]", due: "[Date]" },
            { a: "Invite Customer Success to next sprint demo", owner: "[PO]", due: "[Sprint end]" },
            { a: "Share architecture decision with CTO for feedback", owner: "[Tech Lead]", due: "[Date]" },
            { a: "[Add action]", owner: "", due: "" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "15px" }}>☐</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{r.a}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "11px" }}>{r.owner}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "11px" }}>{r.due}</td>
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
    <>{renderTitleBanner()}{renderHeader()}{renderGrid()}{renderComm()}{renderEngagement()}{renderFooter()}</>
  );
  const renderCompactLayout = () => (
    <>{renderTitleBanner()}{renderHeader()}{renderComm()}{renderFooter()}</>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-violet-50/30">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-violet-600 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-violet-50 border border-violet-100 text-violet-700 text-xs font-semibold"><Users2 size={11} />Stakeholders</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/agile-command-center" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-violet-600 transition-colors"><ArrowLeft size={14} />Back to Agile Command Center</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-violet-100 flex items-center justify-center"><Users2 size={20} className="text-violet-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">Stakeholder Map + Communication Plan</h2><p className="text-xs font-medium text-violet-600">Who Needs What Updates, How Often, and What Format</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Power/interest grid, communication plan with frequency and format, and engagement actions. Agile-friendly stakeholder management.</p>
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
        <div ref={fullPageRef} style={{ fontFamily: S.font }}>
          {layout === "full" && renderFullLayout()}
          {layout === "compact" && renderCompactLayout()}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function StakeholderMapPage() { return <ThemeProvider><StakeholderMapContent /></ThemeProvider>; }
