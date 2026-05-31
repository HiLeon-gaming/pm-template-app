"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, FileCheck, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Log", desc: "Decisions + context", icon: LayoutDashboard },
  { id: "compact", label: "Quick Log", desc: "Decisions only", icon: AlignJustify },
];

function DecisionLogContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const logRef = useRef<HTMLDivElement>(null);
  const pendingRef = useRef<HTMLDivElement>(null);
  const principlesRef = useRef<HTMLDivElement>(null);

  const accent = "#F59E0B"; const accentDark = "#B45309";
  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>📝 DECISION LOG</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; Agile / Scrum Delivery Command Center &nbsp;|&nbsp; Roadmap &amp; Release Planning</td></tr>
    </tbody></table>
  );

  const renderHeader = () => (
    <div ref={headerRef} style={{ marginBottom: "12px" }}>
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "18%" }}>Product</td><td style={{ ...S.td0, width: "32%" }}>[Product Name]</td><td style={{ ...S.tdLabel, width: "18%" }}>Last Updated</td><td style={{ ...S.td0, width: "32%" }}>[MM/DD/YYYY]</td></tr>
        <tr><td style={S.tdLabelAlt}>Maintained By</td><td style={S.tdAlt}>[SM / PO]</td><td style={S.tdLabelAlt}>Total Decisions</td><td style={S.tdAlt}>[##]</td></tr>
      </tbody></table>
      <CopyButton targetRef={headerRef} label="Copy Section" />
    </div>
  );

  const renderLog = () => (
    <div ref={logRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accent)}>✅ DECISIONS MADE</td></tr></tbody></table>
      <CopyButton targetRef={logRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "4px" }}>Record every significant decision so nobody asks &ldquo;why did we do that?&rdquo; later.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "5%", textAlign: "center" as const }}>#</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Date</th>
          <th style={S.thPrimary}>Decision</th>
          <th style={{ ...S.thPrimary, width: "22%" }}>Context / Rationale</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Decided By</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Category</th>
        </tr></thead>
        <tbody>
          {[
            { date: "[MM/DD]", dec: "[Use PayCorp as primary payment gateway vendor]", ctx: "[Best API docs, competitive rates, existing relationship with their team]", by: "[PO]", cat: "Vendor", cBg: C.badgeRedBg, cFg: C.badgeRedFg },
            { date: "[MM/DD]", dec: "[2-week sprint cadence (not 1-week)]", ctx: "[Team too small for weekly ceremonies overhead; 2-week gives better flow and focus]", by: "[SM + Team]", cat: "Process", cBg: C.badgeBlueBg, cFg: C.badgeBlueFg },
            { date: "[MM/DD]", dec: "[Defer native mobile app to Phase 2]", ctx: "[Responsive web covers 90% of mobile use cases; faster to market; validates demand first]", by: "[PO + Sponsor]", cat: "Scope", cBg: C.badgeAmberBg, cFg: C.badgeAmberFg },
            { date: "[MM/DD]", dec: "[Use feature flags for checkout A/B test]", ctx: "[Allows gradual rollout and quick rollback; LaunchDarkly already in our stack]", by: "[Tech Lead]", cat: "Technical", cBg: C.badgeGreenBg, cFg: C.badgeGreenFg },
            { date: "[MM/DD]", dec: "[Move sprint demo to Friday 10 AM (was Thursday)]", ctx: "[Gives team full Thursday for QA and polish; stakeholders prefer Friday morning slot]", by: "[SM]", cat: "Process", cBg: C.badgeBlueBg, cFg: C.badgeBlueFg },
            { date: "[Add]", dec: "", ctx: "", by: "", cat: "—", cBg: C.badgeGrayBg, cFg: C.badgeGrayFg },
            { date: "[Add]", dec: "", ctx: "", by: "", cat: "—", cBg: C.badgeGrayBg, cFg: C.badgeGrayFg },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, color: C.textMuted }}>{i + 1}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "11px", fontWeight: 600, color: accent }}>{r.date}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px", fontWeight: 600 }}>{r.dec}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.ctx}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "11px" }}>{r.by}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.cBg, r.cFg)}>{r.cat}</span></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderPending = () => (
    <div ref={pendingRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accentDark)}>⏳ PENDING DECISIONS</td></tr></tbody></table>
      <CopyButton targetRef={pendingRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thSecondary, width: "5%", textAlign: "center" as const }}>#</th>
          <th style={S.thSecondary}>Decision Needed</th>
          <th style={{ ...S.thSecondary, width: "18%" }}>Options Considered</th>
          <th style={{ ...S.thSecondary, width: "10%", textAlign: "center" as const }}>Urgency</th>
          <th style={{ ...S.thSecondary, width: "10%", textAlign: "center" as const }}>Decide By</th>
          <th style={{ ...S.thSecondary, width: "10%", textAlign: "center" as const }}>Owner</th>
        </tr></thead>
        <tbody>
          {[
            { dec: "[Which analytics platform for checkout events?]", opts: "[Mixpanel vs Amplitude vs GA4]", urg: "High", uBg: C.badgeRedBg, uFg: C.badgeRedFg, by: "[Sprint 8]", own: "[Tech Lead]" },
            { dec: "[Rollback strategy if payment gateway fails at launch?]", opts: "[Feature flag vs full rollback vs manual override]", urg: "Med", uBg: C.badgeAmberBg, uFg: C.badgeAmberFg, by: "[Sprint 9]", own: "[SM + DevOps]" },
            { dec: "[Add pending decision]", opts: "", urg: "—", uBg: C.badgeGrayBg, uFg: C.badgeGrayFg, by: "", own: "" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700 }}>{i + 1}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px", fontWeight: 600 }}>{r.dec}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.opts}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.uBg, r.uFg)}>{r.urg}</span></td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "11px" }}>{r.by}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "11px" }}>{r.own}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderPrinciples = () => (
    <div ref={principlesRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accent)}>💡 DECISION-MAKING PRINCIPLES</td></tr></tbody></table>
      <CopyButton targetRef={principlesRef} label="Copy Section" />
      <table style={LT}><tbody><tr>
        <td style={{ ...LC, width: "50%", paddingRight: "5px" }}>
          <table style={S.tbl}>
            <thead><tr><td style={{ backgroundColor: "#059669", color: C.white, padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}` }}>✅ OUR RULES</td></tr></thead>
            <tbody>
              {["Decide fast, iterate faster — reversible decisions don’t need consensus", "PO has final say on scope and priority", "Tech Lead has final say on architecture and tooling", "SM has final say on process and ceremonies", "Document the WHY, not just the WHAT"].map((t, i) => (
                <tr key={i}><td style={{ ...S.td0, backgroundColor: i % 2 === 0 ? C.white : C.rowAlt, fontSize: "11px", padding: "5px 12px" }}>• {t}</td></tr>
              ))}
            </tbody>
          </table>
        </td>
        <td style={{ ...LC, width: "50%", paddingLeft: "5px" }}>
          <table style={S.tbl}>
            <thead><tr><td style={{ backgroundColor: "#DC2626", color: C.white, padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}` }}>⚠️ ANTI-PATTERNS TO AVOID</td></tr></thead>
            <tbody>
              {["Decision by committee — slows everything", "Reopening settled decisions without new information", "Not recording decisions — leads to confusion later", "Making irreversible decisions without stakeholder input", "Waiting for perfect information — it never comes"].map((t, i) => (
                <tr key={i}><td style={{ ...S.td0, backgroundColor: i % 2 === 0 ? C.white : C.rowAlt, fontSize: "11px", padding: "5px 12px" }}>• {t}</td></tr>
              ))}
            </tbody>
          </table>
        </td>
      </tr></tbody></table>
    </div>
  );

  const renderFooter = () => (
    <table style={{ ...S.tbl, marginTop: "8px" }}><tbody><tr>
      <td style={{ backgroundColor: C.primary, color: C.footerText, padding: "8px 20px", fontSize: "10px", fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.06em" }}>
        ExecNoteShop &nbsp;&bull;&nbsp; Agile / Scrum Delivery Command Center &nbsp;&bull;&nbsp; &copy; 2026 All Rights Reserved
      </td>
    </tr></tbody></table>
  );

  const renderFullLayout = () => (
    <>{renderTitleBanner()}{renderHeader()}{renderLog()}{renderPending()}{renderPrinciples()}{renderFooter()}</>
  );
  const renderCompactLayout = () => (
    <>{renderTitleBanner()}{renderHeader()}{renderLog()}{renderFooter()}</>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-amber-50/30">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-amber-600 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-100 text-amber-700 text-xs font-semibold"><FileCheck size={11} />Decisions</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/agile-command-center" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-amber-600 transition-colors"><ArrowLeft size={14} />Back to Agile Command Center</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center"><FileCheck size={20} className="text-amber-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">Decision Log</h2><p className="text-xs font-medium text-amber-600">Record Decisions, Context, Owner &amp; Date</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Saves you later when someone asks &ldquo;why did we&hellip;?&rdquo; — tracks made and pending decisions with rationale and ownership.</p>
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
        <div ref={fullPageRef} style={{ fontFamily: S.font }}>
          {layout === "full" && renderFullLayout()}
          {layout === "compact" && renderCompactLayout()}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function DecisionLogPage() { return <ThemeProvider><DecisionLogContent /></ThemeProvider>; }
