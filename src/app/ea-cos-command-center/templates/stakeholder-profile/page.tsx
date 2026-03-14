"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, User, LayoutDashboard, AlignJustify, Zap } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Profile", desc: "Bio + preferences + history + strategy", icon: LayoutDashboard },
  { id: "compact", label: "Quick Card", desc: "Key info only", icon: AlignJustify },
];

function StakeholderProfileContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const historyRef = useRef<HTMLDivElement>(null);
  const strategyRef = useRef<HTMLDivElement>(null);

  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };
  const accent = "#F59E0B";

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>STAKEHOLDER PROFILE (CRM-LITE)</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; EA / Chief of Staff Command Center &nbsp;|&nbsp; &#11088; All-Star &nbsp;|&nbsp; Meetings Engine</td></tr>
    </tbody></table>
  );

  const renderProfile = () => (
    <div ref={profileRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(accent)}>STAKEHOLDER CARD</div>
      <CopyButton targetRef={profileRef} label="Copy Section" />
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "22%" }}>Full Name</td><td style={{ ...S.td0, fontWeight: 700, fontSize: "13px" }}>[Stakeholder Name]</td></tr>
        <tr><td style={S.tdLabelAlt}>Title / Role</td><td style={S.tdAlt}>[VP of Sales / Board Member / External Partner]</td></tr>
        <tr><td style={S.tdLabel}>Organization</td><td style={S.td0}>[Company / Division / Team]</td></tr>
        <tr><td style={S.tdLabelAlt}>Email / Phone</td><td style={S.tdAlt}>[Contact info]</td></tr>
        <tr><td style={S.tdLabel}>EA / Assistant</td><td style={S.td0}>[Their EA name + contact if applicable]</td></tr>
        <tr><td style={S.tdLabelAlt}>Importance Level</td><td style={S.tdAlt}><span style={S.badge(C.badgeRedBg, C.badgeRedFg)}>Critical</span> / <span style={S.badge(C.badgeAmberBg, C.badgeAmberFg)}>High</span> / <span style={S.badge(C.badgeBlueBg, C.badgeBlueFg)}>Medium</span></td></tr>
      </tbody></table>
      <table style={{ ...S.tbl, marginTop: "4px" }}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "22%" }}>What They Care About</td><td style={S.td0}>[Revenue growth, team performance, operational efficiency]</td></tr>
        <tr><td style={S.tdLabelAlt}>Communication Preference</td><td style={S.tdAlt}>[Brief emails, no calls before 10am, prefers data over narrative]</td></tr>
        <tr><td style={S.tdLabel}>Meeting Preference</td><td style={S.td0}>[30-min max, agenda required, no surprises]</td></tr>
        <tr><td style={S.tdLabelAlt}>Personal Notes</td><td style={S.tdAlt}>[University of X alum, avid golfer, kids in college, prefers morning meetings]</td></tr>
      </tbody></table>
    </div>
  );

  const renderHistory = () => (
    <div ref={historyRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner("#0EA5E9")}>INTERACTION HISTORY</div>
      <CopyButton targetRef={historyRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Date</th>
          <th style={{ ...S.thPrimary, width: "15%" }}>Type</th>
          <th style={S.thPrimary}>Topic / Context</th>
          <th style={{ ...S.thPrimary, width: "25%" }}>Follow-Up / Next Step</th>
        </tr></thead>
        <tbody>
          {[
            { date: "03/10", type: "1:1 Meeting", topic: "[Discussed Q2 budget projections]", follow: "[Send updated forecast by 03/14]" },
            { date: "03/05", type: "Email", topic: "[Partnership proposal review]", follow: "[Waiting for legal review — due 03/12]" },
            { date: "02/28", type: "Conference", topic: "[Met at industry event — discussed collaboration]", follow: "[Schedule intro call with CEO]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "10px", fontWeight: 700, color: accent }}>{r.date}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 600 }}>{r.type}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.topic}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.follow}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderStrategy = () => (
    <div ref={strategyRef} style={{ marginBottom: "12px" }}>
      <table style={LT}><tbody><tr>
        <td style={{ ...LC, width: "50%", paddingRight: "4px" }}>
          <div style={S.sectionBanner("#059669")}>DO&apos;S</div>
          <table style={S.tbl}><tbody>
            <tr><td style={{ ...S.td0, fontSize: "10px", lineHeight: "1.9", padding: "10px 14px" }}>
              &bull; [Be direct and data-driven]<br />
              &bull; [Send agenda 24 hrs in advance]<br />
              &bull; [Acknowledge their time constraints]<br />
              &bull; [Follow up within 24 hrs]<br />
              &bull; [Remember their assistant for scheduling]
            </td></tr>
          </tbody></table>
        </td>
        <td style={{ ...LC, width: "50%", paddingLeft: "4px" }}>
          <div style={S.sectionBanner("#DC2626")}>DON&apos;TS</div>
          <table style={S.tbl}><tbody>
            <tr><td style={{ ...S.td0, fontSize: "10px", lineHeight: "1.9", padding: "10px 14px" }}>
              &bull; [Don&apos;t spring surprises in meetings]<br />
              &bull; [Don&apos;t send long narrative emails]<br />
              &bull; [Don&apos;t schedule before 10am]<br />
              &bull; [Don&apos;t bypass their EA for scheduling]<br />
              &bull; [Don&apos;t raise budget topics without data]
            </td></tr>
          </tbody></table>
        </td>
      </tr></tbody></table>
      <CopyButton targetRef={strategyRef} label="Copy Section" />
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
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-100 text-amber-700 text-xs font-semibold"><Zap size={11} />All-Star</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/ea-cos-command-center" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-amber-600 transition-colors"><ArrowLeft size={14} />Back to EA/CoS Command Center</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center"><User size={20} className="text-amber-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">Stakeholder Profile (CRM-lite)</h2><p className="text-xs font-medium text-amber-600">&#11088; All-Star &mdash; Executive Memory System</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Who they are, goals, concerns, preferences, last touch, next step. One page per key stakeholder.</p>
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
          {layout === "full" && <>{renderTitleBanner()}{renderProfile()}{renderHistory()}{renderStrategy()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderProfile()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function StakeholderProfilePage() { return <ThemeProvider><StakeholderProfileContent /></ThemeProvider>; }
