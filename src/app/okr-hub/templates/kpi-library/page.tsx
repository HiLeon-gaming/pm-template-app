"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, BookOpen, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Library", desc: "KPI catalog + definitions + ownership + tips", icon: LayoutDashboard },
  { id: "compact", label: "Quick View", desc: "KPI table only", icon: AlignJustify },
];

function KPILibraryContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullRef = useRef<HTMLDivElement>(null);
  const catRef = useRef<HTMLDivElement>(null);
  const rulesRef = useRef<HTMLDivElement>(null);
  const tipsRef = useRef<HTMLDivElement>(null);

  const accent = "#E11D48";

  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>KPI LIBRARY (KEY PERFORMANCE INDICATOR CATALOG)</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; OKR &amp; Operating Rhythm Hub &nbsp;|&nbsp; All Metrics in One Place</td></tr>
    </tbody></table>
  );

  const renderCat = () => (
    <div ref={catRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accent)}>KPI CATALOG</td></tr></tbody></table>
      <CopyButton targetRef={catRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>Every metric your organization tracks — with clear definitions, owners, and cadence. If it&apos;s not in this library, it doesn&apos;t get measured.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "5%", textAlign: "center" as const }}>#</th>
          <th style={{ ...S.thPrimary, width: "14%" }}>KPI Name</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Category</th>
          <th style={S.thPrimary}>Definition (How It&apos;s Calculated)</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Cadence</th>
          <th style={{ ...S.thPrimary, width: "8%" }}>Owner</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Source</th>
          <th style={{ ...S.thPrimary, width: "6%", textAlign: "center" as const }}>Target</th>
        </tr></thead>
        <tbody>
          {[
            { name: "Support Avg Wait Time", cat: "CX", catBg: "#DBEAFE", catFg: "#1E40AF", def: "Average time from ticket created to first human response (hours).", cad: "Weekly", owner: "[Tom R.]", src: "Zendesk", target: "≤ 6 hrs" },
            { name: "CSAT Score", cat: "CX", catBg: "#DBEAFE", catFg: "#1E40AF", def: "Avg satisfaction rating from post-interaction survey (1–5 scale).", cad: "Weekly", owner: "[Lisa P.]", src: "Survey", target: "≥ 4.5" },
            { name: "NPS (Net Promoter Score)", cat: "CX", catBg: "#DBEAFE", catFg: "#1E40AF", def: "% Promoters (9–10) minus % Detractors (0–6). Range: -100 to 100.", cad: "Monthly", owner: "[CX Lead]", src: "Delighted", target: "≥ 50" },
            { name: "MQLs (Monthly)", cat: "Growth", catBg: "#D1FAE5", catFg: "#065F46", def: "Marketing Qualified Leads: leads scoring ≥ 50 in lead scoring model.", cad: "Weekly", owner: "[Amy K.]", src: "HubSpot", target: "400/mo" },
            { name: "Enterprise Pipeline", cat: "Sales", catBg: "#FEF3C7", catFg: "#92400E", def: "Count of active enterprise deals ($100K+) in pipeline stages 2–4.", cad: "Weekly", owner: "[Mike D.]", src: "Salesforce", target: "≥ 10" },
            { name: "Sales Cycle (days)", cat: "Sales", catBg: "#FEF3C7", catFg: "#92400E", def: "Avg days from first meeting to closed-won for enterprise deals.", cad: "Monthly", owner: "[Sales Ops]", src: "Salesforce", target: "≤ 60" },
            { name: "Open Roles Filled", cat: "People", catBg: "#F3E8FF", catFg: "#6B21A8", def: "Number of approved roles with accepted offers / total approved roles.", cad: "Weekly", owner: "[HR Dir.]", src: "Lever", target: "5/5" },
            { name: "Employee Engagement", cat: "People", catBg: "#F3E8FF", catFg: "#6B21A8", def: "Avg score from monthly pulse survey (0–100%). 5 questions.", cad: "Monthly", owner: "[PeopleOps]", src: "Culture Amp", target: "≥ 85%" },
            { name: "Revenue (MRR)", cat: "Finance", catBg: "#FEE2E2", catFg: "#991B1B", def: "Monthly Recurring Revenue: sum of all active subscription revenue.", cad: "Monthly", owner: "[Finance]", src: "Stripe", target: "$[X]K" },
            { name: "[Your KPI]", cat: "", catBg: "transparent", catFg: C.textMuted, def: "", cad: "", owner: "", src: "", target: "" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 800, fontSize: "11px", color: accent }}>{i + 1}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 700 }}>{r.name}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}>{r.cat && <span style={S.badge(r.catBg, r.catFg)}>{r.cat}</span>}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px" }}>{r.def}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "9px", fontWeight: 600 }}>{r.cad}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px" }}>{r.owner}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "9px" }}>{r.src}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "10px", fontWeight: 700, color: accent }}>{r.target}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderRulesAndTips = () => (
    <div ref={rulesRef} style={{ marginBottom: "12px" }}>
      <CopyButton targetRef={rulesRef} label="Copy Section" />
      <table style={LT}><tbody><tr>
        <td style={{ ...LC, width: "50%", paddingRight: "4px" }}>
          <table style={S.tbl}>
            <thead><tr><td style={{ backgroundColor: "#EDE9FE", color: "#7C3AED", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #7C3AED" }}>📋 KPI LIBRARY RULES</td></tr></thead>
            <tbody>
              {[
                { label: "Max KPIs", value: "15\u201320 max for the whole org. More = no one remembers." },
                { label: "Every KPI Needs an Owner", value: "Unowned metrics die quietly. No owner = no accountability." },
                { label: "Review Cadence", value: "Review full library quarterly. Remove unused KPIs (30+ days)." },
                { label: "One Source of Truth", value: "Each KPI has ONE data source. Two calculations = an argument." },
              ].map((r, i) => {
                const bg = i % 2 === 1 ? C.rowAlt : C.white;
                return (
                  <tr key={i}>
                    <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", padding: "5px 10px" }}>
                      <strong style={{ color: "#7C3AED" }}>{r.label}</strong><br />
                      <span style={{ fontSize: "9px", color: C.textMuted }}>{r.value}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </td>
        <td style={{ ...LC, width: "50%", paddingLeft: "4px" }}>
          <table style={S.tbl}>
            <thead><tr><td style={{ backgroundColor: "#D1FAE5", color: "#059669", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #059669" }}>💡 SELECTION TIPS</td></tr></thead>
            <tbody>
              {[
                { color: accent, tip: "Can't act on it? Don't track it.", detail: "If the answer is always 'interesting but so what?' \u2014 remove it." },
                { color: "#059669", tip: "Leading > Lagging.", detail: "MQLs, pipeline tell what's coming. Revenue tells what happened. Act on leading." },
                { color: "#7C3AED", tip: "The 3-Second Test.", detail: "Can someone understand this KPI in 3 seconds? If not, simplify." },
                { color: "#D97706", tip: "Categories help.", detail: "Group by domain (CX, Growth, Sales, People, Finance)." },
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-rose-50/30">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-rose-600 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-50 border border-rose-100 text-rose-700 text-xs font-semibold"><BookOpen size={11} />Library</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/okr-hub" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-rose-600 transition-colors"><ArrowLeft size={14} />Back to OKR Hub</Link>
          <CopyAllButton targetRef={fullRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-rose-100 flex items-center justify-center"><BookOpen size={20} className="text-rose-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">KPI Library</h2><p className="text-xs font-medium text-rose-600">Key Performance Indicator Catalog</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">All metrics in one place — with definitions, owners, cadence, and targets. Avoids random metrics.</p>
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
          {layout === "full" && <>{renderTitleBanner()}{renderCat()}{renderRulesAndTips()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderCat()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullRef} /></div>
      </div>
    </div>
  );
}

export default function KPILibraryPage() { return <ThemeProvider><KPILibraryContent /></ThemeProvider>; }
