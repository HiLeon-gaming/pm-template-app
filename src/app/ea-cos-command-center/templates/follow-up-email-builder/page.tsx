"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, Mail, LayoutDashboard, AlignJustify, Zap } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Email", desc: "Header + body + tips", icon: LayoutDashboard },
  { id: "compact", label: "Quick Email", desc: "Copy-paste email only", icon: AlignJustify },
];

function FollowUpEmailContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const emailRef = useRef<HTMLDivElement>(null);
  const tipsRef = useRef<HTMLDivElement>(null);

  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };
  const accent = "#F59E0B";

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>FOLLOW-UP EMAIL BUILDER</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; EA / Chief of Staff Command Center &nbsp;|&nbsp; &#11088; All-Star &nbsp;|&nbsp; Meetings Engine</td></tr>
    </tbody></table>
  );

  const renderEmail = () => (
    <div ref={emailRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accent)}>EMAIL TEMPLATE</td></tr></tbody></table>
      <CopyButton targetRef={emailRef} label="Copy Section" />
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "12%" }}>To</td><td style={S.td0}>[Recipients]</td></tr>
        <tr><td style={S.tdLabelAlt}>CC</td><td style={S.tdAlt}>[CC list]</td></tr>
        <tr><td style={S.tdLabel}>Subject</td><td style={{ ...S.td0, fontWeight: 700 }}>Recap: [Meeting Name] &mdash; [Date] &mdash; Decisions &amp; Actions</td></tr>
      </tbody></table>
      <table style={{ ...S.tbl, marginTop: "4px" }}><tbody>
        <tr><td style={{ ...S.td0, fontSize: "10px", lineHeight: "2.0", padding: "16px 20px" }}>
          Hi team,<br /><br />
          Thanks for your time today. Here&apos;s a quick recap from our [meeting name] on [date]:<br /><br />
          <strong style={{ color: accent, fontSize: "11px" }}>KEY DISCUSSION POINTS:</strong><br />
          &bull; [Topic 1: Summary of what was discussed]<br />
          &bull; [Topic 2: Summary of what was discussed]<br />
          &bull; [Topic 3: Summary of what was discussed]<br /><br />
          <strong style={{ color: "#059669", fontSize: "11px" }}>DECISIONS MADE:</strong><br />
          &bull; [Decision 1 &mdash; decided by [Name]]<br />
          &bull; [Decision 2 &mdash; decided by [Name]]<br /><br />
          <strong style={{ color: "#7C3AED", fontSize: "11px" }}>ACTION ITEMS:</strong>
        </td></tr>
      </tbody></table>
      <table style={S.tbl}>
        <thead><tr>
          <th style={S.thPrimary}>Action</th>
          <th style={{ ...S.thPrimary, width: "15%" }}>Owner</th>
          <th style={{ ...S.thPrimary, width: "12%", textAlign: "center" as const }}>Due Date</th>
        </tr></thead>
        <tbody>
          {[1, 2, 3].map((n, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>[Action item {n}]</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 600 }}>[Name]</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, fontSize: "10px", color: accent }}>[MM/DD]</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <table style={{ ...S.tbl, marginTop: "4px" }}><tbody>
        <tr><td style={{ ...S.td0, fontSize: "10px", lineHeight: "2.0", padding: "12px 20px" }}>
          <strong style={{ color: "#DC2626", fontSize: "11px" }}>PARKING LOT (for next time):</strong><br />
          &bull; [Deferred topic 1]<br />
          &bull; [Deferred topic 2]<br /><br />
          <strong>Next meeting:</strong> [Date, Time, Location/Link]<br /><br />
          Please flag any corrections or additions by [date].<br /><br />
          Best regards,<br />
          <strong style={{ color: accent }}>[Your Name]</strong>
        </td></tr>
      </tbody></table>
    </div>
  );

  const renderTips = () => (
    <div ref={tipsRef} style={{ marginBottom: "12px" }}>
      <table style={LT}><tbody><tr>
        <td style={{ ...LC, width: "50%", paddingRight: "4px" }}>
          <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner("#059669")}>DO THIS</td></tr></tbody></table>
          <table style={S.tbl}><tbody>
            <tr><td style={{ ...S.td0, fontSize: "10px", lineHeight: "1.9", padding: "10px 14px" }}>
              &bull; Send within 2 hours of the meeting<br />
              &bull; Lead with decisions, then actions<br />
              &bull; Include specific due dates (not &ldquo;soon&rdquo;)<br />
              &bull; Name owners explicitly<br />
              &bull; Keep it scannable &mdash; bullets over paragraphs
            </td></tr>
          </tbody></table>
        </td>
        <td style={{ ...LC, width: "50%", paddingLeft: "4px" }}>
          <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner("#DC2626")}>AVOID THIS</td></tr></tbody></table>
          <table style={S.tbl}><tbody>
            <tr><td style={{ ...S.td0, fontSize: "10px", lineHeight: "1.9", padding: "10px 14px" }}>
              &bull; Sending next day (momentum lost)<br />
              &bull; Vague action items (&ldquo;follow up on stuff&rdquo;)<br />
              &bull; Leaving out who&apos;s responsible<br />
              &bull; Including every detail discussed<br />
              &bull; Forgetting to include the next meeting date
            </td></tr>
          </tbody></table>
        </td>
      </tr></tbody></table>
      <CopyButton targetRef={tipsRef} label="Copy Section" />
    </div>
  );

  const renderFooter = () => (
    <table style={{ ...S.tbl, marginTop: "8px" }}><tbody><tr>
      <td style={{ backgroundColor: C.primary, color: C.footerText, padding: "8px 20px", fontSize: "10px", fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.06em" }}>
        ExecNoteShop &bull; EA / Chief of Staff Command Center &bull; &copy; 2026 All Rights Reserved
      </td>
    </tr></tbody></table>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-amber-50/30">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-amber-500 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-100 text-amber-700 text-xs font-semibold"><Zap size={11} />All-Star</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/ea-cos-command-center" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-amber-600 transition-colors"><ArrowLeft size={14} />Back to EA/CoS Command Center</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center"><Mail size={20} className="text-amber-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">Follow-Up Email Builder</h2><p className="text-xs font-medium text-amber-600">&#11088; All-Star &mdash; Saves Time Daily</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Copy/paste recap email with decisions, actions, next steps. Huge time saver for every meeting.</p>
        </div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">View Mode</p>
          <div className="flex flex-wrap gap-2">
            {LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (
              <button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-amber-500 text-white border-amber-500 shadow-md shadow-amber-200" : "bg-white text-slate-600 border-slate-200 hover:border-amber-300 hover:text-amber-700"}`}>
                <Icon size={15} /><span>{l.label}</span><span className={`text-[10px] font-medium ${isActive ? "text-amber-200" : "text-slate-400"}`}>{l.desc}</span>
              </button>
            ); })}
          </div>
        </div>
        <div ref={fullPageRef} style={{ fontFamily: S.font }}>
          {layout === "full" && <>{renderTitleBanner()}{renderEmail()}{renderTips()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderEmail()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function FollowUpEmailBuilderPage() { return <ThemeProvider><FollowUpEmailContent /></ThemeProvider>; }
