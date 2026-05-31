"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, Globe, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Notes", desc: "Contacts + follow-ups + event log", icon: LayoutDashboard },
  { id: "compact", label: "Quick Contacts", desc: "New contacts only", icon: AlignJustify },
];

function NetworkingNotesContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const contactsRef = useRef<HTMLDivElement>(null);
  const eventsRef = useRef<HTMLDivElement>(null);

  const accent = "#EF4444";

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>EXECUTIVE NETWORKING NOTES</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; EA / Chief of Staff Command Center &nbsp;|&nbsp; Stakeholders &amp; Relationships</td></tr>
    </tbody></table>
  );

  const renderContacts = () => (
    <div ref={contactsRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accent)}>NEW CONTACTS &amp; INTRODUCTIONS</td></tr></tbody></table>
      <CopyButton targetRef={contactsRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>Conferences, contacts, introductions, follow-ups. Expands value beyond operations.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Date Met</th>
          <th style={S.thPrimary}>Name &amp; Title</th>
          <th style={{ ...S.thPrimary, width: "12%" }}>Organization</th>
          <th style={{ ...S.thPrimary, width: "15%" }}>Context / Event</th>
          <th style={{ ...S.thPrimary, width: "20%" }}>Follow-Up Action</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Done?</th>
        </tr></thead>
        <tbody>
          {[
            { date: "03/12", name: "[Jane Smith, CEO of TechCo]", org: "[TechCo]", context: "[Industry Conference — keynote panel]", follow: "[Send LinkedIn connection + intro email by 03/16]", done: false },
            { date: "03/12", name: "[Mark Johnson, VP Strategy]", org: "[PartnerCorp]", context: "[Conference networking dinner]", follow: "[Schedule exploratory call — potential partnership]", done: false },
            { date: "03/10", name: "[Lisa Chen, Board Director]", org: "[Board of XYZ]", context: "[Intro from Board Chair]", follow: "[Send thank-you note + schedule coffee]", done: true },
            { date: "03/05", name: "[David Park, Investor]", org: "[Growth Fund]", context: "[Investor roundtable]", follow: "[Share company one-pager by 03/10]", done: true },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, fontSize: "10px", color: accent }}>{r.date}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 600 }}>{r.name}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px" }}>{r.org}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px" }}>{r.context}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.follow}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.done ? C.badgeGreenBg : C.badgeAmberBg, r.done ? C.badgeGreenFg : C.badgeAmberFg)}>{r.done ? "Done" : "Pending"}</span></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderEvents = () => (
    <div ref={eventsRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner("#7C3AED")}>UPCOMING NETWORKING EVENTS</td></tr></tbody></table>
      <CopyButton targetRef={eventsRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thSecondary, width: "12%", textAlign: "center" as const }}>Date</th>
          <th style={S.thSecondary}>Event</th>
          <th style={{ ...S.thSecondary, width: "15%" }}>Location</th>
          <th style={{ ...S.thSecondary, width: "25%" }}>Prep / Target Connections</th>
        </tr></thead>
        <tbody>
          {[
            { date: "04/05", event: "[Tech Leaders Summit]", loc: "[San Francisco]", prep: "[Target: CTO of CompanyA, VP of CompanyB]" },
            { date: "04/15", event: "[Board dinner — quarterly]", loc: "[Private dining]", prep: "[Review board member preferences + recent wins to share]" },
            { date: "05/01", event: "[Industry Association Gala]", loc: "[New York]", prep: "[Target: 3 potential partners from attendee list]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, fontSize: "10px", color: "#7C3AED" }}>{r.date}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 600 }}>{r.event}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px" }}>{r.loc}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.prep}</td>
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
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-50 border border-red-100 text-red-700 text-xs font-semibold"><Globe size={11} />Networking</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/ea-cos-command-center" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-red-600 transition-colors"><ArrowLeft size={14} />Back to EA/CoS Command Center</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center"><Globe size={20} className="text-red-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">Executive Networking Notes</h2><p className="text-xs font-medium text-red-600">Conferences, Contacts &amp; Follow-Ups</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Conferences, contacts, introductions, follow-ups. Expands value beyond operations.</p>
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
          {layout === "full" && <>{renderTitleBanner()}{renderContacts()}{renderEvents()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderContacts()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function NetworkingNotesPage() { return <ThemeProvider><NetworkingNotesContent /></ThemeProvider>; }
