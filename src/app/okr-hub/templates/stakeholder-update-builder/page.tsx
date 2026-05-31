"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, Send, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Builder", desc: "Update template + examples + tips", icon: LayoutDashboard },
  { id: "compact", label: "Quick Update", desc: "Copy-paste update only", icon: AlignJustify },
];

function StakeholderUpdateContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullRef = useRef<HTMLDivElement>(null);
  const updateRef = useRef<HTMLDivElement>(null);
  const exRef = useRef<HTMLDivElement>(null);
  const tipsRef = useRef<HTMLDivElement>(null);

  const accent = "#0D9488";

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>STAKEHOLDER UPDATE BUILDER (COPY/PASTE)</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; OKR &amp; Operating Rhythm Hub &nbsp;|&nbsp; Progress &bull; Risks &bull; Asks</td></tr>
    </tbody></table>
  );

  const renderUpdate = () => (
    <div ref={updateRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accent)}>STAKEHOLDER UPDATE — FILL &amp; SEND</td></tr></tbody></table>
      <CopyButton targetRef={updateRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>Fill in the brackets. Copy. Paste into Slack, email, or your update channel. Takes 5 minutes.</p>
      <table style={S.tbl}><tbody>
        <tr><td style={S.tdLabel}>To</td><td style={S.td0}>[Stakeholder name(s) / group]</td></tr>
        <tr><td style={S.tdLabelAlt}>From</td><td style={S.tdAlt}>[Your name / role]</td></tr>
        <tr><td style={S.tdLabel}>Date</td><td style={S.td0}>[Date] &nbsp;|&nbsp; Week [X] of Q[X]</td></tr>
        <tr><td style={S.tdLabelAlt}>Subject</td><td style={{ ...S.tdAlt, fontWeight: 700 }}>[e.g., Weekly OKR Update — Week 3 of Q1]</td></tr>
      </tbody></table>

      <div style={{ ...S.sectionBanner("#059669"), marginTop: "8px" }}>PROGRESS SUMMARY</div>
      <table style={S.tbl}><tbody>
        <tr><td style={S.tdLabel}>Overall Health</td><td style={S.td0}><span style={S.badge(C.badgeAmberBg, C.badgeAmberFg)}>Amber</span> [or Green / Red] — [1-line explanation]</td></tr>
        <tr><td style={S.tdLabelAlt}>OKR Score (Avg)</td><td style={{ ...S.tdAlt, fontWeight: 800, color: accent }}>[e.g., 0.42 — up from 0.35 last week]</td></tr>
        <tr><td style={S.tdLabel}>Top Win This Week</td><td style={{ ...S.td0, fontWeight: 600, color: "#059669" }}>[e.g., 2 new support agents started. Onboarding ahead of schedule.]</td></tr>
        <tr><td style={S.tdLabelAlt}>Key Progress</td><td style={S.tdAlt}>[e.g., LinkedIn ads generating 380 MQLs (target: 400). Enterprise playbook outline complete.]</td></tr>
      </tbody></table>

      <div style={{ ...S.sectionBanner("#DC2626"), marginTop: "8px" }}>RISKS &amp; BLOCKERS</div>
      <table style={S.tbl}><tbody>
        <tr><td style={S.tdLabel}>Top Risk</td><td style={{ ...S.td0, fontWeight: 600, color: "#DC2626" }}>[e.g., Enterprise pipeline too thin. Only 1 active deal. Need SDR support approved.]</td></tr>
        <tr><td style={S.tdLabelAlt}>Active Blocker</td><td style={S.tdAlt}>[e.g., NPS data access blocked by IT. Escalated — awaiting CTO response.]</td></tr>
        <tr><td style={S.tdLabel}>Mitigation</td><td style={S.td0}>[e.g., SDR agency contract ready to sign. Need CEO approval by Friday.]</td></tr>
      </tbody></table>

      <div style={{ ...S.sectionBanner("#7C3AED"), marginTop: "8px" }}>ASKS / DECISIONS NEEDED</div>
      <table style={S.tbl}><tbody>
        {[
          { n: "1", ask: "[e.g., Approve SDR agency contract ($15K/mo for 3 months). Decision needed by Friday.]" },
          { n: "2", ask: "[e.g., Unblock NPS data access — can you follow up with CTO?]" },
          { n: "3", ask: "[e.g., No other asks this week. Will update again next Monday.]" },
        ].map((r, i) => {
          const bg = i % 2 === 1 ? C.rowAlt : C.white;
          return (
            <tr key={i}>
              <td style={{ ...S.td0, backgroundColor: bg, width: "30px", textAlign: "center" as const, fontWeight: 800, fontSize: "14px", color: "#7C3AED" }}>{r.n}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.ask}</td>
            </tr>
          );
        })}
      </tbody></table>

      <div style={{ ...S.sectionBanner(accent), marginTop: "8px" }}>NEXT WEEK FOCUS</div>
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.td0, padding: "10px 18px", fontSize: "10px", lineHeight: "2" }}>
          [e.g., 1. Onboard SDR agency (if approved). 2. Ship onboarding flow v2 design specs. 3. Launch first pulse survey.]
        </td></tr>
      </tbody></table>
    </div>
  );

  const renderEx = () => (
    <div ref={exRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner("#D97706")}>EXAMPLE: COMPLETED UPDATE (Slack / Email)</td></tr></tbody></table>
      <CopyButton targetRef={exRef} label="Copy Section" />
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.td0, padding: "14px 18px", fontSize: "10px", lineHeight: "2", whiteSpace: "pre-line" as const }}>
{`📊 Weekly OKR Update — Week 3 of Q1

Health: 🟡 Amber — Good CX progress, enterprise pipeline is the gap.
Score: 0.42 avg (up from 0.35)

✅ Top Win: 2 support agents started. Onboarding ahead of schedule.
📈 Progress: LinkedIn ads at 380 MQLs (target 400). Playbook outline done.

⚠️ Risk: Enterprise pipeline thin — only 1 active deal.
🚫 Blocker: NPS data access still blocked by IT.

🙏 Asks:
1. Approve SDR agency ($15K/mo) — need by Friday.
2. Follow up with CTO on NPS data access.

Next week: Onboard SDR agency. Ship onboarding design. Launch pulse survey.`}
        </td></tr>
      </tbody></table>
    </div>
  );

  const renderTips = () => (
    <div ref={tipsRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner("#DC2626")}>STAKEHOLDER UPDATE TIPS</td></tr></tbody></table>
      <CopyButton targetRef={tipsRef} label="Copy Section" />
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.td0, padding: "14px 18px", fontSize: "10px", lineHeight: "2.2" }}>
          <strong style={{ color: accent }}>Keep it under 2 minutes to read.</strong> If your stakeholder can&apos;t read it in 2 minutes, they won&apos;t read it at all.<br />
          <strong style={{ color: "#DC2626" }}>Always include asks at the end.</strong> If you need something, say it explicitly. Don&apos;t bury asks in paragraphs.<br />
          <strong style={{ color: "#D97706" }}>Send at the same time every week.</strong> Consistency builds trust. Monday mornings or Friday afternoons work best.<br />
          <strong style={{ color: "#7C3AED" }}>Use the same format every time.</strong> Stakeholders learn where to look. Don&apos;t reinvent the format each week.
        </td></tr>
      </tbody></table>
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50/30">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-teal-600 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-teal-50 border border-teal-100 text-teal-700 text-xs font-semibold"><Send size={11} />Update</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/okr-hub" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-teal-600 transition-colors"><ArrowLeft size={14} />Back to OKR Hub</Link>
          <CopyAllButton targetRef={fullRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-teal-100 flex items-center justify-center"><Send size={20} className="text-teal-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">Stakeholder Update Builder</h2><p className="text-xs font-medium text-teal-600">Copy/Paste &bull; Progress &bull; Risks &bull; Asks</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">A simple update template tied to OKRs. Fill in the brackets, copy, and send. 5 minutes.</p>
        </div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">View Mode</p>
          <div className="flex flex-wrap gap-2">
            {LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (
              <button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-teal-600 text-white border-teal-600 shadow-md shadow-teal-200" : "bg-white text-slate-600 border-slate-200 hover:border-teal-300 hover:text-teal-700"}`}>
                <Icon size={15} /><span>{l.label}</span><span className={`text-[10px] font-medium ${isActive ? "text-teal-200" : "text-slate-400"}`}>{l.desc}</span>
              </button>
            ); })}
          </div>
        </div>
        <div ref={fullRef} style={{ fontFamily: S.font }}>
          {layout === "full" && <>{renderTitleBanner()}{renderUpdate()}{renderEx()}{renderTips()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderUpdate()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullRef} /></div>
      </div>
    </div>
  );
}

export default function StakeholderUpdateBuilderPage() { return <ThemeProvider><StakeholderUpdateContent /></ThemeProvider>; }
