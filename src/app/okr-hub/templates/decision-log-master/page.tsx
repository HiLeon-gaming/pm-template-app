"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, Scale, LayoutDashboard, AlignJustify, Zap } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Log", desc: "Decisions + context + options + impact + tips", icon: LayoutDashboard },
  { id: "compact", label: "Quick Log", desc: "Decision table only", icon: AlignJustify },
];

function DecisionLogContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullRef = useRef<HTMLDivElement>(null);
  const logRef = useRef<HTMLDivElement>(null);
  const pendRef = useRef<HTMLDivElement>(null);
  const tipsRef = useRef<HTMLDivElement>(null);

  const accent = "#6366F1";

  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>DECISION LOG MASTER</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; OKR &amp; Operating Rhythm Hub &nbsp;|&nbsp; &#11088; All-Star &nbsp;|&nbsp; Stops Repeated Debates</td></tr>
    </tbody></table>
  );

  const renderLog = () => (
    <div ref={logRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accent)}>DECISIONS MADE</td></tr></tbody></table>
      <CopyButton targetRef={logRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>Every major decision — with context, options considered, and impact. If it&apos;s not written down, it didn&apos;t happen. This log prevents &ldquo;I didn&apos;t know we decided that&rdquo; and stops the same debates from repeating.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "5%", textAlign: "center" as const }}>#</th>
          <th style={{ ...S.thPrimary, width: "7%", textAlign: "center" as const }}>Date</th>
          <th style={{ ...S.thPrimary, width: "18%" }}>Decision</th>
          <th style={{ ...S.thPrimary, width: "15%" }}>Context / Why</th>
          <th style={{ ...S.thPrimary, width: "15%" }}>Options Considered</th>
          <th style={{ ...S.thPrimary, width: "10%" }}>Decided By</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Impact</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Relates To</th>
        </tr></thead>
        <tbody>
          {[
            { date: "W1 Mon", dec: "Hire outsourced SDR team for enterprise outreach.", ctx: "Cold outreach failing. Pipeline too thin for 3-deal target.", opts: "A: Internal SDR hire ($80K) B: Agency ($15K/mo) C: No SDR", by: "[CEO + VP Sales]", impact: "High", iBg: C.badgeRedBg, iFg: C.badgeRedFg, rel: "KR 2.2" },
            { date: "W2 Tue", dec: "Shift $20K from events budget to LinkedIn ads.", ctx: "LinkedIn CPC 40% lower than expected. Events ROI unclear.", opts: "A: Full shift B: 50/50 split C: Keep current", by: "[CFO + CMO]", impact: "Med", iBg: C.badgeAmberBg, iFg: C.badgeAmberFg, rel: "KR 2.1" },
            { date: "W3 Mon", dec: "Reduce NPS target from 55 → 50.", ctx: "20-point jump unrealistic. 50 still ambitious and achievable.", opts: "A: Keep 55 B: Reduce to 50 C: Remove NPS as KR", by: "[CEO]", impact: "Med", iBg: C.badgeAmberBg, iFg: C.badgeAmberFg, rel: "KR 1.3" },
            { date: "W3 Mon", dec: "Descope Intercom migration from Q1.", ctx: "Eng capacity insufficient. Protecting other KR work.", opts: "A: Keep in scope B: Descope to Q2 C: Cancel", by: "[VP Eng + COO]", impact: "High", iBg: C.badgeRedBg, iFg: C.badgeRedFg, rel: "Capacity" },
            { date: "W4 Fri", dec: "Approve manager training program. $8K budget.", ctx: "Engagement stuck at 68%. Managers are the #1 lever.", opts: "A: Internal coaching B: External vendor C: Delay", by: "[COO + HR Dir.]", impact: "Med", iBg: C.badgeAmberBg, iFg: C.badgeAmberFg, rel: "KR 3.2" },
            { date: "", dec: "[Your decision]", ctx: "", opts: "", by: "", impact: "", iBg: "transparent", iFg: C.textMuted, rel: "" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 800, fontSize: "12px", color: accent }}>{i + 1}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "9px", fontWeight: 600 }}>{r.date}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 700 }}>{r.dec}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px" }}>{r.ctx}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px" }}>{r.opts}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px" }}>{r.by}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}>{r.impact && <span style={S.badge(r.iBg, r.iFg)}>{r.impact}</span>}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "9px", fontWeight: 700, color: "#7C3AED" }}>{r.rel}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderPendAndTips = () => (
    <div ref={pendRef} style={{ marginBottom: "12px" }}>
      <CopyButton targetRef={pendRef} label="Copy Section" />
      <table style={LT}><tbody><tr>
        <td style={{ ...LC, width: "55%", paddingRight: "4px" }}>
          <table style={S.tbl}>
            <thead><tr><td style={{ backgroundColor: "#FEE2E2", color: "#DC2626", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #DC2626" }}>⏳ PENDING DECISIONS</td></tr></thead>
            <tbody>
              {[
                { dec: "Extend SDR agency contract for Q2?", opts: "A: Extend B: Replace C: Cut", who: "[CEO]", by: "QBR", urg: "High", uBg: C.badgeRedBg, uFg: C.badgeRedFg },
                { dec: "VP Eng search: engage external recruiters?", opts: "A: Yes ($30K) B: No C: Delay", who: "[CEO + HR]", by: "Week 8", urg: "Med", uBg: C.badgeAmberBg, uFg: C.badgeAmberFg },
                { dec: "[Your pending decision]", opts: "", who: "", by: "", urg: "", uBg: "transparent", uFg: C.textMuted },
              ].map((r, i) => {
                const bg = i % 2 === 1 ? C.rowAlt : C.white;
                return (
                  <tr key={i}>
                    <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", padding: "6px 10px" }}>
                      <span style={{ fontWeight: 700 }}>{r.dec}</span><br />
                      {r.opts && <span style={{ fontSize: "9px", color: C.textMuted }}>Options: {r.opts} &nbsp;|&nbsp; {r.who} &nbsp;|&nbsp; By: <span style={{ fontWeight: 700 }}>{r.by}</span> &nbsp;{r.urg && <span style={S.badge(r.uBg, r.uFg)}>{r.urg}</span>}</span>}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </td>
        <td style={{ ...LC, width: "45%", paddingLeft: "4px" }}>
          <table style={S.tbl}>
            <thead><tr><td style={{ backgroundColor: "#D1FAE5", color: "#059669", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #059669" }}>💡 DECISION LOG TIPS</td></tr></thead>
            <tbody>
              {[
                { color: accent, tip: "Log ALL strategic decisions.", detail: "Budget, scope, hiring, targets. If someone asks 'when did we decide that?' — it belongs here." },
                { color: "#DC2626", tip: "Record options considered.", detail: "Stops re-opening debates. 'We already considered that.'" },
                { color: "#D97706", tip: "Pending decisions need deadlines.", detail: "No deadline = just a conversation. Name who + when." },
                { color: "#059669", tip: "Review at every MBR and QBR.", detail: "Open the log, review pending items, close or escalate." },
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold"><Zap size={11} />All-Star</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/okr-hub" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-indigo-600 transition-colors"><ArrowLeft size={14} />Back to OKR Hub</Link>
          <CopyAllButton targetRef={fullRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center"><Scale size={20} className="text-indigo-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">Decision Log Master</h2><p className="text-xs font-medium text-indigo-600">&#11088; All-Star &mdash; Stops Repeated Debates</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Every decision with context, options, owner, date, and impact. Stops rework and repeated debates.</p>
        </div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">View Mode</p>
          <div className="flex flex-wrap gap-2">
            {LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (
              <button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-200" : "bg-white text-slate-600 border-slate-200 hover:border-indigo-300 hover:text-indigo-700"}`}>
                <Icon size={15} /><span>{l.label}</span><span className={`text-[10px] font-medium ${isActive ? "text-indigo-200" : "text-slate-400"}`}>{l.desc}</span>
              </button>
            ); })}
          </div>
        </div>
        <div ref={fullRef} style={{ fontFamily: S.font }}>
          {layout === "full" && <>{renderTitleBanner()}{renderLog()}{renderPendAndTips()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderLog()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullRef} /></div>
      </div>
    </div>
  );
}

export default function DecisionLogMasterPage() { return <ThemeProvider><DecisionLogContent /></ThemeProvider>; }
