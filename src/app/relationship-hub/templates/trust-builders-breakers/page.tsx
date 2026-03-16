"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, Handshake, LayoutDashboard, AlignJustify, Heart } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full View", desc: "Builders + breakers + repair playbook + tips", icon: LayoutDashboard },
  { id: "compact", label: "Quick List", desc: "Builders + breakers only", icon: AlignJustify },
];

function TrustContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullRef = useRef<HTMLDivElement>(null);
  const trustRef = useRef<HTMLDivElement>(null);
  const repairRef = useRef<HTMLDivElement>(null);
  const tipsRef = useRef<HTMLDivElement>(null);

  const accent = "#8B5CF6";
  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>TRUST BUILDERS &amp; TRUST BREAKERS</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; Relationship &amp; Stakeholder Management Hub &nbsp;|&nbsp; Reduces Relationship Mistakes</td></tr>
    </tbody></table>
  );

  const renderTrustLists = () => (
    <div ref={trustRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(accent)}>STAKEHOLDER: [NAME]</div>
      <CopyButton targetRef={trustRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>Document what builds and breaks trust with this specific person. Everyone is different. What delights one stakeholder might annoy another. Review this list before every important interaction.</p>
      <table style={LT}><tbody><tr>
        <td style={{ ...LC, width: "50%", paddingRight: "4px" }}>
          <table style={S.tbl}>
            <thead><tr><td style={{ backgroundColor: "#D1FAE5", color: "#059669", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #059669" }}>TRUST BUILDERS &mdash; DO MORE OF THIS</td></tr></thead>
            <tbody>
              {[
                { text: "Deliver on promises \u2014 every time, no exceptions", guide: "Reliability is the foundation of trust. One broken promise undoes five kept ones." },
                { text: "Share credit publicly; acknowledge their contributions", guide: "People who feel recognized become your strongest advocates." },
                { text: "Give them advance notice before announcements or changes", guide: "Never let them be surprised. Especially in front of their boss or team." },
                { text: "Come prepared with data and clear recommendations", guide: "Shows you respect their time and take the relationship seriously." },
                { text: "Follow up when you say you will", guide: "Even a quick \u201CJust following up as promised\u201D builds enormous credibility." },
                { text: "Be transparent about problems early, not late", guide: "Sharing bad news early shows courage and respect. Hiding it destroys trust." },
                { text: "Respect their time \u2014 be concise and purposeful", guide: "Short, focused meetings > long, wandering ones. Always." },
                { text: "Ask for their input on decisions that affect them", guide: "Even if you already know the answer, being consulted makes people feel valued." },
                { text: "[Enter what builds trust with this person]", guide: "" },
                { text: "[Enter what builds trust with this person]", guide: "" },
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
            <thead><tr><td style={{ backgroundColor: "#FEE2E2", color: "#DC2626", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #DC2626" }}>TRUST BREAKERS &mdash; NEVER DO THIS</td></tr></thead>
            <tbody>
              {[
                { text: "Surprise them with bad news in a public meeting", guide: "The fastest way to permanently damage a relationship. Always brief privately first." },
                { text: "Miss a deadline without proactive communication", guide: "If you\u2019re going to miss, tell them BEFORE the deadline, not after." },
                { text: "Go over their head without telling them first", guide: "Even if escalation is justified, warn them first. Respect the chain." },
                { text: "Send long, unfocused emails with no clear ask", guide: "If they have to scroll to find the ask, you\u2019ve already lost them." },
                { text: "Make decisions that affect them without consulting them", guide: "Even small decisions. Being excluded makes people feel disrespected." },
                { text: "Fail to follow up on commitments", guide: "Broken follow-ups signal you don\u2019t value the relationship." },
                { text: "Take credit for their ideas or contributions", guide: "This is a career-damaging move. Always attribute openly." },
                { text: "Bring problems without any proposed solutions", guide: "Problem + solution = partnership. Problem alone = burden." },
                { text: "[Enter what damages trust with this person]", guide: "" },
                { text: "[Enter what damages trust with this person]", guide: "" },
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

  const renderRepair = () => (
    <div ref={repairRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner("#D97706")}>TRUST REPAIR PLAYBOOK</div>
      <CopyButton targetRef={repairRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>When trust is damaged, act fast. The longer you wait, the harder it is to repair. Use this playbook to guide your recovery.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "5%", textAlign: "center" as const }}>Step</th>
          <th style={{ ...S.thPrimary, width: "20%" }}>Action</th>
          <th style={S.thPrimary}>What to Do</th>
          <th style={{ ...S.thPrimary, width: "20%" }}>Timing</th>
        </tr></thead>
        <tbody>
          {[
            { step: "1", action: "Acknowledge it", detail: "Name what happened directly. Don\u2019t minimize or make excuses. \u201CI dropped the ball on X and I understand the impact.\u201D", timing: "Within 24 hours" },
            { step: "2", action: "Take responsibility", detail: "Own your part fully. Even if others contributed, focus on what YOU could have done differently.", timing: "Same conversation" },
            { step: "3", action: "Ask what they need", detail: "\u201CWhat would help rebuild your confidence in this?\u201D Let them define the path forward.", timing: "Same conversation" },
            { step: "4", action: "Deliver a quick win", detail: "Find something small you can deliver flawlessly within 48 hours. Rebuild through action, not words.", timing: "Within 48 hours" },
            { step: "5", action: "Over-communicate temporarily", detail: "Increase your update frequency for 2\u20134 weeks. Show them you\u2019re back on track through consistent follow-through.", timing: "2\u20134 weeks" },
            { step: "6", action: "Check in on the relationship", detail: "\u201CHow are we doing? Is there anything else I can do to make this right?\u201D Show you care about the long game.", timing: "2\u20134 weeks later" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 800, color: "#D97706", fontSize: "12px" }}>{r.step}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 700, color: "#D97706" }}>{r.action}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.detail}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", color: C.textMuted }}>{r.timing}</td>
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
            <thead><tr><td style={{ backgroundColor: "#EDE9FE", color: "#8B5CF6", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #8B5CF6" }}>TRUST PRINCIPLES</td></tr></thead>
            <tbody>
              {[
                { color: "#059669", tip: "Trust is built in drops and lost in buckets.", detail: "Every interaction is a small deposit or withdrawal. Be intentional about making deposits." },
                { color: "#8B5CF6", tip: "Consistency matters more than grand gestures.", detail: "Showing up reliably week after week builds more trust than one heroic effort." },
                { color: "#0EA5E9", tip: "Trust is specific, not general.", detail: "Someone may trust your expertise but not your follow-through. Identify which type of trust you need to build." },
                { color: "#D97706", tip: "The fastest trust builder: do what you said you\u2019d do.", detail: "It sounds simple because it is. Most people fail at this basic level." },
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
            <thead><tr><td style={{ backgroundColor: "#FEF3C7", color: "#D97706", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #D97706" }}>TRUST RED FLAGS TO WATCH FOR</td></tr></thead>
            <tbody>
              {[
                { color: "#DC2626", tip: "They stop responding quickly.", detail: "A change in response time often signals eroding trust. Address it proactively." },
                { color: "#EA580C", tip: "They start looping in their manager.", detail: "When they cc their boss, they may be building a paper trail. That\u2019s a trust warning." },
                { color: "#D97706", tip: "They become more formal in tone.", detail: "Shifting from casual to formal communication often means they\u2019re putting up walls." },
                { color: "#6366F1", tip: "They ask for more documentation.", detail: "Increased requests for written confirmation suggest they no longer trust verbal agreements." },
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
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-violet-50 border border-violet-100 text-violet-700 text-xs font-semibold"><Heart size={11} />Per-Stakeholder</span>
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
            <div><h2 className="text-2xl font-extrabold text-slate-900">Trust Builders &amp; Trust Breakers List</h2><p className="text-xs font-medium text-violet-600">Per Stakeholder &bull; What Builds and Breaks Trust</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Trust is the currency of stakeholder relationships. This template helps you document what specific actions build or damage trust with each person. Everyone is different &mdash; what delights one stakeholder might annoy another. Review this before every important interaction.</p>
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
          {layout === "full" && <>{renderTitleBanner()}{renderTrustLists()}{renderRepair()}{renderTips()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderTrustLists()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullRef} /></div>
      </div>
    </div>
  );
}

export default function TrustBuildersBreakersPage() { return <ThemeProvider><TrustContent /></ThemeProvider>; }
