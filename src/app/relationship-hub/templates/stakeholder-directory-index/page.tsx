"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, Handshake, LayoutDashboard, AlignJustify, Zap } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Directory", desc: "Master list + portfolio summary + tips", icon: LayoutDashboard },
  { id: "compact", label: "Quick List", desc: "Master list only", icon: AlignJustify },
];

function DirectoryContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullRef = useRef<HTMLDivElement>(null);
  const dirRef = useRef<HTMLDivElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);
  const tipsRef = useRef<HTMLDivElement>(null);

  const accent = "#E11D48";
  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };

  const badgeFor = (val: string, type: "imp" | "health") => {
    if (type === "imp") {
      const bg = val === "Critical" ? C.badgeRedBg : val === "High" ? C.badgeAmberBg : val === "Med" ? C.badgeGreenBg : C.badgeGrayBg;
      const fg = val === "Critical" ? C.badgeRedFg : val === "High" ? C.badgeAmberFg : val === "Med" ? C.badgeGreenFg : C.badgeGrayFg;
      return S.badge(bg, fg);
    }
    const bg = val === "Red" ? C.badgeRedBg : val === "Amber" ? C.badgeAmberBg : val === "Green" ? C.badgeGreenBg : C.badgeGrayBg;
    const fg = val === "Red" ? C.badgeRedFg : val === "Amber" ? C.badgeAmberFg : val === "Green" ? C.badgeGreenFg : C.badgeGrayFg;
    return S.badge(bg, fg);
  };

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>STAKEHOLDER DIRECTORY INDEX</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; Relationship &amp; Stakeholder Management Hub &nbsp;|&nbsp; Master Navigation</td></tr>
    </tbody></table>
  );

  const renderDirectory = () => (
    <div ref={dirRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(accent)}>STAKEHOLDER MASTER LIST</div>
      <CopyButton targetRef={dirRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>List every key stakeholder here. This is your master navigation page &mdash; link each name to their full profile. Update importance, health, and cadence as relationships evolve. Sort by importance so the most critical people are always at the top.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "3%", textAlign: "center" as const }}>#</th>
          <th style={{ ...S.thPrimary, width: "13%" }}>Name</th>
          <th style={{ ...S.thPrimary, width: "13%" }}>Role / Title</th>
          <th style={{ ...S.thPrimary, width: "9%" }}>Org / Team</th>
          <th style={{ ...S.thPrimary, width: "8%" }}>Type</th>
          <th style={{ ...S.thPrimary, width: "7%", textAlign: "center" as const }}>Priority</th>
          <th style={{ ...S.thPrimary, width: "6%", textAlign: "center" as const }}>Health</th>
          <th style={{ ...S.thPrimary, width: "8%" }}>Cadence</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Last Touch</th>
          <th style={{ ...S.thPrimary, width: "14%" }}>Notes / Flag</th>
          <th style={{ ...S.thPrimary, width: "8%" }}>Profile Link</th>
        </tr></thead>
        <tbody>
          {[
            { n: "1", name: "Maria Lopez", role: "SVP, Operations", org: "Operations", type: "Sponsor", imp: "Critical", health: "Green", cad: "Weekly", last: "Mar 10", note: "Strong ally. Keep aligned on Q2 goals.", link: "[Link]" },
            { n: "2", name: "David Park", role: "CFO", org: "Finance", type: "Decision Maker", imp: "Critical", health: "Amber", cad: "Biweekly", last: "Mar 1", note: "\u26A0\uFE0F Overdue. Schedule call this week.", link: "[Link]" },
            { n: "3", name: "Sarah Chen", role: "VP Product", org: "Product", type: "Champion", imp: "High", health: "Amber", cad: "Biweekly", last: "Mar 12", note: "Needs updated talking points for Q2 roadmap.", link: "[Link]" },
            { n: "4", name: "James Wu", role: "Engineering Lead", org: "Engineering", type: "Blocker", imp: "High", health: "Red", cad: "Weekly", last: "Mar 11", note: "\u274C Blocking API approval. 1:1 scheduled Thu.", link: "[Link]" },
            { n: "5", name: "Lisa Tran", role: "EA to CEO", org: "Executive", type: "Gatekeeper", imp: "Med", health: "Green", cad: "Monthly", last: "Feb 28", note: "Good rapport. Key for CEO access.", link: "[Link]" },
            { n: "6", name: "Tom Rivera", role: "Principal Architect", org: "Platform", type: "Influencer", imp: "Med", health: "Green", cad: "Monthly", last: "Mar 5", note: "Respected technical voice. Win him = win team.", link: "[Link]" },
            { n: "7", name: "[Enter name]", role: "[Title]", org: "[Team]", type: "[Type]", imp: "[Level]", health: "[RAG]", cad: "[Freq]", last: "[Date]", note: "", link: "[Link]" },
            { n: "8", name: "[Enter name]", role: "[Title]", org: "[Team]", type: "[Type]", imp: "[Level]", health: "[RAG]", cad: "[Freq]", last: "[Date]", note: "", link: "[Link]" },
            { n: "9", name: "[Enter name]", role: "[Title]", org: "[Team]", type: "[Type]", imp: "[Level]", health: "[RAG]", cad: "[Freq]", last: "[Date]", note: "", link: "[Link]" },
            { n: "10", name: "[Enter name]", role: "[Title]", org: "[Team]", type: "[Type]", imp: "[Level]", health: "[RAG]", cad: "[Freq]", last: "[Date]", note: "", link: "[Link]" },
            { n: "11", name: "[Enter name]", role: "[Title]", org: "[Team]", type: "[Type]", imp: "[Level]", health: "[RAG]", cad: "[Freq]", last: "[Date]", note: "", link: "[Link]" },
            { n: "12", name: "[Enter name]", role: "[Title]", org: "[Team]", type: "[Type]", imp: "[Level]", health: "[RAG]", cad: "[Freq]", last: "[Date]", note: "", link: "[Link]" },
            { n: "13", name: "[Enter name]", role: "[Title]", org: "[Team]", type: "[Type]", imp: "[Level]", health: "[RAG]", cad: "[Freq]", last: "[Date]", note: "", link: "[Link]" },
            { n: "14", name: "[Enter name]", role: "[Title]", org: "[Team]", type: "[Type]", imp: "[Level]", health: "[RAG]", cad: "[Freq]", last: "[Date]", note: "", link: "[Link]" },
            { n: "15", name: "[Enter name]", role: "[Title]", org: "[Team]", type: "[Type]", imp: "[Level]", health: "[RAG]", cad: "[Freq]", last: "[Date]", note: "", link: "[Link]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 800, fontSize: "11px", color: accent }}>{r.n}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 700 }}>{r.name}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px" }}>{r.role}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px" }}>{r.org}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px" }}>{r.type}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={badgeFor(r.imp, "imp")}>{r.imp}</span></td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={badgeFor(r.health, "health")}>{r.health}</span></td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px" }}>{r.cad}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "9px" }}>{r.last}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", color: C.textMuted }}>{r.note}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", color: "#0EA5E9" }}>{r.link}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderSummary = () => (
    <div ref={summaryRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner("#8B5CF6")}>PORTFOLIO HEALTH SUMMARY</div>
      <CopyButton targetRef={summaryRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>A quick snapshot of your stakeholder portfolio. Update these numbers weekly to track trends. The goal is to move Amber and Red relationships toward Green over time.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={S.thPrimary}>Metric</th>
          <th style={{ ...S.thPrimary, width: "15%", textAlign: "center" as const }}>Count</th>
          <th style={S.thPrimary}>Target / Note</th>
        </tr></thead>
        <tbody>
          {[
            { metric: "Total Stakeholders Tracked", count: "[6]", target: "Most PMs track 8\u201315 stakeholders. More than 20 = consider delegating.", color: "#0EA5E9" },
            { metric: "Critical Priority", count: "[2]", target: "These are your top relationships. Never miss a cadence with Critical stakeholders.", color: accent },
            { metric: "Health: Green", count: "[3]", target: "Target: 60%+ Green. Maintain with consistent cadence and follow-through.", color: "#059669" },
            { metric: "Health: Amber", count: "[2]", target: "Target: <30% Amber. Each Amber needs an action plan this week.", color: "#D97706" },
            { metric: "Health: Red", count: "[1]", target: "Target: 0 Red. Every Red is an urgent fix \u2014 schedule a conversation TODAY.", color: "#DC2626" },
            { metric: "Overdue Touchpoints", count: "[1]", target: "Target: 0 overdue. Any overdue Critical = relationship emergency.", color: "#DC2626" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 700, color: r.color }}>{r.metric}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "14px", fontWeight: 800, color: r.color }}>{r.count}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", color: C.textMuted }}>{r.target}</td>
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
            <thead><tr><td style={{ backgroundColor: "#D1FAE5", color: "#059669", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #059669" }}>DIRECTORY BEST PRACTICES</td></tr></thead>
            <tbody>
              {[
                { color: "#059669", tip: "Sort by importance.", detail: "Critical stakeholders should always be at the top. You\u2019ll scan this page weekly \u2014 put the most important people first." },
                { color: "#0EA5E9", tip: "Link to full profiles.", detail: "Each name should hyperlink to their Stakeholder Profile page in OneNote. One click from index to detail." },
                { color: "#8B5CF6", tip: "Review weekly on Monday.", detail: "Scan the Health and Last Touch columns. Flag anyone overdue or trending from Green to Amber." },
                { color: "#D97706", tip: "Add new stakeholders immediately.", detail: "When you meet someone new who matters, add them here within 24 hours while context is fresh." },
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
            <thead><tr><td style={{ backgroundColor: "#FEF3C7", color: "#D97706", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #D97706" }}>WHEN TO UPDATE THIS INDEX</td></tr></thead>
            <tbody>
              {[
                { color: accent, tip: "New stakeholder identified", detail: "Someone new joins the project, becomes a dependency, or gains decision authority over your work." },
                { color: "#DC2626", tip: "Health status changes", detail: "A relationship shifts from Green to Amber or Red. Update immediately and create an action plan." },
                { color: "#059669", tip: "Role or org change", detail: "Stakeholder gets promoted, moves teams, or leaves. Update or archive their entry." },
                { color: "#6366F1", tip: "Quarterly portfolio review", detail: "Every quarter, review the full list. Remove people who are no longer relevant. Add new ones." },
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
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-50 border border-rose-100 text-rose-700 text-xs font-semibold"><Zap size={11} />&#11088; All-Star</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/relationship-hub" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-rose-600 transition-colors"><ArrowLeft size={14} />Back to Relationship Hub</Link>
          <CopyAllButton targetRef={fullRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-rose-100 flex items-center justify-center"><Handshake size={20} className="text-rose-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">Stakeholder Directory Index</h2><p className="text-xs font-medium text-rose-600">&#11088; All-Star &mdash; Master List &amp; Quick Navigation</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Your single source of truth for every stakeholder you manage. Each row links to a full profile page. Scan this weekly to check health, identify overdue contacts, and spot relationships that need attention. Think of this as your CRM home screen.</p>
        </div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">View Mode</p>
          <div className="flex flex-wrap gap-2">
            {LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (
              <button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-rose-600 text-white border-rose-600 shadow-md shadow-rose-200" : "bg-white text-slate-600 border-slate-200 hover:border-rose-300 hover:text-rose-700"}`}>
                <Icon size={15} /><span>{l.label}</span><span className={`text-[10px] font-medium ${isActive ? "text-rose-200" : "text-slate-400"}`}>{l.desc}</span>
              </button>
            ); })}
          </div>
        </div>
        <div ref={fullRef} style={{ fontFamily: S.font }}>
          {layout === "full" && <>{renderTitleBanner()}{renderDirectory()}{renderSummary()}{renderTips()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderDirectory()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullRef} /></div>
      </div>
    </div>
  );
}

export default function StakeholderDirectoryIndexPage() { return <ThemeProvider><DirectoryContent /></ThemeProvider>; }
