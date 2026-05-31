"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, Mail, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Email", desc: "Summary + actions + decisions + next steps", icon: LayoutDashboard },
  { id: "compact", label: "Quick Email", desc: "Summary + actions only", icon: AlignJustify },
];

function FollowUpEmailContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const tipsRef = useRef<HTMLDivElement>(null);

  const accent = "#0D9488"; const accentDark = "#0F766E";

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>📧 FOLLOW-UP EMAIL TEMPLATE</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; Meetings Hub Pro &nbsp;|&nbsp; Logs &amp; Follow-Up</td></tr>
    </tbody></table>
  );

  const renderHeader = () => (
    <div ref={headerRef} style={{ marginBottom: "12px" }}>
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "18%" }}>To</td><td style={{ ...S.td0, width: "82%" }}>[Recipients — meeting attendees]</td></tr>
        <tr><td style={S.tdLabelAlt}>CC</td><td style={S.tdAlt}>[Stakeholders who need visibility but weren&apos;t in meeting]</td></tr>
        <tr><td style={S.tdLabel}>Subject</td><td style={{ ...S.td0, fontWeight: 700, color: accent }}>[Meeting Recap: [Meeting Name] — [Date] — Actions &amp; Decisions]</td></tr>
      </tbody></table>
      <CopyButton targetRef={headerRef} label="Copy Section" />
    </div>
  );

  const renderBody = () => (
    <div ref={bodyRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accent)}>📝 EMAIL BODY</td></tr></tbody></table>
      <CopyButton targetRef={bodyRef} label="Copy Section" />
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.td0, fontSize: "11px", lineHeight: "2.0", padding: "16px 20px" }}>
          Hi team,<br /><br />
          Thanks for joining today&apos;s <strong style={{ color: accent }}>[Meeting Name]</strong> on <strong>[Date]</strong>. Here&apos;s a quick recap:<br /><br />
          <strong style={{ color: accentDark, fontSize: "12px" }}>📋 KEY DISCUSSION POINTS</strong><br />
          &bull; [Discussion point 1 — brief summary]<br />
          &bull; [Discussion point 2 — brief summary]<br />
          &bull; [Discussion point 3 — brief summary]<br /><br />
          <strong style={{ color: accentDark, fontSize: "12px" }}>✅ DECISIONS MADE</strong><br />
          &bull; [Decision 1 — decided by [Name]]<br />
          &bull; [Decision 2 — decided by [Name]]<br /><br />
          <strong style={{ color: accentDark, fontSize: "12px" }}>🎯 ACTION ITEMS</strong><br />
        </td></tr>
      </tbody></table>
      <table style={S.tbl}>
        <thead><tr>
          <th style={S.thPrimary}>Action</th>
          <th style={{ ...S.thPrimary, width: "15%" }}>Owner</th>
          <th style={{ ...S.thPrimary, width: "12%", textAlign: "center" as const }}>Due Date</th>
        </tr></thead>
        <tbody>
          {[
            { action: "[Action item 1 — be specific and actionable]", owner: "[@Name]", due: "[03/10]" },
            { action: "[Action item 2 — be specific and actionable]", owner: "[@Name]", due: "[03/12]" },
            { action: "[Action item 3 — be specific and actionable]", owner: "[@Name]", due: "[03/15]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.action}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 600 }}>{r.owner}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, fontSize: "10px", color: accent }}>{r.due}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.td0, fontSize: "11px", lineHeight: "2.0", padding: "16px 20px" }}>
          <strong style={{ color: accentDark, fontSize: "12px" }}>📅 NEXT MEETING</strong><br />
          &bull; <strong>Date:</strong> [Next meeting date and time]<br />
          &bull; <strong>Focus:</strong> [What will be covered next time]<br /><br />
          Please review and let me know if I missed anything. If you have questions or need to flag a blocker before our next meeting, reach out via [Slack / Teams / email].<br /><br />
          Best,<br />
          <strong style={{ color: accent }}>[Your Name]</strong><br />
          [Your Title]
        </td></tr>
      </tbody></table>
    </div>
  );

  const renderTips = () => (
    <div ref={tipsRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accentDark)}>💡 PRO TIPS FOR FOLLOW-UP EMAILS</td></tr></tbody></table>
      <CopyButton targetRef={tipsRef} label="Copy Section" />
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.td0, fontSize: "10px", lineHeight: "1.9", padding: "12px 16px" }}>
          <strong style={{ color: accent }}>⏰ Timing:</strong> Send within 2 hours of the meeting — sooner = better. Same day is the minimum standard.<br />
          <strong style={{ color: accent }}>🎯 Subject Line:</strong> Include meeting name + date + &quot;Actions &amp; Decisions&quot; so it&apos;s searchable and scannable.<br />
          <strong style={{ color: accent }}>✅ Actions:</strong> Every action needs an owner AND a due date. No owner = no action.<br />
          <strong style={{ color: accent }}>📧 CC wisely:</strong> Include people who need visibility but weren&apos;t in the meeting. Don&apos;t over-CC.<br />
          <strong style={{ color: accent }}>📋 Format:</strong> Use bullet points, not paragraphs. Make it skimmable in 30 seconds.<br />
          <strong style={{ color: accent }}>🔄 Follow up:</strong> If actions aren&apos;t done by due date, send a brief nudge: &quot;Hi [Name], just checking on [action] — let me know if you need help.&quot;
        </td></tr>
      </tbody></table>
    </div>
  );

  const renderFooter = () => (
    <table style={{ ...S.tbl, marginTop: "8px" }}><tbody><tr>
      <td style={{ backgroundColor: C.primary, color: C.footerText, padding: "8px 20px", fontSize: "10px", fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.06em" }}>
        ExecNoteShop &nbsp;&bull;&nbsp; Meetings Hub Pro &nbsp;&bull;&nbsp; &copy; 2026 All Rights Reserved
      </td>
    </tr></tbody></table>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50/30">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-teal-500 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-teal-50 border border-teal-100 text-teal-700 text-xs font-semibold"><Mail size={11} />Email</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/meetings-hub" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-teal-600 transition-colors"><ArrowLeft size={14} />Back to Meetings Hub Pro</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-teal-100 flex items-center justify-center"><Mail size={20} className="text-teal-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">Follow-Up Email Template</h2><p className="text-xs font-medium text-teal-600">Email Body &bull; Actions Table &bull; Pro Tips</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Ready-to-send follow-up email with discussion summary, decisions, action items table, and next meeting details.</p>
        </div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">View Mode</p>
          <div className="flex flex-wrap gap-2">
            {LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (
              <button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-teal-500 text-white border-teal-500 shadow-md shadow-teal-200" : "bg-white text-slate-600 border-slate-200 hover:border-teal-300 hover:text-teal-700"}`}>
                <Icon size={15} /><span>{l.label}</span><span className={`text-[10px] font-medium ${isActive ? "text-teal-200" : "text-slate-400"}`}>{l.desc}</span>
              </button>
            ); })}
          </div>
        </div>
        <div ref={fullPageRef} style={{ fontFamily: S.font }}>
          {layout === "full" && <>{renderTitleBanner()}{renderHeader()}{renderBody()}{renderTips()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderHeader()}{renderBody()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function FollowUpEmailPage() { return <ThemeProvider><FollowUpEmailContent /></ThemeProvider>; }
