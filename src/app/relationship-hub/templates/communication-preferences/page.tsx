"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, Handshake, LayoutDashboard, AlignJustify, MessageSquare } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Profile", desc: "Preferences + do/don’t + meeting prep + tips", icon: LayoutDashboard },
  { id: "compact", label: "Quick Reference", desc: "Preferences + do/don’t only", icon: AlignJustify },
];

function CommPrefContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullRef = useRef<HTMLDivElement>(null);
  const prefRef = useRef<HTMLDivElement>(null);
  const dosRef = useRef<HTMLDivElement>(null);
  const prepRef = useRef<HTMLDivElement>(null);
  const tipsRef = useRef<HTMLDivElement>(null);

  const accent = "#8B5CF6";
  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>COMMUNICATION PREFERENCES</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; Relationship &amp; Stakeholder Management Hub &nbsp;|&nbsp; Per Stakeholder</td></tr>
    </tbody></table>
  );

  const renderPreferences = () => (
    <div ref={prefRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accent)}>STAKEHOLDER: [NAME] &mdash; COMMUNICATION PROFILE</td></tr></tbody></table>
      <CopyButton targetRef={prefRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>Document how this person prefers to communicate. Matching their style makes every interaction smoother and more productive. Update this as you learn more about them.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "22%" }}>Preference</th>
          <th style={S.thPrimary}>Your Entry</th>
          <th style={{ ...S.thPrimary, width: "30%" }}>Why It Matters</th>
        </tr></thead>
        <tbody>
          {[
            { label: "Preferred Channel", value: "[Email / Slack / Teams / Phone / In-person / Text]", why: "Using the wrong channel = messages get ignored. Match THEIR preference, not yours." },
            { label: "Backup Channel", value: "[If primary doesn’t work, use this]", why: "For urgent situations when the primary channel isn’t responsive." },
            { label: "Best Days for Meetings", value: "[e.g., Tue–Thu; avoids Mondays and Fridays]", why: "Scheduling on their preferred days increases attendance and engagement." },
            { label: "Best Time of Day", value: "[Morning / Afternoon / Specific window]", why: "Energy levels vary. Catch them when they’re most receptive." },
            { label: "Meeting Format", value: "[Formal agenda / Casual check-in / Written updates / Video vs phone]", why: "Some people hate meetings. Others hate written updates. Know which." },
            { label: "Ideal Meeting Length", value: "[15 min / 30 min / 45 min / 1 hour]", why: "Respecting their time preference shows you understand their constraints." },
            { label: "Communication Style", value: "[Data-driven / Big picture / Detail-oriented / Conversational / Direct]", why: "Mismatch here causes friction. A data person hates vague updates." },
            { label: "Update Frequency", value: "[Weekly / Biweekly / Monthly / Only when needed]", why: "Too frequent = annoyance. Too infrequent = they feel out of the loop." },
            { label: "Preferred Update Format", value: "[Email summary / Dashboard / Verbal brief / Slide deck]", why: "Give them information in the format they actually consume." },
            { label: "Decision-Making Style", value: "[Quick / Needs time / Consensus-driven / Data-dependent]", why: "Push a slow decider and they’ll resist. Give a fast decider options now." },
            { label: "Response Time Expectation", value: "[Same day / 24 hours / 48 hours / No rush]", why: "Match their expectation or set one explicitly to avoid misalignment." },
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

  const renderDos = () => (
    <div ref={dosRef} style={{ marginBottom: "12px" }}>
      <CopyButton targetRef={dosRef} label="Copy Section" />
      <table style={LT}><tbody><tr>
        <td style={{ ...LC, width: "50%", paddingRight: "4px" }}>
          <table style={S.tbl}>
            <thead><tr><td style={{ backgroundColor: "#D1FAE5", color: "#059669", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #059669" }}>WHAT THEY LOVE (DO THIS)</td></tr></thead>
            <tbody>
              {[
                { text: "[Come prepared with data and options]", guide: "Shows respect for their time and decision-making process." },
                { text: "[Be concise — get to the point fast]", guide: "Lead with the ask or the decision needed. Context after." },
                { text: "[Share credit publicly]", guide: "People who feel recognized become your strongest advocates." },
                { text: "[Give them a heads-up before big announcements]", guide: "Never let them be surprised. Especially in front of their boss." },
                { text: "[Send agenda before meetings]", guide: "Lets them prepare. Prepared stakeholders make better decisions." },
                { text: "[Enter what works well]", guide: "" },
              ].map((r, i) => {
                const bg = i % 2 === 1 ? C.rowAlt : C.white;
                return (
                  <tr key={i}><td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", padding: "5px 10px" }}>
                    <strong style={{ color: "#059669" }}>{r.text}</strong>
                    {r.guide && <><br /><span style={{ fontSize: "9px", color: C.textMuted }}>{r.guide}</span></>}
                  </td></tr>
                );
              })}
            </tbody>
          </table>
        </td>
        <td style={{ ...LC, width: "50%", paddingLeft: "4px" }}>
          <table style={S.tbl}>
            <thead><tr><td style={{ backgroundColor: "#FEE2E2", color: "#DC2626", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #DC2626" }}>WHAT ANNOYS THEM (AVOID THIS)</td></tr></thead>
            <tbody>
              {[
                { text: "[Long emails without a clear ask]", guide: "If they have to scroll to find the ask, you’ve lost them." },
                { text: "[Surprises in public meetings]", guide: "The fastest way to damage trust is to blindside someone publicly." },
                { text: "[Going over their head without warning]", guide: "Even if justified, warn them first. Respect the chain." },
                { text: "[Asking for decisions without context]", guide: "Always provide: the issue, the options, and your recommendation." },
                { text: "[Scheduling without checking availability]", guide: "Especially for senior stakeholders. Work through their EA." },
                { text: "[Enter what to avoid]", guide: "" },
              ].map((r, i) => {
                const bg = i % 2 === 1 ? C.rowAlt : C.white;
                return (
                  <tr key={i}><td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", padding: "5px 10px" }}>
                    <strong style={{ color: "#DC2626" }}>{r.text}</strong>
                    {r.guide && <><br /><span style={{ fontSize: "9px", color: C.textMuted }}>{r.guide}</span></>}
                  </td></tr>
                );
              })}
            </tbody>
          </table>
        </td>
      </tr></tbody></table>
    </div>
  );

  const renderMeetingPrep = () => (
    <div ref={prepRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner("#0EA5E9")}>PRE-MEETING CHECKLIST FOR THIS STAKEHOLDER</td></tr></tbody></table>
      <CopyButton targetRef={prepRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>Review this checklist 10 minutes before every meeting with this stakeholder. Preparation is the highest-ROI activity in stakeholder management.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "5%", textAlign: "center" as const }}>#</th>
          <th style={S.thPrimary}>Prep Item</th>
          <th style={{ ...S.thPrimary, width: "30%" }}>Guidance</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Done?</th>
        </tr></thead>
        <tbody>
          {[
            { n: "1", item: "Review their Stakeholder Profile", guide: "Refresh: what do they care about? Any open risks?", done: "\u2610" },
            { n: "2", item: "Check open commitments you made to them", guide: "Did you deliver what you promised? If not, address it upfront.", done: "\u2610" },
            { n: "3", item: "Prepare your ask or update in their preferred format", guide: "Data person? Bring numbers. Big-picture? Lead with outcomes.", done: "\u2610" },
            { n: "4", item: "Anticipate their questions or objections", guide: "What will they push back on? Have answers ready.", done: "\u2610" },
            { n: "5", item: "Confirm you’re using their preferred channel/format", guide: "Video vs phone? Agenda sent? Meeting length appropriate?", done: "\u2610" },
            { n: "6", item: "Prepare one thing you can offer them (mutual value)", guide: "Information, introduction, recognition, or help with their goals.", done: "\u2610" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 800, color: "#0EA5E9", fontSize: "12px" }}>{r.n}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 600 }}>{r.item}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", color: C.textMuted }}>{r.guide}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "14px" }}>{r.done}</td>
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
            <thead><tr><td style={{ backgroundColor: "#EDE9FE", color: "#8B5CF6", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #8B5CF6" }}>COMMUNICATION RULES OF THUMB</td></tr></thead>
            <tbody>
              {[
                { color: "#8B5CF6", tip: "Match their energy and pace.", detail: "Fast communicators want quick replies. Thoughtful ones want considered responses." },
                { color: "#059669", tip: "Ask directly: “How do you prefer I keep you updated?”", detail: "Most people will tell you exactly what they want. Just ask." },
                { color: "#0EA5E9", tip: "Observe what gets a fast response.", detail: "If they always respond to Slack but ignore email, that’s your answer." },
                { color: "#D97706", tip: "Adapt over time.", detail: "Preferences change with workload and role. Re-check every quarter." },
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
            <thead><tr><td style={{ backgroundColor: "#FEF3C7", color: "#D97706", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #D97706" }}>COMMON COMMUNICATION MISTAKES</td></tr></thead>
            <tbody>
              {[
                { color: "#DC2626", tip: "Using YOUR preferred channel instead of theirs.", detail: "Just because you love Slack doesn’t mean they do. Adapt." },
                { color: "#EA580C", tip: "Burying the lead in long updates.", detail: "Put the decision or ask in the first sentence. Context follows." },
                { color: "#D97706", tip: "Not following up in writing.", detail: "Verbal agreements are forgotten. Always send a brief written summary." },
                { color: "#6366F1", tip: "Assuming one size fits all.", detail: "Each stakeholder is different. What works for your sponsor may fail with your SME." },
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
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-violet-50 border border-violet-100 text-violet-700 text-xs font-semibold"><MessageSquare size={11} />Per-Stakeholder</span>
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
            <div><h2 className="text-2xl font-extrabold text-slate-900">Communication Preferences Page</h2><p className="text-xs font-medium text-violet-600">Per Stakeholder &bull; How They Want to Communicate</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Document how each stakeholder prefers to communicate, what they love, and what annoys them. The single biggest communication mistake is using YOUR preferred style instead of theirs. This page helps you adapt to each person.</p>
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
          {layout === "full" && <>{renderTitleBanner()}{renderPreferences()}{renderDos()}{renderMeetingPrep()}{renderTips()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderPreferences()}{renderDos()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullRef} /></div>
      </div>
    </div>
  );
}

export default function CommunicationPreferencesPage() { return <ThemeProvider><CommPrefContent /></ThemeProvider>; }
