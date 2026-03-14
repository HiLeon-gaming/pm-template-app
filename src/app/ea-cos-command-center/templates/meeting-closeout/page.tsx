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
  { id: "full", label: "Full Closeout", desc: "Checklist + recap template", icon: LayoutDashboard },
  { id: "compact", label: "Quick Check", desc: "Checklist only", icon: AlignJustify },
];

function MeetingCloseoutContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const checkRef = useRef<HTMLDivElement>(null);
  const recapRef = useRef<HTMLDivElement>(null);

  const accent = "#F59E0B";

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>MEETING CLOSEOUT CHECKLIST</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; EA / Chief of Staff Command Center &nbsp;|&nbsp; Meetings Engine</td></tr>
    </tbody></table>
  );

  const renderCheck = () => (
    <div ref={checkRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(accent)}>POST-MEETING CHECKLIST</div>
      <CopyButton targetRef={checkRef} label="Copy Section" />
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "20%" }}>Meeting Name</td><td style={{ ...S.td0, fontWeight: 700 }}>[Meeting Title]</td></tr>
        <tr><td style={S.tdLabelAlt}>Date</td><td style={{ ...S.tdAlt, fontWeight: 700, color: accent }}>[MM/DD/YYYY]</td></tr>
      </tbody></table>
      <table style={{ ...S.tbl, marginTop: "4px" }}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "5%", textAlign: "center" as const }}>&#9744;</th>
          <th style={S.thPrimary}>Step</th>
          <th style={{ ...S.thPrimary, width: "12%", textAlign: "center" as const }}>Owner</th>
          <th style={{ ...S.thPrimary, width: "12%", textAlign: "center" as const }}>Done By</th>
        </tr></thead>
        <tbody>
          {[
            { step: "All decisions captured with owner + date", owner: "[EA/CoS]", by: "[+30 min]" },
            { step: "Action items documented with owners + due dates", owner: "[EA/CoS]", by: "[+30 min]" },
            { step: "Parking lot items recorded with follow-up dates", owner: "[EA/CoS]", by: "[+30 min]" },
            { step: "Meeting notes cleaned up and filed", owner: "[EA/CoS]", by: "[+1 hr]" },
            { step: "Recap email / message sent to attendees", owner: "[EA/CoS]", by: "[+2 hrs]" },
            { step: "Action items added to master tracker", owner: "[EA/CoS]", by: "[+2 hrs]" },
            { step: "Calendar updated (next meeting, follow-ups)", owner: "[EA/CoS]", by: "[+2 hrs]" },
            { step: "Exec briefed on any post-meeting changes", owner: "[EA/CoS]", by: "[EOD]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "14px" }}>&#9744;</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px", fontWeight: 600 }}>{r.step}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "10px" }}>{r.owner}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "10px", fontWeight: 700, color: accent }}>{r.by}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderRecap = () => (
    <div ref={recapRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner("#059669")}>QUICK RECAP TEMPLATE</div>
      <CopyButton targetRef={recapRef} label="Copy Section" />
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.td0, fontSize: "10px", lineHeight: "2.0", padding: "14px 18px" }}>
          <strong>Subject:</strong> Recap: [Meeting Name] &mdash; [Date]<br /><br />
          Hi team,<br /><br />
          Quick recap from today&apos;s [meeting name]:<br /><br />
          <strong style={{ color: accent }}>Key Decisions:</strong><br />
          &bull; [Decision 1]<br />
          &bull; [Decision 2]<br /><br />
          <strong style={{ color: "#059669" }}>Action Items:</strong><br />
          &bull; [Action] &mdash; Owner: [Name] &mdash; Due: [Date]<br />
          &bull; [Action] &mdash; Owner: [Name] &mdash; Due: [Date]<br /><br />
          <strong style={{ color: "#7C3AED" }}>Parking Lot (for next time):</strong><br />
          &bull; [Deferred topic]<br /><br />
          <strong>Next meeting:</strong> [Date/Time]<br /><br />
          Best,<br /><strong style={{ color: accent }}>[Your Name]</strong>
        </td></tr>
      </tbody></table>
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
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-100 text-amber-700 text-xs font-semibold"><CheckCircle size={11} />Closeout</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/ea-cos-command-center" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-amber-600 transition-colors"><ArrowLeft size={14} />Back to EA/CoS Command Center</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center"><CheckCircle size={20} className="text-amber-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">Meeting Closeout Checklist</h2><p className="text-xs font-medium text-amber-600">Decisions Captured, Actions Assigned, Recap Sent</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Post-meeting checklist to prevent loose ends. Includes a copy-paste recap email template.</p>
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
          {layout === "full" && <>{renderTitleBanner()}{renderCheck()}{renderRecap()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderCheck()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function MeetingCloseoutPage() { return <ThemeProvider><MeetingCloseoutContent /></ThemeProvider>; }
