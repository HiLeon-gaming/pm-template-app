"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, TrendingUp, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Check-In", desc: "Goals + strengths + areas + plan", icon: LayoutDashboard },
  { id: "compact", label: "Quick Check-In", desc: "Goals + rating only", icon: AlignJustify },
];

function PerformanceCheckinContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const goalsRef = useRef<HTMLDivElement>(null);
  const strengthsRef = useRef<HTMLDivElement>(null);
  const planRef = useRef<HTMLDivElement>(null);

  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };
  const accent = "#D946EF"; const accentDark = "#C026D3";

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>📊 PERFORMANCE CHECK-IN</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; Meetings Hub Pro &nbsp;|&nbsp; 1:1 Meetings &nbsp;|&nbsp; Quarterly / Monthly</td></tr>
    </tbody></table>
  );

  const renderHeader = () => (
    <div ref={headerRef} style={{ marginBottom: "12px" }}>
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "18%" }}>Team Member</td><td style={{ ...S.td0, width: "32%" }}>[Name]</td><td style={{ ...S.tdLabel, width: "18%" }}>Review Period</td><td style={{ ...S.td0, width: "32%" }}>[Q1 2026 / Jan-Mar 2026]</td></tr>
        <tr><td style={S.tdLabelAlt}>Manager</td><td style={S.tdAlt}>[Your Name]</td><td style={S.tdLabelAlt}>Date</td><td style={S.tdAlt}>[MM/DD/YYYY]</td></tr>
        <tr><td style={S.tdLabel}>Overall Rating</td><td style={{ ...S.td0, fontWeight: 700, color: accent }}>[Exceeds / Meets / Developing / Below]</td><td style={S.tdLabel}>Next Review</td><td style={S.td0}>[MM/DD/YYYY]</td></tr>
      </tbody></table>
      <CopyButton targetRef={headerRef} label="Copy Section" />
    </div>
  );

  const renderGoals = () => (
    <div ref={goalsRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accent)}>🎯 GOAL PROGRESS REVIEW</td></tr></tbody></table>
      <CopyButton targetRef={goalsRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "5%", textAlign: "center" as const }}>#</th>
          <th style={S.thPrimary}>Goal</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Target</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Actual</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Status</th>
          <th style={{ ...S.thPrimary, width: "20%" }}>Manager Notes</th>
        </tr></thead>
        <tbody>
          {[
            { goal: "[Complete customer onboarding redesign]", target: "[100%]", actual: "[85%]", s: "On Track", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg, notes: "[Strong progress — 2 weeks to go]" },
            { goal: "[Reduce bug backlog by 40%]", target: "[40%]", actual: "[45%]", s: "Exceeded", sBg: C.badgeBlueBg, sFg: C.badgeBlueFg, notes: "[Excellent — exceeded target]" },
            { goal: "[Complete AWS Solutions Architect cert]", target: "[Exam]", actual: "[Studying]", s: "At Risk", sBg: C.badgeAmberBg, sFg: C.badgeAmberFg, notes: "[Needs more study time — discuss]" },
            { goal: "[Lead 2 sprint reviews independently]", target: "[2]", actual: "[1]", s: "On Track", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg, notes: "[Second one scheduled for 03/15]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 800, fontSize: "14px", color: accent }}>{i + 1}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 600 }}>{r.goal}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "10px" }}>{r.target}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "10px", fontWeight: 700, color: accent }}>{r.actual}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.sBg, r.sFg)}>{r.s}</span></td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", color: C.textMuted }}>{r.notes}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderStrengths = () => (
    <div ref={strengthsRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accentDark)}>💡 STRENGTHS &amp; GROWTH AREAS</td></tr></tbody></table>
      <CopyButton targetRef={strengthsRef} label="Copy Section" />
      <table style={LT}><tbody><tr>
        <td style={{ ...LC, width: "50%", paddingRight: "4px" }}>
          <table style={S.tbl}><tbody>
            <tr><td style={{ ...S.thSecondary, textAlign: "center" as const, backgroundColor: "#059669", color: "#FFFFFF" }}>🏆 Strengths &amp; Wins</td></tr>
            <tr><td style={{ ...S.td0, fontSize: "10px", lineHeight: "1.8", padding: "10px" }}>
              &bull; [Technical depth — consistently delivers quality code]<br />
              &bull; [Team collaboration — helps onboard new members]<br />
              &bull; [Reliability — never misses a deadline]<br />
              &bull; [Initiative — proactively identified performance issue]
            </td></tr>
          </tbody></table>
        </td>
        <td style={{ ...LC, width: "50%", paddingLeft: "4px" }}>
          <table style={S.tbl}><tbody>
            <tr><td style={{ ...S.thSecondary, textAlign: "center" as const, backgroundColor: "#EA580C", color: "#FFFFFF" }}>🌱 Growth Areas</td></tr>
            <tr><td style={{ ...S.td0, fontSize: "10px", lineHeight: "1.8", padding: "10px" }}>
              &bull; [Communication — could be more concise in updates]<br />
              &bull; [Cross-team influence — needs to build relationships]<br />
              &bull; [Delegation — tends to take on too much personally]<br />
              &bull; [Presentation skills — needs practice with exec audiences]
            </td></tr>
          </tbody></table>
        </td>
      </tr></tbody></table>
    </div>
  );

  const renderPlan = () => (
    <div ref={planRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accent)}>📋 DEVELOPMENT PLAN &amp; NEXT STEPS</td></tr></tbody></table>
      <CopyButton targetRef={planRef} label="Copy Section" />
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "22%" }}>Next Quarter Goals</td><td style={S.td0}>[1) Complete AWS cert. 2) Lead 3 sprint reviews. 3) Present at all-hands.]</td></tr>
        <tr><td style={S.tdLabelAlt}>Training / Resources</td><td style={S.tdAlt}>[AWS study group, presentation skills workshop, shadow VP in exec meeting]</td></tr>
        <tr><td style={S.tdLabel}>Manager Commitments</td><td style={S.td0}>[1) Allocate 4 hrs/week for cert study. 2) Provide presentation coaching. 3) Nominate for leadership program.]</td></tr>
        <tr><td style={S.tdLabelAlt}>Compensation / Role</td><td style={S.tdAlt}>[Discuss promotion timeline? Salary review? Title change?]</td></tr>
        <tr><td style={S.tdLabel}>Employee Feedback</td><td style={S.td0}>[What did they say about their experience? Any concerns?]</td></tr>
      </tbody></table>
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
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-fuchsia-50 border border-fuchsia-100 text-fuchsia-700 text-xs font-semibold"><TrendingUp size={11} />Performance</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/meetings-hub" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-fuchsia-600 transition-colors"><ArrowLeft size={14} />Back to Meetings Hub Pro</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-fuchsia-100 flex items-center justify-center"><TrendingUp size={20} className="text-fuchsia-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">Performance Check-In</h2><p className="text-xs font-medium text-fuchsia-600">Quarterly / Monthly &mdash; Goals, Strengths &amp; Development</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Goal progress, strengths, growth areas, and development plan. Structured framework for meaningful performance conversations.</p>
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
          {layout === "full" && <>{renderTitleBanner()}{renderHeader()}{renderGoals()}{renderStrengths()}{renderPlan()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderHeader()}{renderGoals()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function PerformanceCheckinPage() { return <ThemeProvider><PerformanceCheckinContent /></ThemeProvider>; }
