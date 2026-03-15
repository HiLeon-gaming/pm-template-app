"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, Award, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Capture", desc: "Wins + learnings + improvements + shoutouts", icon: LayoutDashboard },
  { id: "compact", label: "Quick View", desc: "Wins & learnings table only", icon: AlignJustify },
];

function WinsLearningsContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullRef = useRef<HTMLDivElement>(null);
  const winsRef = useRef<HTMLDivElement>(null);
  const learnRef = useRef<HTMLDivElement>(null);
  const improveRef = useRef<HTMLDivElement>(null);
  const shoutRef = useRef<HTMLDivElement>(null);

  const accent = "#059669";

  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>WEEKLY WINS &amp; LEARNINGS</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; OKR &amp; Operating Rhythm Hub &nbsp;|&nbsp; Week of [DATE]</td></tr>
    </tbody></table>
  );

  const renderWins = () => (
    <div ref={winsRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(accent)}>THIS WEEK&apos;S WINS</div>
      <CopyButton targetRef={winsRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>What went well this week? Celebrate progress — even small wins build momentum and morale.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "5%", textAlign: "center" as const }}>#</th>
          <th style={S.thPrimary}>Win (What Happened)</th>
          <th style={{ ...S.thPrimary, width: "12%", textAlign: "center" as const }}>Impact On</th>
          <th style={{ ...S.thPrimary, width: "12%" }}>Who Delivered</th>
        </tr></thead>
        <tbody>
          {[
            { win: "2 support agents accepted offers — ahead of schedule!", impact: "KR 1.1", who: "[HR + Tom R.]" },
            { win: "LinkedIn campaign live within 48 hours. First impressions: 12K.", impact: "KR 2.1", who: "[Amy K. + Content]" },
            { win: "VP Engineering role posted on 4 platforms. Referral bonus announced.", impact: "KR 3.1", who: "[Recruiter]" },
            { win: "Onboarding email draft completed and feedback incorporated.", impact: "KR 1.2", who: "[Lisa P.]" },
            { win: "[Your win here]", impact: "", who: "" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 800, fontSize: "14px", color: accent }}>{i + 1}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 600 }}>{r.win}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "9px", fontWeight: 700, color: "#7C3AED" }}>{r.impact}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px" }}>{r.who}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderLearn = () => (
    <div ref={learnRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner("#D97706")}>LEARNINGS &amp; OBSERVATIONS</div>
      <CopyButton targetRef={learnRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>What did we learn this week? What surprised us? What would we do differently next time?</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={S.thPrimary}>Learning / Observation</th>
          <th style={{ ...S.thPrimary, width: "30%" }}>Implication (What Should We Do About It?)</th>
        </tr></thead>
        <tbody>
          {[
            { learn: "NPS data access took 3 days to get approved — blocked the detractor recovery script.", imp: "Pre-request data access for ALL KR metrics in Week 1 of each quarter." },
            { learn: "LinkedIn ads cost-per-click was 40% lower than expected. Budget may stretch further.", imp: "Consider shifting $2K from conference budget to LinkedIn. Discuss at next check-in." },
            { learn: "Enterprise prospect #3 went dark after intro email. Cold outreach alone won't work.", imp: "Need warm intros. Ask existing customers for referrals. Update playbook." },
            { learn: "[Your learning here]", imp: "" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.learn}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 600, color: "#D97706" }}>{r.imp}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderImproveAndShout = () => (
    <div ref={improveRef} style={{ marginBottom: "12px" }}>
      <CopyButton targetRef={improveRef} label="Copy Section" />
      <table style={LT}><tbody><tr>
        <td style={{ ...LC, width: "55%", paddingRight: "4px" }}>
          <table style={S.tbl}>
            <thead><tr><td style={{ backgroundColor: "#FEE2E2", color: "#DC2626", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #DC2626" }}>🛠️ IMPROVEMENT ACTIONS</td></tr></thead>
            <tbody>
              {[
                { imp: "Create a 'data access checklist' for all KR metrics — request access in Week 1.", owner: "[Ops]", by: "Next Mon" },
                { imp: "Add warm intro request to enterprise outreach playbook.", owner: "[Sales]", by: "Next Wed" },
                { imp: "[Your improvement here]", owner: "", by: "" },
              ].map((r, i) => {
                const bg = i % 2 === 1 ? C.rowAlt : C.white;
                return (
                  <tr key={i}>
                    <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", padding: "6px 10px" }}>
                      <span style={{ fontWeight: 600 }}>{r.imp}</span><br />
                      {r.owner && <span style={{ fontSize: "9px", color: C.textMuted }}>Owner: <span style={{ fontWeight: 700 }}>{r.owner}</span> &nbsp;|&nbsp; By: <span style={{ fontWeight: 700 }}>{r.by}</span></span>}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </td>
        <td style={{ ...LC, width: "45%", paddingLeft: "4px" }}>
          <table style={S.tbl}>
            <thead><tr><td style={{ backgroundColor: "#EDE9FE", color: "#7C3AED", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #7C3AED" }}>🌟 SHOUTOUTS &amp; RECOGNITION</td></tr></thead>
            <tbody>
              {[
                { who: "[Tom R.]", what: "Got both offers accepted in a single week. Outstanding." },
                { who: "[Amy K.]", what: "LinkedIn campaign in 48 hrs. First data looks promising." },
                { who: "[Your shoutout]", what: "" },
              ].map((r, i) => {
                const bg = i % 2 === 1 ? C.rowAlt : C.white;
                return (
                  <tr key={i}>
                    <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", padding: "6px 10px" }}>
                      <span style={{ fontWeight: 700, color: "#7C3AED" }}>{r.who}</span><br />
                      {r.what && <span style={{ fontSize: "9px", color: C.textMuted }}>{r.what}</span>}
                    </td>
                  </tr>
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
        ExecNoteShop &bull; OKR &amp; Operating Rhythm Hub &bull; &copy; 2026 All Rights Reserved
      </td>
    </tr></tbody></table>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50/30">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-600 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-semibold"><Award size={11} />Wins</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/okr-hub" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-emerald-600 transition-colors"><ArrowLeft size={14} />Back to OKR Hub</Link>
          <CopyAllButton targetRef={fullRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center"><Award size={20} className="text-emerald-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">Weekly Wins &amp; Learnings</h2><p className="text-xs font-medium text-emerald-600">Celebrate Progress &bull; Capture Lessons</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Wins, lessons, improvements, and shoutouts. Builds momentum and makes the team better every week.</p>
        </div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">View Mode</p>
          <div className="flex flex-wrap gap-2">
            {LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (
              <button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-200" : "bg-white text-slate-600 border-slate-200 hover:border-emerald-300 hover:text-emerald-700"}`}>
                <Icon size={15} /><span>{l.label}</span><span className={`text-[10px] font-medium ${isActive ? "text-emerald-200" : "text-slate-400"}`}>{l.desc}</span>
              </button>
            ); })}
          </div>
        </div>
        <div ref={fullRef} style={{ fontFamily: S.font }}>
          {layout === "full" && <>{renderTitleBanner()}{renderWins()}{renderLearn()}{renderImproveAndShout()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderWins()}{renderLearn()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullRef} /></div>
      </div>
    </div>
  );
}

export default function WeeklyWinsLearningsPage() { return <ThemeProvider><WinsLearningsContent /></ThemeProvider>; }
