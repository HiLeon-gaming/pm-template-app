"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, BookText, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Glossary", desc: "Terms + acronyms", icon: LayoutDashboard },
  { id: "compact", label: "Quick Reference", desc: "Acronyms only", icon: AlignJustify },
];

function ProductGlossaryContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const termsRef = useRef<HTMLDivElement>(null);
  const acronymRef = useRef<HTMLDivElement>(null);
  const domainRef = useRef<HTMLDivElement>(null);

  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };
  const accent = "#8B5CF6"; const accentDark = "#6D28D9";

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>📖 PRODUCT GLOSSARY / DEFINITIONS</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; Agile / Scrum Delivery Command Center &nbsp;|&nbsp; Product Strategy &amp; Value</td></tr>
    </tbody></table>
  );

  const renderHeader = () => (
    <div ref={headerRef} style={{ marginBottom: "12px" }}>
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "18%" }}>Product</td><td style={{ ...S.td0, width: "32%" }}>[Product Name]</td><td style={{ ...S.tdLabel, width: "18%" }}>Last Updated</td><td style={{ ...S.td0, width: "32%" }}>[MM/DD/YYYY]</td></tr>
        <tr><td style={S.tdLabelAlt}>Maintained By</td><td style={S.tdAlt}>[PO / BA / Tech Lead]</td><td style={S.tdLabelAlt}>Total Terms</td><td style={S.tdAlt}>[##]</td></tr>
      </tbody></table>
      <CopyButton targetRef={headerRef} label="Copy Section" />
    </div>
  );

  const renderTerms = () => (
    <div ref={termsRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(accent)}>📋 KEY TERMS &amp; DEFINITIONS</div>
      <CopyButton targetRef={termsRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>Shared vocabulary for the team. Add new terms as they come up during refinement and planning.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "22%" }}>Term</th>
          <th style={S.thPrimary}>Definition</th>
          <th style={{ ...S.thPrimary, width: "14%", textAlign: "center" as const }}>Category</th>
          <th style={{ ...S.thPrimary, width: "12%", textAlign: "center" as const }}>Source</th>
        </tr></thead>
        <tbody>
          {[
            { term: "Sprint", def: "A fixed time-box (usually 1–2 weeks) during which the team delivers a potentially shippable increment", cat: "Scrum", cBg: C.badgeBlueBg, cFg: C.badgeBlueFg, src: "Scrum Guide" },
            { term: "Product Backlog", def: "An ordered list of everything that is known to be needed in the product, maintained by the Product Owner", cat: "Scrum", cBg: C.badgeBlueBg, cFg: C.badgeBlueFg, src: "Scrum Guide" },
            { term: "User Story", def: "A short description of a feature told from the user\u2019s perspective: \u201CAs a [user], I want [goal] so that [benefit]\u201D", cat: "Agile", cBg: C.badgeGreenBg, cFg: C.badgeGreenFg, src: "Team norm" },
            { term: "Acceptance Criteria", def: "Specific conditions that must be met for a story to be considered complete and accepted by the PO", cat: "Quality", cBg: C.badgeAmberBg, cFg: C.badgeAmberFg, src: "Team norm" },
            { term: "Definition of Done (DoD)", def: "The team\u2019s shared checklist of quality requirements that every increment must meet before it\u2019s considered done", cat: "Quality", cBg: C.badgeAmberBg, cFg: C.badgeAmberFg, src: "Working Agreement" },
            { term: "Definition of Ready (DoR)", def: "Checklist of what must be true before a story is allowed into a sprint — prevents sprint chaos", cat: "Quality", cBg: C.badgeAmberBg, cFg: C.badgeAmberFg, src: "Working Agreement" },
            { term: "Velocity", def: "The amount of work (story points) a team completes per sprint — used for capacity planning, not performance evaluation", cat: "Metrics", cBg: C.badgeRedBg, cFg: C.badgeRedFg, src: "Team metric" },
            { term: "Impediment", def: "Anything that prevents or slows the team from delivering. The SM is responsible for removing impediments.", cat: "Scrum", cBg: C.badgeBlueBg, cFg: C.badgeBlueFg, src: "Scrum Guide" },
            { term: "[Add term]", def: "", cat: "—", cBg: C.badgeGrayBg, cFg: C.badgeGrayFg, src: "" },
            { term: "[Add term]", def: "", cat: "—", cBg: C.badgeGrayBg, cFg: C.badgeGrayFg, src: "" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 700, fontSize: "12px", color: C.primary }}>{r.term}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{r.def}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.cBg, r.cFg)}>{r.cat}</span></td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "10px", color: C.textMuted }}>{r.src}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderAcronyms = () => (
    <div ref={acronymRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(accentDark)}>🔤 ACRONYMS &amp; ABBREVIATIONS</div>
      <CopyButton targetRef={acronymRef} label="Copy Section" />
      <table style={LT}><tbody><tr>
        <td style={{ ...LC, width: "50%", paddingRight: "5px" }}>
          <table style={S.tbl}>
            <thead><tr>
              <th style={{ ...S.thSecondary, width: "20%" }}>Acronym</th>
              <th style={S.thSecondary}>Full Name</th>
            </tr></thead>
            <tbody>
              {[
                { a: "PO", f: "Product Owner" },
                { a: "SM", f: "Scrum Master" },
                { a: "DoD", f: "Definition of Done" },
                { a: "DoR", f: "Definition of Ready" },
                { a: "MVP", f: "Minimum Viable Product" },
                { a: "OKR", f: "Objectives and Key Results" },
                { a: "WIP", f: "Work in Progress" },
              ].map((r, i) => {
                const bg = i % 2 === 1 ? C.rowAlt : C.white;
                return (
                  <tr key={i}><td style={{ ...S.td0, backgroundColor: bg, fontWeight: 800, fontSize: "12px", color: accent }}>{r.a}</td><td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{r.f}</td></tr>
                );
              })}
            </tbody>
          </table>
        </td>
        <td style={{ ...LC, width: "50%", paddingLeft: "5px" }}>
          <table style={S.tbl}>
            <thead><tr>
              <th style={{ ...S.thSecondary, width: "20%" }}>Acronym</th>
              <th style={S.thSecondary}>Full Name</th>
            </tr></thead>
            <tbody>
              {[
                { a: "WSJF", f: "Weighted Shortest Job First" },
                { a: "MoSCoW", f: "Must / Should / Could / Won\u2019t" },
                { a: "RAID", f: "Risks, Assumptions, Issues, Decisions" },
                { a: "RAG", f: "Red / Amber / Green (status)" },
                { a: "UAT", f: "User Acceptance Testing" },
                { a: "API", f: "Application Programming Interface" },
                { a: "CI/CD", f: "Continuous Integration / Continuous Delivery" },
              ].map((r, i) => {
                const bg = i % 2 === 1 ? C.rowAlt : C.white;
                return (
                  <tr key={i}><td style={{ ...S.td0, backgroundColor: bg, fontWeight: 800, fontSize: "12px", color: accent }}>{r.a}</td><td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{r.f}</td></tr>
                );
              })}
            </tbody>
          </table>
        </td>
      </tr></tbody></table>
    </div>
  );

  const renderDomain = () => (
    <div ref={domainRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(accent)}>🏢 DOMAIN-SPECIFIC TERMS</div>
      <CopyButton targetRef={domainRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>Add industry or product-specific terms that team members (especially new ones) need to understand.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "22%" }}>Term</th>
          <th style={S.thPrimary}>Definition (in plain English)</th>
          <th style={{ ...S.thPrimary, width: "14%", textAlign: "center" as const }}>Domain</th>
        </tr></thead>
        <tbody>
          {[
            { term: "[e.g., SKU]", def: "[Stock Keeping Unit — unique identifier for each product variant in inventory]", dom: "Retail" },
            { term: "[e.g., Churn rate]", def: "[Percentage of customers who stop using the product over a given period]", dom: "SaaS" },
            { term: "[e.g., PCI-DSS]", def: "[Payment Card Industry Data Security Standard — required for handling credit card data]", dom: "Compliance" },
            { term: "[Add term]", def: "", dom: "—" },
            { term: "[Add term]", def: "", dom: "—" },
            { term: "[Add term]", def: "", dom: "—" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 700, fontSize: "12px", color: C.primary }}>{r.term}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{r.def}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(C.badgeGrayBg, C.badgeGrayFg)}>{r.dom}</span></td>
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
    <>{renderTitleBanner()}{renderHeader()}{renderTerms()}{renderAcronyms()}{renderDomain()}{renderFooter()}</>
  );
  const renderCompactLayout = () => (
    <>{renderTitleBanner()}{renderHeader()}{renderAcronyms()}{renderFooter()}</>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-violet-50/30">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-violet-600 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-violet-50 border border-violet-100 text-violet-700 text-xs font-semibold"><BookText size={11} />Glossary</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/agile-command-center" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-violet-600 transition-colors"><ArrowLeft size={14} />Back to Agile Command Center</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-violet-100 flex items-center justify-center"><BookText size={20} className="text-violet-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">Product Glossary / Definitions</h2><p className="text-xs font-medium text-violet-600">Common Terms, Acronyms &amp; Domain Definitions</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Shared vocabulary for the team. Saves time and prevents misunderstandings — especially for new team members and stakeholders.</p>
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

export default function ProductGlossaryPage() { return <ThemeProvider><ProductGlossaryContent /></ThemeProvider>; }
