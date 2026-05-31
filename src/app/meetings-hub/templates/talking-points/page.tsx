"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, MessageSquare, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Prep", desc: "Messages + concerns + outcomes + notes", icon: LayoutDashboard },
  { id: "compact", label: "Quick Prep", desc: "Key points only", icon: AlignJustify },
];

function TalkingPointsContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const pointsRef = useRef<HTMLDivElement>(null);
  const strategyRef = useRef<HTMLDivElement>(null);

  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };
  const accent = "#3B82F6"; const accentDark = "#2563EB";

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>💬 TALKING POINTS BUILDER</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; Meetings Hub Pro &nbsp;|&nbsp; For Leaders</td></tr>
    </tbody></table>
  );

  const renderHeader = () => (
    <div ref={headerRef} style={{ marginBottom: "12px" }}>
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "18%" }}>Meeting</td><td style={{ ...S.td0, width: "32%" }}>[Title / Context]</td><td style={{ ...S.tdLabel, width: "18%" }}>Date</td><td style={{ ...S.td0, width: "32%" }}>[MM/DD/YYYY]</td></tr>
        <tr><td style={S.tdLabelAlt}>Audience</td><td style={S.tdAlt}>[Who are you speaking to?]</td><td style={S.tdLabelAlt}>Your Role</td><td style={S.tdAlt}>[Presenter / Decision-maker / Advisor]</td></tr>
        <tr><td style={S.tdLabel}>Desired Outcome</td><td colSpan={3} style={{ ...S.td0, fontWeight: 700, color: accent }}>[What do you want to walk away with? e.g., Approval, alignment, decision]</td></tr>
      </tbody></table>
      <CopyButton targetRef={headerRef} label="Copy Section" />
    </div>
  );

  const renderPoints = () => (
    <div ref={pointsRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accent)}>🎯 KEY TALKING POINTS</td></tr></tbody></table>
      <CopyButton targetRef={pointsRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "5%", textAlign: "center" as const }}>#</th>
          <th style={{ ...S.thPrimary, width: "25%" }}>Point / Topic</th>
          <th style={S.thPrimary}>What to Say (Key Messages)</th>
          <th style={{ ...S.thPrimary, width: "15%" }}>Supporting Data</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Time</th>
        </tr></thead>
        <tbody>
          {[
            { point: "[Project status update]", say: "[We are on track for the Q2 milestone. 3 of 5 deliverables complete. No blockers.]", data: "[Sprint dashboard]", time: "3 min" },
            { point: "[Budget ask]", say: "[We need $120K for a 6-month contractor to keep the timeline. ROI: prevents 4-week delay worth $200K.]", data: "[Cost analysis]", time: "5 min" },
            { point: "[Risk escalation]", say: "[API dependency is at risk. If no response by Friday, we will miss the integration window.]", data: "[RAID log]", time: "3 min" },
            { point: "[Team recognition]", say: "[Sarah’s team delivered the customer onboarding flow 2 days early. Recommend a shout-out.]", data: "[Sprint review]", time: "2 min" },
            { point: "[Next steps / ask]", say: "[I need your approval on the contractor hire today and a decision on the API escalation path by Friday.]", data: "[—]", time: "2 min" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 800, fontSize: "14px", color: accent }}>{i + 1}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 600, fontSize: "11px" }}>{r.point}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.say}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", color: C.textMuted }}>{r.data}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, fontSize: "10px", color: accent }}>{r.time}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderStrategy = () => (
    <div ref={strategyRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accentDark)}>🧭 PREPARATION STRATEGY</td></tr></tbody></table>
      <CopyButton targetRef={strategyRef} label="Copy Section" />
      <table style={LT}><tbody><tr>
        <td style={{ ...LC, width: "50%", paddingRight: "4px" }}>
          <table style={S.tbl}><tbody>
            <tr><td style={{ ...S.thSecondary, textAlign: "center" as const }}>Concerns to Address</td></tr>
            <tr><td style={{ ...S.td0, fontSize: "10px", lineHeight: "1.8", padding: "8px 10px" }}>
              &bull; [What objections might come up?]<br />
              &bull; [What questions should you prepare for?]<br />
              &bull; [What’s the worst-case scenario they’ll raise?]<br />
              &bull; [How will you respond?]
            </td></tr>
          </tbody></table>
        </td>
        <td style={{ ...LC, width: "50%", paddingLeft: "4px" }}>
          <table style={S.tbl}><tbody>
            <tr><td style={{ ...S.thSecondary, textAlign: "center" as const }}>Tone &amp; Approach</td></tr>
            <tr><td style={{ ...S.td0, fontSize: "10px", lineHeight: "1.8", padding: "8px 10px" }}>
              &bull; [Confident but open to feedback]<br />
              &bull; [Data-driven, not emotional]<br />
              &bull; [Lead with outcomes, not activities]<br />
              &bull; [End with a clear ask]
            </td></tr>
          </tbody></table>
        </td>
      </tr></tbody></table>
      <table style={{ ...S.tbl, marginTop: "6px" }}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "22%" }}>Post-Meeting Notes</td><td style={S.td0}>[What actually happened? Did you get your desired outcome? What to follow up on?]</td></tr>
      </tbody></table>
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
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-semibold"><MessageSquare size={11} />For Leaders</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/meetings-hub" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-blue-600 transition-colors"><ArrowLeft size={14} />Back to Meetings Hub Pro</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center"><MessageSquare size={20} className="text-blue-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">Talking Points Builder</h2><p className="text-xs font-medium text-blue-600">For Leaders &mdash; Prepare What to Say</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Key messages, concerns, supporting data, and desired outcomes. Especially useful for leaders preparing for high-stakes meetings.</p>
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
          {layout === "full" && <>{renderTitleBanner()}{renderHeader()}{renderPoints()}{renderStrategy()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderHeader()}{renderPoints()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function TalkingPointsPage() { return <ThemeProvider><TalkingPointsContent /></ThemeProvider>; }
