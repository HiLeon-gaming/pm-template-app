"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, ClipboardCheck, LayoutDashboard, AlignJustify, Zap } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full DoR", desc: "Checklist + examples", icon: LayoutDashboard },
  { id: "compact", label: "Checklist Only", desc: "Quick reference", icon: AlignJustify },
];

function DefinitionOfReadyContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const checklistRef = useRef<HTMLDivElement>(null);
  const examplesRef = useRef<HTMLDivElement>(null);
  const reviewRef = useRef<HTMLDivElement>(null);

  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };
  const accent = "#EF4444"; const accentDark = "#B91C1C";

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>🚦 DEFINITION OF READY (DoR)</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; Agile / Scrum Delivery Command Center &nbsp;|&nbsp; ⭐ All-Star &nbsp;|&nbsp; Backlog System</td></tr>
    </tbody></table>
  );

  const renderHeader = () => (
    <div ref={headerRef} style={{ marginBottom: "12px" }}>
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "18%" }}>Team</td><td style={{ ...S.td0, width: "32%" }}>[Team Name]</td><td style={{ ...S.tdLabel, width: "18%" }}>Last Reviewed</td><td style={{ ...S.td0, width: "32%" }}>[MM/DD/YYYY]</td></tr>
        <tr><td style={S.tdLabelAlt}>Agreed By</td><td style={S.tdAlt}>[PO + SM + Dev Team]</td><td style={S.tdLabelAlt}>Review Cadence</td><td style={S.tdAlt}>[Every 3 sprints or after major quality issues]</td></tr>
      </tbody></table>
      <CopyButton targetRef={headerRef} label="Copy Section" />
    </div>
  );

  const renderChecklist = () => (
    <div ref={checklistRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accent)}>✅ DoR CHECKLIST — Story Must Pass ALL Before Entering Sprint</td></tr></tbody></table>
      <CopyButton targetRef={checklistRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "5%", textAlign: "center" as const }}>☐</th>
          <th style={{ ...S.thPrimary, width: "5%", textAlign: "center" as const }}>#</th>
          <th style={{ ...S.thPrimary, width: "22%" }}>Category</th>
          <th style={S.thPrimary}>Criteria</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Required</th>
        </tr></thead>
        <tbody>
          {[
            { cat: "Story Format", crit: "User story follows \u201CAs a / I want / So that\u201D format", req: "Yes", rBg: C.badgeRedBg, rFg: C.badgeRedFg },
            { cat: "Story Format", crit: "Story is small enough to complete in one sprint (ideally 1\u20135 points)", req: "Yes", rBg: C.badgeRedBg, rFg: C.badgeRedFg },
            { cat: "Acceptance Criteria", crit: "At least 2 acceptance criteria written in Given/When/Then format", req: "Yes", rBg: C.badgeRedBg, rFg: C.badgeRedFg },
            { cat: "Acceptance Criteria", crit: "Edge cases and error scenarios identified", req: "Yes", rBg: C.badgeRedBg, rFg: C.badgeRedFg },
            { cat: "Design / UX", crit: "Mockups or wireframes attached (if UI story)", req: "If UI", rBg: C.badgeAmberBg, rFg: C.badgeAmberFg },
            { cat: "Design / UX", crit: "UX review completed and approved by designer", req: "If UI", rBg: C.badgeAmberBg, rFg: C.badgeAmberFg },
            { cat: "Dependencies", crit: "All dependencies identified and unblocked (or mitigation in place)", req: "Yes", rBg: C.badgeRedBg, rFg: C.badgeRedFg },
            { cat: "Technical", crit: "API contracts / data model agreed with backend team", req: "If API", rBg: C.badgeAmberBg, rFg: C.badgeAmberFg },
            { cat: "Technical", crit: "No open technical questions — spike completed if needed", req: "Yes", rBg: C.badgeRedBg, rFg: C.badgeRedFg },
            { cat: "Estimation", crit: "Story estimated by the team (story points assigned)", req: "Yes", rBg: C.badgeRedBg, rFg: C.badgeRedFg },
            { cat: "Priority", crit: "Priority set by PO (MoSCoW or rank)", req: "Yes", rBg: C.badgeRedBg, rFg: C.badgeRedFg },
            { cat: "Team Understanding", crit: "Discussed in refinement — team understands what \u201Cdone\u201D looks like", req: "Yes", rBg: C.badgeRedBg, rFg: C.badgeRedFg },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "15px" }}>☐</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, color: C.textMuted }}>{i + 1}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px", fontWeight: 600, color: accent }}>{r.cat}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{r.crit}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.rBg, r.rFg)}>{r.req}</span></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderExamples = () => (
    <div ref={examplesRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accentDark)}>📖 READY vs. NOT READY — EXAMPLES</td></tr></tbody></table>
      <CopyButton targetRef={examplesRef} label="Copy Section" />
      <table style={LT}><tbody><tr>
        <td style={{ ...LC, width: "50%", paddingRight: "5px" }}>
          <table style={S.tbl}>
            <thead><tr><td style={{ backgroundColor: "#059669", color: C.white, padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}` }}>✅ READY (Can enter sprint)</td></tr></thead>
            <tbody>
              {["\u201CAs a shopper, I want 2-step checkout so I can buy faster\u201D — 3 ACs, mockup attached, estimated at 5 pts, no blockers",
                "API contract agreed with backend team, spike completed for payment flow",
                "Discussed in refinement, team asks answered, PO priority = Must Have"].map((t, i) => (
                <tr key={i}><td style={{ ...S.td0, backgroundColor: i % 2 === 0 ? C.white : C.rowAlt, fontSize: "10px", padding: "5px 12px" }}>• {t}</td></tr>
              ))}
            </tbody>
          </table>
        </td>
        <td style={{ ...LC, width: "50%", paddingLeft: "5px" }}>
          <table style={S.tbl}>
            <thead><tr><td style={{ backgroundColor: "#DC2626", color: C.white, padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}` }}>🚫 NOT READY (Send back to refinement)</td></tr></thead>
            <tbody>
              {["\u201CMake checkout better\u201D — no user story format, no ACs, no estimate",
                "Depends on vendor API that hasn\u2019t been delivered yet — blocker unresolved",
                "Team hasn\u2019t seen this story before — pulled in last minute without discussion"].map((t, i) => (
                <tr key={i}><td style={{ ...S.td0, backgroundColor: i % 2 === 0 ? C.white : C.rowAlt, fontSize: "10px", padding: "5px 12px" }}>• {t}</td></tr>
              ))}
            </tbody>
          </table>
        </td>
      </tr></tbody></table>
    </div>
  );

  const renderReview = () => (
    <div ref={reviewRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accent)}>🔍 DoR HEALTH CHECK</td></tr></tbody></table>
      <CopyButton targetRef={reviewRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={S.thSecondary}>Question</th>
          <th style={{ ...S.thSecondary, width: "10%", textAlign: "center" as const }}>Yes/No</th>
          <th style={{ ...S.thSecondary, width: "35%" }}>Notes</th>
        </tr></thead>
        <tbody>
          {[
            "Did any stories enter this sprint that weren\u2019t fully ready?",
            "Did unready stories cause rework, blockers, or scope changes?",
            "Does the team feel the DoR criteria are realistic and useful?",
            "Should we add or remove any criteria based on recent experience?",
          ].map((q, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{q}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "14px" }}>☐ Y &nbsp;☐ N</td>
                <td style={{ ...S.td0, backgroundColor: bg }}>&nbsp;</td>
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
        ExecNoteShop &nbsp;&bull;&nbsp; Agile / Scrum Delivery Command Center &nbsp;&bull;&nbsp; &copy; 2026 All Rights Reserved
      </td>
    </tr></tbody></table>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-red-50/30">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-red-600 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-100 text-amber-700 text-xs font-semibold"><Zap size={11} />⭐ All-Star</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/agile-command-center" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-red-600 transition-colors"><ArrowLeft size={14} />Back to Agile Command Center</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center"><ClipboardCheck size={20} className="text-red-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">Definition of Ready (DoR)</h2><p className="text-xs font-medium text-red-600">⭐ All-Star &mdash; Prevents Sprint Chaos</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Checklist of what must be true before a story enters a sprint. With examples of ready vs. not ready and a health check.</p>
        </div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">View Mode</p>
          <div className="flex flex-wrap gap-2">
            {LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (
              <button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-red-600 text-white border-red-600 shadow-md shadow-red-200" : "bg-white text-slate-600 border-slate-200 hover:border-red-300 hover:text-red-700"}`}>
                <Icon size={15} /><span>{l.label}</span><span className={`text-[10px] font-medium ${isActive ? "text-red-200" : "text-slate-400"}`}>{l.desc}</span>
              </button>
            ); })}
          </div>
        </div>
        <div ref={fullPageRef} style={{ fontFamily: S.font }}>
          {layout === "full" && <>{renderTitleBanner()}{renderHeader()}{renderChecklist()}{renderExamples()}{renderReview()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderHeader()}{renderChecklist()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function DefinitionOfReadyPage() { return <ThemeProvider><DefinitionOfReadyContent /></ThemeProvider>; }
