"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Layout,
  Target,
  LayoutDashboard,
  AlignJustify,
  Star,
} from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "quadrant" | "list";

const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "quadrant", label: "Quadrant Grid", desc: "Classic 2×2 matrix", icon: LayoutDashboard },
  { id: "list", label: "Action Lists", desc: "Stacked lists", icon: AlignJustify },
];

function EisenhowerContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("quadrant");

  const fullPageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const matrixRef = useRef<HTMLDivElement>(null);
  const overflowRef = useRef<HTMLDivElement>(null);
  const reviewRef = useRef<HTMLDivElement>(null);

  /* ── Layout table styles ── */
  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };

  /* ── Quadrant colors ── */
  const Q1 = { bg: C.badgeRedBg, fg: C.badgeRedFg, label: "DO FIRST", sub: "Urgent & Important", icon: "🔥", desc: "Crisis, deadlines, emergencies" };
  const Q2 = { bg: C.badgeGreenBg, fg: C.badgeGreenFg, label: "SCHEDULE", sub: "Not Urgent & Important", icon: "📅", desc: "Strategy, growth, prevention" };
  const Q3 = { bg: C.badgeAmberBg, fg: C.badgeAmberFg, label: "DELEGATE", sub: "Urgent & Not Important", icon: "👋", desc: "Interruptions, some meetings" };
  const Q4 = { bg: C.badgeGrayBg, fg: C.badgeGrayFg, label: "ELIMINATE", sub: "Not Urgent & Not Important", icon: "🗑️", desc: "Time wasters, distractions" };

  /* ═══════ SECTIONS ═══════ */

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}>
      <tbody>
        <tr>
          <td style={{
            backgroundColor: C.primary, color: C.white, padding: "16px 20px",
            fontSize: "22px", fontWeight: 800, fontFamily: S.font,
            letterSpacing: "0.04em", borderBottom: `4px solid ${C.accent}`,
            textAlign: "center" as const,
          }}>
            🎯 EISENHOWER PRIORITY MATRIX
          </td>
        </tr>
        <tr>
          <td style={{
            backgroundColor: C.secondary, color: C.white, padding: "6px 20px",
            fontSize: "11px", fontWeight: 600, fontFamily: S.font,
            textAlign: "center" as const, letterSpacing: "0.08em",
            textTransform: "uppercase" as const,
          }}>
            ExecNoteShop &nbsp;|&nbsp; The To-Do Master Template Package &nbsp;|&nbsp; Decide What Matters
          </td>
        </tr>
      </tbody>
    </table>
  );

  const renderDateHeader = () => (
    <div ref={headerRef} style={{ marginBottom: "12px" }}>
      <table style={S.tbl}>
        <tbody>
          <tr>
            <td style={{ ...S.tdLabel, width: "14%" }}>Date</td>
            <td style={{ ...S.td0, width: "36%" }}>[MM/DD/YYYY]</td>
            <td style={{ ...S.tdLabel, width: "20%" }}>Planning Horizon</td>
            <td style={{ ...S.td0, width: "30%" }}>☐ Today &nbsp; ☐ This Week &nbsp; ☐ This Month</td>
          </tr>
          <tr>
            <td style={S.tdLabelAlt}>Context</td>
            <td colSpan={3} style={S.tdAlt}>[What role or project are you prioritizing for? e.g., Work / Personal / Project Alpha]</td>
          </tr>
        </tbody>
      </table>
      <CopyButton targetRef={headerRef} label="Copy Section" />
    </div>
  );

  /* ── Helper: render one quadrant table ── */
  const renderQuadrant = (q: typeof Q1, rows: number) => (
    <table style={S.tbl}>
      {/* Quadrant header — colored banner */}
      <thead>
        <tr>
          <td colSpan={3} style={{
            backgroundColor: q.bg, color: q.fg, padding: "10px 14px",
            fontFamily: S.font, fontSize: "14px", fontWeight: 800,
            letterSpacing: "0.03em", border: `1.5px solid ${C.border}`,
          }}>
            {q.icon} &nbsp;{q.label}
            <span style={{ fontWeight: 400, fontSize: "11px", marginLeft: "8px", opacity: 0.85 }}>— {q.sub}</span>
          </td>
        </tr>
        <tr>
          <th style={{ ...S.thSecondary, width: "6%", textAlign: "center" as const }}>☐</th>
          <th style={S.thSecondary}>Task</th>
          <th style={{ ...S.thSecondary, width: "22%", textAlign: "center" as const }}>Deadline / Action</th>
        </tr>
      </thead>
      <tbody>
        {Array.from({ length: rows }).map((_, i) => {
          const isAlt = i % 2 === 1;
          const bg = isAlt ? C.rowAlt : C.white;
          return (
            <tr key={i}>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "15px" }}>☐</td>
              <td style={{ ...S.td0, backgroundColor: bg }}>{i === 0 ? `[${q.desc}]` : ""}&nbsp;</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "11px" }}>&nbsp;</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );

  /* ── Axis label row for the quadrant grid ── */
  const renderAxisLabels = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}>
      <tbody>
        <tr>
          <td style={{
            backgroundColor: C.primary, color: C.white, padding: "6px 16px",
            fontFamily: S.font, fontSize: "12px", fontWeight: 700,
            textAlign: "center" as const, letterSpacing: "0.06em",
            border: `1.5px solid ${C.borderDark}`, width: "50%",
          }}>
            ← URGENT →
          </td>
          <td style={{
            backgroundColor: C.secondary, color: C.white, padding: "6px 16px",
            fontFamily: S.font, fontSize: "12px", fontWeight: 700,
            textAlign: "center" as const, letterSpacing: "0.06em",
            border: `1.5px solid ${C.borderDark}`, width: "50%",
          }}>
            ← NOT URGENT →
          </td>
        </tr>
      </tbody>
    </table>
  );

  /* ── Matrix grid (2×2 quadrant) ── */
  const renderMatrix = () => (
    <div ref={matrixRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner()}>📊 PRIORITY MATRIX</div>
      <CopyButton targetRef={matrixRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>
        Sort every task into one of four quadrants. Be honest — most &quot;urgent&quot; items belong in Q3.
      </p>
      {renderAxisLabels()}
      {/* Row 1: IMPORTANT */}
      <table style={{ ...LT, marginBottom: "0" }}>
        <tbody>
          <tr>
            <td style={{
              ...LC, width: "4%", padding: "0",
              writingMode: "vertical-rl" as const, textOrientation: "mixed" as const,
              backgroundColor: C.labelBg, textAlign: "center" as const,
              fontWeight: 800, fontSize: "11px", letterSpacing: "0.12em",
              color: C.primary, border: `1px solid ${C.border}`,
              fontFamily: S.font,
            }}>
              I M P O R T A N T
            </td>
            <td style={{ ...LC, width: "48%", paddingRight: "6px", paddingBottom: "6px" }}>
              {renderQuadrant(Q1, 6)}
            </td>
            <td style={{ ...LC, width: "48%", paddingLeft: "6px", paddingBottom: "6px" }}>
              {renderQuadrant(Q2, 6)}
            </td>
          </tr>
        </tbody>
      </table>
      {/* Row 2: NOT IMPORTANT */}
      <table style={LT}>
        <tbody>
          <tr>
            <td style={{
              ...LC, width: "4%", padding: "0",
              writingMode: "vertical-rl" as const, textOrientation: "mixed" as const,
              backgroundColor: C.labelBgAlt, textAlign: "center" as const,
              fontWeight: 800, fontSize: "11px", letterSpacing: "0.12em",
              color: C.textMuted, border: `1px solid ${C.border}`,
              fontFamily: S.font,
            }}>
              N O T &nbsp; I M P.
            </td>
            <td style={{ ...LC, width: "48%", paddingRight: "6px" }}>
              {renderQuadrant(Q3, 5)}
            </td>
            <td style={{ ...LC, width: "48%", paddingLeft: "6px" }}>
              {renderQuadrant(Q4, 5)}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );

  /* ── Overflow Inbox ── */
  const renderOverflow = () => (
    <div ref={overflowRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(C.secondary)}>📥 UNSORTED INBOX</div>
      <CopyButton targetRef={overflowRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "4px" }}>
        Brain-dump all tasks here first, then drag them into the correct quadrant above.
      </p>
      <table style={S.tbl}>
        <thead>
          <tr>
            <th style={{ ...S.thSecondary, width: "5%", textAlign: "center" as const }}>#</th>
            <th style={S.thSecondary}>Task / Idea</th>
            <th style={{ ...S.thSecondary, width: "12%", textAlign: "center" as const }}>Urgent?</th>
            <th style={{ ...S.thSecondary, width: "12%", textAlign: "center" as const }}>Important?</th>
            <th style={{ ...S.thSecondary, width: "12%", textAlign: "center" as const }}>→ Quadrant</th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 8 }).map((_, i) => {
            const isAlt = i % 2 === 1;
            const bg = isAlt ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 600, color: C.textMuted }}>{i + 1}</td>
                <td style={{ ...S.td0, backgroundColor: bg }}>&nbsp;</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}>☐ Y &nbsp;☐ N</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}>☐ Y &nbsp;☐ N</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700 }}>Q[_]</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  /* ── Daily Review ── */
  const renderReview = () => (
    <div ref={reviewRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner()}>🔍 PRIORITIZATION REVIEW</div>
      <CopyButton targetRef={reviewRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead>
          <tr>
            <th style={{ ...S.thPrimary, width: "40%" }}>Reflection</th>
            <th style={S.thPrimary}>Response</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ ...S.tdLabel, verticalAlign: "top" as const }}>Am I spending enough time in Q2?</td>
            <td style={{ ...S.td0, height: "40px" }}>&nbsp;</td>
          </tr>
          <tr>
            <td style={{ ...S.tdLabelAlt, verticalAlign: "top" as const }}>What Q3 items can I delegate or decline?</td>
            <td style={{ ...S.tdAlt, height: "40px" }}>&nbsp;</td>
          </tr>
          <tr>
            <td style={{ ...S.tdLabel, verticalAlign: "top" as const }}>What Q4 activities should I stop entirely?</td>
            <td style={{ ...S.td0, height: "40px" }}>&nbsp;</td>
          </tr>
          <tr>
            <td style={{ ...S.tdLabelAlt, verticalAlign: "top" as const }}>How can I prevent today&apos;s Q1 fires from recurring?</td>
            <td style={{ ...S.tdAlt, height: "40px" }}>&nbsp;</td>
          </tr>
          <tr>
            <td style={{ ...S.tdLabel, fontWeight: 700, color: C.accent }}>Key insight to carry forward</td>
            <td style={{ ...S.td0, fontWeight: 600 }}>[What did you learn about your priorities today?]</td>
          </tr>
        </tbody>
      </table>
    </div>
  );

  const renderFooter = () => (
    <table style={{ ...S.tbl, marginTop: "8px" }}>
      <tbody>
        <tr>
          <td style={{
            backgroundColor: C.primary, color: C.footerText, padding: "8px 20px",
            fontSize: "10px", fontFamily: S.font, textAlign: "center" as const,
            letterSpacing: "0.06em",
          }}>
            ExecNoteShop &nbsp;&bull;&nbsp; The To-Do Master Template Package &nbsp;&bull;&nbsp; &copy; 2026 All Rights Reserved
          </td>
        </tr>
      </tbody>
    </table>
  );

  /* ═══════ LAYOUTS ═══════ */

  const renderQuadrantLayout = () => (
    <>
      {renderTitleBanner()}
      {renderDateHeader()}
      {renderMatrix()}
      {/* 2-col: Overflow | Review */}
      <table style={LT}>
        <tbody>
          <tr>
            <td style={{ ...LC, width: "55%", paddingRight: "10px" }}>{renderOverflow()}</td>
            <td style={{ ...LC, width: "45%", paddingLeft: "10px" }}>{renderReview()}</td>
          </tr>
        </tbody>
      </table>
      {renderFooter()}
    </>
  );

  const renderListLayout = () => (
    <>
      {renderTitleBanner()}
      {renderDateHeader()}
      {/* 2-col: Q1 | Q2 */}
      <table style={LT}>
        <tbody>
          <tr>
            <td style={{ ...LC, width: "50%", paddingRight: "8px" }}>
              <div style={{ marginBottom: "12px" }}>{renderQuadrant(Q1, 7)}</div>
            </td>
            <td style={{ ...LC, width: "50%", paddingLeft: "8px" }}>
              <div style={{ marginBottom: "12px" }}>{renderQuadrant(Q2, 7)}</div>
            </td>
          </tr>
        </tbody>
      </table>
      {/* 2-col: Q3 | Q4 */}
      <table style={LT}>
        <tbody>
          <tr>
            <td style={{ ...LC, width: "50%", paddingRight: "8px" }}>
              <div style={{ marginBottom: "12px" }}>{renderQuadrant(Q3, 6)}</div>
            </td>
            <td style={{ ...LC, width: "50%", paddingLeft: "8px" }}>
              <div style={{ marginBottom: "12px" }}>{renderQuadrant(Q4, 6)}</div>
            </td>
          </tr>
        </tbody>
      </table>
      {renderOverflow()}
      {renderReview()}
      {renderFooter()}
    </>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-amber-50/20">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center">
              <Layout size={18} className="text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1>
              <p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p>
            </div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-100 text-amber-700 text-xs font-semibold">
            <Target size={11} />
            Priority Master
          </span>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/todo-master" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-amber-600 transition-colors">
            <ArrowLeft size={14} />
            Back to To-Do Master
          </Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>

        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
              <Target size={20} className="text-amber-600" />
            </div>
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900">Eisenhower Priority Matrix</h2>
              <p className="text-xs font-medium text-amber-600">Decide What Matters &mdash; Do, Schedule, Delegate, Eliminate</p>
            </div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">
            The classic 4-quadrant decision framework used by Presidents and CEOs.
            Sort every task by urgency and importance, then act accordingly. Includes an
            unsorted inbox for brain-dumping before categorizing.
          </p>
        </div>

        <ThemeSwitcher />

        <div data-copy-exclude="true" className="mb-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">View Mode</p>
          <div className="flex flex-wrap gap-2">
            {LAYOUTS.map((l) => {
              const Icon = l.icon;
              const isActive = layout === l.id;
              return (
                <button key={l.id} onClick={() => setLayout(l.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${
                    isActive ? "bg-amber-600 text-white border-amber-600 shadow-md shadow-amber-200"
                      : "bg-white text-slate-600 border-slate-200 hover:border-amber-300 hover:text-amber-700"
                  }`}>
                  <Icon size={15} />
                  <span>{l.label}</span>
                  <span className={`text-[10px] font-medium ${isActive ? "text-amber-200" : "text-slate-400"}`}>{l.desc}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div ref={fullPageRef} style={{ fontFamily: S.font }}>
          {layout === "quadrant" && renderQuadrantLayout()}
          {layout === "list" && renderListLayout()}
        </div>

        <div className="flex justify-center mt-8 mb-12">
          <CopyAllButton targetRef={fullPageRef} />
        </div>
      </div>
    </div>
  );
}

export default function EisenhowerPriorityMatrixPage() {
  return (
    <ThemeProvider>
      <EisenhowerContent />
    </ThemeProvider>
  );
}
