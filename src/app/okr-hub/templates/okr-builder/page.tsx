"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, Target, LayoutDashboard, AlignJustify, Zap } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Builder", desc: "OKR table + initiatives + confidence + scoring + tips", icon: LayoutDashboard },
  { id: "compact", label: "Quick OKR", desc: "OKR table only", icon: AlignJustify },
];

function OKRBuilderContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullRef = useRef<HTMLDivElement>(null);
  const okrRef = useRef<HTMLDivElement>(null);
  const initRef = useRef<HTMLDivElement>(null);
  const confRef = useRef<HTMLDivElement>(null);
  const scoreRef = useRef<HTMLDivElement>(null);
  const tipsRef = useRef<HTMLDivElement>(null);

  const accent = "#7C3AED";

  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>OKR BUILDER (OBJECTIVES AND KEY RESULTS)</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; OKR &amp; Operating Rhythm Hub &nbsp;|&nbsp; &#11088; All-Star &nbsp;|&nbsp; Core Goal-Setting Page</td></tr>
    </tbody></table>
  );

  const renderOKR = () => (
    <div ref={okrRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accent)}>OBJECTIVES &amp; KEY RESULTS — Q[X] [YEAR]</td></tr></tbody></table>
      <CopyButton targetRef={okrRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>An <strong>Objective</strong> is WHAT you want to achieve (clear and motivating). <strong>Key Results</strong> are HOW you&apos;ll measure success (specific numbers). Aim for 2&ndash;3 objectives with 2&ndash;3 key results each.</p>

      {/* OKR #1 */}
      <table style={{ ...S.tbl, marginBottom: "2px" }}>
        <thead><tr><td colSpan={7} style={{ backgroundColor: accent, color: C.white, padding: "10px 16px", fontSize: "12px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em" }}>OBJECTIVE 1: [Improve customer experience so users become our best salespeople]</td></tr>
        <tr>
          <th style={{ ...S.thPrimary, width: "5%", textAlign: "center" as const }}>KR#</th>
          <th style={S.thPrimary}>Key Result</th>
          <th style={{ ...S.thPrimary, width: "9%", textAlign: "center" as const }}>Baseline</th>
          <th style={{ ...S.thPrimary, width: "9%", textAlign: "center" as const }}>Target</th>
          <th style={{ ...S.thPrimary, width: "9%", textAlign: "center" as const }}>Current</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Score</th>
          <th style={{ ...S.thPrimary, width: "10%" }}>Owner</th>
        </tr></thead>
        <tbody>
          {[
            { kr: "1.1", desc: "[Reduce average support wait time from 18 hours to 6 hours]", base: "18 hrs", target: "6 hrs", current: "10 hrs", score: "0.67", owner: "[Sarah]" },
            { kr: "1.2", desc: "[Increase customer satisfaction (CSAT) from 4.1 to 4.5]", base: "4.1", target: "4.5", current: "4.3", score: "0.50", owner: "[Product]" },
            { kr: "1.3", desc: "[Increase NPS from 35 to 55]", base: "35", target: "55", current: "42", score: "0.35", owner: "[CX Team]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 800, fontSize: "11px", color: accent }}>{r.kr}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.desc}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "10px" }}>{r.base}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "10px", fontWeight: 700 }}>{r.target}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "10px", fontWeight: 700, color: accent }}>{r.current}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "10px", fontWeight: 700 }}>{r.score}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px" }}>{r.owner}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* OKR #2 */}
      <table style={{ ...S.tbl, marginBottom: "2px", marginTop: "8px" }}>
        <thead><tr><td colSpan={7} style={{ backgroundColor: "#0EA5E9", color: C.white, padding: "10px 16px", fontSize: "12px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em" }}>OBJECTIVE 2: [Grow revenue pipeline to fuel next stage of growth]</td></tr>
        <tr>
          <th style={{ ...S.thPrimary, width: "5%", textAlign: "center" as const }}>KR#</th>
          <th style={S.thPrimary}>Key Result</th>
          <th style={{ ...S.thPrimary, width: "9%", textAlign: "center" as const }}>Baseline</th>
          <th style={{ ...S.thPrimary, width: "9%", textAlign: "center" as const }}>Target</th>
          <th style={{ ...S.thPrimary, width: "9%", textAlign: "center" as const }}>Current</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Score</th>
          <th style={{ ...S.thPrimary, width: "10%" }}>Owner</th>
        </tr></thead>
        <tbody>
          {[
            { kr: "2.1", desc: "[Increase qualified leads from 200/mo to 400/mo]", base: "200", target: "400", current: "280", score: "0.40", owner: "[Marketing]" },
            { kr: "2.2", desc: "[Close 3 enterprise deals (>$100K each)]", base: "0", target: "3", current: "1", score: "0.33", owner: "[Sales]" },
            { kr: "2.3", desc: "[Reduce sales cycle from 90 days to 60 days]", base: "90 days", target: "60 days", current: "75 days", score: "0.50", owner: "[Sales Ops]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 800, fontSize: "11px", color: "#0EA5E9" }}>{r.kr}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.desc}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "10px" }}>{r.base}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "10px", fontWeight: 700 }}>{r.target}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "10px", fontWeight: 700, color: "#0EA5E9" }}>{r.current}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "10px", fontWeight: 700 }}>{r.score}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px" }}>{r.owner}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* OKR #3 */}
      <table style={{ ...S.tbl, marginTop: "8px" }}>
        <thead><tr><td colSpan={7} style={{ backgroundColor: "#059669", color: C.white, padding: "10px 16px", fontSize: "12px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em" }}>OBJECTIVE 3: [Build a world-class team that top talent wants to join]</td></tr>
        <tr>
          <th style={{ ...S.thPrimary, width: "5%", textAlign: "center" as const }}>KR#</th>
          <th style={S.thPrimary}>Key Result</th>
          <th style={{ ...S.thPrimary, width: "9%", textAlign: "center" as const }}>Baseline</th>
          <th style={{ ...S.thPrimary, width: "9%", textAlign: "center" as const }}>Target</th>
          <th style={{ ...S.thPrimary, width: "9%", textAlign: "center" as const }}>Current</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Score</th>
          <th style={{ ...S.thPrimary, width: "10%" }}>Owner</th>
        </tr></thead>
        <tbody>
          {[
            { kr: "3.1", desc: "[Fill 5 open critical roles by end of quarter]", base: "0", target: "5", current: "4", score: "0.80", owner: "[HR]" },
            { kr: "3.2", desc: "[Achieve >85% employee engagement score]", base: "72%", target: "85%", current: "68%", score: "0.00", owner: "[People Ops]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 800, fontSize: "11px", color: "#059669" }}>{r.kr}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.desc}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "10px" }}>{r.base}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "10px", fontWeight: 700 }}>{r.target}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "10px", fontWeight: 700, color: "#059669" }}>{r.current}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "10px", fontWeight: 700 }}>{r.score}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px" }}>{r.owner}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderInit = () => (
    <div ref={initRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner("#D97706")}>LINKED INITIATIVES (The Work That Moves Key Results)</td></tr></tbody></table>
      <CopyButton targetRef={initRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>Initiatives are the PROJECTS and WORK that will move your Key Results. A Key Result without an initiative is just a wish. Make sure every KR has at least one initiative.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Links To</th>
          <th style={S.thPrimary}>Initiative (Project / Work)</th>
          <th style={{ ...S.thPrimary, width: "10%" }}>Owner</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Due</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Status</th>
        </tr></thead>
        <tbody>
          {[
            { kr: "KR 1.1", init: "[Hire 3 support agents + onboard by Week 4]", owner: "[HR + Support]", due: "Week 4", s: "In Progress", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg },
            { kr: "KR 1.1", init: "[Launch new ticketing system (Zendesk \u2192 Intercom)]", owner: "[IT + Support]", due: "Week 6", s: "Planning", sBg: C.badgeBlueBg, sFg: C.badgeBlueFg },
            { kr: "KR 1.2", init: "[Redesign customer onboarding email sequence]", owner: "[Product]", due: "Week 3", s: "In Progress", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg },
            { kr: "KR 2.1", init: "[Launch paid advertising campaign on LinkedIn + Google]", owner: "[Marketing]", due: "Week 2", s: "Done", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg },
            { kr: "KR 2.2", init: "[Build enterprise sales playbook + case studies]", owner: "[Sales]", due: "Week 5", s: "In Progress", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg },
            { kr: "KR 3.1", init: "[Post VP Engineering role + run recruiter sprint]", owner: "[HR]", due: "Week 1", s: "Done", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg },
            { kr: "KR 3.2", init: "[Launch monthly team culture survey + act on results]", owner: "[People Ops]", due: "Ongoing", s: "At Risk", sBg: C.badgeAmberBg, sFg: C.badgeAmberFg },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "9px", fontWeight: 700, color: accent }}>{r.kr}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.init}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px" }}>{r.owner}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "10px", fontWeight: 700 }}>{r.due}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.sBg, r.sFg)}>{r.s}</span></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderConf = () => (
    <div ref={confRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner("#DC2626")}>CONFIDENCE CHECK (How Likely Are We to Hit Each KR?)</td></tr></tbody></table>
      <CopyButton targetRef={confRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>Rate your confidence 1&ndash;10 for each Key Result. Update this every week. If confidence drops below 5, it&apos;s time to act &mdash; either change the approach or adjust the target.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>KR#</th>
          <th style={S.thPrimary}>Key Result</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Confidence</th>
          <th style={{ ...S.thPrimary, width: "30%" }}>Why? / What Would Change It?</th>
        </tr></thead>
        <tbody>
          {[
            { kr: "1.1", desc: "Support wait time \u2192 6 hrs", conf: "7/10", why: "Hiring on track. Will jump to 9 once ticketing system launches.", color: "#059669" },
            { kr: "1.2", desc: "CSAT \u2192 4.5", conf: "6/10", why: "Improving but slowly. Onboarding redesign should accelerate.", color: "#D97706" },
            { kr: "1.3", desc: "NPS \u2192 55", conf: "4/10", why: "Behind schedule. Need to address detractor feedback faster.", color: "#DC2626" },
            { kr: "2.1", desc: "Qualified leads \u2192 400/mo", conf: "5/10", why: "Ad campaign started but too early to see full impact.", color: "#D97706" },
            { kr: "2.2", desc: "3 enterprise deals", conf: "4/10", why: "Only 1 closed. Pipeline exists but legal review is slow.", color: "#DC2626" },
            { kr: "2.3", desc: "Sales cycle \u2192 60 days", conf: "6/10", why: "New playbook helping. Need more case studies.", color: "#D97706" },
            { kr: "3.1", desc: "Fill 5 critical roles", conf: "9/10", why: "4 of 5 filled. Last one in final round.", color: "#059669" },
            { kr: "3.2", desc: "Engagement \u2192 85%", conf: "2/10", why: "Dropped from 72% to 68%. Major intervention needed.", color: "#DC2626" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 800, fontSize: "11px", color: accent }}>{r.kr}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.desc}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 800, fontSize: "12px", color: r.color }}>{r.conf}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px" }}>{r.why}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderScoreAndTips = () => (
    <div ref={scoreRef} style={{ marginBottom: "12px" }}>
      <CopyButton targetRef={scoreRef} label="Copy Section" />
      <table style={LT}><tbody><tr>
        <td style={{ ...LC, width: "50%", paddingRight: "4px" }}>
          <table style={S.tbl}>
            <thead><tr><td style={{ backgroundColor: "#DBEAFE", color: "#0EA5E9", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #0EA5E9" }}>🏆 HOW TO SCORE OKRs</td></tr></thead>
            <tbody>
              {[
                { score: "0.7 \u2013 1.0", label: "Green", bg: C.badgeGreenBg, fg: C.badgeGreenFg, desc: "Delivered! Hit or exceeded target." },
                { score: "0.4 \u2013 0.6", label: "Amber", bg: C.badgeAmberBg, fg: C.badgeAmberFg, desc: "Good progress but didn\u2019t fully hit it." },
                { score: "0.0 \u2013 0.3", label: "Red", bg: C.badgeRedBg, fg: C.badgeRedFg, desc: "Missed significantly. Learn and adjust." },
              ].map((r, i) => {
                const bg = i % 2 === 1 ? C.rowAlt : C.white;
                return (
                  <tr key={i}>
                    <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", padding: "6px 10px" }}>
                      <span style={{ fontWeight: 800 }}>{r.score}</span> <span style={S.badge(r.bg, r.fg)}>{r.label}</span><br />
                      <span style={{ fontSize: "9px", color: C.textMuted }}>{r.desc}</span>
                    </td>
                  </tr>
                );
              })}
              <tr><td style={{ ...S.td0, fontSize: "9px", padding: "6px 10px", lineHeight: "1.6" }}>
                <strong style={{ color: "#0EA5E9" }}>Formula:</strong> (Current - Baseline) / (Target - Baseline)<br />
                <strong>Example:</strong> Wait time 18&rarr;10, target 6. Score = 8/12 = <strong>0.67</strong>
              </td></tr>
            </tbody>
          </table>
        </td>
        <td style={{ ...LC, width: "50%", paddingLeft: "4px" }}>
          <table style={S.tbl}>
            <thead><tr><td style={{ backgroundColor: "#D1FAE5", color: "#059669", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #059669" }}>✍️ OKR WRITING TIPS</td></tr></thead>
            <tbody>
              {[
                { color: accent, tip: "Objectives should be inspiring.", detail: "\u201cImprove CX\u201d = good. \u201cIncrease CSAT to 4.5\u201d = a KR, not an Objective." },
                { color: "#059669", tip: "Key Results must have numbers.", detail: "\u201cImprove support\u201d = bad. \u201cReduce wait to 6 hrs\u201d = good." },
                { color: "#D97706", tip: "2\u20133 objectives per quarter. Max.", detail: "5+ objectives = zero focus. Cut ruthlessly." },
                { color: "#DC2626", tip: "Don\u2019t confuse tasks with KRs.", detail: "\u201cLaunch website\u201d = task. \u201cConversion 2%\u21925%\u201d = KR." },
                { color: "#0EA5E9", tip: "0.7 is a great score.", detail: "OKRs should be ambitious. 100% every time = too easy." },
              ].map((r, i) => {
                const bg = i % 2 === 1 ? C.rowAlt : C.white;
                return (
                  <tr key={i}>
                    <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", padding: "5px 10px" }}>
                      <strong style={{ color: r.color }}>{r.tip}</strong><br />
                      <span style={{ fontSize: "9px", color: C.textMuted }}>{r.detail}</span>
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-violet-50/30">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-violet-600 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-100 text-amber-700 text-xs font-semibold"><Zap size={11} />All-Star</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/okr-hub" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-violet-600 transition-colors"><ArrowLeft size={14} />Back to OKR Hub</Link>
          <CopyAllButton targetRef={fullRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-violet-100 flex items-center justify-center"><Target size={20} className="text-violet-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">OKR Builder</h2><p className="text-xs font-medium text-violet-600">&#11088; All-Star &mdash; Objectives and Key Results</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Your core goal-creation page. Define objectives, key results, baselines, targets, owners, confidence levels, and linked initiatives. This is where strategy becomes real.</p>
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
          {layout === "full" && <>{renderTitleBanner()}{renderOKR()}{renderInit()}{renderConf()}{renderScoreAndTips()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderOKR()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullRef} /></div>
      </div>
    </div>
  );
}

export default function OKRBuilderPage() { return <ThemeProvider><OKRBuilderContent /></ThemeProvider>; }
