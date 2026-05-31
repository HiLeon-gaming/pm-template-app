"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, Users, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Guide", desc: "Questions + notes + follow-up", icon: LayoutDashboard },
  { id: "compact", label: "Quick Guide", desc: "Questions only", icon: AlignJustify },
];

function SkipLevelContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const questionsRef = useRef<HTMLDivElement>(null);
  const notesRef = useRef<HTMLDivElement>(null);
  const followupRef = useRef<HTMLDivElement>(null);

  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };
  const accent = "#D946EF"; const accentDark = "#C026D3";

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>👥 SKIP-LEVEL 1:1</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; Meetings Hub Pro &nbsp;|&nbsp; 1:1 Meetings</td></tr>
    </tbody></table>
  );

  const renderHeader = () => (
    <div ref={headerRef} style={{ marginBottom: "12px" }}>
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "18%" }}>Skip-Level With</td><td style={{ ...S.td0, width: "32%" }}>[Name — their manager’s direct report]</td><td style={{ ...S.tdLabel, width: "18%" }}>Date</td><td style={{ ...S.td0, width: "32%" }}>[MM/DD/YYYY]</td></tr>
        <tr><td style={S.tdLabelAlt}>Their Manager</td><td style={S.tdAlt}>[Name — your direct report]</td><td style={S.tdLabelAlt}>Cadence</td><td style={{ ...S.tdAlt, fontWeight: 700, color: accent }}>[Quarterly / Monthly]</td></tr>
        <tr><td style={S.tdLabel}>Role / Team</td><td style={S.td0}>[Title — Team Name]</td><td style={S.tdLabel}>Duration</td><td style={S.td0}>[30 minutes]</td></tr>
      </tbody></table>
      <CopyButton targetRef={headerRef} label="Copy Section" />
    </div>
  );

  const renderQuestions = () => (
    <div ref={questionsRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accent)}>💬 CONVERSATION GUIDE</td></tr></tbody></table>
      <CopyButton targetRef={questionsRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>Choose 4-6 questions per session. Rotate them across sessions. The goal is to listen, not interrogate.</p>
      <table style={LT}><tbody><tr>
        {[
          { title: "🏢 About the Team", questions: ["How’s the team doing overall?", "What’s working well on your team?", "What would you change if you could?", "Do you feel supported by your manager?", "Is the workload manageable?"], color: "#3B82F6" },
          { title: "🎯 About the Work", questions: ["What are you most excited about right now?", "What’s been the most frustrating recently?", "Do you have the tools and resources you need?", "Is anything blocking your best work?", "What’s one thing we could improve?"], color: "#059669" },
          { title: "🌱 About Growth", questions: ["Do you feel you’re growing in your role?", "What skills would you like to develop?", "Do you see a clear career path here?", "Is there anything I can do to help your career?", "What would make this job even better?"], color: accentDark },
        ].map((s, i) => (
          <td key={i} style={{ ...LC, width: "33.3%", padding: i < 2 ? "0 4px 0 0" : "0" }}>
            <table style={S.tbl}><tbody>
              <tr><td style={{ backgroundColor: s.color, color: "#FFFFFF", padding: "8px 10px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, textAlign: "center" as const }}>{s.title}</td></tr>
              {s.questions.map((q, j) => (
                <tr key={j}><td style={{ ...(j % 2 === 0 ? S.td0 : S.tdAlt), fontSize: "10px", padding: "5px 10px" }}>&bull; {q}</td></tr>
              ))}
            </tbody></table>
          </td>
        ))}
      </tr></tbody></table>
    </div>
  );

  const renderNotes = () => (
    <div ref={notesRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accentDark)}>📝 SESSION NOTES</td></tr></tbody></table>
      <CopyButton targetRef={notesRef} label="Copy Section" />
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "22%" }}>Questions Asked</td><td style={S.td0}>[Which questions did you use?]</td></tr>
        <tr><td style={S.tdLabelAlt}>Key Themes</td><td style={S.tdAlt}>[What patterns or themes emerged?]</td></tr>
        <tr><td style={S.tdLabel}>Concerns Raised</td><td style={S.td0}>[Any red flags, frustrations, or risks?]</td></tr>
        <tr><td style={S.tdLabelAlt}>Positive Signals</td><td style={S.tdAlt}>[What’s going well? Recognition-worthy moments?]</td></tr>
        <tr><td style={S.tdLabel}>Their Manager’s Impact</td><td style={S.td0}>[How do they feel about their direct manager? Any coaching needed?]</td></tr>
        <tr><td style={S.tdLabelAlt}>Overall Mood</td><td style={{ ...S.tdAlt, fontWeight: 700, color: accent }}>[😊 Positive / 😐 Neutral / 😟 Concerned / 🚩 Red Flag]</td></tr>
      </tbody></table>
    </div>
  );

  const renderFollowup = () => (
    <div ref={followupRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accent)}>✅ FOLLOW-UP ACTIONS</td></tr></tbody></table>
      <CopyButton targetRef={followupRef} label="Copy Section" />
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "22%" }}>Share with manager?</td><td style={S.td0}>[What to share with their direct manager — be thoughtful about confidentiality]</td></tr>
        <tr><td style={S.tdLabelAlt}>Action for you</td><td style={S.tdAlt}>[What will you do as a result of this conversation?]</td></tr>
        <tr><td style={S.tdLabel}>Coaching needed?</td><td style={S.td0}>[Does the direct manager need coaching or support based on this feedback?]</td></tr>
        <tr><td style={S.tdLabelAlt}>Next skip-level</td><td style={{ ...S.tdAlt, fontWeight: 700, color: accent }}>[Schedule: MM/DD/YYYY]</td></tr>
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-fuchsia-50/30">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-fuchsia-500 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-fuchsia-50 border border-fuchsia-100 text-fuchsia-700 text-xs font-semibold"><Users size={11} />Skip-Level</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/meetings-hub" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-fuchsia-600 transition-colors"><ArrowLeft size={14} />Back to Meetings Hub Pro</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-fuchsia-100 flex items-center justify-center"><Users size={20} className="text-fuchsia-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">Skip-Level 1:1</h2><p className="text-xs font-medium text-fuchsia-600">Connect With Your Manager&apos;s Direct Reports</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Conversation guide, session notes, and follow-up actions. Builds trust and gives you a pulse on the organization.</p>
        </div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">View Mode</p>
          <div className="flex flex-wrap gap-2">
            {LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (
              <button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-fuchsia-500 text-white border-fuchsia-500 shadow-md shadow-fuchsia-200" : "bg-white text-slate-600 border-slate-200 hover:border-fuchsia-300 hover:text-fuchsia-700"}`}>
                <Icon size={15} /><span>{l.label}</span><span className={`text-[10px] font-medium ${isActive ? "text-fuchsia-200" : "text-slate-400"}`}>{l.desc}</span>
              </button>
            ); })}
          </div>
        </div>
        <div ref={fullPageRef} style={{ fontFamily: S.font }}>
          {layout === "full" && <>{renderTitleBanner()}{renderHeader()}{renderQuestions()}{renderNotes()}{renderFollowup()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderHeader()}{renderQuestions()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function SkipLevelPage() { return <ThemeProvider><SkipLevelContent /></ThemeProvider>; }
