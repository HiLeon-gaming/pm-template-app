"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, Settings, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Profile", desc: "All preferences + communication + decisions", icon: LayoutDashboard },
  { id: "compact", label: "Quick Ref", desc: "Key preferences only", icon: AlignJustify },
];

function ExecPreferencesContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const commRef = useRef<HTMLDivElement>(null);
  const meetingRef = useRef<HTMLDivElement>(null);
  const decisionRef = useRef<HTMLDivElement>(null);

  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };
  const accent = "#8B5CF6"; const accentDark = "#7C3AED";

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>⚙️ EXECUTIVE PREFERENCES &amp; OPERATING STYLE</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; EA / Chief of Staff Command Center &nbsp;|&nbsp; Start Here</td></tr>
    </tbody></table>
  );

  const renderProfile = () => (
    <div ref={profileRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(accent)}>👤 EXECUTIVE PROFILE</div>
      <CopyButton targetRef={profileRef} label="Copy Section" />
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "30%" }}>Executive Name</td><td style={S.td0}>[Full Name]</td></tr>
        <tr><td style={S.tdLabelAlt}>Title / Role</td><td style={S.tdAlt}>[CEO / VP / SVP / etc.]</td></tr>
        <tr><td style={S.tdLabel}>Direct Reports</td><td style={S.td0}>[List key direct reports]</td></tr>
        <tr><td style={S.tdLabelAlt}>EA / CoS Name</td><td style={{ ...S.tdAlt, fontWeight: 700, color: accent }}>[Your Name]</td></tr>
        <tr><td style={S.tdLabel}>Last Updated</td><td style={S.td0}>[MM/DD/YYYY]</td></tr>
      </tbody></table>
    </div>
  );

  const renderComm = () => (
    <div ref={commRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner("#EC4899")}>💬 COMMUNICATION PREFERENCES</div>
      <CopyButton targetRef={commRef} label="Copy Section" />
      <table style={LT}><tbody><tr>
        <td style={{ ...LC, width: "50%", paddingRight: "4px" }}>
          <table style={S.tbl}><tbody>
            <tr><td style={{ ...S.tdLabel, width: "40%" }}>Preferred Channel</td><td style={S.td0}>[Email / Teams / Slack / Text]</td></tr>
            <tr><td style={S.tdLabelAlt}>Urgent Channel</td><td style={{ ...S.tdAlt, fontWeight: 700, color: "#DC2626" }}>[Text / Phone call]</td></tr>
            <tr><td style={S.tdLabel}>Email Style</td><td style={S.td0}>[Short bullets / detailed memos / TL;DR first]</td></tr>
            <tr><td style={S.tdLabelAlt}>Response Time Expectation</td><td style={S.tdAlt}>[Same day / 2 hours / real-time for urgent]</td></tr>
            <tr><td style={S.tdLabel}>Best Time to Reach</td><td style={S.td0}>[Early morning / after 4pm / between meetings]</td></tr>
          </tbody></table>
        </td>
        <td style={{ ...LC, width: "50%", paddingLeft: "4px" }}>
          <table style={S.tbl}><tbody>
            <tr><td style={{ backgroundColor: "#059669", color: "#FFFFFF", padding: "9px 12px", fontWeight: 700, fontSize: "12px", letterSpacing: "0.03em", textTransform: "uppercase" as const, textAlign: "center" as const, border: `1.5px solid ${C.borderDark}` }}>✅ LIKES</td></tr>
            <tr><td style={{ ...S.td0, fontSize: "10px", lineHeight: "1.9" }}>
              &bull; [Concise updates — bullet points, not paragraphs]<br />
              &bull; [Options presented with a clear recommendation]<br />
              &bull; [Proactive heads-up before problems escalate]<br />
              &bull; [Visual dashboards over long reports]
            </td></tr>
            <tr><td style={{ backgroundColor: "#DC2626", color: "#FFFFFF", padding: "9px 12px", fontWeight: 700, fontSize: "12px", letterSpacing: "0.03em", textTransform: "uppercase" as const, textAlign: "center" as const, border: `1.5px solid ${C.borderDark}` }}>❌ DISLIKES / PET PEEVES</td></tr>
            <tr><td style={{ ...S.td0, fontSize: "10px", lineHeight: "1.9" }}>
              &bull; [Long emails with no clear ask]<br />
              &bull; [Surprises in meetings — wants pre-brief]<br />
              &bull; [Being asked to make decisions without data]<br />
              &bull; [Back-to-back meetings with no buffer]
            </td></tr>
          </tbody></table>
        </td>
      </tr></tbody></table>
    </div>
  );

  const renderMeeting = () => (
    <div ref={meetingRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner("#0EA5E9")}>📅 MEETING &amp; CALENDAR PREFERENCES</div>
      <CopyButton targetRef={meetingRef} label="Copy Section" />
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "30%" }}>Preferred Meeting Length</td><td style={S.td0}>[25 min / 50 min — always end 5 min early]</td></tr>
        <tr><td style={S.tdLabelAlt}>Meeting-Free Blocks</td><td style={{ ...S.tdAlt, fontWeight: 700, color: "#0EA5E9" }}>[Tuesday AM / Friday PM / no meetings before 9am]</td></tr>
        <tr><td style={S.tdLabel}>Prep Required</td><td style={S.td0}>[Wants brief 24h before any external meeting]</td></tr>
        <tr><td style={S.tdLabelAlt}>1:1 Cadence</td><td style={S.tdAlt}>[Weekly with direct reports / biweekly with skip-levels]</td></tr>
        <tr><td style={S.tdLabel}>Travel Buffer</td><td style={S.td0}>[30 min before/after travel; 15 min between back-to-back]</td></tr>
        <tr><td style={S.tdLabelAlt}>Lunch Preference</td><td style={S.tdAlt}>[Protect 12-1pm / OK to book working lunches]</td></tr>
        <tr><td style={S.tdLabel}>End of Day</td><td style={S.td0}>[Hard stop at 5:30pm / flexible if flagged in advance]</td></tr>
      </tbody></table>
    </div>
  );

  const renderDecision = () => (
    <div ref={decisionRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(accentDark)}>🎯 DECISION-MAKING STYLE</div>
      <CopyButton targetRef={decisionRef} label="Copy Section" />
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "30%" }}>Decision Speed</td><td style={S.td0}>[Fast — give me options and a recommendation / Deliberate — needs time to think]</td></tr>
        <tr><td style={S.tdLabelAlt}>Info Format</td><td style={S.tdAlt}>[Prefers 1-pagers / loves data tables / visual thinker]</td></tr>
        <tr><td style={S.tdLabel}>Risk Tolerance</td><td style={S.td0}>[Conservative / moderate / bold]</td></tr>
        <tr><td style={S.tdLabelAlt}>Delegation Style</td><td style={S.tdAlt}>[Highly delegative — trust but verify / Hands-on — wants updates]</td></tr>
        <tr><td style={S.tdLabel}>Feedback Style</td><td style={S.td0}>[Direct and immediate / prefers private 1:1 / written feedback]</td></tr>
        <tr><td style={S.tdLabelAlt}>Stress Signals</td><td style={{ ...S.tdAlt, fontWeight: 600, color: "#DC2626" }}>[Gets quiet / sends short emails / reschedules meetings]</td></tr>
      </tbody></table>
      <table style={{ ...S.tbl, marginTop: "6px" }}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "30%" }}>Personal Notes</td><td style={{ ...S.td0, fontSize: "10px", lineHeight: "1.8" }}>[Any other preferences, quirks, or things to remember. E.g., &ldquo;Always has coffee before 9am calls,&rdquo; &ldquo;Prefers window seat on flights,&rdquo; &ldquo;Allergic to shellfish for dinner bookings.&rdquo;]</td></tr>
      </tbody></table>
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50/30">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-purple-600 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-purple-50 border border-purple-100 text-purple-700 text-xs font-semibold"><Settings size={11} />Profile</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/ea-cos-command-center" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-purple-600 transition-colors"><ArrowLeft size={14} />Back to EA/CoS Command Center</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center"><Settings size={20} className="text-purple-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">Executive Preferences &amp; Operating Style</h2><p className="text-xs font-medium text-purple-600">The &ldquo;User Manual&rdquo; for Your Executive</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Meeting preferences, communication style, decision-making approach, pet peeves, and personal notes. Huge time saver.</p>
        </div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">View Mode</p>
          <div className="flex flex-wrap gap-2">
            {LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (
              <button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-purple-600 text-white border-purple-600 shadow-md shadow-purple-200" : "bg-white text-slate-600 border-slate-200 hover:border-purple-300 hover:text-purple-700"}`}>
                <Icon size={15} /><span>{l.label}</span><span className={`text-[10px] font-medium ${isActive ? "text-purple-200" : "text-slate-400"}`}>{l.desc}</span>
              </button>
            ); })}
          </div>
        </div>
        <div ref={fullPageRef} style={{ fontFamily: S.font }}>
          {layout === "full" && <>{renderTitleBanner()}{renderProfile()}{renderComm()}{renderMeeting()}{renderDecision()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderProfile()}{renderComm()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function ExecPreferencesPage() { return <ThemeProvider><ExecPreferencesContent /></ThemeProvider>; }
