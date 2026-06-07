"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, Compass, BookOpen } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

function QuickStartContent() {
  const { colors: C, styles: S } = useTheme();
  const fullPageRef = useRef<HTMLDivElement>(null);
  const setupRef = useRef<HTMLDivElement>(null);
  const weeklyRef = useRef<HTMLDivElement>(null);
  const monthlyRef = useRef<HTMLDivElement>(null);
  const pagesRef = useRef<HTMLDivElement>(null);

  const descStyle: React.CSSProperties = {
    fontFamily: S.font, fontSize: "11px", fontStyle: "italic", color: "#475569",
    padding: "10px 14px", lineHeight: "1.6", borderBottom: `1px solid ${C.border}`, backgroundColor: C.white,
  };

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "0px" }}>
      <tbody>
        <tr><td style={{ backgroundColor: "#0D9488", color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: "4px solid #F59E0B", textAlign: "center" as const }}>🚀 PMBOK 7 “HOW THIS PACK WORKS” QUICK START</td></tr>
        <tr><td style={{ backgroundColor: "#115E59", color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; PMBOK® 7 Alignment Pack</td></tr>
        <tr><td style={descStyle}>
          <strong style={{ fontStyle: "italic" }}>Simple setup steps + recommended weekly/monthly cadence.</strong> Follow this page to get the pack running in under 30 minutes. Refer back when you need a refresh on cadence.
        </td></tr>
      </tbody>
    </table>
  );

  const renderSetup = () => (
    <div ref={setupRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner()}>🔧 INITIAL SETUP (Do Once — 30 Minutes)</div>
      <CopyButton targetRef={setupRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, backgroundColor: "#0D9488", width: "5%", textAlign: "center" as const }}>Step</th>
          <th style={{ ...S.thPrimary, backgroundColor: "#0D9488" }}>What to Do</th>
          <th style={{ ...S.thPrimary, backgroundColor: "#0D9488", width: "25%" }}>Page to Use</th>
          <th style={{ ...S.thPrimary, backgroundColor: "#0D9488", width: "6%", textAlign: "center" as const }}>Done?</th>
        </tr></thead>
        <tbody>
          {[
            { step: "1", what: "Define your project context: objectives, constraints, complexity, risk posture", page: "(6) Project Context Snapshot", done: "⬜" },
            { step: "2", what: "Choose your delivery approach: Predictive, Hybrid, or Agile", page: "(5) Delivery Approach Selector", done: "⬜" },
            { step: "3", what: "Define what you’ll tailor and why", page: "(4) Tailoring Strategy Worksheet", done: "⬜" },
            { step: "4", what: "Map existing artifacts to PMBOK 7 domains + principles", page: "(3) Artifact-to-Domain Mapping Matrix", done: "⬜" },
            { step: "5", what: "Define your measurement strategy: KPIs, targets, cadence", page: "(31) Measurement Strategy Blueprint", done: "⬜" },
            { step: "6", what: "Assess uncertainty + complexity; set contingency triggers", page: "(34) Uncertainty/Complexity Playbook", done: "⬜" },
            { step: "7", what: "Set up your Alignment Dashboard as the weekly home screen", page: "(1) Alignment Dashboard", done: "⬜" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (<tr key={i}>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, color: "#0D9488", fontSize: "14px" }}>{r.step}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px", lineHeight: "1.6" }}>{r.what}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px", fontWeight: 600, color: "#0D9488" }}>{r.page}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "14px" }}>{r.done}</td>
            </tr>);
          })}
        </tbody>
      </table>
    </div>
  );

  const renderWeekly = () => (
    <div ref={weeklyRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner("#115E59")}>📆 WEEKLY CADENCE (30 Minutes)</td></tr></tbody></table>
      <CopyButton targetRef={weeklyRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thSecondary, width: "5%", textAlign: "center" as const }}>#</th>
          <th style={S.thSecondary}>Activity</th>
          <th style={{ ...S.thSecondary, width: "25%" }}>Page(s)</th>
          <th style={{ ...S.thSecondary, width: "8%", textAlign: "center" as const }}>Time</th>
        </tr></thead>
        <tbody>
          {[
            { act: "Update the Alignment Dashboard with this week’s health, signals, and actions", page: "(1) Alignment Dashboard", time: "5 min" },
            { act: "Run through the 8 Domain Health Checks — rate health, note key signals", page: "(10–17) Domain Health Checks", time: "15 min" },
            { act: "Record any slow decisions or bottlenecks", page: "(37) Decision Latency Tracker", time: "5 min" },
            { act: "Turn metrics into actions — what do the numbers tell us to do?", page: "(33) Metrics Review Notes + Actions", time: "5 min" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (<tr key={i}>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, color: "#0D9488" }}>{i + 1}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px", lineHeight: "1.6" }}>{r.act}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px", fontWeight: 600, color: "#0D9488" }}>{r.page}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "11px" }}>{r.time}</td>
            </tr>);
          })}
        </tbody>
      </table>
    </div>
  );

  const renderMonthly = () => (
    <div ref={monthlyRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner()}>📅 MONTHLY CADENCE (60 Minutes)</div>
      <CopyButton targetRef={monthlyRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thSecondary, width: "5%", textAlign: "center" as const }}>#</th>
          <th style={S.thSecondary}>Activity</th>
          <th style={{ ...S.thSecondary, width: "25%" }}>Page(s)</th>
          <th style={{ ...S.thSecondary, width: "8%", textAlign: "center" as const }}>Time</th>
        </tr></thead>
        <tbody>
          {[
            { act: "Review principle alignment — are we living the principles?", page: "(18) Principles Master Checklist", time: "15 min" },
            { act: "Review measurement strategy — still measuring what matters?", page: "(31–33) Measurement pages", time: "15 min" },
            { act: "Run a domain retrospective — what improved, degraded, what to fix", page: "(38) Domain Retrospective", time: "15 min" },
            { act: "Capture principle-based lessons learned", page: "(39) Principle-Based Lessons", time: "10 min" },
            { act: "Update tailoring decisions log if anything changed", page: "(8) Tailoring Decisions Log", time: "5 min" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (<tr key={i}>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, color: "#0D9488" }}>{i + 1}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px", lineHeight: "1.6" }}>{r.act}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px", fontWeight: 600, color: "#0D9488" }}>{r.page}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "11px" }}>{r.time}</td>
            </tr>);
          })}
        </tbody>
      </table>
    </div>
  );

  const renderPages = () => (
    <div ref={pagesRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner("#115E59")}>📑 ALL 42 PAGES AT A GLANCE</td></tr></tbody></table>
      <CopyButton targetRef={pagesRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thSecondary, width: "5%", textAlign: "center" as const }}>#</th>
          <th style={S.thSecondary}>Section</th>
          <th style={{ ...S.thSecondary, width: "6%", textAlign: "center" as const }}>Pages</th>
          <th style={S.thSecondary}>What It Covers</th>
        </tr></thead>
        <tbody>
          {[
            { s: "A", title: "Start Here", pages: "4", covers: "Dashboard, Quick Start, Artifact Mapping, Read This First" },
            { s: "B", title: "Tailoring & Delivery Approach", pages: "6", covers: "Approach selection, tailoring, governance, context, working agreements" },
            { s: "C", title: "8 Domain Health Checks", pages: "8", covers: "Weekly health assessment for each PMBOK 7 performance domain" },
            { s: "D", title: "12 Principles Practice Pages", pages: "13", covers: "Practical pages for each of the 12 PMBOK 7 principles" },
            { s: "E", title: "Measurement & Outcomes", pages: "3", covers: "KPI strategy, outcome evidence, metrics-to-action workflow" },
            { s: "F", title: "Uncertainty & Complexity Toolkit", pages: "4", covers: "Uncertainty playbook, assumption testing, contingency, decision latency" },
            { s: "G", title: "Continuous Improvement & Proof", pages: "4", covers: "Retrospectives, lessons learned, alignment summary, audit readiness" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (<tr key={i}>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, color: "#0D9488" }}>{r.s}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 600, fontSize: "11px" }}>{r.title}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700 }}>{r.pages}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{r.covers}</td>
            </tr>);
          })}
          <tr><td style={{ ...S.td0, fontWeight: 800, backgroundColor: "#0D9488", color: C.white, textAlign: "center" as const }}></td><td style={{ ...S.td0, fontWeight: 800, backgroundColor: "#0D9488", color: C.white }}>TOTAL</td><td style={{ ...S.td0, fontWeight: 800, backgroundColor: "#0D9488", color: C.white, textAlign: "center" as const }}>42</td><td style={{ ...S.td0, backgroundColor: "#0D9488", color: C.white, fontSize: "11px" }}>Complete PMBOK 7 alignment toolkit</td></tr>
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
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-teal-50 border border-teal-100 text-teal-700 text-xs font-semibold"><BookOpen size={11} /> Quick Start</span>
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
              <h2 className="text-2xl font-extrabold text-slate-900">Quick Start Guide</h2>
              <p className="text-xs font-medium text-teal-600">Setup Steps + Cadence</p>
            </div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Simple setup steps and recommended weekly/monthly cadence for using all 42 pages in this pack.</p>
        </div>
        <ThemeSwitcher />
        <div ref={fullPageRef} style={{ fontFamily: S.font }}>
          {renderTitleBanner()}{renderSetup()}{renderWeekly()}{renderMonthly()}{renderPages()}{renderFooter()}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function QuickStartPage() {
  return (<ThemeProvider><QuickStartContent /></ThemeProvider>);
}
