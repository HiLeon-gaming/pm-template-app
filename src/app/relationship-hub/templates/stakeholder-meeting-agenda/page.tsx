"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, Handshake, LayoutDashboard, AlignJustify, ListOrdered } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Agenda", desc: "Header + agenda + ground rules + tips", icon: LayoutDashboard },
  { id: "compact", label: "Quick Agenda", desc: "Header + agenda only", icon: AlignJustify },
];

function AgendaContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const agendaRef = useRef<HTMLDivElement>(null);
  const tipsRef = useRef<HTMLDivElement>(null);

  const accent = "#059669";
  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>STAKEHOLDER MEETING AGENDA</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; Relationship &amp; Stakeholder Management Hub &nbsp;|&nbsp; Timeboxed &amp; Outcome-Driven</td></tr>
    </tbody></table>
  );

  const renderHeader = () => (
    <div ref={headerRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(accent)}>MEETING DETAILS</div>
      <CopyButton targetRef={headerRef} label="Copy Section" />
      <table style={S.tbl}>
        <tbody>
          {[
            { label: "Meeting Title", value: "[Descriptive title \u2014 not just \u201CSync\u201D]" },
            { label: "Date / Time", value: "[Date, start time, duration]" },
            { label: "Attendees", value: "[Names + roles. Only invite people who NEED to be there.]" },
            { label: "Format", value: "[In-person / Video / Phone]" },
            { label: "Purpose (One Sentence)", value: "[Why are we meeting? What problem are we solving?]" },
            { label: "Desired Outcome", value: "[What MUST be decided/agreed/shared by the end of this meeting?]" },
            { label: "Pre-Read Sent?", value: "[Yes/No. If yes, what was sent and when?]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 700, color: accent, width: "25%" }}>{r.label}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.value}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderAgenda = () => (
    <div ref={agendaRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner("#0EA5E9")}>TIMEBOXED AGENDA</div>
      <CopyButton targetRef={agendaRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>Every item has a time limit, an owner, and a purpose. If it doesn&apos;t need to be in this meeting, take it offline. Respect everyone&apos;s time.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Time</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Duration</th>
          <th style={S.thPrimary}>Topic</th>
          <th style={{ ...S.thPrimary, width: "10%" }}>Owner</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Type</th>
          <th style={{ ...S.thPrimary, width: "20%" }}>Expected Output</th>
        </tr></thead>
        <tbody>
          {[
            { time: "0:00", dur: "2 min", topic: "Welcome & purpose. State the desired outcome upfront.", owner: "You", type: "Inform", output: "Alignment on why we\u2019re here." },
            { time: "0:02", dur: "10 min", topic: "[Main topic #1 \u2014 the most important item goes first]", owner: "[Name]", type: "Decide", output: "[Specific decision needed]" },
            { time: "0:12", dur: "10 min", topic: "[Main topic #2]", owner: "[Name]", type: "Discuss", output: "[What we need to align on]" },
            { time: "0:22", dur: "5 min", topic: "[Status update or information share]", owner: "[Name]", type: "Inform", output: "[Awareness of current state]" },
            { time: "0:27", dur: "3 min", topic: "Recap: decisions made, actions assigned, next steps.", owner: "You", type: "Confirm", output: "Clear actions + owners + dates." },
            { time: "[Time]", dur: "[X min]", topic: "[Additional topic if needed]", owner: "[Name]", type: "[Type]", output: "[Expected output]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            const tc = r.type === "Decide" ? { bg: C.badgeRedBg, fg: C.badgeRedFg } : r.type === "Discuss" ? { bg: C.badgeAmberBg, fg: C.badgeAmberFg } : r.type === "Inform" ? { bg: "#DBEAFE", fg: "#1D4ED8" } : r.type === "Confirm" ? { bg: C.badgeGreenBg, fg: C.badgeGreenFg } : { bg: C.badgeGrayBg, fg: C.badgeGrayFg };
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "10px", fontWeight: 700 }}>{r.time}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "9px", color: C.textMuted }}>{r.dur}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px" }}>{r.topic}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", fontWeight: 700 }}>{r.owner}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(tc.bg, tc.fg)}>{r.type}</span></td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", color: C.textMuted }}>{r.output}</td>
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
            <thead><tr><td style={{ backgroundColor: "#DCFCE7", color: "#059669", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #059669" }}>MEETING RULES</td></tr></thead>
            <tbody>
              {[
                { color: "#059669", tip: "Start on time. End on time.", detail: "Respect the timebox. If you run over, something was badly planned." },
                { color: "#0EA5E9", tip: "State the desired outcome in the first 60 seconds.", detail: "\u201CBy the end of this meeting, we need to decide X.\u201D Focuses everyone immediately." },
                { color: "#8B5CF6", tip: "Put the hardest topic first.", detail: "Energy and attention are highest at the start. Don\u2019t save decisions for the end." },
                { color: "#D97706", tip: "End with actions, not discussions.", detail: "Last 3 minutes = recap decisions + assign actions + confirm next touchpoint." },
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
            <thead><tr><td style={{ backgroundColor: "#FEF3C7", color: "#D97706", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #D97706" }}>TOPIC TYPE GUIDE</td></tr></thead>
            <tbody>
              {[
                { color: "#DC2626", tip: "DECIDE: A decision must be made.", detail: "Come with options and a recommendation. Don\u2019t leave without a decision." },
                { color: "#D97706", tip: "DISCUSS: Alignment needed.", detail: "Not a decision yet, but different perspectives need to be heard and reconciled." },
                { color: "#0EA5E9", tip: "INFORM: One-way update.", detail: "Quick share of status or information. Keep it to 3\u20135 minutes max." },
                { color: "#059669", tip: "CONFIRM: Validate agreement.", detail: "Recap decisions and actions. Get explicit confirmation from all parties." },
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
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-semibold"><ListOrdered size={11} />Agenda</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/relationship-hub" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-rose-600 transition-colors"><ArrowLeft size={14} />Back to Relationship Hub</Link>
          <CopyAllButton targetRef={fullRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center"><Handshake size={20} className="text-emerald-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">Stakeholder Meeting Agenda</h2><p className="text-xs font-medium text-emerald-600">Timeboxed &bull; Outcome-Driven &bull; Respectful of Time</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Every stakeholder meeting should have a clear purpose, timeboxed topics, and expected outputs. This agenda template ensures you run meetings that produce decisions and alignment &mdash; not just discussions. Send the agenda 24h before the meeting.</p>
        </div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">View Mode</p>
          <div className="flex flex-wrap gap-2">
            {LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (
              <button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-200" : "bg-white text-slate-600 border-slate-200 hover:border-emerald-300 hover:text-emerald-700"}`}>
                <Icon size={15} /><span>{l.label}</span><span className={`text-[10px] font-medium ${isActive ? "text-emerald-200" : "text-slate-400"}`}>{l.desc}</span>
              </button>
            ); })}
          </div>
        </div>
        <div ref={fullRef} style={{ fontFamily: S.font }}>
          {layout === "full" && <>{renderTitleBanner()}{renderHeader()}{renderAgenda()}{renderTips()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderHeader()}{renderAgenda()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullRef} /></div>
      </div>
    </div>
  );
}

export default function StakeholderMeetingAgendaPage() { return <ThemeProvider><AgendaContent /></ThemeProvider>; }
