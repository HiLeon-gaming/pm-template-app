"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, ShieldAlert, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Radar", desc: "Risk scan + mitigation + history", icon: LayoutDashboard },
  { id: "compact", label: "Quick Scan", desc: "This week's risks only", icon: AlignJustify },
];

function RiskRadarContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const radarRef = useRef<HTMLDivElement>(null);
  const historyRef = useRef<HTMLDivElement>(null);

  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };
  const accent = "#EC4899";

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>🚨 &ldquo;WHAT COULD BLOW UP THIS WEEK?&rdquo; RISK RADAR</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; EA / Chief of Staff Command Center &nbsp;|&nbsp; Requests &amp; Follow-Ups</td></tr>
    </tbody></table>
  );

  const renderRadar = () => (
    <div ref={radarRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner("#DC2626")}>🔴 THIS WEEK&apos;S RISK SCAN</td></tr></tbody></table>
      <CopyButton targetRef={radarRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>Quick weekly risk scan. What could surprise the exec? What needs a preemptive strike?</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "5%", textAlign: "center" as const }}>#</th>
          <th style={S.thPrimary}>Risk / Potential Blow-Up</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Likelihood</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Impact</th>
          <th style={{ ...S.thPrimary, width: "25%" }}>Mitigation / Preemptive Action</th>
          <th style={{ ...S.thPrimary, width: "10%" }}>Owner</th>
        </tr></thead>
        <tbody>
          {[
            { risk: "[Board deck not finalized — meeting is Thursday]", like: "High", lBg: C.badgeRedBg, lFg: C.badgeRedFg, impact: "High", iBg: C.badgeRedBg, iFg: C.badgeRedFg, mit: "[Block 2 hrs today for CEO final review. Print backup copies.]", owner: "[CoS]" },
            { risk: "[Vendor contract expires Friday — no renewal signed]", like: "High", lBg: C.badgeRedBg, lFg: C.badgeRedFg, impact: "High", iBg: C.badgeRedBg, iFg: C.badgeRedFg, mit: "[Escalate to Legal today. Prepare interim extension letter.]", owner: "[EA]" },
            { risk: "[CFO may push back on Q2 budget in leadership meeting]", like: "Med", lBg: C.badgeAmberBg, lFg: C.badgeAmberFg, impact: "Med", iBg: C.badgeAmberBg, iFg: C.badgeAmberFg, mit: "[Prep CEO with counter-arguments. Have data ready.]", owner: "[CoS]" },
            { risk: "[Key team member hinted at resignation]", like: "Med", lBg: C.badgeAmberBg, lFg: C.badgeAmberFg, impact: "High", iBg: C.badgeRedBg, iFg: C.badgeRedFg, mit: "[Flag to CHRO for retention conversation. Draft backup plan.]", owner: "[CoS]" },
            { risk: "[Travel disruption possible — airline strike rumored]", like: "Low", lBg: C.badgeGreenBg, lFg: C.badgeGreenFg, impact: "Med", iBg: C.badgeAmberBg, iFg: C.badgeAmberFg, mit: "[Identify backup flights. Confirm refundable bookings.]", owner: "[EA]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 800, fontSize: "12px", color: "#DC2626" }}>{i + 1}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.risk}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.lBg, r.lFg)}>{r.like}</span></td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.iBg, r.iFg)}>{r.impact}</span></td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.mit}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 600 }}>{r.owner}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderHistory = () => (
    <div ref={historyRef} style={{ marginBottom: "12px" }}>
      <table style={LT}><tbody><tr>
        <td style={{ ...LC, width: "50%", paddingRight: "4px" }}>
          <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner("#059669")}>✅ RISKS THAT WERE AVOIDED</td></tr></tbody></table>
          <table style={S.tbl}><tbody>
            <tr><td style={{ ...S.td0, fontSize: "10px", lineHeight: "1.9", padding: "10px 14px" }}>
              &bull; <strong style={{ color: "#059669" }}>[03/10]</strong> Marketing budget dispute — resolved before leadership meeting with pre-aligned data<br />
              &bull; <strong style={{ color: "#059669" }}>[03/07]</strong> IT outage during client demo — backup system activated, demo went smoothly<br />
              &bull; <strong style={{ color: "#059669" }}>[03/03]</strong> Double-booked CEO for investor call — caught 24hrs early, rescheduled
            </td></tr>
          </tbody></table>
        </td>
        <td style={{ ...LC, width: "50%", paddingLeft: "4px" }}>
          <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner("#DC2626")}>💥 RISKS THAT MATERIALIZED</td></tr></tbody></table>
          <table style={S.tbl}><tbody>
            <tr><td style={{ ...S.td0, fontSize: "10px", lineHeight: "1.9", padding: "10px 14px" }}>
              &bull; <strong style={{ color: "#DC2626" }}>[03/05]</strong> Legal didn&apos;t return contract on time — vendor escalated to CEO directly<br />
              &bull; <strong style={{ color: "#DC2626" }}>[02/28]</strong> Board member surprised by org change — wasn&apos;t briefed in advance<br />
              &bull; <strong style={{ color: "#D97706" }}>Lesson:</strong> Pre-brief all board members 48 hrs before any announcement
            </td></tr>
          </tbody></table>
        </td>
      </tr></tbody></table>
      <CopyButton targetRef={historyRef} label="Copy Section" />
    </div>
  );

  const renderFooter = () => (
    <table style={{ ...S.tbl, marginTop: "8px" }}><tbody><tr>
      <td style={{ backgroundColor: C.primary, color: C.footerText, padding: "8px 20px", fontSize: "10px", fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.06em" }}>
        ExecNoteShop &nbsp;&bull;&nbsp; EA / Chief of Staff Command Center &nbsp;&bull;&nbsp; &copy; 2026 All Rights Reserved
      </td>
    </tr></tbody></table>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-pink-50/30">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-pink-500 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-pink-50 border border-pink-100 text-pink-700 text-xs font-semibold"><ShieldAlert size={11} />Risk</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/ea-cos-command-center" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-pink-600 transition-colors"><ArrowLeft size={14} />Back to EA/CoS Command Center</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-pink-100 flex items-center justify-center"><ShieldAlert size={20} className="text-pink-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">&ldquo;What Could Blow Up This Week?&rdquo; Risk Radar</h2><p className="text-xs font-medium text-pink-600">Weekly Risk Scan &mdash; Prevent Surprises</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Quick weekly risk scan with likelihood, impact, and preemptive actions. Prevents surprises.</p>
        </div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">View Mode</p>
          <div className="flex flex-wrap gap-2">
            {LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (
              <button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-pink-500 text-white border-pink-500 shadow-md shadow-pink-200" : "bg-white text-slate-600 border-slate-200 hover:border-pink-300 hover:text-pink-700"}`}>
                <Icon size={15} /><span>{l.label}</span><span className={`text-[10px] font-medium ${isActive ? "text-pink-200" : "text-slate-400"}`}>{l.desc}</span>
              </button>
            ); })}
          </div>
        </div>
        <div ref={fullPageRef} style={{ fontFamily: S.font }}>
          {layout === "full" && <>{renderTitleBanner()}{renderRadar()}{renderHistory()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderRadar()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function RiskRadarPage() { return <ThemeProvider><RiskRadarContent /></ThemeProvider>; }
