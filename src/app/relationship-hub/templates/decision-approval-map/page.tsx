"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, Handshake, LayoutDashboard, AlignJustify, ShieldCheck } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Map", desc: "Authority matrix + escalation paths + tips", icon: LayoutDashboard },
  { id: "compact", label: "Quick Map", desc: "Authority matrix only", icon: AlignJustify },
];

function DecisionMapContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const escRef = useRef<HTMLDivElement>(null);
  const tipsRef = useRef<HTMLDivElement>(null);

  const accent = "#8B5CF6";
  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>DECISION &amp; APPROVAL MAP</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; Relationship &amp; Stakeholder Management Hub &nbsp;|&nbsp; Speeds Execution</td></tr>
    </tbody></table>
  );

  const renderMap = () => (
    <div ref={mapRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accent)}>STAKEHOLDER: [NAME] &mdash; DECISION AUTHORITY</td></tr></tbody></table>
      <CopyButton targetRef={mapRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>Map what this stakeholder can approve, block, or influence. Knowing this prevents you from asking the wrong person for a decision and speeds up execution. Update whenever their authority or role changes.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "18%" }}>Decision Area</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Approve</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Block</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Influence</th>
          <th style={S.thPrimary}>Context &amp; Conditions</th>
          <th style={{ ...S.thPrimary, width: "18%" }}>If Blocked, Escalate To</th>
        </tr></thead>
        <tbody>
          {[
            { area: "Budget / Funding", approve: "Yes", block: "Yes", influence: "Yes", notes: "Controls department budget. Needs ROI justification for anything over $50K. Prefers one-pager with financials.", esc: "CFO (David Park)" },
            { area: "Scope Changes", approve: "No", block: "Yes", influence: "Yes", notes: "Won’t approve scope changes but can veto changes that affect their team’s workload.", esc: "Steering Committee" },
            { area: "Timeline / Schedule", approve: "No", block: "No", influence: "Yes", notes: "Will push back if timeline impacts their deliverables. Give 2 weeks notice for changes.", esc: "Project Sponsor" },
            { area: "Resource Allocation", approve: "Yes", block: "Yes", influence: "Yes", notes: "Owns headcount decisions for their function. Protective of team capacity.", esc: "VP Operations" },
            { area: "Vendor Selection", approve: "No", block: "No", influence: "Yes", notes: "Has strong opinions on vendors. Consult early to avoid late-stage surprises.", esc: "Procurement Lead" },
            { area: "Go/No-Go Decisions", approve: "Yes", block: "Yes", influence: "Yes", notes: "Part of steering committee; one of 3 votes needed. Needs 48h to review materials.", esc: "Executive Sponsor" },
            { area: "External Comms", approve: "No", block: "No", influence: "Yes", notes: "Wants to review any external communications that reference their department.", esc: "Comms Director" },
            { area: "[Enter decision area]", approve: "[Y/N]", block: "[Y/N]", influence: "[Y/N]", notes: "[Context and conditions]", esc: "[Escalation path]" },
            { area: "[Enter decision area]", approve: "[Y/N]", block: "[Y/N]", influence: "[Y/N]", notes: "[Context and conditions]", esc: "[Escalation path]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 700, color: accent }}>{r.area}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.approve === "Yes" ? C.badgeGreenBg : C.badgeGrayBg, r.approve === "Yes" ? C.badgeGreenFg : C.badgeGrayFg)}>{r.approve}</span></td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.block === "Yes" ? C.badgeRedBg : C.badgeGrayBg, r.block === "Yes" ? C.badgeRedFg : C.badgeGrayFg)}>{r.block}</span></td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.influence === "Yes" ? C.badgeAmberBg : C.badgeGrayBg, r.influence === "Yes" ? C.badgeAmberFg : C.badgeGrayFg)}>{r.influence}</span></td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", color: C.textMuted }}>{r.notes}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", fontWeight: 600 }}>{r.esc}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderEscalation = () => (
    <div ref={escRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner("#DC2626")}>ESCALATION &amp; DECISION DEADLOCK PLAN</td></tr></tbody></table>
      <CopyButton targetRef={escRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>When decisions stall or get blocked, this plan tells you exactly what to do. Fill this out proactively so you&apos;re never stuck waiting without options.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "25%" }}>Scenario</th>
          <th style={S.thPrimary}>Your Action Plan</th>
          <th style={{ ...S.thPrimary, width: "20%" }}>Timeline</th>
        </tr></thead>
        <tbody>
          {[
            { scenario: "Stakeholder delays decision beyond agreed date", plan: "[Send reminder with deadline. If no response in 48h, escalate to their manager with context.]", time: "48h grace, then escalate" },
            { scenario: "Stakeholder blocks a decision you believe is correct", plan: "[Request a 30-min conversation to understand objections. Come with data. If still blocked, engage sponsor.]", time: "Within 1 week" },
            { scenario: "Two stakeholders disagree on a decision", plan: "[Document both positions objectively. Propose a meeting with both + a neutral decision-maker.]", time: "Schedule within 3 days" },
            { scenario: "Decision requires authority above this stakeholder", plan: "[Ask stakeholder to sponsor the request upward. Provide them with the materials they need.]", time: "Within 1 week" },
            { scenario: "[Enter scenario]", plan: "[Your approach]", time: "[Timeline]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 700, color: "#DC2626" }}>{r.scenario}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.plan}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", color: C.textMuted }}>{r.time}</td>
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
            <thead><tr><td style={{ backgroundColor: "#EDE9FE", color: "#8B5CF6", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #8B5CF6" }}>DECISION MAPPING BEST PRACTICES</td></tr></thead>
            <tbody>
              {[
                { color: "#8B5CF6", tip: "Map authority, not title.", detail: "A director with budget authority is more powerful than a VP who can only influence. Map actual decision rights." },
                { color: "#059669", tip: "Ask directly: “Who has final say on this?”", detail: "Don’t assume. Many PMs waste weeks going to the wrong person." },
                { color: "#0EA5E9", tip: "Document conditions and thresholds.", detail: "“Approves up to $50K” is more useful than “Approves budgets.” Specificity saves time." },
                { color: "#D97706", tip: "Always have an escalation path.", detail: "For every decision that can be blocked, know who to go to next. Deadlocks are predictable — plan for them." },
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
            <thead><tr><td style={{ backgroundColor: "#FEF3C7", color: "#D97706", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #D97706" }}>COMMON DECISION TRAPS</td></tr></thead>
            <tbody>
              {[
                { color: "#DC2626", tip: "Assuming silence means approval.", detail: "No response is NOT approval. Always get explicit confirmation. “I’ll assume yes if I don’t hear back” is risky." },
                { color: "#EA580C", tip: "Bypassing a blocker without warning.", detail: "Even if you escalate, tell the blocker first. “I need to escalate this” is better than going behind their back." },
                { color: "#D97706", tip: "Asking for decisions without options.", detail: "Never present a problem without solutions. Give 2–3 options with your recommendation." },
                { color: "#6366F1", tip: "Not documenting verbal approvals.", detail: "Every decision should be confirmed in writing. “Per our conversation, we agreed to...” protects everyone." },
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
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-violet-50 border border-violet-100 text-violet-700 text-xs font-semibold"><ShieldCheck size={11} />Per-Stakeholder</span>
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
            <div><h2 className="text-2xl font-extrabold text-slate-900">Decision &amp; Approval Map</h2><p className="text-xs font-medium text-violet-600">Per Stakeholder &bull; Who Can Approve, Block, or Influence Each Decision</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">The fastest way to unblock your work is knowing exactly who has authority over each decision type. This template maps each stakeholder&apos;s decision power so you never waste time asking the wrong person. Include escalation paths for when decisions stall.</p>
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
          {layout === "full" && <>{renderTitleBanner()}{renderMap()}{renderEscalation()}{renderTips()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderMap()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullRef} /></div>
      </div>
    </div>
  );
}

export default function DecisionApprovalMapPage() { return <ThemeProvider><DecisionMapContent /></ThemeProvider>; }
