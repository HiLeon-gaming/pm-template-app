"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, Handshake, LayoutDashboard, AlignJustify, CalendarDays } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full History", desc: "Meeting log + open commitments + tips", icon: LayoutDashboard },
  { id: "compact", label: "Quick Log", desc: "Meeting log only", icon: AlignJustify },
];

function MeetingHistoryContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullRef = useRef<HTMLDivElement>(null);
  const histRef = useRef<HTMLDivElement>(null);
  const commitRef = useRef<HTMLDivElement>(null);
  const tipsRef = useRef<HTMLDivElement>(null);

  const accent = "#8B5CF6";
  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>STAKEHOLDER MEETING HISTORY INDEX</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; Relationship &amp; Stakeholder Management Hub &nbsp;|&nbsp; Per Stakeholder</td></tr>
    </tbody></table>
  );

  const renderHistory = () => (
    <div ref={histRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accent)}>STAKEHOLDER: [NAME] &mdash; MEETING LOG</td></tr></tbody></table>
      <CopyButton targetRef={histRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>Log every key interaction. Link to detailed meeting notes where applicable. This is your institutional memory &mdash; it solves &quot;what did we decide last time?&quot; and prevents re-litigating old decisions.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "9%" }}>Date</th>
          <th style={{ ...S.thPrimary, width: "15%" }}>Meeting Type</th>
          <th style={S.thPrimary}>Key Decisions &amp; Takeaways</th>
          <th style={S.thPrimary}>Commitments Made</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Link</th>
        </tr></thead>
        <tbody>
          {[
            { date: "Mar 12", meet: "1:1 catch-up", key: "Agreed to fast-track vendor selection; she will present to board next week.", commit: "You: send vendor comparison by Thu. Her: confirm board slot.", link: "[Link]" },
            { date: "Mar 5", meet: "Project status review", key: "Timeline pushed 2 weeks due to API dependency; no budget impact.", commit: "You: update all stakeholders. Her: talk to engineering lead about API.", link: "[Link]" },
            { date: "Feb 28", meet: "Steering committee", key: "Phase 1 approved unanimously. Phase 2 contingent on Q1 results.", commit: "You: prepare Q1 results deck by Mar 20.", link: "[Link]" },
            { date: "Feb 15", meet: "Intro meeting", key: "First meeting. Discussed project scope, her priorities (cost reduction), and communication preferences.", commit: "You: send project brief. Her: connect you with her analyst.", link: "[Link]" },
            { date: "[Date]", meet: "[Type]", key: "[What was decided or learned]", commit: "[Who owes what]", link: "[Link]" },
            { date: "[Date]", meet: "[Type]", key: "[What was decided or learned]", commit: "[Who owes what]", link: "[Link]" },
            { date: "[Date]", meet: "[Type]", key: "[What was decided or learned]", commit: "[Who owes what]", link: "[Link]" },
            { date: "[Date]", meet: "[Type]", key: "[What was decided or learned]", commit: "[Who owes what]", link: "[Link]" },
            { date: "[Date]", meet: "[Type]", key: "[What was decided or learned]", commit: "[Who owes what]", link: "[Link]" },
            { date: "[Date]", meet: "[Type]", key: "[What was decided or learned]", commit: "[Who owes what]", link: "[Link]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 700, fontSize: "10px", color: accent }}>{r.date}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 600 }}>{r.meet}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px" }}>{r.key}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", color: C.textMuted }}>{r.commit}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", textAlign: "center" as const, color: accent }}>{r.link}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderCommitments = () => (
    <div ref={commitRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner("#DC2626")}>OPEN COMMITMENTS TRACKER</td></tr></tbody></table>
      <CopyButton targetRef={commitRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>Track all open commitments from meetings. Nothing damages credibility faster than forgetting a commitment you made.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "9%" }}>From</th>
          <th style={{ ...S.thPrimary, width: "8%" }}>Owner</th>
          <th style={S.thPrimary}>Commitment</th>
          <th style={{ ...S.thPrimary, width: "10%" }}>Due</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Status</th>
        </tr></thead>
        <tbody>
          {[
            { from: "Mar 12", owner: "You", item: "Send vendor comparison document with 3 options and recommendation.", due: "Mar 14", status: "Pending" },
            { from: "Mar 12", owner: "Them", item: "Confirm board meeting slot for vendor presentation.", due: "Mar 15", status: "Pending" },
            { from: "Mar 5", owner: "You", item: "Update all stakeholders on revised timeline.", due: "Mar 7", status: "Done" },
            { from: "Feb 28", owner: "You", item: "Prepare Q1 results deck for Phase 2 approval.", due: "Mar 20", status: "In Progress" },
            { from: "[Date]", owner: "[Who]", item: "[What was committed]", due: "[When]", status: "[Status]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            const statusColor = r.status === "Done" ? { bg: C.badgeGreenBg, fg: C.badgeGreenFg } : r.status === "In Progress" ? { bg: C.badgeAmberBg, fg: C.badgeAmberFg } : { bg: C.badgeRedBg, fg: C.badgeRedFg };
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 600, color: accent }}>{r.from}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 700 }}>{r.owner}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px" }}>{r.item}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", color: C.textMuted }}>{r.due}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(statusColor.bg, statusColor.fg)}>{r.status}</span></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderTips = () => (
    <div ref={tipsRef} style={{ marginBottom: "12px" }}>
      <CopyButton targetRef={tipsRef} label="Copy Section" />
      <table style={LT}><tbody><tr>
        <td style={{ ...LC, width: "50%", paddingRight: "4px" }}>
          <table style={S.tbl}>
            <thead><tr><td style={{ backgroundColor: "#EDE9FE", color: "#8B5CF6", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #8B5CF6" }}>MEETING LOG BEST PRACTICES</td></tr></thead>
            <tbody>
              {[
                { color: "#8B5CF6", tip: "Log within 24 hours.", detail: "Your memory fades fast. Capture key decisions and commitments the same day." },
                { color: "#059669", tip: "Focus on decisions, not discussion.", detail: "Nobody needs a transcript. Record what was DECIDED and what was COMMITTED." },
                { color: "#0EA5E9", tip: "Always link to detailed notes.", detail: "Keep the log concise. Put the full context in linked meeting notes." },
                { color: "#D97706", tip: "Review before every meeting.", detail: "Skim the last 3 entries before your next interaction. It shows preparation and builds trust." },
              ].map((r, i) => {
                const bg = i % 2 === 1 ? C.rowAlt : C.white;
                return (
                  <tr key={i}><td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", padding: "5px 10px" }}>
                    <strong style={{ color: r.color }}>{r.tip}</strong><br />
                    <span style={{ fontSize: "9px", color: C.textMuted }}>{r.detail}</span>
                  </td></tr>
                );
              })}
            </tbody>
          </table>
        </td>
        <td style={{ ...LC, width: "50%", paddingLeft: "4px" }}>
          <table style={S.tbl}>
            <thead><tr><td style={{ backgroundColor: "#FEF3C7", color: "#D97706", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #D97706" }}>COMMITMENT TRACKING RULES</td></tr></thead>
            <tbody>
              {[
                { color: "#DC2626", tip: "Never drop a commitment silently.", detail: "If you can\u2019t deliver, communicate BEFORE the deadline. Silence = broken trust." },
                { color: "#EA580C", tip: "Track THEIR commitments too.", detail: "If they owe you something, follow up. Don\u2019t assume it\u2019s coming." },
                { color: "#D97706", tip: "Close the loop publicly.", detail: "When a commitment is delivered, acknowledge it in your next interaction." },
                { color: "#6366F1", tip: "Escalate overdue items.", detail: "If something is overdue by >1 week, address it directly. Don\u2019t let it fester." },
              ].map((r, i) => {
                const bg = i % 2 === 1 ? C.rowAlt : C.white;
                return (
                  <tr key={i}><td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", padding: "5px 10px" }}>
                    <strong style={{ color: r.color }}>{r.tip}</strong><br />
                    <span style={{ fontSize: "9px", color: C.textMuted }}>{r.detail}</span>
                  </td></tr>
                );
              })}
            </tbody>
          </table>
        </td>
      </tr></tbody></table>
    </div>
  );

  const renderFooter = () => (
    <table style={{ ...S.tbl, marginTop: "8px" }}><tbody><tr>
      <td style={{ backgroundColor: C.primary, color: C.footerText, padding: "8px 20px", fontSize: "10px", fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.06em" }}>
        ExecNoteShop &bull; Relationship &amp; Stakeholder Management Hub &bull; &copy; 2026 All Rights Reserved
      </td>
    </tr></tbody></table>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-rose-50/30">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-rose-600 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-violet-50 border border-violet-100 text-violet-700 text-xs font-semibold"><CalendarDays size={11} />Per-Stakeholder</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/relationship-hub" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-rose-600 transition-colors"><ArrowLeft size={14} />Back to Relationship Hub</Link>
          <CopyAllButton targetRef={fullRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-violet-100 flex items-center justify-center"><Handshake size={20} className="text-violet-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">Stakeholder Meeting History Index</h2><p className="text-xs font-medium text-violet-600">Per Stakeholder &bull; Never Lose Context</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Your complete interaction history with each stakeholder. Log decisions, commitments, and key takeaways so you never walk into a meeting unprepared. This is your institutional memory &mdash; especially valuable during handoffs or when resuming after a break.</p>
        </div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">View Mode</p>
          <div className="flex flex-wrap gap-2">
            {LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (
              <button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-violet-600 text-white border-violet-600 shadow-md shadow-violet-200" : "bg-white text-slate-600 border-slate-200 hover:border-violet-300 hover:text-violet-700"}`}>
                <Icon size={15} /><span>{l.label}</span><span className={`text-[10px] font-medium ${isActive ? "text-violet-200" : "text-slate-400"}`}>{l.desc}</span>
              </button>
            ); })}
          </div>
        </div>
        <div ref={fullRef} style={{ fontFamily: S.font }}>
          {layout === "full" && <>{renderTitleBanner()}{renderHistory()}{renderCommitments()}{renderTips()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderHistory()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullRef} /></div>
      </div>
    </div>
  );
}

export default function StakeholderMeetingHistoryPage() { return <ThemeProvider><MeetingHistoryContent /></ThemeProvider>; }
