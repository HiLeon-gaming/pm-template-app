"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, Rocket, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Plan", desc: "Vision + skills + actions + timeline", icon: LayoutDashboard },
  { id: "compact", label: "Quick Plan", desc: "Goals + next steps only", icon: AlignJustify },
];

function CareerGrowthContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const visionRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);

  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };
  const accent = "#D946EF"; const accentDark = "#C026D3";

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>🚀 CAREER GROWTH PLANNER</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; Meetings Hub Pro &nbsp;|&nbsp; 1:1 Meetings</td></tr>
    </tbody></table>
  );

  const renderHeader = () => (
    <div ref={headerRef} style={{ marginBottom: "12px" }}>
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "18%" }}>Team Member</td><td style={{ ...S.td0, width: "32%" }}>[Name]</td><td style={{ ...S.tdLabel, width: "18%" }}>Current Role</td><td style={{ ...S.td0, width: "32%" }}>[Title]</td></tr>
        <tr><td style={S.tdLabelAlt}>Manager</td><td style={S.tdAlt}>[Your Name]</td><td style={S.tdLabelAlt}>Date Created</td><td style={S.tdAlt}>[MM/DD/YYYY]</td></tr>
        <tr><td style={S.tdLabel}>Last Updated</td><td style={S.td0}>[MM/DD/YYYY]</td><td style={S.tdLabel}>Review Cadence</td><td style={{ ...S.td0, fontWeight: 700, color: accent }}>[Quarterly]</td></tr>
      </tbody></table>
      <CopyButton targetRef={headerRef} label="Copy Section" />
    </div>
  );

  const renderVision = () => (
    <div ref={visionRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(accent)}>🎯 CAREER VISION</div>
      <CopyButton targetRef={visionRef} label="Copy Section" />
      <table style={LT}><tbody><tr>
        <td style={{ ...LC, width: "33.3%", paddingRight: "4px" }}>
          <table style={S.tbl}><tbody>
            <tr><td style={{ backgroundColor: "#059669", color: "#FFFFFF", padding: "8px 10px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, textAlign: "center" as const }}>6 Months</td></tr>
            <tr><td style={{ ...S.td0, fontSize: "10px", padding: "10px", lineHeight: "1.7" }}>[Where do they want to be in 6 months?]<br /><br />&bull; [Skill to develop]<br />&bull; [Experience to gain]<br />&bull; [Project to lead]</td></tr>
          </tbody></table>
        </td>
        <td style={{ ...LC, width: "33.3%", paddingRight: "4px" }}>
          <table style={S.tbl}><tbody>
            <tr><td style={{ backgroundColor: "#3B82F6", color: "#FFFFFF", padding: "8px 10px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, textAlign: "center" as const }}>1 Year</td></tr>
            <tr><td style={{ ...S.td0, fontSize: "10px", padding: "10px", lineHeight: "1.7" }}>[Where do they want to be in 1 year?]<br /><br />&bull; [Role change?]<br />&bull; [Leadership scope?]<br />&bull; [Technical depth?]</td></tr>
          </tbody></table>
        </td>
        <td style={{ ...LC, width: "33.3%" }}>
          <table style={S.tbl}><tbody>
            <tr><td style={{ backgroundColor: accentDark, color: "#FFFFFF", padding: "8px 10px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, textAlign: "center" as const }}>2-3 Years</td></tr>
            <tr><td style={{ ...S.td0, fontSize: "10px", padding: "10px", lineHeight: "1.7" }}>[Long-term aspiration]<br /><br />&bull; [Dream role?]<br />&bull; [Industry change?]<br />&bull; [Entrepreneurship?]</td></tr>
          </tbody></table>
        </td>
      </tr></tbody></table>
    </div>
  );

  const renderSkills = () => (
    <div ref={skillsRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(accentDark)}>📊 SKILLS GAP ASSESSMENT</div>
      <CopyButton targetRef={skillsRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={S.thPrimary}>Skill / Competency</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Current</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Target</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Gap</th>
          <th style={{ ...S.thPrimary, width: "25%" }}>How to Close</th>
        </tr></thead>
        <tbody>
          {[
            { skill: "[Technical leadership]", curr: "3/5", tgt: "5/5", gap: "2", how: "[Lead architecture reviews, mentor juniors]" },
            { skill: "[Executive communication]", curr: "2/5", tgt: "4/5", gap: "2", how: "[Presentation workshop, practice at all-hands]" },
            { skill: "[Strategic thinking]", curr: "3/5", tgt: "4/5", gap: "1", how: "[Shadow VP in planning sessions]" },
            { skill: "[People management]", curr: "2/5", tgt: "4/5", gap: "2", how: "[Management training, buddy system with senior mgr]" },
            { skill: "[Cross-functional influence]", curr: "3/5", tgt: "5/5", gap: "2", how: "[Lead a cross-team initiative]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 600 }}>{r.skill}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "10px" }}>{r.curr}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "10px", fontWeight: 700, color: accent }}>{r.tgt}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "10px", fontWeight: 700, color: "#DC2626" }}>{r.gap}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", color: C.textMuted }}>{r.how}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderActions = () => (
    <div ref={actionsRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(accent)}>✅ DEVELOPMENT ACTIONS</div>
      <CopyButton targetRef={actionsRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={S.thPrimary}>Action</th>
          <th style={{ ...S.thPrimary, width: "12%", textAlign: "center" as const }}>Type</th>
          <th style={{ ...S.thPrimary, width: "12%" }}>Owner</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Timeline</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Status</th>
        </tr></thead>
        <tbody>
          {[
            { action: "[Enroll in AWS Solutions Architect certification]", type: "Training", tBg: C.badgeBlueBg, tFg: C.badgeBlueFg, owner: "[Sarah]", timeline: "[Q2]", s: "In Progress", sBg: C.badgeBlueBg, sFg: C.badgeBlueFg },
            { action: "[Present at next all-hands meeting]", type: "Stretch", tBg: C.badgeAmberBg, tFg: C.badgeAmberFg, owner: "[You + Sarah]", timeline: "[03/20]", s: "Planned", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg },
            { action: "[Shadow VP in quarterly planning session]", type: "Exposure", tBg: C.badgeGrayBg, tFg: C.badgeGrayFg, owner: "[You]", timeline: "[Q2]", s: "Not Started", sBg: C.badgeGrayBg, sFg: C.badgeGrayFg },
            { action: "[Assign as tech lead for Project Beta]", type: "Stretch", tBg: C.badgeAmberBg, tFg: C.badgeAmberFg, owner: "[You]", timeline: "[Q2]", s: "Pending", sBg: C.badgeAmberBg, sFg: C.badgeAmberFg },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.action}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.tBg, r.tFg)}>{r.type}</span></td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 600 }}>{r.owner}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, fontSize: "10px", color: accent }}>{r.timeline}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.sBg, r.sFg)}>{r.s}</span></td>
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
        ExecNoteShop &nbsp;&bull;&nbsp; Meetings Hub Pro &nbsp;&bull;&nbsp; &copy; 2026 All Rights Reserved
      </td>
    </tr></tbody></table>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-fuchsia-50/30">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-fuchsia-500 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-fuchsia-50 border border-fuchsia-100 text-fuchsia-700 text-xs font-semibold"><Rocket size={11} />Growth</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/meetings-hub" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-fuchsia-600 transition-colors"><ArrowLeft size={14} />Back to Meetings Hub Pro</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-fuchsia-100 flex items-center justify-center"><Rocket size={20} className="text-fuchsia-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">Career Growth Planner</h2><p className="text-xs font-medium text-fuchsia-600">Vision &bull; Skills Gap &bull; Development Actions</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Long-term career vision, skills gap assessment, and concrete development actions. Shows you care about their future.</p>
        </div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">View Mode</p>
          <div className="flex flex-wrap gap-2">
            {LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (
              <button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-fuchsia-500 text-white border-fuchsia-500 shadow-md shadow-fuchsia-200" : "bg-white text-slate-600 border-slate-200 hover:border-fuchsia-300 hover:text-fuchsia-700"}`}>
                <Icon size={15} /><span>{l.label}</span><span className={`text-[10px] font-medium ${isActive ? "text-fuchsia-200" : "text-slate-400"}`}>{l.desc}</span>
              </button>
            ); })}
          </div>
        </div>
        <div ref={fullPageRef} style={{ fontFamily: S.font }}>
          {layout === "full" && <>{renderTitleBanner()}{renderHeader()}{renderVision()}{renderSkills()}{renderActions()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderHeader()}{renderVision()}{renderActions()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function CareerGrowthPage() { return <ThemeProvider><CareerGrowthContent /></ThemeProvider>; }
