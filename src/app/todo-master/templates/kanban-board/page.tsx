"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, Columns3, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "board" | "list";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "board", label: "Board View", desc: "4-column Kanban", icon: LayoutDashboard },
  { id: "list", label: "List View", desc: "Grouped by status", icon: AlignJustify },
];

const COLUMNS = [
  { name: "📥 TO DO", color: "#6B7280", bg: "#F3F4F6", wip: "No Limit", items: [
    { task: "[e.g., Write API documentation — Section 3]", pri: "High", priBg: "#FEE2E2", priFg: "#DC2626", owner: "[Dev]", tag: "Docs" },
    { task: "[e.g., Research competitor pricing models]", pri: "Med", priBg: "#FEF3C7", priFg: "#D97706", owner: "[PM]", tag: "Research" },
    { task: "[e.g., Set up staging environment]", pri: "Low", priBg: "#F3F4F6", priFg: "#6B7280", owner: "[DevOps]", tag: "Infra" },
    { task: "[Add task]", pri: "", priBg: "#F3F4F6", priFg: "#6B7280", owner: "", tag: "" },
  ]},
  { name: "🔨 IN PROGRESS", color: "#2563EB", bg: "#DBEAFE", wip: "WIP Limit: 3", items: [
    { task: "[e.g., Build onboarding wizard — Step 2 of 5]", pri: "High", priBg: "#FEE2E2", priFg: "#DC2626", owner: "[Frontend]", tag: "Feature" },
    { task: "[e.g., Design email notification templates]", pri: "Med", priBg: "#FEF3C7", priFg: "#D97706", owner: "[UX]", tag: "Design" },
    { task: "[Add task]", pri: "", priBg: "#F3F4F6", priFg: "#6B7280", owner: "", tag: "" },
  ]},
  { name: "👀 IN REVIEW", color: "#D97706", bg: "#FEF3C7", wip: "WIP Limit: 2", items: [
    { task: "[e.g., PR #142 — Auth module refactor]", pri: "High", priBg: "#FEE2E2", priFg: "#DC2626", owner: "[Senior Dev]", tag: "Code Review" },
    { task: "[e.g., Budget proposal — CFO review]", pri: "Med", priBg: "#FEF3C7", priFg: "#D97706", owner: "[Finance]", tag: "Approval" },
    { task: "[Add task]", pri: "", priBg: "#F3F4F6", priFg: "#6B7280", owner: "", tag: "" },
  ]},
  { name: "✅ DONE", color: "#059669", bg: "#D1FAE5", wip: "—", items: [
    { task: "[e.g., Deploy monitoring dashboard]", pri: "High", priBg: "#D1FAE5", priFg: "#059669", owner: "[DevOps]", tag: "Infra" },
    { task: "[e.g., Complete user interview synthesis]", pri: "Med", priBg: "#D1FAE5", priFg: "#059669", owner: "[UX Researcher]", tag: "Research" },
    { task: "[Add completed task]", pri: "", priBg: "#F3F4F6", priFg: "#6B7280", owner: "", tag: "" },
  ]},
];

function KanbanContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("board");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const boardRef = useRef<HTMLDivElement>(null);
  const blockersRef = useRef<HTMLDivElement>(null);

  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}>
      <tbody>
        <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${C.accent}`, textAlign: "center" as const }}>📋 KANBAN BOARD</td></tr>
        <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; The To-Do Master Template Package &nbsp;|&nbsp; To Do → In Progress → Review → Done</td></tr>
      </tbody>
    </table>
  );

  const renderDateHeader = () => (
    <div ref={headerRef} style={{ marginBottom: "12px" }}>
      <table style={S.tbl}>
        <tbody>
          <tr>
            <td style={{ ...S.tdLabel, width: "14%" }}>Project / Sprint</td>
            <td style={{ ...S.td0, width: "36%" }}>[Name]</td>
            <td style={{ ...S.tdLabel, width: "14%" }}>Date Range</td>
            <td style={{ ...S.td0, width: "36%" }}>[Start] — [End]</td>
          </tr>
          <tr>
            <td style={S.tdLabelAlt}>Board Owner</td>
            <td style={S.tdAlt}>[Name]</td>
            <td style={S.tdLabelAlt}>Sprint Goal</td>
            <td style={S.tdAlt}>[What must be Done by end of sprint?]</td>
          </tr>
        </tbody>
      </table>
      <CopyButton targetRef={headerRef} label="Copy Section" />
    </div>
  );

  const renderBoardView = () => (
    <div ref={boardRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(C.secondary)}>🗂️ KANBAN BOARD</td></tr></tbody></table>
      <CopyButton targetRef={boardRef} label="Copy Section" />
      <table style={LT}>
        <tbody>
          <tr>
            {COLUMNS.map((col, ci) => (
              <td key={ci} style={{ ...LC, width: "25%", paddingLeft: ci > 0 ? "5px" : "0", paddingRight: ci < 3 ? "5px" : "0" }}>
                <table style={S.tbl}>
                  <thead>
                    <tr>
                      <td colSpan={2} style={{
                        backgroundColor: col.bg, color: col.color,
                        padding: "10px 10px 4px", fontFamily: S.font, fontSize: "13px",
                        fontWeight: 800, border: `1.5px solid ${C.border}`,
                        borderBottom: `3px solid ${col.color}`,
                      }}>
                        {col.name}
                        <div style={{ fontSize: "9px", fontWeight: 600, marginTop: "2px", opacity: 0.7 }}>{col.wip}</div>
                      </td>
                    </tr>
                  </thead>
                  <tbody>
                    {col.items.map((item, ii) => (
                      <tr key={ii}>
                        <td style={{ ...S.td0, backgroundColor: ii % 2 === 1 ? C.rowAlt : C.white, padding: "6px 8px", fontSize: "11px" }}>
                          <div style={{ fontWeight: 600, marginBottom: "3px" }}>{item.task}</div>
                          <div style={{ display: "flex", gap: "4px", flexWrap: "wrap" as const }}>
                            {item.pri && <span style={S.badge(item.priBg, item.priFg)}>{item.pri}</span>}
                            {item.owner && <span style={{ fontSize: "9px", color: C.textMuted }}>{item.owner}</span>}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );

  const renderListView = () => (
    <div ref={boardRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(C.secondary)}>📋 TASK LIST BY STATUS</td></tr></tbody></table>
      <CopyButton targetRef={boardRef} label="Copy Section" />
      {COLUMNS.map((col, ci) => (
        <table key={ci} style={{ ...S.tbl, marginBottom: "8px" }}>
          <thead>
            <tr>
              <td colSpan={5} style={{
                backgroundColor: col.bg, color: col.color,
                padding: "8px 14px", fontFamily: S.font, fontSize: "13px",
                fontWeight: 800, border: `1.5px solid ${C.border}`,
                borderBottom: `3px solid ${col.color}`,
              }}>
                {col.name} &nbsp;<span style={{ fontSize: "10px", fontWeight: 600, opacity: 0.7 }}>({col.items.length} items | {col.wip})</span>
              </td>
            </tr>
            <tr>
              <th style={{ ...S.thSecondary, width: "5%", textAlign: "center" as const }}>☐</th>
              <th style={S.thSecondary}>Task</th>
              <th style={{ ...S.thSecondary, width: "10%", textAlign: "center" as const }}>Priority</th>
              <th style={{ ...S.thSecondary, width: "12%", textAlign: "center" as const }}>Owner</th>
              <th style={{ ...S.thSecondary, width: "10%", textAlign: "center" as const }}>Tag</th>
            </tr>
          </thead>
          <tbody>
            {col.items.map((item, ii) => {
              const isAlt = ii % 2 === 1;
              const bg = isAlt ? C.rowAlt : C.white;
              return (
                <tr key={ii}>
                  <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "14px" }}>{ci === 3 ? "☑" : "☐"}</td>
                  <td style={{ ...S.td0, backgroundColor: bg }}>{item.task}</td>
                  <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}>{item.pri ? <span style={S.badge(item.priBg, item.priFg)}>{item.pri}</span> : ""}</td>
                  <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "11px" }}>{item.owner}</td>
                  <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "10px" }}>{item.tag}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ))}
    </div>
  );

  const renderBlockers = () => (
    <div ref={blockersRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner()}>🚧 BLOCKERS &amp; DEPENDENCIES</td></tr></tbody></table>
      <CopyButton targetRef={blockersRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead>
          <tr>
            <th style={S.thPrimary}>Blocker / Dependency</th>
            <th style={{ ...S.thPrimary, width: "14%" }}>Blocking Task</th>
            <th style={{ ...S.thPrimary, width: "14%" }}>Owner</th>
            <th style={{ ...S.thPrimary, width: "12%", textAlign: "center" as const }}>Severity</th>
            <th style={{ ...S.thPrimary, width: "14%", textAlign: "center" as const }}>ETA</th>
          </tr>
        </thead>
        <tbody>
          {[
            { blocker: "[e.g., Waiting for API key from vendor]", task: "[Onboarding]", owner: "[PM]", sev: "High", sevBg: C.badgeRedBg, sevFg: C.badgeRedFg },
            { blocker: "[e.g., Design team backlogged — mockups delayed]", task: "[Email templates]", owner: "[UX Lead]", sev: "Med", sevBg: C.badgeAmberBg, sevFg: C.badgeAmberFg },
            { blocker: "[Add blocker]", task: "", owner: "", sev: "—", sevBg: C.badgeGrayBg, sevFg: C.badgeGrayFg },
          ].map((row, i) => {
            const isAlt = i % 2 === 1;
            const bg = isAlt ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg }}>{row.blocker}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{row.task}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{row.owner}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(row.sevBg, row.sevFg)}>{row.sev}</span></td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "11px" }}>[Date]</td>
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/20">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-semibold"><Columns3 size={11} /> Kanban</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/todo-master" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-blue-600 transition-colors"><ArrowLeft size={14} /> Back to To-Do Master</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center"><Columns3 size={20} className="text-blue-600" /></div>
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900">Kanban Board</h2>
              <p className="text-xs font-medium text-blue-600">To Do → In Progress → Review → Done</p>
            </div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Visual workflow board with 4 columns, WIP limits, priority flags & blockers. Board View shows the classic Kanban layout; List View groups tasks by status in a compact table.</p>
        </div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">View Mode</p>
          <div className="flex flex-wrap gap-2">
            {LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (
              <button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-200" : "bg-white text-slate-600 border-slate-200 hover:border-blue-300 hover:text-blue-700"}`}>
                <Icon size={15} /> <span>{l.label}</span> <span className={`text-[10px] font-medium ${isActive ? "text-blue-200" : "text-slate-400"}`}>{l.desc}</span>
              </button>
            ); })}
          </div>
        </div>
        <div ref={fullPageRef} style={{ fontFamily: S.font }}>
          {renderTitleBanner()}{renderDateHeader()}
          {layout === "board" ? renderBoardView() : renderListView()}
          {renderBlockers()}{renderFooter()}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function KanbanBoardPage() {
  return (<ThemeProvider><KanbanContent /></ThemeProvider>);
}
