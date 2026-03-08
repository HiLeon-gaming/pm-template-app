"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, UserCheck, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Guide", desc: "Roles + responsibilities + rotation", icon: LayoutDashboard },
  { id: "compact", label: "Quick Ref", desc: "Roles only", icon: AlignJustify },
];

function AttendanceRolesContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const rolesRef = useRef<HTMLDivElement>(null);
  const inviteRef = useRef<HTMLDivElement>(null);
  const rotationRef = useRef<HTMLDivElement>(null);

  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };
  const accent = "#F59E0B"; const accentDark = "#D97706";

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>👥 ATTENDANCE &amp; ROLES GUIDE</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; Meetings Hub Pro &nbsp;|&nbsp; Start Here</td></tr>
    </tbody></table>
  );

  const renderRoles = () => (
    <div ref={rolesRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(accent)}>🎭 MEETING ROLES DEFINED</div>
      <CopyButton targetRef={rolesRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>Every meeting should have these 3 roles filled. They can rotate weekly or stay fixed — your choice.</p>
      <table style={LT}><tbody><tr>
        {[
          { role: "Facilitator", emoji: "🎯", duties: ["Keep the meeting on agenda", "Manage time and parking lot", "Call for decisions when needed", "Ensure everyone is heard", "Summarize next steps at the end"], color: "#3B82F6" },
          { role: "Timekeeper", emoji: "⏱️", duties: ["Track time per agenda item", "Give 2-minute warning signals", "Flag when meeting runs over", "Help facilitator stay on track", "Note actual vs. planned durations"], color: "#059669" },
          { role: "Scribe / Note-Taker", emoji: "📝", duties: ["Capture decisions word-for-word", "Record action items + owners", "Document key discussion points", "Note parking lot items", "Share notes within 24 hours"], color: "#D946EF" },
        ].map((r, i) => (
          <td key={i} style={{ ...LC, width: "33.3%", padding: i < 2 ? "0 4px 0 0" : "0" }}>
            <table style={S.tbl}><tbody>
              <tr><td style={{ backgroundColor: r.color, color: "#FFFFFF", padding: "10px", fontFamily: S.font, fontSize: "13px", fontWeight: 800, border: `1.5px solid ${C.border}`, textAlign: "center" as const, letterSpacing: "0.04em" }}>{r.emoji} {r.role}</td></tr>
              {r.duties.map((d, j) => (
                <tr key={j}><td style={{ ...(j % 2 === 0 ? S.td0 : S.tdAlt), fontSize: "10px", padding: "5px 10px" }}>&bull; {d}</td></tr>
              ))}
            </tbody></table>
          </td>
        ))}
      </tr></tbody></table>
    </div>
  );

  const renderInvite = () => (
    <div ref={inviteRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(accentDark)}>📋 ATTENDANCE DECISION GUIDE</div>
      <CopyButton targetRef={inviteRef} label="Copy Section" />
      <table style={LT}><tbody><tr>
        <td style={{ ...LC, width: "50%", paddingRight: "4px" }}>
          <table style={S.tbl}><tbody>
            <tr><td style={{ ...S.thSecondary, textAlign: "center" as const, backgroundColor: "#059669", color: "#FFFFFF" }}>✅ Invite If&hellip;</td></tr>
            {["They need to make a decision", "They own an action item being discussed", "Their input is required for a key topic", "They\u2019re directly affected by the outcome", "They\u2019re a required approver or sign-off"].map((t, i) => (
              <tr key={i}><td style={{ ...(i % 2 === 0 ? S.td0 : S.tdAlt), fontSize: "10px", padding: "6px 10px" }}>{t}</td></tr>
            ))}
          </tbody></table>
        </td>
        <td style={{ ...LC, width: "50%", paddingLeft: "4px" }}>
          <table style={S.tbl}><tbody>
            <tr><td style={{ ...S.thSecondary, textAlign: "center" as const, backgroundColor: "#DC2626", color: "#FFFFFF" }}>❌ Don&apos;t Invite If&hellip;</td></tr>
            {["They only need the recap (send notes instead)", "They\u2019re \u201CFYI only\u201D (email the summary)", "They have no action items or decisions", "You\u2019re inviting out of courtesy or habit", "Their calendar is already overloaded"].map((t, i) => (
              <tr key={i}><td style={{ ...(i % 2 === 0 ? S.td0 : S.tdAlt), fontSize: "10px", padding: "6px 10px" }}>{t}</td></tr>
            ))}
          </tbody></table>
        </td>
      </tr></tbody></table>
    </div>
  );

  const renderRotation = () => (
    <div ref={rotationRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(accent)}>🔄 ROLE ROTATION TRACKER</div>
      <CopyButton targetRef={rotationRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>Optional: rotate roles weekly so everyone builds facilitation skills.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "15%" }}>Week</th>
          <th style={S.thPrimary}>Facilitator</th>
          <th style={S.thPrimary}>Timekeeper</th>
          <th style={S.thPrimary}>Scribe</th>
          <th style={{ ...S.thPrimary, width: "15%" }}>Notes</th>
        </tr></thead>
        <tbody>
          {[
            { week: "Week 1", fac: "[Your Name]", tk: "[Team Member A]", scribe: "[Team Member B]", notes: "" },
            { week: "Week 2", fac: "[Team Member A]", tk: "[Team Member B]", scribe: "[Team Member C]", notes: "" },
            { week: "Week 3", fac: "[Team Member B]", tk: "[Team Member C]", scribe: "[Your Name]", notes: "" },
            { week: "Week 4", fac: "[Team Member C]", tk: "[Your Name]", scribe: "[Team Member A]", notes: "" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 700, fontSize: "11px", color: accent }}>{r.week}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.fac}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.tk}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.scribe}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.notes}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-amber-50/30">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-amber-500 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-100 text-amber-700 text-xs font-semibold"><UserCheck size={11} />Roles</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/meetings-hub" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-amber-600 transition-colors"><ArrowLeft size={14} />Back to Meetings Hub Pro</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center"><UserCheck size={20} className="text-amber-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">Attendance & Roles Guide</h2><p className="text-xs font-medium text-amber-600">Facilitator, Timekeeper, Scribe &mdash; Defined</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Defines who does what so meetings run smoothly. Includes attendance decision guide and optional role rotation tracker.</p>
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
          {layout === "full" && <>{renderTitleBanner()}{renderRoles()}{renderInvite()}{renderRotation()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderRoles()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function AttendanceRolesPage() { return <ThemeProvider><AttendanceRolesContent /></ThemeProvider>; }
