"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, Send, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Tracker", desc: "Delegated items + follow-up schedule + tips", icon: LayoutDashboard },
  { id: "compact", label: "Quick View", desc: "Delegation table only", icon: AlignJustify },
];

function DelegationContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullRef = useRef<HTMLDivElement>(null);
  const delRef = useRef<HTMLDivElement>(null);
  const followRef = useRef<HTMLDivElement>(null);
  const tipsRef = useRef<HTMLDivElement>(null);

  const accent = "#059669";

  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>DELEGATION &amp; FOLLOW-UPS TRACKER</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; OKR &amp; Operating Rhythm Hub &nbsp;|&nbsp; What Was Delegated &bull; When to Follow Up</td></tr>
    </tbody></table>
  );

  const renderDel = () => (
    <div ref={delRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accent)}>DELEGATED ITEMS</td></tr></tbody></table>
      <CopyButton targetRef={delRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>Track everything you&apos;ve delegated. If you don&apos;t track it, you&apos;ll either forget or micromanage. Neither is good.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "5%", textAlign: "center" as const }}>#</th>
          <th style={S.thPrimary}>What Was Delegated</th>
          <th style={{ ...S.thPrimary, width: "10%" }}>Delegated To</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Delegated</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Due</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Follow-Up</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Status</th>
          <th style={{ ...S.thPrimary, width: "15%" }}>Notes</th>
        </tr></thead>
        <tbody>
          {[
            { what: "Draft enterprise sales playbook outline", to: "[Mike D.]", delegated: "Mon W3", due: "Fri W4", followup: "Wed W4", s: "In Progress", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg, notes: "Check-in scheduled for Wed." },
            { what: "Design detractor recovery call script", to: "[CX Lead]", delegated: "Mon W2", due: "Thu W3", followup: "Tue W3", s: "Overdue", sBg: C.badgeRedBg, sFg: C.badgeRedFg, notes: "Blocked on NPS data. Escalated to IT." },
            { what: "Create 3 LinkedIn ad variations", to: "[Content]", delegated: "Mon W3", due: "Wed W3", followup: "Tue W3", s: "Done", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg, notes: "All 3 live. Monitoring performance." },
            { what: "Set up pulse survey in Culture Amp", to: "[PeopleOps]", delegated: "Mon W3", due: "Wed W3", followup: "Tue W3", s: "In Progress", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg, notes: "Questions finalized. Send Wed." },
            { what: "Schedule 5 customer intro calls for enterprise warm leads", to: "[CS Lead]", delegated: "Mon W3", due: "Thu W3", followup: "Wed W3", s: "Not Started", sBg: C.badgeAmberBg, sFg: C.badgeAmberFg, notes: "CS Lead out Mon. Check Tue." },
            { what: "[Your delegated item]", to: "", delegated: "", due: "", followup: "", s: "", sBg: "transparent", sFg: C.textMuted, notes: "" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 800, fontSize: "12px", color: accent }}>{i + 1}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 600 }}>{r.what}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", fontWeight: 700 }}>{r.to}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "9px" }}>{r.delegated}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "9px", fontWeight: 700 }}>{r.due}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "9px", fontWeight: 700, color: "#D97706" }}>{r.followup}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}>{r.s && <span style={S.badge(r.sBg, r.sFg)}>{r.s}</span>}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "8px" }}>{r.notes}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderFollowAndTips = () => (
    <div ref={followRef} style={{ marginBottom: "12px" }}>
      <CopyButton targetRef={followRef} label="Copy Section" />
      <table style={LT}><tbody><tr>
        <td style={{ ...LC, width: "55%", paddingRight: "4px" }}>
          <table style={S.tbl}>
            <thead><tr><td style={{ backgroundColor: "#FEF3C7", color: "#D97706", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #D97706" }}>📅 FOLLOW-UP SCHEDULE</td></tr></thead>
            <tbody>
              {[
                { day: "Mon", who: "[Content]", about: "LinkedIn ad variations ready?" },
                { day: "Tue", who: "[CX Lead]", about: "Detractor script — NPS data unblocked?" },
                { day: "Tue", who: "[PeopleOps]", about: "Pulse survey questions finalized?" },
                { day: "Wed", who: "[Mike D.]", about: "Enterprise playbook outline progress" },
                { day: "Wed", who: "[CS Lead]", about: "Customer intro calls scheduled?" },
                { day: "Thu", who: "[Recruiter]", about: "VP Eng pipeline — strong candidates?" },
                { day: "Fri", who: "[All]", about: "Review all delegated items — update statuses" },
              ].map((r, i) => {
                const bg = i % 2 === 1 ? C.rowAlt : C.white;
                return (
                  <tr key={i}>
                    <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", padding: "4px 10px" }}>
                      <span style={{ fontWeight: 700, color: "#D97706" }}>{r.day}</span> <span style={{ fontWeight: 600 }}>{r.who}</span> &mdash; <span style={{ fontSize: "9px", color: C.textMuted }}>{r.about}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </td>
        <td style={{ ...LC, width: "45%", paddingLeft: "4px" }}>
          <table style={S.tbl}>
            <thead><tr><td style={{ backgroundColor: "#EDE9FE", color: "#7C3AED", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #7C3AED" }}>💡 DELEGATION TIPS</td></tr></thead>
            <tbody>
              {[
                { color: accent, tip: "Delegate the WHAT, not the HOW.", detail: "Tell people the outcome. Let them figure out the path." },
                { color: "#DC2626", tip: "Set follow-up date at delegation time.", detail: "'I'll check in Wednesday' = accountability. Never open-ended." },
                { color: "#D97706", tip: "Overdue \u2260 failure.", detail: "Ask 'what's blocking you?' not 'why didn't you do this?'" },
                { color: "#7C3AED", tip: "Review every Friday.", detail: "Clean Done. Escalate Overdue. Add new delegations for next week." },
              ].map((r, i) => {
                const bg = i % 2 === 1 ? C.rowAlt : C.white;
                return (
                  <tr key={i}>
                    <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", padding: "5px 10px" }}>
                      <strong style={{ color: r.color }}>{r.tip}</strong><br />
                      <span style={{ fontSize: "9px", color: C.textMuted }}>{r.detail}</span>
                    </td>
                  </tr>
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
        ExecNoteShop &bull; OKR &amp; Operating Rhythm Hub &bull; &copy; 2026 All Rights Reserved
      </td>
    </tr></tbody></table>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50/30">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-600 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-semibold"><Send size={11} />Delegation</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/okr-hub" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-emerald-600 transition-colors"><ArrowLeft size={14} />Back to OKR Hub</Link>
          <CopyAllButton targetRef={fullRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center"><Send size={20} className="text-emerald-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">Delegation &amp; Follow-Ups Tracker</h2><p className="text-xs font-medium text-emerald-600">What Was Delegated &bull; When to Follow Up</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Track delegated work, follow-up dates, and statuses. Leader-friendly accountability without micromanaging.</p>
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
          {layout === "full" && <>{renderTitleBanner()}{renderDel()}{renderFollowAndTips()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderDel()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullRef} /></div>
      </div>
    </div>
  );
}

export default function DelegationFollowupsTrackerPage() { return <ThemeProvider><DelegationContent /></ThemeProvider>; }
