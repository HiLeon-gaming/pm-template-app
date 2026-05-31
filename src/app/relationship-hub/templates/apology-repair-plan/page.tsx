"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, Handshake, LayoutDashboard, AlignJustify, HeartHandshake } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Plan", desc: "Assessment + apology plan + follow-through + tips", icon: LayoutDashboard },
  { id: "compact", label: "Quick Plan", desc: "Assessment + apology plan only", icon: AlignJustify },
];

function RepairContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullRef = useRef<HTMLDivElement>(null);
  const assessRef = useRef<HTMLDivElement>(null);
  const planRef = useRef<HTMLDivElement>(null);
  const followRef = useRef<HTMLDivElement>(null);
  const tipsRef = useRef<HTMLDivElement>(null);

  const accent = "#EA580C";
  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>APOLOGY / REPAIR PLAN (PROFESSIONAL)</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; Relationship &amp; Stakeholder Management Hub &nbsp;|&nbsp; Confidential</td></tr>
    </tbody></table>
  );

  const renderAssess = () => (
    <div ref={assessRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner("#DC2626")}>SITUATION ASSESSMENT</td></tr></tbody></table>
      <CopyButton targetRef={assessRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>Before you apologize, understand exactly what went wrong, why, and how it affected the other person. A vague apology is worse than no apology. Be specific and honest with yourself.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "25%" }}>Area</th>
          <th style={S.thPrimary}>Your Assessment</th>
        </tr></thead>
        <tbody>
          {[
            { label: "Who Was Affected?", value: "[Name, role. How important is this relationship to your work?]" },
            { label: "What Happened?", value: "[Specifically what you did or failed to do. Facts, not excuses.]" },
            { label: "Why It Happened", value: "[Root cause. Over-committed? Forgot? Miscommunicated? Made a bad call?]" },
            { label: "Impact on Them", value: "[How did this affect them? Their project? Their reputation? Their trust in you?]" },
            { label: "How They Found Out", value: "[Did you tell them? Did they discover it? Were they blindsided? This matters.]" },
            { label: "Current State of Relationship", value: "[Are they angry? Disappointed? Silent? Have they told others?]" },
            { label: "Your Responsibility", value: "[What percentage of this is genuinely your fault? Be honest. Own what\u2019s yours.]" },
            { label: "Urgency", value: "[How quickly do you need to address this? Today? This week?]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 700, color: "#DC2626" }}>{r.label}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.value}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderPlan = () => (
    <div ref={planRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner("#D97706")}>APOLOGY &amp; REPAIR PLAN</td></tr></tbody></table>
      <CopyButton targetRef={planRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>A good professional apology has 5 parts: acknowledge, take responsibility, explain (briefly), make it right, and prevent recurrence. Plan each element before you have the conversation.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "4%", textAlign: "center" as const }}>#</th>
          <th style={{ ...S.thPrimary, width: "20%" }}>Element</th>
          <th style={S.thPrimary}>Your Plan</th>
        </tr></thead>
        <tbody>
          {[
            { n: "1", el: "Acknowledge What Happened", plan: "[State specifically what you did/didn\u2019t do. \u201CI missed the budget deadline by 3 days.\u201D Not \u201CI was a bit late.\u201D]" },
            { n: "2", el: "Take Responsibility", plan: "[Own it without qualifiers. \u201CThis was my fault\u201D not \u201CI\u2019m sorry if you felt...\u201D or \u201CThings got busy.\u201D]" },
            { n: "3", el: "Brief Explanation (Not Excuse)", plan: "[One sentence explaining why. \u201CI over-committed and didn\u2019t manage my time well.\u201D Then stop. Don\u2019t justify.]" },
            { n: "4", el: "Make It Right", plan: "[What concrete action will you take to fix or compensate? \u201CI\u2019ll have it to you by end of day with extra detail.\u201D]" },
            { n: "5", el: "Prevent Recurrence", plan: "[What will you change so this doesn\u2019t happen again? \u201CI\u2019ve set up a tracking system for all commitments.\u201D]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 800, fontSize: "12px", color: "#D97706" }}>{r.n}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 700, color: "#D97706" }}>{r.el}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.plan}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <table style={{ ...S.tbl, marginTop: "6px" }}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "25%" }}>Logistics</th>
          <th style={S.thPrimary}>Details</th>
        </tr></thead>
        <tbody>
          {[
            { label: "When Will You Apologize?", value: "[Today? Tomorrow? The sooner the better. Delays make it worse.]" },
            { label: "How? (Format)", value: "[In-person is best. Video if remote. NEVER by email for serious issues.]" },
            { label: "Opening Line", value: "[Draft it: \u201CI want to address something directly. I owe you an apology for...\u201D]" },
            { label: "What If They\u2019re Still Angry?", value: "[Let them vent. Don\u2019t get defensive. Say: \u201CI understand. That\u2019s fair.\u201D]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 700, color: accent }}>{r.label}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.value}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderFollow = () => (
    <div ref={followRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner("#059669")}>POST-APOLOGY FOLLOW-THROUGH</td></tr></tbody></table>
      <CopyButton targetRef={followRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>The apology is step one. Follow-through is what actually rebuilds trust. Words mean nothing without changed behavior.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "25%" }}>Follow-Through Item</th>
          <th style={S.thPrimary}>Details</th>
          <th style={{ ...S.thPrimary, width: "10%" }}>By When</th>
          <th style={{ ...S.thPrimary, width: "6%", textAlign: "center" as const }}>Done</th>
        </tr></thead>
        <tbody>
          {[
            { item: "Deliver the \u201Cmake it right\u201D action", detail: "[Whatever you promised to fix \u2014 do it first and fast.]", when: "[Date]", done: "\u2610" },
            { item: "Implement the prevention measure", detail: "[Set up the system, process, or habit that prevents recurrence.]", when: "[Date]", done: "\u2610" },
            { item: "Check in 1 week later", detail: "[Ask: \u201CHow are we? Is there anything else I need to address?\u201D]", when: "[Date]", done: "\u2610" },
            { item: "Check in 1 month later", detail: "[Confirm the issue hasn\u2019t recurred. Show changed behavior over time.]", when: "[Date]", done: "\u2610" },
            { item: "Over-deliver on next interaction", detail: "[Go above and beyond on your next commitment to this person. Rebuild through action.]", when: "[Date]", done: "\u2610" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 700, color: "#059669" }}>{r.item}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px" }}>{r.detail}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", color: accent, fontWeight: 600 }}>{r.when}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "14px" }}>{r.done}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderTips = () => (
    <div ref={tipsRef} style={{ marginBottom: "12px" }}>
      <CopyButton targetRef={tipsRef} label="Copy Section" />
      <table style={LT}><tbody><tr>
        <td style={{ ...LC, width: "50%", paddingRight: "4px" }}>
          <table style={S.tbl}>
            <thead><tr><td style={{ backgroundColor: "#DCFCE7", color: "#059669", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #059669" }}>WHAT MAKES A GOOD APOLOGY</td></tr></thead>
            <tbody>
              {[
                { color: "#059669", tip: "Be specific about what you\u2019re apologizing for.", detail: "\u201CI\u2019m sorry I missed the deadline\u201D > \u201CI\u2019m sorry things didn\u2019t go well.\u201D" },
                { color: "#0EA5E9", tip: "Own it completely.", detail: "No \u201Cbut,\u201D no \u201Cif,\u201D no shifting blame. \u201CThis was my fault. Full stop.\u201D" },
                { color: "#8B5CF6", tip: "Show you understand the impact.", detail: "\u201CI know this put you in a difficult position with your team.\u201D Empathy > sympathy." },
                { color: "#D97706", tip: "Follow words with action.", detail: "An apology without changed behavior is manipulation. Prove it through what you DO next." },
              ].map((r, i) => {
                const bg = i % 2 === 1 ? C.rowAlt : C.white;
                return (
                  <tr key={i}><td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", padding: "5px 10px" }}>
                    <strong style={{ color: r.color }}>{r.tip}</strong><br />
                    <span style={{ fontSize: "9px", color: C.textMuted }}>{r.detail}</span>
                  </td></tr>
                );
              })}
            </tbody>
          </table>
        </td>
        <td style={{ ...LC, width: "50%", paddingLeft: "4px" }}>
          <table style={S.tbl}>
            <thead><tr><td style={{ backgroundColor: "#FEE2E2", color: "#DC2626", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #DC2626" }}>APOLOGY KILLERS</td></tr></thead>
            <tbody>
              {[
                { color: "#DC2626", tip: "\u201CI\u2019m sorry IF you felt...\u201D", detail: "This isn\u2019t an apology. It\u2019s deflection. You\u2019re making THEM the problem." },
                { color: "#EA580C", tip: "\u201CI\u2019m sorry, BUT...\u201D", detail: "Everything before \u201Cbut\u201D is erased. Just apologize. Save the context for later if needed." },
                { color: "#D97706", tip: "Apologizing and then doing the same thing again.", detail: "Repeated apologies without behavior change = zero credibility." },
                { color: "#6366F1", tip: "Over-apologizing or being dramatic.", detail: "One sincere apology is powerful. Groveling is uncomfortable and shifts focus to YOUR feelings." },
              ].map((r, i) => {
                const bg = i % 2 === 1 ? C.rowAlt : C.white;
                return (
                  <tr key={i}><td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", padding: "5px 10px" }}>
                    <strong style={{ color: r.color }}>{r.tip}</strong><br />
                    <span style={{ fontSize: "9px", color: C.textMuted }}>{r.detail}</span>
                  </td></tr>
                );
              })}
            </tbody>
          </table>
        </td>
      </tr></tbody></table>
    </div>
  );

  const renderFooter = () => (
    <table style={{ ...S.tbl, marginTop: "8px" }}><tbody><tr>
      <td style={{ backgroundColor: C.primary, color: C.footerText, padding: "8px 20px", fontSize: "10px", fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.06em" }}>
        ExecNoteShop &bull; Relationship &amp; Stakeholder Management Hub &bull; &copy; 2026 All Rights Reserved
      </td>
    </tr></tbody></table>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-rose-50/30">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-rose-600 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-50 border border-red-100 text-red-700 text-xs font-semibold"><HeartHandshake size={11} />Repair</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/relationship-hub" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-rose-600 transition-colors"><ArrowLeft size={14} />Back to Relationship Hub</Link>
          <CopyAllButton targetRef={fullRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center"><Handshake size={20} className="text-red-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">Apology / Repair Plan</h2><p className="text-xs font-medium text-red-600">Confidential &bull; Own It &bull; Fix It &bull; Prevent It</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Everyone makes mistakes. What matters is how you handle them. This template helps you assess the damage, plan a genuine apology, and most importantly &mdash; follow through with changed behavior. A well-handled mistake can actually STRENGTHEN a relationship.</p>
        </div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">View Mode</p>
          <div className="flex flex-wrap gap-2">
            {LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (
              <button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-red-600 text-white border-red-600 shadow-md shadow-red-200" : "bg-white text-slate-600 border-slate-200 hover:border-red-300 hover:text-red-700"}`}>
                <Icon size={15} /><span>{l.label}</span><span className={`text-[10px] font-medium ${isActive ? "text-red-200" : "text-slate-400"}`}>{l.desc}</span>
              </button>
            ); })}
          </div>
        </div>
        <div ref={fullRef} style={{ fontFamily: S.font }}>
          {layout === "full" && <>{renderTitleBanner()}{renderAssess()}{renderPlan()}{renderFollow()}{renderTips()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderAssess()}{renderPlan()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullRef} /></div>
      </div>
    </div>
  );
}

export default function ApologyRepairPlanPage() { return <ThemeProvider><RepairContent /></ThemeProvider>; }
