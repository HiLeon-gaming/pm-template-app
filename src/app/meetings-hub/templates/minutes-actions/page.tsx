"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, FileText, LayoutDashboard, AlignJustify, Zap } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Minutes", desc: "Notes + decisions + actions + parking lot", icon: LayoutDashboard },
  { id: "compact", label: "Quick Capture", desc: "Decisions + actions only", icon: AlignJustify },
];

function MinutesActionsContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const notesRef = useRef<HTMLDivElement>(null);
  const decisionsRef = useRef<HTMLDivElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);
  const parkingRef = useRef<HTMLDivElement>(null);

  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };
  const accent = "#3B82F6"; const accentDark = "#2563EB";

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>📝 UNIVERSAL MINUTES + ACTIONS</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; Meetings Hub Pro &nbsp;|&nbsp; ⭐ All-Star &nbsp;|&nbsp; Meeting Prep &amp; Execution</td></tr>
    </tbody></table>
  );

  const renderHeader = () => (
    <div ref={headerRef} style={{ marginBottom: "12px" }}>
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "18%" }}>Meeting Title</td><td style={{ ...S.td0, width: "32%" }}>[e.g., Weekly Staff Meeting]</td><td style={{ ...S.tdLabel, width: "18%" }}>Date / Time</td><td style={{ ...S.td0, width: "32%" }}>[MM/DD/YYYY, HH:MM]</td></tr>
        <tr><td style={S.tdLabelAlt}>Facilitator</td><td style={S.tdAlt}>[Name]</td><td style={S.tdLabelAlt}>Scribe</td><td style={S.tdAlt}>[Name]</td></tr>
        <tr><td style={S.tdLabel}>Attendees</td><td colSpan={3} style={S.td0}>[Name 1, Name 2, Name 3, Name 4]</td></tr>
        <tr><td style={S.tdLabelAlt}>Meeting Purpose</td><td colSpan={3} style={{ ...S.tdAlt, fontWeight: 600, color: accent }}>[State the purpose in 1 sentence]</td></tr>
      </tbody></table>
      <CopyButton targetRef={headerRef} label="Copy Section" />
    </div>
  );

  const renderNotes = () => (
    <div ref={notesRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accent)}>📋 DISCUSSION NOTES</td></tr></tbody></table>
      <CopyButton targetRef={notesRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "5%", textAlign: "center" as const }}>#</th>
          <th style={{ ...S.thPrimary, width: "25%" }}>Topic</th>
          <th style={S.thPrimary}>Key Points Discussed</th>
          <th style={{ ...S.thPrimary, width: "12%", textAlign: "center" as const }}>Outcome</th>
        </tr></thead>
        <tbody>
          {[
            { topic: "[Q2 priorities review]", points: "[Discussed top 3 initiatives. Agreed to focus on customer onboarding first, then API integration.]", outcome: "Aligned", oBg: C.badgeGreenBg, oFg: C.badgeGreenFg },
            { topic: "[Budget for contractor hire]", points: "[Finance presented options: $80K full-time vs $120K contractor for 6 months. Team recommended contractor.]", outcome: "Decision", oBg: C.badgeBlueBg, oFg: C.badgeBlueFg },
            { topic: "[Cross-team dependency]", points: "[API team needs 2 more weeks. Impact on our timeline discussed. Will escalate if no response by Friday.]", outcome: "Action", oBg: C.badgeAmberBg, oFg: C.badgeAmberFg },
            { topic: "[New hire onboarding]", points: "[Sarah starts next Monday. Buddy system assigned. First-week plan reviewed.]", outcome: "Info", oBg: C.badgeGrayBg, oFg: C.badgeGrayFg },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 800, fontSize: "14px", color: accent }}>{i + 1}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 600, fontSize: "11px" }}>{r.topic}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.points}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.oBg, r.oFg)}>{r.outcome}</span></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderDecisions = () => (
    <div ref={decisionsRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accentDark)}>📌 DECISIONS MADE</td></tr></tbody></table>
      <CopyButton targetRef={decisionsRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "5%", textAlign: "center" as const }}>#</th>
          <th style={S.thPrimary}>Decision</th>
          <th style={{ ...S.thPrimary, width: "15%" }}>Context / Rationale</th>
          <th style={{ ...S.thPrimary, width: "12%" }}>Owner</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Date</th>
        </tr></thead>
        <tbody>
          {[
            { decision: "[Hire contractor for API integration — 6 month term]", context: "[More flexible than FTE; faster start]", owner: "[You]", date: "[03/05]" },
            { decision: "[Delay feature launch by 2 weeks for QA]", context: "[Quality concerns from last release]", owner: "[PM]", date: "[03/05]" },
            { decision: "[Customer onboarding is Q2 priority #1]", context: "[Highest revenue impact]", owner: "[Product]", date: "[03/05]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 800, fontSize: "14px", color: accentDark }}>{i + 1}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px", fontWeight: 600 }}>{r.decision}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", color: C.textMuted }}>{r.context}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 600 }}>{r.owner}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, fontSize: "10px", color: accent }}>{r.date}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderActions = () => (
    <div ref={actionsRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accent)}>✅ ACTION ITEMS</td></tr></tbody></table>
      <CopyButton targetRef={actionsRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "5%", textAlign: "center" as const }}>#</th>
          <th style={S.thPrimary}>Action</th>
          <th style={{ ...S.thPrimary, width: "14%" }}>Owner</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Due Date</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Status</th>
        </tr></thead>
        <tbody>
          {[
            { action: "[Send contractor job req to procurement]", owner: "[You]", due: "[03/07]", s: "Not Started", sBg: C.badgeGrayBg, sFg: C.badgeGrayFg },
            { action: "[Update project timeline with 2-week delay]", owner: "[PM]", due: "[03/06]", s: "Not Started", sBg: C.badgeGrayBg, sFg: C.badgeGrayFg },
            { action: "[Escalate API dependency to VP Engineering]", owner: "[Tech Lead]", due: "[03/07]", s: "Not Started", sBg: C.badgeGrayBg, sFg: C.badgeGrayFg },
            { action: "[Prepare onboarding buddy guide for Sarah]", owner: "[HR]", due: "[03/08]", s: "Not Started", sBg: C.badgeGrayBg, sFg: C.badgeGrayFg },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 800, fontSize: "14px", color: accent }}>{i + 1}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.action}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 600 }}>{r.owner}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, fontSize: "10px", color: accent }}>{r.due}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.sBg, r.sFg)}>{r.s}</span></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderParking = () => (
    <div ref={parkingRef} style={{ marginBottom: "12px" }}>
      <table style={LT}><tbody><tr>
        <td style={{ ...LC, width: "50%", paddingRight: "4px" }}>
          <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner("#EA580C")}>🅿️ PARKING LOT</td></tr></tbody></table>
          <table style={S.tbl}><tbody>
            {["[Discuss team restructure — needs Sarah\u2019s input]", "[Review Q3 budget forecast — defer to next month]", "[New tooling proposal — needs cost analysis first]"].map((item, i) => (
              <tr key={i}><td style={{ ...(i % 2 === 0 ? S.td0 : S.tdAlt), fontSize: "10px" }}>&bull; {item}</td></tr>
            ))}
          </tbody></table>
        </td>
        <td style={{ ...LC, width: "50%", paddingLeft: "4px" }}>
          <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner("#059669")}>📬 FOLLOW-UP NOTES</td></tr></tbody></table>
          <table style={S.tbl}><tbody>
            <tr><td style={{ ...S.tdLabel, width: "35%" }}>Recap sent by</td><td style={S.td0}>[Name — within 24 hours]</td></tr>
            <tr><td style={S.tdLabelAlt}>Next meeting</td><td style={S.tdAlt}>[Date / Time / Same agenda or new?]</td></tr>
            <tr><td style={S.tdLabel}>Notes shared via</td><td style={S.td0}>[Email / Teams / OneNote link]</td></tr>
          </tbody></table>
        </td>
      </tr></tbody></table>
      <CopyButton targetRef={parkingRef} label="Copy Section" />
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
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-semibold"><Zap size={11} />⭐ All-Star</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/meetings-hub" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-blue-600 transition-colors"><ArrowLeft size={14} />Back to Meetings Hub Pro</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center"><FileText size={20} className="text-blue-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">Universal Minutes + Actions</h2><p className="text-xs font-medium text-blue-600">⭐ All-Star &mdash; Capture Every Meeting&apos;s Outputs</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Notes, decisions, action items, and parking lot in one clean layout. Prevents &ldquo;we talked about it&rdquo; syndrome.</p>
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
          {layout === "full" && <>{renderTitleBanner()}{renderHeader()}{renderNotes()}{renderDecisions()}{renderActions()}{renderParking()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderHeader()}{renderDecisions()}{renderActions()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function MinutesActionsPage() { return <ThemeProvider><MinutesActionsContent /></ThemeProvider>; }
