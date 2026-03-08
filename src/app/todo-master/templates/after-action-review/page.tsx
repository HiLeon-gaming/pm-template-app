"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, SearchCheck, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "quick";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full AAR", desc: "Complete debrief", icon: LayoutDashboard },
  { id: "quick", label: "Quick AAR", desc: "5-minute version", icon: AlignJustify },
];

function AARContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const intendedRef = useRef<HTMLDivElement>(null);
  const actualRef = useRef<HTMLDivElement>(null);
  const whyRef = useRef<HTMLDivElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);
  const lessonsRef = useRef<HTMLDivElement>(null);

  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}>
      <tbody>
        <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${C.accent}`, textAlign: "center" as const }}>🔍 AFTER ACTION REVIEW (AAR)</td></tr>
        <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; The To-Do Master Template Package &nbsp;|&nbsp; What Happened, Why, and What&apos;s Next</td></tr>
      </tbody>
    </table>
  );

  const renderDateHeader = () => (
    <div ref={headerRef} style={{ marginBottom: "12px" }}>
      <table style={S.tbl}>
        <tbody>
          <tr>
            <td style={{ ...S.tdLabel, width: "16%" }}>Event / Activity</td>
            <td style={{ ...S.td0, width: "34%" }}>[What are we reviewing? Be specific.]</td>
            <td style={{ ...S.tdLabel, width: "14%" }}>Review Date</td>
            <td style={{ ...S.td0, width: "36%" }}>[MM/DD/YYYY]</td>
          </tr>
          <tr>
            <td style={S.tdLabelAlt}>Event Date(s)</td>
            <td style={S.tdAlt}>[When did the event happen?]</td>
            <td style={S.tdLabelAlt}>Facilitator</td>
            <td style={S.tdAlt}>[Name]</td>
          </tr>
          <tr>
            <td style={S.tdLabel}>Participants</td>
            <td colSpan={3} style={S.td0}>[Who was involved? List all relevant people.]</td>
          </tr>
          <tr>
            <td style={S.tdLabelAlt}>Event Type</td>
            <td colSpan={3} style={S.tdAlt}>☐ Project ☐ Sprint ☐ Presentation ☐ Launch ☐ Meeting ☐ Crisis ☐ Initiative ☐ Other: [___]</td>
          </tr>
        </tbody>
      </table>
      <CopyButton targetRef={headerRef} label="Copy Section" />
    </div>
  );

  const renderIntended = () => (
    <div ref={intendedRef} style={{ marginBottom: "12px" }}>
      <table style={S.tbl}>
        <thead>
          <tr>
            <td colSpan={2} style={{
              backgroundColor: "#DBEAFE", color: "#2563EB",
              padding: "10px 14px", fontFamily: S.font, fontSize: "15px",
              fontWeight: 800, borderBottom: "3px solid #2563EB",
              border: `1.5px solid ${C.border}`,
            }}>
              📋 WHAT WAS SUPPOSED TO HAPPEN?
            </td>
          </tr>
        </thead>
        <tbody>
          {[
            { label: "Objective / Goal", value: "[What were we trying to achieve?]" },
            { label: "Expected Outcome", value: "[What did success look like?]" },
            { label: "Plan / Approach", value: "[How were we going to do it?]" },
            { label: "Key Metrics", value: "[What numbers were we targeting?]" },
            { label: "Timeline", value: "[What was the expected timeline?]" },
          ].map((row, i) => {
            const isAlt = i % 2 === 1;
            return (
              <tr key={i}>
                <td style={{ ...(isAlt ? S.tdLabelAlt : S.tdLabel), width: "22%", verticalAlign: "top" as const }}>{row.label}</td>
                <td style={{ ...(isAlt ? S.tdAlt : S.td0), height: "36px" }}>{row.value}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <CopyButton targetRef={intendedRef} label="Copy Section" />
    </div>
  );

  const renderActual = () => (
    <div ref={actualRef} style={{ marginBottom: "12px" }}>
      <table style={S.tbl}>
        <thead>
          <tr>
            <td colSpan={2} style={{
              backgroundColor: "#FEF3C7", color: "#D97706",
              padding: "10px 14px", fontFamily: S.font, fontSize: "15px",
              fontWeight: 800, borderBottom: "3px solid #D97706",
              border: `1.5px solid ${C.border}`,
            }}>
              📊 WHAT ACTUALLY HAPPENED?
            </td>
          </tr>
        </thead>
        <tbody>
          {[
            { label: "Actual Outcome", value: "[What was the real result?]" },
            { label: "Actual Metrics", value: "[What numbers did we actually hit?]" },
            { label: "Actual Timeline", value: "[How long did it really take?]" },
            { label: "Unexpected Events", value: "[What surprised us?]" },
            { label: "Overall Assessment", value: "☐ Exceeded ☐ Met ☐ Partially Met ☐ Missed" },
          ].map((row, i) => {
            const isAlt = i % 2 === 1;
            return (
              <tr key={i}>
                <td style={{ ...(isAlt ? S.tdLabelAlt : S.tdLabel), width: "22%", verticalAlign: "top" as const }}>{row.label}</td>
                <td style={{ ...(isAlt ? S.tdAlt : S.td0), height: "36px" }}>{row.value}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <CopyButton targetRef={actualRef} label="Copy Section" />
    </div>
  );

  const renderWhy = () => (
    <div ref={whyRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner()}>🔎 WHY WAS THERE A DIFFERENCE?</div>
      <CopyButton targetRef={whyRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead>
          <tr>
            <th style={S.thPrimary}>Gap / Difference</th>
            <th style={{ ...S.thPrimary, width: "30%" }}>Root Cause (5 Whys)</th>
            <th style={{ ...S.thPrimary, width: "14%", textAlign: "center" as const }}>Impact</th>
          </tr>
        </thead>
        <tbody>
          {[
            { gap: "[e.g., Delivered 2 weeks late — Sprint 2 took twice as long as planned]", root: "[Underestimated API complexity; no spike/prototype done upfront]", impact: "High", impBg: "#FEE2E2", impFg: "#DC2626" },
            { gap: "[e.g., Customer satisfaction was 3.8 vs target of 4.5]", root: "[Skipped user testing in Sprint 1; UI was confusing for new users]", impact: "High", impBg: "#FEE2E2", impFg: "#DC2626" },
            { gap: "[e.g., Came in $10K under budget]", root: "[Contractor wasn't needed — team handled it internally (positive gap)]", impact: "Low", impBg: "#D1FAE5", impFg: "#059669" },
            { gap: "[Add gap]", root: "", impact: "—", impBg: "#F3F4F6", impFg: "#6B7280" },
            { gap: "[Add gap]", root: "", impact: "—", impBg: "#F3F4F6", impFg: "#6B7280" },
          ].map((row, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg }}>{row.gap}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "12px" }}>{row.root}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(row.impBg, row.impFg)}>{row.impact}</span></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderActions = () => (
    <div ref={actionsRef} style={{ marginBottom: "12px" }}>
      <table style={S.tbl}>
        <thead>
          <tr>
            <td colSpan={5} style={{
              backgroundColor: "#D1FAE5", color: "#059669",
              padding: "10px 14px", fontFamily: S.font, fontSize: "15px",
              fontWeight: 800, borderBottom: "3px solid #059669",
              border: `1.5px solid ${C.border}`,
            }}>
              🎯 WHAT WILL WE DO DIFFERENTLY NEXT TIME?
            </td>
          </tr>
          <tr>
            <th style={{ ...S.thSecondary, width: "5%", textAlign: "center" as const }}>#</th>
            <th style={S.thSecondary}>Action / Change</th>
            <th style={{ ...S.thSecondary, width: "10%", textAlign: "center" as const }}>Type</th>
            <th style={{ ...S.thSecondary, width: "14%" }}>Owner</th>
            <th style={{ ...S.thSecondary, width: "12%", textAlign: "center" as const }}>Due</th>
          </tr>
        </thead>
        <tbody>
          {[
            { action: "[e.g., Always run a technical spike before estimating complex features]", type: "Process", typeBg: "#DBEAFE", typeFg: "#2563EB", owner: "[Tech Lead]", due: "Immediate" },
            { action: "[e.g., Add user testing gate to every sprint — no ship without 3 user tests]", type: "Quality", typeBg: "#D1FAE5", typeFg: "#059669", owner: "[PM]", due: "[Date]" },
            { action: "[e.g., Create estimation checklist that includes dependencies & risks]", type: "Process", typeBg: "#DBEAFE", typeFg: "#2563EB", owner: "[PM]", due: "[Date]" },
            { action: "[e.g., Keep the internal capability model — save contractor budget for real gaps]", type: "Sustain", typeBg: "#FEF3C7", typeFg: "#D97706", owner: "[Eng Manager]", due: "Ongoing" },
            { action: "[Add action]", type: "—", typeBg: "#F3F4F6", typeFg: "#6B7280", owner: "", due: "" },
            { action: "[Add action]", type: "—", typeBg: "#F3F4F6", typeFg: "#6B7280", owner: "", due: "" },
          ].map((row, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 800, color: "#059669" }}>{i + 1}</td>
                <td style={{ ...S.td0, backgroundColor: bg }}>{row.action}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(row.typeBg, row.typeFg)}>{row.type}</span></td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{row.owner}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "11px" }}>{row.due}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <CopyButton targetRef={actionsRef} label="Copy Section" />
    </div>
  );

  const renderLessons = () => (
    <div ref={lessonsRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(C.secondary)}>📚 KEY LESSONS LEARNED</div>
      <CopyButton targetRef={lessonsRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead>
          <tr>
            <th style={{ ...S.thSecondary, width: "5%", textAlign: "center" as const }}>#</th>
            <th style={S.thSecondary}>Lesson</th>
            <th style={{ ...S.thSecondary, width: "14%", textAlign: "center" as const }}>Category</th>
          </tr>
        </thead>
        <tbody>
          {[
            { lesson: "[e.g., Prototyping before estimating saves 2-3x rework later]", cat: "Planning", catBg: "#DBEAFE", catFg: "#2563EB" },
            { lesson: "[e.g., User testing isn't optional — it's the cheapest way to find problems]", cat: "Quality", catBg: "#D1FAE5", catFg: "#059669" },
            { lesson: "[e.g., Our team can handle more than we give them credit for — trust them]", cat: "Team", catBg: "#EDE9FE", catFg: "#7C3AED" },
            { lesson: "[Add lesson]", cat: "—", catBg: "#F3F4F6", catFg: "#6B7280" },
            { lesson: "[Add lesson]", cat: "—", catBg: "#F3F4F6", catFg: "#6B7280" },
          ].map((row, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, color: C.accent }}>{i + 1}</td>
                <td style={{ ...S.td0, backgroundColor: bg }}>{row.lesson}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(row.catBg, row.catFg)}>{row.cat}</span></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderFooter = () => (
    <table style={{ ...S.tbl, marginTop: "8px" }}>
      <tbody><tr><td style={{ backgroundColor: C.primary, color: C.footerText, padding: "8px 20px", fontSize: "10px", fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.06em" }}>ExecNoteShop &nbsp;&bull;&nbsp; The To-Do Master Template Package &nbsp;&bull;&nbsp; &copy; 2026 All Rights Reserved</td></tr></tbody>
    </table>
  );

  const renderFullLayout = () => (
    <>
      {renderTitleBanner()}{renderDateHeader()}
      <table style={LT}><tbody><tr>
        <td style={{ ...LC, width: "50%", paddingRight: "8px" }}>{renderIntended()}</td>
        <td style={{ ...LC, width: "50%", paddingLeft: "8px" }}>{renderActual()}</td>
      </tr></tbody></table>
      {renderWhy()}{renderActions()}{renderLessons()}{renderFooter()}
    </>
  );

  const renderQuickLayout = () => (
    <>{renderTitleBanner()}{renderDateHeader()}{renderIntended()}{renderActual()}{renderActions()}{renderFooter()}</>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50/20">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-semibold"><SearchCheck size={11} /> AAR</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/todo-master" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-emerald-600 transition-colors"><ArrowLeft size={14} /> Back to To-Do Master</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center"><SearchCheck size={20} className="text-emerald-600" /></div>
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900">After Action Review (AAR)</h2>
              <p className="text-xs font-medium text-emerald-600">What Happened, Why, and What&apos;s Next &mdash; Military-Grade Debrief</p>
            </div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Structured debrief: what was supposed to happen vs. what actually happened, root cause analysis, corrective actions, and lessons learned. Full AAR is comprehensive; Quick AAR is a focused 5-minute version.</p>
        </div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Review Depth</p>
          <div className="flex flex-wrap gap-2">
            {LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (
              <button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-200" : "bg-white text-slate-600 border-slate-200 hover:border-emerald-300 hover:text-emerald-700"}`}>
                <Icon size={15} /> <span>{l.label}</span> <span className={`text-[10px] font-medium ${isActive ? "text-emerald-200" : "text-slate-400"}`}>{l.desc}</span>
              </button>
            ); })}
          </div>
        </div>
        <div ref={fullPageRef} style={{ fontFamily: S.font }}>
          {layout === "full" && renderFullLayout()}
          {layout === "quick" && renderQuickLayout()}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function AfterActionReviewPage() {
  return (<ThemeProvider><AARContent /></ThemeProvider>);
}
