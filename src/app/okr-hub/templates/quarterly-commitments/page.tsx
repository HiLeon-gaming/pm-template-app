"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, Handshake, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Commitments", desc: "All commitments + dependencies + sign-off + rules", icon: LayoutDashboard },
  { id: "compact", label: "Quick View", desc: "Commitment table only", icon: AlignJustify },
];

function CommitmentsContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullRef = useRef<HTMLDivElement>(null);
  const commitRef = useRef<HTMLDivElement>(null);
  const depRef = useRef<HTMLDivElement>(null);
  const signRef = useRef<HTMLDivElement>(null);
  const rulesRef = useRef<HTMLDivElement>(null);

  const accent = "#D97706";

  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>QUARTERLY COMMITMENTS PAGE</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; OKR &amp; Operating Rhythm Hub &nbsp;|&nbsp; What Each Team Promises to Deliver</td></tr>
    </tbody></table>
  );

  const renderCommit = () => (
    <div ref={commitRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accent)}>TEAM COMMITMENTS — Q[X] [YEAR]</td></tr></tbody></table>
      <CopyButton targetRef={commitRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>A commitment is a promise. Each team states what they will deliver this quarter. This creates accountability and makes it crystal clear who&apos;s doing what.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "10%" }}>Team</th>
          <th style={S.thPrimary}>Commitment (What We Will Deliver)</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Links to KR</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Due By</th>
          <th style={{ ...S.thPrimary, width: "10%" }}>Owner</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Status</th>
        </tr></thead>
        <tbody>
          {[
            { team: "Support", commit: "Hire and onboard 3 new agents. Average wait time below 10 hrs by Week 6.", kr: "KR 1.1", due: "Week 6", owner: "[Tom R.]", s: "On Track", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg },
            { team: "Support", commit: "Complete Intercom migration and go live.", kr: "KR 1.1", due: "Week 8", owner: "[IT Lead]", s: "Planning", sBg: C.badgeBlueBg, sFg: C.badgeBlueFg },
            { team: "Product", commit: "Ship redesigned onboarding flow to 100% of new users.", kr: "KR 1.2", due: "Week 5", owner: "[Lisa P.]", s: "In Progress", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg },
            { team: "CX", commit: "Launch detractor recovery program. Call every detractor within 24 hours.", kr: "KR 1.3", due: "Week 4", owner: "[CX Lead]", s: "Not Started", sBg: C.badgeAmberBg, sFg: C.badgeAmberFg },
            { team: "Marketing", commit: "Launch LinkedIn ads. Deliver 300+ MQLs by Month 2.", kr: "KR 2.1", due: "Month 2", owner: "[Amy K.]", s: "In Progress", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg },
            { team: "Sales", commit: "Close 3 enterprise deals (>$100K each).", kr: "KR 2.2", due: "Week 12", owner: "[Mike D.]", s: "At Risk", sBg: C.badgeRedBg, sFg: C.badgeRedFg },
            { team: "Marketing", commit: "Publish 4 enterprise case studies.", kr: "KR 2.2", due: "Week 6", owner: "[Content]", s: "In Progress", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg },
            { team: "HR", commit: "Fill all 5 critical roles (including VP Engineering).", kr: "KR 3.1", due: "Week 8", owner: "[Recruiter]", s: "On Track", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg },
            { team: "People Ops", commit: "Launch monthly pulse survey. Act on top 3 issues each month.", kr: "KR 3.2", due: "Ongoing", owner: "[PeopleOps]", s: "At Risk", sBg: C.badgeRedBg, sFg: C.badgeRedFg },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 700, color: accent }}>{r.team}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.commit}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "9px", fontWeight: 700, color: "#7C3AED" }}>{r.kr}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "10px", fontWeight: 700 }}>{r.due}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px" }}>{r.owner}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.sBg, r.sFg)}>{r.s}</span></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderDep = () => (
    <div ref={depRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner("#DC2626")}>CROSS-TEAM DEPENDENCIES</td></tr></tbody></table>
      <CopyButton targetRef={depRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>A dependency is when one team&apos;s commitment depends on another team delivering first. Untracked dependencies are the #1 cause of missed deadlines.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "12%" }}>Team Needs</th>
          <th style={S.thPrimary}>What They Need</th>
          <th style={{ ...S.thPrimary, width: "12%" }}>From Team</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Needed By</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Status</th>
        </tr></thead>
        <tbody>
          {[
            { needs: "Support", what: "Intercom migration completed + training materials", from: "IT", by: "Week 5", s: "Planning", sBg: C.badgeBlueBg, sFg: C.badgeBlueFg },
            { needs: "Sales", what: "Enterprise case studies published", from: "Marketing", by: "Week 5", s: "In Progress", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg },
            { needs: "Sales", what: "Pre-approved legal contract template", from: "Legal", by: "Week 3", s: "At Risk", sBg: C.badgeRedBg, sFg: C.badgeRedFg },
            { needs: "Product", what: "Design specs for onboarding flow", from: "Design", by: "Week 2", s: "Done", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg },
            { needs: "HR", what: "Approved job descriptions and comp bands", from: "Finance", by: "Week 1", s: "Done", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 700 }}>{r.needs}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.what}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 700, color: "#DC2626" }}>{r.from}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "10px", fontWeight: 700 }}>{r.by}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.sBg, r.sFg)}>{r.s}</span></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderSignAndRules = () => (
    <div ref={signRef} style={{ marginBottom: "12px" }}>
      <CopyButton targetRef={signRef} label="Copy Section" />
      <table style={LT}><tbody><tr>
        <td style={{ ...LC, width: "60%", paddingRight: "4px" }}>
          <table style={S.tbl}>
            <thead><tr><td style={{ backgroundColor: "#D1FAE5", color: "#059669", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #059669" }}>\u270f\ufe0f TEAM SIGN-OFF</td></tr></thead>
            <tbody>
              {[
                { lead: "[Tom R. — Support]", summary: "3 agents hired, wait time <10 hrs, Intercom live" },
                { lead: "[Lisa P. — Product]", summary: "Onboarding redesign shipped to 100%" },
                { lead: "[Amy K. — Marketing]", summary: "300+ MQLs, 4 case studies, LinkedIn ads running" },
                { lead: "[Mike D. — Sales]", summary: "3 enterprise deals closed (>$100K each)" },
                { lead: "[HR Director]", summary: "5 critical roles filled (incl. VP Eng)" },
                { lead: "[PeopleOps Lead]", summary: "Pulse survey live, top 3 issues addressed monthly" },
              ].map((r, i) => {
                const bg = i % 2 === 1 ? C.rowAlt : C.white;
                return (
                  <tr key={i}>
                    <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", padding: "4px 10px" }}>
                      \u2610 <strong>{r.lead}</strong><br />
                      <span style={{ fontSize: "9px", color: C.textMuted }}>{r.summary}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </td>
        <td style={{ ...LC, width: "40%", paddingLeft: "4px" }}>
          <table style={S.tbl}>
            <thead><tr><td style={{ backgroundColor: "#EDE9FE", color: "#7C3AED", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #7C3AED" }}>\ud83d\udccb COMMITMENT RULES</td></tr></thead>
            <tbody>
              {[
                { color: accent, tip: "A commitment is a promise, not a wish.", detail: "Only commit at 80%+ confidence." },
                { color: "#DC2626", tip: "At risk? Escalate within 48 hours.", detail: "Don’t wait for the monthly review." },
                { color: "#059669", tip: "Review commitments weekly.", detail: "Every Monday: on track? Need help?" },
                { color: "#7C3AED", tip: "Changing requires a conversation.", detail: "Update commitment and notify stakeholders." },
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-amber-50/30">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-amber-600 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-100 text-amber-700 text-xs font-semibold"><Handshake size={11} />Commitments</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/okr-hub" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-amber-600 transition-colors"><ArrowLeft size={14} />Back to OKR Hub</Link>
          <CopyAllButton targetRef={fullRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center"><Handshake size={20} className="text-amber-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">Quarterly Commitments</h2><p className="text-xs font-medium text-amber-600">What Each Team Promises to Deliver</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Each team&apos;s specific deliverables, deadlines, and dependencies. Creates accountability and clarity.</p>
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
          {layout === "full" && <>{renderTitleBanner()}{renderCommit()}{renderDep()}{renderSignAndRules()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderCommit()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullRef} /></div>
      </div>
    </div>
  );
}

export default function QuarterlyCommitmentsPage() { return <ThemeProvider><CommitmentsContent /></ThemeProvider>; }
