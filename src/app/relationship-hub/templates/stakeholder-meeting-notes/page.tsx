"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, Handshake, LayoutDashboard, AlignJustify, FileText } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Notes", desc: "Summary + decisions + actions + tips", icon: LayoutDashboard },
  { id: "compact", label: "Quick Notes", desc: "Decisions + actions only", icon: AlignJustify },
];

function NotesContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullRef = useRef<HTMLDivElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);
  const decisionsRef = useRef<HTMLDivElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);
  const tipsRef = useRef<HTMLDivElement>(null);

  const accent = "#059669";
  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>STAKEHOLDER MEETING NOTES</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; Relationship &amp; Stakeholder Management Hub &nbsp;|&nbsp; Decisions + Actions + Accountability</td></tr>
    </tbody></table>
  );

  const renderSummary = () => (
    <div ref={summaryRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accent)}>MEETING SUMMARY</td></tr></tbody></table>
      <CopyButton targetRef={summaryRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>Capture the essentials within 30 minutes of the meeting ending. Focus on outputs (decisions, actions), not a transcript of the discussion.</p>
      <table style={S.tbl}>
        <tbody>
          {[
            { label: "Meeting Title", value: "[Descriptive title]" },
            { label: "Date / Time", value: "[When did it happen?]" },
            { label: "Attendees", value: "[Who was there? Note anyone who was invited but absent.]" },
            { label: "Purpose", value: "[Why did we meet?]" },
            { label: "Key Discussion Points", value: "[3–5 bullet points summarizing the main topics discussed. Not a transcript.]" },
            { label: "Tone / Sentiment", value: "[How did the meeting feel? Productive? Tense? Aligned? Confused?]" },
            { label: "Surprises / New Information", value: "[Anything unexpected that emerged?]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 700, color: accent, width: "25%" }}>{r.label}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.value}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderDecisions = () => (
    <div ref={decisionsRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner("#6366F1")}>DECISIONS MADE</td></tr></tbody></table>
      <CopyButton targetRef={decisionsRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>Every decision should be explicit. If it wasn&apos;t stated clearly, it wasn&apos;t decided. Ambiguity here causes problems later.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "4%", textAlign: "center" as const }}>#</th>
          <th style={S.thPrimary}>Decision</th>
          <th style={{ ...S.thPrimary, width: "12%" }}>Decided By</th>
          <th style={{ ...S.thPrimary, width: "25%" }}>Conditions / Caveats</th>
        </tr></thead>
        <tbody>
          {[
            { n: "1", decision: "[What was specifically decided?]", by: "[Who made the call?]", caveats: "[Any conditions, caveats, or dependencies?]" },
            { n: "2", decision: "[Second decision]", by: "[Who]", caveats: "[Conditions]" },
            { n: "3", decision: "[Third decision]", by: "[Who]", caveats: "[Conditions]" },
            { n: "4", decision: "[Add more as needed]", by: "[Who]", caveats: "[Conditions]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 800, fontSize: "10px" }}>{r.n}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", fontWeight: 600 }}>{r.decision}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", fontWeight: 700 }}>{r.by}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", color: C.textMuted }}>{r.caveats}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderActions = () => (
    <div ref={actionsRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner("#DC2626")}>ACTION ITEMS</td></tr></tbody></table>
      <CopyButton targetRef={actionsRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>Every action needs an owner and a deadline. Actions without owners don&apos;t get done. Actions without deadlines get done &quot;eventually&quot; (i.e., never).</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "4%", textAlign: "center" as const }}>#</th>
          <th style={S.thPrimary}>Action</th>
          <th style={{ ...S.thPrimary, width: "10%" }}>Owner</th>
          <th style={{ ...S.thPrimary, width: "10%" }}>Due Date</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Status</th>
        </tr></thead>
        <tbody>
          {[
            { n: "1", action: "[Specific, actionable task]", owner: "[Name]", due: "[Date]", status: "Pending" },
            { n: "2", action: "[Second action]", owner: "[Name]", due: "[Date]", status: "Pending" },
            { n: "3", action: "[Third action]", owner: "[Name]", due: "[Date]", status: "Pending" },
            { n: "4", action: "[Fourth action]", owner: "[Name]", due: "[Date]", status: "Pending" },
            { n: "5", action: "[Add more as needed]", owner: "[Name]", due: "[Date]", status: "Pending" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 800, fontSize: "10px" }}>{r.n}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px" }}>{r.action}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", fontWeight: 700 }}>{r.owner}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", color: "#DC2626", fontWeight: 600 }}>{r.due}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(C.badgeAmberBg, C.badgeAmberFg)}>{r.status}</span></td>
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
            <thead><tr><td style={{ backgroundColor: "#DCFCE7", color: "#059669", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #059669" }}>NOTE-TAKING BEST PRACTICES</td></tr></thead>
            <tbody>
              {[
                { color: "#059669", tip: "Capture within 30 minutes.", detail: "Memory degrades fast. Get the key points down while they’re fresh." },
                { color: "#0EA5E9", tip: "Focus on outputs, not process.", detail: "Nobody needs a transcript. Capture decisions, actions, and key insights." },
                { color: "#8B5CF6", tip: "Be explicit about what was decided.", detail: "Ambiguous notes lead to “I thought we agreed on X” conversations later." },
                { color: "#D97706", tip: "Note who said what for decisions.", detail: "Attribution matters. If a decision is questioned later, you need to know who made the call." },
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
            <thead><tr><td style={{ backgroundColor: "#FEF3C7", color: "#D97706", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #D97706" }}>AFTER THE MEETING</td></tr></thead>
            <tbody>
              {[
                { color: "#D97706", tip: "Send follow-up email within 24 hours.", detail: "Use the Follow-Up Email Builder. Recap decisions, actions, owners, deadlines." },
                { color: "#DC2626", tip: "Transfer actions to your trackers.", detail: "Add to Commitments Log and Follow-Up Queue immediately." },
                { color: "#EA580C", tip: "Update stakeholder profiles.", detail: "New intel about their priorities or concerns? Update their profile page." },
                { color: "#059669", tip: "Link to Meeting History.", detail: "Add this note to the stakeholder’s Meeting History Index for future reference." },
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
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-semibold"><FileText size={11} />Post-Meeting</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/relationship-hub" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-rose-600 transition-colors"><ArrowLeft size={14} />Back to Relationship Hub</Link>
          <CopyAllButton targetRef={fullRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center"><Handshake size={20} className="text-emerald-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">Meeting Notes + Decisions + Actions</h2><p className="text-xs font-medium text-emerald-600">Post-Meeting &bull; Capture Outputs for Accountability</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Capture the outputs of every stakeholder meeting cleanly: what was discussed, what was decided, and what actions were assigned. These notes become your accountability record and prevent the &quot;I thought we agreed on X&quot; conversations.</p>
        </div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">View Mode</p>
          <div className="flex flex-wrap gap-2">
            {LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (
              <button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-200" : "bg-white text-slate-600 border-slate-200 hover:border-emerald-300 hover:text-emerald-700"}`}>
                <Icon size={15} /><span>{l.label}</span><span className={`text-[10px] font-medium ${isActive ? "text-emerald-200" : "text-slate-400"}`}>{l.desc}</span>
              </button>
            ); })}
          </div>
        </div>
        <div ref={fullRef} style={{ fontFamily: S.font }}>
          {layout === "full" && <>{renderTitleBanner()}{renderSummary()}{renderDecisions()}{renderActions()}{renderTips()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderDecisions()}{renderActions()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullRef} /></div>
      </div>
    </div>
  );
}

export default function StakeholderMeetingNotesPage() { return <ThemeProvider><NotesContent /></ThemeProvider>; }
