"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, Users, LayoutDashboard, AlignJustify, Zap } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Planner", desc: "Capacity + forecast", icon: LayoutDashboard },
  { id: "compact", label: "Quick View", desc: "Capacity table only", icon: AlignJustify },
];

function CapacityPlannerContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const capacityRef = useRef<HTMLDivElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);
  const historyRef = useRef<HTMLDivElement>(null);

  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };
  const accent = "#059669"; const accentDark = "#047857";

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>👥 CAPACITY PLANNER (AVAILABILITY + FOCUS FACTOR)</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; Agile / Scrum Delivery Command Center &nbsp;|&nbsp; ⭐ All-Star &nbsp;|&nbsp; Sprint Planning</td></tr>
    </tbody></table>
  );

  const renderHeader = () => (
    <div ref={headerRef} style={{ marginBottom: "12px" }}>
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "18%" }}>Sprint</td><td style={{ ...S.td0, width: "32%" }}>[Sprint #]</td><td style={{ ...S.tdLabel, width: "18%" }}>Sprint Length</td><td style={{ ...S.td0, width: "32%" }}>[2 weeks / 10 working days]</td></tr>
        <tr><td style={S.tdLabelAlt}>Team</td><td style={S.tdAlt}>[Team Name]</td><td style={S.tdLabelAlt}>Planning Date</td><td style={S.tdAlt}>[MM/DD/YYYY]</td></tr>
      </tbody></table>
      <CopyButton targetRef={headerRef} label="Copy Section" />
    </div>
  );

  const renderCapacity = () => (
    <div ref={capacityRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(accent)}>📊 INDIVIDUAL CAPACITY</div>
      <CopyButton targetRef={capacityRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>Focus Factor = % of time actually spent on sprint work (excl. meetings, support, interruptions). Typical: 70–80%.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={S.thPrimary}>Team Member</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Role</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Total Days</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>PTO</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Training</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Support</th>
          <th style={{ ...S.thPrimary, width: "9%", textAlign: "center" as const }}>Available</th>
          <th style={{ ...S.thPrimary, width: "9%", textAlign: "center" as const }}>Focus %</th>
          <th style={{ ...S.thPrimary, width: "9%", textAlign: "center" as const }}>Effective</th>
        </tr></thead>
        <tbody>
          {[
            { name: "[Dev 1 — Sarah]", role: "Dev", total: "10", pto: "0", train: "0", sup: "0", avail: "10", focus: "80%", eff: "8.0" },
            { name: "[Dev 2 — Mike]", role: "Dev", total: "10", pto: "2", train: "0", sup: "0", avail: "8", focus: "80%", eff: "6.4" },
            { name: "[Dev 3 — Priya]", role: "Dev", total: "10", pto: "0", train: "1", sup: "0", avail: "9", focus: "80%", eff: "7.2" },
            { name: "[QA — Alex]", role: "QA", total: "10", pto: "1", train: "0", sup: "1", avail: "8", focus: "75%", eff: "6.0" },
            { name: "[UX — Jordan]", role: "Design", total: "10", pto: "0", train: "0", sup: "2", avail: "8", focus: "70%", eff: "5.6" },
            { name: "[Add member]", role: "", total: "10", pto: "", train: "", sup: "", avail: "", focus: "", eff: "" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 600, fontSize: "11px" }}>{r.name}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "10px" }}>{r.role}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "11px" }}>{r.total}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, fontSize: "11px", color: parseInt(r.pto) > 0 ? "#DC2626" : C.textMuted }}>{r.pto}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "11px", color: parseInt(r.train) > 0 ? "#F59E0B" : C.textMuted }}>{r.train}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "11px", color: parseInt(r.sup) > 0 ? "#F59E0B" : C.textMuted }}>{r.sup}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, fontSize: "12px" }}>{r.avail}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "11px" }}>{r.focus}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 800, fontSize: "13px", color: accent }}>{r.eff}</td>
              </tr>
            );
          })}
          <tr>
            <td colSpan={6} style={{ ...S.tdLabel, textAlign: "right" as const, fontWeight: 800 }}>TEAM TOTALS</td>
            <td style={{ ...S.td0, textAlign: "center" as const, fontWeight: 800, fontSize: "13px" }}>[43]</td>
            <td style={{ ...S.td0, textAlign: "center" as const, fontSize: "11px" }}>—</td>
            <td style={{ ...S.td0, textAlign: "center" as const, fontWeight: 800, fontSize: "14px", color: accent }}>[33.2]</td>
          </tr>
        </tbody>
      </table>
    </div>
  );

  const renderSummary = () => (
    <div ref={summaryRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(accentDark)}>🎯 CAPACITY RECOMMENDATION</div>
      <CopyButton targetRef={summaryRef} label="Copy Section" />
      <table style={LT}><tbody><tr>
        {[
          { label: "Effective Days", value: "[33.2]", color: C.badgeBlueBg, fg: C.badgeBlueFg },
          { label: "Avg Velocity", value: "[28 pts]", color: C.badgeGreenBg, fg: C.badgeGreenFg },
          { label: "Capacity %", value: "[86%]", color: C.badgeAmberBg, fg: C.badgeAmberFg },
          { label: "Recommended", value: "[24 pts]", color: C.badgeGreenBg, fg: C.badgeGreenFg },
        ].map((m, i) => (
          <td key={i} style={{ ...LC, width: "25%", padding: i < 3 ? "0 4px 0 0" : "0" }}>
            <table style={S.tbl}><tbody>
              <tr><td style={{ backgroundColor: m.color, color: m.fg, padding: "6px 10px", fontFamily: S.font, fontSize: "10px", fontWeight: 700, border: `1.5px solid ${C.border}`, textAlign: "center" as const, letterSpacing: "0.04em", textTransform: "uppercase" as const }}>{m.label}</td></tr>
              <tr><td style={{ ...S.td0, textAlign: "center" as const, fontWeight: 800, fontSize: "20px", padding: "10px 8px", color: C.primary }}>{m.value}</td></tr>
            </tbody></table>
          </td>
        ))}
      </tr></tbody></table>
      <table style={{ ...S.tbl, marginTop: "6px" }}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "22%" }}>Calculation</td><td style={S.td0}>[Effective days this sprint / Normal effective days] × Avg velocity = Recommended commitment</td></tr>
        <tr><td style={S.tdLabelAlt}>Adjustments</td><td style={S.tdAlt}>[e.g., -2 pts buffer for vendor dependency risk; net = 22 pts recommended]</td></tr>
      </tbody></table>
    </div>
  );

  const renderHistory = () => (
    <div ref={historyRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(accent)}>📈 CAPACITY HISTORY (TREND)</div>
      <CopyButton targetRef={historyRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thSecondary, width: "12%", textAlign: "center" as const }}>Sprint</th>
          <th style={{ ...S.thSecondary, width: "12%", textAlign: "center" as const }}>Eff. Days</th>
          <th style={{ ...S.thSecondary, width: "12%", textAlign: "center" as const }}>Committed</th>
          <th style={{ ...S.thSecondary, width: "12%", textAlign: "center" as const }}>Completed</th>
          <th style={{ ...S.thSecondary, width: "12%", textAlign: "center" as const }}>Accuracy</th>
          <th style={S.thSecondary}>Notes</th>
        </tr></thead>
        <tbody>
          {[
            { sp: "Sprint 6", ed: "38.4", com: "30", done: "30", acc: "100%", aBg: C.badgeGreenBg, aFg: C.badgeGreenFg, notes: "[Full team, no interruptions]" },
            { sp: "Sprint 7", ed: "35.2", com: "28", done: "27", acc: "96%", aBg: C.badgeGreenBg, aFg: C.badgeGreenFg, notes: "[1 dev part-time on support]" },
            { sp: "Sprint 8", ed: "33.2", com: "—", done: "—", acc: "—", aBg: C.badgeGrayBg, aFg: C.badgeGrayFg, notes: "[Current — 2 PTO days + 1 training]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, fontSize: "11px", color: accent }}>{r.sp}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "11px" }}>{r.ed}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, fontSize: "12px" }}>{r.com}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, fontSize: "12px" }}>{r.done}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.aBg, r.aFg)}>{r.acc}</span></td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.notes}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderFooter = () => (
    <table style={{ ...S.tbl, marginTop: "8px" }}><tbody><tr>
      <td style={{ backgroundColor: C.primary, color: C.footerText, padding: "8px 20px", fontSize: "10px", fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.06em" }}>
        ExecNoteShop &nbsp;&bull;&nbsp; Agile / Scrum Delivery Command Center &nbsp;&bull;&nbsp; &copy; 2026 All Rights Reserved
      </td>
    </tr></tbody></table>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50/30">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-600 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-100 text-amber-700 text-xs font-semibold"><Zap size={11} />⭐ All-Star</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/agile-command-center" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-emerald-600 transition-colors"><ArrowLeft size={14} />Back to Agile Command Center</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center"><Users size={20} className="text-emerald-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">Capacity Planner</h2><p className="text-xs font-medium text-emerald-600">⭐ All-Star &mdash; Availability + Focus Factor = Realistic Commitments</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Individual availability, focus factors, and capacity recommendation. Protects the team from overcommitment.</p>
        </div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">View Mode</p>
          <div className="flex flex-wrap gap-2">
            {LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (
              <button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-200" : "bg-white text-slate-600 border-slate-200 hover:border-emerald-300 hover:text-emerald-700"}`}>
                <Icon size={15} /><span>{l.label}</span><span className={`text-[10px] font-medium ${isActive ? "text-emerald-200" : "text-slate-400"}`}>{l.desc}</span>
              </button>
            ); })}
          </div>
        </div>
        <div ref={fullPageRef} style={{ fontFamily: S.font }}>
          {layout === "full" && <>{renderTitleBanner()}{renderHeader()}{renderCapacity()}{renderSummary()}{renderHistory()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderHeader()}{renderCapacity()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function CapacityPlannerPage() { return <ThemeProvider><CapacityPlannerContent /></ThemeProvider>; }
