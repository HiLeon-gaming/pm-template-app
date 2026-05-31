"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, Handshake, LayoutDashboard, AlignJustify, RefreshCw } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Assessment", desc: "Impact matrix + comms plan + tips", icon: LayoutDashboard },
  { id: "compact", label: "Quick Assessment", desc: "Impact matrix only", icon: AlignJustify },
];

function ChangeContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullRef = useRef<HTMLDivElement>(null);
  const matrixRef = useRef<HTMLDivElement>(null);
  const commsRef = useRef<HTMLDivElement>(null);
  const tipsRef = useRef<HTMLDivElement>(null);

  const accent = "#6366F1";
  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>CHANGE IMPACT NOTES (STAKEHOLDER VIEW)</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; Relationship &amp; Stakeholder Management Hub &nbsp;|&nbsp; Change: [DESCRIBE CHANGE]</td></tr>
    </tbody></table>
  );

  const renderMatrix = () => (
    <div ref={matrixRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accent)}>STAKEHOLDER IMPACT ASSESSMENT</td></tr></tbody></table>
      <CopyButton targetRef={matrixRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>For every change (scope, timeline, approach, personnel), assess how it affects each stakeholder group. Different groups feel the same change differently. Anticipate their reactions and prepare accordingly.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "12%" }}>Stakeholder</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Impact</th>
          <th style={S.thPrimary}>How This Change Affects Them</th>
          <th style={{ ...S.thPrimary, width: "12%", textAlign: "center" as const }}>Likely Reaction</th>
          <th style={{ ...S.thPrimary, width: "20%" }}>What They Need From You</th>
        </tr></thead>
        <tbody>
          {[
            { who: "Exec Sponsor", imp: "Medium", how: "Timeline extension may require re-briefing the board. Reflects on her sponsorship.", react: "Concerned", need: "Early warning. Clear explanation of WHY. Talking points for board." },
            { who: "Finance", imp: "High", how: "Budget increase needed. They\u2019ll need to reallocate or request additional funds.", react: "Resistant", need: "Detailed cost breakdown. ROI justification. Options (lean vs full)." },
            { who: "Engineering", imp: "Low", how: "Minimal impact on their timeline. May actually reduce pressure on API deadline.", react: "Relieved", need: "Confirm their timeline is unaffected. Show the positive impact." },
            { who: "Marketing", imp: "High", how: "Go-to-market timeline shifts. Campaign planning needs to adjust.", react: "Frustrated", need: "New timeline ASAP. Include them in revised planning." },
            { who: "End Users", imp: "Medium", how: "Feature delivery delayed. Expectations need resetting.", react: "Disappointed", need: "Clear communication about new timeline and what they\u2019ll get." },
            { who: "[Stakeholder]", imp: "[H/M/L]", how: "[How does this change specifically affect them?]", react: "[Expected reaction]", need: "[What they need to hear/see from you]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            const ic = r.imp === "High" ? { bg: C.badgeRedBg, fg: C.badgeRedFg } : r.imp === "Medium" ? { bg: C.badgeAmberBg, fg: C.badgeAmberFg } : r.imp === "Low" ? { bg: C.badgeGreenBg, fg: C.badgeGreenFg } : { bg: C.badgeGrayBg, fg: C.badgeGrayFg };
            const rc = r.react === "Resistant" ? { bg: C.badgeRedBg, fg: C.badgeRedFg } : r.react === "Concerned" || r.react === "Frustrated" || r.react === "Disappointed" ? { bg: C.badgeAmberBg, fg: C.badgeAmberFg } : r.react === "Relieved" ? { bg: C.badgeGreenBg, fg: C.badgeGreenFg } : { bg: C.badgeGrayBg, fg: C.badgeGrayFg };
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 700 }}>{r.who}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(ic.bg, ic.fg)}>{r.imp}</span></td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px" }}>{r.how}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(rc.bg, rc.fg)}>{r.react}</span></td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", color: C.textMuted }}>{r.need}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderComms = () => (
    <div ref={commsRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner("#D97706")}>CHANGE COMMUNICATION PLAN</td></tr></tbody></table>
      <CopyButton targetRef={commsRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>Who do you tell first? How? In what order? The sequence matters. Generally: sponsor first, then directly impacted stakeholders, then broader audience.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "4%", textAlign: "center" as const }}>Order</th>
          <th style={{ ...S.thPrimary, width: "12%" }}>Stakeholder</th>
          <th style={{ ...S.thPrimary, width: "10%" }}>When</th>
          <th style={{ ...S.thPrimary, width: "10%" }}>Channel</th>
          <th style={S.thPrimary}>Key Message</th>
          <th style={{ ...S.thPrimary, width: "8%" }}>Owner</th>
        </tr></thead>
        <tbody>
          {[
            { n: "1", who: "Sponsor", when: "Day 1 AM", channel: "1:1 call", msg: "Brief her first. Get alignment before anyone else hears. Include talking points for her.", owner: "You" },
            { n: "2", who: "Finance", when: "Day 1 PM", channel: "Meeting", msg: "Present options (lean vs full). Show ROI for each. Let them choose.", owner: "You" },
            { n: "3", who: "Marketing", when: "Day 2", channel: "Meeting", msg: "New timeline + revised planning session. Acknowledge the disruption.", owner: "You" },
            { n: "4", who: "Team", when: "Day 2", channel: "Standup", msg: "What\u2019s changing, why, and what it means for them. Keep it factual.", owner: "You" },
            { n: "5", who: "End Users", when: "Day 3", channel: "Email", msg: "New timeline. What they\u2019ll get and when. Positive framing.", owner: "Comms" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 800, fontSize: "12px", color: accent }}>{r.n}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 700 }}>{r.who}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", color: accent, fontWeight: 600 }}>{r.when}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px" }}>{r.channel}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px" }}>{r.msg}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", fontWeight: 700 }}>{r.owner}</td>
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
            <thead><tr><td style={{ backgroundColor: "#EDE9FE", color: "#6366F1", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #6366F1" }}>CHANGE COMMUNICATION RULES</td></tr></thead>
            <tbody>
              {[
                { color: "#6366F1", tip: "Tell your sponsor FIRST. Always.", detail: "They should never learn about a change from someone else. Brief them before anyone." },
                { color: "#059669", tip: "Be transparent about what changed and WHY.", detail: "People can handle bad news. They can\u2019t handle feeling deceived or uninformed." },
                { color: "#0EA5E9", tip: "Present options, not just problems.", detail: "Come with at least 2 options and a recommendation. Never just dump a problem." },
                { color: "#D97706", tip: "Acknowledge the impact on THEM.", detail: "Show you understand how this affects their work. Empathy > information." },
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
            <thead><tr><td style={{ backgroundColor: "#FEF3C7", color: "#D97706", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #D97706" }}>COMMON CHANGE MISTAKES</td></tr></thead>
            <tbody>
              {[
                { color: "#DC2626", tip: "Surprising people.", detail: "If they hear about the change from someone other than you, trust is damaged." },
                { color: "#EA580C", tip: "Treating all stakeholders the same.", detail: "High-impact stakeholders need a different conversation than low-impact ones." },
                { color: "#D97706", tip: "Minimizing the impact.", detail: "Don\u2019t say \u201Cit\u2019s no big deal\u201D if it IS a big deal to them. Acknowledge reality." },
                { color: "#6366F1", tip: "Not following up after the change.", detail: "Check in 1\u20132 weeks later. Is the change landing well? Any residual issues?" },
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
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-violet-50 border border-violet-100 text-violet-700 text-xs font-semibold"><RefreshCw size={11} />Change</span>
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
            <div><h2 className="text-2xl font-extrabold text-slate-900">Change Impact Notes (Stakeholder View)</h2><p className="text-xs font-medium text-violet-600">Per Change &bull; Who&apos;s Affected &bull; How to Communicate</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">When something changes &mdash; scope, timeline, budget, approach &mdash; assess how it impacts each stakeholder group differently. Plan your communication sequence carefully: who hears first, what they need to know, and how to frame it for each audience.</p>
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
          {layout === "full" && <>{renderTitleBanner()}{renderMatrix()}{renderComms()}{renderTips()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderMatrix()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullRef} /></div>
      </div>
    </div>
  );
}

export default function ChangeImpactNotesPage() { return <ThemeProvider><ChangeContent /></ThemeProvider>; }
