"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, Library, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Library", desc: "Index + search + analytics", icon: LayoutDashboard },
  { id: "compact", label: "Quick Index", desc: "Library index only", icon: AlignJustify },
];

function LessonsLearnedLibraryIndexContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const indexRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const analyticsRef = useRef<HTMLDivElement>(null);
  const topRef = useRef<HTMLDivElement>(null);

  const descStyle: React.CSSProperties = {
    fontFamily: S.font, fontSize: "11px", fontStyle: "italic", color: "#475569",
    padding: "10px 14px", lineHeight: "1.6", borderBottom: `1px solid ${C.border}`, backgroundColor: C.white,
  };
  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "0px" }}>
      <tbody>
        <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${C.accent}`, textAlign: "center" as const }}>&#x1F4DA; LESSONS LEARNED LIBRARY INDEX</td></tr>
        <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; PM Command Center &nbsp;|&nbsp; PMBOK Aligned</td></tr>
        <tr><td style={descStyle}>
          <strong style={{ fontStyle: "italic" }}>The Lessons Learned Library Index is the organizational repository that aggregates lessons from all completed projects.</strong> It enables project managers to search past lessons by category, project type, and knowledge area before starting new projects, preventing repeated mistakes and replicating successes.<br /><br />
          Maintain this library as a <strong style={{ fontStyle: "italic" }}>living organizational knowledge base</strong>. Update after every project closure. Aligns with PMBOK Integration Management &#x2014; Manage Project Knowledge &#x2014; Organizational Process Assets.
        </td></tr>
      </tbody>
    </table>
  );

  const renderHeader = () => (
    <div ref={headerRef} style={{ marginBottom: "12px" }}>
      <table style={S.tbl}>
        <tbody>
          <tr><td style={{ ...S.tdLabel, width: "18%" }}>Organization</td><td style={{ ...S.td0, width: "32%" }}>[Organization / PMO Name]</td><td style={{ ...S.tdLabel, width: "18%" }}>Last Updated</td><td style={{ ...S.td0, width: "32%" }}>[MM/DD/YYYY]</td></tr>
          <tr><td style={S.tdLabelAlt}>Library Owner</td><td style={S.tdAlt}>[PMO Director / Knowledge Manager]</td><td style={S.tdLabelAlt}>Total Entries</td><td style={S.tdAlt}>[47] lessons from [8] projects</td></tr>
          <tr><td style={S.tdLabel}>Coverage Period</td><td style={S.td0}>[2023] &#x2014; [2026]</td><td style={S.tdLabel}>Next Review</td><td style={S.td0}>[Quarterly &#x2014; MM/DD/YYYY]</td></tr>
        </tbody>
      </table>
      <CopyButton targetRef={headerRef} label="Copy Section" />
    </div>
  );

  const entries = [
    { id: "LL-CRM-001", project: "[CRM Implementation]", year: "2026", cat: "Stakeholder", cBg: C.badgeBlueBg, cFg: C.badgeBlueFg, type: "&#x1F7E2; Win", tBg: C.badgeGreenBg, tFg: C.badgeGreenFg, lesson: "[User champion network drove 95% adoption vs 80% target]", applicability: "All user-facing projects" },
    { id: "LL-CRM-002", project: "[CRM Implementation]", year: "2026", cat: "Scope", cBg: C.badgeAmberBg, cFg: C.badgeAmberFg, type: "&#x1F7E1; Improve", tBg: C.badgeAmberBg, tFg: C.badgeAmberFg, lesson: "[6 CRs added 17% to schedule &#x2014; initial requirements elicitation insufficient]", applicability: "All projects" },
    { id: "LL-CRM-003", project: "[CRM Implementation]", year: "2026", cat: "Resource", cBg: C.badgeBlueBg, cFg: C.badgeBlueFg, type: "&#x1F534; Avoid", tBg: C.badgeRedBg, tFg: C.badgeRedFg, lesson: "[Dev Lead at 110% &#x2014; burnout materialized, velocity dropped 20%]", applicability: "All projects" },
    { id: "LL-ERP-001", project: "[ERP Upgrade]", year: "2025", cat: "Vendor", cBg: C.badgeAmberBg, cFg: C.badgeAmberFg, type: "&#x1F7E2; Win", tBg: C.badgeGreenBg, tFg: C.badgeGreenFg, lesson: "[Phased vendor engagement with milestone payments kept delivery on track]", applicability: "Vendor-dependent projects" },
    { id: "LL-ERP-002", project: "[ERP Upgrade]", year: "2025", cat: "Testing", cBg: C.badgeGreenBg, cFg: C.badgeGreenFg, type: "&#x1F7E1; Improve", tBg: C.badgeAmberBg, tFg: C.badgeAmberFg, lesson: "[UAT period was too short &#x2014; critical defects found in first week of production]", applicability: "All software projects" },
    { id: "LL-CLOUD-001", project: "[Cloud Migration]", year: "2025", cat: "Technical", cBg: C.badgeBlueBg, cFg: C.badgeBlueFg, type: "&#x1F7E2; Win", tBg: C.badgeGreenBg, tFg: C.badgeGreenFg, lesson: "[Automated testing pipeline caught 85% of defects before QA]", applicability: "All development projects" },
    { id: "LL-CLOUD-002", project: "[Cloud Migration]", year: "2025", cat: "Technical", cBg: C.badgeBlueBg, cFg: C.badgeBlueFg, type: "&#x1F534; Avoid", tBg: C.badgeRedBg, tFg: C.badgeRedFg, lesson: "[Test environment instability caused 2-week cumulative QA delay]", applicability: "All projects" },
    { id: "LL-SEC-001", project: "[Security Compliance]", year: "2024", cat: "Process", cBg: C.badgeGreenBg, cFg: C.badgeGreenFg, type: "&#x1F7E2; Win", tBg: C.badgeGreenBg, tFg: C.badgeGreenFg, lesson: "[Early regulatory engagement prevented rework &#x2014; 3-month time savings]", applicability: "Compliance projects" },
    { id: "LL-MOB-001", project: "[Mobile App v2]", year: "2024", cat: "Scope", cBg: C.badgeAmberBg, cFg: C.badgeAmberFg, type: "&#x1F534; Avoid", tBg: C.badgeRedBg, tFg: C.badgeRedFg, lesson: "[Feature creep from marketing resulted in 40% budget overrun]", applicability: "Product development projects" },
    { id: "LL-DW-001", project: "[Data Warehouse]", year: "2024", cat: "Data", cBg: C.badgeBlueBg, cFg: C.badgeBlueFg, type: "&#x1F7E1; Improve", tBg: C.badgeAmberBg, tFg: C.badgeAmberFg, lesson: "[Data quality assessment should be done BEFORE migration planning, not during]", applicability: "Data/migration projects" },
    { id: "[LL-###-###]", project: "[Add project]", year: "", cat: "&#x2014;", cBg: C.badgeGrayBg, cFg: C.badgeGrayFg, type: "&#x2014;", tBg: C.badgeGrayBg, tFg: C.badgeGrayFg, lesson: "[Add lesson]", applicability: "" },
  ];

  const renderIndex = () => (
    <div ref={indexRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner()}>&#x1F4CB; LIBRARY INDEX</div>
      <CopyButton targetRef={indexRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>ID</th>
          <th style={{ ...S.thPrimary, width: "10%" }}>Project</th>
          <th style={{ ...S.thPrimary, width: "4%" }}>Year</th>
          <th style={{ ...S.thPrimary, width: "7%", textAlign: "center" as const }}>Cat</th>
          <th style={{ ...S.thPrimary, width: "7%", textAlign: "center" as const }}>Type</th>
          <th style={S.thPrimary}>Lesson Summary</th>
          <th style={{ ...S.thPrimary, width: "12%" }}>Applicability</th>
        </tr></thead>
        <tbody>
          {entries.map((e, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (<tr key={i}>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, color: C.secondary, fontSize: "9px" }}>{e.id}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 600 }}>{e.project}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{e.year}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={{ ...S.badge(e.cBg, e.cFg), fontSize: "9px" }}>{e.cat}</span></td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={{ ...S.badge(e.tBg, e.tFg), fontSize: "9px" }}>{e.type}</span></td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{e.lesson}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px" }}>{e.applicability}</td>
            </tr>);
          })}
        </tbody>
      </table>
    </div>
  );

  const renderSearch = () => (
    <div ref={searchRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(C.secondary)}>&#x1F50D; SEARCH &amp; FILTER GUIDE</div>
      <CopyButton targetRef={searchRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thSecondary, width: "18%" }}>Filter Dimension</th>
          <th style={S.thSecondary}>Available Values</th>
        </tr></thead>
        <tbody>
          <tr><td style={{ ...S.tdLabel }}>By Category</td><td style={S.td0}><span style={S.badge(C.badgeBlueBg, C.badgeBlueFg)}>Stakeholder</span> <span style={S.badge(C.badgeAmberBg, C.badgeAmberFg)}>Scope</span> <span style={S.badge(C.badgeBlueBg, C.badgeBlueFg)}>Resource</span> <span style={S.badge(C.badgeAmberBg, C.badgeAmberFg)}>Vendor</span> <span style={S.badge(C.badgeGreenBg, C.badgeGreenFg)}>Testing</span> <span style={S.badge(C.badgeBlueBg, C.badgeBlueFg)}>Technical</span> <span style={S.badge(C.badgeGreenBg, C.badgeGreenFg)}>Process</span> <span style={S.badge(C.badgeBlueBg, C.badgeBlueFg)}>Data</span></td></tr>
          <tr><td style={S.tdLabelAlt}>By Type</td><td style={S.tdAlt}><span style={S.badge(C.badgeGreenBg, C.badgeGreenFg)}>&#x1F7E2; Win</span> <span style={S.badge(C.badgeAmberBg, C.badgeAmberFg)}>&#x1F7E1; Improve</span> <span style={S.badge(C.badgeRedBg, C.badgeRedFg)}>&#x1F534; Avoid</span></td></tr>
          <tr><td style={S.tdLabel}>By Project Type</td><td style={S.td0}>Software Development &#x2022; Infrastructure &#x2022; Data/Migration &#x2022; Compliance &#x2022; Product Development</td></tr>
          <tr><td style={S.tdLabelAlt}>By PMBOK Knowledge Area</td><td style={S.tdAlt}>Integration &#x2022; Scope &#x2022; Schedule &#x2022; Cost &#x2022; Quality &#x2022; Resource &#x2022; Communications &#x2022; Risk &#x2022; Procurement &#x2022; Stakeholder</td></tr>
          <tr><td style={S.tdLabel}>By Year</td><td style={S.td0}>2024 &#x2022; 2025 &#x2022; 2026</td></tr>
        </tbody>
      </table>
      <p style={S.subNote}>Tip: Before starting a new project, search by project type and relevant PMBOK knowledge areas to find applicable lessons.</p>
    </div>
  );

  const renderAnalytics = () => (
    <div ref={analyticsRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner()}>&#x1F4CA; LIBRARY ANALYTICS</div>
      <CopyButton targetRef={analyticsRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={S.thSecondary}>Category</th>
          <th style={{ ...S.thSecondary, width: "8%", textAlign: "center" as const }}>Total</th>
          <th style={{ ...S.thSecondary, width: "8%", textAlign: "center" as const }}>&#x1F7E2; Wins</th>
          <th style={{ ...S.thSecondary, width: "8%", textAlign: "center" as const }}>&#x1F7E1; Improve</th>
          <th style={{ ...S.thSecondary, width: "8%", textAlign: "center" as const }}>&#x1F534; Avoid</th>
          <th style={S.thSecondary}>Top Insight</th>
        </tr></thead>
        <tbody>
          {[
            { cat: "Stakeholder / Adoption", total: "4", wins: "3", improve: "1", avoid: "0", insight: "[Champion networks consistently drive higher adoption rates]" },
            { cat: "Scope / Change Mgmt", total: "8", wins: "1", improve: "4", avoid: "3", insight: "[Requirements elicitation quality is the #1 predictor of scope stability]" },
            { cat: "Resource / People", total: "5", wins: "1", improve: "2", avoid: "2", insight: "[Over-allocation (>90%) is the most common avoidable failure mode]" },
            { cat: "Technical / Quality", total: "10", wins: "5", improve: "3", avoid: "2", insight: "[Automated testing and dedicated test environments prevent most quality issues]" },
            { cat: "Vendor / Procurement", total: "6", wins: "3", improve: "2", avoid: "1", insight: "[Weekly vendor checkpoints and milestone-based payments are most effective]" },
            { cat: "Process / Compliance", total: "4", wins: "3", improve: "1", avoid: "0", insight: "[Early regulatory engagement prevents expensive rework]" },
            { cat: "Data / Migration", total: "5", wins: "1", improve: "3", avoid: "1", insight: "[Data quality assessment must precede migration planning]" },
          ].map((a, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (<tr key={i}>
              <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 600, fontSize: "11px" }}>{a.cat}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700 }}>{a.total}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}>{a.wins}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}>{a.improve}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}>{a.avoid}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{a.insight}</td>
            </tr>);
          })}
          <tr><td style={{ ...S.td0, fontWeight: 800, backgroundColor: C.secondary, color: C.white }}>TOTAL</td><td style={{ ...S.td0, fontWeight: 800, backgroundColor: C.secondary, color: C.white, textAlign: "center" as const }}>42</td><td style={{ ...S.td0, fontWeight: 700, backgroundColor: C.secondary, color: C.white, textAlign: "center" as const }}>17</td><td style={{ ...S.td0, fontWeight: 700, backgroundColor: C.secondary, color: C.white, textAlign: "center" as const }}>16</td><td style={{ ...S.td0, fontWeight: 700, backgroundColor: C.secondary, color: C.white, textAlign: "center" as const }}>9</td><td style={{ ...S.td0, backgroundColor: C.secondary, color: C.white, fontSize: "10px" }}></td></tr>
        </tbody>
      </table>
    </div>
  );

  const renderTop = () => (
    <div ref={topRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(C.secondary)}>&#x1F3AF; TOP 5 MOST-REFERENCED LESSONS</div>
      <CopyButton targetRef={topRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thSecondary, width: "5%", textAlign: "center" as const }}>#</th>
          <th style={S.thSecondary}>Lesson</th>
          <th style={{ ...S.thSecondary, width: "10%", textAlign: "center" as const }}>Referenced</th>
          <th style={{ ...S.thSecondary, width: "12%", textAlign: "center" as const }}>Action Taken?</th>
        </tr></thead>
        <tbody>
          {[
            { lesson: "[Invest more time in requirements elicitation; add scope freeze milestone]", refs: "[6 projects]", action: "&#x2705; PMO Standard", aBg: C.badgeGreenBg, aFg: C.badgeGreenFg },
            { lesson: "[Cap resource allocation at 90%; require cross-training for critical roles]", refs: "[5 projects]", action: "&#x2705; Policy Updated", aBg: C.badgeGreenBg, aFg: C.badgeGreenFg },
            { lesson: "[Provision dedicated test environment before development starts]", refs: "[4 projects]", action: "&#x1F7E1; In Progress", aBg: C.badgeAmberBg, aFg: C.badgeAmberFg },
            { lesson: "[Establish user champion network during planning for user-facing projects]", refs: "[3 projects]", action: "&#x2705; Best Practice", aBg: C.badgeGreenBg, aFg: C.badgeGreenFg },
            { lesson: "[Mandate automated testing framework setup in Sprint 0]", refs: "[3 projects]", action: "&#x1F7E1; Piloting", aBg: C.badgeAmberBg, aFg: C.badgeAmberFg },
          ].map((t, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (<tr key={i}>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, color: C.secondary }}>{i + 1}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{t.lesson}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 600, fontSize: "11px" }}>{t.refs}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(t.aBg, t.aFg)}>{t.action}</span></td>
            </tr>);
          })}
        </tbody>
      </table>
      <p style={S.subNote}>Lessons referenced by 3+ projects are candidates for inclusion in organizational project methodology standards.</p>
    </div>
  );

  const renderFooter = () => (
    <table style={{ ...S.tbl, marginTop: "8px" }}>
      <tbody><tr><td style={{ backgroundColor: C.primary, color: C.footerText, padding: "8px 20px", fontSize: "10px", fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.06em" }}>ExecNoteShop &#x2022; PM Command Center &#x2022; &#xA9; 2026 All Rights Reserved</td></tr></tbody>
    </table>
  );

  const renderFullLayout = () => (
    <>{renderTitleBanner()}{renderHeader()}{renderIndex()}{renderSearch()}
      <table style={LT}><tbody><tr>
        <td style={{ ...LC, width: "55%", paddingRight: "6px" }}>{renderAnalytics()}</td>
        <td style={{ ...LC, width: "45%", paddingLeft: "6px" }}>{renderTop()}</td>
      </tr></tbody></table>
      {renderFooter()}
    </>
  );
  const renderCompactLayout = () => (
    <>{renderTitleBanner()}{renderHeader()}{renderIndex()}{renderFooter()}</>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/20">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold"><Library size={11} /> Library</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/pm-command-center" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-indigo-600 transition-colors"><ArrowLeft size={14} /> Back to PM Command Center</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center"><Library size={20} className="text-indigo-600" /></div>
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900">Lessons Learned Library Index</h2>
              <p className="text-xs font-medium text-indigo-600">PMBOK Integration Management &#x2022; Organizational Process Assets</p>
            </div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Organizational knowledge repository indexing lessons from all completed projects with search guide and analytics. Full Library includes search and analytics; Quick Index shows the library index only.</p>
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

export default function LessonsLearnedLibraryIndexPage() {
  return (<ThemeProvider><LessonsLearnedLibraryIndexContent /></ThemeProvider>);
}
