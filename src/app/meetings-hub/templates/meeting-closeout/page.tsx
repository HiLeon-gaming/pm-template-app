"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, CheckSquare, LayoutDashboard, AlignJustify, Zap } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Checklist", desc: "All closeout items + follow-up", icon: LayoutDashboard },
  { id: "compact", label: "Quick Check", desc: "Essential items only", icon: AlignJustify },
];

function MeetingCloseoutContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const checkRef = useRef<HTMLDivElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);

  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };
  const accent = "#3B82F6"; const accentDark = "#2563EB";

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>✅ MEETING CLOSEOUT CHECKLIST</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; Meetings Hub Pro &nbsp;|&nbsp; ⭐ All-Star &nbsp;|&nbsp; Prevents Loose Ends</td></tr>
    </tbody></table>
  );

  const renderCheck = () => (
    <div ref={checkRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(accent)}>📋 END-OF-MEETING CHECKLIST</div>
      <CopyButton targetRef={checkRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>Run through this checklist in the last 3-5 minutes of every meeting. Read items aloud.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "6%", textAlign: "center" as const }}>Done?</th>
          <th style={{ ...S.thPrimary, width: "30%" }}>Closeout Item</th>
          <th style={S.thPrimary}>Details / Notes</th>
          <th style={{ ...S.thPrimary, width: "12%", textAlign: "center" as const }}>Priority</th>
        </tr></thead>
        <tbody>
          {[
            { item: "Decisions captured?", details: "[Read back all decisions made. Confirm wording and owners.]", pri: "Critical", pBg: C.badgeRedBg, pFg: C.badgeRedFg },
            { item: "Action items assigned?", details: "[Every action has: specific task + owner + due date. No orphan items.]", pri: "Critical", pBg: C.badgeRedBg, pFg: C.badgeRedFg },
            { item: "Action items read back?", details: "[Read each action aloud: \u201CJohn, you\u2019re sending the proposal by Friday. Correct?\u201D]", pri: "Critical", pBg: C.badgeRedBg, pFg: C.badgeRedFg },
            { item: "Parking lot reviewed?", details: "[Any items deferred? Who owns following up? When?]", pri: "High", pBg: C.badgeAmberBg, pFg: C.badgeAmberFg },
            { item: "Next meeting scheduled?", details: "[Date, time, preliminary agenda, same attendees?]", pri: "High", pBg: C.badgeAmberBg, pFg: C.badgeAmberFg },
            { item: "Follow-up owner assigned?", details: "[Who sends the recap within 24 hours? Via email or Teams?]", pri: "High", pBg: C.badgeAmberBg, pFg: C.badgeAmberFg },
            { item: "Notes shared location?", details: "[OneNote section, shared drive, Teams channel?]", pri: "Medium", pBg: C.badgeBlueBg, pFg: C.badgeBlueFg },
            { item: "Attendees thanked?", details: "[Quick thank-you for everyone\u2019s time and input.]", pri: "Nice", pBg: C.badgeGreenBg, pFg: C.badgeGreenFg },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "14px" }}>[ ]</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 700, fontSize: "11px" }}>{r.item}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.details}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.pBg, r.pFg)}>{r.pri}</span></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderSummary = () => (
    <div ref={summaryRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(accentDark)}>📝 QUICK CLOSEOUT SUMMARY</div>
      <CopyButton targetRef={summaryRef} label="Copy Section" />
      <table style={LT}><tbody><tr>
        <td style={{ ...LC, width: "50%", paddingRight: "4px" }}>
          <table style={S.tbl}><tbody>
            <tr><td style={{ ...S.thSecondary, textAlign: "center" as const }}>Decisions Made Today</td></tr>
            <tr><td style={{ ...S.td0, fontSize: "11px", padding: "10px 14px", lineHeight: "1.8" }}>
              1. [Decision]<br />
              2. [Decision]<br />
              3. [Decision]
            </td></tr>
          </tbody></table>
        </td>
        <td style={{ ...LC, width: "50%", paddingLeft: "4px" }}>
          <table style={S.tbl}><tbody>
            <tr><td style={{ ...S.thSecondary, textAlign: "center" as const }}>Action Items Assigned</td></tr>
            <tr><td style={{ ...S.td0, fontSize: "11px", padding: "10px 14px", lineHeight: "1.8" }}>
              1. [Action] &mdash; [Owner] &mdash; [Due]<br />
              2. [Action] &mdash; [Owner] &mdash; [Due]<br />
              3. [Action] &mdash; [Owner] &mdash; [Due]
            </td></tr>
          </tbody></table>
        </td>
      </tr></tbody></table>
      <table style={{ ...S.tbl, marginTop: "6px" }}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "22%" }}>Follow-up Owner</td><td style={S.td0}>[Name — sends recap by tomorrow]</td></tr>
        <tr><td style={S.tdLabelAlt}>Next Meeting</td><td style={{ ...S.tdAlt, fontWeight: 700, color: accent }}>[Date / Time / Topic]</td></tr>
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
            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center"><CheckSquare size={20} className="text-blue-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">Meeting Closeout Checklist</h2><p className="text-xs font-medium text-blue-600">⭐ All-Star &mdash; Prevents Loose Ends After Every Meeting</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Decisions captured, actions assigned, next meeting scheduled, follow-up owner named. Run through in the last 3-5 minutes.</p>
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
          {layout === "full" && <>{renderTitleBanner()}{renderCheck()}{renderSummary()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderCheck()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function MeetingCloseoutPage() { return <ThemeProvider><MeetingCloseoutContent /></ThemeProvider>; }
