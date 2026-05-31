"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, FileText, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Recap", desc: "Notes + decisions + actions + parking lot", icon: LayoutDashboard },
  { id: "compact", label: "Quick Recap", desc: "Notes + actions only", icon: AlignJustify },
];

function MeetingRecapContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const notesRef = useRef<HTMLDivElement>(null);
  const decisionsRef = useRef<HTMLDivElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);
  const parkingRef = useRef<HTMLDivElement>(null);

  const accent = "#0D9488"; const accentDark = "#0F766E";

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>📄 MEETING RECAP</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; Meetings Hub Pro &nbsp;|&nbsp; Logs &amp; Follow-Up</td></tr>
    </tbody></table>
  );

  const renderHeader = () => (
    <div ref={headerRef} style={{ marginBottom: "12px" }}>
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "18%" }}>Meeting</td><td style={{ ...S.td0, width: "32%", fontWeight: 700, color: accent }}>[Meeting Name]</td><td style={{ ...S.tdLabel, width: "18%" }}>Date</td><td style={{ ...S.td0, width: "32%" }}>[MM/DD/YYYY]</td></tr>
        <tr><td style={S.tdLabelAlt}>Facilitator</td><td style={S.tdAlt}>[Your Name]</td><td style={S.tdLabelAlt}>Duration</td><td style={S.tdAlt}>[Actual: 45 min / Planned: 60 min]</td></tr>
        <tr><td style={S.tdLabel}>Attendees</td><td colSpan={3} style={S.td0}>[Name 1, Name 2, Name 3 — note absentees: Name 4 (absent)]</td></tr>
        <tr><td style={S.tdLabelAlt}>Purpose</td><td colSpan={3} style={{ ...S.tdAlt, fontWeight: 600 }}>[One sentence — why did we meet?]</td></tr>
      </tbody></table>
      <CopyButton targetRef={headerRef} label="Copy Section" />
    </div>
  );

  const renderNotes = () => (
    <div ref={notesRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accent)}>📝 DISCUSSION NOTES</td></tr></tbody></table>
      <CopyButton targetRef={notesRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "5%", textAlign: "center" as const }}>#</th>
          <th style={{ ...S.thPrimary, width: "25%" }}>Topic</th>
          <th style={S.thPrimary}>Key Points</th>
          <th style={{ ...S.thPrimary, width: "12%" }}>Speaker</th>
        </tr></thead>
        <tbody>
          {[
            { topic: "[Project status update]", points: "[Sprint 12 on track — 19% complete after day 3. One blocker: test env down.]", speaker: "[PM]" },
            { topic: "[Budget discussion]", points: "[Contractor costs 16% over — need to renegotiate or adjust scope. CFO wants proposal by Friday.]", speaker: "[Finance]" },
            { topic: "[New feature request]", points: "[VP Product wants PDF export added. Team estimates 2 weeks. Need to decide: this sprint or next?]", speaker: "[VP Product]" },
            { topic: "[Hiring update]", points: "[3 roles open > 60 days. Recruiter agency approved. Expecting first candidates next week.]", speaker: "[HR]" },
            { topic: "[ ]", points: "[ ]", speaker: "[ ]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 800, fontSize: "14px", color: accent }}>{i + 1}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 600 }}>{r.topic}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.points}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.speaker}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderDecisions = () => (
    <div ref={decisionsRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accentDark)}>⚖️ DECISIONS MADE</td></tr></tbody></table>
      <CopyButton targetRef={decisionsRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "5%", textAlign: "center" as const }}>#</th>
          <th style={S.thPrimary}>Decision</th>
          <th style={{ ...S.thPrimary, width: "15%" }}>Decided By</th>
          <th style={{ ...S.thPrimary, width: "20%" }}>Rationale</th>
        </tr></thead>
        <tbody>
          {[
            { dec: "[PDF export deferred to Sprint 13 — current sprint is full]", by: "[PM + VP Product]", rationale: "[Not enough capacity this sprint, P2 priority]" },
            { dec: "[Approve recruiter agency — up to $30K budget]", by: "[Sponsor]", rationale: "[3 roles unfilled too long — impacting velocity]" },
            { dec: "[ ]", by: "[ ]", rationale: "[ ]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 800, fontSize: "14px", color: accent }}>{i + 1}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 600 }}>{r.dec}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.by}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", color: C.textMuted }}>{r.rationale}</td>
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
          <th style={S.thPrimary}>Action</th>
          <th style={{ ...S.thPrimary, width: "12%" }}>Owner</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Due</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Priority</th>
        </tr></thead>
        <tbody>
          {[
            { action: "[Submit contractor cost reduction proposal to CFO]", owner: "[PM]", due: "[03/08]", pri: "High", pBg: C.badgeRedBg, pFg: C.badgeRedFg },
            { action: "[Fix test environment — restore staging]", owner: "[DevOps]", due: "[03/07]", pri: "High", pBg: C.badgeRedBg, pFg: C.badgeRedFg },
            { action: "[Add PDF export to Sprint 13 backlog]", owner: "[PM]", due: "[03/10]", pri: "Medium", pBg: C.badgeAmberBg, pFg: C.badgeAmberFg },
            { action: "[Engage recruiter agency — kick off 3 searches]", owner: "[HR]", due: "[03/10]", pri: "High", pBg: C.badgeRedBg, pFg: C.badgeRedFg },
            { action: "[ ]", owner: "[ ]", due: "[ ]", pri: " ", pBg: C.badgeGrayBg, pFg: C.badgeGrayFg },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.action}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 600 }}>{r.owner}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, fontSize: "10px", color: accent }}>{r.due}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}>{r.pri.trim() ? <span style={S.badge(r.pBg, r.pFg)}>{r.pri}</span> : ""}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderParking = () => (
    <div ref={parkingRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accentDark)}>🅿️ PARKING LOT</td></tr></tbody></table>
      <CopyButton targetRef={parkingRef} label="Copy Section" />
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.td0, fontSize: "10px", lineHeight: "1.9", padding: "10px 14px" }}>
          &bull; [Topic that came up but wasn&apos;t on agenda — discuss next meeting]<br />
          &bull; [Idea raised that needs further investigation before deciding]<br />
          &bull; [Question that nobody could answer — needs offline research]
        </td></tr>
      </tbody></table>
      <table style={{ ...S.tbl, marginTop: "6px" }}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "22%" }}>Recap Sent By</td><td style={S.td0}>[Your Name — within 2 hours]</td></tr>
        <tr><td style={S.tdLabelAlt}>Next Meeting</td><td style={{ ...S.tdAlt, fontWeight: 700, color: accent }}>[Date / Time — Topic]</td></tr>
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50/30">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-teal-500 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-teal-50 border border-teal-100 text-teal-700 text-xs font-semibold"><FileText size={11} />Recap</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/meetings-hub" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-teal-600 transition-colors"><ArrowLeft size={14} />Back to Meetings Hub Pro</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-teal-100 flex items-center justify-center"><FileText size={20} className="text-teal-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">Meeting Recap</h2><p className="text-xs font-medium text-teal-600">Notes &bull; Decisions &bull; Actions &bull; Parking Lot</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Universal meeting recap: structured notes, decisions with rationale, prioritized actions, and parking lot for deferred topics.</p>
        </div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">View Mode</p>
          <div className="flex flex-wrap gap-2">
            {LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (
              <button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-teal-500 text-white border-teal-500 shadow-md shadow-teal-200" : "bg-white text-slate-600 border-slate-200 hover:border-teal-300 hover:text-teal-700"}`}>
                <Icon size={15} /><span>{l.label}</span><span className={`text-[10px] font-medium ${isActive ? "text-teal-200" : "text-slate-400"}`}>{l.desc}</span>
              </button>
            ); })}
          </div>
        </div>
        <div ref={fullPageRef} style={{ fontFamily: S.font }}>
          {layout === "full" && <>{renderTitleBanner()}{renderHeader()}{renderNotes()}{renderDecisions()}{renderActions()}{renderParking()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderHeader()}{renderNotes()}{renderActions()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function MeetingRecapPage() { return <ThemeProvider><MeetingRecapContent /></ThemeProvider>; }
