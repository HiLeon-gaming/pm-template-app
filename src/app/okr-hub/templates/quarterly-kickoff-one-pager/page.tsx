"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, Rocket, LayoutDashboard, AlignJustify, Zap } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full One-Pager", desc: "Context + OKRs + initiatives + rhythm + rules", icon: LayoutDashboard },
  { id: "compact", label: "Quick Summary", desc: "OKRs + initiatives only", icon: AlignJustify },
];

function KickoffContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullRef = useRef<HTMLDivElement>(null);
  const contextRef = useRef<HTMLDivElement>(null);
  const okrRef = useRef<HTMLDivElement>(null);
  const initRef = useRef<HTMLDivElement>(null);
  const rhythmRef = useRef<HTMLDivElement>(null);
  const rulesRef = useRef<HTMLDivElement>(null);

  const accent = "#D97706";

  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>QUARTERLY KICKOFF ONE-PAGER — Q[X] [YEAR]</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; OKR &amp; Operating Rhythm Hub &nbsp;|&nbsp; &#11088; All-Star &nbsp;|&nbsp; Everything on One Page</td></tr>
    </tbody></table>
  );

  const renderContext = () => (
    <div ref={contextRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(accent)}>QUARTER CONTEXT</div>
      <CopyButton targetRef={contextRef} label="Copy Section" />
      <table style={S.tbl}><tbody>
        <tr><td style={S.tdLabel}>Quarter</td><td style={S.td0}>[Q1 / Q2 / Q3 / Q4] [Year]</td></tr>
        <tr><td style={S.tdLabelAlt}>Date Range</td><td style={S.tdAlt}>[Start Date] — [End Date] &nbsp;&bull;&nbsp; [13 weeks / 10 working weeks after holidays]</td></tr>
        <tr><td style={S.tdLabel}>Theme / Focus</td><td style={{ ...S.td0, fontWeight: 700, color: accent }}>[e.g., &ldquo;Scale the Foundation&rdquo; — build systems to support 2x growth]</td></tr>
        <tr><td style={S.tdLabelAlt}>Last Quarter Score</td><td style={S.tdAlt}>[e.g., 0.52 avg — Amber. We shipped well but missed revenue targets.]</td></tr>
        <tr><td style={S.tdLabel}>Key Constraint</td><td style={S.td0}>[e.g., Budget frozen until Month 2. New hires start Week 3–4.]</td></tr>
      </tbody></table>
    </div>
  );

  const renderOKR = () => (
    <div ref={okrRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner("#7C3AED")}>COMPANY OKRs THIS QUARTER</div>
      <CopyButton targetRef={okrRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "25%" }}>Objective</th>
          <th style={S.thPrimary}>Key Results</th>
          <th style={{ ...S.thPrimary, width: "10%" }}>Owner</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Confidence</th>
        </tr></thead>
        <tbody>
          <tr>
            <td rowSpan={3} style={{ ...S.td0, fontSize: "11px", fontWeight: 800, color: "#7C3AED", verticalAlign: "top" as const }}>OBJ 1: Improve Customer Experience</td>
            <td style={{ ...S.td0, fontSize: "10px" }}>KR 1.1: Reduce support wait time from 18 hrs → 6 hrs</td>
            <td style={{ ...S.td0, fontSize: "9px" }}>[Tom R.]</td>
            <td style={{ ...S.td0, textAlign: "center" as const }}><span style={S.badge(C.badgeGreenBg, C.badgeGreenFg)}>70%</span></td>
          </tr>
          <tr>
            <td style={{ ...S.tdAlt, fontSize: "10px" }}>KR 1.2: Increase CSAT from 4.1 → 4.5</td>
            <td style={{ ...S.tdAlt, fontSize: "9px" }}>[Lisa P.]</td>
            <td style={{ ...S.tdAlt, textAlign: "center" as const }}><span style={S.badge(C.badgeAmberBg, C.badgeAmberFg)}>55%</span></td>
          </tr>
          <tr>
            <td style={{ ...S.td0, fontSize: "10px" }}>KR 1.3: Increase NPS from 35 → 55</td>
            <td style={{ ...S.td0, fontSize: "9px" }}>[CX Lead]</td>
            <td style={{ ...S.td0, textAlign: "center" as const }}><span style={S.badge(C.badgeAmberBg, C.badgeAmberFg)}>45%</span></td>
          </tr>
          <tr>
            <td rowSpan={2} style={{ ...S.tdAlt, fontSize: "11px", fontWeight: 800, color: "#059669", verticalAlign: "top" as const }}>OBJ 2: Grow Revenue Pipeline</td>
            <td style={{ ...S.tdAlt, fontSize: "10px" }}>KR 2.1: Increase MQLs from 200 → 400/mo</td>
            <td style={{ ...S.tdAlt, fontSize: "9px" }}>[Amy K.]</td>
            <td style={{ ...S.tdAlt, textAlign: "center" as const }}><span style={S.badge(C.badgeAmberBg, C.badgeAmberFg)}>50%</span></td>
          </tr>
          <tr>
            <td style={{ ...S.td0, fontSize: "10px" }}>KR 2.2: Close 3 enterprise deals (&gt;$100K each)</td>
            <td style={{ ...S.td0, fontSize: "9px" }}>[Mike D.]</td>
            <td style={{ ...S.td0, textAlign: "center" as const }}><span style={S.badge(C.badgeRedBg, C.badgeRedFg)}>35%</span></td>
          </tr>
          <tr>
            <td rowSpan={2} style={{ ...S.tdAlt, fontSize: "11px", fontWeight: 800, color: accent, verticalAlign: "top" as const }}>OBJ 3: Build World-Class Team</td>
            <td style={{ ...S.tdAlt, fontSize: "10px" }}>KR 3.1: Fill 5 critical roles (incl. VP Eng)</td>
            <td style={{ ...S.tdAlt, fontSize: "9px" }}>[HR Dir.]</td>
            <td style={{ ...S.tdAlt, textAlign: "center" as const }}><span style={S.badge(C.badgeGreenBg, C.badgeGreenFg)}>70%</span></td>
          </tr>
          <tr>
            <td style={{ ...S.td0, fontSize: "10px" }}>KR 3.2: Employee engagement &gt; 85%</td>
            <td style={{ ...S.td0, fontSize: "9px" }}>[PeopleOps]</td>
            <td style={{ ...S.td0, textAlign: "center" as const }}><span style={S.badge(C.badgeRedBg, C.badgeRedFg)}>30%</span></td>
          </tr>
        </tbody>
      </table>
    </div>
  );

  const renderInit = () => (
    <div ref={initRef} style={{ marginBottom: "12px" }}>
      <CopyButton targetRef={initRef} label="Copy Section" />
      <table style={LT}><tbody><tr>
        <td style={{ ...LC, width: "50%", paddingRight: "4px" }}>
          <table style={S.tbl}>
            <thead><tr><td style={{ backgroundColor: "#D1FAE5", color: "#059669", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #059669" }}>✅ KEY INITIATIVES (Doing)</td></tr></thead>
            <tbody>
              {[
                "Hire 3 support agents + onboard by Week 4",
                "Redesign customer onboarding flow",
                "Launch detractor recovery program",
                "Run LinkedIn paid ad campaign",
                "Build enterprise sales playbook + 4 case studies",
                "Recruiter sprint for 5 critical roles",
                "Launch monthly engagement pulse survey",
              ].map((item, i) => {
                const bg = i % 2 === 1 ? C.rowAlt : C.white;
                return (
                  <tr key={i}><td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", padding: "4px 10px" }}>
                    <span style={{ fontWeight: 700, color: "#059669" }}>{i + 1}.</span> {item}
                  </td></tr>
                );
              })}
            </tbody>
          </table>
        </td>
        <td style={{ ...LC, width: "50%", paddingLeft: "4px" }}>
          <table style={S.tbl}>
            <thead><tr><td style={{ backgroundColor: "#FEE2E2", color: "#DC2626", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #DC2626" }}>❌ STOP DOING LIST (Removing)</td></tr></thead>
            <tbody>
              {[
                "Weekly status email → replaced by Dashboard",
                "All-hands prep → simplified to 1-pager",
                "Internal blog redesign → paused until Q3",
                "Low-ROI social media → focus on LinkedIn only",
                "Manual financial report → automated",
                "Bi-weekly retros → monthly",
              ].map((item, i) => {
                const bg = i % 2 === 1 ? C.rowAlt : C.white;
                return (
                  <tr key={i}><td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", padding: "4px 10px" }}>
                    <span style={{ fontWeight: 700, color: "#DC2626" }}>{i + 1}.</span> {item}
                  </td></tr>
                );
              })}
            </tbody>
          </table>
        </td>
      </tr></tbody></table>
    </div>
  );

  const renderRhythm = () => (
    <div ref={rhythmRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner("#0EA5E9")}>OPERATING RHYTHM THIS QUARTER</div>
      <CopyButton targetRef={rhythmRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "15%", textAlign: "center" as const }}>Cadence</th>
          <th style={S.thPrimary}>What Happens</th>
          <th style={{ ...S.thPrimary, width: "15%" }}>Who Attends</th>
          <th style={{ ...S.thPrimary, width: "10%" }}>Day/Time</th>
        </tr></thead>
        <tbody>
          {[
            { cadence: "Weekly", what: "OKR check-in: score KRs, review blockers, update initiatives", who: "Leadership team", day: "Mon 9 AM" },
            { cadence: "Monthly (MBR)", what: "Deep dive on metrics, capacity, risks, Stop Doing review", who: "Leadership + Dept Heads", day: "1st Friday" },
            { cadence: "Quarterly (QBR)", what: "Final scores, lessons learned, next quarter planning", who: "Leadership + Board", day: "Last week of Q" },
            { cadence: "Daily (Optional)", what: "15-min team standups for initiative progress", who: "Individual teams", day: "Various" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, fontSize: "10px", color: "#0EA5E9" }}>{r.cadence}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.what}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px" }}>{r.who}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", fontWeight: 600 }}>{r.day}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderRules = () => (
    <div ref={rulesRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner("#DC2626")}>QUARTER RULES (Non-Negotiable)</div>
      <CopyButton targetRef={rulesRef} label="Copy Section" />
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.td0, padding: "14px 18px", fontSize: "10px", lineHeight: "2.2" }}>
          <strong style={{ color: "#DC2626" }}>1. No new goals mid-quarter.</strong> If something urgent comes up, it replaces an existing initiative — it doesn&apos;t add to the list.<br />
          <strong style={{ color: accent }}>2. Update KR scores every Monday.</strong> If you don&apos;t update, it shows as Red by default. No data = not on track.<br />
          <strong style={{ color: "#7C3AED" }}>3. Escalate blockers within 48 hours.</strong> Don&apos;t wait for the weekly meeting. Slack the team lead immediately.<br />
          <strong style={{ color: "#059669" }}>4. Celebrate wins publicly.</strong> When a KR turns Green, share it in the all-hands channel. Momentum matters.<br />
          <strong style={{ color: "#0EA5E9" }}>5. End-of-quarter retro is mandatory.</strong> We score, learn, and improve. No shortcuts.
        </td></tr>
      </tbody></table>
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-amber-50/30">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-amber-600 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-100 text-amber-700 text-xs font-semibold"><Zap size={11} />All-Star</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/okr-hub" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-amber-600 transition-colors"><ArrowLeft size={14} />Back to OKR Hub</Link>
          <CopyAllButton targetRef={fullRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center"><Rocket size={20} className="text-amber-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">Quarterly Kickoff One-Pager</h2><p className="text-xs font-medium text-amber-600">&#11088; All-Star &mdash; Everything on One Page</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">The single page everyone sees at the start of the quarter. Context, OKRs, initiatives, rhythm, and rules — all in one place.</p>
        </div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">View Mode</p>
          <div className="flex flex-wrap gap-2">
            {LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (
              <button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-amber-600 text-white border-amber-600 shadow-md shadow-amber-200" : "bg-white text-slate-600 border-slate-200 hover:border-amber-300 hover:text-amber-700"}`}>
                <Icon size={15} /><span>{l.label}</span><span className={`text-[10px] font-medium ${isActive ? "text-amber-200" : "text-slate-400"}`}>{l.desc}</span>
              </button>
            ); })}
          </div>
        </div>
        <div ref={fullRef} style={{ fontFamily: S.font }}>
          {layout === "full" && <>{renderTitleBanner()}{renderContext()}{renderOKR()}{renderInit()}{renderRhythm()}{renderRules()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderOKR()}{renderInit()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullRef} /></div>
      </div>
    </div>
  );
}

export default function QuarterlyKickoffOnePagerPage() { return <ThemeProvider><KickoffContent /></ThemeProvider>; }
