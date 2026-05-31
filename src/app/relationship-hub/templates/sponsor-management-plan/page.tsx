"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, Handshake, LayoutDashboard, AlignJustify, Crown } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Plan", desc: "Profile + strategy + health check + tips", icon: LayoutDashboard },
  { id: "compact", label: "Quick Plan", desc: "Profile + strategy only", icon: AlignJustify },
];

function SponsorContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const stratRef = useRef<HTMLDivElement>(null);
  const healthRef = useRef<HTMLDivElement>(null);
  const tipsRef = useRef<HTMLDivElement>(null);

  const accent = "#0EA5E9";
  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>SPONSOR MANAGEMENT PLAN</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; Relationship &amp; Stakeholder Management Hub &nbsp;|&nbsp; Keep Your Sponsor Aligned</td></tr>
    </tbody></table>
  );

  const renderProfile = () => (
    <div ref={profileRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accent)}>SPONSOR PROFILE &amp; ALIGNMENT</td></tr></tbody></table>
      <CopyButton targetRef={profileRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>Your sponsor is the single most important stakeholder relationship. Understand exactly what they need, how they think, and what keeps them up at night. This section is your cheat sheet for every interaction.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "25%" }}>Area</th>
          <th style={S.thPrimary}>Your Notes</th>
          <th style={{ ...S.thPrimary, width: "25%" }}>Why This Matters</th>
        </tr></thead>
        <tbody>
          {[
            { label: "Sponsor Name", value: "[Full name and title]", why: "Know their exact title — it signals their authority level." },
            { label: "Why They Sponsor You", value: "[What authority or support do they provide?]", why: "Understanding WHY clarifies what you can ask for." },
            { label: "Their Top Priority", value: "[What they care about most that your work supports]", why: "Frame every update in terms of THIS priority." },
            { label: "What They Expect", value: "[Updates, results, risk alerts, no surprises]", why: "Deliver exactly this. Consistently. Every time." },
            { label: "What You Need From Them", value: "[Budget approval, political cover, decision escalation, access]", why: "Be specific so you can ask clearly when needed." },
            { label: "Alignment Level", value: "[Fully aligned / Mostly aligned / Drifting / Misaligned]", why: "If drifting, act NOW before it becomes misalignment." },
            { label: "Communication Cadence", value: "[Weekly 1:1 / Biweekly brief / Monthly review]", why: "Never go more than 2 weeks without touching base." },
            { label: "Preferred Format", value: "[In-person / Video / Email summary / Slide deck]", why: "Use THEIR preferred format, not yours." },
            { label: "Last Meaningful Interaction", value: "[Date and what was discussed]", why: "If it’s been >2 weeks, schedule something now." },
            { label: "Relationship Health", value: "[Green / Amber / Red]", why: "Be honest. Amber means act this week." },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 700, color: accent }}>{r.label}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.value}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", color: C.textMuted }}>{r.why}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderStrategy = () => (
    <div ref={stratRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner("#059669")}>SPONSOR MANAGEMENT STRATEGY</td></tr></tbody></table>
      <CopyButton targetRef={stratRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>Your strategy for keeping your sponsor informed, aligned, and activated. The best PMs manage sponsors proactively — never reactively.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "25%" }}>Strategy Area</th>
          <th style={S.thPrimary}>Your Plan</th>
        </tr></thead>
        <tbody>
          {[
            { label: "Keep Them Informed", value: "[e.g., Weekly 3-bullet email every Monday AM; 1:1 every other Thursday. Never more than 5 minutes of their time unless they ask.]" },
            { label: "Keep Them Aligned", value: "[e.g., Pre-brief before steering committee; share draft recommendations 48h before public meetings so they’re never surprised.]" },
            { label: "Activate Their Support", value: "[e.g., When you need budget, send a 1-page business case with 3 options. Make it easy for them to say yes.]" },
            { label: "Early Warning Protocol", value: "[e.g., If risk escalates to Red, schedule same-day call. Rule: they never hear bad news from someone else first.]" },
            { label: "Recognition Plan", value: "[e.g., Credit them publicly in reviews; include their name on executive summaries; send thank-you after big milestones.]" },
            { label: "Backup If Sponsor Changes", value: "[Who would you approach next? How would you transition? Have a Plan B ready — sponsors change more often than you expect.]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 700, color: "#059669" }}>{r.label}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.value}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderHealth = () => (
    <div ref={healthRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner("#D97706")}>SPONSOR RELATIONSHIP HEALTH CHECK</td></tr></tbody></table>
      <CopyButton targetRef={healthRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>Run this checklist monthly. If you answer “No” to 3+ questions, your sponsor relationship needs immediate attention.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={S.thPrimary}>Health Check Question</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Y / N</th>
          <th style={{ ...S.thPrimary, width: "30%" }}>If No, What to Do</th>
        </tr></thead>
        <tbody>
          {[
            { q: "Have I spoken with my sponsor in the last 2 weeks?", fix: "Schedule a 15-min check-in this week. Don’t let silence grow." },
            { q: "Does my sponsor know the current project health (G/A/R)?", fix: "Send a 3-line status update today. Lead with the health rating." },
            { q: "Would my sponsor defend this project if challenged?", fix: "Arm them with talking points. Send a 1-page “why this matters” brief." },
            { q: "Am I delivering what they specifically asked for?", fix: "Re-read their last requests. Are you actually doing what they asked?" },
            { q: "Have I pre-briefed them before every public meeting?", fix: "Never let them be surprised. Brief 24h before any cross-functional meeting." },
            { q: "Do they know about risks BEFORE they become crises?", fix: "Set up an early warning cadence. Share amber risks, not just red ones." },
            { q: "Have I publicly credited them in the last 30 days?", fix: "Find an opportunity this week to thank them in a visible forum." },
            { q: "Do I know what’s currently stressing them out?", fix: "Ask them: “What’s keeping you up at night?” and listen." },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 600 }}>{r.q}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "14px" }}>{"\u2610"}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", color: C.textMuted }}>{r.fix}</td>
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
            <thead><tr><td style={{ backgroundColor: "#DBEAFE", color: "#0EA5E9", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #0EA5E9" }}>SPONSOR MANAGEMENT RULES</td></tr></thead>
            <tbody>
              {[
                { color: "#0EA5E9", tip: "Never surprise your sponsor.", detail: "If they hear something about your project from someone else first, you’ve failed." },
                { color: "#059669", tip: "Make them look good.", detail: "Your success is their success. Frame wins as outcomes THEY enabled." },
                { color: "#8B5CF6", tip: "Be the low-maintenance, high-value PM.", detail: "Don’t require babysitting. Bring solutions, not problems. Be the PM they wish all PMs were." },
                { color: "#D97706", tip: "Earn the right to ask for big things.", detail: "Deliver small things flawlessly first. Then when you need something big, they trust you." },
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
            <thead><tr><td style={{ backgroundColor: "#FEF3C7", color: "#D97706", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #D97706" }}>SPONSOR RELATIONSHIP KILLERS</td></tr></thead>
            <tbody>
              {[
                { color: "#DC2626", tip: "Going dark between meetings.", detail: "If your only touchpoint is the bi-weekly 1:1, you’re under-communicating." },
                { color: "#EA580C", tip: "Asking for help without doing your homework.", detail: "Come with the analysis done, options clear, and a recommendation ready." },
                { color: "#D97706", tip: "Making them chase you for updates.", detail: "If they have to ask “What’s the status?” you’ve already lost ground." },
                { color: "#6366F1", tip: "Treating them like a rubber stamp.", detail: "They want to be a thought partner, not just an approver. Engage their expertise." },
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
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-sky-50 border border-sky-100 text-sky-700 text-xs font-semibold"><Crown size={11} />Sponsor</span>
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
            <div><h2 className="text-2xl font-extrabold text-slate-900">Sponsor Management Plan</h2><p className="text-xs font-medium text-sky-600">Your Most Important Stakeholder Relationship</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Your project sponsor is your most critical stakeholder. They provide budget, political cover, and escalation support. This plan ensures you manage that relationship intentionally &mdash; keeping them informed, aligned, and ready to advocate for your work.</p>
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
          {layout === "full" && <>{renderTitleBanner()}{renderProfile()}{renderStrategy()}{renderHealth()}{renderTips()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderProfile()}{renderStrategy()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullRef} /></div>
      </div>
    </div>
  );
}

export default function SponsorManagementPlanPage() { return <ThemeProvider><SponsorContent /></ThemeProvider>; }
