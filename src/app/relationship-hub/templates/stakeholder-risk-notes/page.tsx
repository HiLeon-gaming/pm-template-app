"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, Handshake, LayoutDashboard, AlignJustify, AlertTriangle } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Notes", desc: "Risks + mitigation + early warnings + tips", icon: LayoutDashboard },
  { id: "compact", label: "Quick Notes", desc: "Risks + mitigation only", icon: AlignJustify },
];

function RiskNotesContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullRef = useRef<HTMLDivElement>(null);
  const riskRef = useRef<HTMLDivElement>(null);
  const mitRef = useRef<HTMLDivElement>(null);
  const warnRef = useRef<HTMLDivElement>(null);
  const tipsRef = useRef<HTMLDivElement>(null);

  const accent = "#8B5CF6";
  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: "4px solid #DC2626", textAlign: "center" as const }}>STAKEHOLDER RISK NOTES (LANDMINES)</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; Relationship &amp; Stakeholder Management Hub &nbsp;|&nbsp; [CONFIDENTIAL]</td></tr>
    </tbody></table>
  );

  const renderRisks = () => (
    <div ref={riskRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner("#DC2626")}>STAKEHOLDER: [NAME] &mdash; RISKS &amp; LANDMINES</div>
      <CopyButton targetRef={riskRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>Keep these notes factual and professional. Never write anything you wouldn&apos;t want read out loud. Review before any meeting with this stakeholder. Delete entries that are no longer relevant.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "20%" }}>Risk Area</th>
          <th style={S.thPrimary}>Your Notes</th>
          <th style={{ ...S.thPrimary, width: "25%" }}>How to Navigate</th>
        </tr></thead>
        <tbody>
          {[
            { label: "Sensitive Topics", value: "[Topics that trigger a strong reaction \u2014 avoid raising casually or in public]", nav: "Approach these 1:1 only. Never blindside in a group setting." },
            { label: "Historical Friction", value: "[Past conflicts, disagreements, or incidents that still affect the relationship]", nav: "Acknowledge the past without re-litigating. Show growth." },
            { label: "Red Flags Observed", value: "[Warning signs: missed meetings, short responses, excluding you from conversations]", nav: "Address early with a direct, private conversation." },
            { label: "Political Dynamics", value: "[Alliances, rivalries, or org politics that influence their behavior]", nav: "Stay neutral. Never take sides in their internal politics." },
            { label: "Known Biases", value: "[Vendor bias, team favoritism, technology preferences]", nav: "Work within their biases, not against them. Pick your battles." },
            { label: "Trigger Points", value: "[Situations that make them defensive, angry, or disengaged]", nav: "Avoid these triggers. If unavoidable, frame carefully." },
            { label: "Past Mistakes (Yours)", value: "[Things you\u2019ve done that damaged trust \u2014 learn from these]", nav: "Acknowledge and overcompensate in the opposite direction." },
            { label: "People They Don\u2019t Trust", value: "[Other stakeholders or teams they have friction with]", nav: "Be careful discussing these people. Don\u2019t become a messenger." },
            { label: "Information Sensitivity", value: "[What they share in confidence and expect you NOT to repeat]", nav: "Never betray a confidence. It\u2019s the fastest way to lose them permanently." },
            { label: "[Add risk area]", value: "[Your observation]", nav: "[Your approach]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 700, color: "#DC2626" }}>{r.label}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.value}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", color: C.textMuted }}>{r.nav}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderMitigation = () => (
    <div ref={mitRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner("#EA580C")}>MITIGATION &amp; CONTINGENCY PLAN</div>
      <CopyButton targetRef={mitRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>Plan your response before the risk materializes. Proactive mitigation is 10x cheaper than reactive damage control.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "25%" }}>Planning Area</th>
          <th style={S.thPrimary}>Your Plan</th>
          <th style={{ ...S.thPrimary, width: "15%" }}>Review Date</th>
        </tr></thead>
        <tbody>
          {[
            { label: "Current Risk Level", plan: "[High / Medium / Low] \u2014 Justify your assessment.", date: "[Date]" },
            { label: "Worst-Case Scenario", plan: "[What happens if this relationship completely breaks down? Impact on your project/goals?]", date: "" },
            { label: "Prevention Strategy", plan: "[Specific actions to keep the risk from materializing. What are you doing proactively?]", date: "[Weekly]" },
            { label: "Mitigation Strategy", plan: "[If the risk materializes, what is your immediate response? First 24\u201348 hours.]", date: "" },
            { label: "Escalation Plan", plan: "[Who do you involve if the situation worsens? Your manager? Their manager? Sponsor?]", date: "" },
            { label: "Exit Strategy", plan: "[If the relationship is unrecoverable, what is your plan to work around this stakeholder?]", date: "" },
            { label: "Next Risk Review", plan: "[Schedule a specific date to reassess all risk notes]", date: "[Date]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 700, color: "#EA580C" }}>{r.label}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.plan}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", color: C.textMuted, textAlign: "center" as const }}>{r.date}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderWarnings = () => (
    <div ref={warnRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner("#D97706")}>EARLY WARNING SIGNALS</div>
      <CopyButton targetRef={warnRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>Track specific behavioral changes that signal the relationship is deteriorating. If you see 2+ of these, take immediate action.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "30%" }}>Warning Signal</th>
          <th style={S.thPrimary}>What It Might Mean</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Seen?</th>
        </tr></thead>
        <tbody>
          {[
            { signal: "Response time has increased significantly", meaning: "They may be deprioritizing you or avoiding a conversation.", seen: "\u2610" },
            { signal: "They\u2019re cc\u2019ing their manager on routine emails", meaning: "Building a paper trail. They may be losing confidence in you.", seen: "\u2610" },
            { signal: "Communication tone has become more formal", meaning: "Walls are going up. The informal trust channel is closing.", seen: "\u2610" },
            { signal: "They\u2019re asking for more written documentation", meaning: "Verbal agreements are no longer enough. Trust is eroding.", seen: "\u2610" },
            { signal: "They\u2019ve stopped inviting you to informal conversations", meaning: "You\u2019re being excluded from the inner circle.", seen: "\u2610" },
            { signal: "They\u2019re checking your work more frequently", meaning: "Confidence in your output has dropped. Over-deliver to rebuild.", seen: "\u2610" },
            { signal: "They\u2019re engaging directly with your team, bypassing you", meaning: "They may not trust you as the single point of contact.", seen: "\u2610" },
            { signal: "[Add your own warning signal]", meaning: "[What it might mean]", seen: "\u2610" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 600, color: "#D97706" }}>{r.signal}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", color: C.textMuted }}>{r.meaning}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "14px" }}>{r.seen}</td>
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
            <thead><tr><td style={{ backgroundColor: "#EDE9FE", color: "#8B5CF6", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #8B5CF6" }}>RISK DOCUMENTATION PRINCIPLES</td></tr></thead>
            <tbody>
              {[
                { color: "#DC2626", tip: "Be factual, never judgmental.", detail: "\u201CThey missed 3 consecutive meetings\u201D is a fact. \u201CThey don\u2019t care\u201D is a judgment. Stick to facts." },
                { color: "#8B5CF6", tip: "Write as if this could be read aloud.", detail: "If you wouldn\u2019t be comfortable with the stakeholder reading this, rewrite it." },
                { color: "#059669", tip: "Review and prune monthly.", detail: "Delete risks that are no longer relevant. Stale risk notes create false confidence." },
                { color: "#0EA5E9", tip: "Separate observations from interpretations.", detail: "\u201CThey seem disengaged (short replies, camera off)\u201D separates what you see from what you think." },
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
            <thead><tr><td style={{ backgroundColor: "#FEF3C7", color: "#D97706", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #D97706" }}>WHEN TO ACT ON RISK NOTES</td></tr></thead>
            <tbody>
              {[
                { color: "#DC2626", tip: "Immediately: if trust has been broken.", detail: "Don\u2019t wait. Address within 24 hours. See the Trust Repair Playbook." },
                { color: "#EA580C", tip: "This week: if 2+ warning signals appear.", detail: "Request a private 1:1 to check in on the relationship." },
                { color: "#D97706", tip: "This month: routine risk review.", detail: "Review all risk notes, update mitigation plans, delete stale entries." },
                { color: "#6366F1", tip: "Quarterly: full relationship health audit.", detail: "Compare current risk level to 3 months ago. Is it improving or worsening?" },
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
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-50 border border-red-100 text-red-700 text-xs font-semibold"><AlertTriangle size={11} />Confidential</span>
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
            <div><h2 className="text-2xl font-extrabold text-slate-900">Stakeholder Risk Notes (Landmines)</h2><p className="text-xs font-medium text-red-600">Per Stakeholder &bull; [CONFIDENTIAL] &bull; Prevents Avoidable Issues</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Every stakeholder relationship has risks &mdash; sensitive topics, political dynamics, past friction, and potential landmines. This template helps you document and plan for them proactively so you never step on a mine you could have avoided.</p>
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
          {layout === "full" && <>{renderTitleBanner()}{renderRisks()}{renderMitigation()}{renderWarnings()}{renderTips()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderRisks()}{renderMitigation()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullRef} /></div>
      </div>
    </div>
  );
}

export default function StakeholderRiskNotesPage() { return <ThemeProvider><RiskNotesContent /></ThemeProvider>; }
