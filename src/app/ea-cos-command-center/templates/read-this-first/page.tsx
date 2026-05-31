"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, BookOpen, Shield, CheckCircle, Copy, Palette, LayoutDashboard, Star } from "lucide-react";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

function ReadThisFirstContent() {
  const { colors: C, styles: S } = useTheme();
  const fullPageRef = useRef<HTMLDivElement>(null);

  const accent = "#7C3AED";

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>READ THIS FIRST &mdash; HOW THIS PACK WORKS</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; EA / Chief of Staff Command Center &nbsp;|&nbsp; Getting Started</td></tr>
    </tbody></table>
  );

  const renderWelcome = () => (
    <table style={{ ...S.tbl, marginBottom: "8px" }}><tbody>
      <tr><td style={{ ...S.td0, padding: "14px 18px", fontSize: "11px", lineHeight: "1.9" }}>
        <strong style={{ color: accent, fontSize: "13px" }}>Welcome to the EA / Chief of Staff Command Center!</strong><br /><br />
        This pack contains <strong>62 professional templates</strong> organized into 8 sections, designed to be the complete operating system for being the &ldquo;engine&rdquo; behind a leader. Every template is designed to be <strong>copy-pasted directly into OneNote, Word, Google Docs, or Notion</strong> with full formatting intact.<br /><br />
        You don&apos;t need to use every template. Start with the <strong>All-Star &#11088; templates</strong> &mdash; they deliver the most value immediately. Then expand as your systems mature.
      </td></tr>
    </tbody></table>
  );

  const renderSections = () => (
    <>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accent)}>WHAT&apos;S INSIDE &mdash; 8 SECTIONS</td></tr></tbody></table>
      <table style={{ ...S.tbl, marginBottom: "8px" }}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "5%", textAlign: "center" as const }}>#</th>
          <th style={S.thPrimary}>Section</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Templates</th>
          <th style={{ ...S.thPrimary, width: "30%" }}>What It Covers</th>
        </tr></thead>
        <tbody>
          {[
            { letter: "A", name: "Start Here", count: 6, desc: "Command dashboard, quick start, role scope, preferences, operating manual", color: "#0EA5E9" },
            { letter: "B", name: "Requests, Follow-Ups & Accountability", count: 10, desc: "Request intake, action tracker, delegation, follow-up systems", color: "#8B5CF6" },
            { letter: "C", name: "Calendar, Time & Priorities", count: 10, desc: "Daily/weekly briefs, calendar audit, time blocks, priority matrix", color: "#D946EF" },
            { letter: "D", name: "Meetings Engine", count: 9, desc: "Meeting notes, decisions, parking lot, closeout, talking points", color: "#F59E0B" },
            { letter: "E", name: "Stakeholders & Relationships", count: 8, desc: "Directory, relationship plans, touchpoints, vendors, recognition", color: "#EF4444" },
            { letter: "F", name: "Initiatives, Projects & Alignment", count: 8, desc: "Portfolio view, status updates, decision log, OKRs, operating rhythm", color: "#059669" },
            { letter: "G", name: "Travel, Events & Logistics", count: 7, desc: "Travel intake, itineraries, packing, events, exec briefs, contacts", color: "#EA580C" },
            { letter: "H", name: "Admin, Finance & Document Control", count: 4, desc: "Expenses, approvals, document library, SOPs", color: "#6366F1" },
          ].map((s, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 800, fontSize: "13px", color: s.color }}>{s.letter}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 700 }}>{s.name}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 800, fontSize: "12px", color: accent }}>{s.count}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px" }}>{s.desc}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );

  const renderHowToUse = () => (
    <>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner("#059669")}>HOW TO USE THESE TEMPLATES</td></tr></tbody></table>
      <table style={{ ...S.tbl, marginBottom: "8px" }}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Step</th>
          <th style={S.thPrimary}>Action</th>
        </tr></thead>
        <tbody>
          {[
            { step: "1", action: "Browse the Table of Contents and pick a template that matches your need." },
            { step: "2", action: "Open the template page. Choose your preferred View Mode (Full or Compact)." },
            { step: "3", action: "Choose a theme color using the Theme Switcher at the top of each page." },
            { step: "4", action: "Click \"Copy Section\" to copy individual sections, or \"Copy Entire Page\" to grab everything." },
            { step: "5", action: "Paste directly into OneNote, Word, Google Docs, or Notion. Formatting transfers cleanly." },
            { step: "6", action: "Replace [placeholder text] with your real content. Delete rows you don't need." },
            { step: "7", action: "Save and reuse. Most templates are designed to be used weekly or for each meeting/event." },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 800, fontSize: "14px", color: "#059669" }}>{r.step}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.action}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );

  const renderFeatures = () => (
    <>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner("#0EA5E9")}>KEY FEATURES</td></tr></tbody></table>
      <table style={{ ...S.tbl, marginBottom: "8px" }}><tbody>
        <tr><td style={{ ...S.td0, fontSize: "10px", lineHeight: "2.2", padding: "12px 16px" }}>
          <strong style={{ color: "#0EA5E9" }}>&#127912; Multiple Themes</strong> &mdash; Switch between 5 professional color themes. Every template adapts instantly.<br />
          <strong style={{ color: "#059669" }}>&#128203; Two View Modes</strong> &mdash; Full layout for comprehensive use; Compact for quick capture.<br />
          <strong style={{ color: "#7C3AED" }}>&#128203; Copy Buttons</strong> &mdash; Copy individual sections or the entire page with one click.<br />
          <strong style={{ color: "#EA580C" }}>&#11088; All-Star Templates</strong> &mdash; The highest-impact templates are marked with a star. Start here.<br />
          <strong style={{ color: "#DC2626" }}>&#128196; Clean Copy-Paste</strong> &mdash; Designed for OneNote, Word, and Google Docs. Tables, colors, and badges all transfer.<br />
          <strong style={{ color: "#D97706" }}>&#128221; Placeholder Text</strong> &mdash; All content in [brackets] is meant to be replaced with your real data.
        </td></tr>
      </tbody></table>
    </>
  );

  const renderQuickStart = () => (
    <>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner("#DC2626")}>RECOMMENDED STARTING TEMPLATES</td></tr></tbody></table>
      <table style={{ ...S.tbl, marginBottom: "8px" }}>
        <thead><tr>
          <th style={S.thPrimary}>Template</th>
          <th style={{ ...S.thPrimary, width: "10%" }}>Section</th>
          <th style={{ ...S.thPrimary, width: "35%" }}>Why Start Here</th>
        </tr></thead>
        <tbody>
          {[
            { name: "Command Dashboard", section: "A", why: "Your home base. See everything at a glance." },
            { name: "Request Intake + Tracker", section: "B", why: "Stop losing requests. Instant accountability." },
            { name: "Weekly Executive Brief Builder", section: "G", why: "The deliverable your exec will love most." },
            { name: "Decision Log Master", section: "F", why: "Stops repeated debates. Enormous value." },
            { name: "Action Items Master Tracker", section: "F", why: "Nothing falls through the cracks. Cross-meeting." },
            { name: "Stakeholder Directory", section: "E", why: "Know who matters and how to work with them." },
            { name: "Meeting Notes + Actions", section: "D", why: "Every meeting captured consistently." },
            { name: "Calendar Audit Tool", section: "C", why: "Protect the exec's most valuable resource: time." },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 700 }}>&#11088; {r.name}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "10px", fontWeight: 800, color: accent }}>{r.section}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px" }}>{r.why}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );

  const renderFooter = () => (
    <table style={{ ...S.tbl, marginTop: "8px" }}><tbody><tr>
      <td style={{ backgroundColor: C.primary, color: C.footerText, padding: "8px 20px", fontSize: "10px", fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.06em" }}>
        ExecNoteShop &bull; EA / Chief of Staff Command Center &bull; &copy; 2026 All Rights Reserved
      </td>
    </tr></tbody></table>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50/30">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-purple-600 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-purple-50 border border-purple-100 text-purple-700 text-xs font-semibold"><BookOpen size={11} />Instructions</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/ea-cos-command-center" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-purple-600 transition-colors"><ArrowLeft size={14} />Back to EA/CoS Command Center</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center"><BookOpen size={20} className="text-purple-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">Read This First</h2><p className="text-xs font-medium text-purple-600">How This Pack Works &mdash; Start Here</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Everything you need to know to get maximum value from the EA / Chief of Staff Command Center.</p>
        </div>
        <ThemeSwitcher />
        <div ref={fullPageRef} style={{ fontFamily: S.font, marginTop: "12px" }}>
          {renderTitleBanner()}
          {renderWelcome()}
          {renderSections()}
          {renderHowToUse()}
          {renderFeatures()}
          {renderQuickStart()}
          {renderFooter()}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function ReadThisFirstPage() { return <ThemeProvider><ReadThisFirstContent /></ThemeProvider>; }
