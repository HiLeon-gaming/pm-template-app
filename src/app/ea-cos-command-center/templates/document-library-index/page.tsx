"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, FolderOpen, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Library", desc: "All categories + links + update dates", icon: LayoutDashboard },
  { id: "compact", label: "Quick Index", desc: "Category list only", icon: AlignJustify },
];

function DocumentLibraryContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const libraryRef = useRef<HTMLDivElement>(null);

  const accent = "#6366F1";

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>DOCUMENT LIBRARY INDEX</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; EA / Chief of Staff Command Center &nbsp;|&nbsp; Admin, Finance &amp; Document Control</td></tr>
    </tbody></table>
  );

  const categories = [
    { cat: "Executive / Leadership", color: "#7C3AED", docs: [
      { name: "[Org Chart (Current)]", link: "[SharePoint link]", updated: "03/01", owner: "[HR]" },
      { name: "[Executive Team Bios]", link: "[SharePoint link]", updated: "02/15", owner: "[Comms]" },
      { name: "[Company Fact Sheet / One-Pager]", link: "[SharePoint link]", updated: "01/30", owner: "[Marketing]" },
      { name: "[CEO Signature Block + Headshot]", link: "[SharePoint link]", updated: "01/15", owner: "[EA]" },
    ]},
    { cat: "Board & Governance", color: "#DC2626", docs: [
      { name: "[Board Deck Template]", link: "[SharePoint link]", updated: "03/10", owner: "[CoS]" },
      { name: "[Board Calendar (Annual)]", link: "[SharePoint link]", updated: "01/05", owner: "[CoS]" },
      { name: "[Board Member Contact List]", link: "[SharePoint link]", updated: "02/20", owner: "[EA]" },
      { name: "[Corporate Bylaws]", link: "[SharePoint link]", updated: "12/01", owner: "[Legal]" },
    ]},
    { cat: "Finance & Budget", color: "#059669", docs: [
      { name: "[Annual Budget (Current FY)]", link: "[SharePoint link]", updated: "01/15", owner: "[CFO]" },
      { name: "[Expense Policy]", link: "[SharePoint link]", updated: "01/01", owner: "[Finance]" },
      { name: "[Vendor Master List]", link: "[SharePoint link]", updated: "03/05", owner: "[Procurement]" },
    ]},
    { cat: "HR & People", color: "#EA580C", docs: [
      { name: "[Employee Handbook]", link: "[SharePoint link]", updated: "01/01", owner: "[HR]" },
      { name: "[Benefits Summary]", link: "[SharePoint link]", updated: "01/01", owner: "[HR]" },
      { name: "[Onboarding Checklist]", link: "[SharePoint link]", updated: "02/10", owner: "[HR]" },
    ]},
    { cat: "Templates & SOPs", color: accent, docs: [
      { name: "[Meeting Agenda Template]", link: "[SharePoint link]", updated: "03/01", owner: "[CoS]" },
      { name: "[Travel Booking SOP]", link: "[SharePoint link]", updated: "02/15", owner: "[EA]" },
      { name: "[Exec Comms Style Guide]", link: "[SharePoint link]", updated: "01/20", owner: "[Comms]" },
    ]},
  ];

  const renderLibrary = () => (
    <div ref={libraryRef} style={{ marginBottom: "12px" }}>
      {categories.map((c, ci) => (
        <React.Fragment key={ci}>
          <div style={{ ...S.sectionBanner(c.color), marginTop: ci > 0 ? "8px" : "0" }}>{c.cat.toUpperCase()}</div>
          <table style={S.tbl}>
            <thead><tr>
              <th style={S.thPrimary}>Document Name</th>
              <th style={{ ...S.thPrimary, width: "20%" }}>Link / Location</th>
              {layout === "full" && <th style={{ ...S.thPrimary, width: "12%", textAlign: "center" as const }}>Last Updated</th>}
              {layout === "full" && <th style={{ ...S.thPrimary, width: "10%" }}>Owner</th>}
            </tr></thead>
            <tbody>
              {c.docs.map((d, di) => {
                const bg = di % 2 === 1 ? C.rowAlt : C.white;
                return (
                  <tr key={di}>
                    <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 600 }}>{d.name}</td>
                    <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", color: "#0EA5E9", textDecoration: "underline" }}>{d.link}</td>
                    {layout === "full" && <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "9px", color: accent }}>{d.updated}</td>}
                    {layout === "full" && <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px" }}>{d.owner}</td>}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </React.Fragment>
      ))}
      <CopyButton targetRef={libraryRef} label="Copy All" />
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
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold"><FolderOpen size={11} />Library</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/ea-cos-command-center" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-indigo-600 transition-colors"><ArrowLeft size={14} />Back to EA/CoS Command Center</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center"><FolderOpen size={20} className="text-indigo-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">Document Library Index</h2><p className="text-xs font-medium text-indigo-600">Every Key File in One Place</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Links to key files, decks, SOPs, org charts. Speed + consistency for the whole team.</p>
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
          {renderTitleBanner()}{renderLibrary()}{renderFooter()}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function DocumentLibraryIndexPage() { return <ThemeProvider><DocumentLibraryContent /></ThemeProvider>; }
