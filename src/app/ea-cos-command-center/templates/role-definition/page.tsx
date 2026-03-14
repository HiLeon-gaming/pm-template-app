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
  { id: "full", label: "Full Comparison", desc: "EA vs CoS + section relevance", icon: LayoutDashboard },
  { id: "compact", label: "Quick View", desc: "Side-by-side only", icon: AlignJustify },
];

function RoleDefinitionContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const compareRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<HTMLDivElement>(null);

  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };
  const accent = "#8B5CF6";

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>👤 ROLE DEFINITION: EA vs CHIEF OF STAFF</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; EA / Chief of Staff Command Center &nbsp;|&nbsp; Start Here</td></tr>
    </tbody></table>
  );

  const renderCompare = () => (
    <div ref={compareRef} style={{ marginBottom: "12px" }}>
      <CopyButton targetRef={compareRef} label="Copy Section" />
      <table style={LT}><tbody><tr>
        <td style={{ ...LC, width: "50%", paddingRight: "4px" }}>
          <table style={S.tbl}><tbody>
            <tr><td style={{ backgroundColor: "#EC4899", color: "#FFFFFF", padding: "12px 14px", fontFamily: S.font, fontSize: "16px", fontWeight: 800, border: `1.5px solid ${C.border}`, textAlign: "center" as const }}>🗂️ EXECUTIVE ASSISTANT</td></tr>
            <tr><td style={{ ...S.thSecondary, textAlign: "center" as const, fontSize: "10px" }}>Operational Excellence &amp; Efficiency</td></tr>
            <tr><td style={{ ...S.td0, fontSize: "10px", lineHeight: "1.9", padding: "10px 14px" }}>
              <strong style={{ color: "#EC4899" }}>Primary Focus:</strong><br />
              &bull; Calendar management &amp; scheduling<br />
              &bull; Meeting prep &amp; follow-up<br />
              &bull; Travel &amp; event logistics<br />
              &bull; Request triage &amp; inbox management<br />
              &bull; Document management &amp; filing<br />
              &bull; Expense tracking &amp; admin<br /><br />
              <strong style={{ color: "#EC4899" }}>Reports To:</strong> Executive directly<br />
              <strong style={{ color: "#EC4899" }}>Superpower:</strong> Making the exec&apos;s day run flawlessly
            </td></tr>
          </tbody></table>
        </td>
        <td style={{ ...LC, width: "50%", paddingLeft: "4px" }}>
          <table style={S.tbl}><tbody>
            <tr><td style={{ backgroundColor: "#7C3AED", color: "#FFFFFF", padding: "12px 14px", fontFamily: S.font, fontSize: "16px", fontWeight: 800, border: `1.5px solid ${C.border}`, textAlign: "center" as const }}>🎯 CHIEF OF STAFF</td></tr>
            <tr><td style={{ ...S.thSecondary, textAlign: "center" as const, fontSize: "10px" }}>Strategic Alignment &amp; Execution</td></tr>
            <tr><td style={{ ...S.td0, fontSize: "10px", lineHeight: "1.9", padding: "10px 14px" }}>
              <strong style={{ color: "#7C3AED" }}>Primary Focus:</strong><br />
              &bull; Strategic initiative tracking<br />
              &bull; Cross-team alignment &amp; OKRs<br />
              &bull; Decision facilitation &amp; escalation<br />
              &bull; Leadership operating rhythm<br />
              &bull; Stakeholder management<br />
              &bull; Organizational communication<br /><br />
              <strong style={{ color: "#7C3AED" }}>Reports To:</strong> CEO / C-suite leader<br />
              <strong style={{ color: "#7C3AED" }}>Superpower:</strong> Making the org run on the exec&apos;s vision
            </td></tr>
          </tbody></table>
        </td>
      </tr></tbody></table>
      <table style={{ ...S.tbl, marginTop: "4px" }}><tbody>
        <tr><td style={{ ...S.td0, textAlign: "center" as const, fontSize: "11px", fontWeight: 700, color: accent, padding: "10px", backgroundColor: C.labelBg }}>💡 Many people do BOTH roles. This pack supports either mode — just focus on the sections most relevant to you.</td></tr>
      </tbody></table>
    </div>
  );

  const renderSections = () => (
    <div ref={sectionsRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(accent)}>📋 SECTION RELEVANCE BY ROLE</div>
      <CopyButton targetRef={sectionsRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={S.thPrimary}>Section</th>
          <th style={{ ...S.thPrimary, width: "14%", textAlign: "center" as const }}>EA Priority</th>
          <th style={{ ...S.thPrimary, width: "14%", textAlign: "center" as const }}>CoS Priority</th>
          <th style={S.thPrimary}>Notes</th>
        </tr></thead>
        <tbody>
          {[
            { section: "A — Start Here", ea: "🔴 Must", cos: "🔴 Must", notes: "Both roles need the dashboard and inbox" },
            { section: "B — Requests & Follow-Ups", ea: "🔴 Must", cos: "🔴 Must", notes: "Core execution engine for both" },
            { section: "C — Calendar & Time", ea: "🔴 Must", cos: "🟡 Useful", notes: "EA owns calendar; CoS uses strategy pages" },
            { section: "D — Meetings Engine", ea: "🔴 Must", cos: "🔴 Must", notes: "Both prep and follow up on meetings" },
            { section: "E — Stakeholders & Relationships", ea: "🟡 Useful", cos: "🔴 Must", notes: "CoS manages relationships strategically" },
            { section: "F — Initiatives & Alignment", ea: "🟢 Optional", cos: "🔴 Must", notes: "CoS core — initiative tracking & OKRs" },
            { section: "G — Travel & Events", ea: "🔴 Must", cos: "🟢 Optional", notes: "EA owns travel logistics" },
            { section: "H — Admin & Finance", ea: "🔴 Must", cos: "🟡 Useful", notes: "EA handles expenses and doc control" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 700, fontSize: "11px" }}>{r.section}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "11px" }}>{r.ea}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "11px" }}>{r.cos}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.notes}</td>
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
        ExecNoteShop &nbsp;&bull;&nbsp; EA / Chief of Staff Command Center &nbsp;&bull;&nbsp; &copy; 2026 All Rights Reserved
      </td>
    </tr></tbody></table>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50/30">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-purple-600 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-purple-50 border border-purple-100 text-purple-700 text-xs font-semibold"><Users size={11} />Roles</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/ea-cos-command-center" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-purple-600 transition-colors"><ArrowLeft size={14} />Back to EA/CoS Command Center</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center"><Users size={20} className="text-purple-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">Role Definition: EA vs Chief of Staff</h2><p className="text-xs font-medium text-purple-600">How to Use Either Mode</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Explains which sections matter most depending on your role. Use this to focus your setup.</p>
        </div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">View Mode</p>
          <div className="flex flex-wrap gap-2">
            {LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (
              <button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-purple-600 text-white border-purple-600 shadow-md shadow-purple-200" : "bg-white text-slate-600 border-slate-200 hover:border-purple-300 hover:text-purple-700"}`}>
                <Icon size={15} /><span>{l.label}</span><span className={`text-[10px] font-medium ${isActive ? "text-purple-200" : "text-slate-400"}`}>{l.desc}</span>
              </button>
            ); })}
          </div>
        </div>
        <div ref={fullPageRef} style={{ fontFamily: S.font }}>
          {layout === "full" && <>{renderTitleBanner()}{renderCompare()}{renderSections()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderCompare()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function RoleDefinitionPage() { return <ThemeProvider><RoleDefinitionContent /></ThemeProvider>; }
