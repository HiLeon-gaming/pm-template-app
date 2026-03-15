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
  { id: "full", label: "Full Map", desc: "Ownership + stakeholders + RACI + communication plan", icon: LayoutDashboard },
  { id: "compact", label: "Quick Ownership", desc: "Ownership table only", icon: AlignJustify },
];

function OwnershipContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullRef = useRef<HTMLDivElement>(null);
  const ownerRef = useRef<HTMLDivElement>(null);
  const stakeRef = useRef<HTMLDivElement>(null);
  const commRef = useRef<HTMLDivElement>(null);

  const accent = "#7C3AED";

  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>OKR OWNERSHIP &amp; STAKEHOLDER MAP</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; OKR &amp; Operating Rhythm Hub &nbsp;|&nbsp; Who Owns What + Who Needs to Know</td></tr>
    </tbody></table>
  );

  const renderOwner = () => (
    <div ref={ownerRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(accent)}>OKR OWNERSHIP TABLE</div>
      <CopyButton targetRef={ownerRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>Every objective and key result needs exactly ONE accountable owner. This person doesn&apos;t do all the work — they make sure it gets done and report on progress.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "20%" }}>Objective / KR</th>
          <th style={{ ...S.thPrimary, width: "12%" }}>Owner (Accountable)</th>
          <th style={{ ...S.thPrimary, width: "15%" }}>Contributors</th>
          <th style={{ ...S.thPrimary, width: "12%" }}>Consulted</th>
          <th style={{ ...S.thPrimary, width: "12%" }}>Informed</th>
          <th style={S.thPrimary}>Decision Authority</th>
        </tr></thead>
        <tbody>
          {[
            { item: "OBJ 1: Improve CX", owner: "[Sarah M., VP CX]", contrib: "[Support, Product, CX]", consult: "[Engineering]", inform: "[All Staff]", auth: "Can approve spend <$10K, hire within budget" },
            { item: "KR 1.1: Wait time → 6 hrs", owner: "[Tom R., Support Mgr]", contrib: "[Support team]", consult: "[IT (ticketing)]", inform: "[Sarah M.]", auth: "Can prioritize tickets, escalate blockers" },
            { item: "KR 1.2: CSAT → 4.5", owner: "[Lisa P., Product]", contrib: "[Design, Eng]", consult: "[CX team]", inform: "[Sarah M.]", auth: "Can adjust onboarding flow without approval" },
            { item: "OBJ 2: Grow Revenue", owner: "[James T., CRO]", contrib: "[Sales, Marketing]", consult: "[Product, Finance]", inform: "[Board]", auth: "Can approve deals, adjust pricing within range" },
            { item: "KR 2.1: Leads → 400/mo", owner: "[Amy K., Marketing]", contrib: "[Content, Paid]", consult: "[Sales]", inform: "[James T.]", auth: "Can allocate ad budget within approved total" },
            { item: "KR 2.2: 3 Enterprise deals", owner: "[Mike D., Enterprise AE]", contrib: "[Sales Eng, Legal]", consult: "[Finance]", inform: "[James T.]", auth: "Can negotiate terms within approved range" },
            { item: "OBJ 3: World-class Team", owner: "[HR Director]", contrib: "[HR, Hiring Mgrs]", consult: "[Finance]", inform: "[All Staff]", auth: "Can approve offers within comp bands" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            const isObj = r.item.startsWith("OBJ");
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: isObj ? 800 : 600, color: isObj ? accent : C.textBody }}>{r.item}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", fontWeight: 700, color: "#DC2626" }}>{r.owner}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", color: "#059669" }}>{r.contrib}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", color: "#D97706" }}>{r.consult}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px" }}>{r.inform}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px" }}>{r.auth}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderStakeAndComm = () => (
    <div ref={stakeRef} style={{ marginBottom: "12px" }}>
      <CopyButton targetRef={stakeRef} label="Copy Section" />
      <table style={LT}><tbody><tr>
        <td style={{ ...LC, width: "55%", paddingRight: "4px" }}>
          <table style={S.tbl}>
            <thead><tr><td style={{ backgroundColor: "#E0F2FE", color: "#0EA5E9", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #0EA5E9" }}>👥 STAKEHOLDER INTEREST MAP</td></tr></thead>
            <tbody>
              {[
                { name: "[CEO]", interest: "High", iBg: C.badgeRedBg, iFg: C.badgeRedFg, influence: "High", nBg: C.badgeRedBg, nFg: C.badgeRedFg, cares: "Quarterly goals, decisions needed", engage: "QBR + weekly dashboard" },
                { name: "[Board]", interest: "High", iBg: C.badgeRedBg, iFg: C.badgeRedFg, influence: "High", nBg: C.badgeRedBg, nFg: C.badgeRedFg, cares: "Revenue, burn rate, key risks", engage: "Quarterly board update" },
                { name: "[Dept Heads]", interest: "High", iBg: C.badgeRedBg, iFg: C.badgeRedFg, influence: "Med", nBg: C.badgeAmberBg, nFg: C.badgeAmberFg, cares: "Team contribution, resources, blockers", engage: "Weekly check-in + MBR" },
                { name: "[Engineering]", interest: "Med", iBg: C.badgeAmberBg, iFg: C.badgeAmberFg, influence: "Med", nBg: C.badgeAmberBg, nFg: C.badgeAmberFg, cares: "What to build, priority order", engage: "Sprint planning + roadmap" },
                { name: "[All Staff]", interest: "Med", iBg: C.badgeAmberBg, iFg: C.badgeAmberFg, influence: "Low", nBg: C.badgeGreenBg, nFg: C.badgeGreenFg, cares: "Direction, culture, security", engage: "Kickoff + all-hands" },
                { name: "[Customers]", interest: "Low", iBg: C.badgeGreenBg, iFg: C.badgeGreenFg, influence: "High", nBg: C.badgeRedBg, nFg: C.badgeRedFg, cares: "Product quality, support, features", engage: "Advisory board, NPS" },
              ].map((r, i) => {
                const bg = i % 2 === 1 ? C.rowAlt : C.white;
                return (
                  <tr key={i}>
                    <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", padding: "5px 10px" }}>
                      <span style={{ fontWeight: 700 }}>{r.name}</span> <span style={S.badge(r.iBg, r.iFg)}>{r.interest}</span> <span style={S.badge(r.nBg, r.nFg)}>{r.influence}</span><br />
                      <span style={{ fontSize: "9px", color: C.textMuted }}>{r.cares} &rarr; {r.engage}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </td>
        <td style={{ ...LC, width: "45%", paddingLeft: "4px" }}>
          <table style={S.tbl}>
            <thead><tr><td style={{ backgroundColor: "#D1FAE5", color: "#059669", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #059669" }}>📣 COMMUNICATION PLAN</td></tr></thead>
            <tbody>
              {[
                { aud: "[CEO]", what: "Dashboard + decisions needed", freq: "Weekly", channel: "Email/Slack" },
                { aud: "[Leadership]", what: "OKR scores + risks", freq: "Weekly", channel: "Meeting" },
                { aud: "[Board]", what: "QBR one-pager + financials", freq: "Quarterly", channel: "Board deck" },
                { aud: "[Dept Teams]", what: "Team OKR progress", freq: "Weekly", channel: "Standup" },
                { aud: "[All Staff]", what: "Goals + progress + wins", freq: "Quarterly", channel: "All-hands" },
              ].map((r, i) => {
                const bg = i % 2 === 1 ? C.rowAlt : C.white;
                return (
                  <tr key={i}>
                    <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", padding: "5px 10px" }}>
                      <span style={{ fontWeight: 700 }}>{r.aud}</span> &mdash; <span style={{ color: "#059669", fontWeight: 700 }}>{r.freq}</span><br />
                      <span style={{ fontSize: "9px", color: C.textMuted }}>{r.what} via {r.channel}</span>
                    </td>
                  </tr>
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
        ExecNoteShop &bull; OKR &amp; Operating Rhythm Hub &bull; &copy; 2026 All Rights Reserved
      </td>
    </tr></tbody></table>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-violet-50/30">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-violet-600 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-violet-50 border border-violet-100 text-violet-700 text-xs font-semibold"><Users size={11} />Ownership</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/okr-hub" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-violet-600 transition-colors"><ArrowLeft size={14} />Back to OKR Hub</Link>
          <CopyAllButton targetRef={fullRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-violet-100 flex items-center justify-center"><Users size={20} className="text-violet-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">OKR Ownership &amp; Stakeholder Map</h2><p className="text-xs font-medium text-violet-600">Who Owns What + Who Must Be Consulted</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Maps ownership, contributors, and stakeholders for every OKR. Speeds decisions and prevents the &ldquo;nobody owns it&rdquo; problem.</p>
        </div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">View Mode</p>
          <div className="flex flex-wrap gap-2">
            {LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (
              <button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-violet-600 text-white border-violet-600 shadow-md shadow-violet-200" : "bg-white text-slate-600 border-slate-200 hover:border-violet-300 hover:text-violet-700"}`}>
                <Icon size={15} /><span>{l.label}</span><span className={`text-[10px] font-medium ${isActive ? "text-violet-200" : "text-slate-400"}`}>{l.desc}</span>
              </button>
            ); })}
          </div>
        </div>
        <div ref={fullRef} style={{ fontFamily: S.font }}>
          {layout === "full" && <>{renderTitleBanner()}{renderOwner()}{renderStakeAndComm()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderOwner()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullRef} /></div>
      </div>
    </div>
  );
}

export default function OKROwnershipStakeholderPage() { return <ThemeProvider><OwnershipContent /></ThemeProvider>; }
