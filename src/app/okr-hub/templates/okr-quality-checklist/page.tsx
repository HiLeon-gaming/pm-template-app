"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, CheckCircle, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Checklist", desc: "Objective tests + KR tests + common mistakes + examples", icon: LayoutDashboard },
  { id: "compact", label: "Quick Check", desc: "Checklist only", icon: AlignJustify },
];

function QualityCheckContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullRef = useRef<HTMLDivElement>(null);
  const objRef = useRef<HTMLDivElement>(null);
  const krRef = useRef<HTMLDivElement>(null);
  const mistakesRef = useRef<HTMLDivElement>(null);
  const exRef = useRef<HTMLDivElement>(null);

  const accent = "#7C3AED";

  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>OKR QUALITY CHECKLIST</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; OKR &amp; Operating Rhythm Hub &nbsp;|&nbsp; Are Your Goals Good Enough?</td></tr>
    </tbody></table>
  );

  const renderObj = () => (
    <div ref={objRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accent)}>OBJECTIVE QUALITY TEST</td></tr></tbody></table>
      <CopyButton targetRef={objRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>Run each of your Objectives through these tests. A great Objective passes ALL of them. If it fails any, rewrite it before proceeding.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "5%", textAlign: "center" as const }}>#</th>
          <th style={S.thPrimary}>Test Question</th>
          <th style={{ ...S.thPrimary, width: "30%" }}>What &ldquo;Pass&rdquo; Looks Like</th>
          <th style={{ ...S.thPrimary, width: "6%", textAlign: "center" as const }}>Pass?</th>
        </tr></thead>
        <tbody>
          {[
            { q: "Is it clear what we want to achieve?", pass: "Anyone on the team can explain it in their own words without ambiguity." },
            { q: "Is it inspiring and motivating?", pass: "People nod and say \"yes, that matters\" — not \"so what?\"" },
            { q: "Is it qualitative (not a number)?", pass: "The Objective describes a direction, not a specific metric. Numbers belong in Key Results." },
            { q: "Can we achieve meaningful progress in one quarter?", pass: "Not so big it takes a year, not so small it's done in a week." },
            { q: "Does it align to an annual theme or company priority?", pass: "You can draw a clear line from this Objective to a higher-level goal." },
            { q: "Is it outcome-focused (not activity-focused)?", pass: "\"Improve customer experience\" = good. \"Run 10 surveys\" = activity, not outcome." },
            { q: "Do we have only 2–3 Objectives total?", pass: "If you have more than 3, you don't have focus. Cut the weakest ones." },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 800, fontSize: "14px", color: accent }}>{i + 1}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 600 }}>{r.q}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", color: C.textMuted }}>{r.pass}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "14px" }}>&#9744;</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderKR = () => (
    <div ref={krRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner("#059669")}>KEY RESULT QUALITY TEST</td></tr></tbody></table>
      <CopyButton targetRef={krRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>Run each Key Result through these tests. Great Key Results pass ALL of them. Bad Key Results cause confusion and wasted effort.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "5%", textAlign: "center" as const }}>#</th>
          <th style={S.thPrimary}>Test Question</th>
          <th style={{ ...S.thPrimary, width: "30%" }}>What &ldquo;Pass&rdquo; Looks Like</th>
          <th style={{ ...S.thPrimary, width: "6%", textAlign: "center" as const }}>Pass?</th>
        </tr></thead>
        <tbody>
          {[
            { q: "Does it have a specific number?", pass: "\"Reduce from 18 to 6\" — not \"improve support.\"" },
            { q: "Is there a clear baseline (starting point)?", pass: "You know EXACTLY where you are today." },
            { q: "Is there a clear target (finish line)?", pass: "You know EXACTLY where you need to be by end of quarter." },
            { q: "Can you measure it objectively?", pass: "No debates about whether you hit it. The number tells the truth." },
            { q: "Is it an OUTCOME, not an OUTPUT?", pass: "\"Reduce wait time to 6 hrs\" = outcome. \"Send 100 emails\" = output." },
            { q: "Does it have a single owner?", pass: "One person's name — not a team, not \"shared.\"" },
            { q: "Is it ambitious but achievable?", pass: "You're at about 60–70% confidence you can hit it. Stretch, don't fantasy." },
            { q: "Can you update it weekly?", pass: "The data exists and someone can check it every week." },
            { q: "Do you have 2–3 KRs per Objective?", pass: "More than 3 = too complex. Fewer than 2 = not enough proof." },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 800, fontSize: "14px", color: "#059669" }}>{i + 1}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 600 }}>{r.q}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", color: C.textMuted }}>{r.pass}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "14px" }}>&#9744;</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderMistakesAndEx = () => (
    <div ref={mistakesRef} style={{ marginBottom: "12px" }}>
      <CopyButton targetRef={mistakesRef} label="Copy Section" />
      <table style={LT}><tbody><tr>
        <td style={{ ...LC, width: "50%", paddingRight: "4px" }}>
          <table style={S.tbl}>
            <thead><tr><td style={{ backgroundColor: "#FEE2E2", color: "#DC2626", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #DC2626" }}> COMMON MISTAKES</td></tr></thead>
            <tbody>
              {[
                { mistake: "Tasks as KRs ('Launch website')", fix: "Ask: 'What OUTCOME does this produce?' Use that." },
                { mistake: "No baseline ('Increase revenue')", fix: "Always: 'from $X to $Y'. Know where you are NOW." },
                { mistake: "Too many OKRs (5+ objectives)", fix: "Cut to 2–3 objectives, 2–3 KRs each. 6–9 total." },
                { mistake: "Can't measure weekly", fix: "If you can't check weekly, you won't know until too late." },
                { mistake: "Sandbagging (too easy)", fix: "60–70% confidence = right stretch level." },
                { mistake: "No owner assigned", fix: "ONE person accountable. Not a committee." },
              ].map((r, i) => {
                const bg = i % 2 === 1 ? C.rowAlt : C.white;
                return (
                  <tr key={i}>
                    <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", padding: "5px 10px" }}>
                      <strong style={{ color: "#DC2626" }}>{r.mistake}</strong><br />
                      <span style={{ fontSize: "9px", color: C.textMuted }}>{r.fix}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </td>
        <td style={{ ...LC, width: "50%", paddingLeft: "4px" }}>
          <table style={S.tbl}>
            <thead><tr><td style={{ backgroundColor: "#FEF3C7", color: "#D97706", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #D97706" }}> GOOD vs BAD EXAMPLES</td></tr></thead>
            <tbody>
              {[
                { bad: "Obj: Improve marketing", good: "Obj: Go-to brand for mid-market ops teams", why: "Specific + aspirational" },
                { bad: "KR: Run 5 campaigns", good: "KR: Leads from 200 → 400/mo", why: "Outcome, not activity" },
                { bad: "KR: Improve support", good: "KR: Wait time 18h → 6h", why: "Baseline + target" },
                { bad: "Obj: Make more money", good: "Obj: Repeatable enterprise sales engine", why: "Directional + inspiring" },
              ].map((r, i) => {
                const bg = i % 2 === 1 ? C.rowAlt : C.white;
                return (
                  <tr key={i}>
                    <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", padding: "5px 10px" }}>
                      <span style={{ color: "#DC2626" }}>&#10060; {r.bad}</span><br />
                      <span style={{ color: "#059669", fontWeight: 700 }}>&#9989; {r.good}</span><br />
                      <span style={{ fontSize: "9px", color: C.textMuted }}>{r.why}</span>
                    </td>
                  </tr>
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
        ExecNoteShop &bull; OKR &amp; Operating Rhythm Hub &bull; &copy; 2026 All Rights Reserved
      </td>
    </tr></tbody></table>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-violet-50/30">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-violet-600 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-violet-50 border border-violet-100 text-violet-700 text-xs font-semibold"><CheckCircle size={11} />Quality</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/okr-hub" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-violet-600 transition-colors"><ArrowLeft size={14} />Back to OKR Hub</Link>
          <CopyAllButton targetRef={fullRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-violet-100 flex items-center justify-center"><CheckCircle size={20} className="text-violet-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">OKR Quality Checklist</h2><p className="text-xs font-medium text-violet-600">Test Your Goals Before You Commit</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Tests whether your objectives are clear and key results are measurable. Run every OKR through this before finalizing.</p>
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
        <div ref={fullRef} style={{ fontFamily: S.font }}>
          {layout === "full" && <>{renderTitleBanner()}{renderObj()}{renderKR()}{renderMistakesAndEx()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderObj()}{renderKR()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullRef} /></div>
      </div>
    </div>
  );
}

export default function OKRQualityChecklistPage() { return <ThemeProvider><QualityCheckContent /></ThemeProvider>; }
