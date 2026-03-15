"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, Target, LayoutDashboard, AlignJustify, Zap } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Dashboard", desc: "Goals + priorities + metrics + decisions + risks + reviews", icon: LayoutDashboard },
  { id: "compact", label: "Quick Pulse", desc: "This week's priorities + key metrics only", icon: AlignJustify },
];

function DashboardContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullRef = useRef<HTMLDivElement>(null);
  const goalsRef = useRef<HTMLDivElement>(null);
  const prioritiesRef = useRef<HTMLDivElement>(null);
  const metricsRef = useRef<HTMLDivElement>(null);
  const decisionsRef = useRef<HTMLDivElement>(null);
  const risksRef = useRef<HTMLDivElement>(null);
  const cadenceRef = useRef<HTMLDivElement>(null);

  const accent = "#0EA5E9";

  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>OPERATING RHYTHM DASHBOARD</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; OKR &amp; Operating Rhythm Hub &nbsp;|&nbsp; &#11088; All-Star &nbsp;|&nbsp; Your Home Base</td></tr>
    </tbody></table>
  );

  const renderGoals = () => (
    <div ref={goalsRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(accent)}>THIS QUARTER&apos;S OBJECTIVES &amp; KEY RESULTS (OKRs)</div>
      <CopyButton targetRef={goalsRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>What are we trying to achieve this quarter? Each objective has measurable key results so we know if we&apos;re winning.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "25%" }}>Objective (What We Want)</th>
          <th style={S.thPrimary}>Key Result (How We Measure It)</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Baseline</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Target</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Current</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Score</th>
          <th style={{ ...S.thPrimary, width: "6%", textAlign: "center" as const }}>Status</th>
        </tr></thead>
        <tbody>
          {[
            { obj: "Improve customer experience", kr: "Reduce average support wait time", base: "18 hrs", target: "6 hrs", current: "10 hrs", score: "0.67", s: "On Track", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg },
            { obj: "", kr: "Increase customer satisfaction rating", base: "4.1", target: "4.5", current: "4.3", score: "0.50", s: "On Track", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg },
            { obj: "Grow revenue pipeline", kr: "Increase qualified leads per month", base: "200", target: "400", current: "280", score: "0.40", s: "At Risk", sBg: C.badgeAmberBg, sFg: C.badgeAmberFg },
            { obj: "", kr: "Close 3 enterprise deals (>$100K each)", base: "0", target: "3", current: "1", score: "0.33", s: "At Risk", sBg: C.badgeAmberBg, sFg: C.badgeAmberFg },
            { obj: "Build a world-class team", kr: "Fill 5 open critical roles", base: "0", target: "5", current: "4", score: "0.80", s: "Ahead", sBg: C.badgeBlueBg, sFg: C.badgeBlueFg },
            { obj: "", kr: "Achieve >85% employee engagement score", base: "72%", target: "85%", current: "68%", score: "0.00", s: "Off Track", sBg: C.badgeRedBg, sFg: C.badgeRedFg },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: r.obj ? 700 : 400, color: r.obj ? accent : C.textBody }}>{r.obj}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.kr}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "10px" }}>{r.base}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "10px", fontWeight: 700 }}>{r.target}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "10px", fontWeight: 700, color: accent }}>{r.current}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "10px", fontWeight: 700 }}>{r.score}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.sBg, r.sFg)}>{r.s}</span></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderPriorities = () => (
    <div ref={prioritiesRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner("#059669")}>THIS WEEK&apos;S TOP 3 PRIORITIES</div>
      <CopyButton targetRef={prioritiesRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>If nothing else gets done this week, these 3 things MUST happen. Keep it simple. Keep it focused.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "5%", textAlign: "center" as const }}>#</th>
          <th style={S.thPrimary}>Priority (What Must Get Done)</th>
          <th style={{ ...S.thPrimary, width: "12%" }}>Owner</th>
          <th style={{ ...S.thPrimary, width: "12%" }}>Linked OKR</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Due</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Status</th>
        </tr></thead>
        <tbody>
          {[
            { pri: "[Launch the new customer onboarding email sequence]", owner: "[Sarah M.]", okr: "Customer Exp.", due: "Fri 3/21", s: "In Progress", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg },
            { pri: "[Send proposal to Enterprise Client #2]", owner: "[James T.]", okr: "Revenue Pipeline", due: "Wed 3/19", s: "Not Started", sBg: C.badgeAmberBg, sFg: C.badgeAmberFg },
            { pri: "[Complete final-round interview for VP Engineering]", owner: "[HR + CEO]", okr: "World-Class Team", due: "Thu 3/20", s: "Scheduled", sBg: C.badgeBlueBg, sFg: C.badgeBlueFg },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 800, fontSize: "16px", color: "#059669" }}>{i + 1}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 600 }}>{r.pri}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px" }}>{r.owner}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", color: accent, fontWeight: 600 }}>{r.okr}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "10px", fontWeight: 700 }}>{r.due}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.sBg, r.sFg)}>{r.s}</span></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderMetrics = () => (
    <div ref={metricsRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner("#D97706")}>KEY METRICS THIS WEEK (KPIs)</div>
      <CopyButton targetRef={metricsRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>A KPI (Key Performance Indicator) is a number that tells you if things are going well or not. Green = good, Red = needs attention.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={S.thPrimary}>Metric Name</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Target</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>This Week</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Last Week</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Trend</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Health</th>
        </tr></thead>
        <tbody>
          {[
            { name: "[Support ticket response time]", target: "6 hrs", thisW: "10 hrs", lastW: "12 hrs", trend: "Improving", tBg: C.badgeGreenBg, tFg: C.badgeGreenFg, health: "Amber", hBg: C.badgeAmberBg, hFg: C.badgeAmberFg },
            { name: "[New qualified leads]", target: "100/wk", thisW: "72", lastW: "68", trend: "Improving", tBg: C.badgeGreenBg, tFg: C.badgeGreenFg, health: "Amber", hBg: C.badgeAmberBg, hFg: C.badgeAmberFg },
            { name: "[Customer satisfaction (CSAT)]", target: "4.5", thisW: "4.3", lastW: "4.2", trend: "Improving", tBg: C.badgeGreenBg, tFg: C.badgeGreenFg, health: "Green", hBg: C.badgeGreenBg, hFg: C.badgeGreenFg },
            { name: "[Open critical roles filled]", target: "5", thisW: "4", lastW: "3", trend: "Improving", tBg: C.badgeGreenBg, tFg: C.badgeGreenFg, health: "Green", hBg: C.badgeGreenBg, hFg: C.badgeGreenFg },
            { name: "[Employee engagement pulse]", target: "85%", thisW: "68%", lastW: "70%", trend: "Declining", tBg: C.badgeRedBg, tFg: C.badgeRedFg, health: "Red", hBg: C.badgeRedBg, hFg: C.badgeRedFg },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 600 }}>{r.name}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "10px" }}>{r.target}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "10px", fontWeight: 700, color: "#D97706" }}>{r.thisW}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "10px" }}>{r.lastW}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.tBg, r.tFg)}>{r.trend}</span></td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.hBg, r.hFg)}>{r.health}</span></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderDecisionsAndRisks = () => (
    <div ref={decisionsRef} style={{ marginBottom: "12px" }}>
      <CopyButton targetRef={decisionsRef} label="Copy Section" />
      <table style={LT}><tbody><tr>
        <td style={{ ...LC, width: "50%", paddingRight: "4px" }}>
          <table style={S.tbl}>
            <thead><tr><td style={{ backgroundColor: "#EDE9FE", color: "#7C3AED", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #7C3AED" }}>📌 OPEN DECISIONS NEEDED</td></tr></thead>
            <tbody>
              {[
                { dec: "[Approve budget increase for paid advertising campaign ($25K)]", who: "[CMO + CFO]", deadline: "03/19", urg: "High", uBg: C.badgeRedBg, uFg: C.badgeRedFg },
                { dec: "[Choose between Vendor A or Vendor B for CRM migration]", who: "[CTO]", deadline: "03/22", urg: "Med", uBg: C.badgeAmberBg, uFg: C.badgeAmberFg },
                { dec: "[Decide whether to pause Project X to protect focus]", who: "[CEO]", deadline: "03/20", urg: "High", uBg: C.badgeRedBg, uFg: C.badgeRedFg },
              ].map((r, i) => {
                const bg = i % 2 === 1 ? C.rowAlt : C.white;
                return (
                  <tr key={i}>
                    <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", padding: "6px 10px" }}>
                      <span style={{ fontWeight: 600 }}>{r.dec}</span><br />
                      <span style={{ fontSize: "9px", color: C.textMuted }}>Owner: {r.who} &nbsp;|&nbsp; By: <span style={{ fontWeight: 700, color: "#7C3AED" }}>{r.deadline}</span> &nbsp;|&nbsp; <span style={S.badge(r.uBg, r.uFg)}>{r.urg}</span></span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </td>
        <td style={{ ...LC, width: "50%", paddingLeft: "4px" }}>
          <table style={S.tbl}>
            <thead><tr><td style={{ backgroundColor: "#FEE2E2", color: "#DC2626", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #DC2626" }}>⚠️ TOP RISKS &amp; BLOCKERS</td></tr></thead>
            <tbody>
              {[
                { type: "Risk", tBg: C.badgeAmberBg, tFg: C.badgeAmberFg, desc: "[Key sales rep may resign — retention convo needed ASAP]", owner: "[VP Sales]", mit: "[Schedule 1:1 by Wed]" },
                { type: "Blocker", tBg: C.badgeRedBg, tFg: C.badgeRedFg, desc: "[Legal review delaying Enterprise Client #2 proposal by 5 days]", owner: "[Legal]", mit: "[Escalate to GC today]" },
                { type: "Risk", tBg: C.badgeAmberBg, tFg: C.badgeAmberFg, desc: "[Engineering team morale dropping — burnout signals]", owner: "[VP Eng]", mit: "[Cancel non-critical meetings]" },
              ].map((r, i) => {
                const bg = i % 2 === 1 ? C.rowAlt : C.white;
                return (
                  <tr key={i}>
                    <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", padding: "6px 10px" }}>
                      <span style={S.badge(r.tBg, r.tFg)}>{r.type}</span> <span style={{ fontWeight: 600 }}>{r.desc}</span><br />
                      <span style={{ fontSize: "9px", color: C.textMuted }}>Owner: {r.owner} &nbsp;|&nbsp; Next: <span style={{ fontWeight: 600 }}>{r.mit}</span></span>
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

  const renderCadence = () => (
    <div ref={cadenceRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner("#0D9488")}>UPCOMING REVIEWS &amp; RHYTHM</div>
      <CopyButton targetRef={cadenceRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>Your operating rhythm keeps everyone aligned. These are your scheduled check-ins — never miss them.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "10%" }}>Cadence</th>
          <th style={S.thPrimary}>Review / Meeting</th>
          <th style={{ ...S.thPrimary, width: "12%", textAlign: "center" as const }}>Next Date</th>
          <th style={{ ...S.thPrimary, width: "12%" }}>Owner</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Status</th>
        </tr></thead>
        <tbody>
          {[
            { cad: "Weekly", meeting: "[Team Priorities + Metrics Review]", date: "Mon 3/17", owner: "[Team Lead]", s: "Recurring", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg },
            { cad: "Weekly", meeting: "[1:1 with direct reports (blockers + coaching)]", date: "Tue-Wed", owner: "[Manager]", s: "Recurring", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg },
            { cad: "Monthly", meeting: "[Monthly Business Review (MBR)]", date: "04/01", owner: "[Dept Head]", s: "Scheduled", sBg: C.badgeBlueBg, sFg: C.badgeBlueFg },
            { cad: "Quarterly", meeting: "[Quarterly Business Review (QBR)]", date: "04/15", owner: "[CEO]", s: "Planning", sBg: C.badgeAmberBg, sFg: C.badgeAmberFg },
            { cad: "Quarterly", meeting: "[OKR Scoring + Next Quarter Goal Setting]", date: "04/15", owner: "[Leadership]", s: "Planning", sBg: C.badgeAmberBg, sFg: C.badgeAmberFg },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 700, fontSize: "10px", color: "#0D9488" }}>{r.cad}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 600 }}>{r.meeting}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "10px", fontWeight: 700 }}>{r.date}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px" }}>{r.owner}</td>
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
        ExecNoteShop &bull; OKR &amp; Operating Rhythm Hub &bull; &copy; 2026 All Rights Reserved
      </td>
    </tr></tbody></table>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-sky-50/30">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-sky-600 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-100 text-amber-700 text-xs font-semibold"><Zap size={11} />All-Star</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/okr-hub" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-sky-600 transition-colors"><ArrowLeft size={14} />Back to OKR Hub</Link>
          <CopyAllButton targetRef={fullRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-sky-100 flex items-center justify-center"><Target size={20} className="text-sky-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">Operating Rhythm Dashboard</h2><p className="text-xs font-medium text-sky-600">&#11088; All-Star &mdash; Your Home Base</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">One page showing everything that matters right now: this quarter&apos;s goals, this week&apos;s priorities, key metrics, open decisions, risks, and your review schedule. Open this page every Monday morning.</p>
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
        <div ref={fullRef} style={{ fontFamily: S.font }}>
          {layout === "full" && <>{renderTitleBanner()}{renderGoals()}{renderPriorities()}{renderMetrics()}{renderDecisionsAndRisks()}{renderCadence()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderPriorities()}{renderMetrics()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullRef} /></div>
      </div>
    </div>
  );
}

export default function OperatingRhythmDashboardPage() { return <ThemeProvider><DashboardContent /></ThemeProvider>; }
