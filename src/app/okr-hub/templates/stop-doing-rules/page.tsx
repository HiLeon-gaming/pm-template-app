"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, XCircle, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Guide", desc: "Rules + capacity check + examples + template", icon: LayoutDashboard },
  { id: "compact", label: "Quick Rules", desc: "Core rules + template only", icon: AlignJustify },
];

function StopDoingRulesContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullRef = useRef<HTMLDivElement>(null);
  const whyRef = useRef<HTMLDivElement>(null);
  const rulesRef = useRef<HTMLDivElement>(null);
  const templateRef = useRef<HTMLDivElement>(null);
  const examplesRef = useRef<HTMLDivElement>(null);

  const accent = "#0EA5E9";

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>&ldquo;STOP DOING&rdquo; RULES</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; OKR &amp; Operating Rhythm Hub &nbsp;|&nbsp; Capacity Protection</td></tr>
    </tbody></table>
  );

  const renderWhy = () => (
    <div ref={whyRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner("#DC2626")}>WHY THIS PAGE EXISTS</td></tr></tbody></table>
      <CopyButton targetRef={whyRef} label="Copy Section" />
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.td0, padding: "14px 18px", fontSize: "10px", lineHeight: "2.0" }}>
          <strong style={{ color: "#DC2626" }}>The #1 reason teams fail at OKRs isn&apos;t bad goals. It&apos;s too many priorities.</strong><br /><br />
          Every time you say &ldquo;yes&rdquo; to something new, you&apos;re saying &ldquo;no&rdquo; to something else &mdash; you just might not realize it yet. This page forces the conversation: <strong>if we add something, what do we remove?</strong><br /><br />
          Think of your team like a glass of water. It&apos;s already full. If you pour more in, something spills. This page prevents the spill by making you choose what to take out first.
        </td></tr>
      </tbody></table>
    </div>
  );

  const renderRules = () => (
    <div ref={rulesRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accent)}>THE STOP DOING RULES</td></tr></tbody></table>
      <CopyButton targetRef={rulesRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "5%", textAlign: "center" as const }}>#</th>
          <th style={S.thPrimary}>Rule</th>
          <th style={{ ...S.thPrimary, width: "35%" }}>Why It Matters</th>
        </tr></thead>
        <tbody>
          {[
            { rule: "When you add a new initiative, you MUST identify what gets paused or stopped.", why: "Prevents the slow drowning of your team under too many projects." },
            { rule: "Every quarterly planning session includes a \"Stop Doing\" list before new goals are set.", why: "Clears the deck so new priorities have room to succeed." },
            { rule: "\"Nice to have\" work cannot compete with Key Result work for team time.", why: "Key Results are the #1 priority. Everything else waits." },
            { rule: "Meetings, reports, or processes that don\u2019t serve a current OKR get reviewed for elimination.", why: "Zombie meetings and reports drain time without anyone noticing." },
            { rule: "Any request from outside your team must pass the \"Does this move a Key Result?\" test.", why: "Protects your team from random work that doesn\u2019t align with goals." },
            { rule: "The Stop Doing list is reviewed at every Monthly Business Review.", why: "Things creep back in. Monthly checks keep discipline alive." },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 800, fontSize: "14px", color: "#DC2626" }}>{i + 1}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 600 }}>{r.rule}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", fontStyle: "italic", color: C.textMuted }}>{r.why}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderTemplate = () => (
    <div ref={templateRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner("#059669")}>STOP DOING ASSESSMENT (Use This Template)</td></tr></tbody></table>
      <CopyButton targetRef={templateRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>Before adding ANY new work, fill out this quick assessment. If you can&apos;t answer &ldquo;What will we stop?&rdquo; then you can&apos;t add the new work. It&apos;s that simple.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "25%" }}>Question</th>
          <th style={S.thPrimary}>Your Answer</th>
        </tr></thead>
        <tbody>
          {[
            { q: "What new work is being proposed?", a: "[Describe the new initiative, project, or task]" },
            { q: "Which Key Result does it support?", a: "[Link to a specific KR, or note \"does not link to current OKR\"]" },
            { q: "How many hours per week will it take?", a: "[Estimate: X hours/week for Y weeks]" },
            { q: "Who will do the work?", a: "[Name(s) and their current capacity]" },
            { q: "What will we STOP or PAUSE to make room?", a: "[Specific item being removed or paused]" },
            { q: "Who approves this trade-off?", a: "[Decision owner name]" },
            { q: "When does the new work start?", a: "[Date]" },
            { q: "When will we review if it\u2019s worth continuing?", a: "[Review date \u2014 30 days recommended]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 700, color: "#059669" }}>{r.q}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.a}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderExamples = () => (
    <div ref={examplesRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner("#D97706")}>REAL-WORLD EXAMPLES</td></tr></tbody></table>
      <CopyButton targetRef={examplesRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={S.thPrimary}>New Work Proposed</th>
          <th style={{ ...S.thPrimary, width: "30%" }}>What We Stopped to Make Room</th>
          <th style={{ ...S.thPrimary, width: "20%" }}>Result</th>
        </tr></thead>
        <tbody>
          {[
            { newWork: "\"CEO wants a new monthly investor report.\"", stopped: "Eliminated the weekly internal status email (replaced by Dashboard).", result: "Saved 4 hrs/week, report launched on time." },
            { newWork: "\"Sales wants to attend 3 conferences this quarter.\"", stopped: "Paused the internal sales training program for Q2.", result: "Team had bandwidth for conferences + pipeline grew." },
            { newWork: "\"Product wants to add AI features to the roadmap.\"", stopped: "Deprioritized 2 low-impact feature requests from backlog.", result: "AI feature shipped on schedule. No burnout." },
            { newWork: "\"HR wants to launch a culture survey mid-quarter.\"", stopped: "Delayed the office redesign project by 1 month.", result: "Survey completed with 89% response rate." },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontStyle: "italic" }}>{r.newWork}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.stopped}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", fontWeight: 600, color: "#059669" }}>{r.result}</td>
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
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-50 border border-red-100 text-red-700 text-xs font-semibold"><XCircle size={11} />Stop Doing</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/okr-hub" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-sky-600 transition-colors"><ArrowLeft size={14} />Back to OKR Hub</Link>
          <CopyAllButton targetRef={fullRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center"><XCircle size={20} className="text-red-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">&ldquo;Stop Doing&rdquo; Rules</h2><p className="text-xs font-medium text-red-600">Capacity Protection &mdash; Focus Is a Discipline</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">When we add something, what must be removed? This page creates focus discipline and prevents your team from drowning in too many priorities.</p>
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
          {layout === "full" && <>{renderTitleBanner()}{renderWhy()}{renderRules()}{renderTemplate()}{renderExamples()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderRules()}{renderTemplate()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullRef} /></div>
      </div>
    </div>
  );
}

export default function StopDoingRulesPage() { return <ThemeProvider><StopDoingRulesContent /></ThemeProvider>; }
