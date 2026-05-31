"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, BarChart3, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "quick";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Survey", desc: "Design + questions + analysis", icon: LayoutDashboard },
  { id: "quick", label: "Quick Survey", desc: "Questions only", icon: AlignJustify },
];

function SurveyContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const designRef = useRef<HTMLDivElement>(null);
  const questionsRef = useRef<HTMLDivElement>(null);
  const analysisRef = useRef<HTMLDivElement>(null);
  const distRef = useRef<HTMLDivElement>(null);

  const descStyle: React.CSSProperties = {
    fontFamily: S.font, fontSize: "11px", fontStyle: "italic", color: "#475569",
    padding: "10px 14px", lineHeight: "1.6", borderBottom: `1px solid ${C.border}`,
    backgroundColor: C.white,
  };

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "0px" }}>
      <tbody>
        <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${C.accent}`, textAlign: "center" as const }}>📊 SURVEY / QUESTIONNAIRE TEMPLATE</td></tr>
        <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; Business Analyst Command Center &nbsp;|&nbsp; BABOK Aligned</td></tr>
        <tr><td style={descStyle}>
          <strong style={{ fontStyle: "italic" }}>This template helps you design structured surveys with multiple question types for gathering broad stakeholder input.</strong> It includes Likert scales, multiple-choice, ranking questions, and open-ended prompts, along with a distribution plan and response analysis framework.<br /><br />
          Ideal for <strong style={{ fontStyle: "italic" }}>validating assumptions at scale, gathering user satisfaction data,</strong> or <strong style={{ fontStyle: "italic" }}>prioritizing features across a large user base</strong>. Aligns with BABOK Technique: Survey or Questionnaire.
        </td></tr>
      </tbody>
    </table>
  );

  const renderDateHeader = () => (
    <div ref={headerRef} style={{ marginBottom: "12px" }}>
      <table style={S.tbl}>
        <tbody>
          <tr>
            <td style={{ ...S.tdLabel, width: "14%" }}>Project</td>
            <td style={{ ...S.td0, width: "36%" }}>[Project / Initiative Name]</td>
            <td style={{ ...S.tdLabel, width: "14%" }}>Survey Owner</td>
            <td style={{ ...S.td0, width: "36%" }}>[BA Name]</td>
          </tr>
          <tr>
            <td style={S.tdLabelAlt}>Survey Title</td>
            <td style={S.tdAlt}>[e.g., Q3 Reporting Tool User Satisfaction Survey]</td>
            <td style={S.tdLabelAlt}>Version</td>
            <td style={S.tdAlt}>[1.0 — Draft / Final]</td>
          </tr>
          <tr>
            <td style={S.tdLabel}>Objective</td>
            <td colSpan={3} style={S.td0}>[What do we want to learn? What decisions will the results inform?]</td>
          </tr>
          <tr>
            <td style={S.tdLabelAlt}>Target Audience</td>
            <td style={S.tdAlt}>[e.g., All 150 end-users of the reporting module]</td>
            <td style={S.tdLabelAlt}>Target Responses</td>
            <td style={S.tdAlt}>[e.g., Minimum 60 (40% response rate)]</td>
          </tr>
        </tbody>
      </table>
      <CopyButton targetRef={headerRef} label="Copy Section" />
    </div>
  );

  const renderDesign = () => (
    <div ref={designRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner()}>🔧 SURVEY DESIGN</div>
      <CopyButton targetRef={designRef} label="Copy Section" />
      <table style={S.tbl}>
        <tbody>
          {[
            { q: "Distribution Method", a: "☐ Email ☐ Microsoft Forms ☐ SurveyMonkey ☐ Google Forms ☐ Embedded in app ☐ Other: [___]" },
            { q: "Open Date", a: "[MM/DD/YYYY]" },
            { q: "Close Date", a: "[MM/DD/YYYY] — [___] days open" },
            { q: "Estimated Completion Time", a: "[e.g., 5-7 minutes]" },
            { q: "Anonymous?", a: "☐ Yes ☐ No — if no, explain why responses are tracked" },
            { q: "Reminder Schedule", a: "[e.g., Day 3 first reminder, Day 7 final reminder]" },
            { q: "Incentive / Motivation", a: "[e.g., Results will directly shape the new tool design; summary shared with all respondents]" },
          ].map((row, i) => {
            const isAlt = i % 2 === 1;
            return (
              <tr key={i}>
                <td style={{ ...(isAlt ? S.tdLabelAlt : S.tdLabel), width: "24%" }}>{row.q}</td>
                <td style={isAlt ? S.tdAlt : S.td0}>{row.a}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderQuestions = () => (
    <div ref={questionsRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(C.secondary)}>❓ SURVEY QUESTIONS</td></tr></tbody></table>
      <CopyButton targetRef={questionsRef} label="Copy Section" />

      {/* Section 1: Likert Scale */}
      <table style={{ ...S.tbl, marginBottom: "8px" }}>
        <thead>
          <tr><td colSpan={7} style={{ backgroundColor: "#DBEAFE", color: "#2563EB", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #2563EB" }}>SECTION 1: SATISFACTION (Likert Scale — 1 to 5)</td></tr>
          <tr>
            <th style={{ ...S.thSecondary, width: "5%", textAlign: "center" as const }}>#</th>
            <th style={S.thSecondary}>Statement</th>
            <th style={{ ...S.thSecondary, width: "8%", textAlign: "center" as const }}>1<br /><span style={{ fontSize: "8px", fontWeight: 400 }}>Strongly Disagree</span></th>
            <th style={{ ...S.thSecondary, width: "6%", textAlign: "center" as const }}>2</th>
            <th style={{ ...S.thSecondary, width: "6%", textAlign: "center" as const }}>3</th>
            <th style={{ ...S.thSecondary, width: "6%", textAlign: "center" as const }}>4</th>
            <th style={{ ...S.thSecondary, width: "8%", textAlign: "center" as const }}>5<br /><span style={{ fontSize: "8px", fontWeight: 400 }}>Strongly Agree</span></th>
          </tr>
        </thead>
        <tbody>
          {[
            "The current reporting tool meets my daily needs.",
            "I can find the data I need quickly and easily.",
            "The tool is reliable and rarely experiences errors.",
            "I would recommend the current tool to a colleague.",
            "[Add Likert question]",
          ].map((q, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, color: C.accent }}>{i + 1}</td>
                <td style={{ ...S.td0, backgroundColor: bg }}>{q}</td>
                {[1, 2, 3, 4, 5].map((n) => (
                  <td key={n} style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}>☐</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Section 2: Multiple Choice */}
      <table style={{ ...S.tbl, marginBottom: "8px" }}>
        <thead>
          <tr><td colSpan={2} style={{ backgroundColor: "#D1FAE5", color: "#059669", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #059669" }}>SECTION 2: USAGE PATTERNS (Multiple Choice)</td></tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ ...S.tdLabel, width: "5%", textAlign: "center" as const }}>Q6</td>
            <td style={S.td0}><strong>How often do you use the reporting tool?</strong><br />☐ Daily &nbsp;&nbsp; ☐ 2-3x per week &nbsp;&nbsp; ☐ Weekly &nbsp;&nbsp; ☐ Monthly &nbsp;&nbsp; ☐ Rarely</td>
          </tr>
          <tr>
            <td style={{ ...S.tdLabelAlt, textAlign: "center" as const }}>Q7</td>
            <td style={S.tdAlt}><strong>What is your primary use case?</strong> (Select all that apply)<br />☐ Ad-hoc queries &nbsp;&nbsp; ☐ Scheduled reports &nbsp;&nbsp; ☐ Dashboard monitoring &nbsp;&nbsp; ☐ Data export &nbsp;&nbsp; ☐ Other: [___]</td>
          </tr>
          <tr>
            <td style={{ ...S.tdLabel, textAlign: "center" as const }}>Q8</td>
            <td style={S.td0}><strong>Which feature would improve your experience most?</strong><br />☐ Faster load times &nbsp;&nbsp; ☐ Better filters &nbsp;&nbsp; ☐ Custom dashboards &nbsp;&nbsp; ☐ Mobile access &nbsp;&nbsp; ☐ Export to Excel &nbsp;&nbsp; ☐ Other: [___]</td>
          </tr>
        </tbody>
      </table>

      {/* Section 3: Ranking */}
      <table style={{ ...S.tbl, marginBottom: "8px" }}>
        <thead>
          <tr><td colSpan={3} style={{ backgroundColor: "#EDE9FE", color: "#7C3AED", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #7C3AED" }}>SECTION 3: PRIORITY RANKING</td></tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ ...S.tdLabel, width: "5%", textAlign: "center" as const }}>Q9</td>
            <td colSpan={2} style={S.td0}><strong>Rank the following improvements in order of importance (1 = most important):</strong></td>
          </tr>
          {["Performance / speed improvements", "New visualization types (charts, graphs)", "Self-service report builder", "Real-time data refresh", "Role-based access controls"].map((item, i) => (
            <tr key={i}>
              <td style={{ ...(i % 2 === 0 ? S.td0 : S.tdAlt), width: "5%", textAlign: "center" as const, fontWeight: 700, color: C.accent }}>[___]</td>
              <td colSpan={2} style={i % 2 === 0 ? S.td0 : S.tdAlt}>{item}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Section 4: Open-Ended */}
      <table style={{ ...S.tbl, marginBottom: "8px" }}>
        <thead>
          <tr><td colSpan={2} style={{ backgroundColor: "#FEF3C7", color: "#D97706", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #D97706" }}>SECTION 4: OPEN-ENDED FEEDBACK</td></tr>
        </thead>
        <tbody>
          {[
            { q: "Q10", text: "What is the single biggest frustration with the current tool?" },
            { q: "Q11", text: "If you could design the perfect reporting experience, what would it look like?" },
            { q: "Q12", text: "Any additional comments or suggestions?" },
          ].map((row, i) => (
            <tr key={i}>
              <td style={{ ...(i % 2 === 0 ? S.tdLabel : S.tdLabelAlt), width: "5%", textAlign: "center" as const }}>{row.q}</td>
              <td style={i % 2 === 0 ? S.td0 : S.tdAlt}><strong>{row.text}</strong><br /><span style={{ color: "#94A3B8", fontSize: "11px" }}>[Free text response area]</span></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderAnalysis = () => (
    <div ref={analysisRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner()}>📈 RESPONSE ANALYSIS FRAMEWORK</div>
      <CopyButton targetRef={analysisRef} label="Copy Section" />
      <table style={S.tbl}>
        <tbody>
          {[
            { q: "Total responses received", a: "[___] / [___] target ([___]% response rate)" },
            { q: "Average Likert score (overall)", a: "[___] / 5.0" },
            { q: "Lowest-rated statement", a: "[Q#] — Score: [___] — \"[statement text]\"" },
            { q: "Highest-rated statement", a: "[Q#] — Score: [___] — \"[statement text]\"" },
            { q: "Top feature request (MC)", a: "[Feature] — [___]% of respondents" },
            { q: "#1 ranked priority", a: "[Item] — Average rank: [___]" },
            { q: "Key themes from open-ended", a: "1. [Theme]\n2. [Theme]\n3. [Theme]" },
            { q: "Recommended actions", a: "" },
          ].map((row, i) => {
            const isAlt = i % 2 === 1;
            return (
              <tr key={i}>
                <td style={{ ...(isAlt ? S.tdLabelAlt : S.tdLabel), width: "28%", verticalAlign: "top" as const }}>{row.q}</td>
                <td style={{ ...(isAlt ? S.tdAlt : S.td0), height: "30px" }}>{row.a}&nbsp;</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderDistribution = () => (
    <div ref={distRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(C.secondary)}>📬 DISTRIBUTION TRACKER</td></tr></tbody></table>
      <CopyButton targetRef={distRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead>
          <tr>
            <th style={{ ...S.thSecondary, width: "14%" }}>Action</th>
            <th style={{ ...S.thSecondary, width: "14%", textAlign: "center" as const }}>Date</th>
            <th style={S.thSecondary}>Notes</th>
            <th style={{ ...S.thSecondary, width: "10%", textAlign: "center" as const }}>Status</th>
          </tr>
        </thead>
        <tbody>
          {[
            { action: "Pilot test", date: "[Date]", notes: "[Send to 5 users for feedback on clarity]", stat: "Done", sBg: "#D1FAE5", sFg: "#059669" },
            { action: "Launch survey", date: "[Date]", notes: "[Send to full audience with intro message]", stat: "Planned", sBg: "#FEF3C7", sFg: "#D97706" },
            { action: "Reminder 1", date: "[Date]", notes: "[Friendly nudge + current response rate]", stat: "Planned", sBg: "#FEF3C7", sFg: "#D97706" },
            { action: "Reminder 2", date: "[Date]", notes: "[Final reminder — closes in 48 hrs]", stat: "Planned", sBg: "#FEF3C7", sFg: "#D97706" },
            { action: "Close survey", date: "[Date]", notes: "[Lock responses, begin analysis]", stat: "Planned", sBg: "#FEF3C7", sFg: "#D97706" },
            { action: "Share results", date: "[Date]", notes: "[Summary to stakeholders + full report]", stat: "Planned", sBg: "#FEF3C7", sFg: "#D97706" },
          ].map((row, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 600, fontSize: "11px" }}>{row.action}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "11px" }}>{row.date}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{row.notes}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(row.sBg, row.sFg)}>{row.stat}</span></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderFooter = () => (
    <table style={{ ...S.tbl, marginTop: "8px" }}>
      <tbody><tr><td style={{ backgroundColor: C.primary, color: C.footerText, padding: "8px 20px", fontSize: "10px", fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.06em" }}>ExecNoteShop &nbsp;&bull;&nbsp; Business Analyst Command Center &nbsp;&bull;&nbsp; &copy; 2026 All Rights Reserved</td></tr></tbody>
    </table>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50/20">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-semibold"><BarChart3 size={11} /> Survey</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/ba-command-center" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-emerald-600 transition-colors"><ArrowLeft size={14} /> Back to BA Command Center</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center"><BarChart3 size={20} className="text-emerald-600" /></div>
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900">Survey / Questionnaire Template</h2>
              <p className="text-xs font-medium text-emerald-600">Likert &bull; Multiple Choice &bull; Ranking &bull; Open-Ended</p>
            </div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Design structured surveys with Likert scales, multiple-choice, ranking, and open-ended questions. Full Survey includes design parameters and analysis framework; Quick Survey is the questions only.</p>
        </div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Layout</p>
          <div className="flex flex-wrap gap-2">
            {LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (
              <button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-200" : "bg-white text-slate-600 border-slate-200 hover:border-emerald-300 hover:text-emerald-700"}`}>
                <Icon size={15} /> <span>{l.label}</span> <span className={`text-[10px] font-medium ${isActive ? "text-emerald-200" : "text-slate-400"}`}>{l.desc}</span>
              </button>
            ); })}
          </div>
        </div>
        <div ref={fullPageRef} style={{ fontFamily: S.font }}>
          {layout === "full" && <>{renderTitleBanner()}{renderDateHeader()}{renderDesign()}{renderQuestions()}{renderAnalysis()}{renderDistribution()}{renderFooter()}</>}
          {layout === "quick" && <>{renderTitleBanner()}{renderDateHeader()}{renderQuestions()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function SurveyQuestionnairePage() {
  return (<ThemeProvider><SurveyContent /></ThemeProvider>);
}
