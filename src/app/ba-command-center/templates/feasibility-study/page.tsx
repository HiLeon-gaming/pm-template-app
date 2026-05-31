"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, FlaskConical, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Study", desc: "All 5 dimensions + verdict", icon: LayoutDashboard },
  { id: "compact", label: "Quick Summary", desc: "Scorecard + verdict only", icon: AlignJustify },
];

function FeasibilityContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const techRef = useRef<HTMLDivElement>(null);
  const econRef = useRef<HTMLDivElement>(null);
  const operRef = useRef<HTMLDivElement>(null);
  const schedRef = useRef<HTMLDivElement>(null);
  const legalRef = useRef<HTMLDivElement>(null);
  const scoreRef = useRef<HTMLDivElement>(null);
  const verdictRef = useRef<HTMLDivElement>(null);

  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };

  const descStyle: React.CSSProperties = {
    fontFamily: S.font, fontSize: "11px", fontStyle: "italic", color: "#475569",
    padding: "10px 14px", lineHeight: "1.6", borderBottom: `1px solid ${C.border}`,
    backgroundColor: C.white,
  };

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "0px" }}>
      <tbody>
        <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${C.accent}`, textAlign: "center" as const }}>🧪 FEASIBILITY STUDY</td></tr>
        <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; Business Analyst Command Center &nbsp;|&nbsp; BABOK Aligned</td></tr>
        <tr><td style={descStyle}>
          <strong style={{ fontStyle: "italic" }}>This template evaluates a proposed solution across five feasibility dimensions: Technical, Economic, Operational, Schedule, and Legal/Regulatory.</strong> Each dimension is assessed with key questions, a traffic-light rating, and supporting evidence. A consolidated scorecard and go/no-go verdict provide the basis for stakeholder decision-making.<br /><br />
          Ideal for <strong style={{ fontStyle: "italic" }}>project initiation gates, investment decisions,</strong> or <strong style={{ fontStyle: "italic" }}>determining whether a proposed solution is viable before committing resources</strong>. Aligns with BABOK Knowledge Area: Strategy Analysis.
        </td></tr>
      </tbody>
    </table>
  );

  const renderDateHeader = () => (
    <div ref={headerRef} style={{ marginBottom: "12px" }}>
      <table style={S.tbl}>
        <tbody>
          <tr>
            <td style={{ ...S.tdLabel, width: "14%" }}>Project</td>
            <td style={{ ...S.td0, width: "36%" }}>[Project / Initiative Name]</td>
            <td style={{ ...S.tdLabel, width: "14%" }}>Date</td>
            <td style={{ ...S.td0, width: "36%" }}>[MM/DD/YYYY]</td>
          </tr>
          <tr>
            <td style={S.tdLabelAlt}>Prepared by</td>
            <td style={S.tdAlt}>[BA Name]</td>
            <td style={S.tdLabelAlt}>Solution Under Review</td>
            <td style={S.tdAlt}>[e.g., Option B — Vendor X COTS Platform]</td>
          </tr>
        </tbody>
      </table>
      <CopyButton targetRef={headerRef} label="Copy Section" />
    </div>
  );

  const renderDimension = (
    ref: React.RefObject<HTMLDivElement | null>,
    icon: string, title: string, color: string, bg: string,
    questions: { q: string; a: string }[]
  ) => (
    <div ref={ref} style={{ marginBottom: "12px" }}>
      <table style={S.tbl}>
        <thead><tr><td colSpan={2} style={{ backgroundColor: bg, color: color, padding: "10px 14px", fontFamily: S.font, fontSize: "13px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: `3px solid ${color}` }}>{icon} {title}</td></tr></thead>
        <tbody>
          {questions.map((row, i) => {
            const isAlt = i % 2 === 1;
            return (
              <tr key={i}>
                <td style={{ ...(isAlt ? S.tdLabelAlt : S.tdLabel), width: "28%", verticalAlign: "top" as const }}>{row.q}</td>
                <td style={{ ...(isAlt ? S.tdAlt : S.td0), height: "32px" }}>{row.a}</td>
              </tr>
            );
          })}
          <tr>
            <td style={S.tdLabel}>Assessment</td>
            <td style={S.td0}>☐ 🟢 Feasible ☐ 🟡 Feasible with Conditions ☐ 🔴 Not Feasible</td>
          </tr>
        </tbody>
      </table>
      <CopyButton targetRef={ref} label="Copy Section" />
    </div>
  );

  const renderScorecard = () => (
    <div ref={scoreRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner()}>📊 FEASIBILITY SCORECARD</div>
      <CopyButton targetRef={scoreRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead>
          <tr>
            <th style={{ ...S.thPrimary, width: "22%" }}>Dimension</th>
            <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Rating</th>
            <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Confidence</th>
            <th style={S.thPrimary}>Key Finding</th>
            <th style={{ ...S.thPrimary, width: "20%" }}>Key Risk / Condition</th>
          </tr>
        </thead>
        <tbody>
          {[
            { dim: "💻 Technical", icon: "💻", rating: "🟢", conf: "High", finding: "[e.g., Tech stack is proven; team has relevant experience]", risk: "[e.g., API integration complexity]" },
            { dim: "💰 Economic", icon: "💰", rating: "🟡", conf: "Medium", finding: "[e.g., Positive ROI at 18 months; within budget if no scope creep]", risk: "[e.g., Ongoing SaaS costs may exceed projections]" },
            { dim: "⚙️ Operational", icon: "⚙️", rating: "🟢", conf: "High", finding: "[e.g., Users supportive; training plan identified]", risk: "[e.g., Change management for legacy users]" },
            { dim: "📅 Schedule", icon: "📅", rating: "🟡", conf: "Medium", finding: "[e.g., 4-month timeline achievable with dedicated team]", risk: "[e.g., Vendor onboarding may delay Sprint 1]" },
            { dim: "⚖️ Legal/Regulatory", icon: "⚖️", rating: "🟢", conf: "High", finding: "[e.g., GDPR compliant; SOC2 certified vendor]", risk: "[e.g., Data residency clause needs legal review]" },
          ].map((row, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 600 }}>{row.dim}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "16px" }}>{row.rating}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "11px", fontWeight: 600 }}>{row.conf}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{row.finding}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{row.risk}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderVerdict = () => (
    <div ref={verdictRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(C.secondary)}>🏁 VERDICT &amp; RECOMMENDATION</td></tr></tbody></table>
      <CopyButton targetRef={verdictRef} label="Copy Section" />
      <table style={S.tbl}>
        <tbody>
          <tr>
            <td style={{ ...S.tdLabel, width: "22%" }}>Overall Verdict</td>
            <td style={S.td0}>☐ 🟢 GO — Proceed with implementation ☐ 🟡 CONDITIONAL GO — Proceed if conditions met ☐ 🔴 NO GO — Do not proceed</td>
          </tr>
          {[
            { q: "Conditions for GO", a: "[List conditions that must be met — e.g., Vendor contract signed; legal review complete; team capacity confirmed]" },
            { q: "Critical risks", a: "[Top 3 risks that could change the verdict]" },
            { q: "Recommended next steps", a: "[e.g., 1) Complete vendor contract negotiation 2) Begin detailed design 3) Secure development team]" },
            { q: "Decision deadline", a: "[MM/DD/YYYY — decision must be made by this date to meet project timeline]" },
          ].map((row, i) => {
            const isAlt = i % 2 === 0;
            return (
              <tr key={i}>
                <td style={{ ...(isAlt ? S.tdLabelAlt : S.tdLabel), verticalAlign: "top" as const }}>{row.q}</td>
                <td style={{ ...(isAlt ? S.tdAlt : S.td0), height: "34px" }}>{row.a}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <table style={{ ...S.tbl, marginTop: "6px" }}>
        <thead>
          <tr>
            <th style={{ ...S.thPrimary, width: "20%" }}>Approver</th>
            <th style={{ ...S.thPrimary, width: "14%" }}>Role</th>
            <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Decision</th>
            <th style={S.thPrimary}>Comments</th>
            <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Date</th>
          </tr>
        </thead>
        <tbody>
          {[
            { name: "[Sponsor]", role: "Business Decision", dec: "Pending", dBg: "#FEF3C7", dFg: "#D97706" },
            { name: "[CTO/Tech Lead]", role: "Technical Feasibility", dec: "Pending", dBg: "#FEF3C7", dFg: "#D97706" },
            { name: "[CFO/Finance]", role: "Financial Approval", dec: "Pending", dBg: "#FEF3C7", dFg: "#D97706" },
          ].map((row, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 600 }}>{row.name}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{row.role}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(row.dBg, row.dFg)}>{row.dec}</span></td>
                <td style={{ ...S.td0, backgroundColor: bg }}>&nbsp;</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "11px" }}>[MM/DD]</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderFooter = () => (
    <table style={{ ...S.tbl, marginTop: "8px" }}>
      <tbody><tr><td style={{ backgroundColor: C.primary, color: C.footerText, padding: "8px 20px", fontSize: "10px", fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.06em" }}>ExecNoteShop &nbsp;&bull;&nbsp; Business Analyst Command Center &nbsp;&bull;&nbsp; &copy; 2026 All Rights Reserved</td></tr></tbody>
    </table>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-lime-50/20">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-lime-50 border border-lime-100 text-lime-700 text-xs font-semibold"><FlaskConical size={11} /> Feasibility</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/ba-command-center" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-lime-600 transition-colors"><ArrowLeft size={14} /> Back to BA Command Center</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-lime-100 flex items-center justify-center"><FlaskConical size={20} className="text-lime-600" /></div>
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900">Feasibility Study</h2>
              <p className="text-xs font-medium text-lime-600">Technical &bull; Economic &bull; Operational &bull; Schedule &bull; Legal</p>
            </div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Evaluate a proposed solution across five feasibility dimensions with traffic-light ratings, consolidated scorecard, and go/no-go verdict. Full Study covers all dimensions; Quick Summary shows the scorecard and verdict.</p>
        </div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Layout</p>
          <div className="flex flex-wrap gap-2">
            {LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (
              <button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-lime-600 text-white border-lime-600 shadow-md shadow-lime-200" : "bg-white text-slate-600 border-slate-200 hover:border-lime-300 hover:text-lime-700"}`}>
                <Icon size={15} /> <span>{l.label}</span> <span className={`text-[10px] font-medium ${isActive ? "text-lime-200" : "text-slate-400"}`}>{l.desc}</span>
              </button>
            ); })}
          </div>
        </div>
        <div ref={fullPageRef} style={{ fontFamily: S.font }}>
          {layout === "full" && <>
            {renderTitleBanner()}{renderDateHeader()}
            <table style={LT}><tbody><tr>
              <td style={{ ...LC, width: "50%", paddingRight: "5px" }}>
                {renderDimension(techRef, "💻", "TECHNICAL FEASIBILITY", "#2563EB", "#DBEAFE", [
                  { q: "Can we build/configure this?", a: "[e.g., Yes — team has React/Node experience; Vendor X has REST APIs]" },
                  { q: "Technology maturity", a: "[e.g., Vendor X platform is mature (v8.2); 500+ enterprise clients]" },
                  { q: "Integration complexity", a: "[e.g., Medium — 3 integrations needed (ERP, Payment, Email)]" },
                  { q: "Infrastructure requirements", a: "[e.g., AWS cloud; Vendor handles hosting for SaaS option]" },
                  { q: "Skills / resource gaps", a: "[e.g., Need Vendor X admin training for 2 team members]" },
                ])}
              </td>
              <td style={{ ...LC, width: "50%", paddingLeft: "5px" }}>
                {renderDimension(econRef, "💰", "ECONOMIC FEASIBILITY", "#059669", "#D1FAE5", [
                  { q: "Total cost (upfront)", a: "[$___K — breakdown: license, config, dev, training]" },
                  { q: "Ongoing annual cost", a: "[$___K/year — SaaS fees, maintenance, support]" },
                  { q: "Expected benefits (annual)", a: "[$___K/year — labor savings, error reduction, revenue impact]" },
                  { q: "Payback period", a: "[e.g., 18 months]" },
                  { q: "ROI (3-year)", a: "[e.g., 180% — ($540K benefits - $320K costs) / $320K costs]" },
                ])}
              </td>
            </tr></tbody></table>
            <table style={LT}><tbody><tr>
              <td style={{ ...LC, width: "33.33%", paddingRight: "4px" }}>
                {renderDimension(operRef, "⚙️", "OPERATIONAL FEASIBILITY", "#D97706", "#FEF3C7", [
                  { q: "User acceptance likelihood", a: "[High/Med/Low + rationale]" },
                  { q: "Change management needs", a: "[e.g., Training + comms plan needed]" },
                  { q: "Process changes required", a: "[e.g., 3 processes need redesign]" },
                  { q: "Support model", a: "[e.g., Vendor L1/L2; internal L3]" },
                ])}
              </td>
              <td style={{ ...LC, width: "33.33%", paddingRight: "4px", paddingLeft: "4px" }}>
                {renderDimension(schedRef, "📅", "SCHEDULE FEASIBILITY", "#7C3AED", "#EDE9FE", [
                  { q: "Estimated timeline", a: "[e.g., 4 months to go-live]" },
                  { q: "Critical path items", a: "[e.g., Vendor contract → config → UAT]" },
                  { q: "Resource availability", a: "[e.g., Team available from Sprint 3]" },
                  { q: "Schedule risks", a: "[e.g., Vendor onboarding may take 3 weeks]" },
                ])}
              </td>
              <td style={{ ...LC, width: "33.33%", paddingLeft: "4px" }}>
                {renderDimension(legalRef, "⚖️", "LEGAL / REGULATORY", "#DC2626", "#FEE2E2", [
                  { q: "Regulatory compliance", a: "[e.g., GDPR, SOX, HIPAA — status]" },
                  { q: "Data privacy / residency", a: "[e.g., Data stored in US — EU check needed]" },
                  { q: "Licensing / IP", a: "[e.g., SaaS license — no IP concerns]" },
                  { q: "Contractual risks", a: "[e.g., Vendor lock-in with 3-year term]" },
                ])}
              </td>
            </tr></tbody></table>
            {renderScorecard()}{renderVerdict()}{renderFooter()}
          </>}
          {layout === "compact" && <>{renderTitleBanner()}{renderDateHeader()}{renderScorecard()}{renderVerdict()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function FeasibilityStudyPage() {
  return (<ThemeProvider><FeasibilityContent /></ThemeProvider>);
}
