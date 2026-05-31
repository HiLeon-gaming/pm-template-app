"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, Handshake, LayoutDashboard, AlignJustify, BookOpen } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Cheat Sheet", desc: "Roles + internal/external + warning signs + tips", icon: LayoutDashboard },
  { id: "compact", label: "Quick Reference", desc: "Roles table only", icon: AlignJustify },
];

function CheatSheetContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullRef = useRef<HTMLDivElement>(null);
  const typesRef = useRef<HTMLDivElement>(null);
  const intExtRef = useRef<HTMLDivElement>(null);
  const tipsRef = useRef<HTMLDivElement>(null);

  const accent = "#E11D48";
  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>STAKEHOLDER TYPES CHEAT SHEET</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; Relationship &amp; Stakeholder Management Hub &nbsp;|&nbsp; Quick Reference</td></tr>
    </tbody></table>
  );

  const renderTypes = () => (
    <div ref={typesRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accent)}>STAKEHOLDER ROLES &amp; HOW TO MANAGE THEM</td></tr></tbody></table>
      <CopyButton targetRef={typesRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>Each stakeholder plays a role. Understanding that role tells you how to engage them. A single person can play multiple roles &mdash; your sponsor might also be a decision maker. Manage for the highest-impact role.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "12%" }}>Type</th>
          <th style={S.thPrimary}>What They Do</th>
          <th style={S.thPrimary}>How to Manage</th>
          <th style={{ ...S.thPrimary, width: "20%" }}>Warning Sign They&apos;re Disengaged</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Cadence</th>
        </tr></thead>
        <tbody>
          {[
            { type: "Sponsor", what: "Provides political support, funding, and escalation authority for your initiative.", how: "Keep them informed and aligned. Never let them be surprised. Send brief weekly updates.", warn: "Stops responding to updates; delegates your meetings to juniors", cadence: "Weekly", color: accent },
            { type: "Champion", what: "Advocates for your work to others \u2014 even when you\u2019re not in the room.", how: "Equip them with talking points, wins, and data. Publicly recognize their support.", warn: "Stops mentioning your project; becomes neutral instead of supportive", cadence: "Biweekly", color: "#059669" },
            { type: "Decision Maker", what: "Has authority to say \u201Cyes\u201D or \u201Cno\u201D on a specific topic.", how: "Be concise. Present options with clear recommendations. Respect their time.", warn: "Defers decisions; asks for \u201Cmore analysis\u201D repeatedly; avoids committing", cadence: "As needed", color: "#8B5CF6" },
            { type: "Influencer", what: "Shapes opinions and decisions without formal authority.", how: "Build genuine relationship. Share information early. Seek their input before group meetings.", warn: "Voices concerns in public forums instead of privately; stops attending meetings", cadence: "Monthly", color: "#0EA5E9" },
            { type: "Gatekeeper", what: "Controls access to decision makers, resources, or processes.", how: "Treat with respect. Never try to bypass them. They can become powerful allies.", warn: "Starts routing you to voicemail; creates scheduling obstacles", cadence: "As needed", color: "#D97706" },
            { type: "Blocker", what: "Actively or passively prevents progress on your work.", how: "Understand their concerns first. Address root cause. Escalate only if engagement fails.", warn: "N/A \u2014 they\u2019re already blocking. Focus on converting them.", cadence: "Weekly until resolved", color: "#DC2626" },
            { type: "End User", what: "Will use the output of your work daily.", how: "Involve early. Validate assumptions. Get feedback before final delivery. They make or break adoption.", warn: "Provides only positive feedback (they\u2019ve given up); avoids demos", cadence: "Biweekly", color: "#EA580C" },
            { type: "SME", what: "Subject Matter Expert with deep domain knowledge.", how: "Consult for accuracy. Credit their contributions. Don\u2019t waste their time with broad meetings.", warn: "Responses become terse; starts declining invitations", cadence: "As needed", color: "#6366F1" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 800, color: r.color }}>{r.type}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.what}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.how}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", color: C.textMuted }}>{r.warn}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, fontSize: "10px" }}>{r.cadence}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderIntExt = () => (
    <div ref={intExtRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner("#8B5CF6")}>INTERNAL vs EXTERNAL STAKEHOLDERS</td></tr></tbody></table>
      <CopyButton targetRef={intExtRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>Internal stakeholders share your organization. External ones don&apos;t. The engagement approach differs significantly &mdash; especially around communication formality, information sharing boundaries, and escalation paths.</p>
      <table style={LT}><tbody><tr>
        <td style={{ ...LC, width: "50%", paddingRight: "4px" }}>
          <table style={S.tbl}>
            <thead><tr><td style={{ backgroundColor: "#DBEAFE", color: "#0EA5E9", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #0EA5E9" }}>INTERNAL STAKEHOLDERS</td></tr></thead>
            <tbody>
              {[
                { who: "Executive Leadership", note: "Set strategy and control budget. Need ultra-concise updates. Value confidence and clarity.", color: "#0EA5E9" },
                { who: "Your Manager", note: "Your direct sponsor. Keep them aligned on priorities and never let them be surprised by their boss.", color: "#8B5CF6" },
                { who: "Peer Teams", note: "Dependencies and handoffs. Need proactive coordination. Friction here kills timelines.", color: "#059669" },
                { who: "Direct Reports", note: "Need clarity, support, and development. Their trust in you compounds over time.", color: "#D97706" },
                { who: "PMO / Governance", note: "Need compliance and reporting. Make their job easy and they\u2019ll be your allies.", color: "#6366F1" },
              ].map((r, i) => {
                const bg = i % 2 === 1 ? C.rowAlt : C.white;
                return (
                  <tr key={i}><td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", padding: "5px 10px" }}>
                    <strong style={{ color: r.color }}>{r.who}</strong><br />
                    <span style={{ fontSize: "9px", color: C.textMuted }}>{r.note}</span>
                  </td></tr>
                );
              })}
            </tbody>
          </table>
        </td>
        <td style={{ ...LC, width: "50%", paddingLeft: "4px" }}>
          <table style={S.tbl}>
            <thead><tr><td style={{ backgroundColor: "#D1FAE5", color: "#059669", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #059669" }}>EXTERNAL STAKEHOLDERS</td></tr></thead>
            <tbody>
              {[
                { who: "Clients / Customers", note: "Revenue source. Need excellent communication, clear expectations, and follow-through.", color: "#059669" },
                { who: "Vendors / Suppliers", note: "Deliver inputs you depend on. Need clear requirements and timely payment.", color: "#D97706" },
                { who: "Regulators", note: "Compliance requirements. Need thorough documentation and proactive communication.", color: "#DC2626" },
                { who: "Partners", note: "Shared goals. Need mutual value exchange and transparent progress updates.", color: "#8B5CF6" },
                { who: "Board / Investors", note: "Governance and funding. Need confidence, not detail. Lead with outcomes.", color: "#0EA5E9" },
              ].map((r, i) => {
                const bg = i % 2 === 1 ? C.rowAlt : C.white;
                return (
                  <tr key={i}><td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", padding: "5px 10px" }}>
                    <strong style={{ color: r.color }}>{r.who}</strong><br />
                    <span style={{ fontSize: "9px", color: C.textMuted }}>{r.note}</span>
                  </td></tr>
                );
              })}
            </tbody>
          </table>
        </td>
      </tr></tbody></table>
    </div>
  );

  const renderTips = () => (
    <div ref={tipsRef} style={{ marginBottom: "12px" }}>
      <CopyButton targetRef={tipsRef} label="Copy Section" />
      <table style={LT}><tbody><tr>
        <td style={{ ...LC, width: "50%", paddingRight: "4px" }}>
          <table style={S.tbl}>
            <thead><tr><td style={{ backgroundColor: "#FEF3C7", color: "#D97706", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #D97706" }}>ENGAGEMENT RULES OF THUMB</td></tr></thead>
            <tbody>
              {[
                { color: accent, tip: "One person can play multiple roles.", detail: "Your sponsor might also be a decision maker. Manage for the highest-impact role." },
                { color: "#059669", tip: "Roles can change over time.", detail: "Today\u2019s champion could become a blocker if their priorities shift. Re-assess quarterly." },
                { color: "#0EA5E9", tip: "Blockers aren\u2019t enemies.", detail: "They usually have legitimate concerns. Address those concerns and they often become allies." },
                { color: "#8B5CF6", tip: "Influencers are the hidden power.", detail: "The person with no title but everyone\u2019s ear is often your most important stakeholder." },
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
            <thead><tr><td style={{ backgroundColor: "#FEE2E2", color: "#DC2626", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #DC2626" }}>COMMON MISTAKES</td></tr></thead>
            <tbody>
              {[
                { color: "#DC2626", tip: "Treating all stakeholders the same.", detail: "A sponsor needs different engagement than an end user. Tailor your approach." },
                { color: "#EA580C", tip: "Ignoring gatekeepers.", detail: "Bypassing an EA or Chief of Staff creates enemies. Win them over first." },
                { color: "#D97706", tip: "Over-communicating with decision makers.", detail: "They want options + a recommendation, not a 30-slide deck. Be concise." },
                { color: "#6366F1", tip: "Forgetting about silent stakeholders.", detail: "People who don\u2019t speak up often have the most to lose. Check in proactively." },
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
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-50 border border-rose-100 text-rose-700 text-xs font-semibold"><BookOpen size={11} />Reference</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/relationship-hub" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-rose-600 transition-colors"><ArrowLeft size={14} />Back to Relationship Hub</Link>
          <CopyAllButton targetRef={fullRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-rose-100 flex items-center justify-center"><Handshake size={20} className="text-rose-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">Stakeholder Types Cheat Sheet</h2><p className="text-xs font-medium text-rose-600">Know Who You&apos;re Working With &bull; Quick Reference</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">A quick reference for the different types of stakeholders you&apos;ll encounter, how to manage each type, what warning signs to watch for, and the most common engagement mistakes. Print this out or keep it bookmarked.</p>
        </div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">View Mode</p>
          <div className="flex flex-wrap gap-2">
            {LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (
              <button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-rose-600 text-white border-rose-600 shadow-md shadow-rose-200" : "bg-white text-slate-600 border-slate-200 hover:border-rose-300 hover:text-rose-700"}`}>
                <Icon size={15} /><span>{l.label}</span><span className={`text-[10px] font-medium ${isActive ? "text-rose-200" : "text-slate-400"}`}>{l.desc}</span>
              </button>
            ); })}
          </div>
        </div>
        <div ref={fullRef} style={{ fontFamily: S.font }}>
          {layout === "full" && <>{renderTitleBanner()}{renderTypes()}{renderIntExt()}{renderTips()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderTypes()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullRef} /></div>
      </div>
    </div>
  );
}

export default function StakeholderTypesCheatSheetPage() { return <ThemeProvider><CheatSheetContent /></ThemeProvider>; }
