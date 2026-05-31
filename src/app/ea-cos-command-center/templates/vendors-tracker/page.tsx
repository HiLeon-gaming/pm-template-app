"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, Building2, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Tracker", desc: "Vendors + renewals + contact info", icon: LayoutDashboard },
  { id: "compact", label: "Quick List", desc: "Active vendors only", icon: AlignJustify },
];

function VendorsTrackerContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const vendorsRef = useRef<HTMLDivElement>(null);
  const renewalsRef = useRef<HTMLDivElement>(null);

  const accent = "#EF4444";

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>EXTERNAL PARTNERS / VENDORS TRACKER</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; EA / Chief of Staff Command Center &nbsp;|&nbsp; Stakeholders &amp; Relationships</td></tr>
    </tbody></table>
  );

  const renderVendors = () => (
    <div ref={vendorsRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accent)}>ACTIVE VENDORS &amp; PARTNERS</td></tr></tbody></table>
      <CopyButton targetRef={vendorsRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={S.thPrimary}>Vendor / Partner</th>
          <th style={{ ...S.thPrimary, width: "15%" }}>Service</th>
          <th style={{ ...S.thPrimary, width: "10%" }}>Key Contact</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Contract Value</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Renewal Date</th>
          <th style={{ ...S.thPrimary, width: "10%" }}>Owner</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Status</th>
        </tr></thead>
        <tbody>
          {[
            { name: "[Law Firm X]", service: "Legal Counsel", contact: "[Partner Name]", val: "[$150K/yr]", renewal: "06/30", owner: "[Legal]", s: "Active", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg },
            { name: "[IT Vendor Y]", service: "Cloud Infrastructure", contact: "[Account Mgr]", val: "[$200K/yr]", renewal: "09/01", owner: "[CTO]", s: "Active", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg },
            { name: "[PR Agency Z]", service: "Communications", contact: "[Director]", val: "[$80K/yr]", renewal: "04/15", owner: "[CMO]", s: "Renewing", sBg: C.badgeAmberBg, sFg: C.badgeAmberFg },
            { name: "[Exec Search Firm]", service: "Recruiting", contact: "[Senior Partner]", val: "[$50K retainer]", renewal: "N/A", owner: "[CHRO]", s: "Active", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg },
            { name: "[Audit Firm]", service: "Financial Audit", contact: "[Engagement Lead]", val: "[$120K/yr]", renewal: "12/31", owner: "[CFO]", s: "Active", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 700 }}>{r.name}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px" }}>{r.service}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px" }}>{r.contact}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "9px", fontWeight: 700 }}>{r.val}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, fontSize: "10px", color: accent }}>{r.renewal}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px" }}>{r.owner}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.sBg, r.sFg)}>{r.s}</span></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderRenewals = () => (
    <div ref={renewalsRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner("#D97706")}>UPCOMING RENEWALS (NEXT 90 DAYS)</td></tr></tbody></table>
      <CopyButton targetRef={renewalsRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={S.thPrimary}>Vendor</th>
          <th style={{ ...S.thPrimary, width: "12%", textAlign: "center" as const }}>Renewal Date</th>
          <th style={{ ...S.thPrimary, width: "12%", textAlign: "center" as const }}>Current Value</th>
          <th style={{ ...S.thPrimary, width: "25%" }}>Action Needed</th>
          <th style={{ ...S.thPrimary, width: "12%" }}>Owner</th>
        </tr></thead>
        <tbody>
          {[
            { name: "[PR Agency Z]", date: "04/15", val: "[$80K/yr]", action: "[Negotiate 5% reduction; review scope]", owner: "[CMO]" },
            { name: "[Law Firm X]", date: "06/30", val: "[$150K/yr]", action: "[Begin RFP process by 04/30]", owner: "[Legal]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 600 }}>{r.name}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, fontSize: "10px", color: "#D97706" }}>{r.date}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "10px", fontWeight: 600 }}>{r.val}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.action}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.owner}</td>
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-red-50/30">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-red-500 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-50 border border-red-100 text-red-700 text-xs font-semibold"><Building2 size={11} />Vendors</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/ea-cos-command-center" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-red-600 transition-colors"><ArrowLeft size={14} />Back to EA/CoS Command Center</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center"><Building2 size={20} className="text-red-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">External Partners / Vendors Tracker</h2><p className="text-xs font-medium text-red-600">Key Vendors, Renewals &amp; Current Status</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Key vendors, renewals, owner, current status. Prevents surprise contract lapses.</p>
        </div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">View Mode</p>
          <div className="flex flex-wrap gap-2">
            {LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (
              <button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-red-500 text-white border-red-500 shadow-md shadow-red-200" : "bg-white text-slate-600 border-slate-200 hover:border-red-300 hover:text-red-700"}`}>
                <Icon size={15} /><span>{l.label}</span><span className={`text-[10px] font-medium ${isActive ? "text-red-200" : "text-slate-400"}`}>{l.desc}</span>
              </button>
            ); })}
          </div>
        </div>
        <div ref={fullPageRef} style={{ fontFamily: S.font }}>
          {layout === "full" && <>{renderTitleBanner()}{renderVendors()}{renderRenewals()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderVendors()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function VendorsTrackerPage() { return <ThemeProvider><VendorsTrackerContent /></ThemeProvider>; }
