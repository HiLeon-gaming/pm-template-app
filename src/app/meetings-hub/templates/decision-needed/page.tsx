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
  { id: "full", label: "Full Framework", desc: "Problem + options + risks + outcome", icon: LayoutDashboard },
  { id: "compact", label: "Quick Decision", desc: "Problem + recommendation only", icon: AlignJustify },
];

function DecisionNeededContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const optionsRef = useRef<HTMLDivElement>(null);
  const outcomeRef = useRef<HTMLDivElement>(null);

  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };
  const accent = "#3B82F6"; const accentDark = "#2563EB";

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>⚖️ DECISION NEEDED PAGE</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; Meetings Hub Pro &nbsp;|&nbsp; ⭐ All-Star &nbsp;|&nbsp; Decision Framing</td></tr>
    </tbody></table>
  );

  const renderHeader = () => (
    <div ref={headerRef} style={{ marginBottom: "12px" }}>
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "18%" }}>Decision Title</td><td style={{ ...S.td0, width: "32%", fontWeight: 700 }}>[e.g., Should we hire a contractor or FTE for API work?]</td><td style={{ ...S.tdLabel, width: "18%" }}>Date Raised</td><td style={{ ...S.td0, width: "32%" }}>[MM/DD/YYYY]</td></tr>
        <tr><td style={S.tdLabelAlt}>Raised By</td><td style={S.tdAlt}>[Your Name]</td><td style={S.tdLabelAlt}>Decision Maker</td><td style={{ ...S.tdAlt, fontWeight: 700, color: accent }}>[VP Engineering / Sponsor]</td></tr>
        <tr><td style={S.tdLabel}>Decision Needed By</td><td style={{ ...S.td0, fontWeight: 700, color: "#DC2626" }}>[MM/DD/YYYY]</td><td style={S.tdLabel}>Meeting</td><td style={S.td0}>[Which meeting will this be discussed?]</td></tr>
      </tbody></table>
      <CopyButton targetRef={headerRef} label="Copy Section" />

      <div style={{ ...S.sectionBanner(accent), marginTop: "8px" }}>🎯 PROBLEM STATEMENT</div>
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.td0, padding: "12px 14px", fontSize: "11px", lineHeight: "1.7" }}>
          [Describe the problem clearly in 2-3 sentences. What happened? Why does it matter? What happens if we don&apos;t decide?]<br /><br />
          <strong>Example:</strong> &ldquo;The API integration team needs a senior developer. Our current team is at capacity and the project will slip 4 weeks without additional help. We need to decide between hiring a contractor ($120K/6mo) or a full-time employee ($95K/yr + benefits).&rdquo;
        </td></tr>
      </tbody></table>
    </div>
  );

  const renderOptions = () => (
    <div ref={optionsRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(accentDark)}>📊 OPTIONS ANALYSIS</div>
      <CopyButton targetRef={optionsRef} label="Copy Section" />
      <table style={LT}><tbody><tr>
        {[
          { opt: "Option A", title: "[Hire Contractor]", pros: ["Faster start (2 weeks)", "No long-term commitment", "Specialized skills available"], cons: ["Higher hourly cost", "Knowledge leaves when done", "Less team integration"], cost: "$120K / 6 months", color: "#3B82F6" },
          { opt: "Option B", title: "[Hire FTE]", pros: ["Lower long-term cost", "Knowledge retention", "Team culture fit"], cons: ["Slower hiring (6-8 weeks)", "Benefits overhead", "Risk if role not needed later"], cost: "$95K/yr + benefits", color: "#059669" },
          { opt: "Option C", title: "[Do Nothing]", pros: ["No additional cost", "No hiring risk"], cons: ["Project delays 4+ weeks", "Team burnout risk", "Customer impact"], cost: "$0 direct / risk cost", color: "#EA580C" },
        ].map((o, i) => (
          <td key={i} style={{ ...LC, width: "33.3%", padding: i < 2 ? "0 4px 0 0" : "0" }}>
            <table style={S.tbl}><tbody>
              <tr><td style={{ backgroundColor: o.color, color: "#FFFFFF", padding: "8px 10px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, textAlign: "center" as const }}>{o.opt}: {o.title}</td></tr>
              <tr><td style={{ ...S.td0, fontSize: "10px", padding: "6px 10px" }}><strong style={{ color: "#059669" }}>Pros:</strong><br />{o.pros.map((p, j) => <React.Fragment key={j}>&bull; {p}<br /></React.Fragment>)}</td></tr>
              <tr><td style={{ ...S.tdAlt, fontSize: "10px", padding: "6px 10px" }}><strong style={{ color: "#DC2626" }}>Cons:</strong><br />{o.cons.map((c, j) => <React.Fragment key={j}>&bull; {c}<br /></React.Fragment>)}</td></tr>
              <tr><td style={{ ...S.td0, fontSize: "10px", padding: "6px 10px", fontWeight: 700 }}>Cost: {o.cost}</td></tr>
            </tbody></table>
          </td>
        ))}
      </tr></tbody></table>

      <table style={{ ...S.tbl, marginTop: "6px" }}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "18%" }}>Recommendation</td><td style={{ ...S.td0, fontWeight: 700, color: accent, fontSize: "12px" }}>[Option A — Hire Contractor. Fastest path to unblocking the project with manageable cost.]</td></tr>
        <tr><td style={S.tdLabelAlt}>Key Risk</td><td style={S.tdAlt}>[Knowledge transfer at end of contract — mitigate with documentation requirements in contract]</td></tr>
      </tbody></table>
    </div>
  );

  const renderOutcome = () => (
    <div ref={outcomeRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(accent)}>✅ DECISION OUTCOME</div>
      <CopyButton targetRef={outcomeRef} label="Copy Section" />
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "22%" }}>Decision Made</td><td style={{ ...S.td0, fontWeight: 700 }}>[What was decided — be specific]</td></tr>
        <tr><td style={S.tdLabelAlt}>Decided By</td><td style={S.tdAlt}>[Name + Role]</td></tr>
        <tr><td style={S.tdLabel}>Date Decided</td><td style={S.td0}>[MM/DD/YYYY]</td></tr>
        <tr><td style={S.tdLabelAlt}>Rationale</td><td style={S.tdAlt}>[Why this option was chosen — for the record]</td></tr>
        <tr><td style={S.tdLabel}>Next Steps</td><td style={S.td0}>[What happens now? Who does what by when?]</td></tr>
        <tr><td style={S.tdLabelAlt}>Communicate To</td><td style={S.tdAlt}>[Who needs to know about this decision?]</td></tr>
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-blue-500 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-semibold"><Zap size={11} />⭐ All-Star</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/meetings-hub" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-blue-600 transition-colors"><ArrowLeft size={14} />Back to Meetings Hub Pro</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center"><Scale size={20} className="text-blue-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">Decision Needed Page</h2><p className="text-xs font-medium text-blue-600">⭐ All-Star &mdash; Turns Discussion Into Decisions</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Problem, options, recommendation, decision maker, deadline, and risks. Frame decisions so they actually get made.</p>
        </div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">View Mode</p>
          <div className="flex flex-wrap gap-2">
            {LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (
              <button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-blue-500 text-white border-blue-500 shadow-md shadow-blue-200" : "bg-white text-slate-600 border-slate-200 hover:border-blue-300 hover:text-blue-700"}`}>
                <Icon size={15} /><span>{l.label}</span><span className={`text-[10px] font-medium ${isActive ? "text-blue-200" : "text-slate-400"}`}>{l.desc}</span>
              </button>
            ); })}
          </div>
        </div>
        <div ref={fullPageRef} style={{ fontFamily: S.font }}>
          {layout === "full" && <>{renderTitleBanner()}{renderHeader()}{renderOptions()}{renderOutcome()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderHeader()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function DecisionNeededPage() { return <ThemeProvider><DecisionNeededContent /></ThemeProvider>; }
