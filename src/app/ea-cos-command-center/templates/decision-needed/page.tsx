"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, GitPullRequest, LayoutDashboard, AlignJustify, Zap } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Frame", desc: "Problem + options + recommendation + outcome", icon: LayoutDashboard },
  { id: "compact", label: "Quick Decision", desc: "Problem + recommendation only", icon: AlignJustify },
];

function DecisionNeededContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const problemRef = useRef<HTMLDivElement>(null);
  const optionsRef = useRef<HTMLDivElement>(null);
  const outcomeRef = useRef<HTMLDivElement>(null);

  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };
  const accent = "#F59E0B";

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>DECISION NEEDED PAGE</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; EA / Chief of Staff Command Center &nbsp;|&nbsp; &#11088; All-Star &nbsp;|&nbsp; Meetings Engine</td></tr>
    </tbody></table>
  );

  const renderProblem = () => (
    <div ref={problemRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(accent)}>DECISION CONTEXT</div>
      <CopyButton targetRef={problemRef} label="Copy Section" />
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "22%" }}>Decision Title</td><td style={{ ...S.td0, fontWeight: 700 }}>[Clear, specific decision statement]</td></tr>
        <tr><td style={S.tdLabelAlt}>Background / Problem</td><td style={{ ...S.tdAlt, fontSize: "10px" }}>[2-3 sentences: What happened? Why does this need a decision now?]</td></tr>
        <tr><td style={S.tdLabel}>Decision Maker</td><td style={{ ...S.td0, fontWeight: 700, color: accent }}>[CEO / CFO / Board]</td></tr>
        <tr><td style={S.tdLabelAlt}>Deadline for Decision</td><td style={{ ...S.tdAlt, fontWeight: 700, color: "#DC2626" }}>[MM/DD/YYYY &mdash; Why this date?]</td></tr>
        <tr><td style={S.tdLabel}>Impact if Delayed</td><td style={S.td0}>[What happens if we don&apos;t decide by the deadline?]</td></tr>
        <tr><td style={S.tdLabelAlt}>Stakeholders Affected</td><td style={S.tdAlt}>[Who is impacted by this decision?]</td></tr>
      </tbody></table>
    </div>
  );

  const renderOptions = () => (
    <div ref={optionsRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner("#7C3AED")}>OPTIONS ANALYSIS</div>
      <CopyButton targetRef={optionsRef} label="Copy Section" />
      <table style={LT}><tbody><tr>
        {[
          { label: "OPTION A", color: "#059669", desc: "[Description of Option A]", pros: "[Lower cost, faster timeline]", cons: "[Less comprehensive, higher risk]", cost: "[$$]" },
          { label: "OPTION B", color: "#0EA5E9", desc: "[Description of Option B]", pros: "[Balanced approach, moderate risk]", cons: "[Takes longer, requires more resources]", cost: "[$$$]" },
          { label: "OPTION C", color: "#DC2626", desc: "[Description of Option C]", pros: "[Most comprehensive, lowest risk]", cons: "[Highest cost, longest timeline]", cost: "[$$$$]" },
        ].map((opt, i) => (
          <td key={i} style={{ ...LC, width: "33.3%", padding: i < 2 ? "0 4px 0 0" : "0" }}>
            <table style={S.tbl}><tbody>
              <tr><td style={{ backgroundColor: opt.color, color: "#FFFFFF", padding: "10px", fontWeight: 800, fontSize: "13px", textAlign: "center" as const, border: `1.5px solid ${C.border}` }}>{opt.label}</td></tr>
              <tr><td style={{ ...S.td0, fontSize: "10px", padding: "8px 10px" }}>{opt.desc}</td></tr>
              <tr><td style={{ ...S.td0, fontSize: "10px", padding: "4px 10px" }}><strong style={{ color: "#059669" }}>Pros:</strong> {opt.pros}</td></tr>
              <tr><td style={{ ...S.td0, fontSize: "10px", padding: "4px 10px" }}><strong style={{ color: "#DC2626" }}>Cons:</strong> {opt.cons}</td></tr>
              <tr><td style={{ ...S.td0, fontSize: "10px", padding: "4px 10px", fontWeight: 700 }}>Est. Cost: {opt.cost}</td></tr>
            </tbody></table>
          </td>
        ))}
      </tr></tbody></table>
      <table style={{ ...S.tbl, marginTop: "6px" }}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "22%" }}>Recommendation</td><td style={{ ...S.td0, fontWeight: 800, color: accent, fontSize: "12px" }}>[Option B &mdash; balanced risk/reward with acceptable timeline]</td></tr>
        <tr><td style={S.tdLabelAlt}>Key Risk of Recommendation</td><td style={{ ...S.tdAlt, color: "#DC2626", fontWeight: 600 }}>[Primary risk and mitigation plan]</td></tr>
      </tbody></table>
    </div>
  );

  const renderOutcome = () => (
    <div ref={outcomeRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner("#059669")}>DECISION OUTCOME</div>
      <CopyButton targetRef={outcomeRef} label="Copy Section" />
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "22%" }}>Decision Made</td><td style={{ ...S.td0, fontWeight: 800, color: "#059669" }}>[Record the actual decision here]</td></tr>
        <tr><td style={S.tdLabelAlt}>Date Decided</td><td style={S.tdAlt}>[MM/DD/YYYY]</td></tr>
        <tr><td style={S.tdLabel}>Decided By</td><td style={S.td0}>[Name / Role]</td></tr>
        <tr><td style={S.tdLabelAlt}>Rationale</td><td style={S.tdAlt}>[Why this option was chosen]</td></tr>
        <tr><td style={S.tdLabel}>Next Steps</td><td style={S.td0}>[Immediate actions required to execute the decision]</td></tr>
        <tr><td style={S.tdLabelAlt}>Who Needs to Know</td><td style={S.tdAlt}>[Communication plan for the decision]</td></tr>
      </tbody></table>
    </div>
  );

  const renderFooter = () => (
    <table style={{ ...S.tbl, marginTop: "8px" }}><tbody><tr>
      <td style={{ backgroundColor: C.primary, color: C.footerText, padding: "8px 20px", fontSize: "10px", fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.06em" }}>
        ExecNoteShop &bull; EA / Chief of Staff Command Center &bull; &copy; 2026 All Rights Reserved
      </td>
    </tr></tbody></table>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-amber-50/30">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-amber-500 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-100 text-amber-700 text-xs font-semibold"><Zap size={11} />All-Star</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/ea-cos-command-center" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-amber-600 transition-colors"><ArrowLeft size={14} />Back to EA/CoS Command Center</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center"><GitPullRequest size={20} className="text-amber-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">Decision Needed Page</h2><p className="text-xs font-medium text-amber-600">&#11088; All-Star &mdash; Turns Talk Into Decisions</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Problem, options, recommendation, owner, deadline, impact. Frame decisions clearly for the exec.</p>
        </div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">View Mode</p>
          <div className="flex flex-wrap gap-2">
            {LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (
              <button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-amber-500 text-white border-amber-500 shadow-md shadow-amber-200" : "bg-white text-slate-600 border-slate-200 hover:border-amber-300 hover:text-amber-700"}`}>
                <Icon size={15} /><span>{l.label}</span><span className={`text-[10px] font-medium ${isActive ? "text-amber-200" : "text-slate-400"}`}>{l.desc}</span>
              </button>
            ); })}
          </div>
        </div>
        <div ref={fullPageRef} style={{ fontFamily: S.font }}>
          {layout === "full" && <>{renderTitleBanner()}{renderProblem()}{renderOptions()}{renderOutcome()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderProblem()}{renderOutcome()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function DecisionNeededPage() { return <ThemeProvider><DecisionNeededContent /></ThemeProvider>; }
