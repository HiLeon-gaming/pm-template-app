"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, Handshake, LayoutDashboard, AlignJustify, ClipboardCheck } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Log", desc: "Commitments + overdue tracker + tips", icon: LayoutDashboard },
  { id: "compact", label: "Quick Log", desc: "Commitments table only", icon: AlignJustify },
];

function CommitmentsContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullRef = useRef<HTMLDivElement>(null);
  const logRef = useRef<HTMLDivElement>(null);
  const overdueRef = useRef<HTMLDivElement>(null);
  const tipsRef = useRef<HTMLDivElement>(null);

  const accent = "#EA580C";
  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>COMMITMENTS LOG (MASTER)</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; Relationship &amp; Stakeholder Management Hub &nbsp;|&nbsp; Trust Through Follow-Through</td></tr>
    </tbody></table>
  );

  const renderLog = () => (
    <div ref={logRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(accent)}>ALL ACTIVE COMMITMENTS</div>
      <CopyButton targetRef={logRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>Every promise you make to a stakeholder goes here. Every promise they make to you goes here. Nothing falls through the cracks. Review this list every Monday morning and every Friday afternoon.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "4%", textAlign: "center" as const }}>#</th>
          <th style={{ ...S.thPrimary, width: "8%" }}>Date Made</th>
          <th style={{ ...S.thPrimary, width: "10%" }}>To / From</th>
          <th style={{ ...S.thPrimary, width: "8%" }}>Owner</th>
          <th style={S.thPrimary}>Commitment</th>
          <th style={{ ...S.thPrimary, width: "8%" }}>Due</th>
          <th style={{ ...S.thPrimary, width: "9%", textAlign: "center" as const }}>Status</th>
          <th style={{ ...S.thPrimary, width: "8%" }}>Follow-Up</th>
        </tr></thead>
        <tbody>
          {[
            { n: "1", date: "Mar 12", tf: "Maria Lopez", owner: "You", item: "Send vendor comparison document with 3 options and recommendation.", due: "Mar 14", status: "Done", fu: "\u2014" },
            { n: "2", date: "Mar 12", tf: "Maria Lopez", owner: "Them", item: "Confirm board meeting slot for vendor presentation.", due: "Mar 15", status: "Pending", fu: "Mar 14" },
            { n: "3", date: "Mar 5", tf: "David Park", owner: "You", item: "Send updated budget breakdown with Q2 projections.", due: "Mar 10", status: "Overdue", fu: "TODAY" },
            { n: "4", date: "Mar 5", tf: "James Wu", owner: "Them", item: "Provide API dependency timeline from engineering team.", due: "Mar 12", status: "Waiting", fu: "Mar 13" },
            { n: "5", date: "Feb 28", tf: "SteerCo", owner: "You", item: "Prepare Q1 results deck for Phase 2 approval.", due: "Mar 20", status: "In Progress", fu: "Mar 18" },
            { n: "6", date: "[Date]", tf: "[Who]", owner: "[You/Them]", item: "[What was committed]", due: "[When]", status: "[Status]", fu: "[Date]" },
            { n: "7", date: "[Date]", tf: "[Who]", owner: "[You/Them]", item: "[What was committed]", due: "[When]", status: "[Status]", fu: "[Date]" },
            { n: "8", date: "[Date]", tf: "[Who]", owner: "[You/Them]", item: "[What was committed]", due: "[When]", status: "[Status]", fu: "[Date]" },
            { n: "9", date: "[Date]", tf: "[Who]", owner: "[You/Them]", item: "[What was committed]", due: "[When]", status: "[Status]", fu: "[Date]" },
            { n: "10", date: "[Date]", tf: "[Who]", owner: "[You/Them]", item: "[What was committed]", due: "[When]", status: "[Status]", fu: "[Date]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            const sc = r.status === "Done" ? { bg: C.badgeGreenBg, fg: C.badgeGreenFg } : r.status === "In Progress" ? { bg: C.badgeAmberBg, fg: C.badgeAmberFg } : r.status === "Overdue" ? { bg: C.badgeRedBg, fg: C.badgeRedFg } : r.status === "Waiting" ? { bg: "#DBEAFE", fg: "#1D4ED8" } : { bg: C.badgeGrayBg, fg: C.badgeGrayFg };
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 800, fontSize: "10px" }}>{r.n}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", color: accent, fontWeight: 600 }}>{r.date}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", fontWeight: 700 }}>{r.tf}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", fontWeight: 700 }}>{r.owner}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px" }}>{r.item}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", color: C.textMuted }}>{r.due}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(sc.bg, sc.fg)}>{r.status}</span></td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", color: r.fu === "TODAY" ? "#DC2626" : C.textMuted, fontWeight: r.fu === "TODAY" ? 800 : 400 }}>{r.fu}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderOverdue = () => (
    <div ref={overdueRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner("#DC2626")}>OVERDUE &amp; AT-RISK COMMITMENTS</div>
      <CopyButton targetRef={overdueRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>Anything overdue or at risk of being missed. These need immediate attention. Nothing destroys trust faster than a dropped commitment.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "12%" }}>Stakeholder</th>
          <th style={S.thPrimary}>Commitment</th>
          <th style={{ ...S.thPrimary, width: "10%" }}>Was Due</th>
          <th style={{ ...S.thPrimary, width: "10%" }}>Days Late</th>
          <th style={{ ...S.thPrimary, width: "25%" }}>Recovery Plan</th>
        </tr></thead>
        <tbody>
          {[
            { who: "David Park", item: "Send updated budget breakdown with Q2 projections.", due: "Mar 10", late: "3 days", plan: "Send today with apology for delay. Include extra detail to compensate." },
            { who: "[Stakeholder]", item: "[What was committed]", due: "[Date]", late: "[X days]", plan: "[How you\u2019ll recover and prevent future misses]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 700, color: "#DC2626" }}>{r.who}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px" }}>{r.item}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", color: C.textMuted }}>{r.due}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 700, color: "#DC2626", textAlign: "center" as const }}>{r.late}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px" }}>{r.plan}</td>
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
            <thead><tr><td style={{ backgroundColor: "#FFF7ED", color: "#EA580C", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #EA580C" }}>COMMITMENT MANAGEMENT RULES</td></tr></thead>
            <tbody>
              {[
                { color: "#EA580C", tip: "Log it within 5 minutes of making it.", detail: "If you don\u2019t log it immediately, you\u2019ll forget. Open this page right after the meeting." },
                { color: "#059669", tip: "Review every Monday and Friday.", detail: "Monday: what\u2019s due this week? Friday: what did I miss? This takes 5 minutes." },
                { color: "#0EA5E9", tip: "Communicate BEFORE you\u2019re late.", detail: "If you\u2019re going to miss a deadline, tell them 48h before. Silence = broken trust." },
                { color: "#D97706", tip: "Track THEIR commitments too.", detail: "If someone owes you something, follow up. Don\u2019t assume it\u2019s coming." },
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
            <thead><tr><td style={{ backgroundColor: "#FEF3C7", color: "#D97706", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #D97706" }}>TRUST-BUILDING THROUGH FOLLOW-THROUGH</td></tr></thead>
            <tbody>
              {[
                { color: "#DC2626", tip: "Under-promise, over-deliver.", detail: "Say \u201CI\u2019ll have it by Thursday\u201D and deliver Wednesday. Never the reverse." },
                { color: "#EA580C", tip: "Close the loop explicitly.", detail: "\u201CAs promised, here\u2019s the report we discussed.\u201D This signals reliability." },
                { color: "#D97706", tip: "Make broken commitments rare and memorable.", detail: "If you rarely miss, people forgive the occasional miss. If you frequently miss, no apology helps." },
                { color: "#6366F1", tip: "The commitment log IS your reputation.", detail: "Your track record of keeping promises is the foundation of every professional relationship." },
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
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-orange-50 border border-orange-100 text-orange-700 text-xs font-semibold"><ClipboardCheck size={11} />Trust Engine</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/relationship-hub" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-rose-600 transition-colors"><ArrowLeft size={14} />Back to Relationship Hub</Link>
          <CopyAllButton targetRef={fullRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center"><Handshake size={20} className="text-orange-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">Commitments Log (Master)</h2><p className="text-xs font-medium text-orange-600">Trust Engine &bull; Never Drop a Promise</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Your single source of truth for every promise made &mdash; by you and to you. Nothing kills credibility faster than a forgotten commitment. Review this every Monday morning, follow up on anything overdue, and close the loop on everything you deliver. This is the foundation of trust.</p>
        </div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">View Mode</p>
          <div className="flex flex-wrap gap-2">
            {LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (
              <button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-orange-600 text-white border-orange-600 shadow-md shadow-orange-200" : "bg-white text-slate-600 border-slate-200 hover:border-orange-300 hover:text-orange-700"}`}>
                <Icon size={15} /><span>{l.label}</span><span className={`text-[10px] font-medium ${isActive ? "text-orange-200" : "text-slate-400"}`}>{l.desc}</span>
              </button>
            ); })}
          </div>
        </div>
        <div ref={fullRef} style={{ fontFamily: S.font }}>
          {layout === "full" && <>{renderTitleBanner()}{renderLog()}{renderOverdue()}{renderTips()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderLog()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullRef} /></div>
      </div>
    </div>
  );
}

export default function CommitmentsLogPage() { return <ThemeProvider><CommitmentsContent /></ThemeProvider>; }
