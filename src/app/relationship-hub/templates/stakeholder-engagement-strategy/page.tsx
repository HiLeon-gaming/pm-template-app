"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, Handshake, LayoutDashboard, AlignJustify, Megaphone } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Strategy", desc: "Engagement plan + escalation triggers + tips", icon: LayoutDashboard },
  { id: "compact", label: "Quick Plan", desc: "Engagement table only", icon: AlignJustify },
];

function EngagementContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullRef = useRef<HTMLDivElement>(null);
  const engRef = useRef<HTMLDivElement>(null);
  const escRef = useRef<HTMLDivElement>(null);
  const tipsRef = useRef<HTMLDivElement>(null);

  const accent = "#0EA5E9";
  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>STAKEHOLDER ENGAGEMENT STRATEGY</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; Relationship &amp; Stakeholder Management Hub &nbsp;|&nbsp; Prevents Surprises</td></tr>
    </tbody></table>
  );

  const renderEngagement = () => (
    <div ref={engRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(accent)}>ENGAGEMENT PLAN BY STAKEHOLDER</div>
      <CopyButton targetRef={engRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>Define how you will keep each key stakeholder informed and involved. The goal: the right information, to the right person, at the right time, in the right format. Under-communication is the #1 cause of stakeholder frustration.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={S.thPrimary}>Stakeholder</th>
          <th style={{ ...S.thPrimary, width: "8%" }}>Quadrant</th>
          <th style={S.thPrimary}>What They Need to Know</th>
          <th style={{ ...S.thPrimary, width: "9%" }}>Format</th>
          <th style={{ ...S.thPrimary, width: "9%" }}>Frequency</th>
          <th style={{ ...S.thPrimary, width: "8%" }}>Channel</th>
          <th style={{ ...S.thPrimary, width: "7%" }}>Owner</th>
        </tr></thead>
        <tbody>
          {[
            { name: "Maria Lopez \u2014 Sponsor", quad: "Manage", need: "Project status, risks, budget, decisions needed. Frame in terms of her KPIs.", fmt: "1:1 brief", freq: "Weekly", ch: "Meeting", owner: "You" },
            { name: "David Park \u2014 CFO", quad: "Satisfy", need: "Financial impact, ROI updates, budget variances. Numbers only, no fluff.", fmt: "Email", freq: "Monthly", ch: "Email", owner: "You" },
            { name: "Sarah Chen \u2014 Champion", quad: "Inform", need: "Progress highlights, wins to share with their network. Make them look good.", fmt: "Quick update", freq: "Biweekly", ch: "Slack", owner: "You" },
            { name: "Engineering Team", quad: "Inform", need: "Technical decisions, dependency updates, timeline changes.", fmt: "Standup", freq: "Weekly", ch: "Meeting", owner: "Tech Lead" },
            { name: "Legal / Compliance", quad: "Monitor", need: "Regulatory implications, data privacy updates. Only when relevant.", fmt: "Email", freq: "As needed", ch: "Email", owner: "You" },
            { name: "[Enter stakeholder]", quad: "[Type]", need: "[What they need]", fmt: "[Format]", freq: "[Freq]", ch: "[Channel]", owner: "[Who]" },
            { name: "[Enter stakeholder]", quad: "[Type]", need: "[What they need]", fmt: "[Format]", freq: "[Freq]", ch: "[Channel]", owner: "[Who]" },
            { name: "[Enter stakeholder]", quad: "[Type]", need: "[What they need]", fmt: "[Format]", freq: "[Freq]", ch: "[Channel]", owner: "[Who]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            const qColor = r.quad === "Manage" ? "#DC2626" : r.quad === "Satisfy" ? "#D97706" : r.quad === "Inform" ? "#059669" : "#6366F1";
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 700 }}>{r.name}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "9px", fontWeight: 700, color: qColor }}>{r.quad}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px" }}>{r.need}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", textAlign: "center" as const }}>{r.fmt}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", textAlign: "center" as const }}>{r.freq}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", textAlign: "center" as const }}>{r.ch}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", textAlign: "center" as const }}>{r.owner}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderEscalation = () => (
    <div ref={escRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner("#DC2626")}>ENGAGEMENT ESCALATION TRIGGERS</div>
      <CopyButton targetRef={escRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>When should you increase engagement frequency or escalate? Define triggers upfront so you don&apos;t miss the moment.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={S.thPrimary}>Trigger Event</th>
          <th style={S.thPrimary}>Engagement Change</th>
          <th style={{ ...S.thPrimary, width: "15%" }}>Who to Inform</th>
        </tr></thead>
        <tbody>
          {[
            { trigger: "Project health moves from Green to Amber", change: "Increase sponsor updates to 2x/week. Add a risk section to every update.", who: "Sponsor, SteerCo" },
            { trigger: "Project health moves to Red", change: "Daily sponsor check-in. Immediate SteerCo notification. War room if needed.", who: "All Manage quadrant" },
            { trigger: "Budget overrun exceeds 10%", change: "Notify CFO immediately with impact analysis and mitigation plan.", who: "Sponsor, CFO" },
            { trigger: "Key stakeholder becomes disengaged", change: "Schedule a private 1:1 within 48 hours to re-engage.", who: "That stakeholder" },
            { trigger: "Scope change requested by executive", change: "Brief all Manage quadrant stakeholders within 24 hours on impact.", who: "All Manage quadrant" },
            { trigger: "Team member departure on critical path", change: "Inform sponsor same day. Update timeline and communicate to all stakeholders.", who: "Sponsor, affected teams" },
            { trigger: "[Enter trigger]", change: "[How engagement changes]", who: "[Who to tell]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 600, color: "#DC2626" }}>{r.trigger}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px" }}>{r.change}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", color: C.textMuted }}>{r.who}</td>
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
            <thead><tr><td style={{ backgroundColor: "#DBEAFE", color: "#0EA5E9", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #0EA5E9" }}>ENGAGEMENT PRINCIPLES</td></tr></thead>
            <tbody>
              {[
                { color: "#0EA5E9", tip: "Tailor the message to the audience.", detail: "What matters to the CFO is different from what matters to Engineering. Customize every communication." },
                { color: "#059669", tip: "Frequency should match influence.", detail: "High-influence stakeholders need more frequent, shorter updates. Low-influence need less frequent, broader ones." },
                { color: "#8B5CF6", tip: "Proactive > reactive.", detail: "Sending updates before being asked builds trust. Being asked for updates signals you\u2019re behind." },
                { color: "#D97706", tip: "Review this plan monthly.", detail: "Stakeholders change, priorities shift, and your engagement strategy should adapt." },
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
            <thead><tr><td style={{ backgroundColor: "#FEF3C7", color: "#D97706", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #D97706" }}>ENGAGEMENT ANTI-PATTERNS</td></tr></thead>
            <tbody>
              {[
                { color: "#DC2626", tip: "One-size-fits-all communication.", detail: "Sending the same update to everyone wastes their time and misses the point." },
                { color: "#EA580C", tip: "Over-communicating to low-interest stakeholders.", detail: "If they don\u2019t care about details, don\u2019t send details. Respect their attention." },
                { color: "#D97706", tip: "Under-communicating to high-influence stakeholders.", detail: "Your sponsor should never have to chase you for information. Ever." },
                { color: "#6366F1", tip: "Forgetting the \u201CMonitor\u201D quadrant entirely.", detail: "Low-interest stakeholders can suddenly become high-interest. Don\u2019t ignore them completely." },
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
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-sky-50 border border-sky-100 text-sky-700 text-xs font-semibold"><Megaphone size={11} />Cross-Stakeholder</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/relationship-hub" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-rose-600 transition-colors"><ArrowLeft size={14} />Back to Relationship Hub</Link>
          <CopyAllButton targetRef={fullRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-sky-100 flex items-center justify-center"><Handshake size={20} className="text-sky-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">Stakeholder Engagement Strategy</h2><p className="text-xs font-medium text-sky-600">Cross-Stakeholder &bull; Right Info, Right Person, Right Time</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Your master engagement plan across all stakeholders. Define who needs what, when, and how. Include escalation triggers so you know exactly when to increase communication. Under-communication is the #1 cause of stakeholder frustration.</p>
        </div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">View Mode</p>
          <div className="flex flex-wrap gap-2">
            {LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (
              <button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-sky-600 text-white border-sky-600 shadow-md shadow-sky-200" : "bg-white text-slate-600 border-slate-200 hover:border-sky-300 hover:text-sky-700"}`}>
                <Icon size={15} /><span>{l.label}</span><span className={`text-[10px] font-medium ${isActive ? "text-sky-200" : "text-slate-400"}`}>{l.desc}</span>
              </button>
            ); })}
          </div>
        </div>
        <div ref={fullRef} style={{ fontFamily: S.font }}>
          {layout === "full" && <>{renderTitleBanner()}{renderEngagement()}{renderEscalation()}{renderTips()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderEngagement()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullRef} /></div>
      </div>
    </div>
  );
}

export default function StakeholderEngagementStrategyPage() { return <ThemeProvider><EngagementContent /></ThemeProvider>; }
