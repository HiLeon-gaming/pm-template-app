"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, Handshake, LayoutDashboard, AlignJustify, Trophy } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Summary", desc: "Wins + recognition + momentum + tips", icon: LayoutDashboard },
  { id: "compact", label: "Quick Summary", desc: "Wins + recognition only", icon: AlignJustify },
];

function WinsContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullRef = useRef<HTMLDivElement>(null);
  const winsRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<HTMLDivElement>(null);
  const momentumRef = useRef<HTMLDivElement>(null);
  const tipsRef = useRef<HTMLDivElement>(null);

  const accent = "#D97706";
  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>WINS &amp; MOMENTUM SUMMARY</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; Relationship &amp; Stakeholder Management Hub &nbsp;|&nbsp; [PERIOD]</td></tr>
    </tbody></table>
  );

  const renderWins = () => (
    <div ref={winsRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner("#059669")}>WINS THIS PERIOD</div>
      <CopyButton targetRef={winsRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>Document what&apos;s going well. PMs spend 90% of their energy on problems. This page forces you to capture wins, recognize contributors, and build momentum. Wins feed confidence, credibility, and stakeholder trust. Don&apos;t skip this.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "4%", textAlign: "center" as const }}>#</th>
          <th style={S.thPrimary}>Win / Achievement</th>
          <th style={{ ...S.thPrimary, width: "12%" }}>Who Made It Happen</th>
          <th style={{ ...S.thPrimary, width: "15%" }}>Impact / Value</th>
          <th style={{ ...S.thPrimary, width: "15%" }}>How to Amplify</th>
        </tr></thead>
        <tbody>
          {[
            { n: "1", win: "Vendor selection completed 1 week ahead of schedule. SteerCo approved unanimously.", who: "You + Maria (Sponsor)", impact: "De-risked Phase 1 timeline. Built SteerCo confidence.", amplify: "Mention in next team update. Thank Maria publicly." },
            { n: "2", win: "David Park\u2019s relationship moved from Red to Amber. Monthly budget updates restored trust.", who: "You", impact: "Removed budget escalation risk. Finance now supportive.", amplify: "Continue cadence. Share approach as best practice." },
            { n: "3", win: "Team shipped 3 sprint deliverables with zero defects. QA praised the quality.", who: "Engineering team", impact: "Built credibility with stakeholders. Reduced rework cycle.", amplify: "Send team recognition email. CC their manager." },
            { n: "4", win: "Sponsor actively championed the project in leadership meeting without being asked.", who: "Maria Lopez", impact: "Secured Q2 budget. Raised project visibility.", amplify: "Thank her 1:1. Ask what she needs to keep championing." },
            { n: "5", win: "[What went well?]", who: "[Who deserves credit?]", impact: "[Why does this matter?]", amplify: "[How to build on it]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 800, fontSize: "10px", color: "#059669" }}>{r.n}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px" }}>{r.win}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", fontWeight: 700 }}>{r.who}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", color: C.textMuted }}>{r.impact}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px" }}>{r.amplify}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderRecognition = () => (
    <div ref={recognitionRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(accent)}>RECOGNITION ACTIONS</div>
      <CopyButton targetRef={recognitionRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>Recognition is the cheapest, most powerful relationship tool you have. These actions take 5 minutes each and pay dividends for months.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "6%", textAlign: "center" as const }}>\u2610</th>
          <th style={{ ...S.thPrimary, width: "15%" }}>Who</th>
          <th style={S.thPrimary}>Recognition Action</th>
          <th style={{ ...S.thPrimary, width: "10%" }}>Channel</th>
          <th style={{ ...S.thPrimary, width: "10%" }}>By When</th>
        </tr></thead>
        <tbody>
          {[
            { who: "Maria Lopez", action: "Send thank-you message for championing in leadership meeting. Specific: mention the budget outcome.", channel: "Private email", when: "This week" },
            { who: "Engineering Team", action: "Team recognition for zero-defect sprint. CC their manager and skip-level.", channel: "Team email", when: "Today" },
            { who: "David Park", action: "Acknowledge improved collaboration. \u201CAppreciate your patience and partnership.\u201D", channel: "Next 1:1", when: "This week" },
            { who: "QA Team", action: "Thank them for thorough testing that contributed to zero defects.", channel: "Slack shoutout", when: "Today" },
            { who: "[Person]", action: "[What recognition are they due?]", channel: "[How]", when: "[When]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "14px" }}>\u2610</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 700 }}>{r.who}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px" }}>{r.action}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", color: C.textMuted }}>{r.channel}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", color: accent, fontWeight: 600 }}>{r.when}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderMomentum = () => (
    <div ref={momentumRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner("#6366F1")}>MOMENTUM &mdash; WHAT TO REINFORCE</div>
      <CopyButton targetRef={momentumRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "20%" }}>What\u2019s Working</th>
          <th style={S.thPrimary}>Why It\u2019s Working</th>
          <th style={{ ...S.thPrimary, width: "25%" }}>How to Keep It Going</th>
        </tr></thead>
        <tbody>
          {[
            { what: "Monthly budget updates to Finance", why: "David knows what to expect. No surprises. Trust rebuilt through consistency.", keep: "Don\u2019t skip a month. Same format, same day. Consistency IS the strategy." },
            { what: "Sponsor pre-briefing before SteerCo", why: "Maria is never surprised. She can champion confidently because she\u2019s well-prepared.", keep: "Send pre-brief 48 hours before SteerCo. Include talking points." },
            { what: "Zero-defect engineering sprints", why: "Clear requirements + thorough QA + team pride in quality.", keep: "Celebrate publicly. Don\u2019t let quality slip under deadline pressure." },
            { what: "[What\u2019s going well?]", why: "[Why is it working?]", keep: "[How to sustain it]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 700, color: "#6366F1" }}>{r.what}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px" }}>{r.why}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", color: C.textMuted }}>{r.keep}</td>
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
            <thead><tr><td style={{ backgroundColor: "#FEF3C7", color: "#D97706", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #D97706" }}>WHY WINS MATTER</td></tr></thead>
            <tbody>
              {[
                { color: "#D97706", tip: "Wins build credibility.", detail: "Every win you document is evidence of competence. Use them in reviews, briefs, and updates." },
                { color: "#059669", tip: "Recognition builds loyalty.", detail: "People remember who noticed their work. 5 minutes of recognition = months of goodwill." },
                { color: "#0EA5E9", tip: "Momentum is fragile.", detail: "What\u2019s working now won\u2019t work forever. Actively reinforce the things that are going well." },
                { color: "#DC2626", tip: "PMs who only report problems lose trust.", detail: "Balance your updates. For every risk, share a win. It shows you\u2019re managing, not just reacting." },
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
            <thead><tr><td style={{ backgroundColor: "#DCFCE7", color: "#059669", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #059669" }}>RECOGNITION PLAYBOOK</td></tr></thead>
            <tbody>
              {[
                { color: "#059669", tip: "Be specific.", detail: "\u201CGreat job\u201D is nice. \u201CYour vendor analysis saved us $40K and 2 weeks\u201D is powerful." },
                { color: "#0EA5E9", tip: "CC their manager.", detail: "Public recognition that reaches leadership is 10x more valuable than private thanks." },
                { color: "#6366F1", tip: "Recognize effort, not just results.", detail: "Someone who tried hard and failed deserves recognition too. It builds psychological safety." },
                { color: "#D97706", tip: "Make it timely.", detail: "Recognition 6 weeks later is meaningless. Do it within 48 hours of the win." },
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
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-100 text-amber-700 text-xs font-semibold"><Trophy size={11} />Wins</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/relationship-hub" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-rose-600 transition-colors"><ArrowLeft size={14} />Back to Relationship Hub</Link>
          <CopyAllButton targetRef={fullRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center"><Handshake size={20} className="text-amber-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">Wins &amp; Momentum Summary</h2><p className="text-xs font-medium text-amber-600">Celebrate &bull; Recognize &bull; Reinforce What&apos;s Working</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">PMs spend 90% of their energy on problems. This page forces you to capture wins, recognize contributors, and build momentum. Wins feed confidence, credibility, and stakeholder trust. Use this regularly to balance your narrative and amplify what&apos;s working.</p>
        </div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">View Mode</p>
          <div className="flex flex-wrap gap-2">
            {LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (
              <button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-amber-600 text-white border-amber-600 shadow-md shadow-amber-200" : "bg-white text-slate-600 border-slate-200 hover:border-amber-300 hover:text-amber-700"}`}>
                <Icon size={15} /><span>{l.label}</span><span className={`text-[10px] font-medium ${isActive ? "text-amber-200" : "text-slate-400"}`}>{l.desc}</span>
              </button>
            ); })}
          </div>
        </div>
        <div ref={fullRef} style={{ fontFamily: S.font }}>
          {layout === "full" && <>{renderTitleBanner()}{renderWins()}{renderRecognition()}{renderMomentum()}{renderTips()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderWins()}{renderRecognition()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullRef} /></div>
      </div>
    </div>
  );
}

export default function WinsMomentumSummaryPage() { return <ThemeProvider><WinsContent /></ThemeProvider>; }
