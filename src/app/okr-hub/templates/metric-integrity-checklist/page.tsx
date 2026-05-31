"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, ShieldCheck, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Checklist", desc: "Integrity tests + gaming check + action plan", icon: LayoutDashboard },
  { id: "compact", label: "Quick Check", desc: "Integrity table only", icon: AlignJustify },
];

function MetricIntegrityContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullRef = useRef<HTMLDivElement>(null);
  const checkRef = useRef<HTMLDivElement>(null);
  const gameRef = useRef<HTMLDivElement>(null);
  const actionRef = useRef<HTMLDivElement>(null);

  const accent = "#E11D48";

  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>METRIC INTEGRITY CHECKLIST</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; OKR &amp; Operating Rhythm Hub &nbsp;|&nbsp; Is This Metric Trustworthy?</td></tr>
    </tbody></table>
  );

  const renderCheck = () => (
    <div ref={checkRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accent)}>METRIC INTEGRITY ASSESSMENT</td></tr></tbody></table>
      <CopyButton targetRef={checkRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>Run this checklist for every KPI at least once per quarter. A metric you can&apos;t trust is worse than no metric at all.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={S.thPrimary}>Metric Name</th>
          <th style={{ ...S.thPrimary, width: "6%", textAlign: "center" as const }}>Reliable?</th>
          <th style={{ ...S.thPrimary, width: "6%", textAlign: "center" as const }}>Timely?</th>
          <th style={{ ...S.thPrimary, width: "6%", textAlign: "center" as const }}>Actionable?</th>
          <th style={{ ...S.thPrimary, width: "6%", textAlign: "center" as const }}>Understood?</th>
          <th style={{ ...S.thPrimary, width: "6%", textAlign: "center" as const }}>Gaming Risk?</th>
          <th style={{ ...S.thPrimary, width: "6%", textAlign: "center" as const }}>Score</th>
          <th style={{ ...S.thPrimary, width: "6%", textAlign: "center" as const }}>Health</th>
          <th style={{ ...S.thPrimary, width: "15%" }}>Notes / Issues</th>
        </tr></thead>
        <tbody>
          {[
            { name: "Support Avg Wait Time", rel: "Y", tim: "Y", act: "Y", und: "Y", game: "Low", score: "5/5", h: "Green", hBg: C.badgeGreenBg, hFg: C.badgeGreenFg, notes: "Automated from Zendesk. High trust." },
            { name: "CSAT Score", rel: "Y", tim: "Y", act: "Y", und: "Y", game: "Med", score: "4/5", h: "Amber", hBg: C.badgeAmberBg, hFg: C.badgeAmberFg, notes: "Low response rate (22%). May not be representative." },
            { name: "NPS", rel: "N", tim: "N", act: "Y", und: "Y", game: "Low", score: "3/5", h: "Amber", hBg: C.badgeAmberBg, hFg: C.badgeAmberFg, notes: "Survey goes out late. Data 2 weeks old by review time." },
            { name: "MQLs", rel: "Y", tim: "Y", act: "Y", und: "N", game: "High", score: "3/5", h: "Amber", hBg: C.badgeAmberBg, hFg: C.badgeAmberFg, notes: "Scoring model not well understood. Marketing and Sales disagree on definition." },
            { name: "Enterprise Pipeline", rel: "Y", tim: "Y", act: "Y", und: "Y", game: "Med", score: "4/5", h: "Amber", hBg: C.badgeAmberBg, hFg: C.badgeAmberFg, notes: "Risk: reps may keep dead deals open to inflate pipeline." },
            { name: "Employee Engagement", rel: "N", tim: "N", act: "N", und: "Y", game: "Med", score: "2/5", h: "Red", hBg: C.badgeRedBg, hFg: C.badgeRedFg, notes: "Only run twice this quarter. Not frequent enough. Actions unclear." },
            { name: "[Your metric]", rel: "", tim: "", act: "", und: "", game: "", score: "", h: "", hBg: "transparent", hFg: C.textMuted, notes: "" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            const ynStyle = (v: string) => ({ fontWeight: 700 as const, color: v === "Y" ? "#059669" : v === "N" ? "#DC2626" : C.textMuted });
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 700 }}>{r.name}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "10px", ...ynStyle(r.rel) }}>{r.rel}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "10px", ...ynStyle(r.tim) }}>{r.tim}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "10px", ...ynStyle(r.act) }}>{r.act}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "10px", ...ynStyle(r.und) }}>{r.und}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "9px", fontWeight: 600 }}>{r.game}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "11px", fontWeight: 800 }}>{r.score}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}>{r.h && <span style={S.badge(r.hBg, r.hFg)}>{r.h}</span>}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "8px" }}>{r.notes}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderGameAndAction = () => (
    <div ref={gameRef} style={{ marginBottom: "12px" }}>
      <CopyButton targetRef={gameRef} label="Copy Section" />
      <table style={LT}><tbody><tr>
        <td style={{ ...LC, width: "50%", paddingRight: "4px" }}>
          <table style={S.tbl}>
            <thead><tr><td style={{ backgroundColor: "#FEF3C7", color: "#D97706", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #D97706" }}>⚠️ GAMING WARNING SIGNS</td></tr></thead>
            <tbody>
              {[
                { sign: "Metric improves right before review day", fix: "Check daily data, not just snapshots." },
                { sign: "Definition keeps changing mid-quarter", fix: "Lock definitions at quarter start. COO approval for changes." },
                { sign: "Two teams report different numbers", fix: "Single source of truth. One system, one owner, one number." },
                { sign: "Metric up but outcomes don't improve", fix: "May be measuring activity, not impact. Re-evaluate." },
                { sign: "People stop caring about a metric", fix: "If nobody acts on it, remove it. Dead metrics waste attention." },
              ].map((r, i) => {
                const bg = i % 2 === 1 ? C.rowAlt : C.white;
                return (
                  <tr key={i}>
                    <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", padding: "5px 10px" }}>
                      <strong style={{ color: "#DC2626" }}>{r.sign}</strong><br />
                      <span style={{ fontSize: "9px", color: C.textMuted }}>{r.fix}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </td>
        <td style={{ ...LC, width: "50%", paddingLeft: "4px" }}>
          <table style={S.tbl}>
            <thead><tr><td style={{ backgroundColor: "#D1FAE5", color: "#059669", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #059669" }}>✅ INTEGRITY ACTION PLAN</td></tr></thead>
            <tbody>
              {[
                { metric: "CSAT — low response", action: "Add in-app survey trigger. Target 50%+.", owner: "[Product]", due: "Wk 5" },
                { metric: "NPS — data too old", action: "Switch to bi-weekly NPS survey.", owner: "[CX Lead]", due: "Wk 4" },
                { metric: "MQLs — unclear def", action: "Sales + Mktg alignment. Lock definition.", owner: "[RevOps]", due: "Fri" },
                { metric: "Engagement — infrequent", action: "Move to monthly pulse survey.", owner: "[PeopleOps]", due: "Wk 4" },
              ].map((r, i) => {
                const bg = i % 2 === 1 ? C.rowAlt : C.white;
                return (
                  <tr key={i}>
                    <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", padding: "5px 10px" }}>
                      <strong>{r.metric}</strong><br />
                      <span style={{ fontSize: "9px", color: "#059669", fontWeight: 600 }}>{r.action}</span><br />
                      <span style={{ fontSize: "9px", color: C.textMuted }}>{r.owner} \u2022 {r.due}</span>
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-rose-50/30">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-rose-600 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-50 border border-rose-100 text-rose-700 text-xs font-semibold"><ShieldCheck size={11} />Integrity</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/okr-hub" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-rose-600 transition-colors"><ArrowLeft size={14} />Back to OKR Hub</Link>
          <CopyAllButton targetRef={fullRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-rose-100 flex items-center justify-center"><ShieldCheck size={20} className="text-rose-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">Metric Integrity Checklist</h2><p className="text-xs font-medium text-rose-600">Is This Metric Reliable, Timely, and Actionable?</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Audit every KPI for reliability, timeliness, actionability, and gaming risk. A bad metric is worse than none.</p>
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
          {layout === "full" && <>{renderTitleBanner()}{renderCheck()}{renderGameAndAction()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderCheck()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullRef} /></div>
      </div>
    </div>
  );
}

export default function MetricIntegrityChecklistPage() { return <ThemeProvider><MetricIntegrityContent /></ThemeProvider>; }
