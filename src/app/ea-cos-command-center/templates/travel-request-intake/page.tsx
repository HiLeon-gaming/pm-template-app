"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, Plane, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Form", desc: "All details + preferences + approvals", icon: LayoutDashboard },
  { id: "compact", label: "Quick Request", desc: "Key details only", icon: AlignJustify },
];

function TravelRequestContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);
  const prefsRef = useRef<HTMLDivElement>(null);

  const accent = "#EA580C";

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>TRAVEL REQUEST INTAKE</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; EA / Chief of Staff Command Center &nbsp;|&nbsp; Travel, Events &amp; Logistics</td></tr>
    </tbody></table>
  );

  const renderDetails = () => (
    <div ref={detailsRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(accent)}>TRIP DETAILS</div>
      <CopyButton targetRef={detailsRef} label="Copy Section" />
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "22%" }}>Traveler</td><td style={{ ...S.td0, fontWeight: 700 }}>[Exec Name]</td></tr>
        <tr><td style={S.tdLabelAlt}>Trip Purpose</td><td style={S.tdAlt}>[Client meeting / Conference / Board / Internal offsite]</td></tr>
        <tr><td style={S.tdLabel}>Destination(s)</td><td style={{ ...S.td0, fontWeight: 700, color: accent }}>[City, State/Country]</td></tr>
        <tr><td style={S.tdLabelAlt}>Travel Dates</td><td style={S.tdAlt}>[Depart: MM/DD — Return: MM/DD]</td></tr>
        <tr><td style={S.tdLabel}>Key Meetings / Events</td><td style={S.td0}>[List key appointments with times if known]</td></tr>
        <tr><td style={S.tdLabelAlt}>Traveling With</td><td style={S.tdAlt}>[Solo / Names of others]</td></tr>
        <tr><td style={S.tdLabel}>Budget / Cost Code</td><td style={S.td0}>[Department budget / Cost center]</td></tr>
        <tr><td style={S.tdLabelAlt}>Approval Status</td><td style={S.tdAlt}><span style={S.badge(C.badgeAmberBg, C.badgeAmberFg)}>Pending</span> / <span style={S.badge(C.badgeGreenBg, C.badgeGreenFg)}>Approved</span></td></tr>
      </tbody></table>
    </div>
  );

  const renderPrefs = () => (
    <div ref={prefsRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner("#7C3AED")}>PREFERENCES &amp; CONSTRAINTS</div>
      <CopyButton targetRef={prefsRef} label="Copy Section" />
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "22%" }}>Flight Preferences</td><td style={S.td0}>[Direct flights preferred / Window seat / Business class / Airline: [preferred]]</td></tr>
        <tr><td style={S.tdLabelAlt}>Hotel Preferences</td><td style={S.tdAlt}>[Brand preference / King bed / High floor / Near [venue] / Loyalty #: [number]]</td></tr>
        <tr><td style={S.tdLabel}>Ground Transport</td><td style={S.td0}>[Car service / Rental car / Uber / Hotel shuttle]</td></tr>
        <tr><td style={S.tdLabelAlt}>Dietary / Allergies</td><td style={S.tdAlt}>[Note for meal bookings]</td></tr>
        <tr><td style={S.tdLabel}>Special Requirements</td><td style={S.td0}>[Quiet room / Late checkout / Early departure / ADA accommodations]</td></tr>
        <tr><td style={S.tdLabelAlt}>Constraints</td><td style={{ ...S.tdAlt, color: "#DC2626", fontWeight: 600 }}>[Must arrive by 2pm for keynote / Cannot fly red-eye / No Sunday travel]</td></tr>
      </tbody></table>
      <table style={{ ...S.tbl, marginTop: "6px" }}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "22%" }}>Requested By</td><td style={S.td0}>[Name / Date]</td></tr>
        <tr><td style={S.tdLabelAlt}>Booked By</td><td style={S.tdAlt}>[EA Name / Date booked]</td></tr>
        <tr><td style={S.tdLabel}>Confirmations Sent?</td><td style={S.td0}>&#9744; Flight &nbsp;&nbsp; &#9744; Hotel &nbsp;&nbsp; &#9744; Ground &nbsp;&nbsp; &#9744; Calendar updated</td></tr>
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
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-orange-50 border border-orange-100 text-orange-700 text-xs font-semibold"><Plane size={11} />Travel</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/ea-cos-command-center" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-orange-600 transition-colors"><ArrowLeft size={14} />Back to EA/CoS Command Center</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center"><Plane size={20} className="text-orange-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">Travel Request Intake</h2><p className="text-xs font-medium text-orange-600">Destination, Purpose, Dates, Preferences</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Fast travel setup form. Captures everything the EA needs to book a perfect trip.</p>
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
          {layout === "full" && <>{renderTitleBanner()}{renderDetails()}{renderPrefs()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderDetails()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function TravelRequestIntakePage() { return <ThemeProvider><TravelRequestContent /></ThemeProvider>; }
