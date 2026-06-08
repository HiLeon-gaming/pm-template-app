"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, Compass, BookOpen } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

function ReadThisFirstContent() {
  const { colors: C, styles: S } = useTheme();
  const fullPageRef = useRef<HTMLDivElement>(null);
  const whatRef = useRef<HTMLDivElement>(null);
  const twoWaysRef = useRef<HTMLDivElement>(null);
  const bothRef = useRef<HTMLDivElement>(null);
  const standaloneRef = useRef<HTMLDivElement>(null);
  const routineRef = useRef<HTMLDivElement>(null);
  const indexRef = useRef<HTMLDivElement>(null);
  const allStarRef = useRef<HTMLDivElement>(null);

  const descStyle: React.CSSProperties = {
    fontFamily: S.font, fontSize: "11px", fontStyle: "italic", color: "#475569",
    padding: "10px 14px", lineHeight: "1.6", borderBottom: `1px solid ${C.border}`, backgroundColor: C.white,
  };
  const prose: React.CSSProperties = {
    fontFamily: S.font, fontSize: "12px", color: "#334155", padding: "12px 14px",
    lineHeight: "1.8", backgroundColor: C.white, border: `1px solid ${C.border}`, borderTop: "none",
  };
  const li: React.CSSProperties = { marginBottom: "4px" };
  const bold: React.CSSProperties = { fontWeight: 700 };
  const teal: React.CSSProperties = { color: "#0D9488", fontWeight: 700 };
  const ital: React.CSSProperties = { fontStyle: "italic", color: "#64748B" };

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "0px" }}>
      <tbody>
        <tr><td style={{ backgroundColor: "#0D9488", color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: "4px solid #F59E0B", textAlign: "center" as const }}>📖 READ THIS FIRST — PMBOK 7 ALIGNMENT PACK</td></tr>
        <tr><td style={{ backgroundColor: "#115E59", color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; PMBOK® 7 Alignment Pack &nbsp;|&nbsp; Simple Guide</td></tr>
        <tr><td style={descStyle}>
          <strong style={{ fontStyle: "italic" }}>Everything you need to know to get started with this pack in under 5 minutes.</strong> Read this page once, then jump into the templates. You can always come back here for reference.
        </td></tr>
      </tbody>
    </table>
  );

  const renderWhat = () => (
    <div ref={whatRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner()}>📦 WHAT THIS PACK IS (IN PLAIN ENGLISH)</td></tr></tbody></table>
      <CopyButton targetRef={whatRef} label="Copy Section" />
      <div style={prose}>
        <p style={{ marginBottom: "10px" }}><strong style={teal}>This is an add-on pack.</strong></p>
        <p style={{ marginBottom: "10px" }}>Think of your project like a car:</p>
        <ul style={{ paddingLeft: "20px", marginBottom: "10px" }}>
          <li style={li}>🚗 <strong>The Project Management Command Center</strong> is the <strong>engine + steering wheel</strong> (it has the core project documents: scope, schedule, risks, status, change control, etc.).</li>
          <li style={li}>📊 <strong>This PMBOK 7 Alignment Pack</strong> is the <strong>dashboard + warning lights + GPS</strong> (it helps you keep the project healthy, prove alignment, and adjust when things change).</li>
        </ul>
        <p style={{ marginBottom: "10px" }}>This pack is built around <strong>PMBOK® 7’s</strong>:</p>
        <ul style={{ paddingLeft: "20px", marginBottom: "10px" }}>
          <li style={li}><strong style={teal}>8 Performance Domains</strong> = “How healthy is the project?”</li>
          <li style={li}><strong style={teal}>12 Principles</strong> = “How should we act and make decisions?”</li>
        </ul>
        <p style={{ marginBottom: "6px" }}><strong>It helps you:</strong></p>
        <ul style={{ paddingLeft: "20px" }}>
          <li style={li}>✅ Choose the right way to run the project</li>
          <li style={li}>✅ Tailor (use the right amount of process for THIS project)</li>
          <li style={li}>✅ Measure real success</li>
          <li style={li}>✅ Manage uncertainty</li>
          <li style={li}>✅ Show leadership / PMO clear proof you’re running it well</li>
        </ul>
      </div>
    </div>
  );

  const renderTwoWays = () => (
    <div ref={twoWaysRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner("#115E59")}>🔄 TWO WAYS TO USE THIS PACK</td></tr></tbody></table>
      <CopyButton targetRef={twoWaysRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "50%", backgroundColor: "#0D9488" }}>⭐ Option A (Best): Use WITH the Command Center</th>
          <th style={{ ...S.thPrimary, width: "50%", backgroundColor: "#115E59" }}>Option B: Use STANDALONE</th>
        </tr></thead>
        <tbody>
          <tr>
            <td style={{ ...S.td0, verticalAlign: "top" as const, lineHeight: "1.7" }}>
              <strong>This is what it was designed for.</strong><br /><br />
              <strong style={teal}>Use the Command Center for:</strong><br />
              • Planning documents (scope, schedule, budget, procurement)<br />
              • Tracking (issues, actions, decisions, change control)<br />
              • Reporting (status reports, dashboards)<br /><br />
              <strong style={teal}>Use this PMBOK 7 pack for:</strong><br />
              • Weekly project “health checks”<br />
              • Tailoring decisions and updates<br />
              • Measurement strategy + outcome proof<br />
              • Uncertainty / complexity playbooks<br />
              • Principle-based alignment proof (PMO / exec-ready)
            </td>
            <td style={{ ...S.td0, verticalAlign: "top" as const, lineHeight: "1.7" }}>
              You can run a project with this pack, <strong>but you must also track the basics somewhere</strong>, like:<br /><br />
              • <strong>Tasks</strong> (MS Planner, Excel, Jira, Asana, Trello)<br />
              • <strong>Issues + action items</strong> (OneNote, Excel, or your tool)<br />
              • <strong>Decisions</strong> (simple OneNote table works fine)<br /><br />
              This pack will still help you run the project smarter because it gives you:<br />
              • A clear approach<br />
              • Weekly health checks<br />
              • Better measurement<br />
              • Better handling of change and uncertainty<br /><br />
              <span style={ital}>If you want an “all-in-one” system inside OneNote, the Command Center is the better core toolkit.</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );

  const renderBoth = () => (
    <div ref={bothRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner()}>🤝 IF YOU OWN BOTH PACKS (Command Center + PMBOK 7 Alignment Pack)</td></tr></tbody></table>
      <CopyButton targetRef={bothRef} label="Copy Section" />
      <div style={prose}>
        <p style={{ marginBottom: "10px" }}><strong style={teal}>The easiest setup — two clean options:</strong></p>
        <table style={{ ...S.tbl, marginBottom: "12px" }}>
          <thead><tr>
            <th style={{ ...S.thSecondary, width: "50%" }}>⭐ Setup Option 1 (Recommended)</th>
            <th style={{ ...S.thSecondary, width: "50%" }}>Setup Option 2</th>
          </tr></thead>
          <tbody><tr>
            <td style={{ ...S.td0, verticalAlign: "top" as const, lineHeight: "1.7" }}>
              <strong>Add this as a new section group inside your Command Center notebook.</strong><br />
              Create a section group called:<br />
              <span style={{ ...teal, fontSize: "13px" }}>“PMBOK 7 Alignment (Add-On)”</span><br />
              Then paste/import these pages inside it.
            </td>
            <td style={{ ...S.td0, verticalAlign: "top" as const, lineHeight: "1.7" }}>
              <strong>Keep as a separate notebook.</strong><br />
              Keep this as its own notebook, but pin it next to your Command Center and use both together.
            </td>
          </tr></tbody>
        </table>
        <p style={{ marginBottom: "10px" }}><strong style={teal}>How they fit together (simple map):</strong></p>
        <p style={{ marginBottom: "4px" }}>• Use the <strong>Command Center</strong> for “doing the work.”</p>
        <p style={{ marginBottom: "10px" }}>• Use the <strong>PMBOK 7 pack</strong> for “keeping the work healthy.”</p>
        <table style={S.tbl}>
          <thead><tr><th style={S.thSecondary}>Step</th><th style={S.thSecondary}>Pages to Use</th></tr></thead>
          <tbody>
            <tr><td style={{ ...S.tdLabel, lineHeight: "1.7" }}>🎯 Pick how you’ll run the project</td><td style={{ ...S.td0, lineHeight: "1.7" }}>(5) Delivery Approach Selector • (4) Tailoring Strategy Worksheet • (7) Governance Map</td></tr>
            <tr><td style={{ ...S.tdLabelAlt, lineHeight: "1.7" }}>📏 Make sure you’re measuring the right success</td><td style={{ ...S.tdAlt, lineHeight: "1.7" }}>(31) Measurement Strategy Blueprint • (32) Outcome & Benefits Evidence Planner</td></tr>
            <tr><td style={{ ...S.tdLabel, lineHeight: "1.7" }}>📋 Run weekly health checks</td><td style={{ ...S.td0, lineHeight: "1.7" }}>(10–17) The 8 Domain Health Checks • (1) Alignment Dashboard (update weekly)</td></tr>
            <tr><td style={{ ...S.tdLabelAlt, lineHeight: "1.7" }}>🔄 Handle changes + uncertainty</td><td style={{ ...S.tdAlt, lineHeight: "1.7" }}>(34) Uncertainty Playbook • (35) Assumption Stress Test • (36) Contingency Triggers • (37) Decision Latency Tracker</td></tr>
            <tr><td style={{ ...S.tdLabel, lineHeight: "1.7" }}>✅ Prove alignment + improve over time</td><td style={{ ...S.td0, lineHeight: "1.7" }}>(18–30) Principles-to-Practice pages • (38–39) Monthly Retro + Lessons • (40–41) Alignment Summary + PMO/Audit</td></tr>
          </tbody>
        </table>
        <p style={{ marginTop: "12px", marginBottom: "6px" }}><strong style={teal}>“Start here” checklist (if you own both) — do these 6 pages first:</strong></p>
        <ol style={{ paddingLeft: "20px" }}>
          <li style={li}>(1) PMBOK 7 Alignment Dashboard</li>
          <li style={li}>(3) Artifact-to-Domain Mapping Matrix</li>
          <li style={li}>(5) Delivery Approach Selector</li>
          <li style={li}>(4) Tailoring Strategy Worksheet</li>
          <li style={li}>(31) Measurement Strategy Blueprint</li>
          <li style={li}>(34) Uncertainty/Complexity Assessment + Playbook</li>
        </ol>
        <p style={{ ...ital, marginTop: "8px" }}>That’s the fastest way to get aligned, get measurable, and prevent surprises.</p>
      </div>
    </div>
  );

  const renderStandalone = () => (
    <div ref={standaloneRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner("#115E59")}>📦 IF YOU ONLY BOUGHT THIS PACK (Standalone Use)</td></tr></tbody></table>
      <CopyButton targetRef={standaloneRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thSecondary, width: "50%" }}>✅ What This Pack DOES Give You</th>
          <th style={{ ...S.thSecondary, width: "50%" }}>⚠️ What You Still Need (The Basics)</th>
        </tr></thead>
        <tbody><tr>
          <td style={{ ...S.td0, verticalAlign: "top" as const, lineHeight: "1.8" }}>
            • A simple system to keep a project healthy<br />
            • A way to explain your approach in “PMBOK 7 language”<br />
            • A weekly routine that catches problems early<br />
            • A strong measurement + uncertainty toolkit
          </td>
          <td style={{ ...S.td0, verticalAlign: "top" as const, lineHeight: "1.8" }}>
            This pack <strong>does not</strong> replace a task tracker. You still need:<br />
            • <strong>Tasks</strong> (who’s doing what by when)<br />
            • <strong>Issues</strong> (problems to solve)<br />
            • <strong>Action items</strong> (commitments with due dates)<br />
            • <strong>Decisions</strong> (what was decided and why)<br /><br />
            <span style={ital}>Good news: you can do those anywhere — OneNote tables, Excel/Sheets, MS Planner, Asana, Trello, Jira.</span><br /><br />
            <span style={ital}>If you want all those core tracking templates already built inside OneNote, that’s what the <strong>Command Center</strong> provides.</span>
          </td>
        </tr></tbody>
      </table>
      <div style={{ ...prose, borderTop: `1px solid ${C.border}`, marginTop: "0" }}>
        <p style={{ marginBottom: "8px" }}><strong style={teal}>Standalone “Minimum Setup” — 7 pages that make this work:</strong></p>
        <ol style={{ paddingLeft: "20px", marginBottom: "8px" }}>
          <li style={li}>(6) Project Context Snapshot</li>
          <li style={li}>(5) Delivery Approach Selector</li>
          <li style={li}>(4) Tailoring Strategy Worksheet</li>
          <li style={li}>(31) Measurement Strategy Blueprint</li>
          <li style={li}>(34) Uncertainty/Complexity Assessment + Playbook</li>
          <li style={li}>(10) Stakeholder Domain Health Check</li>
          <li style={li}>(11) Team Domain Health Check</li>
        </ol>
        <p style={ital}>Then use (1) Alignment Dashboard as your weekly “home screen.”</p>
      </div>
    </div>
  );

  const renderRoutine = () => (
    <div ref={routineRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner()}>📅 THE SIMPLE WEEKLY ROUTINE (Works With Either Setup)</td></tr></tbody></table>
      <CopyButton targetRef={routineRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "50%", backgroundColor: "#0D9488" }}>📆 Weekly (30 minutes)</th>
          <th style={{ ...S.thPrimary, width: "50%", backgroundColor: "#115E59" }}>📅 Monthly (60 minutes)</th>
        </tr></thead>
        <tbody><tr>
          <td style={{ ...S.td0, verticalAlign: "top" as const, lineHeight: "1.9" }}>
            <strong>1.</strong> Update (1) Alignment Dashboard<br />
            <strong>2.</strong> Do the 8 Domain Health Checks (10–17)<br />
            <strong>3.</strong> Write down decisions + bottlenecks:<br />
            &nbsp;&nbsp;&nbsp;• (37) Decision Latency Tracker<br />
            <strong>4.</strong> Turn numbers into actions:<br />
            &nbsp;&nbsp;&nbsp;• (33) Metrics Review Notes + Actions
          </td>
          <td style={{ ...S.td0, verticalAlign: "top" as const, lineHeight: "1.9" }}>
            <strong>1.</strong> Review principles alignment:<br />
            &nbsp;&nbsp;&nbsp;• (18) Principles-to-Practice Master Checklist<br />
            <strong>2.</strong> Review measurement:<br />
            &nbsp;&nbsp;&nbsp;• (31–33) Measurement pages<br />
            <strong>3.</strong> Improve and capture lessons:<br />
            &nbsp;&nbsp;&nbsp;• (38) Domain Retrospective<br />
            &nbsp;&nbsp;&nbsp;• (39) Principle-Based Lessons Learned
          </td>
        </tr></tbody>
      </table>
    </div>
  );

  const renderIndex = () => (
    <div ref={indexRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner("#115E59")}>🔍 QUICK “WHAT’S THIS PAGE FOR?” INDEX</td></tr></tbody></table>
      <CopyButton targetRef={indexRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={S.thSecondary}>If You’re Thinking…</th>
          <th style={S.thSecondary}>Open This Page</th>
        </tr></thead>
        <tbody>
          {[
            { q: "“What approach should we use?”", a: "(5) Delivery Approach Selector" },
            { q: "“How much process do we actually need?”", a: "(4) Tailoring Strategy Worksheet • (25) Tailoring Practice Page" },
            { q: "“Are we healthy right now?”", a: "(10–17) Domain Health Checks • (1) Alignment Dashboard" },
            { q: "“Are we delivering real value?”", a: "(22) Value Practice Page • (32) Outcome & Benefits Planner • (15) Delivery Domain Health Check" },
            { q: "“Are we measuring the right things?”", a: "(31) Measurement Strategy Blueprint • (16) Measurement Domain Health Check • (33) Metrics Review" },
            { q: "“Things changed / we’re uncertain / risk is rising”", a: "(34) Uncertainty Playbook • (35) Assumption Stress Test • (36) Contingency Triggers" },
            { q: "“Leadership / PMO wants proof we’re aligned”", a: "(3) Artifact-to-Domain Mapping • (40) Alignment Summary • (41) PMO/Audit Checklist • (18) Principles Master Checklist" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (<tr key={i}>
              <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 600, fontSize: "11px", lineHeight: "1.6" }}>{r.q}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px", lineHeight: "1.6" }}>{r.a}</td>
            </tr>);
          })}
        </tbody>
      </table>
    </div>
  );

  const renderAllStar = () => (
    <div ref={allStarRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner()}>⭐ THE “ALL-STAR” PAGES (The Ones You’ll Use the Most)</td></tr></tbody></table>
      <CopyButton targetRef={allStarRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thSecondary, width: "5%", textAlign: "center" as const }}>#</th>
          <th style={S.thSecondary}>Page</th>
          <th style={S.thSecondary}>Why It’s an All-Star</th>
        </tr></thead>
        <tbody>
          {[
            { n: "1", page: "Alignment Dashboard", why: "One-page executive view — your weekly home screen" },
            { n: "4", page: "Tailoring Strategy Worksheet", why: "Makes your approach defendable" },
            { n: "5", page: "Delivery Approach Selector", why: "Reduces debate and confusion" },
            { n: "10", page: "Stakeholder Domain Health Check", why: "Prevents surprise stakeholder blowups" },
            { n: "11", page: "Team Domain Health Check", why: "High correlation to delivery success" },
            { n: "15", page: "Delivery Domain Health Check", why: "Keeps you outcome-focused, not task-focused" },
            { n: "16", page: "Measurement Domain Health Check", why: "Exec-friendly, forces objective project truth" },
            { n: "17", page: "Uncertainty Domain Health Check", why: "Catches projects flipping red without warning" },
            { n: "18", page: "Principles-to-Practice Master Checklist", why: "Great for self-audit and PMO reviews" },
            { n: "22", page: "Value Practice Page", why: "Sharpens outcomes and makes reporting powerful" },
            { n: "25", page: "Tailoring Practice Page", why: "Reinforces the core PMBOK 7 differentiator" },
            { n: "28", page: "Risk Practice Page", why: "The principle most PMOs care about" },
            { n: "31", page: "Measurement Strategy Blueprint", why: "Turns measurement domain into a real operating system" },
            { n: "34", page: "Uncertainty/Complexity Playbook", why: "Structured way to manage the unknown" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (<tr key={i}>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, color: "#0D9488" }}>{r.n}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 600, fontSize: "11px" }}>⭐ {r.page}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{r.why}</td>
            </tr>);
          })}
        </tbody>
      </table>
    </div>
  );

  const renderFooter = () => (
    <table style={{ ...S.tbl, marginTop: "8px" }}>
      <tbody><tr><td style={{ backgroundColor: "#0D9488", color: "#F0FDFA", padding: "8px 20px", fontSize: "10px", fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.06em" }}>ExecNoteShop • PMBOK® 7 Alignment Pack • © 2026 All Rights Reserved</td></tr></tbody>
    </table>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50/20">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-teal-600 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-teal-50 border border-teal-100 text-teal-700 text-xs font-semibold"><BookOpen size={11} /> Guide</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/pmbok7-alignment-pack" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-teal-600 transition-colors"><ArrowLeft size={14} /> Back to PMBOK 7 Alignment Pack</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-teal-100 flex items-center justify-center"><Compass size={20} className="text-teal-600" /></div>
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900">Read This First — Simple Guide</h2>
              <p className="text-xs font-medium text-teal-600">PMBOK® 7 Alignment Pack • Setup & Reference</p>
            </div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Complete setup guide explaining what this pack is, how to use it standalone or with the PM Command Center, weekly/monthly routines, and a quick-reference index.</p>
        </div>
        <ThemeSwitcher />
        <div ref={fullPageRef} style={{ fontFamily: S.font }}>
          {renderTitleBanner()}{renderWhat()}{renderTwoWays()}{renderBoth()}{renderStandalone()}{renderRoutine()}{renderIndex()}{renderAllStar()}{renderFooter()}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function ReadThisFirstPage() {
  return (<ThemeProvider><ReadThisFirstContent /></ThemeProvider>);
}
