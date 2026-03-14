"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, Heart, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Plan", desc: "Strategy + touchpoints + do/don't", icon: LayoutDashboard },
  { id: "compact", label: "Quick Plan", desc: "Key details only", icon: AlignJustify },
];

function RelationshipPlanContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const strategyRef = useRef<HTMLDivElement>(null);

  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };
  const accent = "#EF4444";

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>RELATIONSHIP PLAN (KEY STAKEHOLDER)</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; EA / Chief of Staff Command Center &nbsp;|&nbsp; Stakeholders &amp; Relationships</td></tr>
    </tbody></table>
  );

  const renderProfile = () => (
    <div ref={profileRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(accent)}>STAKEHOLDER OVERVIEW</div>
      <CopyButton targetRef={profileRef} label="Copy Section" />
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "22%" }}>Stakeholder Name</td><td style={{ ...S.td0, fontWeight: 700, fontSize: "13px" }}>[Name]</td></tr>
        <tr><td style={S.tdLabelAlt}>Title / Organization</td><td style={S.tdAlt}>[Title, Company / Division]</td></tr>
        <tr><td style={S.tdLabel}>Relationship to Exec</td><td style={S.td0}>[Board member / Investor / Direct report / External partner]</td></tr>
        <tr><td style={S.tdLabelAlt}>Current Relationship Health</td><td style={S.tdAlt}><span style={S.badge(C.badgeGreenBg, C.badgeGreenFg)}>Strong</span> / <span style={S.badge(C.badgeAmberBg, C.badgeAmberFg)}>Needs Attention</span> / <span style={S.badge(C.badgeRedBg, C.badgeRedFg)}>At Risk</span></td></tr>
        <tr><td style={S.tdLabel}>What They Care About Most</td><td style={{ ...S.td0, fontWeight: 600 }}>[Revenue growth, team morale, innovation, cost control]</td></tr>
        <tr><td style={S.tdLabelAlt}>How to Support Them</td><td style={S.tdAlt}>[Proactive updates, early warnings, data-driven insights]</td></tr>
        <tr><td style={S.tdLabel}>What to Avoid</td><td style={{ ...S.td0, color: "#DC2626", fontWeight: 600 }}>[Surprises, long emails, unstructured meetings, being late]</td></tr>
        <tr><td style={S.tdLabelAlt}>Target Cadence</td><td style={{ ...S.tdAlt, fontWeight: 700, color: accent }}>[Weekly / Bi-weekly / Monthly]</td></tr>
      </tbody></table>
    </div>
  );

  const renderStrategy = () => (
    <div ref={strategyRef} style={{ marginBottom: "12px" }}>
      <table style={LT}><tbody><tr>
        <td style={{ ...LC, width: "50%", paddingRight: "4px" }}>
          <div style={S.sectionBanner("#059669")}>RELATIONSHIP GOALS</div>
          <table style={S.tbl}><tbody>
            <tr><td style={{ ...S.td0, fontSize: "10px", lineHeight: "1.9", padding: "10px 14px" }}>
              <strong style={{ color: "#059669" }}>Short-term (30 days):</strong><br />
              &bull; [Schedule intro / reconnect meeting]<br />
              &bull; [Share Q1 results summary]<br /><br />
              <strong style={{ color: "#059669" }}>Medium-term (90 days):</strong><br />
              &bull; [Build trust through consistent updates]<br />
              &bull; [Proactively address their top concern]<br /><br />
              <strong style={{ color: "#059669" }}>Long-term (12 months):</strong><br />
              &bull; [Become a trusted advisor, not just an update provider]<br />
              &bull; [Align on strategic vision]
            </td></tr>
          </tbody></table>
        </td>
        <td style={{ ...LC, width: "50%", paddingLeft: "4px" }}>
          <div style={S.sectionBanner("#0EA5E9")}>UPCOMING TOUCHPOINTS</div>
          <table style={S.tbl}>
            <thead><tr>
              <th style={{ ...S.thSecondary, width: "25%", textAlign: "center" as const }}>Date</th>
              <th style={S.thSecondary}>Touchpoint</th>
            </tr></thead>
            <tbody>
              {[
                { date: "03/18", touch: "[Send quarterly update email]" },
                { date: "03/25", touch: "[Lunch meeting — relationship building]" },
                { date: "04/01", touch: "[Board prep pre-brief call]" },
                { date: "04/15", touch: "[Check-in on open commitment]" },
              ].map((r, i) => {
                const bg = i % 2 === 1 ? C.rowAlt : C.white;
                return (
                  <tr key={i}>
                    <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, fontSize: "10px", color: accent }}>{r.date}</td>
                    <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.touch}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </td>
      </tr></tbody></table>
      <CopyButton targetRef={strategyRef} label="Copy Section" />
    </div>
  );

  const renderFooter = () => (
    <table style={{ ...S.tbl, marginTop: "8px" }}><tbody><tr>
      <td style={{ backgroundColor: C.primary, color: C.footerText, padding: "8px 20px", fontSize: "10px", fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.06em" }}>
        ExecNoteShop &bull; EA / Chief of Staff Command Center &bull; &copy; 2026 All Rights Reserved
      </td>
    </tr></tbody></table>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-red-50/30">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-red-500 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-50 border border-red-100 text-red-700 text-xs font-semibold"><Heart size={11} />Relationship</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/ea-cos-command-center" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-red-600 transition-colors"><ArrowLeft size={14} />Back to EA/CoS Command Center</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center"><Heart size={20} className="text-red-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">Relationship Plan</h2><p className="text-xs font-medium text-red-600">Proactive Relationship Management</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">What they care about, how to support them, what to avoid. One page per key stakeholder.</p>
        </div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">View Mode</p>
          <div className="flex flex-wrap gap-2">
            {LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (
              <button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-red-500 text-white border-red-500 shadow-md shadow-red-200" : "bg-white text-slate-600 border-slate-200 hover:border-red-300 hover:text-red-700"}`}>
                <Icon size={15} /><span>{l.label}</span><span className={`text-[10px] font-medium ${isActive ? "text-red-200" : "text-slate-400"}`}>{l.desc}</span>
              </button>
            ); })}
          </div>
        </div>
        <div ref={fullPageRef} style={{ fontFamily: S.font }}>
          {layout === "full" && <>{renderTitleBanner()}{renderProfile()}{renderStrategy()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderProfile()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function RelationshipPlanPage() { return <ThemeProvider><RelationshipPlanContent /></ThemeProvider>; }
