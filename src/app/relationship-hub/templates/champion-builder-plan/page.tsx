"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, Handshake, LayoutDashboard, AlignJustify, Shield } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Plan", desc: "Profile + activation + nurture + tips", icon: LayoutDashboard },
  { id: "compact", label: "Quick Plan", desc: "Profile + activation only", icon: AlignJustify },
];

function ChampionContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const activateRef = useRef<HTMLDivElement>(null);
  const nurtureRef = useRef<HTMLDivElement>(null);
  const tipsRef = useRef<HTMLDivElement>(null);

  const accent = "#0EA5E9";
  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>CHAMPION BUILDER PLAN</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; Relationship &amp; Stakeholder Management Hub &nbsp;|&nbsp; Build Your Advocates</td></tr>
    </tbody></table>
  );

  const renderProfile = () => (
    <div ref={profileRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(accent)}>CHAMPION IDENTIFICATION</div>
      <CopyButton targetRef={profileRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>Champions are stakeholders who actively advocate for your work when you&apos;re not in the room. Identify who has the potential to be a champion and understand what motivates them to support you.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "25%" }}>Area</th>
          <th style={S.thPrimary}>Your Notes</th>
          <th style={{ ...S.thPrimary, width: "25%" }}>Why This Matters</th>
        </tr></thead>
        <tbody>
          {[
            { label: "Champion Name & Role", value: "[Full name, title, team]", why: "Know their exact position and sphere of influence." },
            { label: "Why They Could Champion You", value: "[Your work aligns with their goals; they benefit from your success]", why: "Champions need a reason. Make it about THEM, not you." },
            { label: "Their Sphere of Influence", value: "[Who listens to them? What meetings are they in? What decisions do they shape?]", why: "A champion is only useful if they influence people you can\u2019t reach directly." },
            { label: "Current Relationship Strength", value: "[Strong / Growing / New / Needs work]", why: "You can\u2019t ask someone to champion you if the relationship isn\u2019t solid first." },
            { label: "What They Care About", value: "[Their KPIs, priorities, what keeps them up at night]", why: "Frame your work in terms of what THEY care about." },
            { label: "What You\u2019ve Done for Them", value: "[How have you helped them? What value have you delivered?]", why: "Champions advocate because you\u2019ve earned it. Build the case." },
            { label: "Champion Readiness", value: "[Ready to activate / Needs more investment / Long-term prospect]", why: "Don\u2019t push too early. Some champions need time to develop." },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 700, color: accent }}>{r.label}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.value}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", color: C.textMuted }}>{r.why}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderActivation = () => (
    <div ref={activateRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner("#059669")}>CHAMPION ACTIVATION STRATEGY</div>
      <CopyButton targetRef={activateRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>Once you&apos;ve identified a potential champion, you need a deliberate strategy to activate them. Give them the tools, information, and motivation to advocate on your behalf.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "25%" }}>Strategy Area</th>
          <th style={S.thPrimary}>Your Plan</th>
        </tr></thead>
        <tbody>
          {[
            { label: "Talking Points to Share", value: "[3\u20135 key messages they can use when advocating. Make it easy for them to repeat.]" },
            { label: "Data / Evidence to Provide", value: "[ROI numbers, success metrics, customer feedback \u2014 ammunition for their advocacy.]" },
            { label: "Key Meetings to Brief Them For", value: "[Upcoming forums where they can speak up. Brief them 48h before.]" },
            { label: "How to Make Them Look Good", value: "[Credit them publicly. Share wins that reflect well on them. Their success = your success.]" },
            { label: "What to Ask Them to Do", value: "[Be specific: \u201CMention our Q1 results in the leadership meeting\u201D not \u201CSupport our project.\u201D]" },
            { label: "Feedback Loop", value: "[How will you know if their advocacy is working? Ask them what pushback they\u2019re hearing.]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 700, color: "#059669" }}>{r.label}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.value}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderNurture = () => (
    <div ref={nurtureRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner("#D97706")}>CHAMPION NURTURE PLAN</div>
      <CopyButton targetRef={nurtureRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>Champions burn out if you only take and never give. Maintain the relationship with consistent investment.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "25%" }}>Nurture Action</th>
          <th style={S.thPrimary}>Details</th>
          <th style={{ ...S.thPrimary, width: "12%", textAlign: "center" as const }}>Frequency</th>
        </tr></thead>
        <tbody>
          {[
            { action: "Share wins they enabled", detail: "Send a quick note: \u201CJust wanted you to know \u2014 the initiative you championed delivered $X.\u201D", freq: "Monthly" },
            { action: "Credit them publicly", detail: "Mention their support in reviews, reports, and leadership updates.", freq: "Quarterly" },
            { action: "Keep them informed first", detail: "Give them early access to news so they\u2019re never caught off-guard.", freq: "As needed" },
            { action: "Ask for their input", detail: "Engage them as a thought partner, not just a megaphone. Value their perspective.", freq: "Monthly" },
            { action: "Introduce them to your network", detail: "Connect them with people who can help their goals. Reciprocity builds loyalty.", freq: "Quarterly" },
            { action: "Check: is this still working for them?", detail: "Ask directly: \u201CIs this still valuable for you? Anything I should change?\u201D", freq: "Quarterly" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 700, color: "#D97706" }}>{r.action}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px" }}>{r.detail}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", textAlign: "center" as const, color: C.textMuted }}>{r.freq}</td>
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
            <thead><tr><td style={{ backgroundColor: "#DBEAFE", color: "#0EA5E9", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #0EA5E9" }}>CHAMPION BUILDING RULES</td></tr></thead>
            <tbody>
              {[
                { color: "#0EA5E9", tip: "Champions advocate because they WANT to, not because you asked.", detail: "Earn their advocacy by delivering value to them first. Never pressure." },
                { color: "#059669", tip: "Make it ridiculously easy for them.", detail: "Pre-write the talking points. Send the data. Draft the email. Remove all friction." },
                { color: "#8B5CF6", tip: "Multiple champions > one champion.", detail: "Don\u2019t depend on a single advocate. Build a network of 3\u20135 champions across different functions." },
                { color: "#D97706", tip: "Champions need maintenance.", detail: "They\u2019re not set-and-forget. Invest in the relationship continuously or they\u2019ll stop advocating." },
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
            <thead><tr><td style={{ backgroundColor: "#FEF3C7", color: "#D97706", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #D97706" }}>CHAMPION KILLERS</td></tr></thead>
            <tbody>
              {[
                { color: "#DC2626", tip: "Taking their advocacy for granted.", detail: "If you stop investing, they stop advocating. It\u2019s that simple." },
                { color: "#EA580C", tip: "Surprising them with bad news.", detail: "If your champion gets blindsided, they lose credibility \u2014 and you lose a champion." },
                { color: "#D97706", tip: "Not delivering on your promises.", detail: "They put their reputation on the line for you. If you fail to deliver, they pay the price." },
                { color: "#6366F1", tip: "Only reaching out when you need something.", detail: "Champions aren\u2019t tools. They\u2019re partners. Treat the relationship as mutual." },
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
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-sky-50 border border-sky-100 text-sky-700 text-xs font-semibold"><Shield size={11} />Advocacy</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/relationship-hub" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-rose-600 transition-colors"><ArrowLeft size={14} />Back to Relationship Hub</Link>
          <CopyAllButton targetRef={fullRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-sky-100 flex items-center justify-center"><Handshake size={20} className="text-sky-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">Champion Builder Plan</h2><p className="text-xs font-medium text-sky-600">Build Advocates Who Speak for You When You&apos;re Not in the Room</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Champions are stakeholders who actively promote your work in meetings you don&apos;t attend. They amplify your message, defend your priorities, and open doors you can&apos;t open alone. This plan helps you identify, activate, and nurture champions intentionally.</p>
        </div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">View Mode</p>
          <div className="flex flex-wrap gap-2">
            {LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (
              <button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-sky-600 text-white border-sky-600 shadow-md shadow-sky-200" : "bg-white text-slate-600 border-slate-200 hover:border-sky-300 hover:text-sky-700"}`}>
                <Icon size={15} /><span>{l.label}</span><span className={`text-[10px] font-medium ${isActive ? "text-sky-200" : "text-slate-400"}`}>{l.desc}</span>
              </button>
            ); })}
          </div>
        </div>
        <div ref={fullRef} style={{ fontFamily: S.font }}>
          {layout === "full" && <>{renderTitleBanner()}{renderProfile()}{renderActivation()}{renderNurture()}{renderTips()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderProfile()}{renderActivation()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullRef} /></div>
      </div>
    </div>
  );
}

export default function ChampionBuilderPlanPage() { return <ThemeProvider><ChampionContent /></ThemeProvider>; }
