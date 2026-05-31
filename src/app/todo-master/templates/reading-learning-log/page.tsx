"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, BookOpen, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "quick";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Log", desc: "Details + takeaways", icon: LayoutDashboard },
  { id: "quick", label: "Quick List", desc: "Titles + ratings", icon: AlignJustify },
];

function ReadingLogContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const booksRef = useRef<HTMLDivElement>(null);
  const coursesRef = useRef<HTMLDivElement>(null);
  const articlesRef = useRef<HTMLDivElement>(null);
  const goalRef = useRef<HTMLDivElement>(null);

  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}>
      <tbody>
        <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${C.accent}`, textAlign: "center" as const }}>📚 READING &amp; LEARNING LOG</td></tr>
        <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; The To-Do Master Template Package &nbsp;|&nbsp; Read More, Learn More, Grow More</td></tr>
      </tbody>
    </table>
  );

  const renderDateHeader = () => (
    <div ref={headerRef} style={{ marginBottom: "12px" }}>
      <table style={S.tbl}>
        <tbody>
          <tr>
            <td style={{ ...S.tdLabel, width: "14%" }}>Period</td>
            <td style={{ ...S.td0, width: "20%" }}>[Month / Quarter / Year]</td>
            <td style={{ ...S.tdLabel, width: "14%" }}>Reading Goal</td>
            <td style={{ ...S.td0, width: "16%" }}>[___] books / [___] courses</td>
            <td style={{ ...S.tdLabel, width: "12%" }}>Progress</td>
            <td style={{ ...S.td0, width: "24%" }}>[___] / [___] completed</td>
          </tr>
          <tr>
            <td style={S.tdLabelAlt}>Learning Focus</td>
            <td colSpan={5} style={S.tdAlt}>[e.g., Leadership, Data Science, Product Strategy, Financial Literacy]</td>
          </tr>
        </tbody>
      </table>
      <CopyButton targetRef={headerRef} label="Copy Section" />
    </div>
  );

  const BOOKS = [
    { title: "[e.g., The Hard Thing About Hard Things — Ben Horowitz]", type: "Book", typeBg: "#DBEAFE", typeFg: "#2563EB", status: "Done", sBg: "#D1FAE5", sFg: "#059669", rating: "★★★★★", started: "[Date]", finished: "[Date]", takeaway: "[Key insight: The Struggle is where greatness comes from. Embrace hard decisions.]", action: "[Apply 'wartime CEO' mindset to Q3 product pivots]" },
    { title: "[e.g., Thinking, Fast and Slow — Daniel Kahneman]", type: "Book", typeBg: "#DBEAFE", typeFg: "#2563EB", status: "Reading", sBg: "#DBEAFE", sFg: "#2563EB", rating: "—", started: "[Date]", finished: "—", takeaway: "[System 1 vs System 2 thinking — implications for decision frameworks]", action: "[Build a 'slow thinking' checklist for big decisions]" },
    { title: "[Add book]", type: "Book", typeBg: "#DBEAFE", typeFg: "#2563EB", status: "—", sBg: "#F3F4F6", sFg: "#6B7280", rating: "", started: "", finished: "", takeaway: "", action: "" },
  ];

  const COURSES = [
    { title: "[e.g., AWS Solutions Architect — Udemy / Stephane Maarek]", type: "Course", typeBg: "#EDE9FE", typeFg: "#7C3AED", status: "In Progress", sBg: "#DBEAFE", sFg: "#2563EB", rating: "★★★★☆", started: "[Date]", finished: "—", takeaway: "[VPC networking fundamentals; understand NAT gateways]", action: "[Lab: Build multi-AZ architecture for staging env]" },
    { title: "[Add course]", type: "Course", typeBg: "#EDE9FE", typeFg: "#7C3AED", status: "—", sBg: "#F3F4F6", sFg: "#6B7280", rating: "", started: "", finished: "", takeaway: "", action: "" },
  ];

  const ARTICLES = [
    { title: "[e.g., 'How Stripe builds products' — Lenny's Newsletter]", type: "Article", typeBg: "#FEF3C7", typeFg: "#D97706", status: "Done", sBg: "#D1FAE5", sFg: "#059669", rating: "★★★★☆", started: "[Date]", finished: "[Date]", takeaway: "[Product spec process: 1-pager → 6-pager → build]", action: "[Adopt 1-pager format for next feature proposal]" },
    { title: "[e.g., 'The Minto Pyramid Principle' — McKinsey article]", type: "Article", typeBg: "#FEF3C7", typeFg: "#D97706", status: "Done", sBg: "#D1FAE5", sFg: "#059669", rating: "★★★★★", started: "[Date]", finished: "[Date]", takeaway: "[Lead with the answer, then support with evidence]", action: "[Restructure next board presentation using pyramid]" },
    { title: "[Add article / podcast]", type: "Article", typeBg: "#FEF3C7", typeFg: "#D97706", status: "—", sBg: "#F3F4F6", sFg: "#6B7280", rating: "", started: "", finished: "", takeaway: "", action: "" },
  ];

  const renderDetailedSection = (label: string, items: typeof BOOKS, ref: React.RefObject<HTMLDivElement | null>, bannerColor?: string) => (  // eslint-disable-line @typescript-eslint/no-explicit-any
    <div ref={ref} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(bannerColor)}>{label}</td></tr></tbody></table>
      <CopyButton targetRef={ref} label="Copy Section" />
      {items.map((item, i) => (
        <table key={i} style={{ ...S.tbl, marginBottom: "6px" }}>
          <tbody>
            <tr>
              <td style={{ ...S.td0, fontWeight: 700, fontSize: "13px" }} colSpan={3}>
                <span style={S.badge(item.typeBg, item.typeFg)}>{item.type}</span>&nbsp;
                {item.title}
              </td>
              <td style={{ ...S.td0, width: "10%", textAlign: "center" as const }}><span style={S.badge(item.sBg, item.sFg)}>{item.status}</span></td>
              <td style={{ ...S.td0, width: "10%", textAlign: "center" as const, color: "#D97706" }}>{item.rating}</td>
            </tr>
            {"started" in item && (
              <tr>
                <td style={{ ...S.tdLabelAlt, width: "10%" }}>Started</td>
                <td style={{ ...S.tdAlt, width: "15%" }}>{item.started}</td>
                <td style={{ ...S.tdLabelAlt, width: "10%" }}>Finished</td>
                <td colSpan={2} style={S.tdAlt}>{item.finished}</td>
              </tr>
            )}
            <tr>
              <td style={{ ...S.tdLabel, width: "10%" }}>Key Takeaway</td>
              <td colSpan={4} style={S.td0}>{item.takeaway}&nbsp;</td>
            </tr>
            <tr>
              <td style={S.tdLabelAlt}>Action Item</td>
              <td colSpan={4} style={S.tdAlt}>{item.action}&nbsp;</td>
            </tr>
          </tbody>
        </table>
      ))}
    </div>
  );

  const renderQuickList = () => (
    <div ref={booksRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner()}>📋 QUICK READING LIST</div>
      <CopyButton targetRef={booksRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead>
          <tr>
            <th style={{ ...S.thPrimary, width: "5%", textAlign: "center" as const }}>#</th>
            <th style={S.thPrimary}>Title</th>
            <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Type</th>
            <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Status</th>
            <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Rating</th>
            <th style={{ ...S.thPrimary, width: "20%" }}>Key Takeaway</th>
          </tr>
        </thead>
        <tbody>
          {[...BOOKS, ...COURSES, ...ARTICLES].map((item, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, color: C.accent }}>{i + 1}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 600, fontSize: "12px" }}>{item.title}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(item.typeBg, item.typeFg)}>{item.type}</span></td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(item.sBg, item.sFg)}>{item.status}</span></td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, color: "#D97706", fontSize: "11px" }}>{item.rating}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{item.takeaway}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderGoal = () => (
    <div ref={goalRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(C.secondary)}>🎯 LEARNING GOAL PROGRESS</td></tr></tbody></table>
      <CopyButton targetRef={goalRef} label="Copy Section" />
      <table style={S.tbl}>
        <tbody>
          {[
            { q: "Books read this period", a: "[___] / [___] goal" },
            { q: "Courses completed", a: "[___] / [___] goal" },
            { q: "Articles / podcasts consumed", a: "[___]" },
            { q: "Most impactful resource", a: "" },
            { q: "Biggest mindset shift", a: "" },
            { q: "Next on my reading list", a: "" },
          ].map((row, i) => {
            const isAlt = i % 2 === 1;
            return (
              <tr key={i}>
                <td style={{ ...(isAlt ? S.tdLabelAlt : S.tdLabel), width: "35%" }}>{row.q}</td>
                <td style={isAlt ? S.tdAlt : S.td0}>{row.a}&nbsp;</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderFooter = () => (
    <table style={{ ...S.tbl, marginTop: "8px" }}>
      <tbody><tr><td style={{ backgroundColor: C.primary, color: C.footerText, padding: "8px 20px", fontSize: "10px", fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.06em" }}>ExecNoteShop &nbsp;&bull;&nbsp; The To-Do Master Template Package &nbsp;&bull;&nbsp; &copy; 2026 All Rights Reserved</td></tr></tbody>
    </table>
  );

  const renderFullLayout = () => (
    <>
      {renderTitleBanner()}{renderDateHeader()}
      {renderDetailedSection("📖 BOOKS", BOOKS, booksRef)}
      <table style={LT}><tbody><tr>
        <td style={{ ...LC, width: "50%", paddingRight: "8px" }}>{renderDetailedSection("🎓 COURSES & PROGRAMS", COURSES, coursesRef, C.secondary)}</td>
        <td style={{ ...LC, width: "50%", paddingLeft: "8px" }}>{renderDetailedSection("📰 ARTICLES & PODCASTS", ARTICLES, articlesRef)}</td>
      </tr></tbody></table>
      {renderGoal()}{renderFooter()}
    </>
  );

  const renderQuickLayout = () => (
    <>{renderTitleBanner()}{renderDateHeader()}{renderQuickList()}{renderGoal()}{renderFooter()}</>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-sky-50/20">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-sky-50 border border-sky-100 text-sky-700 text-xs font-semibold"><BookOpen size={11} /> Learning</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/todo-master" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-sky-600 transition-colors"><ArrowLeft size={14} /> Back to To-Do Master</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-sky-100 flex items-center justify-center"><BookOpen size={20} className="text-sky-600" /></div>
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900">Reading &amp; Learning Log</h2>
              <p className="text-xs font-medium text-sky-600">Read More, Learn More, Grow More</p>
            </div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Track books, courses, and articles with key takeaways, ratings, and action items. Full Log has detailed cards per resource; Quick List is a compact table overview.</p>
        </div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Log Style</p>
          <div className="flex flex-wrap gap-2">
            {LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (
              <button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-sky-600 text-white border-sky-600 shadow-md shadow-sky-200" : "bg-white text-slate-600 border-slate-200 hover:border-sky-300 hover:text-sky-700"}`}>
                <Icon size={15} /> <span>{l.label}</span> <span className={`text-[10px] font-medium ${isActive ? "text-sky-200" : "text-slate-400"}`}>{l.desc}</span>
              </button>
            ); })}
          </div>
        </div>
        <div ref={fullPageRef} style={{ fontFamily: S.font }}>
          {layout === "full" && renderFullLayout()}
          {layout === "quick" && renderQuickLayout()}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function ReadingLearningLogPage() {
  return (<ThemeProvider><ReadingLogContent /></ThemeProvider>);
}
