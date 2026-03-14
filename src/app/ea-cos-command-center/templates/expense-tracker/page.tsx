"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, Receipt, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Tracker", desc: "All expenses + pending + summary", icon: LayoutDashboard },
  { id: "compact", label: "Quick Log", desc: "Expense table only", icon: AlignJustify },
];

function ExpenseTrackerContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const expensesRef = useRef<HTMLDivElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);

  const accent = "#6366F1";

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>EXPENSE &amp; REIMBURSEMENT TRACKER</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; EA / Chief of Staff Command Center &nbsp;|&nbsp; Admin, Finance &amp; Document Control</td></tr>
    </tbody></table>
  );

  const renderExpenses = () => (
    <div ref={expensesRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(accent)}>EXPENSE LOG</div>
      <CopyButton targetRef={expensesRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>What&apos;s submitted, what&apos;s pending, receipts. Avoids lost reimbursements.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Date</th>
          <th style={S.thPrimary}>Description</th>
          <th style={{ ...S.thPrimary, width: "10%" }}>Category</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Amount</th>
          <th style={{ ...S.thPrimary, width: "10%" }}>Cost Center</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Receipt?</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Status</th>
        </tr></thead>
        <tbody>
          {[
            { date: "03/14", desc: "[Client dinner — Nobu LA]", cat: "Meals", amt: "$485.00", cc: "[Sales]", rcpt: true, s: "Submitted", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg },
            { date: "03/13", desc: "[Flight — JFK to LAX (AA 1234)]", cat: "Travel", amt: "$1,250.00", cc: "[Exec]", rcpt: true, s: "Approved", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg },
            { date: "03/13", desc: "[Hotel — Four Seasons LA (2 nights)]", cat: "Lodging", amt: "$980.00", cc: "[Exec]", rcpt: true, s: "Submitted", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg },
            { date: "03/12", desc: "[Car service — airport transfers]", cat: "Transport", amt: "$175.00", cc: "[Exec]", rcpt: false, s: "Pending Receipt", sBg: C.badgeAmberBg, sFg: C.badgeAmberFg },
            { date: "03/10", desc: "[Team lunch — leadership offsite]", cat: "Meals", amt: "$320.00", cc: "[HR]", rcpt: true, s: "Submitted", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg },
            { date: "03/08", desc: "[Software subscription — annual renewal]", cat: "Software", amt: "$599.00", cc: "[IT]", rcpt: true, s: "Reimbursed", sBg: C.badgeBlueBg, sFg: C.badgeBlueFg },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, fontSize: "10px", color: accent }}>{r.date}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.desc}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px" }}>{r.cat}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, fontSize: "10px" }}>{r.amt}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px" }}>{r.cc}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.rcpt ? C.badgeGreenBg : C.badgeRedBg, r.rcpt ? C.badgeGreenFg : C.badgeRedFg)}>{r.rcpt ? "Yes" : "Missing"}</span></td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.sBg, r.sFg)}>{r.s}</span></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderSummary = () => (
    <div ref={summaryRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner("#059669")}>REIMBURSEMENT SUMMARY</div>
      <CopyButton targetRef={summaryRef} label="Copy Section" />
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "22%" }}>Total Expenses This Month</td><td style={{ ...S.td0, fontWeight: 800, color: accent, fontSize: "14px" }}>$3,809.00</td></tr>
        <tr><td style={S.tdLabelAlt}>Submitted &amp; Pending</td><td style={{ ...S.tdAlt, fontWeight: 700 }}>$1,960.00 (3 items)</td></tr>
        <tr><td style={S.tdLabel}>Approved / Awaiting Payment</td><td style={{ ...S.td0, fontWeight: 700, color: "#059669" }}>$1,250.00 (1 item)</td></tr>
        <tr><td style={S.tdLabelAlt}>Reimbursed</td><td style={{ ...S.tdAlt, color: "#6B7280" }}>$599.00 (1 item)</td></tr>
        <tr><td style={S.tdLabel}>Missing Receipts</td><td style={{ ...S.td0, fontWeight: 700, color: "#DC2626" }}>1 item — $175.00 (car service)</td></tr>
        <tr><td style={S.tdLabelAlt}>Next Submission Deadline</td><td style={{ ...S.tdAlt, fontWeight: 700, color: accent }}>[MM/DD — company policy: submit within 30 days]</td></tr>
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
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold"><Receipt size={11} />Expenses</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/ea-cos-command-center" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-indigo-600 transition-colors"><ArrowLeft size={14} />Back to EA/CoS Command Center</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center"><Receipt size={20} className="text-indigo-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">Expense &amp; Reimbursement Tracker</h2><p className="text-xs font-medium text-indigo-600">No Lost Receipts, No Missed Reimbursements</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">What&apos;s submitted, what&apos;s pending, receipts. Avoids lost reimbursements.</p>
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
          {layout === "full" && <>{renderTitleBanner()}{renderExpenses()}{renderSummary()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderExpenses()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function ExpenseTrackerPage() { return <ThemeProvider><ExpenseTrackerContent /></ThemeProvider>; }
