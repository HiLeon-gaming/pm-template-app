"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, Flag, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Snapshot", desc: "Mission + themes + focus areas + constraints + anti-goals", icon: LayoutDashboard },
  { id: "compact", label: "Quick View", desc: "Mission + themes only", icon: AlignJustify },
];

function AnnualDirectionContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullRef = useRef<HTMLDivElement>(null);
  const missionRef = useRef<HTMLDivElement>(null);
  const themesRef = useRef<HTMLDivElement>(null);
  const focusRef = useRef<HTMLDivElement>(null);
  const constraintsRef = useRef<HTMLDivElement>(null);
  const antiRef = useRef<HTMLDivElement>(null);

  const accent = "#7C3AED";

  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>ANNUAL DIRECTION SNAPSHOT</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; OKR &amp; Operating Rhythm Hub &nbsp;|&nbsp; Strategy Foundation</td></tr>
    </tbody></table>
  );

  const renderMission = () => (
    <div ref={missionRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accent)}>MISSION &amp; VISION</td></tr></tbody></table>
      <CopyButton targetRef={missionRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>Your mission is WHY your company exists. Your vision is WHERE you&apos;re going. These don&apos;t change often — they set the context for everything else.</p>
      <table style={S.tbl}><tbody>
        <tr><td style={S.tdLabel}>Mission (Why We Exist)</td><td style={S.td0}>[Example: &ldquo;Make every small business owner feel like they have a Fortune 500 support team.&rdquo;]</td></tr>
        <tr><td style={S.tdLabelAlt}>Vision (Where We&apos;re Going)</td><td style={S.tdAlt}>[Example: &ldquo;Become the #1 platform for small business operations by 2028.&rdquo;]</td></tr>
        <tr><td style={S.tdLabel}>Core Values (What We Stand For)</td><td style={S.td0}>[Example: Speed, Transparency, Customer Obsession, Simplicity]</td></tr>
      </tbody></table>
    </div>
  );

  const renderThemes = () => (
    <div ref={themesRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner("#0EA5E9")}>ANNUAL THEMES FOR [YEAR]</td></tr></tbody></table>
      <CopyButton targetRef={themesRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>Themes are your big bets for the year. You should have 2&ndash;4 max. They guide every quarterly OKR you set. If work doesn&apos;t support a theme, question why you&apos;re doing it.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "5%", textAlign: "center" as const }}>#</th>
          <th style={{ ...S.thPrimary, width: "20%" }}>Theme</th>
          <th style={S.thPrimary}>What This Means (Plain English)</th>
          <th style={{ ...S.thPrimary, width: "12%" }}>Executive Sponsor</th>
        </tr></thead>
        <tbody>
          {[
            { theme: "[Customer Experience]", desc: "Make our product so easy and delightful that customers become our best salespeople. Reduce friction everywhere.", sponsor: "[CEO]" },
            { theme: "[Revenue Growth]", desc: "Grow revenue by expanding into enterprise accounts and increasing average deal size. Not just more customers — bigger customers.", sponsor: "[CRO]" },
            { theme: "[Operational Excellence]", desc: "Streamline internal processes, reduce waste, and build systems that scale. Less firefighting, more building.", sponsor: "[COO]" },
            { theme: "[Team & Culture]", desc: "Attract top talent, invest in development, and build a culture where great people want to stay.", sponsor: "[CHRO]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 800, fontSize: "14px", color: accent }}>{i + 1}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 700 }}>{r.theme}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.desc}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", color: accent, fontWeight: 600 }}>{r.sponsor}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderFocus = () => (
    <div ref={focusRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner("#059669")}>KEY FOCUS AREAS &amp; SUCCESS MEASURES</td></tr></tbody></table>
      <CopyButton targetRef={focusRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>For each theme, what does success look like by end of year? These aren&apos;t OKRs yet — they&apos;re directional targets that OKRs will be built from each quarter.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "18%" }}>Theme</th>
          <th style={S.thPrimary}>End-of-Year Success Looks Like...</th>
          <th style={{ ...S.thPrimary, width: "15%", textAlign: "center" as const }}>Key Metric</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Current</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Target</th>
        </tr></thead>
        <tbody>
          {[
            { theme: "Customer Experience", success: "NPS above 60, support wait <4hrs, churn <5%", metric: "NPS", current: "42", target: "60+" },
            { theme: "Revenue Growth", success: "ARR from $8M to $14M, 10 enterprise deals closed", metric: "ARR", current: "$8M", target: "$14M" },
            { theme: "Operational Excellence", success: "Zero recurring fire drills, all SOPs documented", metric: "Incident Count", current: "12/mo", target: "<3/mo" },
            { theme: "Team & Culture", success: "All critical roles filled, engagement >80%", metric: "Engagement", current: "68%", target: "80%+" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 700, color: accent }}>{r.theme}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.success}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "10px", fontWeight: 600 }}>{r.metric}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "10px" }}>{r.current}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "10px", fontWeight: 700, color: "#059669" }}>{r.target}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderConstraintsAndAnti = () => (
    <div ref={constraintsRef} style={{ marginBottom: "12px" }}>
      <CopyButton targetRef={constraintsRef} label="Copy Section" />
      <table style={LT}><tbody><tr>
        <td style={{ ...LC, width: "50%", paddingRight: "4px" }}>
          <table style={S.tbl}>
            <thead><tr><td style={{ backgroundColor: "#FEF3C7", color: "#D97706", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #D97706" }}>⛓️ CONSTRAINTS &amp; REALITIES</td></tr></thead>
            <tbody>
              {[
                { constraint: "Budget: $X total", impact: "Prioritize high-ROI. No unplanned spending without trade-offs." },
                { constraint: "Headcount: +X hires max", impact: "Can’t staff everything. Be selective about new projects." },
                { constraint: "Major product launch Q3", impact: "Q2 = intense prep. Other work lighter in Q2–Q3." },
                { constraint: "Competitor launching similar product", impact: "Speed matters. CX differentiation is our moat." },
              ].map((r, i) => {
                const bg = i % 2 === 1 ? C.rowAlt : C.white;
                return (
                  <tr key={i}>
                    <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", padding: "5px 10px" }}>
                      <strong style={{ color: "#D97706" }}>{r.constraint}</strong><br />
                      <span style={{ fontSize: "9px", color: C.textMuted }}>{r.impact}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </td>
        <td style={{ ...LC, width: "50%", paddingLeft: "4px" }}>
          <table style={S.tbl}>
            <thead><tr><td style={{ backgroundColor: "#FEE2E2", color: "#DC2626", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #DC2626" }}>🚫 ANTI-GOALS</td></tr></thead>
            <tbody>
              {[
                { anti: "Expand internationally", why: "Nail domestic first. International adds unaffordable complexity." },
                { anti: "Build a mobile app", why: "Web-first. Mobile is 2027 once web product is mature." },
                { anti: "Pursue <$10K ACV customers", why: "Small deals drain resources. Focus on enterprise growth." },
                { anti: "Rewrite backend from scratch", why: "Incremental > full rewrite. 6+ months of no new features." },
              ].map((r, i) => {
                const bg = i % 2 === 1 ? C.rowAlt : C.white;
                return (
                  <tr key={i}>
                    <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", padding: "5px 10px" }}>
                      <strong style={{ color: "#DC2626" }}>{r.anti}</strong><br />
                      <span style={{ fontSize: "9px", color: C.textMuted }}>{r.why}</span>
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
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-violet-50 border border-violet-100 text-violet-700 text-xs font-semibold"><Flag size={11} />Strategy</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/okr-hub" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-violet-600 transition-colors"><ArrowLeft size={14} />Back to OKR Hub</Link>
          <CopyAllButton targetRef={fullRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-violet-100 flex items-center justify-center"><Flag size={20} className="text-violet-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">Annual Direction Snapshot</h2><p className="text-xs font-medium text-violet-600">One Page &mdash; The Year at a Glance</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Mission, themes, focus areas, and constraints. This sets the context for every quarterly OKR your team will set.</p>
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
          {layout === "full" && <>{renderTitleBanner()}{renderMission()}{renderThemes()}{renderFocus()}{renderConstraintsAndAnti()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderMission()}{renderThemes()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullRef} /></div>
      </div>
    </div>
  );
}

export default function AnnualDirectionSnapshotPage() { return <ThemeProvider><AnnualDirectionContent /></ThemeProvider>; }
