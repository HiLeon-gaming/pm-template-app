"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, ShoppingCart, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Plan", desc: "Strategy + SOW + selection criteria", icon: LayoutDashboard },
  { id: "compact", label: "Quick Plan", desc: "Items + timeline only", icon: AlignJustify },
];

function ProcurementPlanContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const strategyRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement>(null);
  const selectionRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const contractRef = useRef<HTMLDivElement>(null);

  const descStyle: React.CSSProperties = {
    fontFamily: S.font, fontSize: "11px", fontStyle: "italic", color: "#475569",
    padding: "10px 14px", lineHeight: "1.6", borderBottom: `1px solid ${C.border}`, backgroundColor: C.white,
  };
  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "0px" }}>
      <tbody>
        <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${C.accent}`, textAlign: "center" as const }}>🛒 PROCUREMENT PLAN</td></tr>
        <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; PM Command Center &nbsp;|&nbsp; PMBOK Aligned</td></tr>
        <tr><td style={descStyle}>
          <strong style={{ fontStyle: "italic" }}>The Procurement Plan defines how goods and services will be acquired from external sources.</strong> It includes make-or-buy decisions, contract types, vendor selection criteria, and the procurement timeline.<br /><br />
          Use this template during <strong style={{ fontStyle: "italic" }}>procurement planning</strong> to establish sourcing strategy. Aligns with PMBOK Procurement Management — Planning Process Group.
        </td></tr>
      </tbody>
    </table>
  );

  const renderHeader = () => (
    <div ref={headerRef} style={{ marginBottom: "12px" }}>
      <table style={S.tbl}>
        <tbody>
          <tr><td style={{ ...S.tdLabel, width: "18%" }}>Project Name</td><td style={{ ...S.td0, width: "32%" }}>[Project Name]</td><td style={{ ...S.tdLabel, width: "18%" }}>Date</td><td style={{ ...S.td0, width: "32%" }}>[MM/DD/YYYY]</td></tr>
          <tr><td style={S.tdLabelAlt}>Project Manager</td><td style={S.tdAlt}>[Name, PMP]</td><td style={S.tdLabelAlt}>Version</td><td style={S.tdAlt}>[1.0]</td></tr>
        </tbody>
      </table>
      <CopyButton targetRef={headerRef} label="Copy Section" />
    </div>
  );

  const renderStrategy = () => (
    <div ref={strategyRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner()}> PROCUREMENT STRATEGY</div>
      <CopyButton targetRef={strategyRef} label="Copy Section" />
      <table style={S.tbl}>
        <tbody>
          <tr><td style={{ ...S.tdLabel, width: "28%" }}>Procurement Approach</td><td style={S.td0}>[Describe overall approach. Example: Competitive bid for software licenses; sole-source for specialized consulting; internal resources for PM and BA.]</td></tr>
          <tr><td style={S.tdLabelAlt}>Procurement Authority</td><td style={S.tdAlt}>[Who can authorize purchases? Example: PM: &lt;$10K; Sponsor: $10K-$50K; Procurement Dept: &gt;$50K]</td></tr>
          <tr><td style={S.tdLabel}>Procurement Policies</td><td style={S.td0}>[Reference organizational procurement policies. Example: Must use approved vendor list; 3 bids required for &gt;$25K]</td></tr>
          <tr><td style={S.tdLabelAlt}>Standard Contract Types</td><td style={S.tdAlt}>[e.g., Fixed Price (FP) for defined scope; Time & Materials (T&M) for advisory work; Cost Plus (CPFF) for R&D]</td></tr>
        </tbody>
      </table>
    </div>
  );

  const renderItems = () => (
    <div ref={itemsRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(C.secondary)}> PROCUREMENT ITEMS</div>
      <CopyButton targetRef={itemsRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "5%", textAlign: "center" as const }}>ID</th>
          <th style={{ ...S.thPrimary, width: "18%" }}>Item / Service</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Make/Buy</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Contract</th>
          <th style={{ ...S.thPrimary, width: "12%", textAlign: "right" as const }}>Est. Value</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Status</th>
          <th style={S.thPrimary}>Notes</th>
        </tr></thead>
        <tbody>
          {[
            { id: "P1", item: "[Cloud Platform (AWS/Azure)]", mb: "Buy", mBg: C.badgeBlueBg, mFg: C.badgeBlueFg, contract: "T&M", val: "$[36,000]", status: "Contracted", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg, note: "[12-month commitment; existing enterprise agreement]" },
            { id: "P2", item: "[Integration Consultant]", mb: "Buy", mBg: C.badgeBlueBg, mFg: C.badgeBlueFg, contract: "T&M", val: "$[35,000]", status: "In Bid", sBg: C.badgeAmberBg, sFg: C.badgeAmberFg, note: "[RFP sent to 3 vendors; responses due [date]]" },
            { id: "P3", item: "[Testing Tools License]", mb: "Buy", mBg: C.badgeBlueBg, mFg: C.badgeBlueFg, contract: "FP", val: "$[5,000]", status: "Contracted", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg, note: "[Annual license; auto-renewal]" },
            { id: "P4", item: "[Training Development]", mb: "Make", mBg: C.badgeGreenBg, mFg: C.badgeGreenFg, contract: "N/A", val: "$[15,000]", status: "Planned", sBg: C.badgeBlueBg, sFg: C.badgeBlueFg, note: "[Internal change management team will develop]" },
            { id: "P5", item: "[Security Audit]", mb: "Buy", mBg: C.badgeBlueBg, mFg: C.badgeBlueFg, contract: "FP", val: "$[12,000]", status: "Not Started", sBg: C.badgeGrayBg, sFg: C.badgeGrayFg, note: "[Needed 4 weeks before go-live]" },
            { id: "[P#]", item: "[Add item]", mb: "—", mBg: C.badgeGrayBg, mFg: C.badgeGrayFg, contract: "", val: "", status: "—", sBg: C.badgeGrayBg, sFg: C.badgeGrayFg, note: "" },
          ].map((p, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (<tr key={i}>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, color: C.secondary }}>{p.id}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 600, fontSize: "11px" }}>{p.item}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(p.mBg, p.mFg)}>{p.mb}</span></td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "11px", fontWeight: 600 }}>{p.contract}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "right" as const, fontWeight: 600 }}>{p.val}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(p.sBg, p.sFg)}>{p.status}</span></td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{p.note}</td>
            </tr>);
          })}
        </tbody>
      </table>
    </div>
  );

  const renderSelection = () => (
    <div ref={selectionRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner()}> VENDOR SELECTION CRITERIA</div>
      <CopyButton targetRef={selectionRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thSecondary, width: "6%", textAlign: "center" as const }}>#</th>
          <th style={{ ...S.thSecondary, width: "22%" }}>Criterion</th>
          <th style={{ ...S.thSecondary, width: "10%", textAlign: "center" as const }}>Weight %</th>
          <th style={S.thSecondary}>Evaluation Guidance</th>
        </tr></thead>
        <tbody>
          {[
            { crit: "Technical Capability", weight: "30%", guide: "[Does vendor have proven expertise in the required technology stack?]" },
            { crit: "Cost / Value", weight: "25%", guide: "[Total cost of ownership including licensing, support, and hidden costs]" },
            { crit: "Experience & References", weight: "15%", guide: "[Relevant project experience; client references; case studies]" },
            { crit: "Support & SLA", weight: "15%", guide: "[Response times, availability, escalation procedures, penalty clauses]" },
            { crit: "Cultural Fit & Communication", weight: "10%", guide: "[Communication style, timezone overlap, collaboration approach]" },
            { crit: "Financial Stability", weight: "5%", guide: "[Company size, years in business, financial health indicators]" },
          ].map((c, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (<tr key={i}>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, color: C.secondary }}>{i + 1}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 600, fontSize: "11px" }}>{c.crit}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700 }}>{c.weight}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{c.guide}</td>
            </tr>);
          })}
        </tbody>
      </table>
    </div>
  );

  const renderTimeline = () => (
    <div ref={timelineRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(C.secondary)}> PROCUREMENT TIMELINE</div>
      <CopyButton targetRef={timelineRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thSecondary, width: "25%" }}>Activity</th>
          <th style={{ ...S.thSecondary, width: "12%" }}>Start</th>
          <th style={{ ...S.thSecondary, width: "12%" }}>End</th>
          <th style={{ ...S.thSecondary, width: "12%" }}>Owner</th>
          <th style={{ ...S.thSecondary, width: "10%", textAlign: "center" as const }}>Status</th>
          <th style={S.thSecondary}>Deliverable</th>
        </tr></thead>
        <tbody>
          {[
            { act: "Develop SOW / RFP", start: "[MM/DD]", end: "[MM/DD]", owner: "[PM]", status: "Complete", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg, del: "[SOW document for each procurement item]" },
            { act: "Issue RFP to Vendors", start: "[MM/DD]", end: "[MM/DD]", owner: "[Procurement]", status: "Complete", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg, del: "[RFP distributed to qualified vendor list]" },
            { act: "Vendor Response Period", start: "[MM/DD]", end: "[MM/DD]", owner: "[Vendors]", status: "In Progress", sBg: C.badgeBlueBg, sFg: C.badgeBlueFg, del: "[Vendor proposals received]" },
            { act: "Evaluate & Score Proposals", start: "[MM/DD]", end: "[MM/DD]", owner: "[Eval Team]", status: "Not Started", sBg: C.badgeGrayBg, sFg: C.badgeGrayFg, del: "[Completed vendor scorecard]" },
            { act: "Vendor Selection & Negotiation", start: "[MM/DD]", end: "[MM/DD]", owner: "[PM + Legal]", status: "Not Started", sBg: C.badgeGrayBg, sFg: C.badgeGrayFg, del: "[Selected vendor; negotiated terms]" },
            { act: "Contract Execution", start: "[MM/DD]", end: "[MM/DD]", owner: "[Legal]", status: "Not Started", sBg: C.badgeGrayBg, sFg: C.badgeGrayFg, del: "[Signed contract; PO issued]" },
            { act: "Vendor Onboarding", start: "[MM/DD]", end: "[MM/DD]", owner: "[PM]", status: "Not Started", sBg: C.badgeGrayBg, sFg: C.badgeGrayFg, del: "[Vendor access, kickoff, integration]" },
          ].map((t, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (<tr key={i}>
              <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 600, fontSize: "11px" }}>{t.act}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{t.start}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{t.end}</td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{t.owner}</td>
              <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(t.sBg, t.sFg)}>{t.status}</span></td>
              <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{t.del}</td>
            </tr>);
          })}
        </tbody>
      </table>
    </div>
  );

  const renderContract = () => (
    <div ref={contractRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner()}>📋 CONTRACT MANAGEMENT</div>
      <CopyButton targetRef={contractRef} label="Copy Section" />
      <table style={S.tbl}>
        <tbody>
          <tr><td style={{ ...S.tdLabel, width: "28%" }}>Contract Administration</td><td style={S.td0}>[PM monitors vendor performance; Procurement manages contract amendments; Legal reviews compliance]</td></tr>
          <tr><td style={S.tdLabelAlt}>Performance Monitoring</td><td style={S.tdAlt}>[Monthly vendor scorecards; SLA compliance tracking; deliverable quality reviews]</td></tr>
          <tr><td style={S.tdLabel}>Payment Terms</td><td style={S.td0}>[Net 30; milestone-based payments; 10% holdback until final acceptance]</td></tr>
          <tr><td style={S.tdLabelAlt}>Dispute Resolution</td><td style={S.tdAlt}>[PM → Procurement Manager → Legal → Mediation/Arbitration per contract terms]</td></tr>
          <tr><td style={S.tdLabel}>Contract Closure</td><td style={S.td0}>[Formal acceptance of all deliverables; final invoice reconciliation; lessons learned; vendor evaluation]</td></tr>
        </tbody>
      </table>
    </div>
  );

  const renderFooter = () => (
    <table style={{ ...S.tbl, marginTop: "8px" }}>
      <tbody><tr><td style={{ backgroundColor: C.primary, color: C.footerText, padding: "8px 20px", fontSize: "10px", fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.06em" }}>ExecNoteShop • PM Command Center • © 2026 All Rights Reserved</td></tr></tbody>
    </table>
  );

  const renderFullLayout = () => (
    <>{renderTitleBanner()}{renderHeader()}{renderStrategy()}{renderItems()}{renderSelection()}
      <table style={LT}><tbody><tr>
        <td style={{ ...LC, width: "55%", paddingRight: "6px" }}>{renderTimeline()}</td>
        <td style={{ ...LC, width: "45%", paddingLeft: "6px" }}>{renderContract()}</td>
      </tr></tbody></table>
      {renderFooter()}
    </>
  );

  const renderCompactLayout = () => (
    <>{renderTitleBanner()}{renderHeader()}{renderItems()}{renderTimeline()}{renderFooter()}</>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/20">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold"><ShoppingCart size={11} /> Procurement</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/pm-command-center" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-indigo-600 transition-colors"><ArrowLeft size={14} /> Back to PM Command Center</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center"><ShoppingCart size={20} className="text-indigo-600" /></div>
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900">Procurement Plan</h2>
              <p className="text-xs font-medium text-indigo-600">PMBOK Procurement Management • Planning Process Group</p>
            </div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Defines sourcing strategy, procurement items, vendor selection criteria, and timeline. Full Plan includes all sections; Quick Plan shows items and timeline only.</p>
        </div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Layout</p>
          <div className="flex flex-wrap gap-2">
            {LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (
              <button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-200" : "bg-white text-slate-600 border-slate-200 hover:border-indigo-300 hover:text-indigo-700"}`}>
                <Icon size={15} /> <span>{l.label}</span> <span className={`text-[10px] font-medium ${isActive ? "text-indigo-200" : "text-slate-400"}`}>{l.desc}</span>
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

export default function ProcurementPlanPage() {
  return (<ThemeProvider><ProcurementPlanContent /></ThemeProvider>);
}
