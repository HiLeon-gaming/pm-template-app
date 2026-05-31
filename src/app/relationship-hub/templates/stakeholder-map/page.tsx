"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, Handshake, LayoutDashboard, AlignJustify, Map } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Map", desc: "Quadrant map + strategy + tips", icon: LayoutDashboard },
  { id: "compact", label: "Quick Map", desc: "Quadrant map only", icon: AlignJustify },
];

function MapContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const stratRef = useRef<HTMLDivElement>(null);
  const tipsRef = useRef<HTMLDivElement>(null);

  const accent = "#6366F1";
  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>STAKEHOLDER MAP (INFLUENCE vs INTEREST)</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; Relationship &amp; Stakeholder Management Hub &nbsp;|&nbsp; Updated [QUARTER / YEAR]</td></tr>
    </tbody></table>
  );

  const renderMap = () => (
    <div ref={mapRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accent)}>INFLUENCE vs INTEREST QUADRANT MAP</td></tr></tbody></table>
      <CopyButton targetRef={mapRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>Place every key stakeholder in one of four quadrants based on their influence over your work and their interest in it. This determines your engagement strategy for each person. Update quarterly or when the landscape shifts.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "20%", textAlign: "center" as const }}>Quadrant</th>
          <th style={{ ...S.thPrimary, width: "15%" }}>Strategy</th>
          <th style={S.thPrimary}>Stakeholders in This Quadrant</th>
        </tr></thead>
        <tbody>
          {[
            { quad: "HIGH Influence\nHIGH Interest", bg: "#FEE2E2", fg: "#DC2626", strat: "Manage Closely", names: "Maria Lopez (Sponsor) \u2014 Weekly 1:1s, proactive updates, early warning on risks.\nSteerCo Members \u2014 Monthly formal updates, quarterly deep dives." },
            { quad: "HIGH Influence\nLOW Interest", bg: "#FEF3C7", fg: "#D97706", strat: "Keep Satisfied", names: "CFO / Finance VP \u2014 Monthly budget summaries. Don\u2019t overload, but never surprise.\nHR VP \u2014 Periodic updates on headcount needs. Keep informed on resource asks." },
            { quad: "LOW Influence\nHIGH Interest", bg: "#DBEAFE", fg: "#1D4ED8", strat: "Keep Informed", names: "Sarah Chen (Marketing) \u2014 Regular updates on features and timelines.\nEnd Users / Champions \u2014 Per-milestone comms. They care but can\u2019t approve." },
            { quad: "LOW Influence\nLOW Interest", bg: "#F3F4F6", fg: "#6B7280", strat: "Monitor", names: "Vendor contacts \u2014 As-needed only.\nPeripheral teams \u2014 Minimal comms unless something changes." },
          ].map((r, i) => (
            <tr key={i}>
              <td style={{ ...S.td0, backgroundColor: r.bg, fontSize: "10px", fontWeight: 800, color: r.fg, textAlign: "center" as const, whiteSpace: "pre-line" as const, lineHeight: "1.5" }}>{r.quad}</td>
              <td style={{ ...S.td0, backgroundColor: r.bg, fontSize: "10px", fontWeight: 700, color: r.fg }}>{r.strat}</td>
              <td style={{ ...S.td0, backgroundColor: r.bg, fontSize: "9px", whiteSpace: "pre-line" as const, lineHeight: "1.6" }}>{r.names}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <table style={{ ...S.tbl, marginTop: "6px" }}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "15%" }}>Stakeholder</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Influence</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Interest</th>
          <th style={{ ...S.thPrimary, width: "15%", textAlign: "center" as const }}>Quadrant</th>
          <th style={S.thPrimary}>Engagement Approach</th>
        </tr></thead>
        <tbody>
          {[
            { name: "Maria Lopez", inf: "High", int: "High", quad: "Manage Closely", approach: "Weekly 1:1. Pre-brief before SteerCo. First to know about risks." },
            { name: "David Park", inf: "High", int: "Medium", quad: "Keep Satisfied", approach: "Monthly budget updates. Proactive, not reactive. No surprises." },
            { name: "James Wu", inf: "Medium", int: "High", quad: "Keep Informed", approach: "Working sessions on technical items. Regular sprint visibility." },
            { name: "Sarah Chen", inf: "Low", int: "High", quad: "Keep Informed", approach: "Per-milestone updates. Include in relevant demos and showcases." },
            { name: "[Stakeholder]", inf: "[H/M/L]", int: "[H/M/L]", quad: "[Quadrant]", approach: "[Your engagement approach]" },
            { name: "[Stakeholder]", inf: "[H/M/L]", int: "[H/M/L]", quad: "[Quadrant]", approach: "[Your engagement approach]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 700 }}>{r.name}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", textAlign: "center" as const, fontWeight: 700 }}>{r.inf}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", textAlign: "center" as const, fontWeight: 700 }}>{r.int}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", textAlign: "center" as const, fontWeight: 600, color: accent }}>{r.quad}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", color: C.textMuted }}>{r.approach}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderStrategy = () => (
    <div ref={stratRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner("#D97706")}>MOVEMENT &amp; CHANGES SINCE LAST REVIEW</td></tr></tbody></table>
      <CopyButton targetRef={stratRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>Has anyone moved quadrants since your last review? New stakeholders emerged? Someone&apos;s influence or interest changed? Document shifts here.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "15%" }}>Stakeholder</th>
          <th style={{ ...S.thPrimary, width: "15%" }}>Previous Quadrant</th>
          <th style={{ ...S.thPrimary, width: "15%" }}>Current Quadrant</th>
          <th style={S.thPrimary}>What Changed &amp; Why</th>
          <th style={{ ...S.thPrimary, width: "20%" }}>Adjusted Strategy</th>
        </tr></thead>
        <tbody>
          {[
            { name: "David Park", prev: "Monitor", curr: "Keep Satisfied", why: "Got promoted. Now has budget authority over our initiative.", adj: "Increased from quarterly to monthly touchpoints." },
            { name: "[Stakeholder]", prev: "[Quadrant]", curr: "[Quadrant]", why: "[What changed]", adj: "[How you\u2019re adapting]" },
            { name: "[New stakeholder]", prev: "N/A (new)", curr: "[Quadrant]", why: "[Why they\u2019re now relevant]", adj: "[Initial engagement plan]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 700 }}>{r.name}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", color: C.textMuted }}>{r.prev}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", fontWeight: 600, color: accent }}>{r.curr}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px" }}>{r.why}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", color: C.textMuted }}>{r.adj}</td>
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
            <thead><tr><td style={{ backgroundColor: "#EDE9FE", color: "#6366F1", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #6366F1" }}>MAPPING BEST PRACTICES</td></tr></thead>
            <tbody>
              {[
                { color: "#6366F1", tip: "Review quarterly, not just once.", detail: "People get promoted, leave, change priorities. Your map must evolve." },
                { color: "#059669", tip: "Don\u2019t confuse seniority with influence.", detail: "A mid-level engineer who controls a critical dependency can have more influence than a VP." },
                { color: "#0EA5E9", tip: "Watch for hidden stakeholders.", detail: "Executive assistants, informal advisors, and \u201Cculture carriers\u201D often have outsized influence." },
                { color: "#D97706", tip: "Interest can change overnight.", detail: "A re-org, a new project, or a crisis can suddenly make someone very interested in your work." },
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
            <thead><tr><td style={{ backgroundColor: "#FEF3C7", color: "#D97706", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #D97706" }}>QUADRANT STRATEGIES</td></tr></thead>
            <tbody>
              {[
                { color: "#DC2626", tip: "Manage Closely: Your inner circle.", detail: "High touch. Frequent updates. Pre-brief on risks. These people make or break your work." },
                { color: "#D97706", tip: "Keep Satisfied: Powerful but distant.", detail: "Don\u2019t bother them with details. Give them what they need and stay out of trouble." },
                { color: "#0EA5E9", tip: "Keep Informed: Engaged supporters.", detail: "They care about your work. Keep them updated so they advocate for you." },
                { color: "#6B7280", tip: "Monitor: Low priority.", detail: "Minimal effort. Check quarterly for changes. Don\u2019t ignore \u2014 just don\u2019t over-invest." },
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
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-violet-50 border border-violet-100 text-violet-700 text-xs font-semibold"><Map size={11} />Quarterly</span>
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
            <div><h2 className="text-2xl font-extrabold text-slate-900">Stakeholder Map (Influence vs Interest)</h2><p className="text-xs font-medium text-violet-600">Strategic &bull; Quarterly Update &bull; Know Your Landscape</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Your strategic view of the stakeholder landscape. Map every key person by their influence over your work and their interest in it. This determines how much time and energy you invest in each relationship. Update quarterly or when the landscape shifts.</p>
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
          {layout === "full" && <>{renderTitleBanner()}{renderMap()}{renderStrategy()}{renderTips()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderMap()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullRef} /></div>
      </div>
    </div>
  );
}

export default function StakeholderMapPage() { return <ThemeProvider><MapContent /></ThemeProvider>; }
