"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, ClipboardList, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "structured" | "simple";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "structured", label: "Structured Agenda", desc: "Timed items + outcomes", icon: LayoutDashboard },
  { id: "simple", label: "Simple Agenda", desc: "Quick planning", icon: AlignJustify },
];

function MeetingAgendaContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("structured");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const prereadRef = useRef<HTMLDivElement>(null);
  const agendaRef = useRef<HTMLDivElement>(null);
  const outcomesRef = useRef<HTMLDivElement>(null);
  const parkingRef = useRef<HTMLDivElement>(null);

  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}>
      <tbody>
        <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${C.accent}`, textAlign: "center" as const }}>📋 MEETING AGENDA</td></tr>
        <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; The To-Do Master Template Package &nbsp;|&nbsp; Purpose-Driven Meetings</td></tr>
      </tbody>
    </table>
  );

  const renderDateHeader = () => (
    <div ref={headerRef} style={{ marginBottom: "12px" }}>
      <table style={S.tbl}>
        <tbody>
          <tr>
            <td style={{ ...S.tdLabel, width: "14%" }}>Meeting Title</td>
            <td style={{ ...S.td0, width: "36%" }}>[Meeting Name]</td>
            <td style={{ ...S.tdLabel, width: "14%" }}>Date &amp; Time</td>
            <td style={{ ...S.td0, width: "36%" }}>[MM/DD/YYYY] at [HH:MM] — [HH:MM]</td>
          </tr>
          <tr>
            <td style={S.tdLabelAlt}>Organizer</td>
            <td style={S.tdAlt}>[Name]</td>
            <td style={S.tdLabelAlt}>Location / Link</td>
            <td style={S.tdAlt}>[Room / Zoom / Teams link]</td>
          </tr>
          <tr>
            <td style={S.tdLabel}>Meeting Type</td>
            <td style={S.td0}>☐ Decision ☐ Brainstorm ☐ Status Update ☐ Planning ☐ Review ☐ 1:1</td>
            <td style={S.tdLabel}>Duration</td>
            <td style={S.td0}>[___] minutes</td>
          </tr>
          <tr>
            <td style={S.tdLabelAlt}>Attendees</td>
            <td colSpan={3} style={S.tdAlt}>[List all attendees with roles — e.g., Sarah (PM), Marcus (Dev Lead), Alex (UX)]</td>
          </tr>
          <tr>
            <td style={S.tdLabel}>Meeting Purpose</td>
            <td colSpan={3} style={S.td0}>[Why are we meeting? What decision, alignment, or outcome do we need?]</td>
          </tr>
        </tbody>
      </table>
      <CopyButton targetRef={headerRef} label="Copy Section" />
    </div>
  );

  const renderPreRead = () => (
    <div ref={prereadRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(C.secondary)}>📖 PRE-READ MATERIALS</td></tr></tbody></table>
      <CopyButton targetRef={prereadRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead>
          <tr>
            <th style={{ ...S.thSecondary, width: "5%", textAlign: "center" as const }}>#</th>
            <th style={S.thSecondary}>Document / Resource</th>
            <th style={{ ...S.thSecondary, width: "20%" }}>Link / Location</th>
            <th style={{ ...S.thSecondary, width: "12%", textAlign: "center" as const }}>Required?</th>
          </tr>
        </thead>
        <tbody>
          {[
            { doc: "[e.g., Q3 Budget Draft — Revenue Section]", link: "[SharePoint link]", req: "Required" },
            { doc: "[e.g., Sprint 12 Demo Recording]", link: "[Loom link]", req: "Optional" },
            { doc: "[e.g., Competitive Analysis Summary]", link: "[Confluence page]", req: "Required" },
            { doc: "[Add pre-read]", link: "", req: "" },
          ].map((row, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, color: C.accent }}>{i + 1}</td>
                <td style={{ ...S.td0, backgroundColor: bg }}>{row.doc}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{row.link}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}>
                  {row.req ? <span style={S.badge(row.req === "Required" ? C.badgeRedBg : C.badgeGrayBg, row.req === "Required" ? C.badgeRedFg : C.badgeGrayFg)}>{row.req}</span> : ""}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderAgenda = () => (
    <div ref={agendaRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner()}>⏱️ TIMED AGENDA</div>
      <CopyButton targetRef={agendaRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead>
          <tr>
            <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Time</th>
            <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Min</th>
            <th style={S.thPrimary}>Agenda Item</th>
            <th style={{ ...S.thPrimary, width: "12%" }}>Presenter</th>
            <th style={{ ...S.thPrimary, width: "14%", textAlign: "center" as const }}>Type</th>
            <th style={{ ...S.thPrimary, width: "20%" }}>Desired Outcome</th>
          </tr>
        </thead>
        <tbody>
          {[
            { time: "0:00", min: "5", item: "Welcome & check-in", presenter: "[Organizer]", type: "Warm-up", typeBg: C.badgeGrayBg, typeFg: C.badgeGrayFg, outcome: "Everyone is present and focused" },
            { time: "0:05", min: "15", item: "[e.g., Review Q3 budget proposal — revenue section]", presenter: "[Finance]", type: "Review", typeBg: C.badgeBlueBg, typeFg: C.badgeBlueFg, outcome: "[Alignment on revenue assumptions]" },
            { time: "0:20", min: "20", item: "[e.g., Sprint demo — v2.1 features]", presenter: "[Dev Lead]", type: "Demo", typeBg: C.badgeGreenBg, typeFg: C.badgeGreenFg, outcome: "[Stakeholder feedback captured]" },
            { time: "0:40", min: "10", item: "[e.g., Discuss launch timeline & risks]", presenter: "[PM]", type: "Decision", typeBg: C.badgeRedBg, typeFg: C.badgeRedFg, outcome: "[Go/no-go decision on launch date]" },
            { time: "0:50", min: "5", item: "Action items & next steps", presenter: "[Organizer]", type: "Wrap-up", typeBg: C.badgeGrayBg, typeFg: C.badgeGrayFg, outcome: "Clear owners and deadlines" },
            { time: "0:55", min: "5", item: "Buffer / Overflow", presenter: "—", type: "Buffer", typeBg: C.badgeGrayBg, typeFg: C.badgeGrayFg, outcome: "" },
          ].map((row, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "11px", fontWeight: 600 }}>{row.time}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "11px", fontWeight: 700, color: C.accent }}>{row.min}m</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 600 }}>{row.item}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{row.presenter}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(row.typeBg, row.typeFg)}>{row.type}</span></td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{row.outcome}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderOutcomes = () => (
    <div ref={outcomesRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(C.secondary)}>✅ DESIRED OUTCOMES CHECKLIST</td></tr></tbody></table>
      <CopyButton targetRef={outcomesRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead>
          <tr>
            <th style={{ ...S.thSecondary, width: "5%", textAlign: "center" as const }}>☐</th>
            <th style={S.thSecondary}>Outcome</th>
            <th style={{ ...S.thSecondary, width: "12%", textAlign: "center" as const }}>Achieved?</th>
          </tr>
        </thead>
        <tbody>
          {["[e.g., Budget assumptions aligned across all teams]", "[e.g., Go/no-go decision made on launch date]", "[e.g., All action items assigned with clear deadlines]", "[Add outcome]"].map((o, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "14px" }}>☐</td>
                <td style={{ ...S.td0, backgroundColor: bg }}>{o}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}>☐ Y ☐ N</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderParking = () => (
    <div ref={parkingRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner()}>🅿️ PARKING LOT</div>
      <CopyButton targetRef={parkingRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "4px" }}>Items raised but deferred. Schedule follow-ups separately.</p>
      <table style={S.tbl}>
        <thead>
          <tr>
            <th style={{ ...S.thPrimary, width: "5%", textAlign: "center" as const }}>#</th>
            <th style={S.thPrimary}>Topic</th>
            <th style={{ ...S.thPrimary, width: "14%" }}>Raised By</th>
            <th style={{ ...S.thPrimary, width: "16%" }}>Follow-Up Owner</th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 4 }).map((_, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, color: C.accent }}>{i + 1}</td>
                <td style={{ ...S.td0, backgroundColor: bg }}>{i === 0 ? "[e.g., Discuss new pricing model — needs own meeting]" : ""}&nbsp;</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>&nbsp;</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>&nbsp;</td>
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

  const renderStructured = () => (
    <>
      {renderTitleBanner()}{renderDateHeader()}{renderPreRead()}{renderAgenda()}
      <table style={LT}><tbody><tr>
        <td style={{ ...LC, width: "50%", paddingRight: "8px" }}>{renderOutcomes()}</td>
        <td style={{ ...LC, width: "50%", paddingLeft: "8px" }}>{renderParking()}</td>
      </tr></tbody></table>
      {renderFooter()}
    </>
  );

  const renderSimple = () => (
    <>{renderTitleBanner()}{renderDateHeader()}{renderAgenda()}{renderParking()}{renderFooter()}</>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-cyan-50/20">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-cyan-50 border border-cyan-100 text-cyan-700 text-xs font-semibold"><ClipboardList size={11} /> Agenda</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/todo-master" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-cyan-600 transition-colors"><ArrowLeft size={14} /> Back to To-Do Master</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-cyan-100 flex items-center justify-center"><ClipboardList size={20} className="text-cyan-600" /></div>
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900">Meeting Agenda Template</h2>
              <p className="text-xs font-medium text-cyan-600">Purpose-Driven Meetings &mdash; Every Minute Counts</p>
            </div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Structured agenda with timed items, pre-read materials, desired outcomes, and parking lot. Structured mode includes everything; Simple mode is quick agenda + parking lot.</p>
        </div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Agenda Style</p>
          <div className="flex flex-wrap gap-2">
            {LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (
              <button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-cyan-600 text-white border-cyan-600 shadow-md shadow-cyan-200" : "bg-white text-slate-600 border-slate-200 hover:border-cyan-300 hover:text-cyan-700"}`}>
                <Icon size={15} /> <span>{l.label}</span> <span className={`text-[10px] font-medium ${isActive ? "text-cyan-200" : "text-slate-400"}`}>{l.desc}</span>
              </button>
            ); })}
          </div>
        </div>
        <div ref={fullPageRef} style={{ fontFamily: S.font }}>
          {layout === "structured" && renderStructured()}
          {layout === "simple" && renderSimple()}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function MeetingAgendaPage() {
  return (<ThemeProvider><MeetingAgendaContent /></ThemeProvider>);
}
