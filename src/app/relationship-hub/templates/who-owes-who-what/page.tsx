"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, Handshake, LayoutDashboard, AlignJustify, ArrowLeftRight } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Tracker", desc: "Both directions + summary + tips", icon: LayoutDashboard },
  { id: "compact", label: "Quick View", desc: "Tables only", icon: AlignJustify },
];

function OwesContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullRef = useRef<HTMLDivElement>(null);
  const youOweRef = useRef<HTMLDivElement>(null);
  const theyOweRef = useRef<HTMLDivElement>(null);
  const tipsRef = useRef<HTMLDivElement>(null);

  const accent = "#EA580C";
  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>&quot;WHO OWES WHO WHAT&quot; TRACKER</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; Relationship &amp; Stakeholder Management Hub &nbsp;|&nbsp; Mutual Accountability</td></tr>
    </tbody></table>
  );

  const renderYouOwe = () => (
    <div ref={youOweRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner("#DC2626")}>WHAT YOU OWE OTHERS</div>
      <CopyButton targetRef={youOweRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>Everything you&apos;ve promised to deliver. These are YOUR reputation on the line. Deliver early when possible, communicate proactively when you can&apos;t.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "12%" }}>To Whom</th>
          <th style={S.thPrimary}>What You Owe</th>
          <th style={{ ...S.thPrimary, width: "10%" }}>Promised</th>
          <th style={{ ...S.thPrimary, width: "10%" }}>Due</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Status</th>
        </tr></thead>
        <tbody>
          {[
            { who: "Maria Lopez", what: "Vendor comparison document with 3 options and recommendation.", promised: "Mar 12", due: "Mar 14", status: "In Progress" },
            { who: "David Park", what: "Updated budget breakdown with Q2 projections.", promised: "Mar 5", due: "Mar 10", status: "Overdue" },
            { who: "SteerCo", what: "Q1 results deck for Phase 2 approval.", promised: "Feb 28", due: "Mar 20", status: "In Progress" },
            { who: "Sarah Chen", what: "Sprint results summary with key wins for her to share.", promised: "Mar 8", due: "Mar 15", status: "Pending" },
            { who: "[Stakeholder]", what: "[What you committed to deliver]", promised: "[Date]", due: "[Date]", status: "[Status]" },
            { who: "[Stakeholder]", what: "[What you committed to deliver]", promised: "[Date]", due: "[Date]", status: "[Status]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            const sc = r.status === "Overdue" ? { bg: C.badgeRedBg, fg: C.badgeRedFg } : r.status === "In Progress" ? { bg: C.badgeAmberBg, fg: C.badgeAmberFg } : r.status === "Pending" ? { bg: C.badgeGrayBg, fg: C.badgeGrayFg } : { bg: C.badgeGreenBg, fg: C.badgeGreenFg };
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 700 }}>{r.who}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px" }}>{r.what}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", color: C.textMuted }}>{r.promised}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", color: r.status === "Overdue" ? "#DC2626" : C.textMuted, fontWeight: r.status === "Overdue" ? 700 : 400 }}>{r.due}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(sc.bg, sc.fg)}>{r.status}</span></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderTheyOwe = () => (
    <div ref={theyOweRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner("#0EA5E9")}>WHAT OTHERS OWE YOU</div>
      <CopyButton targetRef={theyOweRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>Everything others have promised to deliver to you. Don&apos;t assume it&apos;s coming &mdash; follow up proactively. Your project depends on these deliverables.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "12%" }}>From Whom</th>
          <th style={S.thPrimary}>What They Owe</th>
          <th style={{ ...S.thPrimary, width: "10%" }}>Promised</th>
          <th style={{ ...S.thPrimary, width: "10%" }}>Due</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Status</th>
          <th style={{ ...S.thPrimary, width: "10%" }}>Follow-Up</th>
        </tr></thead>
        <tbody>
          {[
            { who: "Maria Lopez", what: "Confirm board meeting slot for vendor presentation.", promised: "Mar 12", due: "Mar 15", status: "Waiting", fu: "Mar 14" },
            { who: "James Wu", what: "API dependency timeline from engineering team.", promised: "Mar 5", due: "Mar 12", status: "Overdue", fu: "TODAY" },
            { who: "Sarah Chen", what: "Marketing requirements doc for Phase 2.", promised: "Mar 1", due: "Mar 18", status: "On Track", fu: "Mar 16" },
            { who: "[Stakeholder]", what: "[What they committed to deliver]", promised: "[Date]", due: "[Date]", status: "[Status]", fu: "[Date]" },
            { who: "[Stakeholder]", what: "[What they committed to deliver]", promised: "[Date]", due: "[Date]", status: "[Status]", fu: "[Date]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            const sc = r.status === "Overdue" ? { bg: C.badgeRedBg, fg: C.badgeRedFg } : r.status === "Waiting" ? { bg: C.badgeAmberBg, fg: C.badgeAmberFg } : r.status === "On Track" ? { bg: C.badgeGreenBg, fg: C.badgeGreenFg } : { bg: C.badgeGrayBg, fg: C.badgeGrayFg };
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 700 }}>{r.who}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px" }}>{r.what}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", color: C.textMuted }}>{r.promised}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", color: r.status === "Overdue" ? "#DC2626" : C.textMuted, fontWeight: r.status === "Overdue" ? 700 : 400 }}>{r.due}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(sc.bg, sc.fg)}>{r.status}</span></td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", color: r.fu === "TODAY" ? "#DC2626" : C.textMuted, fontWeight: r.fu === "TODAY" ? 800 : 400 }}>{r.fu}</td>
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
            <thead><tr><td style={{ backgroundColor: "#FEE2E2", color: "#DC2626", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #DC2626" }}>MANAGING WHAT YOU OWE</td></tr></thead>
            <tbody>
              {[
                { color: "#DC2626", tip: "Deliver early whenever possible.", detail: "Early delivery builds a reputation for reliability. It\u2019s the fastest way to build trust." },
                { color: "#EA580C", tip: "If you\u2019ll be late, communicate 48h before.", detail: "Bad news early is management. Bad news late is failure." },
                { color: "#D97706", tip: "Close the loop explicitly.", detail: "\u201CAs promised, here\u2019s X.\u201D Don\u2019t just silently deliver. Make sure they know you kept your word." },
                { color: "#059669", tip: "Don\u2019t over-commit.", detail: "It\u2019s better to say \u201CI can\u2019t commit to that timeline\u201D than to commit and fail." },
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
            <thead><tr><td style={{ backgroundColor: "#DBEAFE", color: "#0EA5E9", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #0EA5E9" }}>FOLLOWING UP ON WHAT THEY OWE</td></tr></thead>
            <tbody>
              {[
                { color: "#0EA5E9", tip: "Follow up before the deadline.", detail: "A friendly \u201CJust checking in \u2014 still on track for Thursday?\u201D prevents missed deliverables." },
                { color: "#6366F1", tip: "Make follow-ups easy and specific.", detail: "\u201CHi James \u2014 do you have the API timeline? I need it by Thursday for the SteerCo deck.\u201D" },
                { color: "#D97706", tip: "Don\u2019t let overdue items slide.", detail: "If something is overdue by >3 days, address it directly. Silence enables more delays." },
                { color: "#DC2626", tip: "Document everything.", detail: "If a deliverable consistently slips, you may need to escalate. Having dates and context helps." },
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
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-orange-50 border border-orange-100 text-orange-700 text-xs font-semibold"><ArrowLeftRight size={11} />Accountability</span>
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
            <div><h2 className="text-2xl font-extrabold text-slate-900">&quot;Who Owes Who What&quot; Tracker</h2><p className="text-xs font-medium text-orange-600">Mutual Accountability &bull; Two-Way Follow-Through</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">A clear two-way view of all mutual obligations. What you owe others and what others owe you &mdash; in one place. This prevents dropped commitments in both directions and gives you the data to follow up professionally.</p>
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
          {layout === "full" && <>{renderTitleBanner()}{renderYouOwe()}{renderTheyOwe()}{renderTips()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderYouOwe()}{renderTheyOwe()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullRef} /></div>
      </div>
    </div>
  );
}

export default function WhoOwesWhoWhatPage() { return <ThemeProvider><OwesContent /></ThemeProvider>; }
