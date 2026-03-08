"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, Inbox, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "capture" | "process";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "capture", label: "Rapid Capture", desc: "Dump everything fast", icon: LayoutDashboard },
  { id: "process", label: "Process & Sort", desc: "Categorize + prioritize", icon: AlignJustify },
];

function BrainDumpContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("capture");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const dumpRef = useRef<HTMLDivElement>(null);
  const sortRef = useRef<HTMLDivElement>(null);
  const processRef = useRef<HTMLDivElement>(null);

  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}>
      <tbody>
        <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${C.accent}`, textAlign: "center" as const }}>🧠 BRAIN DUMP / INBOX CAPTURE</td></tr>
        <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; The To-Do Master Template Package &nbsp;|&nbsp; Get It Out of Your Head</td></tr>
      </tbody>
    </table>
  );

  const renderDateHeader = () => (
    <div ref={headerRef} style={{ marginBottom: "12px" }}>
      <table style={S.tbl}>
        <tbody>
          <tr>
            <td style={{ ...S.tdLabel, width: "14%" }}>Date</td>
            <td style={{ ...S.td0, width: "20%" }}>[MM/DD/YYYY]</td>
            <td style={{ ...S.tdLabel, width: "14%" }}>Time</td>
            <td style={{ ...S.td0, width: "16%" }}>[HH:MM]</td>
            <td style={{ ...S.tdLabel, width: "12%" }}>Trigger</td>
            <td style={{ ...S.td0, width: "24%" }}>☐ Weekly Review ☐ Overwhelmed ☐ Before Planning ☐ Spontaneous</td>
          </tr>
          <tr>
            <td style={S.tdLabelAlt}>Current State</td>
            <td colSpan={5} style={S.tdAlt}>☐ 🤯 Overwhelmed ☐ 😵‍💫 Scattered ☐ 🤔 Lots on my mind ☐ 😌 Routine capture</td>
          </tr>
        </tbody>
      </table>
      <CopyButton targetRef={headerRef} label="Copy Section" />
    </div>
  );

  const renderRapidCapture = () => (
    <div ref={dumpRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner()}>📥 RAPID CAPTURE — DUMP EVERYTHING</div>
      <CopyButton targetRef={dumpRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "4px" }}>
        Write everything floating in your head — tasks, ideas, worries, commitments, random thoughts. Don&apos;t filter, don&apos;t organize. Just dump. Process later.
      </p>
      <table style={S.tbl}>
        <thead>
          <tr>
            <th style={{ ...S.thPrimary, width: "5%", textAlign: "center" as const }}>#</th>
            <th style={S.thPrimary}>Thought / Task / Idea / Commitment</th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 25 }).map((_, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, color: C.accent, fontSize: "11px" }}>{i + 1}</td>
                <td style={{ ...S.td0, backgroundColor: bg, height: "24px" }}>
                  {i === 0 ? "[e.g., Need to follow up with Sarah on the budget proposal]" : ""}
                  {i === 1 ? "[e.g., Idea: automate the weekly report generation]" : ""}
                  {i === 2 ? "[e.g., Dentist appointment — reschedule to next week]" : ""}
                  {i === 3 ? "[e.g., Feeling anxious about the Q4 deadline — break it down]" : ""}
                  {i === 4 ? "[e.g., Read that article about OKR best practices]" : ""}
                  &nbsp;
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const CATEGORIES = [
    { name: "🎯 ACTION ITEMS (Do it / Delegate it)", color: "#DC2626", bg: "#FEE2E2", desc: "Tasks that need doing — add to your task list" },
    { name: "📅 CALENDAR / APPOINTMENTS", color: "#2563EB", bg: "#DBEAFE", desc: "Things that go on your calendar" },
    { name: "💡 IDEAS & SOMEDAY/MAYBE", color: "#D97706", bg: "#FEF3C7", desc: "Not now, but worth remembering" },
    { name: "📋 PROJECTS (Multi-step)", color: "#059669", bg: "#D1FAE5", desc: "Things that need more than one step" },
    { name: "🗑️ TRASH / LET GO", color: "#6B7280", bg: "#F3F4F6", desc: "Not worth your energy — delete" },
    { name: "⏳ WAITING ON SOMEONE", color: "#7C3AED", bg: "#EDE9FE", desc: "Blocked — you need someone else" },
  ];

  const renderSortBuckets = () => (
    <div ref={sortRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(C.secondary)}>🗂️ SORT INTO BUCKETS</div>
      <CopyButton targetRef={sortRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "4px" }}>
        Go through each item above and sort it into one of these categories. Then process each bucket into your system.
      </p>
      <table style={LT}>
        <tbody>
          <tr>
            <td style={{ ...LC, width: "50%", paddingRight: "5px" }}>
              {CATEGORIES.slice(0, 3).map((cat, ci) => (
                <table key={ci} style={{ ...S.tbl, marginBottom: "6px" }}>
                  <thead>
                    <tr>
                      <td colSpan={2} style={{
                        backgroundColor: cat.bg, color: cat.color,
                        padding: "8px 12px", fontFamily: S.font, fontSize: "12px",
                        fontWeight: 800, border: `1.5px solid ${C.border}`,
                        borderBottom: `3px solid ${cat.color}`,
                      }}>
                        {cat.name}
                        <div style={{ fontSize: "9px", fontWeight: 500, marginTop: "1px", opacity: 0.8 }}>{cat.desc}</div>
                      </td>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.from({ length: 4 }).map((_, i) => (
                      <tr key={i}>
                        <td style={{ ...S.td0, backgroundColor: i % 2 === 1 ? C.rowAlt : C.white, height: "22px", fontSize: "11px" }}>&nbsp;</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ))}
            </td>
            <td style={{ ...LC, width: "50%", paddingLeft: "5px" }}>
              {CATEGORIES.slice(3).map((cat, ci) => (
                <table key={ci} style={{ ...S.tbl, marginBottom: "6px" }}>
                  <thead>
                    <tr>
                      <td colSpan={2} style={{
                        backgroundColor: cat.bg, color: cat.color,
                        padding: "8px 12px", fontFamily: S.font, fontSize: "12px",
                        fontWeight: 800, border: `1.5px solid ${C.border}`,
                        borderBottom: `3px solid ${cat.color}`,
                      }}>
                        {cat.name}
                        <div style={{ fontSize: "9px", fontWeight: 500, marginTop: "1px", opacity: 0.8 }}>{cat.desc}</div>
                      </td>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.from({ length: 4 }).map((_, i) => (
                      <tr key={i}>
                        <td style={{ ...S.td0, backgroundColor: i % 2 === 1 ? C.rowAlt : C.white, height: "22px", fontSize: "11px" }}>&nbsp;</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ))}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );

  const renderProcessChecklist = () => (
    <div ref={processRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner()}>✅ PROCESSING CHECKLIST</div>
      <CopyButton targetRef={processRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead>
          <tr>
            <th style={{ ...S.thPrimary, width: "5%", textAlign: "center" as const }}>☐</th>
            <th style={S.thPrimary}>Processing Step</th>
            <th style={{ ...S.thPrimary, width: "12%", textAlign: "center" as const }}>Done</th>
          </tr>
        </thead>
        <tbody>
          {[
            "All items captured — nothing left in my head",
            "Each item sorted into a bucket",
            "Action items added to my task list with due dates",
            "Calendar items added to my calendar",
            "Projects broken into next actions",
            "Waiting-on items logged with who and when",
            "Someday/maybe items stored in ideas list",
            "Trash items deleted — let them go",
          ].map((step, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "14px" }}>☐</td>
                <td style={{ ...S.td0, backgroundColor: bg }}>{step}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}>☐ Y ☐ N</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <table style={{ ...S.tbl, marginTop: "6px" }}>
        <tbody>
          <tr>
            <td style={{ ...S.tdLabel, width: "30%" }}>Post-dump state</td>
            <td style={S.td0}>☐ 😌 Clear ☐ 🙂 Better ☐ 😐 Needs more processing</td>
          </tr>
          <tr>
            <td style={S.tdLabelAlt}>Items captured</td>
            <td style={S.tdAlt}>[___] total &nbsp;&nbsp; → Action: [___] &nbsp;&nbsp; Calendar: [___] &nbsp;&nbsp; Ideas: [___] &nbsp;&nbsp; Trash: [___]</td>
          </tr>
        </tbody>
      </table>
    </div>
  );

  const renderFooter = () => (
    <table style={{ ...S.tbl, marginTop: "8px" }}>
      <tbody><tr><td style={{ backgroundColor: C.primary, color: C.footerText, padding: "8px 20px", fontSize: "10px", fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.06em" }}>ExecNoteShop &nbsp;&bull;&nbsp; The To-Do Master Template Package &nbsp;&bull;&nbsp; &copy; 2026 All Rights Reserved</td></tr></tbody>
    </table>
  );

  const renderCaptureLayout = () => (
    <>{renderTitleBanner()}{renderDateHeader()}{renderRapidCapture()}{renderProcessChecklist()}{renderFooter()}</>
  );

  const renderProcessLayout = () => (
    <>{renderTitleBanner()}{renderDateHeader()}{renderRapidCapture()}{renderSortBuckets()}{renderProcessChecklist()}{renderFooter()}</>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50/20">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-teal-50 border border-teal-100 text-teal-700 text-xs font-semibold"><Inbox size={11} /> Brain Dump</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/todo-master" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-teal-600 transition-colors"><ArrowLeft size={14} /> Back to To-Do Master</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-teal-100 flex items-center justify-center"><Inbox size={20} className="text-teal-600" /></div>
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900">Brain Dump / Inbox Capture</h2>
              <p className="text-xs font-medium text-teal-600">Get It Out of Your Head &mdash; Capture &bull; Sort &bull; Process</p>
            </div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Rapid capture template for thoughts, ideas, tasks & commitments. Rapid Capture is a simple numbered dump + processing checklist; Process & Sort adds color-coded sorting buckets (GTD-inspired).</p>
        </div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Capture Mode</p>
          <div className="flex flex-wrap gap-2">
            {LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (
              <button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-teal-600 text-white border-teal-600 shadow-md shadow-teal-200" : "bg-white text-slate-600 border-slate-200 hover:border-teal-300 hover:text-teal-700"}`}>
                <Icon size={15} /> <span>{l.label}</span> <span className={`text-[10px] font-medium ${isActive ? "text-teal-200" : "text-slate-400"}`}>{l.desc}</span>
              </button>
            ); })}
          </div>
        </div>
        <div ref={fullPageRef} style={{ fontFamily: S.font }}>
          {layout === "capture" && renderCaptureLayout()}
          {layout === "process" && renderProcessLayout()}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function BrainDumpPage() {
  return (<ThemeProvider><BrainDumpContent /></ThemeProvider>);
}
