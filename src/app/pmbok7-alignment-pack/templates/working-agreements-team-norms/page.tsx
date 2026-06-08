"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, Compass, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Agreements", desc: "All norms + conflict + etiquette", icon: LayoutDashboard },
  { id: "compact", label: "Quick Agreements", desc: "Core norms only", icon: AlignJustify },
];

function WorkingAgreementsContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const collabRef = useRef<HTMLDivElement>(null);
  const commsRef = useRef<HTMLDivElement>(null);
  const conflictRef = useRef<HTMLDivElement>(null);
  const meetingRef = useRef<HTMLDivElement>(null);
  const signoffRef = useRef<HTMLDivElement>(null);

  const descStyle: React.CSSProperties = { fontFamily: S.font, fontSize: "11px", fontStyle: "italic", color: "#475569", padding: "10px 14px", lineHeight: "1.6", borderBottom: `1px solid ${C.border}`, backgroundColor: C.white };

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody>
      <tr><td style={{ backgroundColor: "#0D9488", color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: "4px solid #F59E0B", textAlign: "center" as const }}>🤝 WORKING AGREEMENTS & TEAM NORMS</td></tr>
      <tr><td style={{ backgroundColor: "#115E59", color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; PMBOK® 7 Alignment Pack</td></tr>
      <tr><td style={descStyle}><strong style={{ fontStyle: "italic" }}>How the team operates: collaboration rules, communication norms, conflict resolution, and meeting etiquette.</strong> Aligns with PMBOK 7’s Team principle — high-performing teams need explicit agreements, not assumed ones.</td></tr>
    </tbody></table>
  );

  const renderHeader = () => (
    <div ref={headerRef} style={{ marginBottom: "12px" }}>
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "18%" }}>Project Name</td><td style={{ ...S.td0, width: "32%" }}>[Project Name]</td><td style={{ ...S.tdLabel, width: "18%" }}>Date Created</td><td style={{ ...S.td0, width: "32%" }}>[MM/DD/YYYY]</td></tr>
        <tr><td style={S.tdLabelAlt}>Team Size</td><td style={S.tdAlt}>[8 members]</td><td style={S.tdLabelAlt}>Last Reviewed</td><td style={S.tdAlt}>[MM/DD/YYYY — review at each retrospective]</td></tr>
      </tbody></table>
      <CopyButton targetRef={headerRef} label="Copy Section" />
    </div>
  );

  const renderCollab = () => (
    <div ref={collabRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner()}>💪 COLLABORATION NORMS</td></tr></tbody></table>
      <CopyButton targetRef={collabRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, backgroundColor: "#0D9488", width: "5%", textAlign: "center" as const }}>#</th>
          <th style={{ ...S.thPrimary, backgroundColor: "#0D9488" }}>Agreement</th>
          <th style={{ ...S.thPrimary, backgroundColor: "#0D9488", width: "28%" }}>What This Looks Like in Practice</th>
        </tr></thead>
        <tbody>
          {[
            { agree: "We raise blockers immediately — not at the next standup", practice: "[Post in #project-blockers channel; tag PM and relevant team member]" },
            { agree: "We respect focus time — no interruptions during deep work blocks", practice: "[Calendar blocks honored; async questions preferred during focus hours]" },
            { agree: "We own our commitments — if it’s at risk, say so early", practice: "[Flag risk in standup or Slack if commitment is >1 day at risk]" },
            { agree: "We give feedback directly — not through back channels", practice: "[Use 1:1s or retros; address issues with the person, not about the person]" },
            { agree: "We help before being asked — if a teammate is blocked, offer help", practice: "[Pair programming offered proactively; cross-training on critical skills]" },
            { agree: "We celebrate wins — acknowledge contributions publicly", practice: "[Sprint demo shout-outs; #team-wins channel; retro “went well” section]" },
            { agree: "[Add team agreement]", practice: "[Describe the practice]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (<tr key={i}>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, color: "#0D9488" }}>{i + 1}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 600, fontSize: "11px" }}>{r.agree}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.practice}</td>
            </tr>);
          })}
        </tbody>
      </table>
    </div>
  );

  const renderComms = () => (
    <div ref={commsRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner("#115E59")}>📢 COMMUNICATION NORMS</td></tr></tbody></table>
      <CopyButton targetRef={commsRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={S.thSecondary}>Channel / Method</th>
          <th style={{ ...S.thSecondary, width: "15%" }}>When to Use</th>
          <th style={{ ...S.thSecondary, width: "12%", textAlign: "center" as const }}>Response SLA</th>
          <th style={S.thSecondary}>Guidelines</th>
        </tr></thead>
        <tbody>
          {[
            { ch: "Slack / Teams (project channel)", when: "Day-to-day comms", sla: "2 hours", guide: "[Use threads; tag people directly; avoid @here unless urgent]" },
            { ch: "Email", when: "Formal comms, external stakeholders", sla: "24 hours", guide: "[Clear subject lines; CC only when needed; action items bold]" },
            { ch: "Video Call", when: "Complex discussions, decisions", sla: "Scheduled", guide: "[Camera on; mute when not speaking; use agenda + notes]" },
            { ch: "In-Person / Whiteboard", when: "Design sessions, conflict resolution", sla: "Scheduled", guide: "[Capture outcomes in shared doc within 24 hours]" },
            { ch: "Project Wiki / SharePoint", when: "Documentation, decisions, reference", sla: "N/A", guide: "[Single source of truth; update within 48 hours of decision]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (<tr key={i}>
              <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 600, fontSize: "11px" }}>{r.ch}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.when}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 600, fontSize: "10px" }}>{r.sla}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.guide}</td>
            </tr>);
          })}
        </tbody>
      </table>
    </div>
  );

  const renderConflict = () => (
    <div ref={conflictRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner()}>🚨 CONFLICT RESOLUTION APPROACH</td></tr></tbody></table>
      <CopyButton targetRef={conflictRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thSecondary, width: "5%", textAlign: "center" as const }}>Step</th>
          <th style={S.thSecondary}>Action</th>
          <th style={{ ...S.thSecondary, width: "12%", textAlign: "center" as const }}>Timeframe</th>
        </tr></thead>
        <tbody>
          {[
            { step: "1", action: "Address it directly — talk to the person 1:1 with respect and candor", time: "Same day" },
            { step: "2", action: "If unresolved — bring it to the PM for facilitated discussion", time: "Within 48 hrs" },
            { step: "3", action: "If still unresolved — PM escalates to sponsor or functional manager", time: "Within 1 week" },
            { step: "4", action: "Team retro — address systemic patterns (without blame) in retrospective", time: "Next retro" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (<tr key={i}>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, color: "#0D9488", fontSize: "14px" }}>{r.step}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{r.action}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 600, fontSize: "10px" }}>{r.time}</td>
            </tr>);
          })}
        </tbody>
      </table>
      <p style={S.subNote}>Core principle: assume positive intent. Address behaviors, not personalities.</p>
    </div>
  );

  const renderMeeting = () => (
    <div ref={meetingRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner("#115E59")}>📅 MEETING ETIQUETTE</td></tr></tbody></table>
      <CopyButton targetRef={meetingRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thSecondary, width: "5%", textAlign: "center" as const }}>#</th>
          <th style={S.thSecondary}>Rule</th>
        </tr></thead>
        <tbody>
          {[
            "Every meeting has an agenda shared at least 2 hours in advance",
            "Meetings start and end on time — if we’re not done, schedule a follow-up",
            "No laptops / multitasking unless the meeting purpose requires it",
            "Decisions made in meetings are documented in writing within 24 hours",
            "If you’re not needed, you’re free to decline — no guilt",
            "Default to 25-minute or 50-minute meetings (leave buffer between meetings)",
            "Sprint demos: celebrate first, then discuss improvements",
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (<tr key={i}>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, color: "#0D9488" }}>{i + 1}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{r}</td>
            </tr>);
          })}
        </tbody>
      </table>
    </div>
  );

  const renderSignoff = () => (
    <div ref={signoffRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner()}>✍️ TEAM AGREEMENT SIGN-OFF</td></tr></tbody></table>
      <CopyButton targetRef={signoffRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr><th style={S.thSecondary}>Team Member</th><th style={S.thSecondary}>Role</th><th style={{ ...S.thSecondary, width: "20%" }}>Signature</th><th style={{ ...S.thSecondary, width: "10%" }}>Date</th></tr></thead>
        <tbody>
          {["[PM — Name]", "[Tech Lead — Name]", "[Developer 1 — Name]", "[Developer 2 — Name]", "[QA Lead — Name]", "[BA — Name]", "[UX Designer — Name]", "[Scrum Master — Name]"].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (<tr key={i}><td style={{ ...S.td0, backgroundColor: bg, fontWeight: 600, fontSize: "11px" }}>{r}</td><td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>[Role]</td><td style={{ ...S.td0, backgroundColor: bg }}>__________________</td><td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>[MM/DD]</td></tr>);
          })}
        </tbody>
      </table>
      <p style={S.subNote}>Review and update these agreements at every sprint retrospective. Agreements should evolve with the team.</p>
    </div>
  );

  const renderFooter = () => (
    <table style={{ ...S.tbl, marginTop: "8px" }}><tbody><tr><td style={{ backgroundColor: "#0D9488", color: "#F0FDFA", padding: "8px 20px", fontSize: "10px", fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.06em" }}>ExecNoteShop • PMBOK® 7 Alignment Pack • © 2026 All Rights Reserved</td></tr></tbody></table>
  );

  const renderFullLayout = () => (<>{renderTitleBanner()}{renderHeader()}{renderCollab()}{renderComms()}{renderConflict()}{renderMeeting()}{renderSignoff()}{renderFooter()}</>);
  const renderCompactLayout = () => (<>{renderTitleBanner()}{renderHeader()}{renderCollab()}{renderComms()}{renderSignoff()}{renderFooter()}</>);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50/20">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50"><div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between"><div className="flex items-center gap-3"><div className="w-9 h-9 rounded-lg bg-teal-600 flex items-center justify-center"><Layout size={18} className="text-white" /></div><div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div></div><span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-teal-50 border border-teal-100 text-teal-700 text-xs font-semibold"><Compass size={11} /> Team Norms</span></div></header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6"><Link href="/pmbok7-alignment-pack" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-teal-600 transition-colors"><ArrowLeft size={14} /> Back to PMBOK 7 Alignment Pack</Link><CopyAllButton targetRef={fullPageRef} /></div>
        <div className="mb-6"><div className="flex items-center gap-3 mb-2"><div className="w-10 h-10 rounded-lg bg-teal-100 flex items-center justify-center"><Compass size={20} className="text-teal-600" /></div><div><h2 className="text-2xl font-extrabold text-slate-900">Working Agreements & Team Norms</h2><p className="text-xs font-medium text-teal-600">Collaboration + Communication + Conflict</p></div></div><p className="text-sm text-slate-600 mt-2 max-w-3xl">How the team operates: collaboration rules, comms norms, conflict resolution, and meeting etiquette.</p></div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6"><p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Layout</p><div className="flex flex-wrap gap-2">{LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (<button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-teal-600 text-white border-teal-600 shadow-md shadow-teal-200" : "bg-white text-slate-600 border-slate-200 hover:border-teal-300 hover:text-teal-700"}`}><Icon size={15} /> <span>{l.label}</span> <span className={`text-[10px] font-medium ${isActive ? "text-teal-200" : "text-slate-400"}`}>{l.desc}</span></button>); })}</div></div>
        <div ref={fullPageRef} style={{ fontFamily: S.font }}>{layout === "full" && renderFullLayout()}{layout === "compact" && renderCompactLayout()}</div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function WorkingAgreementsPage() {
  return (<ThemeProvider><WorkingAgreementsContent /></ThemeProvider>);
}
