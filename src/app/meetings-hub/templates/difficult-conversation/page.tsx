"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, ShieldAlert, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Prep", desc: "Framework + script + debrief", icon: LayoutDashboard },
  { id: "compact", label: "Quick Prep", desc: "Key points + script only", icon: AlignJustify },
];

function DifficultConversationContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const frameworkRef = useRef<HTMLDivElement>(null);
  const scriptRef = useRef<HTMLDivElement>(null);
  const debriefRef = useRef<HTMLDivElement>(null);

  const accent = "#D946EF"; const accentDark = "#C026D3";

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>🛡️ DIFFICULT CONVERSATION PREP</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; Meetings Hub Pro &nbsp;|&nbsp; 1:1 Meetings &nbsp;|&nbsp; Confidential</td></tr>
    </tbody></table>
  );

  const renderHeader = () => (
    <div ref={headerRef} style={{ marginBottom: "12px" }}>
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "18%" }}>Conversation With</td><td style={{ ...S.td0, width: "32%" }}>[Name]</td><td style={{ ...S.tdLabel, width: "18%" }}>Date</td><td style={{ ...S.td0, width: "32%" }}>[MM/DD/YYYY]</td></tr>
        <tr><td style={S.tdLabelAlt}>Topic</td><td style={{ ...S.tdAlt, fontWeight: 700, color: "#DC2626" }}>[Performance / Behavior / Conflict / Termination / PIP]</td><td style={S.tdLabelAlt}>Your Role</td><td style={S.tdAlt}>[Manager / HR Partner / Peer]</td></tr>
        <tr><td style={S.tdLabel}>Desired Outcome</td><td colSpan={3} style={{ ...S.td0, fontWeight: 700, color: accent }}>[What do you want to walk away with? Be specific.]</td></tr>
      </tbody></table>
      <CopyButton targetRef={headerRef} label="Copy Section" />
    </div>
  );

  const renderFramework = () => (
    <div ref={frameworkRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accent)}>🧭 PREPARATION FRAMEWORK (SBI + Intent)</td></tr></tbody></table>
      <CopyButton targetRef={frameworkRef} label="Copy Section" />
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "22%", fontWeight: 800, color: "#3B82F6" }}>S — Situation</td><td style={S.td0}>[When and where did this happen? Be specific about the context.]<br /><span style={{ fontSize: "9px", color: C.textMuted, fontStyle: "italic" }}>Example: &ldquo;In last Tuesday&apos;s team standup&hellip;&rdquo;</span></td></tr>
        <tr><td style={{ ...S.tdLabelAlt, fontWeight: 800, color: "#059669" }}>B — Behavior</td><td style={S.tdAlt}>[What specific, observable behavior did you see? No judgments or labels.]<br /><span style={{ fontSize: "9px", color: C.textMuted, fontStyle: "italic" }}>Example: &ldquo;You interrupted Sarah twice while she was presenting her update.&rdquo;</span></td></tr>
        <tr><td style={{ ...S.tdLabel, fontWeight: 800, color: "#EA580C" }}>I — Impact</td><td style={S.td0}>[What was the effect on you, the team, or the work?]<br /><span style={{ fontSize: "9px", color: C.textMuted, fontStyle: "italic" }}>Example: &ldquo;Sarah lost her train of thought and the team didn&apos;t get a clear status update.&rdquo;</span></td></tr>
        <tr><td style={{ ...S.tdLabelAlt, fontWeight: 800, color: accentDark }}>Intent</td><td style={S.tdAlt}>[What outcome do you want from this conversation?]<br /><span style={{ fontSize: "9px", color: C.textMuted, fontStyle: "italic" }}>Example: &ldquo;I want to agree on ground rules for meetings so everyone gets heard.&rdquo;</span></td></tr>
      </tbody></table>

      <table style={{ ...S.tbl, marginTop: "6px" }}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "22%" }}>Their Likely Response</td><td style={S.td0}>[What pushback or emotions do you anticipate?]</td></tr>
        <tr><td style={S.tdLabelAlt}>Your Response to That</td><td style={S.tdAlt}>[How will you respond calmly and constructively?]</td></tr>
        <tr><td style={S.tdLabel}>Worst-Case Scenario</td><td style={S.td0}>[What if they get angry, cry, or deny it? What’s your plan?]</td></tr>
        <tr><td style={S.tdLabelAlt}>HR Involvement?</td><td style={{ ...S.tdAlt, fontWeight: 600 }}>[Yes / No — If yes, who and why?]</td></tr>
      </tbody></table>
    </div>
  );

  const renderScript = () => (
    <div ref={scriptRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accentDark)}>📜 OPENING SCRIPT</td></tr></tbody></table>
      <CopyButton targetRef={scriptRef} label="Copy Section" />
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.td0, padding: "14px", fontSize: "11px", lineHeight: "1.9", fontStyle: "italic" }}>
          &ldquo;Thanks for meeting with me. I want to have an honest conversation about [topic] because I value our working relationship and I want to make sure we’re set up for success.&rdquo;<br /><br />
          &ldquo;Here’s what I observed: [Situation + Behavior]. The impact was [Impact].&rdquo;<br /><br />
          &ldquo;I want to hear your perspective. How do you see this?&rdquo;<br /><br />
          <span style={{ fontStyle: "normal", fontWeight: 700, color: accent }}>[Then: listen. Don&apos;t rush to solve. Let them speak first.]</span>
        </td></tr>
      </tbody></table>
      <table style={{ ...S.tbl, marginTop: "6px" }}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "22%" }}>Key Phrases to Use</td><td style={S.td0}>&ldquo;Help me understand&hellip;&rdquo; / &ldquo;What I need to see is&hellip;&rdquo; / &ldquo;How can I support you?&rdquo;</td></tr>
        <tr><td style={S.tdLabelAlt}>Phrases to Avoid</td><td style={{ ...S.tdAlt, color: "#DC2626" }}>&ldquo;You always&hellip;&rdquo; / &ldquo;Everyone thinks&hellip;&rdquo; / &ldquo;You need to&hellip;&rdquo; / &ldquo;This is unacceptable&rdquo;</td></tr>
      </tbody></table>
    </div>
  );

  const renderDebrief = () => (
    <div ref={debriefRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accent)}>📝 POST-CONVERSATION DEBRIEF</td></tr></tbody></table>
      <CopyButton targetRef={debriefRef} label="Copy Section" />
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "22%" }}>What happened?</td><td style={S.td0}>[Summarize the actual conversation — what was said?]</td></tr>
        <tr><td style={S.tdLabelAlt}>Their response</td><td style={S.tdAlt}>[How did they react? Receptive, defensive, emotional?]</td></tr>
        <tr><td style={S.tdLabel}>Agreements made</td><td style={S.td0}>[What did you both agree to? Be specific.]</td></tr>
        <tr><td style={S.tdLabelAlt}>Follow-up needed?</td><td style={S.tdAlt}>[Check-in date? Written summary? HR documentation?]</td></tr>
        <tr><td style={S.tdLabel}>Your reflection</td><td style={S.td0}>[What went well? What would you do differently?]</td></tr>
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
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-fuchsia-50 border border-fuchsia-100 text-fuchsia-700 text-xs font-semibold"><ShieldAlert size={11} />Confidential</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/meetings-hub" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-fuchsia-600 transition-colors"><ArrowLeft size={14} />Back to Meetings Hub Pro</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-fuchsia-100 flex items-center justify-center"><ShieldAlert size={20} className="text-fuchsia-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">Difficult Conversation Prep</h2><p className="text-xs font-medium text-fuchsia-600">SBI Framework &bull; Script &bull; Debrief</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Prepare for tough conversations with structure. SBI framework, opening script, anticipated responses, and post-conversation debrief.</p>
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
          {layout === "full" && <>{renderTitleBanner()}{renderHeader()}{renderFramework()}{renderScript()}{renderDebrief()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderHeader()}{renderFramework()}{renderScript()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function DifficultConversationPage() { return <ThemeProvider><DifficultConversationContent /></ThemeProvider>; }
