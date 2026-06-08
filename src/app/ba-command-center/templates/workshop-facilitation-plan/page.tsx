"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, Presentation, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "quick";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Plan", desc: "Agenda + logistics + debrief", icon: LayoutDashboard },
  { id: "quick", label: "Quick Agenda", desc: "Agenda + ground rules", icon: AlignJustify },
];

function WorkshopContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const logisticsRef = useRef<HTMLDivElement>(null);
  const agendaRef = useRef<HTMLDivElement>(null);
  const rulesRef = useRef<HTMLDivElement>(null);
  const outputsRef = useRef<HTMLDivElement>(null);
  const debriefRef = useRef<HTMLDivElement>(null);

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
        <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${C.accent}`, textAlign: "center" as const }}>🏗️ WORKSHOP FACILITATION PLAN</td></tr>
        <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; Business Analyst Command Center &nbsp;|&nbsp; BABOK Aligned</td></tr>
        <tr><td style={descStyle}>
          <strong style={{ fontStyle: "italic" }}>This template helps you plan, facilitate, and debrief requirements workshops.</strong> It covers participant roles, a timed agenda with activities, ground rules, logistics, and a structured way to capture workshop outputs and action items.<br /><br />
          Ideal for <strong style={{ fontStyle: "italic" }}>requirements elicitation workshops, process mapping sessions,</strong> or <strong style={{ fontStyle: "italic" }}>collaborative design sprints</strong>. Aligns with BABOK Technique: Workshops.
        </td></tr>
      </tbody>
    </table>
  );

  const renderDateHeader = () => (
    <div ref={headerRef} style={{ marginBottom: "12px" }}>
      <table style={S.tbl}>
        <tbody>
          <tr>
            <td style={{ ...S.tdLabel, width: "14%" }}>Workshop Title</td>
            <td style={{ ...S.td0, width: "36%" }}>[e.g., Order Management Future State Requirements]</td>
            <td style={{ ...S.tdLabel, width: "14%" }}>Date / Time</td>
            <td style={{ ...S.td0, width: "36%" }}>[MM/DD/YYYY — HH:MM to HH:MM]</td>
          </tr>
          <tr>
            <td style={S.tdLabelAlt}>Facilitator</td>
            <td style={S.tdAlt}>[BA Name]</td>
            <td style={S.tdLabelAlt}>Location</td>
            <td style={S.tdAlt}>[Room / Virtual Link]</td>
          </tr>
          <tr>
            <td style={S.tdLabel}>Workshop Objective</td>
            <td colSpan={3} style={S.td0}>[What must we achieve by the end of this workshop? Be specific and measurable.]</td>
          </tr>
          <tr>
            <td style={S.tdLabelAlt}>Expected Outputs</td>
            <td colSpan={3} style={S.tdAlt}>[e.g., Validated process map, prioritized requirements list, agreed scope boundaries]</td>
          </tr>
        </tbody>
      </table>
      <CopyButton targetRef={headerRef} label="Copy Section" />
    </div>
  );

  const renderLogistics = () => (
    <div ref={logisticsRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner()}>👥 PARTICIPANTS &amp; ROLES</td></tr></tbody></table>
      <CopyButton targetRef={logisticsRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead>
          <tr>
            <th style={{ ...S.thPrimary, width: "18%" }}>Name</th>
            <th style={{ ...S.thPrimary, width: "14%" }}>Title / Dept</th>
            <th style={{ ...S.thPrimary, width: "12%", textAlign: "center" as const }}>Workshop Role</th>
            <th style={S.thPrimary}>Why Included</th>
            <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>RSVP</th>
          </tr>
        </thead>
        <tbody>
          {[
            { name: "[BA Name]", title: "Business Analyst", role: "Facilitator", roleBg: "#EDE9FE", roleFg: "#7C3AED", why: "Leads the session, manages time, captures outputs", rsvp: "✅" },
            { name: "[Name]", title: "[Title]", role: "Scribe", roleBg: "#DBEAFE", roleFg: "#2563EB", why: "Captures notes, decisions, and action items in real-time", rsvp: "✅" },
            { name: "[Name]", title: "[Title]", role: "SME", roleBg: "#D1FAE5", roleFg: "#059669", why: "[e.g., Deep knowledge of current order processing]", rsvp: "" },
            { name: "[Name]", title: "[Title]", role: "Decision Maker", roleBg: "#FEE2E2", roleFg: "#DC2626", why: "[e.g., Authority to approve scope and priority decisions]", rsvp: "" },
            { name: "[Name]", title: "[Title]", role: "Participant", roleBg: "#F3F4F6", roleFg: "#6B7280", why: "", rsvp: "" },
            { name: "[Add]", title: "", role: "Participant", roleBg: "#F3F4F6", roleFg: "#6B7280", why: "", rsvp: "" },
          ].map((row, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 600, fontSize: "11px" }}>{row.name}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{row.title}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(row.roleBg, row.roleFg)}>{row.role}</span></td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{row.why}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}>{row.rsvp}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderAgenda = () => (
    <div ref={agendaRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(C.secondary)}>📅 TIMED AGENDA</td></tr></tbody></table>
      <CopyButton targetRef={agendaRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead>
          <tr>
            <th style={{ ...S.thSecondary, width: "10%", textAlign: "center" as const }}>Time</th>
            <th style={{ ...S.thSecondary, width: "8%", textAlign: "center" as const }}>Duration</th>
            <th style={{ ...S.thSecondary, width: "20%" }}>Activity</th>
            <th style={S.thSecondary}>Description / Instructions</th>
            <th style={{ ...S.thSecondary, width: "10%", textAlign: "center" as const }}>Method</th>
            <th style={{ ...S.thSecondary, width: "10%" }}>Lead</th>
          </tr>
        </thead>
        <tbody>
          {[
            { time: "[HH:MM]", dur: "5 min", activity: "Welcome & Intros", desc: "Objective, agenda walkthrough, introductions if needed", method: "Presentation", mBg: "#DBEAFE", mFg: "#2563EB", lead: "Facilitator" },
            { time: "[HH:MM]", dur: "5 min", activity: "Ground Rules", desc: "Review ground rules (see below), agree on parking lot process", method: "Discussion", mBg: "#D1FAE5", mFg: "#059669", lead: "Facilitator" },
            { time: "[HH:MM]", dur: "20 min", activity: "Current State Review", desc: "[e.g., Walk through existing process map, identify pain points]", method: "Walkthrough", mBg: "#FEF3C7", mFg: "#D97706", lead: "SME" },
            { time: "[HH:MM]", dur: "30 min", activity: "Future State Design", desc: "[e.g., Brainstorm ideal workflow, sticky note exercise, dot voting]", method: "Brainstorm", mBg: "#EDE9FE", mFg: "#7C3AED", lead: "Facilitator" },
            { time: "[HH:MM]", dur: "10 min", activity: "☕ Break", desc: "Bio break, refresh", method: "—", mBg: "#F3F4F6", mFg: "#6B7280", lead: "—" },
            { time: "[HH:MM]", dur: "20 min", activity: "Requirements Capture", desc: "[e.g., Document requirements from future state, assign priorities]", method: "Roundtable", mBg: "#FCE7F3", mFg: "#BE185D", lead: "Facilitator" },
            { time: "[HH:MM]", dur: "15 min", activity: "Decisions & Prioritization", desc: "[e.g., MoSCoW vote on requirements, resolve conflicts]", method: "Voting", mBg: "#CFFAFE", mFg: "#0891B2", lead: "Decision Maker" },
            { time: "[HH:MM]", dur: "10 min", activity: "Wrap-up & Next Steps", desc: "Review action items, parking lot, confirm follow-up date", method: "Discussion", mBg: "#D1FAE5", mFg: "#059669", lead: "Facilitator" },
          ].map((row, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "11px" }}>{row.time}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, fontSize: "11px" }}>{row.dur}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 600, fontSize: "12px" }}>{row.activity}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{row.desc}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(row.mBg, row.mFg)}>{row.method}</span></td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{row.lead}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderRules = () => (
    <div ref={rulesRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner()}>📏 GROUND RULES</td></tr></tbody></table>
      <CopyButton targetRef={rulesRef} label="Copy Section" />
      <table style={S.tbl}>
        <tbody>
          {[
            "One conversation at a time — respect the speaker",
            "All ideas are valid during brainstorming — no criticism",
            "Decisions by consensus; facilitator has tie-breaking authority",
            "Parking lot for off-topic items — we will revisit them",
            "Phones on silent — be present",
            "Time-boxed — the facilitator will manage the clock",
            "[Add custom ground rule]",
          ].map((rule, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, width: "4%", textAlign: "center" as const, fontWeight: 700, color: C.accent }}>{i + 1}</td>
                <td style={{ ...S.td0, backgroundColor: bg }}>{rule}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderOutputs = () => (
    <div ref={outputsRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(C.secondary)}>📦 WORKSHOP OUTPUTS &amp; ACTION ITEMS</td></tr></tbody></table>
      <CopyButton targetRef={outputsRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead>
          <tr>
            <th style={{ ...S.thSecondary, width: "5%", textAlign: "center" as const }}>#</th>
            <th style={S.thSecondary}>Output / Decision / Action</th>
            <th style={{ ...S.thSecondary, width: "10%", textAlign: "center" as const }}>Type</th>
            <th style={{ ...S.thSecondary, width: "14%" }}>Owner</th>
            <th style={{ ...S.thSecondary, width: "10%", textAlign: "center" as const }}>Due</th>
          </tr>
        </thead>
        <tbody>
          {[
            { item: "[e.g., Validated future state process map — v1.0]", type: "Output", tBg: "#D1FAE5", tFg: "#059669", owner: "[BA]", due: "[Date]" },
            { item: "[e.g., Agreed: MoSCoW priority for 15 requirements]", type: "Decision", tBg: "#DBEAFE", tFg: "#2563EB", owner: "[PO + BA]", due: "—" },
            { item: "[e.g., Document non-functional requirements for reporting module]", type: "Action", tBg: "#FEF3C7", tFg: "#D97706", owner: "[BA]", due: "[Date]" },
            { item: "[e.g., Schedule follow-up with IT on API integration constraints]", type: "Action", tBg: "#FEF3C7", tFg: "#D97706", owner: "[BA]", due: "[Date]" },
            { item: "[Add]", type: "—", tBg: "#F3F4F6", tFg: "#6B7280", owner: "", due: "" },
          ].map((row, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, color: C.accent }}>{i + 1}</td>
                <td style={{ ...S.td0, backgroundColor: bg }}>{row.item}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(row.tBg, row.tFg)}>{row.type}</span></td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{row.owner}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "11px" }}>{row.due}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <table style={{ ...S.tbl, marginTop: "6px" }}>
        <thead><tr><td colSpan={2} style={{ backgroundColor: "#FEF3C7", color: "#D97706", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #D97706" }}>🅿️ PARKING LOT</td></tr></thead>
        <tbody>
          {Array.from({ length: 4 }).map((_, i) => (
            <tr key={i}><td style={{ ...S.td0, backgroundColor: i % 2 === 1 ? C.rowAlt : C.white, height: "24px" }}>{i === 0 ? "[e.g., Reporting requirements for finance team — schedule separate session]" : ""}&nbsp;</td></tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderDebrief = () => (
    <div ref={debriefRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner()}>🔍 POST-WORKSHOP DEBRIEF</td></tr></tbody></table>
      <CopyButton targetRef={debriefRef} label="Copy Section" />
      <table style={S.tbl}>
        <tbody>
          {[
            { q: "Objective achieved?", a: "☐ Fully ☐ Partially ☐ Not achieved" },
            { q: "What went well?", a: "" },
            { q: "What could be improved?", a: "" },
            { q: "Unresolved conflicts / open items", a: "" },
            { q: "Follow-up workshop needed?", a: "☐ Yes — Topic: [___] Date: [___] ☐ No" },
          ].map((row, i) => {
            const isAlt = i % 2 === 1;
            return (
              <tr key={i}>
                <td style={{ ...(isAlt ? S.tdLabelAlt : S.tdLabel), width: "30%", verticalAlign: "top" as const }}>{row.q}</td>
                <td style={{ ...(isAlt ? S.tdAlt : S.td0), height: "32px" }}>{row.a}&nbsp;</td>
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50/20">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-purple-50 border border-purple-100 text-purple-700 text-xs font-semibold"><Presentation size={11} /> Workshop</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/ba-command-center" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-purple-600 transition-colors"><ArrowLeft size={14} /> Back to BA Command Center</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center"><Presentation size={20} className="text-purple-600" /></div>
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900">Workshop Facilitation Plan</h2>
              <p className="text-xs font-medium text-purple-600">Participants &bull; Timed Agenda &bull; Outputs &bull; Debrief</p>
            </div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Plan and run effective requirements workshops with participant roles, a timed agenda, ground rules, output capture, and post-workshop debrief. Full Plan is comprehensive; Quick Agenda covers the agenda and ground rules.</p>
        </div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Layout</p>
          <div className="flex flex-wrap gap-2">
            {LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (
              <button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-purple-600 text-white border-purple-600 shadow-md shadow-purple-200" : "bg-white text-slate-600 border-slate-200 hover:border-purple-300 hover:text-purple-700"}`}>
                <Icon size={15} /> <span>{l.label}</span> <span className={`text-[10px] font-medium ${isActive ? "text-purple-200" : "text-slate-400"}`}>{l.desc}</span>
              </button>
            ); })}
          </div>
        </div>
        <div ref={fullPageRef} style={{ fontFamily: S.font }}>
          {layout === "full" && <>{renderTitleBanner()}{renderDateHeader()}{renderLogistics()}{renderAgenda()}<table style={LT}><tbody><tr><td style={{ ...LC, width: "40%", paddingRight: "8px" }}>{renderRules()}</td><td style={{ ...LC, width: "60%", paddingLeft: "8px" }}>{renderOutputs()}</td></tr></tbody></table>{renderDebrief()}{renderFooter()}</>}
          {layout === "quick" && <>{renderTitleBanner()}{renderDateHeader()}{renderAgenda()}{renderRules()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function WorkshopFacilitationPage() {
  return (<ThemeProvider><WorkshopContent /></ThemeProvider>);
}
