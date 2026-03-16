"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, Handshake, LayoutDashboard, AlignJustify, BookOpen } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Guide", desc: "All terms + categories + quick-reference cheat sheet", icon: LayoutDashboard },
  { id: "compact", label: "Quick Reference", desc: "Term table only", icon: AlignJustify },
];

function TerminologyContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullRef = useRef<HTMLDivElement>(null);
  const termsRef = useRef<HTMLDivElement>(null);
  const framRef = useRef<HTMLDivElement>(null);
  const cheatRef = useRef<HTMLDivElement>(null);

  const accent = "#E11D48";
  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>TERMINOLOGY GUIDE</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; Relationship &amp; Stakeholder Management Hub &nbsp;|&nbsp; Plain-English Definitions</td></tr>
    </tbody></table>
  );

  const renderTerms = () => (
    <div ref={termsRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(accent)}>KEY TERMS &amp; DEFINITIONS</div>
      <CopyButton targetRef={termsRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>Every term used in this hub, explained in plain English. Bookmark this page and refer back whenever you see an unfamiliar term.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "18%" }}>Term</th>
          <th style={S.thPrimary}>Definition</th>
          <th style={{ ...S.thPrimary, width: "25%" }}>Example</th>
        </tr></thead>
        <tbody>
          {[
            { term: "Stakeholder", def: "Anyone who can influence, be impacted by, approve, block, or support your work.", ex: "Your VP, a vendor contact, a cross-functional partner, an end-user group" },
            { term: "Sponsor", def: "A senior leader who champions your initiative and provides political support, funding, and escalation authority.", ex: "The SVP who approved your project budget and defends it in leadership meetings" },
            { term: "Champion", def: "Someone who actively advocates for your work to others \u2014 even when you\u2019re not in the room.", ex: "A director who tells peers \u201Cthis project is worth supporting\u201D in their team meetings" },
            { term: "Decision Maker", def: "The person with authority to say \u201Cyes\u201D or \u201Cno\u201D on a specific topic. Not everyone with an opinion is a decision maker.", ex: "The CFO who approves budget requests over $50K" },
            { term: "Influencer", def: "Someone who shapes opinions and decisions without formal authority. Often the most powerful stakeholders in practice.", ex: "A respected architect whose technical opinion sways the CTO" },
            { term: "Gatekeeper", def: "A person who controls access to a decision maker, resource, or process.", ex: "An EA who manages the CEO\u2019s calendar and decides who gets meeting time" },
            { term: "Blocker", def: "A stakeholder actively or passively preventing progress. Not an enemy \u2014 often someone whose concerns haven\u2019t been addressed.", ex: "Legal counsel who won\u2019t approve a contract because risk language is missing" },
            { term: "RAG Status", def: "Red / Amber / Green. A color-coded system for showing health or risk at a glance.", ex: "Red = broken trust or blocked. Amber = warning signs. Green = healthy and on track." },
            { term: "Touchpoint", def: "Any interaction with a stakeholder: meeting, email, call, Slack message, or hallway conversation.", ex: "A 5-min Slack check-in counts as a touchpoint. So does a 60-min steering committee." },
            { term: "Cadence", def: "The rhythm or frequency of your interactions with a stakeholder.", ex: "\u201CWeekly 1:1 with Sarah\u201D or \u201CMonthly update email to the CFO\u201D" },
            { term: "Engagement", def: "How involved and informed a stakeholder feels. High = heard and in the loop. Low = ignored or surprised.", ex: "A sponsor who hasn\u2019t heard from you in 3 weeks has low engagement \u2014 and that\u2019s risky." },
            { term: "Influence vs Interest", def: "A framework: Influence = how much power they have. Interest = how much they care. Combine them to prioritize.", ex: "High influence + high interest = Manage Closely. Low influence + low interest = Monitor." },
            { term: "Trust Builder", def: "An action that increases trust: delivering on promises, sharing credit, being transparent about problems early.", ex: "You promised a report by Friday and delivered it Thursday morning." },
            { term: "Trust Breaker", def: "An action that damages trust: missing deadlines, surprising with bad news publicly, going over someone\u2019s head.", ex: "You presented a decision to the CEO without telling the VP first." },
            { term: "Escalation", def: "Raising an issue to a higher authority when you cannot resolve it at your level. A professional tool, not a failure.", ex: "Telling your sponsor: \u201CI need your help unblocking this \u2014 I\u2019ve tried X and Y.\u201D" },
            { term: "CRM (Lite)", def: "A lightweight relationship tracking system. Context, history, and follow-ups \u2014 without enterprise CRM complexity.", ex: "This hub IS your CRM-lite. Each stakeholder profile is a CRM record." },
            { term: "QBR", def: "Quarterly Business Review. A formal review of progress, risks, and plans held every quarter.", ex: "A 60-min meeting with your sponsor to review Q1 results and set Q2 priorities." },
            { term: "KPI", def: "Key Performance Indicator. A measurable value that shows how effectively you\u2019re achieving a key objective.", ex: "\u201CStakeholder satisfaction score\u201D or \u201C% of follow-ups completed on time\u201D" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 800, color: accent }}>{r.term}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.def}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", color: C.textMuted }}>{r.ex}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderFrameworks = () => (
    <div ref={framRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner("#8B5CF6")}>FRAMEWORKS &amp; MODELS USED IN THIS HUB</div>
      <CopyButton targetRef={framRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>These are the thinking models referenced across multiple templates. Understanding them makes every template more powerful.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "20%" }}>Framework</th>
          <th style={S.thPrimary}>How It Works</th>
          <th style={{ ...S.thPrimary, width: "25%" }}>Where It&apos;s Used</th>
        </tr></thead>
        <tbody>
          {[
            { name: "Influence vs Interest Grid", how: "Plot stakeholders on a 2x2 grid. High Influence + High Interest = Manage Closely. High Influence + Low Interest = Keep Satisfied. Low Influence + High Interest = Keep Informed. Low Influence + Low Interest = Monitor.", where: "Influence & Interest Snapshot, Engagement Strategy, Stakeholder Map" },
            { name: "RAG Health Scoring", how: "Rate each relationship Red (at risk), Amber (needs attention), or Green (healthy). Review weekly. Trend over time reveals whether your relationships are improving or degrading.", where: "Command Dashboard, Health Scorecard, Portfolio Snapshot, Touchpoint Planner" },
            { name: "Trust Equation", how: "Trust = (Credibility + Reliability + Intimacy) / Self-Orientation. Build trust by being competent, following through, showing empathy, and putting their interests first.", where: "Trust Builders & Breakers, Relationship Plan, Stakeholder Profile" },
            { name: "Mutual Value Exchange", how: "Strong relationships are built on mutual value. Map what you offer them AND what they offer you. Look for gaps and imbalances.", where: "Mutual Value Map, Relationship Plan, Engagement Strategy" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 700, color: "#8B5CF6" }}>{r.name}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.how}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", color: C.textMuted }}>{r.where}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderCheatSheet = () => (
    <div ref={cheatRef} style={{ marginBottom: "12px" }}>
      <CopyButton targetRef={cheatRef} label="Copy Section" />
      <table style={LT}><tbody><tr>
        <td style={{ ...LC, width: "50%", paddingRight: "4px" }}>
          <table style={S.tbl}>
            <thead><tr><td style={{ backgroundColor: "#DBEAFE", color: "#0EA5E9", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #0EA5E9" }}>STAKEHOLDER TYPES AT A GLANCE</td></tr></thead>
            <tbody>
              {[
                { color: accent, type: "Sponsor", desc: "Funds and protects your work. Keep them informed and aligned." },
                { color: "#059669", type: "Champion", desc: "Advocates for you. Equip them with talking points and wins." },
                { color: "#8B5CF6", type: "Decision Maker", desc: "Says yes or no. Understand their criteria before you ask." },
                { color: "#D97706", type: "Influencer", desc: "Shapes opinions. Win them early \u2014 they sway the room." },
                { color: "#DC2626", type: "Blocker", desc: "Prevents progress. Address their concerns, don\u2019t fight them." },
                { color: "#6366F1", type: "Gatekeeper", desc: "Controls access. Treat them as allies, not obstacles." },
              ].map((r, i) => {
                const bg = i % 2 === 1 ? C.rowAlt : C.white;
                return (
                  <tr key={i}><td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", padding: "5px 10px" }}>
                    <strong style={{ color: r.color }}>{r.type}:</strong> <span style={{ fontSize: "9px", color: C.textMuted }}>{r.desc}</span>
                  </td></tr>
                );
              })}
            </tbody>
          </table>
        </td>
        <td style={{ ...LC, width: "50%", paddingLeft: "4px" }}>
          <table style={S.tbl}>
            <thead><tr><td style={{ backgroundColor: "#D1FAE5", color: "#059669", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #059669" }}>RAG STATUS QUICK REFERENCE</td></tr></thead>
            <tbody>
              {[
                { score: "Green", bg: C.badgeGreenBg, fg: C.badgeGreenFg, desc: "Relationship healthy. Regular cadence maintained. No outstanding issues. Keep doing what works." },
                { score: "Amber", bg: C.badgeAmberBg, fg: C.badgeAmberFg, desc: "Warning signs present. Missed touchpoints, slow responses, or slight misalignment. Act this week." },
                { score: "Red", bg: C.badgeRedBg, fg: C.badgeRedFg, desc: "Relationship at risk. Broken commitments, active conflict, or blocked decisions. Fix TODAY." },
              ].map((r, i) => {
                const rowBg = i % 2 === 1 ? C.rowAlt : C.white;
                return (
                  <tr key={i}><td style={{ ...S.td0, backgroundColor: rowBg, fontSize: "10px", padding: "6px 10px" }}>
                    <span style={S.badge(r.bg, r.fg)}>{r.score}</span><br />
                    <span style={{ fontSize: "9px", color: C.textMuted }}>{r.desc}</span>
                  </td></tr>
                );
              })}
              <tr><td style={{ ...S.td0, fontSize: "9px", padding: "6px 10px", lineHeight: "1.6" }}>
                <strong style={{ color: "#0EA5E9" }}>Tip:</strong> Update RAG status weekly. If a stakeholder has been Amber for 2+ weeks without action, they&apos;re effectively Red.
              </td></tr>
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
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-50 border border-rose-100 text-rose-700 text-xs font-semibold"><BookOpen size={11} />Reference</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/relationship-hub" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-rose-600 transition-colors"><ArrowLeft size={14} />Back to Relationship Hub</Link>
          <CopyAllButton targetRef={fullRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-rose-100 flex items-center justify-center"><Handshake size={20} className="text-rose-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">Terminology Guide</h2><p className="text-xs font-medium text-rose-600">Plain-English Definitions &bull; Reference Page</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Every term, framework, and abbreviation used in this hub, explained in plain English with real examples. Bookmark this page and come back whenever you see something unfamiliar.</p>
        </div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">View Mode</p>
          <div className="flex flex-wrap gap-2">
            {LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (
              <button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-rose-600 text-white border-rose-600 shadow-md shadow-rose-200" : "bg-white text-slate-600 border-slate-200 hover:border-rose-300 hover:text-rose-700"}`}>
                <Icon size={15} /><span>{l.label}</span><span className={`text-[10px] font-medium ${isActive ? "text-rose-200" : "text-slate-400"}`}>{l.desc}</span>
              </button>
            ); })}
          </div>
        </div>
        <div ref={fullRef} style={{ fontFamily: S.font }}>
          {layout === "full" && <>{renderTitleBanner()}{renderTerms()}{renderFrameworks()}{renderCheatSheet()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderTerms()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullRef} /></div>
      </div>
    </div>
  );
}

export default function TerminologyGuidePage() { return <ThemeProvider><TerminologyContent /></ThemeProvider>; }
