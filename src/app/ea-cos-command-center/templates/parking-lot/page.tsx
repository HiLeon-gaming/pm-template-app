"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, ParkingCircle, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full View", desc: "Active + resolved + rules", icon: LayoutDashboard },
  { id: "compact", label: "Quick Capture", desc: "Active items only", icon: AlignJustify },
];

function ParkingLotContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef<HTMLDivElement>(null);
  const resolvedRef = useRef<HTMLDivElement>(null);

  const accent = "#F59E0B";

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>PARKING LOT</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; EA / Chief of Staff Command Center &nbsp;|&nbsp; Meetings Engine</td></tr>
    </tbody></table>
  );

  const renderActive = () => (
    <div ref={activeRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(accent)}>PARKED ITEMS &mdash; To Be Addressed Later</div>
      <CopyButton targetRef={activeRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>Capture off-topic items without losing them. Keeps meetings on track while honoring every contribution.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "5%", textAlign: "center" as const }}>#</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Date Added</th>
          <th style={S.thPrimary}>Item / Topic</th>
          <th style={{ ...S.thPrimary, width: "12%" }}>Raised By</th>
          <th style={{ ...S.thPrimary, width: "12%" }}>Assigned To</th>
          <th style={{ ...S.thPrimary, width: "12%", textAlign: "center" as const }}>Review By</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Status</th>
        </tr></thead>
        <tbody>
          {[
            { date: "03/10", item: "[Revisit vendor pricing for Q3 renewal]", raised: "[CFO]", assigned: "[CoS]", review: "03/20", s: "Open", sBg: C.badgeBlueBg, sFg: C.badgeBlueFg },
            { date: "03/10", item: "[Discuss team restructuring idea from all-hands]", raised: "[CEO]", assigned: "[CHRO]", review: "03/25", s: "Open", sBg: C.badgeBlueBg, sFg: C.badgeBlueFg },
            { date: "03/08", item: "[Review marketing budget reallocation]", raised: "[CMO]", assigned: "[CFO]", review: "03/18", s: "In Review", sBg: C.badgeAmberBg, sFg: C.badgeAmberFg },
            { date: "03/05", item: "[Explore partnership opportunity with Company X]", raised: "[CEO]", assigned: "[CoS]", review: "03/15", s: "Overdue", sBg: C.badgeRedBg, sFg: C.badgeRedFg },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 800, fontSize: "12px", color: accent }}>{i + 1}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "10px" }}>{r.date}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.item}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 600 }}>{r.raised}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.assigned}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, fontSize: "10px", color: accent }}>{r.review}</td>
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
      <div style={S.sectionBanner("#059669")}>RESOLVED / CLOSED ITEMS</div>
      <CopyButton targetRef={resolvedRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thSecondary, width: "10%", textAlign: "center" as const }}>Closed</th>
          <th style={S.thSecondary}>Item</th>
          <th style={{ ...S.thSecondary, width: "25%" }}>Resolution</th>
        </tr></thead>
        <tbody>
          {[
            { date: "03/07", item: "[Office lease negotiation strategy]", res: "[Decided to renew at 5% increase — signed 03/06]" },
            { date: "03/03", item: "[IT security audit timeline]", res: "[Scheduled for April — CISO confirmed]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "10px", color: "#059669", fontWeight: 700 }}>{r.date}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.item}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.res}</td>
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-amber-50/30">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-amber-500 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-100 text-amber-700 text-xs font-semibold"><ParkingCircle size={11} />Parking</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/ea-cos-command-center" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-amber-600 transition-colors"><ArrowLeft size={14} />Back to EA/CoS Command Center</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center"><ParkingCircle size={20} className="text-amber-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">Parking Lot</h2><p className="text-xs font-medium text-amber-600">Capture Distractions Without Losing Them</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Off-topic items captured for later. Keeps meetings on track while honoring every contribution.</p>
        </div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">View Mode</p>
          <div className="flex flex-wrap gap-2">
            {LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (
              <button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-amber-500 text-white border-amber-500 shadow-md shadow-amber-200" : "bg-white text-slate-600 border-slate-200 hover:border-amber-300 hover:text-amber-700"}`}>
                <Icon size={15} /><span>{l.label}</span><span className={`text-[10px] font-medium ${isActive ? "text-amber-200" : "text-slate-400"}`}>{l.desc}</span>
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
