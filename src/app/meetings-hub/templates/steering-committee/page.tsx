"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, Shield, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Meeting", desc: "Status + decisions + escalations + actions", icon: LayoutDashboard },
  { id: "compact", label: "Quick Meeting", desc: "Status + decisions only", icon: AlignJustify },
];

function SteeringCommitteeContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const decisionsRef = useRef<HTMLDivElement>(null);
  const escalationsRef = useRef<HTMLDivElement>(null);

  const accent = "#7C3AED"; const accentDark = "#6D28D9";

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>🛡️ GOVERNANCE / STEERING COMMITTEE</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; Meetings Hub Pro &nbsp;|&nbsp; Executive &amp; Leadership</td></tr>
    </tbody></table>
  );

  const renderHeader = () => (
    <div ref={headerRef} style={{ marginBottom: "12px" }}>
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "18%" }}>Program / Portfolio</td><td style={{ ...S.td0, width: "32%", fontWeight: 700, color: accent }}>[Program Name / Portfolio]</td><td style={{ ...S.tdLabel, width: "18%" }}>Date</td><td style={{ ...S.td0, width: "32%" }}>[MM/DD/YYYY]</td></tr>
        <tr><td style={S.tdLabelAlt}>Chair</td><td style={S.tdAlt}>[Sponsor / Executive Chair]</td><td style={S.tdLabelAlt}>Cadence</td><td style={S.tdAlt}>[Monthly / Bi-weekly]</td></tr>
        <tr><td style={S.tdLabel}>Committee Members</td><td colSpan={3} style={S.td0}>[Names, titles — decision-making authority noted]</td></tr>
      </tbody></table>
      <CopyButton targetRef={headerRef} label="Copy Section" />
    </div>
  );

  const renderStatus = () => (
    <div ref={statusRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(accent)}>📊 PROJECT / PROGRAM STATUS</div>
      <CopyButton targetRef={statusRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={S.thPrimary}>Project / Workstream</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Overall</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Schedule</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Budget</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Scope</th>
          <th style={{ ...S.thPrimary, width: "12%" }}>PM</th>
          <th style={{ ...S.thPrimary, width: "20%" }}>Key Update</th>
        </tr></thead>
        <tbody>
          {[
            { project: "[Project Alpha — Platform Rebuild]", overall: "🟢", sched: "🟢", budget: "🟡", scope: "🟢", pm: "[PM 1]", update: "[On track — phase 2 starting next week]" },
            { project: "[Project Beta — Mobile App]", overall: "🟡", sched: "🟡", budget: "🟢", scope: "🔴", pm: "[PM 2]", update: "[At risk — 3 scope changes pending approval]" },
            { project: "[Project Gamma — Data Migration]", overall: "🔴", sched: "🔴", budget: "🟡", scope: "🟢", pm: "[PM 3]", update: "[Off track — 3 weeks behind, resource gap]" },
            { project: "[Project Delta — Security Upgrade]", overall: "🟢", sched: "🟢", budget: "🟢", scope: "🟢", pm: "[PM 4]", update: "[Ahead of schedule — testing next week]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 600 }}>{r.project}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "14px" }}>{r.overall}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "14px" }}>{r.sched}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "14px" }}>{r.budget}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "14px" }}>{r.scope}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 600 }}>{r.pm}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", color: C.textMuted }}>{r.update}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderDecisions = () => (
    <div ref={decisionsRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(accentDark)}>⚖️ DECISIONS REQUIRED</div>
      <CopyButton targetRef={decisionsRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "5%", textAlign: "center" as const }}>#</th>
          <th style={S.thPrimary}>Decision</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Impact</th>
          <th style={{ ...S.thPrimary, width: "15%" }}>Recommendation</th>
          <th style={{ ...S.thPrimary, width: "12%", textAlign: "center" as const }}>Outcome</th>
        </tr></thead>
        <tbody>
          {[
            { decision: "[Approve scope change for Project Beta — add offline mode]", impact: "High", iBg: C.badgeRedBg, iFg: C.badgeRedFg, rec: "[Approve with 2-week extension]", outcome: "[Approved / Rejected / Deferred]" },
            { decision: "[Add 2 contractors to Project Gamma to recover schedule]", impact: "Medium", iBg: C.badgeAmberBg, iFg: C.badgeAmberFg, rec: "[Approve — within contingency budget]", outcome: "[Approved / Rejected / Deferred]" },
            { decision: "[Prioritize Project Alpha phase 3 over Project Beta features]", impact: "High", iBg: C.badgeRedBg, iFg: C.badgeRedFg, rec: "[Approve — higher business value]", outcome: "[Approved / Rejected / Deferred]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 800, fontSize: "14px", color: accent }}>{i + 1}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.decision}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.iBg, r.iFg)}>{r.impact}</span></td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", fontWeight: 600 }}>{r.rec}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "10px", fontWeight: 700, color: accent }}>{r.outcome}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderEscalations = () => (
    <div ref={escalationsRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(accent)}>🚨 ESCALATIONS &amp; ACTION ITEMS</div>
      <CopyButton targetRef={escalationsRef} label="Copy Section" />
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "22%" }}>Escalations</td><td style={{ ...S.td0, color: "#DC2626", fontWeight: 600 }}>[Project Gamma 3 weeks behind — needs executive intervention on resource allocation]</td></tr>
        <tr><td style={S.tdLabelAlt}>Action Items</td><td style={S.tdAlt}>[1) HR to expedite contractor onboarding — by 03/10. 2) PM 2 to resubmit scope change — by 03/08. 3) CFO to approve contingency release — by 03/07.]</td></tr>
        <tr><td style={S.tdLabel}>Risks Flagged</td><td style={S.td0}>[New regulatory requirement may impact Project Alpha timeline — investigating]</td></tr>
        <tr><td style={S.tdLabelAlt}>Minutes Sent By</td><td style={S.tdAlt}>[PMO — within 24 hours]</td></tr>
        <tr><td style={S.tdLabel}>Next Meeting</td><td style={{ ...S.td0, fontWeight: 700, color: accent }}>[Date / Time]</td></tr>
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-violet-50/30">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-violet-500 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-violet-50 border border-violet-100 text-violet-700 text-xs font-semibold"><Shield size={11} />Governance</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/meetings-hub" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-violet-600 transition-colors"><ArrowLeft size={14} />Back to Meetings Hub Pro</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-violet-100 flex items-center justify-center"><Shield size={20} className="text-violet-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">Governance / Steering Committee</h2><p className="text-xs font-medium text-violet-600">Portfolio Status &bull; Decisions &bull; Escalations</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Program governance template with RAG status across projects, decisions requiring approval, escalations, and action items.</p>
        </div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">View Mode</p>
          <div className="flex flex-wrap gap-2">
            {LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (
              <button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-violet-500 text-white border-violet-500 shadow-md shadow-violet-200" : "bg-white text-slate-600 border-slate-200 hover:border-violet-300 hover:text-violet-700"}`}>
                <Icon size={15} /><span>{l.label}</span><span className={`text-[10px] font-medium ${isActive ? "text-violet-200" : "text-slate-400"}`}>{l.desc}</span>
              </button>
            ); })}
          </div>
        </div>
        <div ref={fullPageRef} style={{ fontFamily: S.font }}>
          {layout === "full" && <>{renderTitleBanner()}{renderHeader()}{renderStatus()}{renderDecisions()}{renderEscalations()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderHeader()}{renderStatus()}{renderDecisions()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function SteeringCommitteePage() { return <ThemeProvider><SteeringCommitteeContent /></ThemeProvider>; }
