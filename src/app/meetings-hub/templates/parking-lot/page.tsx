"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, ParkingSquare, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Tracker", desc: "Items + resolution + history", icon: LayoutDashboard },
  { id: "compact", label: "Quick List", desc: "Active items only", icon: AlignJustify },
];

function ParkingLotContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef<HTMLDivElement>(null);
  const resolvedRef = useRef<HTMLDivElement>(null);

  const accent = "#3B82F6"; const accentDark = "#2563EB";

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>🅿️ PARKING LOT</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; Meetings Hub Pro &nbsp;|&nbsp; Out-of-Scope Topics Tracker</td></tr>
    </tbody></table>
  );

  const renderActive = () => (
    <div ref={activeRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accent)}>📋 ACTIVE PARKING LOT ITEMS</td></tr></tbody></table>
      <CopyButton targetRef={activeRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>Capture distractions without derailing the current meeting. Review and assign follow-up after the meeting.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "5%", textAlign: "center" as const }}>#</th>
          <th style={S.thPrimary}>Topic / Item</th>
          <th style={{ ...S.thPrimary, width: "12%" }}>Raised By</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Date Added</th>
          <th style={{ ...S.thPrimary, width: "14%" }}>Follow-Up Owner</th>
          <th style={{ ...S.thPrimary, width: "12%", textAlign: "center" as const }}>Follow-Up By</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Status</th>
        </tr></thead>
        <tbody>
          {[
            { topic: "[Discuss team restructure — needs Sarah’s input first]", by: "[Mike]", date: "[03/05]", owner: "[You]", fu: "[03/12]", s: "Open", sBg: C.badgeAmberBg, sFg: C.badgeAmberFg },
            { topic: "[Review Q3 budget forecast — defer to monthly review]", by: "[Finance]", date: "[03/05]", owner: "[CFO]", fu: "[03/15]", s: "Open", sBg: C.badgeAmberBg, sFg: C.badgeAmberFg },
            { topic: "[New tooling proposal — needs cost analysis]", by: "[Tech Lead]", date: "[03/03]", owner: "[Tech Lead]", fu: "[03/10]", s: "In Progress", sBg: C.badgeBlueBg, sFg: C.badgeBlueFg },
            { topic: "[Customer feedback on onboarding flow]", by: "[Product]", date: "[03/01]", owner: "[UX]", fu: "[03/08]", s: "Overdue", sBg: C.badgeRedBg, sFg: C.badgeRedFg },
            { topic: "[Training budget for Q2]", by: "[You]", date: "[02/28]", owner: "[HR]", fu: "[03/07]", s: "Open", sBg: C.badgeAmberBg, sFg: C.badgeAmberFg },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 800, fontSize: "14px", color: accent }}>{i + 1}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.topic}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 600 }}>{r.by}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "10px", color: C.textMuted }}>{r.date}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 600 }}>{r.owner}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "10px", fontWeight: 700, color: accent }}>{r.fu}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.sBg, r.sFg)}>{r.s}</span></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderResolved = () => (
    <div ref={resolvedRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accentDark)}>✅ RESOLVED ITEMS (History)</td></tr></tbody></table>
      <CopyButton targetRef={resolvedRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={S.thSecondary}>Topic</th>
          <th style={{ ...S.thSecondary, width: "18%" }}>Resolution</th>
          <th style={{ ...S.thSecondary, width: "12%", textAlign: "center" as const }}>Resolved Date</th>
        </tr></thead>
        <tbody>
          {[
            { topic: "[Vendor contract renewal — approved in exec review]", res: "Approved", date: "[02/25]" },
            { topic: "[Office space planning — deferred to Q3]", res: "Deferred", date: "[02/20]" },
            { topic: "[Security audit findings — assigned to IT]", res: "In progress", date: "[02/18]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.topic}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 600 }}>{r.res}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "10px", color: C.textMuted }}>{r.date}</td>
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
        ExecNoteShop &nbsp;&bull;&nbsp; Meetings Hub Pro &nbsp;&bull;&nbsp; &copy; 2026 All Rights Reserved
      </td>
    </tr></tbody></table>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-blue-500 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-semibold"><ParkingSquare size={11} />Prep & Execution</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/meetings-hub" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-blue-600 transition-colors"><ArrowLeft size={14} />Back to Meetings Hub Pro</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center"><ParkingSquare size={20} className="text-blue-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">Parking Lot</h2><p className="text-xs font-medium text-blue-600">Out-of-Scope Topics &mdash; Capture Without Derailing</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Capture distractions and off-topic items without derailing the meeting. Track follow-up owners and resolution.</p>
        </div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">View Mode</p>
          <div className="flex flex-wrap gap-2">
            {LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (
              <button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-blue-500 text-white border-blue-500 shadow-md shadow-blue-200" : "bg-white text-slate-600 border-slate-200 hover:border-blue-300 hover:text-blue-700"}`}>
                <Icon size={15} /><span>{l.label}</span><span className={`text-[10px] font-medium ${isActive ? "text-blue-200" : "text-slate-400"}`}>{l.desc}</span>
              </button>
            ); })}
          </div>
        </div>
        <div ref={fullPageRef} style={{ fontFamily: S.font }}>
          {layout === "full" && <>{renderTitleBanner()}{renderActive()}{renderResolved()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderActive()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function ParkingLotPage() { return <ThemeProvider><ParkingLotContent /></ThemeProvider>; }
