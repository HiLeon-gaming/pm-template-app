"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, Handshake, LayoutDashboard, AlignJustify, UserPlus } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Intake", desc: "Capture form + next steps + tips + what to skip", icon: LayoutDashboard },
  { id: "compact", label: "Quick Capture", desc: "Capture form + next steps only", icon: AlignJustify },
];

function IntakeContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullRef = useRef<HTMLDivElement>(null);
  const captureRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);
  const tipsRef = useRef<HTMLDivElement>(null);

  const accent = "#8B5CF6";
  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>STAKEHOLDER INTAKE &mdash; QUICK CAPTURE</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; Relationship &amp; Stakeholder Management Hub &nbsp;|&nbsp; New Stakeholder Onboarding</td></tr>
    </tbody></table>
  );

  const renderCapture = () => (
    <div ref={captureRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accent)}>QUICK CAPTURE &mdash; NEW STAKEHOLDER</td></tr></tbody></table>
      <CopyButton targetRef={captureRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>Fill this out within 24 hours of meeting someone new. First impressions fade fast &mdash; capture the context while it&apos;s fresh. You can transfer key details to a full Stakeholder Profile later.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "22%" }}>Field</th>
          <th style={S.thPrimary}>Your Entry</th>
          <th style={{ ...S.thPrimary, width: "30%" }}>Guidance</th>
        </tr></thead>
        <tbody>
          {[
            { label: "Date Captured", value: "[Today\u2019s date]", guide: "Timestamp when you first documented this person." },
            { label: "Name", value: "[Full name]", guide: "Use their preferred name if known. Add pronunciation notes if helpful." },
            { label: "Title / Role", value: "[Job title and functional role]", guide: "Be specific: \u201CSVP Operations\u201D not just \u201CSenior leader.\u201D" },
            { label: "Organization / Team", value: "[Company, department, or team]", guide: "Include division if large org. E.g. \u201CFinance \u2014 FP&A team.\u201D" },
            { label: "How We Met", value: "[Meeting, intro, event, referral]", guide: "Context helps you remember later. \u201CIntro\u2019d by Sarah at Q1 kickoff.\u201D" },
            { label: "Their Stakeholder Type", value: "[Sponsor / Champion / Decision Maker / Influencer / Gatekeeper / Blocker / End User / SME]", guide: "Pick the primary role. One person can be multiple types \u2014 pick dominant one." },
            { label: "Importance Level", value: "[Critical / High / Medium / Low]", guide: "Critical = can make or break your initiative. Low = nice to know." },
            { label: "What They Care About", value: "[Top priorities, goals, pressures]", guide: "Listen for what keeps them up at night. This drives your engagement strategy." },
            { label: "First Impression", value: "[Communication style, energy, pace]", guide: "Keep it factual: \u201CDirect communicator, data-driven, moves fast.\u201D Not judgments." },
            { label: "Key Quote or Insight", value: "[Memorable thing they said]", guide: "Verbatim quotes reveal priorities. \u201CI just need to know it won\u2019t blow the budget.\u201D" },
            { label: "Preferred Channel", value: "[Email / Slack / Teams / Phone]", guide: "Ask them directly or observe what they respond to fastest." },
            { label: "Contact Info", value: "[Email, phone, assistant name]", guide: "Include their EA or chief of staff if they have one." },
            { label: "Connection to Your Work", value: "[How they relate to your goals]", guide: "Be specific: \u201CApproves platform budget\u201D or \u201COwns API we depend on.\u201D" },
            { label: "Potential Risk or Concern", value: "[Warning signs, friction, politics]", guide: "Early flags save you later. \u201CReportedly skeptical of vendor solutions.\u201D" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 700, color: accent }}>{r.label}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.value}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", color: C.textMuted }}>{r.guide}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderNextSteps = () => (
    <div ref={nextRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner("#059669")}>IMMEDIATE NEXT STEPS</td></tr></tbody></table>
      <CopyButton targetRef={nextRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>Complete these within 48 hours of your intake. The faster you follow up, the stronger the first impression you make.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "5%", textAlign: "center" as const }}>#</th>
          <th style={S.thPrimary}>Action</th>
          <th style={{ ...S.thPrimary, width: "12%", textAlign: "center" as const }}>Due</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Done?</th>
          <th style={{ ...S.thPrimary, width: "25%" }}>Why This Matters</th>
        </tr></thead>
        <tbody>
          {[
            { n: "1", action: "Send follow-up email or connection message", due: "Within 24h", done: "\u2610", why: "First follow-up sets the tone. Reference something specific from your conversation." },
            { n: "2", action: "Add to Stakeholder Directory Index", due: "Today", done: "\u2610", why: "If they\u2019re not in the directory, they\u2019ll fall off your radar." },
            { n: "3", action: "Create full Stakeholder Profile (if Critical/High)", due: "This week", done: "\u2610", why: "High-importance stakeholders deserve a full profile from day one." },
            { n: "4", action: "Set cadence in Relationship Cadence Planner", due: "This week", done: "\u2610", why: "Without a cadence, the relationship goes cold. Set it now while intent is high." },
            { n: "5", action: "Brief your manager if this is a senior stakeholder", due: "Within 48h", done: "\u2610", why: "Your manager may have context or history that changes your approach." },
            { n: "6", action: "[Any other follow-up]", due: "[Date]", done: "\u2610", why: "" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 800, fontSize: "12px", color: "#059669" }}>{r.n}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 600 }}>{r.action}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "10px" }}>{r.due}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "14px" }}>{r.done}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", color: C.textMuted }}>{r.why}</td>
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
            <thead><tr><td style={{ backgroundColor: "#EDE9FE", color: "#8B5CF6", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #8B5CF6" }}>INTAKE BEST PRACTICES</td></tr></thead>
            <tbody>
              {[
                { color: "#8B5CF6", tip: "Capture within 24 hours.", detail: "Memory fades fast. The details you forget are often the most valuable later." },
                { color: "#059669", tip: "Ask about their priorities, not yours.", detail: "The first conversation should be 80% listening. What are THEIR goals and pressures?" },
                { color: "#0EA5E9", tip: "Note communication style.", detail: "\u201CDirect and fast-paced\u201D or \u201CPrefers written over verbal\u201D saves you time later." },
                { color: "#D97706", tip: "Look for mutual value early.", detail: "How can you help them? If you can offer value in the first interaction, the relationship starts strong." },
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
            <thead><tr><td style={{ backgroundColor: "#FEF3C7", color: "#D97706", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #D97706" }}>WHAT TO SKIP (FOR NOW)</td></tr></thead>
            <tbody>
              {[
                { color: "#D97706", tip: "Don\u2019t overthink the type.", detail: "Your initial classification may change. Just pick your best guess. You\u2019ll refine it later." },
                { color: "#DC2626", tip: "Don\u2019t write a novel.", detail: "This is a quick capture, not a profile. Bullet points and short phrases are ideal." },
                { color: "#EA580C", tip: "Don\u2019t judge \u2014 observe.", detail: "\u201CAsked three detailed questions about timeline\u201D is better than \u201CSeems micromanaging.\u201D" },
                { color: "#6366F1", tip: "Don\u2019t skip the follow-up.", detail: "The intake is worthless without action. Step 1 (send follow-up) is the most important step." },
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
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-violet-50 border border-violet-100 text-violet-700 text-xs font-semibold"><UserPlus size={11} />Per-Stakeholder</span>
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
            <div><h2 className="text-2xl font-extrabold text-slate-900">Stakeholder Intake (Quick Capture)</h2><p className="text-xs font-medium text-violet-600">First Impressions &amp; Key Context &bull; Fill Out Within 24 Hours</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">When you meet a new stakeholder, capture the essentials here while they&apos;re fresh. This isn&apos;t a full profile &mdash; it&apos;s a rapid capture form designed to be filled out in 5 minutes. You&apos;ll transfer the important details to a full Stakeholder Profile later.</p>
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
          {layout === "full" && <>{renderTitleBanner()}{renderCapture()}{renderNextSteps()}{renderTips()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderCapture()}{renderNextSteps()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullRef} /></div>
      </div>
    </div>
  );
}

export default function StakeholderIntakePage() { return <ThemeProvider><IntakeContent /></ThemeProvider>; }
