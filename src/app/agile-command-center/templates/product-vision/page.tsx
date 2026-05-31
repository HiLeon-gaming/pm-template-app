"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, Eye, LayoutDashboard, AlignJustify, Zap } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Vision", desc: "All sections + OKRs", icon: LayoutDashboard },
  { id: "compact", label: "Vision Summary", desc: "Core statement only", icon: AlignJustify },
];

function ProductVisionContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const visionRef = useRef<HTMLDivElement>(null);
  const okrRef = useRef<HTMLDivElement>(null);
  const audienceRef = useRef<HTMLDivElement>(null);
  const notRef = useRef<HTMLDivElement>(null);
  const reviewRef = useRef<HTMLDivElement>(null);

  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };
  const accent = "#8B5CF6"; const accentDark = "#6D28D9";

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>🔭 PRODUCT VISION + OUTCOME STATEMENT</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; Agile / Scrum Delivery Command Center &nbsp;|&nbsp; ⭐ All-Star &nbsp;|&nbsp; Product Strategy &amp; Value</td></tr>
    </tbody></table>
  );

  const renderHeader = () => (
    <div ref={headerRef} style={{ marginBottom: "12px" }}>
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "18%" }}>Product Name</td><td style={{ ...S.td0, width: "32%" }}>[Product Name]</td><td style={{ ...S.tdLabel, width: "18%" }}>Product Owner</td><td style={{ ...S.td0, width: "32%" }}>[Name]</td></tr>
        <tr><td style={S.tdLabelAlt}>Version / Release</td><td style={S.tdAlt}>[v1.0 / MVP / Phase 2]</td><td style={S.tdLabelAlt}>Last Updated</td><td style={S.tdAlt}>[MM/DD/YYYY]</td></tr>
      </tbody></table>
      <CopyButton targetRef={headerRef} label="Copy Section" />
    </div>
  );

  const renderVision = () => (
    <div ref={visionRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accent)}>🔭 PRODUCT VISION STATEMENT</td></tr></tbody></table>
      <CopyButton targetRef={visionRef} label="Copy Section" />
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "22%", verticalAlign: "top" as const }}>For</td><td style={{ ...S.td0, height: "36px" }}>[Target users/customers — who are they?]</td></tr>
        <tr><td style={{ ...S.tdLabelAlt, verticalAlign: "top" as const }}>Who need</td><td style={{ ...S.tdAlt, height: "36px" }}>[What problem or need they have]</td></tr>
        <tr><td style={{ ...S.tdLabel, verticalAlign: "top" as const }}>Our product is</td><td style={{ ...S.td0, height: "36px" }}>[Category / type of product]</td></tr>
        <tr><td style={{ ...S.tdLabelAlt, verticalAlign: "top" as const }}>That delivers</td><td style={{ ...S.tdAlt, height: "36px" }}>[Key benefit / value proposition]</td></tr>
        <tr><td style={{ ...S.tdLabel, verticalAlign: "top" as const }}>Unlike</td><td style={{ ...S.td0, height: "36px" }}>[Competitors or current alternatives]</td></tr>
        <tr><td style={{ ...S.tdLabelAlt, fontWeight: 700, color: accent }}>Our differentiator</td><td style={{ ...S.tdAlt, fontWeight: 600, height: "36px" }}>[What makes us uniquely better]</td></tr>
      </tbody></table>
      {/* One-sentence summary */}
      <table style={{ ...S.tbl, marginTop: "4px" }}><tbody>
        <tr><td style={{ backgroundColor: accent + "15", padding: "12px 16px", fontFamily: S.font, fontSize: "12px", fontWeight: 700, border: `1.5px solid ${accent}40`, textAlign: "center" as const, color: C.primary }}>
          ✨ One-Sentence Vision: <span style={{ fontWeight: 400 }}>[Write your complete vision in one powerful sentence]</span>
        </td></tr>
      </tbody></table>
    </div>
  );

  const renderOKR = () => (
    <div ref={okrRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accentDark)}>🎯 OUTCOMES &amp; KEY RESULTS (OKRs)</td></tr></tbody></table>
      <CopyButton targetRef={okrRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>Define 2–3 outcomes that define success. Each outcome has 2–3 measurable key results.</p>
      {/* OKR cards in 3 columns */}
      <table style={LT}><tbody><tr>
        {[
          { num: "O1", color: "#059669", title: "[Primary business outcome]", krs: ["[KR1: Metric → Target by Date]", "[KR2: Metric → Target by Date]", "[KR3: Metric → Target by Date]"] },
          { num: "O2", color: "#0891B2", title: "[User experience outcome]", krs: ["[KR1: Metric → Target by Date]", "[KR2: Metric → Target by Date]", "[KR3: Metric → Target by Date]"] },
          { num: "O3", color: "#D946EF", title: "[Technical/quality outcome]", krs: ["[KR1: Metric → Target by Date]", "[KR2: Metric → Target by Date]", "[KR3: Metric → Target by Date]"] },
        ].map((o, idx) => (
          <td key={idx} style={{ ...LC, width: "33.3%", padding: idx === 1 ? "0 4px" : "0" }}>
            <table style={S.tbl}>
              <thead><tr><td style={{ backgroundColor: o.color, color: C.white, padding: "10px 12px", fontFamily: S.font, fontSize: "13px", fontWeight: 800, border: `1.5px solid ${C.border}` }}>{o.num}: {o.title}</td></tr></thead>
              <tbody>
                {o.krs.map((kr, i) => (
                  <tr key={i}><td style={{ ...S.td0, backgroundColor: i % 2 === 0 ? C.white : C.rowAlt, fontSize: "11px", padding: "6px 10px" }}>
                    <span style={{ fontWeight: 700, color: o.color }}>KR{i + 1}:</span> {kr}
                  </td></tr>
                ))}
                <tr><td style={{ ...S.td0, textAlign: "center" as const }}><span style={S.badge(C.badgeGrayBg, C.badgeGrayFg)}>☐ Not Started</span></td></tr>
              </tbody>
            </table>
          </td>
        ))}
      </tr></tbody></table>
    </div>
  );

  const renderAudience = () => (
    <div ref={audienceRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accent)}>👥 TARGET AUDIENCE &amp; VALUE DELIVERED</td></tr></tbody></table>
      <CopyButton targetRef={audienceRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={S.thSecondary}>User Segment</th>
          <th style={{ ...S.thSecondary, width: "30%" }}>Primary Need / Pain</th>
          <th style={{ ...S.thSecondary, width: "30%" }}>Value We Deliver</th>
          <th style={{ ...S.thSecondary, width: "12%", textAlign: "center" as const }}>Priority</th>
        </tr></thead>
        <tbody>
          {[
            { seg: "[e.g., End users — mobile shoppers]", need: "[Need fast, intuitive checkout]", value: "[Sub-30-second checkout flow]", pri: "High", priBg: C.badgeRedBg, priFg: C.badgeRedFg },
            { seg: "[e.g., Operations team]", need: "[Need real-time order visibility]", value: "[Live dashboard with alerts]", pri: "High", priBg: C.badgeRedBg, priFg: C.badgeRedFg },
            { seg: "[e.g., Finance team]", need: "[Need accurate revenue reporting]", value: "[Automated daily reconciliation]", pri: "Med", priBg: C.badgeAmberBg, priFg: C.badgeAmberFg },
            { seg: "[Add segment]", need: "", value: "", pri: "—", priBg: C.badgeGrayBg, priFg: C.badgeGrayFg },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 600, fontSize: "11px" }}>{r.seg}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{r.need}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{r.value}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.priBg, r.priFg)}>{r.pri}</span></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderNotInScope = () => (
    <div ref={notRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accentDark)}>🚫 EXPLICITLY NOT IN SCOPE (THIS RELEASE)</td></tr></tbody></table>
      <CopyButton targetRef={notRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thSecondary, width: "5%", textAlign: "center" as const }}>#</th>
          <th style={S.thSecondary}>Item / Feature</th>
          <th style={{ ...S.thSecondary, width: "40%" }}>Reason</th>
        </tr></thead>
        <tbody>
          {[
            { item: "[e.g., International payment support]", reason: "[Deferred to Phase 2 — regulatory complexity]" },
            { item: "[e.g., Mobile app (native)]", reason: "[Responsive web first; native after validation]" },
            { item: "[e.g., Admin bulk import tool]", reason: "[Low demand; manual process acceptable for now]" },
            { item: "[Add item]", reason: "" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, color: C.textMuted }}>{i + 1}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{r.item}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{r.reason}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderReview = () => (
    <div ref={reviewRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accent)}>🔍 VISION HEALTH CHECK</td></tr></tbody></table>
      <CopyButton targetRef={reviewRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={S.thPrimary}>Question</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Yes/No</th>
          <th style={{ ...S.thPrimary, width: "40%" }}>Evidence / Notes</th>
        </tr></thead>
        <tbody>
          {[
            "Can every team member explain our product vision in one sentence?",
            "Are our OKRs measurable and time-bound?",
            "Does every sprint backlog item trace to an outcome above?",
            "Have stakeholders validated our target user segments?",
            "Is the “not in scope” list clear and agreed?",
          ].map((q, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{q}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "14px" }}>☐ Y &nbsp;☐ N</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>&nbsp;</td>
              </tr>
            );
          })}
        </tbody>
      </table>
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
    <>{renderTitleBanner()}{renderHeader()}{renderVision()}{renderOKR()}
      <table style={LT}><tbody><tr>
        <td style={{ ...LC, width: "55%", paddingRight: "8px" }}>{renderAudience()}</td>
        <td style={{ ...LC, width: "45%", paddingLeft: "8px" }}>{renderNotInScope()}</td>
      </tr></tbody></table>
      {renderReview()}{renderFooter()}
    </>
  );

  const renderCompactLayout = () => (
    <>{renderTitleBanner()}{renderHeader()}{renderVision()}{renderOKR()}{renderFooter()}</>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-violet-50/30">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-violet-600 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-100 text-amber-700 text-xs font-semibold"><Zap size={11} />⭐ All-Star</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/agile-command-center" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-violet-600 transition-colors"><ArrowLeft size={14} />Back to Agile Command Center</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-violet-100 flex items-center justify-center"><Eye size={20} className="text-violet-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">Product Vision + Outcome Statement</h2><p className="text-xs font-medium text-violet-600">⭐ All-Star &mdash; OKR-Friendly Vision Framework</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">What we&apos;re building, for who, and how we&apos;ll measure success. Includes vision statement, OKRs, audience mapping, scope boundaries, and vision health check.</p>
        </div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">View Mode</p>
          <div className="flex flex-wrap gap-2">
            {LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (
              <button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-violet-600 text-white border-violet-600 shadow-md shadow-violet-200" : "bg-white text-slate-600 border-slate-200 hover:border-violet-300 hover:text-violet-700"}`}>
                <Icon size={15} /><span>{l.label}</span><span className={`text-[10px] font-medium ${isActive ? "text-violet-200" : "text-slate-400"}`}>{l.desc}</span>
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

export default function ProductVisionPage() { return <ThemeProvider><ProductVisionContent /></ThemeProvider>; }
