"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, Handshake, LayoutDashboard, AlignJustify, Mail } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Builder", desc: "Email template + examples + tips", icon: LayoutDashboard },
  { id: "compact", label: "Quick Builder", desc: "Email template only", icon: AlignJustify },
];

function EmailContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullRef = useRef<HTMLDivElement>(null);
  const templateRef = useRef<HTMLDivElement>(null);
  const exampleRef = useRef<HTMLDivElement>(null);
  const tipsRef = useRef<HTMLDivElement>(null);

  const accent = "#059669";
  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>FOLLOW-UP EMAIL BUILDER</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; Relationship &amp; Stakeholder Management Hub &nbsp;|&nbsp; Copy / Paste Ready</td></tr>
    </tbody></table>
  );

  const renderTemplate = () => (
    <div ref={templateRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accent)}>EMAIL BUILDER &mdash; FILL IN &amp; SEND</td></tr></tbody></table>
      <CopyButton targetRef={templateRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>Fill in each section below, then copy the entire email body into your email client. Send within 24 hours of the meeting. The faster you send, the more professional you look.</p>
      <table style={S.tbl}>
        <tbody>
          {[
            { label: "Subject Line", value: "[Action Required] Follow-Up: [Meeting Title] — [Date]" },
            { label: "To", value: "[All attendees]" },
            { label: "CC", value: "[Anyone who needs visibility but wasn’t in the meeting]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 700, color: accent, width: "15%" }}>{r.label}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.value}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <table style={{ ...S.tbl, marginTop: "6px" }}>
        <thead><tr><th style={{ ...S.thPrimary, textAlign: "left" as const }}>Email Body (Copy This)</th></tr></thead>
        <tbody>
          <tr><td style={{ ...S.td0, fontSize: "10px", padding: "12px 16px", lineHeight: "1.7" }}>
            Hi team,<br /><br />
            Thanks for the productive discussion today. Here&apos;s a quick recap of what we covered, decided, and committed to:<br /><br />
            <strong style={{ color: accent }}>WHAT WE DISCUSSED:</strong><br />
            &bull; [Key discussion point 1]<br />
            &bull; [Key discussion point 2]<br />
            &bull; [Key discussion point 3]<br /><br />
            <strong style={{ color: "#6366F1" }}>DECISIONS MADE:</strong><br />
            &bull; [Decision 1] &mdash; decided by [Name]<br />
            &bull; [Decision 2] &mdash; decided by [Name]<br /><br />
            <strong style={{ color: "#DC2626" }}>ACTION ITEMS:</strong><br />
            &bull; [Action 1] &mdash; Owner: [Name] &mdash; Due: [Date]<br />
            &bull; [Action 2] &mdash; Owner: [Name] &mdash; Due: [Date]<br />
            &bull; [Action 3] &mdash; Owner: [Name] &mdash; Due: [Date]<br /><br />
            <strong style={{ color: "#D97706" }}>NEXT STEPS:</strong><br />
            &bull; Next meeting: [Date/Time]<br />
            &bull; [Any other follow-up needed]<br /><br />
            Please reply to confirm your action items or flag any corrections by [Date].<br /><br />
            Thanks,<br />
            [Your Name]
          </td></tr>
        </tbody>
      </table>
    </div>
  );

  const renderExample = () => (
    <div ref={exampleRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner("#6366F1")}>EXAMPLE: COMPLETED EMAIL</td></tr></tbody></table>
      <CopyButton targetRef={exampleRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr><th style={{ ...S.thPrimary, textAlign: "left" as const }}>Example Follow-Up</th></tr></thead>
        <tbody>
          <tr><td style={{ ...S.td0, fontSize: "10px", padding: "12px 16px", lineHeight: "1.7", backgroundColor: "#F8FAFC" }}>
            <strong>Subject:</strong> [Action Required] Follow-Up: Vendor Selection Review — March 13<br /><br />
            Hi Maria, David, James,<br /><br />
            Thanks for the productive discussion today. Here&apos;s a quick recap:<br /><br />
            <strong style={{ color: accent }}>WHAT WE DISCUSSED:</strong><br />
            &bull; Reviewed 3 vendor options for the data platform<br />
            &bull; Discussed budget implications of Option B vs Option C<br />
            &bull; Addressed security concerns raised by James<br /><br />
            <strong style={{ color: "#6366F1" }}>DECISIONS MADE:</strong><br />
            &bull; Proceed with Option B (Vendor X) — decided by Maria<br />
            &bull; Allocate additional $15K for security audit — approved by David<br /><br />
            <strong style={{ color: "#DC2626" }}>ACTION ITEMS:</strong><br />
            &bull; Send contract to Legal for review — Owner: [Your Name] — Due: Mar 15<br />
            &bull; Schedule security audit kickoff — Owner: James — Due: Mar 18<br />
            &bull; Confirm budget allocation in system — Owner: David — Due: Mar 16<br /><br />
            <strong style={{ color: "#D97706" }}>NEXT STEPS:</strong><br />
            &bull; Next check-in: March 20, 2pm<br />
            &bull; Contract expected back from Legal by March 22<br /><br />
            Please reply to confirm your action items by end of day Friday.<br /><br />
            Thanks,<br />
            [Your Name]
          </td></tr>
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
            <thead><tr><td style={{ backgroundColor: "#DCFCE7", color: "#059669", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #059669" }}>FOLLOW-UP EMAIL RULES</td></tr></thead>
            <tbody>
              {[
                { color: "#059669", tip: "Send within 24 hours.", detail: "Same day is ideal. Next morning at latest. After that, momentum is lost." },
                { color: "#0EA5E9", tip: "Lead with decisions and actions.", detail: "People skim. Put the important stuff first, discussion summary second." },
                { color: "#8B5CF6", tip: "Every action needs an owner AND a date.", detail: "\"We need to do X\" is useless. \"James will do X by March 18\" is actionable." },
                { color: "#D97706", tip: "Ask for confirmation.", detail: "\"Please reply to confirm\" creates accountability and catches misunderstandings early." },
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
            <thead><tr><td style={{ backgroundColor: "#FEF3C7", color: "#D97706", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #D97706" }}>COMMON MISTAKES</td></tr></thead>
            <tbody>
              {[
                { color: "#DC2626", tip: "Writing a novel.", detail: "Keep it under 200 words. If people have to scroll, they won't read it." },
                { color: "#EA580C", tip: "Burying the actions at the bottom.", detail: "Actions should be visually distinct and easy to find. Bold them. Use bullets." },
                { color: "#D97706", tip: "Forgetting to CC relevant stakeholders.", detail: "Anyone who needs visibility should be on the email, even if they weren't in the meeting." },
                { color: "#6366F1", tip: "Not sending one at all.", detail: "No follow-up = no accountability. It's the single most important post-meeting action." },
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
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-semibold"><Mail size={11} />Copy/Paste</span>
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
            <div><h2 className="text-2xl font-extrabold text-slate-900">Follow-Up Email Builder</h2><p className="text-xs font-medium text-emerald-600">Copy/Paste Ready &bull; Send Within 24 Hours</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">A ready-to-use follow-up email template. Fill in the blanks, copy the email body, and send. Covers what was discussed, what was decided, action items with owners and dates, and next steps. The fastest way to create accountability after any meeting.</p>
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
          {layout === "full" && <>{renderTitleBanner()}{renderTemplate()}{renderExample()}{renderTips()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderTemplate()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullRef} /></div>
      </div>
    </div>
  );
}

export default function FollowUpEmailBuilderPage() { return <ThemeProvider><EmailContent /></ThemeProvider>; }
