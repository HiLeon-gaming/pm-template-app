"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, LayoutDashboard, AlignJustify, Zap, Home } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Dashboard", desc: "All panels + risk radar + wins", icon: LayoutDashboard },
  { id: "compact", label: "Quick View", desc: "Priorities + meetings + requests", icon: AlignJustify },
];

function ExecOSDashboardContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const prioritiesRef = useRef<HTMLDivElement>(null);
  const meetingsRef = useRef<HTMLDivElement>(null);
  const requestsRef = useRef<HTMLDivElement>(null);
  const waitingRef = useRef<HTMLDivElement>(null);
  const radarRef = useRef<HTMLDivElement>(null);

  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };
  const accent = "#8B5CF6"; const accentDark = "#7C3AED";

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>🏠 EXECUTIVE OS DASHBOARD</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; EA / Chief of Staff Command Center &nbsp;|&nbsp; ⭐ All-Star &nbsp;|&nbsp; Home Base</td></tr>
    </tbody></table>
  );

  const renderPriorities = () => (
    <div ref={prioritiesRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(accent)}>🎯 TODAY&apos;S TOP 3 PRIORITIES</div>
      <CopyButton targetRef={prioritiesRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>What must happen today? If these 3 things get done, today is a success.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "5%", textAlign: "center" as const }}>#</th>
          <th style={S.thPrimary}>Priority</th>
          <th style={{ ...S.thPrimary, width: "12%" }}>Owner</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Due</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Status</th>
        </tr></thead>
        <tbody>
          {[
            { p: "[Finalize board deck for Thursday meeting]", owner: "[You]", due: "Today", s: "In Progress", sBg: C.badgeAmberBg, sFg: C.badgeAmberFg },
            { p: "[Send follow-up from CEO's external meeting]", owner: "[EA]", due: "Today", s: "Not Started", sBg: C.badgeBlueBg, sFg: C.badgeBlueFg },
            { p: "[Confirm travel arrangements for next week]", owner: "[EA]", due: "Today", s: "In Progress", sBg: C.badgeAmberBg, sFg: C.badgeAmberFg },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 800, fontSize: "16px", color: accent }}>{i + 1}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{r.p}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 600 }}>{r.owner}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, fontSize: "10px", color: "#DC2626" }}>{r.due}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.sBg, r.sFg)}>{r.s}</span></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderMeetings = () => (
    <div ref={meetingsRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(accentDark)}>📅 KEY MEETINGS TODAY</div>
      <CopyButton targetRef={meetingsRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thSecondary, width: "12%", textAlign: "center" as const }}>Time</th>
          <th style={S.thSecondary}>Meeting</th>
          <th style={{ ...S.thSecondary, width: "14%" }}>With</th>
          <th style={{ ...S.thSecondary, width: "12%", textAlign: "center" as const }}>Prep?</th>
          <th style={{ ...S.thSecondary, width: "20%" }}>Key Note</th>
        </tr></thead>
        <tbody>
          {[
            { time: "9:00 AM", meeting: "[Leadership Team Sync]", who: "[LT]", prep: "✅ Done", note: "[Budget decision needed]" },
            { time: "11:00 AM", meeting: "[1:1 with CFO]", who: "[CFO]", prep: "⚠️ Pending", note: "[Review Q2 forecast]" },
            { time: "2:00 PM", meeting: "[Board Prep Working Session]", who: "[CEO + CoS]", prep: "✅ Done", note: "[Final deck walkthrough]" },
            { time: "4:00 PM", meeting: "[External Partner Call]", who: "[Vendor X]", prep: "❌ Needed", note: "[Contract renewal discussion]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            const prepColor = r.prep.startsWith("✅") ? "#059669" : r.prep.startsWith("⚠️") ? "#D97706" : "#DC2626";
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, fontSize: "11px", color: accent }}>{r.time}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px", fontWeight: 600 }}>{r.meeting}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.who}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, fontSize: "10px", color: prepColor }}>{r.prep}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.note}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderRequests = () => (
    <div ref={requestsRef} style={{ marginBottom: "12px" }}>
      <table style={LT}><tbody><tr>
        <td style={{ ...LC, width: "50%", paddingRight: "4px" }}>
          <div style={S.sectionBanner("#EC4899")}>📥 OPEN REQUESTS (Top 5)</div>
          <table style={S.tbl}>
            <thead><tr>
              <th style={S.thPrimary}>Request</th>
              <th style={{ ...S.thPrimary, width: "12%", textAlign: "center" as const }}>Priority</th>
              <th style={{ ...S.thPrimary, width: "14%", textAlign: "center" as const }}>Due</th>
            </tr></thead>
            <tbody>
              {[
                { req: "[Draft talking points for investor call]", pri: "High", pBg: C.badgeRedBg, pFg: C.badgeRedFg, due: "Today" },
                { req: "[Schedule Q3 planning offsite]", pri: "Medium", pBg: C.badgeAmberBg, pFg: C.badgeAmberFg, due: "Fri" },
                { req: "[Order catering for team event]", pri: "Low", pBg: C.badgeGreenBg, pFg: C.badgeGreenFg, due: "Next Mon" },
                { req: "[Update org chart with new hires]", pri: "Medium", pBg: C.badgeAmberBg, pFg: C.badgeAmberFg, due: "Next Wed" },
                { req: "[Compile expense reports for review]", pri: "Low", pBg: C.badgeGreenBg, pFg: C.badgeGreenFg, due: "Next Fri" },
              ].map((r, i) => {
                const bg = i % 2 === 1 ? C.rowAlt : C.white;
                return (
                  <tr key={i}>
                    <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.req}</td>
                    <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.pBg, r.pFg)}>{r.pri}</span></td>
                    <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, fontSize: "10px", color: accent }}>{r.due}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </td>
        <td style={{ ...LC, width: "50%", paddingLeft: "4px" }}>
          <div style={S.sectionBanner("#0EA5E9")}>⏳ WAITING ON (Top 5)</div>
          <table style={S.tbl}>
            <thead><tr>
              <th style={S.thPrimary}>Item</th>
              <th style={{ ...S.thPrimary, width: "15%" }}>From</th>
              <th style={{ ...S.thPrimary, width: "14%", textAlign: "center" as const }}>Since</th>
            </tr></thead>
            <tbody>
              {[
                { item: "[Board deck feedback from CEO]", from: "[CEO]", since: "Mon" },
                { item: "[Budget approval from Finance]", from: "[CFO]", since: "Last Wed" },
                { item: "[Contract redline from Legal]", from: "[Legal]", since: "Last Mon" },
                { item: "[Headcount approval from HR]", from: "[CHRO]", since: "2 weeks" },
                { item: "[Vendor proposal comparison]", from: "[Procurement]", since: "Last Fri" },
              ].map((r, i) => {
                const bg = i % 2 === 1 ? C.rowAlt : C.white;
                const isOld = r.since.includes("week") || r.since.includes("Last Mon");
                return (
                  <tr key={i}>
                    <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.item}</td>
                    <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 600 }}>{r.from}</td>
                    <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, fontSize: "10px", color: isOld ? "#DC2626" : "#D97706" }}>{r.since}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </td>
      </tr></tbody></table>
      <CopyButton targetRef={requestsRef} label="Copy Section" />
    </div>
  );

  const renderRadar = () => (
    <div ref={radarRef} style={{ marginBottom: "12px" }}>
      <table style={LT}><tbody><tr>
        <td style={{ ...LC, width: "55%", paddingRight: "4px" }}>
          <div style={S.sectionBanner("#DC2626")}>🚨 RISK RADAR &mdash; What Could Blow Up?</div>
          <table style={S.tbl}>
            <thead><tr>
              <th style={S.thPrimary}>Risk / Concern</th>
              <th style={{ ...S.thPrimary, width: "12%", textAlign: "center" as const }}>Impact</th>
              <th style={{ ...S.thPrimary, width: "25%" }}>Mitigation</th>
            </tr></thead>
            <tbody>
              {[
                { risk: "[Board deck not finalized — meeting Thursday]", impact: "High", iBg: C.badgeRedBg, iFg: C.badgeRedFg, mit: "[Block 2 hrs today for final review]" },
                { risk: "[CFO unhappy with Q2 forecast — need alignment]", impact: "Medium", iBg: C.badgeAmberBg, iFg: C.badgeAmberFg, mit: "[Add to 1:1 agenda today]" },
                { risk: "[Vendor contract expires next week — no renewal yet]", impact: "High", iBg: C.badgeRedBg, iFg: C.badgeRedFg, mit: "[Escalate to Legal today]" },
              ].map((r, i) => {
                const bg = i % 2 === 1 ? C.rowAlt : C.white;
                return (
                  <tr key={i}>
                    <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.risk}</td>
                    <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.iBg, r.iFg)}>{r.impact}</span></td>
                    <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.mit}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </td>
        <td style={{ ...LC, width: "45%", paddingLeft: "4px" }}>
          <div style={S.sectionBanner("#059669")}>🏆 WINS &amp; ACKNOWLEDGMENTS</div>
          <table style={S.tbl}><tbody>
            <tr><td style={{ ...S.td0, fontSize: "10px", lineHeight: "1.9", padding: "10px 14px" }}>
              &bull; <strong style={{ color: "#059669" }}>[Win]</strong> [Successfully coordinated board pre-reads — all submitted on time]<br />
              &bull; <strong style={{ color: "#059669" }}>[Win]</strong> [CEO praised meeting prep quality for investor meeting]<br />
              &bull; <strong style={{ color: "#059669" }}>[Shoutout]</strong> [Finance team turned around budget analysis in 24 hours]<br />
              &bull; <strong style={{ color: "#059669" }}>[Win]</strong> [Travel rebooked smoothly after last-minute cancellation]
            </td></tr>
          </tbody></table>
          <table style={{ ...S.tbl, marginTop: "4px" }}><tbody>
            <tr><td style={{ ...S.tdLabel, width: "40%" }}>Executive Mood</td><td style={{ ...S.td0, fontWeight: 700, color: "#059669" }}>[😊 Good — energized after investor call]</td></tr>
            <tr><td style={S.tdLabelAlt}>Energy Check</td><td style={S.tdAlt}>[🔋 High — no travel this week]</td></tr>
          </tbody></table>
        </td>
      </tr></tbody></table>
      <CopyButton targetRef={radarRef} label="Copy Section" />
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50/30">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-purple-600 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-purple-50 border border-purple-100 text-purple-700 text-xs font-semibold"><Zap size={11} />⭐ All-Star</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/ea-cos-command-center" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-purple-600 transition-colors"><ArrowLeft size={14} />Back to EA/CoS Command Center</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center"><Home size={20} className="text-purple-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">Executive OS Dashboard</h2><p className="text-xs font-medium text-purple-600">⭐ All-Star &mdash; Your Daily Home Base</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">One page: Today&apos;s priorities, upcoming meetings, open requests, waiting-on items, risk radar, and wins. Instant clarity every morning.</p>
        </div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">View Mode</p>
          <div className="flex flex-wrap gap-2">
            {LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (
              <button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-purple-600 text-white border-purple-600 shadow-md shadow-purple-200" : "bg-white text-slate-600 border-slate-200 hover:border-purple-300 hover:text-purple-700"}`}>
                <Icon size={15} /><span>{l.label}</span><span className={`text-[10px] font-medium ${isActive ? "text-purple-200" : "text-slate-400"}`}>{l.desc}</span>
              </button>
            ); })}
          </div>
        </div>
        <div ref={fullPageRef} style={{ fontFamily: S.font }}>
          {layout === "full" && <>{renderTitleBanner()}{renderPriorities()}{renderMeetings()}{renderRequests()}{renderRadar()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderPriorities()}{renderMeetings()}{renderRequests()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function ExecOSDashboardPage() { return <ThemeProvider><ExecOSDashboardContent /></ThemeProvider>; }
