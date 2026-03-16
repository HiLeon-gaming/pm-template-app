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
  { id: "full", label: "Full Log", desc: "Wins + recognition playbook + tips", icon: LayoutDashboard },
  { id: "compact", label: "Quick Log", desc: "Wins table only", icon: AlignJustify },
];

function WinsContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullRef = useRef<HTMLDivElement>(null);
  const winsRef = useRef<HTMLDivElement>(null);
  const recRef = useRef<HTMLDivElement>(null);
  const tipsRef = useRef<HTMLDivElement>(null);

  const accent = "#8B5CF6";
  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>STAKEHOLDER WINS &amp; RECOGNITION LOG</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; Relationship &amp; Stakeholder Management Hub &nbsp;|&nbsp; Per Stakeholder</td></tr>
    </tbody></table>
  );

  const renderWins = () => (
    <div ref={winsRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner("#059669")}>STAKEHOLDER: [NAME] &mdash; WINS &amp; CONTRIBUTIONS</div>
      <CopyButton targetRef={winsRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>Track wins, contributions, and moments worth celebrating. People remember who noticed their successes. This log also helps you when you need to advocate for this stakeholder or write recommendations.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "9%" }}>Date</th>
          <th style={S.thPrimary}>Win / Contribution</th>
          <th style={S.thPrimary}>Impact on Your Work</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Recognized?</th>
          <th style={{ ...S.thPrimary, width: "15%" }}>How You Thanked Them</th>
        </tr></thead>
        <tbody>
          {[
            { date: "Mar 10", win: "Secured executive approval for Phase 2 funding", impact: "Unblocked the entire project timeline. Saved 3 weeks of waiting.", rec: "Yes", how: "Public thank-you in SteerCo. Email to their manager." },
            { date: "Mar 3", win: "Introduced us to key vendor contact", impact: "Saved 2 weeks of procurement time. Got preferred pricing.", rec: "No", how: "[Still pending \u2014 send thank-you this week]" },
            { date: "Feb 20", win: "Provided critical data for board presentation", impact: "Board approved strategic initiative. Data was the deciding factor.", rec: "Yes", how: "Private thank-you email. Mentioned in project review." },
            { date: "Feb 5", win: "Championed our project in leadership meeting", impact: "Secured additional headcount. Changed perception at exec level.", rec: "Yes", how: "Coffee + handwritten note." },
            { date: "[Date]", win: "[What they did]", impact: "[Why it mattered to your work]", rec: "[Y/N]", how: "[How you recognized them]" },
            { date: "[Date]", win: "[What they did]", impact: "[Why it mattered to your work]", rec: "[Y/N]", how: "[How you recognized them]" },
            { date: "[Date]", win: "[What they did]", impact: "[Why it mattered to your work]", rec: "[Y/N]", how: "[How you recognized them]" },
            { date: "[Date]", win: "[What they did]", impact: "[Why it mattered to your work]", rec: "[Y/N]", how: "[How you recognized them]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            const recColor = r.rec === "Yes" ? { bg: C.badgeGreenBg, fg: C.badgeGreenFg } : { bg: C.badgeAmberBg, fg: C.badgeAmberFg };
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 700, fontSize: "10px", color: "#059669" }}>{r.date}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", fontWeight: 600 }}>{r.win}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px" }}>{r.impact}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(recColor.bg, recColor.fg)}>{r.rec}</span></td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", color: C.textMuted }}>{r.how}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderRecognition = () => (
    <div ref={recRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner("#D97706")}>RECOGNITION PLAYBOOK</div>
      <CopyButton targetRef={recRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>Understand how THIS person likes to be recognized. Generic thanks feels hollow. Personalized recognition builds lasting loyalty.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "25%" }}>Recognition Area</th>
          <th style={S.thPrimary}>Your Plan</th>
        </tr></thead>
        <tbody>
          {[
            { label: "What Matters Most to Them", value: "[e.g., Public praise in meetings? Private thank-you email? Mention to their boss? Written note? Small gesture?]" },
            { label: "Best Way to Thank Them", value: "[e.g., In-person acknowledgment; CC their manager on a praise email; shout-out in Slack; LinkedIn recommendation]" },
            { label: "What to Avoid", value: "[e.g., They hate public attention; don\u2019t make a big deal; they prefer actions over words]" },
            { label: "Next Recognition Opportunity", value: "[Next meeting, review, or milestone where you can recognize them. Be specific: date + forum.]" },
            { label: "Unrecognized Wins to Address", value: "[Look at your log above \u2014 any \u201CNo\u201D in the Recognized column? Plan to address those this week.]" },
            { label: "Long-Term Recognition Ideas", value: "[LinkedIn recommendation; nominate for an award; introduce them to their next opportunity; write a reference]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 700, color: "#D97706" }}>{r.label}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.value}</td>
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
            <thead><tr><td style={{ backgroundColor: "#DCFCE7", color: "#059669", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #059669" }}>RECOGNITION PRINCIPLES</td></tr></thead>
            <tbody>
              {[
                { color: "#059669", tip: "Recognize in their preferred way.", detail: "Some people love public praise. Others cringe at it. Know the difference." },
                { color: "#0EA5E9", tip: "Be specific, not generic.", detail: "\u201CThanks for your help\u201D is forgettable. \u201CYour data analysis in the board deck was the deciding factor for Phase 2 approval\u201D is unforgettable." },
                { color: "#8B5CF6", tip: "Recognize the effort, not just the outcome.", detail: "Sometimes people go above and beyond and the outcome doesn\u2019t work out. Acknowledge the effort." },
                { color: "#D97706", tip: "Make it timely.", detail: "Recognition loses power with delay. Thank them within 48 hours, not 2 weeks later." },
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
            <thead><tr><td style={{ backgroundColor: "#FEF3C7", color: "#D97706", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #D97706" }}>HIGH-IMPACT RECOGNITION MOVES</td></tr></thead>
            <tbody>
              {[
                { color: "#DC2626", tip: "CC their manager on a praise email.", detail: "This takes 30 seconds and can make someone\u2019s entire week. Do it." },
                { color: "#EA580C", tip: "Thank them in front of their peers.", detail: "Public recognition from a cross-functional partner is incredibly powerful." },
                { color: "#D97706", tip: "Remember and reference their contributions later.", detail: "\u201CRemember when you helped us with the vendor intro? That saved us 2 weeks.\u201D Shows lasting appreciation." },
                { color: "#6366F1", tip: "Pay it forward by advocating for them.", detail: "The best recognition is helping their career. Recommend them. Introduce them. Champion their work." },
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
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-violet-50 border border-violet-100 text-violet-700 text-xs font-semibold"><Trophy size={11} />Per-Stakeholder</span>
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
            <div><h2 className="text-2xl font-extrabold text-slate-900">Stakeholder Wins &amp; Recognition Log</h2><p className="text-xs font-medium text-violet-600">Per Stakeholder &bull; Strengthen Relationships Through Recognition</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">People remember who noticed their successes. This log tracks every contribution and win from each stakeholder, ensures nothing goes unrecognized, and helps you build a personalized recognition playbook. Recognition is one of the highest-ROI relationship investments you can make.</p>
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
          {layout === "full" && <>{renderTitleBanner()}{renderWins()}{renderRecognition()}{renderTips()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderWins()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullRef} /></div>
      </div>
    </div>
  );
}

export default function StakeholderWinsRecognitionPage() { return <ThemeProvider><WinsContent /></ThemeProvider>; }
