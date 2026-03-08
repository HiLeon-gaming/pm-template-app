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
  { id: "full", label: "Full Checklist", desc: "All categories + signoff", icon: LayoutDashboard },
  { id: "compact", label: "Quick Check", desc: "Checklist only", icon: AlignJustify },
];

function ReleaseReadinessContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const checklistRef = useRef<HTMLDivElement>(null);
  const signoffRef = useRef<HTMLDivElement>(null);

  const accent = "#8B5CF6"; const accentDark = "#7C3AED";

  const checkCategory = (title: string, emoji: string, color: string, items: { check: string; notes: string }[]) => (
    <table style={{ ...S.tbl, marginBottom: "6px" }}>
      <thead>
        <tr><td colSpan={3} style={{ backgroundColor: color, color: C.white, padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}` }}>{emoji} {title}</td></tr>
        <tr>
          <th style={{ ...S.thSecondary, width: "5%", textAlign: "center" as const }}>☐</th>
          <th style={S.thSecondary}>Check Item</th>
          <th style={{ ...S.thSecondary, width: "30%" }}>Status / Notes</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item, i) => {
          const bg = i % 2 === 1 ? C.rowAlt : C.white;
          return (
            <tr key={i}>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "15px" }}>☐</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{item.check}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", color: C.textMuted }}>{item.notes}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>🚀 RELEASE READINESS CHECKLIST</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; Agile / Scrum Delivery Command Center &nbsp;|&nbsp; Quality &amp; Delivery</td></tr>
    </tbody></table>
  );

  const renderHeader = () => (
    <div ref={headerRef} style={{ marginBottom: "12px" }}>
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "18%" }}>Release</td><td style={{ ...S.td0, width: "32%" }}>[Release Name / Version]</td><td style={{ ...S.tdLabel, width: "18%" }}>Target Date</td><td style={{ ...S.td0, width: "32%" }}>[MM/DD/YYYY]</td></tr>
        <tr><td style={S.tdLabelAlt}>Sprint</td><td style={S.tdAlt}>[Sprint #]</td><td style={S.tdLabelAlt}>Release Owner</td><td style={S.tdAlt}>[Name / SM]</td></tr>
      </tbody></table>
      <CopyButton targetRef={headerRef} label="Copy Section" />
    </div>
  );

  const renderChecklist = () => (
    <div ref={checklistRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(accent)}>✅ RELEASE READINESS</div>
      <CopyButton targetRef={checklistRef} label="Copy Section" />

      {checkCategory("CODE & BUILD", "🔧", accentDark, [
        { check: "All stories meet Definition of Done", notes: "" },
        { check: "All code merged to release branch / main", notes: "" },
        { check: "CI/CD pipeline green — all tests passing", notes: "" },
        { check: "No critical or high-severity bugs open", notes: "[## open bugs]" },
        { check: "Feature flags configured correctly for release", notes: "" },
      ])}

      {checkCategory("TESTING & QA", "🧪", "#0891B2", [
        { check: "All acceptance criteria tested and passed", notes: "" },
        { check: "Regression testing completed", notes: "" },
        { check: "Performance / load testing completed (if applicable)", notes: "" },
        { check: "Cross-browser / device testing done", notes: "" },
        { check: "Accessibility checks passed", notes: "" },
      ])}

      {checkCategory("DEPLOYMENT", "📦", "#059669", [
        { check: "Deployment plan documented and reviewed", notes: "" },
        { check: "Database migrations tested (if applicable)", notes: "" },
        { check: "Rollback plan documented and tested", notes: "" },
        { check: "Monitoring and alerting configured", notes: "" },
        { check: "On-call / support team notified", notes: "" },
      ])}

      {checkCategory("COMMUNICATION", "📣", "#F59E0B", [
        { check: "Release notes drafted and approved", notes: "" },
        { check: "Stakeholders notified of release date and scope", notes: "" },
        { check: "Customer-facing documentation updated", notes: "" },
        { check: "Support team briefed on new features / changes", notes: "" },
        { check: "Marketing / sales notified (if user-facing release)", notes: "" },
      ])}
    </div>
  );

  const renderSignoff = () => (
    <div ref={signoffRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(accentDark)}>✍️ RELEASE SIGN-OFF</div>
      <CopyButton targetRef={signoffRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={S.thSecondary}>Role</th>
          <th style={{ ...S.thSecondary, width: "20%" }}>Name</th>
          <th style={{ ...S.thSecondary, width: "12%", textAlign: "center" as const }}>Approved</th>
          <th style={{ ...S.thSecondary, width: "12%", textAlign: "center" as const }}>Date</th>
          <th style={{ ...S.thSecondary, width: "25%" }}>Notes / Conditions</th>
        </tr></thead>
        <tbody>
          {[
            { role: "Product Owner", name: "[Name]" },
            { role: "QA Lead", name: "[Name]" },
            { role: "Tech Lead / Architect", name: "[Name]" },
            { role: "Scrum Master", name: "[Name]" },
            { role: "Engineering Manager", name: "[Name]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 600, fontSize: "11px" }}>{r.role}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{r.name}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "14px" }}>☐ Y &nbsp;☐ N</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "11px" }}>[MM/DD]</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>&nbsp;</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <table style={{ ...S.tbl, marginTop: "6px" }}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "22%" }}>Go / No-Go Decision</td><td style={S.td0}><span style={S.badge(C.badgeGreenBg, C.badgeGreenFg)}>☐ GO</span> &nbsp; <span style={S.badge(C.badgeRedBg, C.badgeRedFg)}>☐ NO-GO</span> &nbsp; <span style={S.badge(C.badgeAmberBg, C.badgeAmberFg)}>☐ GO WITH CONDITIONS</span></td></tr>
        <tr><td style={S.tdLabelAlt}>If No-Go, Reason</td><td style={{ ...S.tdAlt, height: "36px" }}>[Explain what must be resolved before release]</td></tr>
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-violet-50/30">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-violet-600 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-violet-50 border border-violet-100 text-violet-700 text-xs font-semibold"><Rocket size={11} />Release</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/agile-command-center" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-violet-600 transition-colors"><ArrowLeft size={14} />Back to Agile Command Center</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-violet-100 flex items-center justify-center"><Rocket size={20} className="text-violet-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">Release Readiness Checklist</h2><p className="text-xs font-medium text-violet-600">Go / No-Go Gate Before Shipping</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Pre-release checklist covering code, testing, deployment, and communication. Includes sign-off and go/no-go decision.</p>
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
          {layout === "full" && <>{renderTitleBanner()}{renderHeader()}{renderChecklist()}{renderSignoff()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderHeader()}{renderChecklist()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function ReleaseReadinessPage() { return <ThemeProvider><ReleaseReadinessContent /></ThemeProvider>; }
