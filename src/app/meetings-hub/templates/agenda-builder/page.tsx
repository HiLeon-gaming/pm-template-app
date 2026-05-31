"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, ListChecks, LayoutDashboard, AlignJustify, Zap } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Agenda", desc: "All sections + prep + timebox", icon: LayoutDashboard },
  { id: "compact", label: "Quick Agenda", desc: "Purpose + items only", icon: AlignJustify },
];

function AgendaBuilderContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const purposeRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement>(null);
  const prepRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLDivElement>(null);

  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };
  const accent = "#F59E0B"; const accentDark = "#D97706";

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>📋 UNIVERSAL AGENDA BUILDER</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; Meetings Hub Pro &nbsp;|&nbsp; ⭐ All-Star &nbsp;|&nbsp; Copy/Paste Friendly</td></tr>
    </tbody></table>
  );

  const renderHeader = () => (
    <div ref={headerRef} style={{ marginBottom: "12px" }}>
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "18%" }}>Meeting Title</td><td style={{ ...S.td0, width: "32%" }}>[e.g., Weekly Staff Meeting]</td><td style={{ ...S.tdLabel, width: "18%" }}>Date / Time</td><td style={{ ...S.td0, width: "32%" }}>[MM/DD/YYYY, HH:MM AM/PM]</td></tr>
        <tr><td style={S.tdLabelAlt}>Organizer</td><td style={S.tdAlt}>[Your Name]</td><td style={S.tdLabelAlt}>Duration</td><td style={{ ...S.tdAlt, fontWeight: 700, color: accent }}>[e.g., 45 minutes]</td></tr>
        <tr><td style={S.tdLabel}>Location / Link</td><td style={S.td0}>[Teams / Zoom / Room Name]</td><td style={S.tdLabel}>Meeting Type</td><td style={S.td0}>[1:1 / Staff / Project / Exec / Ad-hoc]</td></tr>
      </tbody></table>
      <CopyButton targetRef={headerRef} label="Copy Section" />
    </div>
  );

  const renderPurpose = () => (
    <div ref={purposeRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }} width="100%"><tbody><tr><td style={{ backgroundColor: accent, color: C.white, padding: "10px 16px", fontFamily: S.font, fontSize: "15px", fontWeight: 800, letterSpacing: "0.02em" }}>🎯 PURPOSE &amp; DESIRED OUTCOMES</td></tr></tbody></table>
      <CopyButton targetRef={purposeRef} label="Copy Section" />
      <table style={LT}><tbody><tr>
        <td style={{ ...LC, width: "50%", paddingRight: "4px" }}>
          <table style={S.tbl}><tbody>
            <tr><td style={{ ...S.thSecondary, textAlign: "center" as const }}>Why Are We Meeting?</td></tr>
            <tr><td style={{ ...S.td0, fontSize: "11px", padding: "10px 14px", lineHeight: "1.7", minHeight: "60px" }}>[State the clear purpose in 1-2 sentences. Example: &ldquo;Align on Q2 priorities and assign ownership for the top 3 initiatives.&rdquo;]</td></tr>
          </tbody></table>
        </td>
        <td style={{ ...LC, width: "50%", paddingLeft: "4px" }}>
          <table style={S.tbl}><tbody>
            <tr><td style={{ ...S.thSecondary, textAlign: "center" as const }}>Desired Outcomes (What &ldquo;Done&rdquo; Looks Like)</td></tr>
            <tr><td style={{ ...S.td0, fontSize: "11px", padding: "10px 14px", lineHeight: "1.7", minHeight: "60px" }}>
              1. [Decision on X]<br />
              2. [Action owners assigned for Y]<br />
              3. [Alignment confirmed on Z]
            </td></tr>
          </tbody></table>
        </td>
      </tr></tbody></table>
    </div>
  );

  const renderItems = () => (
    <div ref={itemsRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }} width="100%"><tbody><tr><td style={{ backgroundColor: accentDark, color: C.white, padding: "10px 16px", fontFamily: S.font, fontSize: "15px", fontWeight: 800, letterSpacing: "0.02em" }}>📝 AGENDA ITEMS (Timeboxed)</td></tr></tbody></table>
      <CopyButton targetRef={itemsRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "5%", textAlign: "center" as const }}>#</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Time</th>
          <th style={S.thPrimary}>Topic</th>
          <th style={{ ...S.thPrimary, width: "12%", textAlign: "center" as const }}>Type</th>
          <th style={{ ...S.thPrimary, width: "12%" }}>Lead</th>
          <th style={{ ...S.thPrimary, width: "18%" }}>Discussion Prompts</th>
        </tr></thead>
        <tbody>
          {[
            { time: "5 min", topic: "[Opening: wins + quick updates]", type: "Update", tBg: C.badgeGreenBg, tFg: C.badgeGreenFg, lead: "[Facilitator]", prompts: "What went well this week?" },
            { time: "10 min", topic: "[Priority review: Q2 initiatives status]", type: "Discussion", tBg: C.badgeBlueBg, tFg: C.badgeBlueFg, lead: "[Project Lead]", prompts: "On track? Blockers? Need help?" },
            { time: "10 min", topic: "[Budget approval for contractor hire]", type: "Decision", tBg: C.badgeAmberBg, tFg: C.badgeAmberFg, lead: "[Finance]", prompts: "Options? Risks? Recommendation?" },
            { time: "10 min", topic: "[Cross-team dependency: API integration]", type: "Discussion", tBg: C.badgeBlueBg, tFg: C.badgeBlueFg, lead: "[Tech Lead]", prompts: "Timeline? Risks? Next steps?" },
            { time: "5 min", topic: "[Action items + decisions recap]", type: "Closeout", tBg: C.badgeGrayBg, tFg: C.badgeGrayFg, lead: "[Facilitator]", prompts: "What did we decide? Who owns what?" },
            { time: "5 min", topic: "[Parking lot + next meeting prep]", type: "Closeout", tBg: C.badgeGrayBg, tFg: C.badgeGrayFg, lead: "[Scribe]", prompts: "What got deferred? When?" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 800, fontSize: "14px", color: accent }}>{i + 1}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, fontSize: "11px", color: accentDark }}>{r.time}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{r.topic}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.tBg, r.tFg)}>{r.type}</span></td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 600 }}>{r.lead}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", fontStyle: "italic", color: C.textMuted }}>{r.prompts}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <table style={{ ...S.tbl, marginTop: "4px" }}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "18%" }}>Total Duration</td><td style={{ ...S.td0, fontWeight: 700, color: accent }}>45 minutes</td><td style={{ ...S.tdLabel, width: "18%" }}>Buffer</td><td style={S.td0}>5 minutes (built into closeout)</td></tr>
      </tbody></table>
    </div>
  );

  const renderPrep = () => (
    <div ref={prepRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }} width="100%"><tbody><tr><td style={{ backgroundColor: accent, color: C.white, padding: "10px 16px", fontFamily: S.font, fontSize: "15px", fontWeight: 800, letterSpacing: "0.02em" }}>📚 PRE-MEETING PREP</td></tr></tbody></table>
      <CopyButton targetRef={prepRef} label="Copy Section" />
      <table style={LT}><tbody><tr>
        <td style={{ ...LC, width: "50%", paddingRight: "4px" }}>
          <table style={S.tbl}><tbody>
            <tr><td style={{ ...S.thSecondary, textAlign: "center" as const }}>Attendees</td></tr>
            <tr><td style={{ ...S.td0, fontSize: "10px", lineHeight: "1.8", padding: "8px 10px" }}>
              &bull; [Name — Role / Why invited]<br />
              &bull; [Name — Role / Why invited]<br />
              &bull; [Name — Role / Why invited]<br />
              &bull; [Name — Role / Why invited]
            </td></tr>
          </tbody></table>
        </td>
        <td style={{ ...LC, width: "50%", paddingLeft: "4px" }}>
          <table style={S.tbl}><tbody>
            <tr><td style={{ ...S.thSecondary, textAlign: "center" as const }}>Pre-Read / Prep Required</td></tr>
            <tr><td style={{ ...S.td0, fontSize: "10px", lineHeight: "1.8", padding: "8px 10px" }}>
              &bull; [Review Q2 priorities doc — link]<br />
              &bull; [Budget proposal — attachment]<br />
              &bull; [API integration timeline — link]<br />
              &bull; [Come prepared with your top blocker]
            </td></tr>
          </tbody></table>
        </td>
      </tr></tbody></table>
    </div>
  );

  const renderClose = () => (
    <div ref={closeRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }} width="100%"><tbody><tr><td style={{ backgroundColor: accentDark, color: C.white, padding: "10px 16px", fontFamily: S.font, fontSize: "15px", fontWeight: 800, letterSpacing: "0.02em" }}>✅ MEETING CLOSEOUT CHECKLIST</td></tr></tbody></table>
      <CopyButton targetRef={closeRef} label="Copy Section" />
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "30%" }}>[ ] Decisions captured?</td><td style={S.td0}>All decisions documented with context and owner</td></tr>
        <tr><td style={S.tdLabelAlt}>[ ] Action items assigned?</td><td style={S.tdAlt}>Every action has an owner and due date</td></tr>
        <tr><td style={S.tdLabel}>[ ] Parking lot reviewed?</td><td style={S.td0}>Deferred items have a follow-up plan</td></tr>
        <tr><td style={S.tdLabelAlt}>[ ] Next meeting scheduled?</td><td style={S.tdAlt}>Date, time, and preliminary agenda noted</td></tr>
        <tr><td style={S.tdLabel}>[ ] Follow-up owner assigned?</td><td style={S.td0}>Someone is responsible for sending the recap within 24 hours</td></tr>
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
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-100 text-amber-700 text-xs font-semibold"><Zap size={11} />⭐ All-Star</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/meetings-hub" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-amber-600 transition-colors"><ArrowLeft size={14} />Back to Meetings Hub Pro</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center"><ListChecks size={20} className="text-amber-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">Universal Agenda Builder</h2><p className="text-xs font-medium text-amber-600">⭐ All-Star &mdash; Copy/Paste Friendly for Any Meeting Type</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Purpose, desired outcomes, timeboxed items, prep required, attendees, and discussion prompts. The best &ldquo;meeting upgrade&rdquo; page.</p>
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
          {layout === "full" && <>{renderTitleBanner()}{renderHeader()}{renderPurpose()}{renderItems()}{renderPrep()}{renderClose()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderHeader()}{renderPurpose()}{renderItems()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function AgendaBuilderPage() { return <ThemeProvider><AgendaBuilderContent /></ThemeProvider>; }
