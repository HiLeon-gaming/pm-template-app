"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, Send, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Update", desc: "Status + highlights + risks + asks", icon: LayoutDashboard },
  { id: "compact", label: "Quick Update", desc: "Status + asks only", icon: AlignJustify },
];

function StakeholderUpdateContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const risksRef = useRef<HTMLDivElement>(null);
  const asksRef = useRef<HTMLDivElement>(null);

  const accent = "#0D9488"; const accentDark = "#0F766E";

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>📨 STAKEHOLDER UPDATE EMAIL</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; Meetings Hub Pro &nbsp;|&nbsp; Logs &amp; Follow-Up</td></tr>
    </tbody></table>
  );

  const renderHeader = () => (
    <div ref={headerRef} style={{ marginBottom: "12px" }}>
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "18%" }}>To</td><td style={{ ...S.td0, width: "82%" }}>[Executive Sponsor, VP Product, Steering Committee]</td></tr>
        <tr><td style={S.tdLabelAlt}>CC</td><td style={S.tdAlt}>[PM team, Delivery leads]</td></tr>
        <tr><td style={S.tdLabel}>Subject</td><td style={{ ...S.td0, fontWeight: 700, color: accent }}>[Project Status: [Project Name] — [Week of MM/DD] — 🟢 On Track]</td></tr>
      </tbody></table>
      <CopyButton targetRef={headerRef} label="Copy Section" />
    </div>
  );

  const renderBody = () => (
    <div ref={bodyRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(accent)}>📝 UPDATE BODY</div>
      <CopyButton targetRef={bodyRef} label="Copy Section" />
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.td0, fontSize: "11px", lineHeight: "2.0", padding: "16px 20px" }}>
          Hi [Stakeholder names],<br /><br />
          Here is your <strong style={{ color: accent }}>[weekly / bi-weekly]</strong> update for <strong>[Project Name]</strong> — week of <strong>[Date]</strong>.<br /><br />
          <strong style={{ color: accentDark, fontSize: "13px" }}>📊 OVERALL STATUS: <span style={{ color: "#059669" }}>[🟢 ON TRACK]</span></strong><br /><br />
          <strong style={{ color: accentDark, fontSize: "12px" }}>🏆 HIGHLIGHTS THIS PERIOD</strong><br />
          &bull; [Highlight 1 — what was accomplished that stakeholders care about]<br />
          &bull; [Highlight 2 — milestone reached, deliverable completed, etc.]<br />
          &bull; [Highlight 3 — positive outcome or team achievement]<br /><br />
          <strong style={{ color: accentDark, fontSize: "12px" }}>📈 KEY METRICS</strong><br />
          &bull; <strong>Sprint progress:</strong> [X% complete — Y of Z stories done]<br />
          &bull; <strong>Budget:</strong> [X% spent — $Y of $Z — on track / at risk]<br />
          &bull; <strong>Timeline:</strong> [On schedule / X days ahead / X days behind]<br />
          &bull; <strong>Quality:</strong> [X bugs open, Y critical, Z resolved this week]<br /><br />
          <strong style={{ color: accentDark, fontSize: "12px" }}>📅 UPCOMING MILESTONES</strong><br />
          &bull; [Milestone 1 — due date — status]<br />
          &bull; [Milestone 2 — due date — status]<br />
        </td></tr>
      </tbody></table>
    </div>
  );

  const renderRisks = () => (
    <div ref={risksRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner("#DC2626")}>⚠️ RISKS &amp; CONCERNS</div>
      <CopyButton targetRef={risksRef} label="Copy Section" />
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.td0, fontSize: "11px", lineHeight: "2.0", padding: "16px 20px" }}>
          <strong style={{ color: "#DC2626", fontSize: "12px" }}>Items requiring your attention:</strong><br /><br />
          &bull; <strong style={{ color: accent }}>[Risk 1]:</strong> [Description — impact — what we&apos;re doing about it]<br />
          &bull; <strong style={{ color: accent }}>[Risk 2]:</strong> [Description — impact — what we need from you]<br /><br />
          <strong style={{ color: accentDark, fontSize: "12px" }}>🚧 BLOCKERS</strong><br />
          &bull; [Blocker — who is blocking — what we need to unblock — by when]<br />
        </td></tr>
      </tbody></table>
    </div>
  );

  const renderAsks = () => (
    <div ref={asksRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(accent)}>🙋 ASKS &amp; NEXT STEPS</div>
      <CopyButton targetRef={asksRef} label="Copy Section" />
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.td0, fontSize: "11px", lineHeight: "2.0", padding: "16px 20px" }}>
          <strong style={{ color: accentDark, fontSize: "12px" }}>Decisions needed from you:</strong><br />
          &bull; [Decision 1 — options — your recommendation — needed by date]<br />
          &bull; [Decision 2 — options — your recommendation — needed by date]<br /><br />
          <strong style={{ color: accentDark, fontSize: "12px" }}>FYI items (no action needed):</strong><br />
          &bull; [Something stakeholders should be aware of but don&apos;t need to act on]<br /><br />
          <strong style={{ color: accentDark, fontSize: "12px" }}>📅 Next update:</strong> [Date]<br />
          <strong style={{ color: accentDark, fontSize: "12px" }}>📞 Questions?</strong> Reach me at [email / Slack / phone].<br /><br />
          Best regards,<br />
          <strong style={{ color: accent }}>[Your Name]</strong><br />
          [Your Title] | [Project Name]
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
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-teal-50 border border-teal-100 text-teal-700 text-xs font-semibold"><Send size={11} />Update</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/meetings-hub" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-teal-600 transition-colors"><ArrowLeft size={14} />Back to Meetings Hub Pro</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-teal-100 flex items-center justify-center"><Send size={20} className="text-teal-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">Stakeholder Update Email</h2><p className="text-xs font-medium text-teal-600">Status &bull; Highlights &bull; Risks &bull; Asks</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Ready-to-send stakeholder update with status, highlights, metrics, risks, and clear asks for leadership.</p>
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
          {layout === "full" && <>{renderTitleBanner()}{renderHeader()}{renderBody()}{renderRisks()}{renderAsks()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderHeader()}{renderBody()}{renderAsks()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function StakeholderUpdatePage() { return <ThemeProvider><StakeholderUpdateContent /></ThemeProvider>; }
