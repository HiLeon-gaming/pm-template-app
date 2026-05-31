"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, Handshake, LayoutDashboard, AlignJustify, Repeat2 } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Map", desc: "Value exchange + gaps + tips", icon: LayoutDashboard },
  { id: "compact", label: "Quick Map", desc: "Value exchange only", icon: AlignJustify },
];

function MutualValueContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const gapRef = useRef<HTMLDivElement>(null);
  const tipsRef = useRef<HTMLDivElement>(null);

  const accent = "#0EA5E9";
  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>MUTUAL VALUE MAP</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; Relationship &amp; Stakeholder Management Hub &nbsp;|&nbsp; Increases Alignment</td></tr>
    </tbody></table>
  );

  const renderMap = () => (
    <div ref={mapRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accent)}>STAKEHOLDER: [NAME] &mdash; VALUE EXCHANGE</td></tr></tbody></table>
      <CopyButton targetRef={mapRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>Map how your work helps their goals and what they need from you. The strongest relationships are built on clear, mutual value. When both sides can articulate what the other brings, the relationship becomes resilient.</p>
      <table style={LT}><tbody><tr>
        <td style={{ ...LC, width: "50%", paddingRight: "4px" }}>
          <table style={S.tbl}>
            <thead><tr><td style={{ backgroundColor: "#D1FAE5", color: "#059669", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #059669" }}>HOW YOUR WORK HELPS THEIR GOALS</td></tr></thead>
            <tbody>
              {[
                { their: "Their Goal: Reduce operational costs by 15%", your: "Your project automates 3 manual processes, saving $200K/year." },
                { their: "Their Goal: Improve customer satisfaction scores", your: "New feature addresses top 5 customer complaints directly." },
                { their: "Their Goal: Hit Q2 revenue targets", your: "Faster delivery timeline means earlier market launch = more revenue days." },
                { their: "Their Goal: Build a high-performing team", your: "Your cross-functional model gives their team growth exposure." },
                { their: "[Their Goal]", your: "[How you help]" },
              ].map((r, i) => {
                const bg = i % 2 === 1 ? C.rowAlt : C.white;
                return (
                  <tr key={i}><td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", padding: "5px 10px" }}>
                    <strong style={{ color: "#059669" }}>{r.their}</strong><br />
                    <span style={{ fontSize: "9px", color: C.textMuted }}>{r.your}</span>
                  </td></tr>
                );
              })}
            </tbody>
          </table>
        </td>
        <td style={{ ...LC, width: "50%", paddingLeft: "4px" }}>
          <table style={S.tbl}>
            <thead><tr><td style={{ backgroundColor: "#EDE9FE", color: "#8B5CF6", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #8B5CF6" }}>WHAT THEY NEED FROM YOU</td></tr></thead>
            <tbody>
              {[
                { need: "Regular progress updates with risk highlights", freq: "Weekly", why: "They need to brief their boss. Give them the material." },
                { need: "Data-driven ROI analysis for board presentations", freq: "Monthly", why: "Hard numbers are their currency. Deliver them formatted." },
                { need: "Early warning on issues before they become crises", freq: "As needed", why: "Being surprised makes them look bad. Never let that happen." },
                { need: "Clear recommendations, not just options", freq: "Every decision", why: "They want your expertise, not a menu. Show conviction." },
                { need: "[What they need]", freq: "[Frequency]", why: "" },
              ].map((r, i) => {
                const bg = i % 2 === 1 ? C.rowAlt : C.white;
                return (
                  <tr key={i}><td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", padding: "5px 10px" }}>
                    <strong style={{ color: "#8B5CF6" }}>{r.need}</strong> <span style={{ fontSize: "9px", color: accent }}>({r.freq})</span>
                    {r.why && <><br /><span style={{ fontSize: "9px", color: C.textMuted }}>{r.why}</span></>}
                  </td></tr>
                );
              })}
            </tbody>
          </table>
        </td>
      </tr></tbody></table>
    </div>
  );

  const renderGaps = () => (
    <div ref={gapRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner("#EA580C")}>VALUE GAPS &amp; OPPORTUNITIES</td></tr></tbody></table>
      <CopyButton targetRef={gapRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>Where are you under-delivering? What unmet needs could you fill to become indispensable? Each gap closed is a relationship deposit.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={S.thPrimary}>Gap or Unmet Need</th>
          <th style={S.thPrimary}>How You Could Address It</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Priority</th>
          <th style={{ ...S.thPrimary, width: "15%" }}>By When</th>
        </tr></thead>
        <tbody>
          {[
            { gap: "They want visibility into vendor performance but don\u2019t have it", how: "Include vendor metrics in your monthly report. Takes 30 min to compile.", pri: "High", by: "Next report cycle" },
            { gap: "They need help preparing for board meetings", how: "Offer to draft the project section of their board deck. Shows partnership.", pri: "High", by: "Before next board" },
            { gap: "They want a single-page project health summary", how: "Create a 1-page dashboard they can forward to their leadership.", pri: "Medium", by: "Within 2 weeks" },
            { gap: "They\u2019re not getting enough recognition for their support", how: "Publicly credit them in your next all-hands or steering committee.", pri: "Medium", by: "This week" },
            { gap: "[Enter gap]", how: "[How to fill it]", pri: "[H/M/L]", by: "[Timeline]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            const priColor = r.pri === "High" ? { bg: C.badgeRedBg, fg: C.badgeRedFg } : r.pri === "Medium" ? { bg: C.badgeAmberBg, fg: C.badgeAmberFg } : { bg: C.badgeGrayBg, fg: C.badgeGrayFg };
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 600 }}>{r.gap}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", color: C.textMuted }}>{r.how}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(priColor.bg, priColor.fg)}>{r.pri}</span></td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", color: C.textMuted }}>{r.by}</td>
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
            <thead><tr><td style={{ backgroundColor: "#DBEAFE", color: "#0EA5E9", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #0EA5E9" }}>VALUE MAPPING PRINCIPLES</td></tr></thead>
            <tbody>
              {[
                { color: "#0EA5E9", tip: "Always lead with THEIR value, not yours.", detail: "Frame everything in terms of what it does for them. \u201CThis saves you 3 hours/week\u201D beats \u201CWe built a new feature.\u201D" },
                { color: "#059669", tip: "Make value tangible and measurable.", detail: "\u201CWe improved quality\u201D is vague. \u201CWe reduced defects by 40%, saving $50K in rework\u201D is compelling." },
                { color: "#8B5CF6", tip: "Articulate value they didn\u2019t ask for.", detail: "Proactively solving a problem they haven\u2019t mentioned yet makes you invaluable." },
                { color: "#D97706", tip: "Update this map quarterly.", detail: "Their goals shift. Your value proposition needs to shift with them." },
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
            <thead><tr><td style={{ backgroundColor: "#FEF3C7", color: "#D97706", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #D97706" }}>VALUE EXCHANGE RED FLAGS</td></tr></thead>
            <tbody>
              {[
                { color: "#DC2626", tip: "One-sided value.", detail: "If you\u2019re always asking and never giving, the relationship becomes transactional and fragile." },
                { color: "#EA580C", tip: "Assumed value vs. perceived value.", detail: "What you THINK you\u2019re delivering may not be what THEY value. Ask them directly." },
                { color: "#D97706", tip: "Value that\u2019s invisible.", detail: "If they can\u2019t see the value, it doesn\u2019t exist to them. Make your contributions visible." },
                { color: "#6366F1", tip: "Outdated value propositions.", detail: "What made you valuable 6 months ago may not matter now. Their priorities change; your value pitch should too." },
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
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-sky-50 border border-sky-100 text-sky-700 text-xs font-semibold"><Repeat2 size={11} />Per-Stakeholder</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/relationship-hub" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-rose-600 transition-colors"><ArrowLeft size={14} />Back to Relationship Hub</Link>
          <CopyAllButton targetRef={fullRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-sky-100 flex items-center justify-center"><Handshake size={20} className="text-sky-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">Mutual Value Map</h2><p className="text-xs font-medium text-sky-600">Per Stakeholder &bull; What&apos;s in It for Them &amp; What&apos;s in It for You</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">The best stakeholder relationships are built on mutual value &mdash; both sides can clearly articulate what the other brings. This template maps the value exchange so you can strengthen it, identify gaps, and become indispensable.</p>
        </div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">View Mode</p>
          <div className="flex flex-wrap gap-2">
            {LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (
              <button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-sky-600 text-white border-sky-600 shadow-md shadow-sky-200" : "bg-white text-slate-600 border-slate-200 hover:border-sky-300 hover:text-sky-700"}`}>
                <Icon size={15} /><span>{l.label}</span><span className={`text-[10px] font-medium ${isActive ? "text-sky-200" : "text-slate-400"}`}>{l.desc}</span>
              </button>
            ); })}
          </div>
        </div>
        <div ref={fullRef} style={{ fontFamily: S.font }}>
          {layout === "full" && <>{renderTitleBanner()}{renderMap()}{renderGaps()}{renderTips()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderMap()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullRef} /></div>
      </div>
    </div>
  );
}

export default function MutualValueMapPage() { return <ThemeProvider><MutualValueContent /></ThemeProvider>; }
