"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, AlertTriangle, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full View", desc: "Blockers + escalation + resolution history + tips", icon: LayoutDashboard },
  { id: "compact", label: "Quick View", desc: "Blocker table only", icon: AlignJustify },
];

function BlockersContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullRef = useRef<HTMLDivElement>(null);
  const blockRef = useRef<HTMLDivElement>(null);
  const escRef = useRef<HTMLDivElement>(null);
  const histRef = useRef<HTMLDivElement>(null);
  const tipsRef = useRef<HTMLDivElement>(null);

  const accent = "#059669";

  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>BLOCKERS &amp; HELP REQUESTS</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; OKR &amp; Operating Rhythm Hub &nbsp;|&nbsp; Week of [DATE]</td></tr>
    </tbody></table>
  );

  const renderBlock = () => (
    <div ref={blockRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner("#DC2626")}>ACTIVE BLOCKERS</div>
      <CopyButton targetRef={blockRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>A blocker is anything that prevents progress on a Key Result or initiative. If something is stuck for more than 48 hours, it belongs here.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "5%", textAlign: "center" as const }}>#</th>
          <th style={S.thPrimary}>Blocker Description</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Blocks</th>
          <th style={{ ...S.thPrimary, width: "10%" }}>Raised By</th>
          <th style={{ ...S.thPrimary, width: "10%" }}>Who Can Unblock</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Severity</th>
          <th style={{ ...S.thPrimary, width: "15%" }}>Next Step</th>
        </tr></thead>
        <tbody>
          {[
            { desc: "NPS data access not approved — can't build detractor recovery list", blocks: "KR 1.3", raised: "[CX Lead]", unblock: "[IT Admin]", sev: "High", sevBg: C.badgeRedBg, sevFg: C.badgeRedFg, next: "IT Admin to grant access by Tue EOD" },
            { desc: "Legal template for enterprise contract still under review", blocks: "KR 2.2", raised: "[Sales]", unblock: "[Legal Lead]", sev: "High", sevBg: C.badgeRedBg, sevFg: C.badgeRedFg, next: "COO to escalate if not done by Wed" },
            { desc: "Design specs for onboarding flow v2 delayed — designer on PTO", blocks: "KR 1.2", raised: "[Product]", unblock: "[Design Lead]", sev: "Med", sevBg: C.badgeAmberBg, sevFg: C.badgeAmberFg, next: "Assign backup designer or push start to next week" },
            { desc: "[Your blocker here]", blocks: "", raised: "", unblock: "", sev: "", sevBg: "transparent", sevFg: C.textMuted, next: "" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 800, fontSize: "14px", color: "#DC2626" }}>{i + 1}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 600 }}>{r.desc}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "9px", fontWeight: 700, color: "#7C3AED" }}>{r.blocks}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px" }}>{r.raised}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", fontWeight: 700 }}>{r.unblock}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}>{r.sev && <span style={S.badge(r.sevBg, r.sevFg)}>{r.sev}</span>}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px" }}>{r.next}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderEsc = () => (
    <div ref={escRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner("#D97706")}>HELP REQUESTS (Need Support, Not Blocked Yet)</div>
      <CopyButton targetRef={escRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={S.thPrimary}>Help Needed</th>
          <th style={{ ...S.thPrimary, width: "12%", textAlign: "center" as const }}>For</th>
          <th style={{ ...S.thPrimary, width: "12%" }}>Requested By</th>
          <th style={{ ...S.thPrimary, width: "12%" }}>From</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Urgency</th>
        </tr></thead>
        <tbody>
          {[
            { help: "Need 2 customer references for enterprise case studies — can anyone intro?", forKr: "KR 2.2", by: "[Marketing]", from: "[CS Team]", urg: "Med", uBg: C.badgeAmberBg, uFg: C.badgeAmberFg },
            { help: "Need HR to approve comp bands for 2 IC roles by Wednesday", forKr: "KR 3.1", by: "[Recruiter]", from: "[Finance]", urg: "High", uBg: C.badgeRedBg, uFg: C.badgeRedFg },
            { help: "Could use a second pair of eyes on the onboarding email flow", forKr: "KR 1.2", by: "[Lisa P.]", from: "[CX Team]", urg: "Low", uBg: C.badgeGreenBg, uFg: C.badgeGreenFg },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.help}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "9px", fontWeight: 700, color: "#7C3AED" }}>{r.forKr}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px" }}>{r.by}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", fontWeight: 700 }}>{r.from}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.uBg, r.uFg)}>{r.urg}</span></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderHistAndTips = () => (
    <div ref={histRef} style={{ marginBottom: "12px" }}>
      <CopyButton targetRef={histRef} label="Copy Section" />
      <table style={LT}><tbody><tr>
        <td style={{ ...LC, width: "55%", paddingRight: "4px" }}>
          <table style={S.tbl}>
            <thead><tr><td style={{ backgroundColor: "#D1FAE5", color: "#059669", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #059669" }}>✅ RECENTLY RESOLVED</td></tr></thead>
            <tbody>
              {[
                { blocker: "Budget approval for LinkedIn ads", how: "CFO approved after seeing ROI projections", days: "2", by: "[CFO + Amy K.]" },
                { blocker: "Job descriptions for support roles", how: "HR fast-tracked with template from last hire", days: "1", by: "[HR Director]" },
              ].map((r, i) => {
                const bg = i % 2 === 1 ? C.rowAlt : C.white;
                return (
                  <tr key={i}>
                    <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", padding: "6px 10px" }}>
                      <span style={{ fontWeight: 700 }}>{r.blocker}</span><br />
                      <span style={{ fontSize: "9px", color: accent, fontWeight: 600 }}>{r.how}</span><br />
                      <span style={{ fontSize: "9px", color: C.textMuted }}>Stuck: <span style={{ fontWeight: 800 }}>{r.days}d</span> &nbsp;|&nbsp; {r.by}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </td>
        <td style={{ ...LC, width: "45%", paddingLeft: "4px" }}>
          <table style={S.tbl}>
            <thead><tr><td style={{ backgroundColor: "#EDE9FE", color: "#7C3AED", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #7C3AED" }}>💡 BLOCKER TIPS</td></tr></thead>
            <tbody>
              {[
                { color: "#DC2626", tip: "48-hour rule.", detail: "Stuck 48+ hrs? Escalate. Don't wait for the weekly meeting." },
                { color: "#D97706", tip: "Name who can unblock.", detail: "'[IT Admin] grant NPS access by Tue' — not 'we need help'." },
                { color: accent, tip: "Track resolution time.", detail: "5+ days routinely? Systemic problem, not one-off." },
                { color: "#7C3AED", tip: "Help requests prevent blockers.", detail: "Ask before you're stuck. Early asks = faster resolution." },
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50/30">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-600 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-50 border border-red-100 text-red-700 text-xs font-semibold"><AlertTriangle size={11} />Blockers</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/okr-hub" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-emerald-600 transition-colors"><ArrowLeft size={14} />Back to OKR Hub</Link>
          <CopyAllButton targetRef={fullRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center"><AlertTriangle size={20} className="text-red-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">Blockers &amp; Help Requests</h2><p className="text-xs font-medium text-red-600">What&apos;s Stuck &bull; Who Can Unblock &bull; Next Step</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Surface blockers early, name who can fix them, and track resolution. Prevents silent stalls.</p>
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
          {layout === "full" && <>{renderTitleBanner()}{renderBlock()}{renderEsc()}{renderHistAndTips()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderBlock()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullRef} /></div>
      </div>
    </div>
  );
}

export default function BlockersHelpRequestsPage() { return <ThemeProvider><BlockersContent /></ThemeProvider>; }
