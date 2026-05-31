"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, CheckCircle, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Queue", desc: "Approvals + urgency tracker + tips", icon: LayoutDashboard },
  { id: "compact", label: "Quick View", desc: "Approvals table only", icon: AlignJustify },
];

function ApprovalsQueueContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const queueRef = useRef<HTMLDivElement>(null);
  const urgentRef = useRef<HTMLDivElement>(null);

  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };
  const accent = "#EC4899"; const accentDark = "#DB2777";

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>✅ APPROVALS QUEUE</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; EA / Chief of Staff Command Center &nbsp;|&nbsp; Requests &amp; Follow-Ups</td></tr>
    </tbody></table>
  );

  const renderQueue = () => (
    <div ref={queueRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accent)}>📋 ITEMS AWAITING EXEC APPROVAL</td></tr></tbody></table>
      <CopyButton targetRef={queueRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>Sign-offs, reviews, and decisions waiting for the executive. Track deadline and what&apos;s needed to approve.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "5%", textAlign: "center" as const }}>#</th>
          <th style={S.thPrimary}>Item Needing Approval</th>
          <th style={{ ...S.thPrimary, width: "12%" }}>Submitted By</th>
          <th style={{ ...S.thPrimary, width: "20%" }}>What&apos;s Needed</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Deadline</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Status</th>
        </tr></thead>
        <tbody>
          {[
            { item: "[Q2 marketing budget — $150K increase]", by: "[CMO]", need: "[Review 1-pager + sign]", due: "03/15", s: "⏳ Pending", sBg: C.badgeAmberBg, sFg: C.badgeAmberFg },
            { item: "[New hire offer letter — Senior Developer]", by: "[HR]", need: "[Review comp + approve]", due: "03/14", s: "🔴 Urgent", sBg: C.badgeRedBg, sFg: C.badgeRedFg },
            { item: "[Vendor contract renewal — SaaS tool]", by: "[Procurement]", need: "[Review terms + sign]", due: "03/18", s: "⏳ Pending", sBg: C.badgeAmberBg, sFg: C.badgeAmberFg },
            { item: "[Travel policy exception — exec offsite]", by: "[EA]", need: "[Verbal OK]", due: "03/16", s: "⏳ Pending", sBg: C.badgeAmberBg, sFg: C.badgeAmberFg },
            { item: "[Press release — Q1 results]", by: "[Comms]", need: "[Final review + approve]", due: "03/20", s: "📝 In Review", sBg: C.badgeBlueBg, sFg: C.badgeBlueFg },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 800, fontSize: "12px", color: accent }}>{i + 1}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.item}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 600 }}>{r.by}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.need}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, fontSize: "10px", color: "#DC2626" }}>{r.due}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.sBg, r.sFg)}>{r.s}</span></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderUrgent = () => (
    <div ref={urgentRef} style={{ marginBottom: "12px" }}>
      <table style={LT}><tbody><tr>
        <td style={{ ...LC, width: "50%", paddingRight: "4px" }}>
          <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner("#DC2626")}>🚨 OVERDUE / AT RISK</td></tr></tbody></table>
          <table style={S.tbl}><tbody>
            <tr><td style={{ ...S.td0, fontSize: "10px", lineHeight: "1.9", padding: "10px 14px" }}>
              &bull; <strong style={{ color: "#DC2626" }}>[Offer letter]</strong> — due tomorrow, exec hasn&apos;t reviewed yet. Flag in 1:1 today.<br />
              &bull; <strong style={{ color: "#DC2626" }}>[Vendor contract]</strong> — Legal hasn&apos;t returned redline. Escalate to Legal lead.<br />
              &bull; [ ]
            </td></tr>
          </tbody></table>
        </td>
        <td style={{ ...LC, width: "50%", paddingLeft: "4px" }}>
          <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner("#059669")}>✅ RECENTLY APPROVED</td></tr></tbody></table>
          <table style={S.tbl}><tbody>
            <tr><td style={{ ...S.td0, fontSize: "10px", lineHeight: "1.9", padding: "10px 14px" }}>
              &bull; <strong style={{ color: "#059669" }}>[Team offsite budget]</strong> — approved 03/12. Notified Operations.<br />
              &bull; <strong style={{ color: "#059669" }}>[Contractor extension]</strong> — approved 03/10. Notified Procurement.<br />
              &bull; [ ]
            </td></tr>
          </tbody></table>
        </td>
      </tr></tbody></table>
      <CopyButton targetRef={urgentRef} label="Copy Section" />
    </div>
  );

  const renderFooter = () => (
    <table style={{ ...S.tbl, marginTop: "8px" }}><tbody><tr>
      <td style={{ backgroundColor: C.primary, color: C.footerText, padding: "8px 20px", fontSize: "10px", fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.06em" }}>
        ExecNoteShop &nbsp;&bull;&nbsp; EA / Chief of Staff Command Center &nbsp;&bull;&nbsp; &copy; 2026 All Rights Reserved
      </td>
    </tr></tbody></table>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-pink-50/30">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-pink-500 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-pink-50 border border-pink-100 text-pink-700 text-xs font-semibold"><CheckCircle size={11} />Approvals</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/ea-cos-command-center" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-pink-600 transition-colors"><ArrowLeft size={14} />Back to EA/CoS Command Center</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-pink-100 flex items-center justify-center"><CheckCircle size={20} className="text-pink-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">Approvals Queue</h2><p className="text-xs font-medium text-pink-600">Sign-offs, Reviews &amp; Decisions Awaiting the Exec</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Items waiting for executive approval with deadlines, context, and what&apos;s needed. Prevents last-minute fire drills.</p>
        </div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">View Mode</p>
          <div className="flex flex-wrap gap-2">
            {LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (
              <button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-pink-500 text-white border-pink-500 shadow-md shadow-pink-200" : "bg-white text-slate-600 border-slate-200 hover:border-pink-300 hover:text-pink-700"}`}>
                <Icon size={15} /><span>{l.label}</span><span className={`text-[10px] font-medium ${isActive ? "text-pink-200" : "text-slate-400"}`}>{l.desc}</span>
              </button>
            ); })}
          </div>
        </div>
        <div ref={fullPageRef} style={{ fontFamily: S.font }}>
          {layout === "full" && <>{renderTitleBanner()}{renderQueue()}{renderUrgent()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderQueue()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function ApprovalsQueuePage() { return <ThemeProvider><ApprovalsQueueContent /></ThemeProvider>; }
