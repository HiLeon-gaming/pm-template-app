"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, Compass, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Session", desc: "Vision + SWOT + priorities + roadmap", icon: LayoutDashboard },
  { id: "compact", label: "Quick Session", desc: "Priorities + actions only", icon: AlignJustify },
];

function StrategicPlanningContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const visionRef = useRef<HTMLDivElement>(null);
  const swotRef = useRef<HTMLDivElement>(null);
  const prioritiesRef = useRef<HTMLDivElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);

  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };
  const accent = "#7C3AED"; const accentDark = "#6D28D9";

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>🧭 STRATEGIC PLANNING SESSION</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; Meetings Hub Pro &nbsp;|&nbsp; Executive &amp; Leadership</td></tr>
    </tbody></table>
  );

  const renderHeader = () => (
    <div ref={headerRef} style={{ marginBottom: "12px" }}>
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "18%" }}>Session</td><td style={{ ...S.td0, width: "32%", fontWeight: 700, color: accent }}>[Q2 Strategic Planning / Annual Strategy]</td><td style={{ ...S.tdLabel, width: "18%" }}>Date</td><td style={{ ...S.td0, width: "32%" }}>[MM/DD/YYYY]</td></tr>
        <tr><td style={S.tdLabelAlt}>Facilitator</td><td style={S.tdAlt}>[CEO / Strategy Lead]</td><td style={S.tdLabelAlt}>Duration</td><td style={S.tdAlt}>[Half day / Full day]</td></tr>
        <tr><td style={S.tdLabel}>Participants</td><td colSpan={3} style={S.td0}>[Leadership team — names and titles]</td></tr>
      </tbody></table>
      <CopyButton targetRef={headerRef} label="Copy Section" />
    </div>
  );

  const renderVision = () => (
    <div ref={visionRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accent)}>🎯 VISION &amp; CURRENT STATE</td></tr></tbody></table>
      <CopyButton targetRef={visionRef} label="Copy Section" />
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "22%" }}>Mission</td><td style={S.td0}>[Why does this organization exist?]</td></tr>
        <tr><td style={S.tdLabelAlt}>Vision (3-5 year)</td><td style={{ ...S.tdAlt, fontWeight: 700, color: accent }}>[Where are we going? What does success look like?]</td></tr>
        <tr><td style={S.tdLabel}>Current Position</td><td style={S.td0}>[Where are we today? Market position, revenue, team size]</td></tr>
        <tr><td style={S.tdLabelAlt}>Gap Analysis</td><td style={S.tdAlt}>[What\u2019s the gap between where we are and where we want to be?]</td></tr>
      </tbody></table>
    </div>
  );

  const renderSWOT = () => (
    <div ref={swotRef} style={{ marginBottom: "12px" }}>
      <CopyButton targetRef={swotRef} label="Copy Section" />
      <table style={LT}><tbody>
        <tr>
          {[
            { title: "💪 STRENGTHS", color: "#059669", items: ["[Strong brand recognition]", "[Experienced leadership team]", "[Loyal customer base]", "[Proprietary technology]"] },
            { title: "⚠️ WEAKNESSES", color: "#DC2626", items: ["[Limited market reach]", "[High employee turnover]", "[Technical debt]", "[Dependency on single product]"] },
          ].map((s, i) => (
            <td key={i} style={{ ...LC, width: "50%", padding: i === 0 ? "0 4px 0 0" : "0" }}>
              <table style={S.tbl}><tbody>
                <tr><td style={{ backgroundColor: s.color, color: "#FFFFFF", padding: "8px 10px", fontFamily: S.font, fontSize: "13px", fontWeight: 800, border: `1.5px solid ${C.border}`, textAlign: "center" as const }}>{s.title}</td></tr>
                {s.items.map((item, j) => (
                  <tr key={j}><td style={{ ...(j % 2 === 0 ? S.td0 : S.tdAlt), fontSize: "10px", padding: "5px 10px" }}>&bull; {item}</td></tr>
                ))}
              </tbody></table>
            </td>
          ))}
        </tr>
        <tr><td colSpan={2} style={{ padding: "4px 0" }}></td></tr>
        <tr>
          {[
            { title: "🚀 OPPORTUNITIES", color: "#3B82F6", items: ["[New market segment expansion]", "[Partnership with [Company]]", "[AI/ML product enhancement]", "[International growth]"] },
            { title: "🔥 THREATS", color: "#EA580C", items: ["[New competitor entering market]", "[Regulatory changes pending]", "[Economic downturn risk]", "[Talent war — hiring challenges]"] },
          ].map((s, i) => (
            <td key={i} style={{ ...LC, width: "50%", padding: i === 0 ? "0 4px 0 0" : "0" }}>
              <table style={S.tbl}><tbody>
                <tr><td style={{ backgroundColor: s.color, color: "#FFFFFF", padding: "8px 10px", fontFamily: S.font, fontSize: "13px", fontWeight: 800, border: `1.5px solid ${C.border}`, textAlign: "center" as const }}>{s.title}</td></tr>
                {s.items.map((item, j) => (
                  <tr key={j}><td style={{ ...(j % 2 === 0 ? S.td0 : S.tdAlt), fontSize: "10px", padding: "5px 10px" }}>&bull; {item}</td></tr>
                ))}
              </tbody></table>
            </td>
          ))}
        </tr>
      </tbody></table>
    </div>
  );

  const renderPriorities = () => (
    <div ref={prioritiesRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accentDark)}>🏆 STRATEGIC PRIORITIES</td></tr></tbody></table>
      <CopyButton targetRef={prioritiesRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "5%", textAlign: "center" as const }}>#</th>
          <th style={S.thPrimary}>Strategic Priority</th>
          <th style={{ ...S.thPrimary, width: "12%" }}>Owner</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Timeline</th>
          <th style={{ ...S.thPrimary, width: "15%" }}>Key Result / Metric</th>
        </tr></thead>
        <tbody>
          {[
            { priority: "[Grow revenue 25% through new market segment]", owner: "[CRO]", timeline: "[Q2-Q4]", metric: "[$3.2M ARR by Q4]" },
            { priority: "[Launch AI-powered product feature]", owner: "[CPO]", timeline: "[Q2-Q3]", metric: "[50% adoption by Q3]" },
            { priority: "[Reduce employee turnover below 12%]", owner: "[CHRO]", timeline: "[Q2-Q4]", metric: "[<12% annualized]" },
            { priority: "[Expand to 2 new international markets]", owner: "[VP Intl]", timeline: "[Q3-Q4]", metric: "[2 markets live by Q4]" },
            { priority: "[Achieve SOC 2 Type II certification]", owner: "[CTO]", timeline: "[Q2]", metric: "[Certification by 06/30]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 800, fontSize: "14px", color: accent }}>{i + 1}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 600 }}>{r.priority}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 600 }}>{r.owner}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, fontSize: "10px", color: accent }}>{r.timeline}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px" }}>{r.metric}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderActions = () => (
    <div ref={actionsRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accent)}>✅ NEXT STEPS</td></tr></tbody></table>
      <CopyButton targetRef={actionsRef} label="Copy Section" />
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "22%" }}>Immediate Actions</td><td style={S.td0}>[What happens this week as a result of this session?]</td></tr>
        <tr><td style={S.tdLabelAlt}>Communication Plan</td><td style={S.tdAlt}>[How will strategy be communicated to the broader organization?]</td></tr>
        <tr><td style={S.tdLabel}>Review Cadence</td><td style={{ ...S.td0, fontWeight: 700, color: accent }}>[Monthly strategy review — first Tuesday each month]</td></tr>
        <tr><td style={S.tdLabelAlt}>Next Planning Session</td><td style={S.tdAlt}>[Date — annual / semi-annual]</td></tr>
      </tbody></table>
    </div>
  );

  const renderFooter = () => (
    <table style={{ ...S.tbl, marginTop: "8px" }}><tbody><tr>
      <td style={{ backgroundColor: C.primary, color: C.footerText, padding: "8px 20px", fontSize: "10px", fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.06em" }}>
        ExecNoteShop &nbsp;&bull;&nbsp; Meetings Hub Pro &nbsp;&bull;&nbsp; &copy; 2026 All Rights Reserved
      </td>
    </tr></tbody></table>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-violet-50/30">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-violet-500 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-violet-50 border border-violet-100 text-violet-700 text-xs font-semibold"><Compass size={11} />Strategy</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/meetings-hub" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-violet-600 transition-colors"><ArrowLeft size={14} />Back to Meetings Hub Pro</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-violet-100 flex items-center justify-center"><Compass size={20} className="text-violet-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">Strategic Planning Session</h2><p className="text-xs font-medium text-violet-600">Vision &bull; SWOT &bull; Priorities &bull; Roadmap</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Full strategic planning template with vision review, SWOT analysis, strategic priorities, and next steps.</p>
        </div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">View Mode</p>
          <div className="flex flex-wrap gap-2">
            {LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (
              <button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-violet-500 text-white border-violet-500 shadow-md shadow-violet-200" : "bg-white text-slate-600 border-slate-200 hover:border-violet-300 hover:text-violet-700"}`}>
                <Icon size={15} /><span>{l.label}</span><span className={`text-[10px] font-medium ${isActive ? "text-violet-200" : "text-slate-400"}`}>{l.desc}</span>
              </button>
            ); })}
          </div>
        </div>
        <div ref={fullPageRef} style={{ fontFamily: S.font }}>
          {layout === "full" && <>{renderTitleBanner()}{renderHeader()}{renderVision()}{renderSWOT()}{renderPriorities()}{renderActions()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderHeader()}{renderPriorities()}{renderActions()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function StrategicPlanningPage() { return <ThemeProvider><StrategicPlanningContent /></ThemeProvider>; }
