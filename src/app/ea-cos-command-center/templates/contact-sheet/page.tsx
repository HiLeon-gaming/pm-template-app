"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, Phone, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Sheet", desc: "All contacts + emergency + venue", icon: LayoutDashboard },
  { id: "compact", label: "Quick Contacts", desc: "Key numbers only", icon: AlignJustify },
];

function ContactSheetContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const keyRef = useRef<HTMLDivElement>(null);
  const venueRef = useRef<HTMLDivElement>(null);
  const emergencyRef = useRef<HTMLDivElement>(null);

  const accent = "#EA580C";

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>CONTACT SHEET (EMERGENCY / ON-SITE)</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; EA / Chief of Staff Command Center &nbsp;|&nbsp; Travel, Events &amp; Logistics</td></tr>
    </tbody></table>
  );

  const renderKey = () => (
    <div ref={keyRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(accent)}>KEY CONTACTS</div>
      <CopyButton targetRef={keyRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={S.thPrimary}>Name / Role</th>
          <th style={{ ...S.thPrimary, width: "20%" }}>Phone</th>
          <th style={{ ...S.thPrimary, width: "25%" }}>Email</th>
          <th style={{ ...S.thPrimary, width: "15%" }}>Notes</th>
        </tr></thead>
        <tbody>
          {[
            { name: "[EA — Your Name]", phone: "[(555) 000-0001]", email: "[ea@company.com]", notes: "[Primary contact for exec]" },
            { name: "[Chief of Staff]", phone: "[(555) 000-0002]", email: "[cos@company.com]", notes: "[Backup if EA unavailable]" },
            { name: "[Exec — CEO Name]", phone: "[(555) 000-0003]", email: "[ceo@company.com]", notes: "[Personal cell]" },
            { name: "[Spouse / Emergency]", phone: "[(555) 000-0004]", email: "[spouse@email.com]", notes: "[Emergency only]" },
            { name: "[Car Service Driver]", phone: "[(555) 000-0005]", email: "[N/A]", notes: "[Confirmation: CS-3456]" },
            { name: "[Client Contact]", phone: "[(555) 000-0006]", email: "[client@clientco.com]", notes: "[Meeting host]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 700 }}>{r.name}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 600, color: accent }}>{r.phone}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px" }}>{r.email}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px" }}>{r.notes}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderVenue = () => (
    <div ref={venueRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner("#7C3AED")}>VENUE &amp; TRAVEL CONTACTS</div>
      <CopyButton targetRef={venueRef} label="Copy Section" />
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "22%" }}>Hotel</td><td style={S.td0}>[Hotel Name] &mdash; [(555) 000-0010] &mdash; Conf#: [FS-789012]</td></tr>
        <tr><td style={S.tdLabelAlt}>Hotel Address</td><td style={S.tdAlt}>[Full address for GPS/taxi]</td></tr>
        <tr><td style={S.tdLabel}>Meeting Venue</td><td style={S.td0}>[Venue Name] &mdash; [(555) 000-0011] &mdash; [Room/Suite]</td></tr>
        <tr><td style={S.tdLabelAlt}>Venue Address</td><td style={S.tdAlt}>[Full address for GPS/taxi]</td></tr>
        <tr><td style={S.tdLabel}>Airline</td><td style={S.td0}>[Airline] &mdash; [(800) 000-0012] &mdash; Conf#: [ABCDEF]</td></tr>
        <tr><td style={S.tdLabelAlt}>Restaurant</td><td style={S.tdAlt}>[Restaurant Name] &mdash; [(555) 000-0013] &mdash; Reservation: [7:30 PM]</td></tr>
      </tbody></table>
    </div>
  );

  const renderEmergency = () => (
    <div ref={emergencyRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner("#DC2626")}>EMERGENCY INFORMATION</div>
      <CopyButton targetRef={emergencyRef} label="Copy Section" />
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "22%" }}>Local Emergency</td><td style={{ ...S.td0, fontWeight: 800, color: "#DC2626", fontSize: "13px" }}>911</td></tr>
        <tr><td style={S.tdLabelAlt}>Nearest Hospital</td><td style={S.tdAlt}>[Hospital Name] &mdash; [(555) 000-0020] &mdash; [Address]</td></tr>
        <tr><td style={S.tdLabel}>Company Security</td><td style={S.td0}>[(555) 000-0021] &mdash; 24/7 hotline</td></tr>
        <tr><td style={S.tdLabelAlt}>Travel Insurance</td><td style={S.tdAlt}>[Provider] &mdash; Policy#: [XXXX] &mdash; [(800) 000-0022]</td></tr>
        <tr><td style={S.tdLabel}>Embassy / Consulate</td><td style={S.td0}>[If international travel — address + phone]</td></tr>
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-orange-50/30">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-orange-600 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-orange-50 border border-orange-100 text-orange-700 text-xs font-semibold"><Phone size={11} />Contacts</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/ea-cos-command-center" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-orange-600 transition-colors"><ArrowLeft size={14} />Back to EA/CoS Command Center</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center"><Phone size={20} className="text-orange-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">Contact Sheet (Emergency / On-Site)</h2><p className="text-xs font-medium text-orange-600">Safety &amp; Sanity in One Page</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Hotel, airline, drivers, venue, team contacts, emergency numbers. Print or save to phone.</p>
        </div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">View Mode</p>
          <div className="flex flex-wrap gap-2">
            {LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (
              <button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-orange-600 text-white border-orange-600 shadow-md shadow-orange-200" : "bg-white text-slate-600 border-slate-200 hover:border-orange-300 hover:text-orange-700"}`}>
                <Icon size={15} /><span>{l.label}</span><span className={`text-[10px] font-medium ${isActive ? "text-orange-200" : "text-slate-400"}`}>{l.desc}</span>
              </button>
            ); })}
          </div>
        </div>
        <div ref={fullPageRef} style={{ fontFamily: S.font }}>
          {layout === "full" && <>{renderTitleBanner()}{renderKey()}{renderVenue()}{renderEmergency()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderKey()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function ContactSheetPage() { return <ThemeProvider><ContactSheetContent /></ThemeProvider>; }
