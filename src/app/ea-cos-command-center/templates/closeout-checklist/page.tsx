"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, CheckSquare, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Checklist", desc: "All steps + notifications + archive", icon: LayoutDashboard },
  { id: "compact", label: "Quick Close", desc: "Core checklist only", icon: AlignJustify },
];

function CloseoutChecklistContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const checkRef = useRef<HTMLDivElement>(null);
  const notifyRef = useRef<HTMLDivElement>(null);

  const accent = "#EC4899";

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>🏁 CLOSEOUT CHECKLIST (REQUEST COMPLETE)</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; EA / Chief of Staff Command Center &nbsp;|&nbsp; Requests &amp; Follow-Ups</td></tr>
    </tbody></table>
  );

  const renderCheck = () => (
    <div ref={checkRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(accent)}>✅ CLOSEOUT STEPS</div>
      <CopyButton targetRef={checkRef} label="Copy Section" />
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.tdLabel, width: "30%" }}>Request / Task Name</td><td style={S.td0}>[Original request description]</td></tr>
        <tr><td style={S.tdLabelAlt}>Original Requester</td><td style={S.tdAlt}>[Who asked for this]</td></tr>
        <tr><td style={S.tdLabel}>Date Opened</td><td style={S.td0}>[MM/DD/YYYY]</td></tr>
        <tr><td style={S.tdLabelAlt}>Date Closed</td><td style={{ ...S.tdAlt, fontWeight: 700, color: "#059669" }}>[MM/DD/YYYY]</td></tr>
      </tbody></table>
      <table style={{ ...S.tbl, marginTop: "4px" }}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "5%", textAlign: "center" as const }}>✓</th>
          <th style={S.thPrimary}>Step</th>
          <th style={{ ...S.thPrimary, width: "30%" }}>Notes</th>
        </tr></thead>
        <tbody>
          {[
            { step: "Deliverable completed and verified", notes: "[What was delivered? Does it match the original ask?]" },
            { step: "Quality check — meets expectations", notes: "[Any issues? Any rework needed?]" },
            { step: "Requester notified of completion", notes: "[How: email / Slack / verbal? Date notified.]" },
            { step: "Exec informed (if relevant)", notes: "[Does the exec need to know this is done?]" },
            { step: "Related follow-ups identified", notes: "[Does this completion trigger any new tasks?]" },
            { step: "Documents filed / links saved", notes: "[Where are the final files stored?]" },
            { step: "Tracker updated (inbox / master tracker)", notes: "[Mark as complete in all relevant trackers]" },
            { step: "Lessons noted (if applicable)", notes: "[What went well? What to do differently?]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "14px" }}>☐</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px", fontWeight: 600 }}>{r.step}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.notes}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderNotify = () => (
    <div ref={notifyRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner("#059669")}>📧 NOTIFICATION TEMPLATE</div>
      <CopyButton targetRef={notifyRef} label="Copy Section" />
      <table style={S.tbl}><tbody>
        <tr><td style={{ ...S.td0, fontSize: "10px", lineHeight: "2.0", padding: "14px 18px" }}>
          Hi [Name],<br /><br />
          Just confirming that <strong style={{ color: accent }}>[request/task]</strong> has been completed as of <strong>[date]</strong>.<br /><br />
          <strong>Summary:</strong> [Brief description of what was done]<br />
          <strong>Deliverable:</strong> [Link or location of final output]<br />
          <strong>Next Steps:</strong> [Any follow-on actions, or &ldquo;None — this is fully closed.&rdquo;]<br /><br />
          Let me know if you need anything else.<br /><br />
          Best,<br />
          <strong style={{ color: accent }}>[Your Name]</strong>
        </td></tr>
      </tbody></table>
    </div>
  );

  const renderFooter = () => (
    <table style={{ ...S.tbl, marginTop: "8px" }}><tbody><tr>
      <td style={{ backgroundColor: C.primary, color: C.footerText, padding: "8px 20px", fontSize: "10px", fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.06em" }}>
        ExecNoteShop &nbsp;&bull;&nbsp; EA / Chief of Staff Command Center &nbsp;&bull;&nbsp; &copy; 2026 All Rights Reserved
      </td>
    </tr></tbody></table>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-pink-50/30">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-pink-500 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-pink-50 border border-pink-100 text-pink-700 text-xs font-semibold"><CheckSquare size={11} />Closeout</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/ea-cos-command-center" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-pink-600 transition-colors"><ArrowLeft size={14} />Back to EA/CoS Command Center</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-pink-100 flex items-center justify-center"><CheckSquare size={20} className="text-pink-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">Closeout Checklist</h2><p className="text-xs font-medium text-pink-600">Confirm, Notify, Archive &mdash; Keep the System Clean</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Confirm completion, notify stakeholders, archive notes. Keeps the request system clean and reliable.</p>
        </div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">View Mode</p>
          <div className="flex flex-wrap gap-2">
            {LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (
              <button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-pink-500 text-white border-pink-500 shadow-md shadow-pink-200" : "bg-white text-slate-600 border-slate-200 hover:border-pink-300 hover:text-pink-700"}`}>
                <Icon size={15} /><span>{l.label}</span><span className={`text-[10px] font-medium ${isActive ? "text-pink-200" : "text-slate-400"}`}>{l.desc}</span>
              </button>
            ); })}
          </div>
        </div>
        <div ref={fullPageRef} style={{ fontFamily: S.font }}>
          {layout === "full" && <>{renderTitleBanner()}{renderCheck()}{renderNotify()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderCheck()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function CloseoutChecklistPage() { return <ThemeProvider><CloseoutChecklistContent /></ThemeProvider>; }
