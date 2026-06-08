"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, Mic, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "quick";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Guide", desc: "Questions + notes + findings", icon: LayoutDashboard },
  { id: "quick", label: "Quick Guide", desc: "Questions + notes only", icon: AlignJustify },
];

function InterviewGuideContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const questionsRef = useRef<HTMLDivElement>(null);
  const notesRef = useRef<HTMLDivElement>(null);
  const findingsRef = useRef<HTMLDivElement>(null);
  const followRef = useRef<HTMLDivElement>(null);

  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };

  const descStyle: React.CSSProperties = {
    fontFamily: S.font, fontSize: "11px", fontStyle: "italic", color: "#475569",
    padding: "10px 14px", lineHeight: "1.6", borderBottom: `1px solid ${C.border}`,
    backgroundColor: C.white,
  };

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "0px" }}>
      <tbody>
        <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${C.accent}`, textAlign: "center" as const }}>🎤 INTERVIEW GUIDE</td></tr>
        <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; Business Analyst Command Center &nbsp;|&nbsp; BABOK Aligned</td></tr>
        <tr><td style={descStyle}>
          <strong style={{ fontStyle: "italic" }}>This template provides a structured framework for conducting stakeholder and SME interviews.</strong> It includes pre-prepared open and closed questions, probing follow-ups, space for real-time notes, and a post-interview findings summary.<br /><br />
          Ideal for <strong style={{ fontStyle: "italic" }}>requirements discovery, process deep-dives,</strong> or <strong style={{ fontStyle: "italic" }}>validation sessions with subject matter experts</strong>. Aligns with BABOK Technique: Interviews.
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
            <td style={{ ...S.tdLabel, width: "14%" }}>Interview Date</td>
            <td style={{ ...S.td0, width: "36%" }}>[MM/DD/YYYY — HH:MM]</td>
          </tr>
          <tr>
            <td style={S.tdLabelAlt}>Interviewer (BA)</td>
            <td style={S.tdAlt}>[Your Name]</td>
            <td style={S.tdLabelAlt}>Duration</td>
            <td style={S.tdAlt}>[e.g., 45 min / 60 min]</td>
          </tr>
          <tr>
            <td style={S.tdLabel}>Interviewee</td>
            <td style={S.td0}>[Name, Title / Role]</td>
            <td style={S.tdLabel}>Department</td>
            <td style={S.td0}>[Organization / Team]</td>
          </tr>
          <tr>
            <td style={S.tdLabelAlt}>Interview Objective</td>
            <td colSpan={3} style={S.tdAlt}>[What specific information do we need from this person? What decisions will this inform?]</td>
          </tr>
          <tr>
            <td style={S.tdLabel}>Context for Interviewee</td>
            <td colSpan={3} style={S.td0}>[Brief background shared with interviewee before meeting — project overview, why their input matters]</td>
          </tr>
        </tbody>
      </table>
      <CopyButton targetRef={headerRef} label="Copy Section" />
    </div>
  );

  const QUESTIONS = [
    { cat: "Opening / Context", catBg: "#DBEAFE", catFg: "#2563EB", items: [
      { q: "[e.g., Can you walk me through your role and how you interact with the current system?]", type: "Open", tBg: "#D1FAE5", tFg: "#059669" },
      { q: "[e.g., How long have you been in this role?]", type: "Closed", tBg: "#FEF3C7", tFg: "#D97706" },
    ]},
    { cat: "Current State / Pain Points", catBg: "#FEE2E2", catFg: "#DC2626", items: [
      { q: "[e.g., What are the biggest challenges you face with the current process?]", type: "Open", tBg: "#D1FAE5", tFg: "#059669" },
      { q: "[e.g., How much time per week do you spend on manual workarounds?]", type: "Closed", tBg: "#FEF3C7", tFg: "#D97706" },
      { q: "[Probe: Can you give me a specific example of when this broke down?]", type: "Probe", tBg: "#EDE9FE", tFg: "#7C3AED" },
    ]},
    { cat: "Requirements / Needs", catBg: "#D1FAE5", catFg: "#059669", items: [
      { q: "[e.g., If you could change one thing about the current system, what would it be?]", type: "Open", tBg: "#D1FAE5", tFg: "#059669" },
      { q: "[e.g., What information do you need that you don't currently have access to?]", type: "Open", tBg: "#D1FAE5", tFg: "#059669" },
      { q: "[e.g., Do you need this data in real-time or is batch/daily sufficient?]", type: "Closed", tBg: "#FEF3C7", tFg: "#D97706" },
    ]},
    { cat: "Future State / Vision", catBg: "#EDE9FE", catFg: "#7C3AED", items: [
      { q: "[e.g., What does success look like for you when this project is complete?]", type: "Open", tBg: "#D1FAE5", tFg: "#059669" },
      { q: "[Probe: How would you measure that success?]", type: "Probe", tBg: "#EDE9FE", tFg: "#7C3AED" },
    ]},
    { cat: "Closing", catBg: "#F3F4F6", catFg: "#6B7280", items: [
      { q: "[e.g., Is there anything else I should know that I haven't asked about?]", type: "Open", tBg: "#D1FAE5", tFg: "#059669" },
      { q: "[e.g., Who else should I talk to about this topic?]", type: "Open", tBg: "#D1FAE5", tFg: "#059669" },
    ]},
  ];

  const renderQuestions = () => (
    <div ref={questionsRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner()}>❓ INTERVIEW QUESTIONS</td></tr></tbody></table>
      <CopyButton targetRef={questionsRef} label="Copy Section" />
      {QUESTIONS.map((cat, ci) => (
        <table key={ci} style={{ ...S.tbl, marginBottom: "6px" }}>
          <thead>
            <tr><td colSpan={3} style={{ backgroundColor: cat.catBg, color: cat.catFg, padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: `3px solid ${cat.catFg}` }}>{cat.cat}</td></tr>
          </thead>
          <tbody>
            {cat.items.map((item, qi) => {
              const bg = qi % 2 === 1 ? C.rowAlt : C.white;
              return (
                <tr key={qi}>
                  <td style={{ ...S.td0, backgroundColor: bg, width: "5%", textAlign: "center" as const, fontWeight: 700, color: C.accent, fontSize: "11px" }}>Q{qi + 1}</td>
                  <td style={{ ...S.td0, backgroundColor: bg }}>{item.q}</td>
                  <td style={{ ...S.td0, backgroundColor: bg, width: "8%", textAlign: "center" as const }}><span style={S.badge(item.tBg, item.tFg)}>{item.type}</span></td>
                </tr>
              );
            })}
            <tr>
              <td style={{ ...S.tdAlt, fontSize: "10px", color: "#6B7280", fontStyle: "italic" as const }} colSpan={3}>Notes: &nbsp;</td>
            </tr>
          </tbody>
        </table>
      ))}
    </div>
  );

  const renderNotes = () => (
    <div ref={notesRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(C.secondary)}>📝 RAW INTERVIEW NOTES</td></tr></tbody></table>
      <CopyButton targetRef={notesRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead>
          <tr>
            <th style={{ ...S.thSecondary, width: "12%" }}>Time</th>
            <th style={S.thSecondary}>Notes / Quotes</th>
            <th style={{ ...S.thSecondary, width: "10%", textAlign: "center" as const }}>Tag</th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 10 }).map((_, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{i === 0 ? "[HH:MM]" : ""}</td>
                <td style={{ ...S.td0, backgroundColor: bg, height: "26px" }}>{i === 0 ? "[e.g., \"We spend 2 hours every morning reconciling data between systems\" — direct quote]" : ""}&nbsp;</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "9px", color: "#6B7280" }}>☐Req ☐Pain ☐Idea</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderFindings = () => (
    <div ref={findingsRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner()}>🔍 KEY FINDINGS &amp; TAKEAWAYS</td></tr></tbody></table>
      <CopyButton targetRef={findingsRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead>
          <tr>
            <th style={{ ...S.thPrimary, width: "5%", textAlign: "center" as const }}>#</th>
            <th style={S.thPrimary}>Finding</th>
            <th style={{ ...S.thPrimary, width: "12%", textAlign: "center" as const }}>Category</th>
            <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Priority</th>
          </tr>
        </thead>
        <tbody>
          {[
            { finding: "[e.g., Manual reconciliation takes 2+ hrs/day — automation is the #1 pain point]", cat: "Pain Point", cBg: "#FEE2E2", cFg: "#DC2626", pri: "High", pBg: "#FEE2E2", pFg: "#DC2626" },
            { finding: "[e.g., Need real-time inventory visibility across all warehouses]", cat: "Requirement", cBg: "#DBEAFE", cFg: "#2563EB", pri: "High", pBg: "#FEE2E2", pFg: "#DC2626" },
            { finding: "[e.g., Current approval workflow has 5 steps — could be reduced to 3]", cat: "Opportunity", cBg: "#D1FAE5", cFg: "#059669", pri: "Med", pBg: "#FEF3C7", pFg: "#D97706" },
            { finding: "[Add finding]", cat: "—", cBg: "#F3F4F6", cFg: "#6B7280", pri: "—", pBg: "#F3F4F6", pFg: "#6B7280" },
            { finding: "[Add finding]", cat: "—", cBg: "#F3F4F6", cFg: "#6B7280", pri: "—", pBg: "#F3F4F6", pFg: "#6B7280" },
          ].map((row, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, color: C.accent }}>{i + 1}</td>
                <td style={{ ...S.td0, backgroundColor: bg }}>{row.finding}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(row.cBg, row.cFg)}>{row.cat}</span></td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(row.pBg, row.pFg)}>{row.pri}</span></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderFollowUp = () => (
    <div ref={followRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(C.secondary)}>🔄 FOLLOW-UP ACTIONS</td></tr></tbody></table>
      <CopyButton targetRef={followRef} label="Copy Section" />
      <table style={S.tbl}>
        <tbody>
          {[
            { q: "Send summary to interviewee for validation?", a: "☐ Yes ☐ No — By: [Date]" },
            { q: "Additional interviews needed?", a: "☐ Yes — Who: [___] ☐ No" },
            { q: "Requirements to document", a: "[List req IDs to create from this interview]" },
            { q: "Open questions remaining", a: "" },
            { q: "Conflicts with other stakeholder input", a: "" },
          ].map((row, i) => {
            const isAlt = i % 2 === 1;
            return (
              <tr key={i}>
                <td style={{ ...(isAlt ? S.tdLabelAlt : S.tdLabel), width: "32%", verticalAlign: "top" as const }}>{row.q}</td>
                <td style={{ ...(isAlt ? S.tdAlt : S.td0), height: "30px" }}>{row.a}&nbsp;</td>
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-cyan-50/20">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-cyan-50 border border-cyan-100 text-cyan-700 text-xs font-semibold"><Mic size={11} /> Interview</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/ba-command-center" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-cyan-600 transition-colors"><ArrowLeft size={14} /> Back to BA Command Center</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-cyan-100 flex items-center justify-center"><Mic size={20} className="text-cyan-600" /></div>
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900">Interview Guide Template</h2>
              <p className="text-xs font-medium text-cyan-600">Questions &bull; Notes &bull; Findings &bull; Follow-up</p>
            </div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Structured interview framework with categorized questions (open, closed, probing), real-time notes, key findings with priority, and follow-up actions. Full Guide includes findings analysis; Quick Guide is note-taking focused.</p>
        </div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Layout</p>
          <div className="flex flex-wrap gap-2">
            {LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (
              <button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-cyan-600 text-white border-cyan-600 shadow-md shadow-cyan-200" : "bg-white text-slate-600 border-slate-200 hover:border-cyan-300 hover:text-cyan-700"}`}>
                <Icon size={15} /> <span>{l.label}</span> <span className={`text-[10px] font-medium ${isActive ? "text-cyan-200" : "text-slate-400"}`}>{l.desc}</span>
              </button>
            ); })}
          </div>
        </div>
        <div ref={fullPageRef} style={{ fontFamily: S.font }}>
          {layout === "full" && <>{renderTitleBanner()}{renderDateHeader()}{renderQuestions()}<table style={LT}><tbody><tr><td style={{ ...LC, width: "55%", paddingRight: "8px" }}>{renderNotes()}</td><td style={{ ...LC, width: "45%", paddingLeft: "8px" }}>{renderFindings()}</td></tr></tbody></table>{renderFollowUp()}{renderFooter()}</>}
          {layout === "quick" && <>{renderTitleBanner()}{renderDateHeader()}{renderQuestions()}{renderNotes()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function InterviewGuidePage() {
  return (<ThemeProvider><InterviewGuideContent /></ThemeProvider>);
}
