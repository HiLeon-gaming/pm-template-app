"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, MessageCircle, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Log", desc: "Feedback given + received + patterns", icon: LayoutDashboard },
  { id: "compact", label: "Quick Log", desc: "Feedback entries only", icon: AlignJustify },
];

function FeedbackLogContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const givenRef = useRef<HTMLDivElement>(null);
  const receivedRef = useRef<HTMLDivElement>(null);
  const patternsRef = useRef<HTMLDivElement>(null);

  const accent = "#D946EF"; const accentDark = "#C026D3";

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>💬 1:1 FEEDBACK LOG</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; Meetings Hub Pro &nbsp;|&nbsp; 1:1 Meetings &nbsp;|&nbsp; Running Record</td></tr>
    </tbody></table>
  );

  const renderHeader = () => (
    <div ref={headerRef} style={{ marginBottom: "12px" }}>
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "18%" }}>Team Member</td><td style={{ ...S.td0, width: "32%", fontWeight: 700, color: accent }}>[Name]</td><td style={{ ...S.tdLabel, width: "18%" }}>Role</td><td style={{ ...S.td0, width: "32%" }}>[Title]</td></tr>
        <tr><td style={S.tdLabelAlt}>Manager</td><td style={S.tdAlt}>[Your Name]</td><td style={S.tdLabelAlt}>Period</td><td style={S.tdAlt}>[Q1 2026 / Running]</td></tr>
      </tbody></table>
      <CopyButton targetRef={headerRef} label="Copy Section" />
    </div>
  );

  const renderGiven = () => (
    <div ref={givenRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(accent)}>📤 FEEDBACK GIVEN (Manager → Team Member)</div>
      <CopyButton targetRef={givenRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Date</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Type</th>
          <th style={S.thPrimary}>Feedback</th>
          <th style={{ ...S.thPrimary, width: "15%" }}>Context</th>
          <th style={{ ...S.thPrimary, width: "12%", textAlign: "center" as const }}>Response</th>
        </tr></thead>
        <tbody>
          {[
            { date: "[03/05]", type: "Positive", tBg: C.badgeGreenBg, tFg: C.badgeGreenFg, fb: "[Great job leading the sprint review — clear, concise, and well-prepared. The stakeholders were impressed.]", ctx: "[Sprint review]", resp: "Receptive" },
            { date: "[02/26]", type: "Constructive", tBg: C.badgeAmberBg, tFg: C.badgeAmberFg, fb: "[Your status updates are thorough but too long — aim for 3 bullet points max. The exec team skims.]", ctx: "[Status email]", resp: "Acknowledged" },
            { date: "[02/19]", type: "Positive", tBg: C.badgeGreenBg, tFg: C.badgeGreenFg, fb: "[Proactively identified the performance issue before QA caught it — saved us 2 days.]", ctx: "[Code review]", resp: "Appreciated" },
            { date: "[02/12]", type: "Constructive", tBg: C.badgeAmberBg, tFg: C.badgeAmberFg, fb: "[Need to delegate more — you took on 3 tasks that should have gone to junior team members.]", ctx: "[Workload review]", resp: "Discussed plan" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, fontSize: "10px", color: accent }}>{r.date}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.tBg, r.tFg)}>{r.type}</span></td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.fb}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", color: C.textMuted }}>{r.ctx}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "10px" }}>{r.resp}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderReceived = () => (
    <div ref={receivedRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(accentDark)}>📥 FEEDBACK RECEIVED (Team Member → Manager)</div>
      <CopyButton targetRef={receivedRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Date</th>
          <th style={S.thPrimary}>Their Feedback to You</th>
          <th style={{ ...S.thPrimary, width: "20%" }}>Your Reflection</th>
          <th style={{ ...S.thPrimary, width: "15%" }}>Action Taken</th>
        </tr></thead>
        <tbody>
          {[
            { date: "[03/05]", fb: "[Would like more advance notice on priority changes — feels reactive sometimes]", refl: "[Fair point — I change priorities mid-sprint]", action: "[Will flag changes 2 days ahead]" },
            { date: "[02/19]", fb: "[Appreciated the training budget conversation — felt heard and supported]", refl: "[Good — keep investing in these moments]", action: "[Continue quarterly career check-ins]" },
            { date: "[02/05]", fb: "[Meetings run long — wants more agenda discipline from me]", refl: "[Need to practice what I preach]", action: "[Started using timebox plan]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, fontSize: "10px", color: accent }}>{r.date}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.fb}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", color: C.textMuted }}>{r.refl}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", fontWeight: 600 }}>{r.action}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderPatterns = () => (
    <div ref={patternsRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(accent)}>📊 PATTERNS &amp; THEMES</div>
      <CopyButton targetRef={patternsRef} label="Copy Section" />
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "22%" }}>Recurring Strengths</td><td style={S.td0}>[What comes up consistently as a strength? Use for review season.]</td></tr>
        <tr><td style={S.tdLabelAlt}>Recurring Growth Areas</td><td style={S.tdAlt}>[What keeps coming up as a development area?]</td></tr>
        <tr><td style={S.tdLabel}>Feedback I Need to Give</td><td style={S.td0}>[Any feedback I\u2019ve been putting off? Write it down and plan it.]</td></tr>
        <tr><td style={S.tdLabelAlt}>Their Feedback to Me</td><td style={S.tdAlt}>[Any patterns in what they\u2019re telling me? Am I improving?]</td></tr>
      </tbody></table>
    </div>
  );

  const renderFooter = () => (
    <table style={{ ...S.tbl, marginTop: "8px" }}><tbody><tr>
      <td style={{ backgroundColor: C.primary, color: C.footerText, padding: "8px 20px", fontSize: "10px", fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.06em" }}>
        ExecNoteShop &nbsp;&bull;&nbsp; Meetings Hub Pro &nbsp;&bull;&nbsp; &copy; 2026 All Rights Reserved
      </td>
    </tr></tbody></table>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-fuchsia-50/30">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-fuchsia-500 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-fuchsia-50 border border-fuchsia-100 text-fuchsia-700 text-xs font-semibold"><MessageCircle size={11} />Feedback</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/meetings-hub" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-fuchsia-600 transition-colors"><ArrowLeft size={14} />Back to Meetings Hub Pro</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-fuchsia-100 flex items-center justify-center"><MessageCircle size={20} className="text-fuchsia-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">1:1 Feedback Log</h2><p className="text-xs font-medium text-fuchsia-600">Running Record &mdash; Feedback Given &amp; Received</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Track every piece of feedback — positive, constructive, given, and received. Invaluable for performance reviews.</p>
        </div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">View Mode</p>
          <div className="flex flex-wrap gap-2">
            {LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (
              <button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-fuchsia-500 text-white border-fuchsia-500 shadow-md shadow-fuchsia-200" : "bg-white text-slate-600 border-slate-200 hover:border-fuchsia-300 hover:text-fuchsia-700"}`}>
                <Icon size={15} /><span>{l.label}</span><span className={`text-[10px] font-medium ${isActive ? "text-fuchsia-200" : "text-slate-400"}`}>{l.desc}</span>
              </button>
            ); })}
          </div>
        </div>
        <div ref={fullPageRef} style={{ fontFamily: S.font }}>
          {layout === "full" && <>{renderTitleBanner()}{renderHeader()}{renderGiven()}{renderReceived()}{renderPatterns()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderHeader()}{renderGiven()}{renderReceived()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function FeedbackLogPage() { return <ThemeProvider><FeedbackLogContent /></ThemeProvider>; }
