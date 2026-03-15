"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, Users, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Guide", desc: "Roles + RACI + examples + anti-patterns", icon: LayoutDashboard },
  { id: "compact", label: "Quick Reference", desc: "Role definitions + assignments only", icon: AlignJustify },
];

function RolesContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullRef = useRef<HTMLDivElement>(null);
  const rolesRef = useRef<HTMLDivElement>(null);
  const raciRef = useRef<HTMLDivElement>(null);
  const assignRef = useRef<HTMLDivElement>(null);
  const antiRef = useRef<HTMLDivElement>(null);

  const accent = "#0EA5E9";

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>ROLES &amp; RESPONSIBILITIES</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; OKR &amp; Operating Rhythm Hub &nbsp;|&nbsp; Who Owns What</td></tr>
    </tbody></table>
  );

  const renderRoles = () => (
    <div ref={rolesRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(accent)}>THE THREE KEY ROLES</div>
      <CopyButton targetRef={rolesRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>Every goal, metric, and review needs someone responsible. Here are the three roles that make this system work. One person can play multiple roles.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "12%" }}>Role</th>
          <th style={S.thPrimary}>What They Do</th>
          <th style={{ ...S.thPrimary, width: "30%" }}>Example</th>
        </tr></thead>
        <tbody>
          {[
            { role: "Owner", color: "#DC2626", desc: "The person who is ACCOUNTABLE for delivering the result. They don\u2019t have to do all the work, but they\u2019re the one who answers \"did we hit it?\"", ex: "Sarah owns the \"Improve Customer Experience\" objective. She tracks progress, removes blockers, and reports on results." },
            { role: "Contributor", color: "#059669", desc: "The people who DO the work that moves the Key Result. They execute the initiatives and tasks.", ex: "The support team are contributors. They\u2019re the ones reducing wait times by handling tickets faster." },
            { role: "Approver", color: "#7C3AED", desc: "The person who APPROVES goals, budgets, or major decisions. Usually a leader or executive. They say \"yes, go\" or \"no, adjust.\"", ex: "The CEO approves quarterly OKRs. The VP approves budget for new hires needed to hit the goal." },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "12px", fontWeight: 800, color: r.color, textAlign: "center" as const }}>{r.role}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.desc}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", fontStyle: "italic", color: C.textMuted }}>{r.ex}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderRaci = () => (
    <div ref={raciRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner("#7C3AED")}>RACI QUICK GUIDE</div>
      <CopyButton targetRef={raciRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>RACI stands for Responsible, Accountable, Consulted, Informed. It&apos;s a simple way to make sure everyone knows their role for each task or goal.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Letter</th>
          <th style={{ ...S.thPrimary, width: "15%" }}>Stands For</th>
          <th style={S.thPrimary}>What It Means</th>
          <th style={{ ...S.thPrimary, width: "25%" }}>Example</th>
        </tr></thead>
        <tbody>
          {[
            { letter: "R", word: "Responsible", def: "Does the work. The person(s) who actually complete the task.", ex: "Support team members handle the tickets.", color: "#059669" },
            { letter: "A", word: "Accountable", def: "Owns the outcome. Only ONE person. The buck stops here.", ex: "Sarah is accountable for customer experience OKR.", color: "#DC2626" },
            { letter: "C", word: "Consulted", def: "Asked for input BEFORE a decision. Two-way communication.", ex: "Product team is consulted on tool changes.", color: "#D97706" },
            { letter: "I", word: "Informed", def: "Told AFTER a decision. One-way communication.", ex: "All-hands gets informed of quarterly results.", color: "#0EA5E9" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 800, fontSize: "16px", color: r.color }}>{r.letter}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 700 }}>{r.word}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.def}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", fontStyle: "italic", color: C.textMuted }}>{r.ex}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderAssign = () => (
    <div ref={assignRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner("#059669")}>ROLE ASSIGNMENT TABLE (Fill This In)</div>
      <CopyButton targetRef={assignRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>Fill in who plays each role for your team. This prevents the #1 problem: &ldquo;I thought someone else was handling it.&rdquo;</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={S.thPrimary}>Area</th>
          <th style={{ ...S.thPrimary, width: "15%" }}>Owner (A)</th>
          <th style={{ ...S.thPrimary, width: "15%" }}>Contributor (R)</th>
          <th style={{ ...S.thPrimary, width: "15%" }}>Approver</th>
          <th style={{ ...S.thPrimary, width: "15%" }}>Informed</th>
        </tr></thead>
        <tbody>
          {[
            { area: "Quarterly OKR Setting", owner: "[CEO / Dept Head]", contrib: "[Leadership Team]", approver: "[CEO]", informed: "[All Staff]" },
            { area: "Weekly Metrics Review", owner: "[Team Lead]", contrib: "[Metric Owners]", approver: "[N/A]", informed: "[Team]" },
            { area: "Initiative Execution", owner: "[Initiative Lead]", contrib: "[Project Team]", approver: "[Dept Head]", informed: "[Stakeholders]" },
            { area: "Monthly Business Review", owner: "[CoS / Ops Lead]", contrib: "[Department Heads]", approver: "[CEO]", informed: "[Board (summary)]" },
            { area: "Quarterly Business Review", owner: "[CEO / COO]", contrib: "[All Dept Heads]", approver: "[Board]", informed: "[All Staff]" },
            { area: "Decision Log Updates", owner: "[CoS / EA]", contrib: "[Anyone who makes decisions]", approver: "[N/A]", informed: "[Team]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 600 }}>{r.area}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", color: "#DC2626", fontWeight: 600 }}>{r.owner}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", color: "#059669" }}>{r.contrib}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", color: "#7C3AED" }}>{r.approver}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px" }}>{r.informed}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderAnti = () => (
    <div ref={antiRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner("#DC2626")}>ANTI-PATTERNS TO AVOID</div>
      <CopyButton targetRef={antiRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={S.thPrimary}>Problem</th>
          <th style={{ ...S.thPrimary, width: "50%" }}>Fix</th>
        </tr></thead>
        <tbody>
          {[
            { prob: "\"Everyone owns it\" (which means nobody owns it)", fix: "Every OKR has exactly ONE accountable person. Not a team. One name." },
            { prob: "The owner has no authority to make decisions", fix: "Owners must be empowered. If they can\u2019t make calls, escalation paths must be clear." },
            { prob: "Nobody updates the metrics", fix: "Assign a specific person to update each metric weekly. Put it in their calendar." },
            { prob: "Leaders approve but never review progress", fix: "Monthly Business Review is the mandatory check-in. Leaders must attend." },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 600, color: "#DC2626" }}>{r.prob}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.fix}</td>
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
        ExecNoteShop &bull; OKR &amp; Operating Rhythm Hub &bull; &copy; 2026 All Rights Reserved
      </td>
    </tr></tbody></table>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-sky-50/30">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-sky-600 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-sky-50 border border-sky-100 text-sky-700 text-xs font-semibold"><Users size={11} />Roles</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/okr-hub" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-sky-600 transition-colors"><ArrowLeft size={14} />Back to OKR Hub</Link>
          <CopyAllButton targetRef={fullRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-sky-100 flex items-center justify-center"><Users size={20} className="text-sky-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">Roles &amp; Responsibilities</h2><p className="text-xs font-medium text-sky-600">Owner, Approver, Contributor &mdash; Who Does What</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Defines who owns goals, metrics, and reviews. Stops the &ldquo;nobody owns it&rdquo; problem dead in its tracks.</p>
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
          {layout === "full" && <>{renderTitleBanner()}{renderRoles()}{renderRaci()}{renderAssign()}{renderAnti()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderRoles()}{renderAssign()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullRef} /></div>
      </div>
    </div>
  );
}

export default function RolesResponsibilitiesPage() { return <ThemeProvider><RolesContent /></ThemeProvider>; }
