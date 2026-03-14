"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, PenTool, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Log", desc: "All approvals + completed + tips", icon: LayoutDashboard },
  { id: "compact", label: "Quick View", desc: "Pending approvals only", icon: AlignJustify },
];

function ApprovalsLogContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const pendingRef = useRef<HTMLDivElement>(null);
  const completedRef = useRef<HTMLDivElement>(null);

  const accent = "#6366F1";

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>APPROVALS &amp; SIGNATURES LOG</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; EA / Chief of Staff Command Center &nbsp;|&nbsp; Admin, Finance &amp; Document Control</td></tr>
    </tbody></table>
  );

  const renderPending = () => (
    <div ref={pendingRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner("#DC2626")}>AWAITING EXEC APPROVAL / SIGNATURE</div>
      <CopyButton targetRef={pendingRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>What&apos;s awaiting signature, due dates, risks. Avoids missed approvals and contract delays.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={S.thPrimary}>Document / Approval</th>
          <th style={{ ...S.thPrimary, width: "10%" }}>Type</th>
          <th style={{ ...S.thPrimary, width: "10%" }}>Requested By</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Received</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Due Date</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Urgency</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Status</th>
        </tr></thead>
        <tbody>
          {[
            { doc: "[Audit engagement letter]", type: "Contract", req: "[CFO]", recv: "03/10", due: "03/17", urg: "High", uBg: C.badgeRedBg, uFg: C.badgeRedFg, s: "Overdue", sBg: C.badgeRedBg, sFg: C.badgeRedFg },
            { doc: "[Partnership term sheet — Company X]", type: "Agreement", req: "[Legal]", recv: "03/12", due: "03/18", urg: "High", uBg: C.badgeRedBg, uFg: C.badgeRedFg, s: "Pending", sBg: C.badgeAmberBg, sFg: C.badgeAmberFg },
            { doc: "[Q2 budget approval]", type: "Budget", req: "[CFO]", recv: "03/14", due: "03/20", urg: "Med", uBg: C.badgeAmberBg, uFg: C.badgeAmberFg, s: "In Review", sBg: C.badgeBlueBg, sFg: C.badgeBlueFg },
            { doc: "[New hire offer letter — Sr. Engineer]", type: "HR", req: "[CHRO]", recv: "03/13", due: "03/19", urg: "Med", uBg: C.badgeAmberBg, uFg: C.badgeAmberFg, s: "Pending", sBg: C.badgeAmberBg, sFg: C.badgeAmberFg },
            { doc: "[PR agency contract renewal]", type: "Contract", req: "[CMO]", recv: "03/08", due: "03/25", urg: "Low", uBg: C.badgeBlueBg, uFg: C.badgeBlueFg, s: "Pending", sBg: C.badgeAmberBg, sFg: C.badgeAmberFg },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 600 }}>{r.doc}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px" }}>{r.type}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px" }}>{r.req}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "9px" }}>{r.recv}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, fontSize: "10px", color: r.s === "Overdue" ? "#DC2626" : accent }}>{r.due}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.uBg, r.uFg)}>{r.urg}</span></td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.sBg, r.sFg)}>{r.s}</span></td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <table style={{ ...S.tbl, marginTop: "4px" }}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "22%" }}>Total Pending</td><td style={{ ...S.td0, fontWeight: 800, color: accent }}>[5 items]</td></tr>
        <tr><td style={S.tdLabelAlt}>Overdue</td><td style={{ ...S.tdAlt, fontWeight: 700, color: "#DC2626" }}>[1 item — audit letter needs immediate attention]</td></tr>
      </tbody></table>
    </div>
  );

  const renderCompleted = () => (
    <div ref={completedRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner("#059669")}>RECENTLY COMPLETED</div>
      <CopyButton targetRef={completedRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={S.thSecondary}>Document</th>
          <th style={{ ...S.thSecondary, width: "10%" }}>Type</th>
          <th style={{ ...S.thSecondary, width: "10%", textAlign: "center" as const }}>Signed Date</th>
          <th style={{ ...S.thSecondary, width: "15%" }}>Filed Location</th>
        </tr></thead>
        <tbody>
          {[
            { doc: "[Board resolution — Q1 dividend]", type: "Board", signed: "03/05", filed: "[SharePoint > Board]" },
            { doc: "[Office lease amendment]", type: "Contract", signed: "03/02", filed: "[SharePoint > Legal]" },
            { doc: "[Insurance policy renewal]", type: "Insurance", signed: "02/28", filed: "[SharePoint > Finance]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", textDecoration: "line-through", color: "#9CA3AF" }}>{r.doc}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px" }}>{r.type}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "10px", color: "#059669", fontWeight: 700 }}>{r.signed}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px" }}>{r.filed}</td>
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
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold"><PenTool size={11} />Approvals</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/ea-cos-command-center" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-indigo-600 transition-colors"><ArrowLeft size={14} />Back to EA/CoS Command Center</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center"><PenTool size={20} className="text-indigo-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">Approvals &amp; Signatures Log</h2><p className="text-xs font-medium text-indigo-600">Never Miss an Approval Deadline</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">What&apos;s awaiting signature, due dates, risks. Avoids missed approvals and contract delays.</p>
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
          {layout === "full" && <>{renderTitleBanner()}{renderPending()}{renderCompleted()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderPending()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function ApprovalsSignaturesLogPage() { return <ThemeProvider><ApprovalsLogContent /></ThemeProvider>; }
