"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, Shield, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Standards", desc: "Rules + accountability + adoption", icon: LayoutDashboard },
  { id: "compact", label: "Quick Rules", desc: "Core rules only", icon: AlignJustify },
];

function MeetingRulesContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const rulesRef = useRef<HTMLDivElement>(null);
  const accountRef = useRef<HTMLDivElement>(null);
  const adoptionRef = useRef<HTMLDivElement>(null);

  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };
  const accent = "#F59E0B"; const accentDark = "#D97706";

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>📜 MEETING RULES / STANDARDS</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; Meetings Hub Pro &nbsp;|&nbsp; Start Here</td></tr>
    </tbody></table>
  );

  const renderRules = () => (
    <div ref={rulesRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(accent)}>🎯 OUR MEETING STANDARDS</div>
      <CopyButton targetRef={rulesRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>Share this page with your team. These are the non-negotiable rules that make meetings worth everyone&apos;s time.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "5%", textAlign: "center" as const }}>#</th>
          <th style={{ ...S.thPrimary, width: "30%" }}>Rule</th>
          <th style={S.thPrimary}>What It Means</th>
          <th style={{ ...S.thPrimary, width: "12%", textAlign: "center" as const }}>Who Enforces</th>
        </tr></thead>
        <tbody>
          {[
            { rule: "Agenda Required", what: "No agenda = no meeting. Every meeting must have a written purpose and desired outcomes shared before the meeting.", who: "Organizer" },
            { rule: "Start & End On Time", what: "We respect each other\u2019s calendars. Start at :00, end at :00. No \u201Cjust 5 more minutes.\u201D", who: "Facilitator" },
            { rule: "Action Owner Required", what: "Every action item gets an owner and a due date. No \u201Csomeone should\u201D or \u201Cwe need to.\u201D", who: "Scribe" },
            { rule: "Decision Capture Required", what: "Every decision is documented with date, context, and owner. If it wasn\u2019t written down, it wasn\u2019t decided.", who: "Scribe" },
            { rule: "Parking Lot Rule", what: "Off-topic items go to the parking lot \u2014 not into the current discussion. Revisit later.", who: "Facilitator" },
            { rule: "Smallest Possible Invite List", what: "Only invite people who need to be there. Everyone else gets the recap.", who: "Organizer" },
            { rule: "No Devices for Side-Work", what: "If you\u2019re in the meeting, be in the meeting. Multitasking wastes everyone\u2019s time.", who: "Everyone" },
            { rule: "24-Hour Follow-Up", what: "Meeting recap, decisions, and action items sent within 24 hours. Period.", who: "Organizer" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 800, fontSize: "14px", color: accent }}>{i + 1}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 700, fontSize: "11px" }}>{r.rule}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.what}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "10px", fontWeight: 600 }}>{r.who}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderAccount = () => (
    <div ref={accountRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(accentDark)}>🤝 ACCOUNTABILITY MODEL</div>
      <CopyButton targetRef={accountRef} label="Copy Section" />
      <table style={LT}><tbody><tr>
        {[
          { role: "Organizer", duties: "Send agenda 24h before\nDefine purpose + outcomes\nKeep invite list lean\nSend follow-up within 24h", color: "#3B82F6" },
          { role: "Facilitator", duties: "Start/end on time\nManage parking lot\nKeep discussion on track\nCall for decisions", color: "#059669" },
          { role: "Scribe", duties: "Capture decisions\nRecord action items\nNote owners + due dates\nShare notes after", color: "#D946EF" },
        ].map((r, i) => (
          <td key={i} style={{ ...LC, width: "33.3%", padding: i < 2 ? "0 4px 0 0" : "0" }}>
            <table style={S.tbl}><tbody>
              <tr><td style={{ backgroundColor: r.color, color: "#FFFFFF", padding: "8px 10px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, textAlign: "center" as const, letterSpacing: "0.04em" }}>{r.role}</td></tr>
              <tr><td style={{ ...S.td0, fontSize: "10px", lineHeight: "1.8", padding: "8px 10px", whiteSpace: "pre-line" as const }}>
                {r.duties.split("\n").map((d, j) => <React.Fragment key={j}>{j > 0 && <br />}&bull; {d}</React.Fragment>)}
              </td></tr>
            </tbody></table>
          </td>
        ))}
      </tr></tbody></table>
    </div>
  );

  const renderAdoption = () => (
    <div ref={adoptionRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(accent)}>📈 ADOPTION CHECKLIST</div>
      <CopyButton targetRef={adoptionRef} label="Copy Section" />
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "28%" }}>[ ] Share with team</td><td style={S.td0}>Send this page to your team via email or Teams. Ask for acknowledgment.</td></tr>
        <tr><td style={S.tdLabelAlt}>[ ] Post in shared space</td><td style={S.tdAlt}>Pin this page in your team\u2019s OneNote section or Teams channel.</td></tr>
        <tr><td style={S.tdLabel}>[ ] Start enforcing gently</td><td style={S.td0}>Begin with rules #1 (agenda required) and #3 (action owner required). Add others over 2-3 weeks.</td></tr>
        <tr><td style={S.tdLabelAlt}>[ ] Monthly retro</td><td style={S.tdAlt}>Use the Team Retro (Meeting Effectiveness) template to check how well rules are being followed.</td></tr>
        <tr><td style={S.tdLabel}>[ ] Celebrate wins</td><td style={S.td0}>When a meeting runs well, say so. Positive reinforcement drives culture change.</td></tr>
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-amber-50/30">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-amber-500 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-100 text-amber-700 text-xs font-semibold"><Shield size={11} />Standards</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/meetings-hub" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-amber-600 transition-colors"><ArrowLeft size={14} />Back to Meetings Hub Pro</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center"><Shield size={20} className="text-amber-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">Meeting Rules / Standards</h2><p className="text-xs font-medium text-amber-600">Team-Wide Rules That Create Meeting Culture Change</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">8 non-negotiable rules, accountability roles, and an adoption checklist. Share with your team to change how meetings work.</p>
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
          {layout === "full" && <>{renderTitleBanner()}{renderRules()}{renderAccount()}{renderAdoption()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderRules()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function MeetingRulesPage() { return <ThemeProvider><MeetingRulesContent /></ThemeProvider>; }
