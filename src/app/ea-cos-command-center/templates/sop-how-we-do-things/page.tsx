"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, BookOpen, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full SOP", desc: "All processes + step-by-step + tips", icon: LayoutDashboard },
  { id: "compact", label: "Quick Reference", desc: "Process list only", icon: AlignJustify },
];

function SOPContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const indexRef = useRef<HTMLDivElement>(null);
  const sampleRef = useRef<HTMLDivElement>(null);
  const tipsRef = useRef<HTMLDivElement>(null);

  const accent = "#6366F1";

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>SOP / &ldquo;HOW WE DO THINGS&rdquo; PAGE</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; EA / Chief of Staff Command Center &nbsp;|&nbsp; Admin, Finance &amp; Document Control</td></tr>
    </tbody></table>
  );

  const renderIndex = () => (
    <div ref={indexRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accent)}>STANDARD OPERATING PROCEDURES INDEX</td></tr></tbody></table>
      <CopyButton targetRef={indexRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>Repeatable processes documented so the role scales. New EA/CoS can onboard in days, not months.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "5%", textAlign: "center" as const }}>#</th>
          <th style={S.thPrimary}>Process Name</th>
          <th style={{ ...S.thPrimary, width: "12%" }}>Category</th>
          <th style={{ ...S.thPrimary, width: "10%" }}>Frequency</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Last Updated</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Status</th>
        </tr></thead>
        <tbody>
          {[
            { name: "[Travel Booking Process]", cat: "Travel", freq: "As needed", updated: "03/01", s: "Current", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg },
            { name: "[Expense Submission & Reimbursement]", cat: "Finance", freq: "Weekly", updated: "02/15", s: "Current", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg },
            { name: "[Meeting Prep Workflow]", cat: "Meetings", freq: "Daily", updated: "03/10", s: "Current", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg },
            { name: "[Board Meeting Prep Cycle]", cat: "Governance", freq: "Quarterly", updated: "01/15", s: "Current", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg },
            { name: "[New Hire Onboarding (Exec Team)]", cat: "HR", freq: "As needed", updated: "02/20", s: "Current", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg },
            { name: "[Gift / Recognition Process]", cat: "Culture", freq: "Monthly", updated: "01/10", s: "Needs Update", sBg: C.badgeAmberBg, sFg: C.badgeAmberFg },
            { name: "[Calendar Management Rules]", cat: "Calendar", freq: "Daily", updated: "03/05", s: "Current", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg },
            { name: "[Visitor / Guest Hosting]", cat: "Logistics", freq: "As needed", updated: "12/01", s: "Needs Update", sBg: C.badgeAmberBg, sFg: C.badgeAmberFg },
            { name: "[Weekly Exec Brief Process]", cat: "Reporting", freq: "Weekly", updated: "03/10", s: "Current", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg },
            { name: "[Offboarding — Departing Exec Team Member]", cat: "HR", freq: "As needed", updated: "11/15", s: "Draft", sBg: C.badgeBlueBg, sFg: C.badgeBlueFg },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 800, fontSize: "11px", color: accent }}>{i + 1}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 600 }}>{r.name}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px" }}>{r.cat}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px" }}>{r.freq}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "9px" }}>{r.updated}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.sBg, r.sFg)}>{r.s}</span></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderSample = () => (
    <div ref={sampleRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner("#059669")}>SAMPLE SOP: TRAVEL BOOKING PROCESS</td></tr></tbody></table>
      <CopyButton targetRef={sampleRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Step</th>
          <th style={S.thPrimary}>Action</th>
          <th style={{ ...S.thPrimary, width: "10%" }}>Owner</th>
          <th style={{ ...S.thPrimary, width: "10%" }}>Timeline</th>
        </tr></thead>
        <tbody>
          {[
            { step: "1", action: "[Receive travel request from exec (verbal, email, or intake form)]", owner: "[EA]", timeline: "Day 0" },
            { step: "2", action: "[Confirm dates, purpose, preferences, constraints]", owner: "[EA]", timeline: "Day 0" },
            { step: "3", action: "[Book flights — preferred airline, class, seat]", owner: "[EA]", timeline: "Day 0-1" },
            { step: "4", action: "[Book hotel — preferred brand, room type, loyalty number]", owner: "[EA]", timeline: "Day 0-1" },
            { step: "5", action: "[Arrange ground transport — car service or rental]", owner: "[EA]", timeline: "Day 1" },
            { step: "6", action: "[Build itinerary page — send to exec + spouse if applicable]", owner: "[EA]", timeline: "Day 1-2" },
            { step: "7", action: "[Add all travel to calendar with confirmation details]", owner: "[EA]", timeline: "Day 1-2" },
            { step: "8", action: "[Send contact sheet with emergency numbers]", owner: "[EA]", timeline: "T-1 day" },
            { step: "9", action: "[Day-before confirmation: re-confirm car, hotel, flights]", owner: "[EA]", timeline: "T-1 day" },
            { step: "10", action: "[Post-trip: collect receipts, submit expenses, file confirmations]", owner: "[EA]", timeline: "T+1 day" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 800, fontSize: "12px", color: "#059669" }}>{r.step}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.action}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px" }}>{r.owner}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", fontWeight: 600 }}>{r.timeline}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderTips = () => (
    <div ref={tipsRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner("#D97706")}>SOP WRITING TIPS</td></tr></tbody></table>
      <CopyButton targetRef={tipsRef} label="Copy Section" />
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.td0, fontSize: "10px", lineHeight: "2.0", padding: "12px 16px" }}>
          <strong style={{ color: accent }}>1. Write for your replacement</strong> — Could someone new follow this without asking you a single question?<br />
          <strong style={{ color: accent }}>2. Include the &ldquo;why&rdquo;</strong> — Not just what to do, but why it matters. Context prevents shortcuts.<br />
          <strong style={{ color: accent }}>3. Add common mistakes</strong> — What goes wrong when this process is done poorly?<br />
          <strong style={{ color: accent }}>4. Link to tools</strong> — Include links to the systems, templates, and forms used in each step.<br />
          <strong style={{ color: accent }}>5. Review quarterly</strong> — Processes drift. Set a calendar reminder to audit and update every 3 months.
        </td></tr>
      </tbody></table>
    </div>
  );

  const renderFooter = () => (
    <table style={{ ...S.tbl, marginTop: "8px" }}><tbody><tr>
      <td style={{ backgroundColor: C.primary, color: C.footerText, padding: "8px 20px", fontSize: "10px", fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.06em" }}>
        ExecNoteShop &bull; EA / Chief of Staff Command Center &bull; &copy; 2026 All Rights Reserved
      </td>
    </tr></tbody></table>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold"><BookOpen size={11} />SOPs</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/ea-cos-command-center" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-indigo-600 transition-colors"><ArrowLeft size={14} />Back to EA/CoS Command Center</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center"><BookOpen size={20} className="text-indigo-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">SOP / &ldquo;How We Do Things&rdquo; Page</h2><p className="text-xs font-medium text-indigo-600">Systematize the Role</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Repeatable processes: onboarding, travel booking, board prep, etc. Systematizes the role so anyone can step in.</p>
        </div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">View Mode</p>
          <div className="flex flex-wrap gap-2">
            {LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (
              <button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-200" : "bg-white text-slate-600 border-slate-200 hover:border-indigo-300 hover:text-indigo-700"}`}>
                <Icon size={15} /><span>{l.label}</span><span className={`text-[10px] font-medium ${isActive ? "text-indigo-200" : "text-slate-400"}`}>{l.desc}</span>
              </button>
            ); })}
          </div>
        </div>
        <div ref={fullPageRef} style={{ fontFamily: S.font }}>
          {layout === "full" && <>{renderTitleBanner()}{renderIndex()}{renderSample()}{renderTips()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderIndex()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function SOPHowWeDoThingsPage() { return <ThemeProvider><SOPContent /></ThemeProvider>; }
