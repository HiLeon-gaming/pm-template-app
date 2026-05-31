"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, Route, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Map", desc: "Journey + releases", icon: LayoutDashboard },
  { id: "compact", label: "Journey Only", desc: "Activities + tasks", icon: AlignJustify },
];

function StoryMappingContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const journeyRef = useRef<HTMLDivElement>(null);
  const releaseRef = useRef<HTMLDivElement>(null);
  const gapsRef = useRef<HTMLDivElement>(null);

  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };
  const accent = "#EF4444"; const accentDark = "#B91C1C";

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>🗺️ STORY MAPPING (USER JOURNEY MAP)</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; Agile / Scrum Delivery Command Center &nbsp;|&nbsp; Backlog System</td></tr>
    </tbody></table>
  );

  const renderHeader = () => (
    <div ref={headerRef} style={{ marginBottom: "12px" }}>
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "18%" }}>Product</td><td style={{ ...S.td0, width: "32%" }}>[Product Name]</td><td style={{ ...S.tdLabel, width: "18%" }}>Primary Persona</td><td style={{ ...S.td0, width: "32%" }}>[Persona Name]</td></tr>
        <tr><td style={S.tdLabelAlt}>Journey Scope</td><td style={S.tdAlt}>[e.g., Checkout flow / Onboarding / Full product]</td><td style={S.tdLabelAlt}>Last Updated</td><td style={S.tdAlt}>[MM/DD/YYYY]</td></tr>
      </tbody></table>
      <CopyButton targetRef={headerRef} label="Copy Section" />
    </div>
  );

  const activityColumn = (title: string, color: string, tasks: string[]) => (
    <table style={S.tbl}>
      <thead><tr><td style={{ backgroundColor: color, color: C.white, padding: "8px 10px", fontFamily: S.font, fontSize: "11px", fontWeight: 800, border: `1.5px solid ${C.border}`, textAlign: "center" as const }}>{title}</td></tr></thead>
      <tbody>
        {tasks.map((t, i) => (
          <tr key={i}><td style={{ ...S.td0, backgroundColor: i % 2 === 0 ? C.white : C.rowAlt, fontSize: "10px", padding: "5px 8px", textAlign: "center" as const }}>{t}</td></tr>
        ))}
      </tbody>
    </table>
  );

  const renderJourney = () => (
    <div ref={journeyRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accent)}>🚶 USER JOURNEY — ACTIVITIES &amp; TASKS</td></tr></tbody></table>
      <CopyButton targetRef={journeyRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>Top row = user activities (big steps). Below each = user tasks (smaller actions within that step). Read left to right.</p>
      <table style={LT}><tbody><tr>
        {[
          { title: "1. DISCOVER", color: "#0891B2", tasks: ["[Search for product]", "[Compare options]", "[Read reviews]", "[Visit website]", "[Add task]"] },
          { title: "2. ONBOARD", color: "#059669", tasks: ["[Create account]", "[Verify email]", "[Set preferences]", "[Tutorial/walkthrough]", "[Add task]"] },
          { title: "3. BROWSE", color: "#8B5CF6", tasks: ["[View categories]", "[Search items]", "[Filter results]", "[View item detail]", "[Add task]"] },
          { title: "4. PURCHASE", color: accentDark, tasks: ["[Add to cart]", "[Enter shipping]", "[Choose payment]", "[Confirm order]", "[Add task]"] },
          { title: "5. POST-PURCHASE", color: "#F59E0B", tasks: ["[Get confirmation]", "[Track order]", "[Receive delivery]", "[Leave review]", "[Add task]"] },
        ].map((a, i) => (
          <td key={i} style={{ ...LC, width: "20%", padding: i < 4 ? "0 3px 0 0" : "0" }}>
            {activityColumn(a.title, a.color, a.tasks)}
          </td>
        ))}
      </tr></tbody></table>
    </div>
  );

  const renderRelease = () => (
    <div ref={releaseRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accentDark)}>📦 RELEASE SLICING</td></tr></tbody></table>
      <CopyButton targetRef={releaseRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>Draw a horizontal line across the story map. Everything above the line = MVP. Below = later releases.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "14%" }}>Release</th>
          <th style={S.thPrimary}>Stories Included</th>
          <th style={{ ...S.thPrimary, width: "24%" }}>Outcome / What User Can Do</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Status</th>
        </tr></thead>
        <tbody>
          {[
            { rel: "MVP (Release 1)", stories: "[Basic account, browse, add to cart, simple checkout, email confirmation]", outcome: "[User can discover, browse, and purchase one item]", s: "Building", sBg: C.badgeAmberBg, sFg: C.badgeAmberFg },
            { rel: "Release 2", stories: "[Saved addresses, Apple Pay, order tracking, reviews]", outcome: "[User can repurchase easily and track orders]", s: "Planned", sBg: C.badgeBlueBg, sFg: C.badgeBlueFg },
            { rel: "Release 3", stories: "[Preferences, wishlists, Google Pay, SMS notifications]", outcome: "[Personalized experience with multiple payment options]", s: "Backlog", sBg: C.badgeGrayBg, sFg: C.badgeGrayFg },
            { rel: "[Add release]", stories: "", outcome: "", s: "—", sBg: C.badgeGrayBg, sFg: C.badgeGrayFg },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 700, fontSize: "12px", color: accent }}>{r.rel}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{r.stories}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{r.outcome}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.sBg, r.sFg)}>{r.s}</span></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderGaps = () => (
    <div ref={gapsRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accent)}>🔍 GAPS &amp; MISSING STORIES</td></tr></tbody></table>
      <CopyButton targetRef={gapsRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thSecondary, width: "5%", textAlign: "center" as const }}>#</th>
          <th style={{ ...S.thSecondary, width: "18%" }}>Activity</th>
          <th style={S.thSecondary}>Gap / Missing Story</th>
          <th style={{ ...S.thSecondary, width: "10%", textAlign: "center" as const }}>Priority</th>
          <th style={{ ...S.thSecondary, width: "10%", textAlign: "center" as const }}>Action</th>
        </tr></thead>
        <tbody>
          {[
            { act: "Onboard", gap: "[No password reset flow — user gets locked out]", pri: "Must", pBg: C.badgeRedBg, pFg: C.badgeRedFg, action: "Add story" },
            { act: "Purchase", gap: "[No coupon/promo code entry during checkout]", pri: "Should", pBg: C.badgeAmberBg, pFg: C.badgeAmberFg, action: "Refine" },
            { act: "Post-Purchase", gap: "[No return/refund initiation flow]", pri: "Should", pBg: C.badgeAmberBg, pFg: C.badgeAmberFg, action: "Add story" },
            { act: "[Add]", gap: "", pri: "—", pBg: C.badgeGrayBg, pFg: C.badgeGrayFg, action: "" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700 }}>{i + 1}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px", fontWeight: 600 }}>{r.act}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{r.gap}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.pBg, r.pFg)}>{r.pri}</span></td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "10px", fontWeight: 600 }}>{r.action}</td>
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
        ExecNoteShop &nbsp;&bull;&nbsp; Agile / Scrum Delivery Command Center &nbsp;&bull;&nbsp; &copy; 2026 All Rights Reserved
      </td>
    </tr></tbody></table>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-red-50/30">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-red-600 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-50 border border-red-100 text-red-700 text-xs font-semibold"><Route size={11} />Story Map</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/agile-command-center" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-red-600 transition-colors"><ArrowLeft size={14} />Back to Agile Command Center</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center"><Route size={20} className="text-red-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">Story Mapping (User Journey Map)</h2><p className="text-xs font-medium text-red-600">Visual Flow of the User Experience + Release Slicing</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Map the user journey, identify stories per activity, slice into releases, and find gaps. Prevents building random features.</p>
        </div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">View Mode</p>
          <div className="flex flex-wrap gap-2">
            {LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (
              <button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-red-600 text-white border-red-600 shadow-md shadow-red-200" : "bg-white text-slate-600 border-slate-200 hover:border-red-300 hover:text-red-700"}`}>
                <Icon size={15} /><span>{l.label}</span><span className={`text-[10px] font-medium ${isActive ? "text-red-200" : "text-slate-400"}`}>{l.desc}</span>
              </button>
            ); })}
          </div>
        </div>
        <div ref={fullPageRef} style={{ fontFamily: S.font }}>
          {layout === "full" && <>{renderTitleBanner()}{renderHeader()}{renderJourney()}{renderRelease()}{renderGaps()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderHeader()}{renderJourney()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function StoryMappingPage() { return <ThemeProvider><StoryMappingContent /></ThemeProvider>; }
