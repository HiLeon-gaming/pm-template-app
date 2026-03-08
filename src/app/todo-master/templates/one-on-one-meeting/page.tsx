"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, Users, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "quick";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full 1:1", desc: "Career + feedback + actions", icon: LayoutDashboard },
  { id: "quick", label: "Quick Check-in", desc: "Wins + blockers + actions", icon: AlignJustify },
];

function OneOnOneContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const winsRef = useRef<HTMLDivElement>(null);
  const challengesRef = useRef<HTMLDivElement>(null);
  const careerRef = useRef<HTMLDivElement>(null);
  const feedbackRef = useRef<HTMLDivElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);
  const pulseRef = useRef<HTMLDivElement>(null);

  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}>
      <tbody>
        <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${C.accent}`, textAlign: "center" as const }}>👥 1-ON-1 MEETING TEMPLATE</td></tr>
        <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; The To-Do Master Template Package &nbsp;|&nbsp; Connect &bull; Coach &bull; Grow</td></tr>
      </tbody>
    </table>
  );

  const renderDateHeader = () => (
    <div ref={headerRef} style={{ marginBottom: "12px" }}>
      <table style={S.tbl}>
        <tbody>
          <tr>
            <td style={{ ...S.tdLabel, width: "14%" }}>Date</td>
            <td style={{ ...S.td0, width: "20%" }}>[MM/DD/YYYY]</td>
            <td style={{ ...S.tdLabel, width: "10%" }}>Time</td>
            <td style={{ ...S.td0, width: "14%" }}>[HH:MM]</td>
            <td style={{ ...S.tdLabel, width: "14%" }}>Cadence</td>
            <td style={{ ...S.td0, width: "28%" }}>☐ Weekly ☐ Bi-weekly ☐ Monthly</td>
          </tr>
          <tr>
            <td style={S.tdLabelAlt}>Manager</td>
            <td style={S.tdAlt}>[Manager Name]</td>
            <td style={S.tdLabelAlt}>Direct Report</td>
            <td colSpan={3} style={S.tdAlt}>[Team Member Name] — [Role/Title]</td>
          </tr>
          <tr>
            <td style={S.tdLabel}>Meeting Mood</td>
            <td colSpan={5} style={S.td0}>☐ 😊 Great ☐ 🙂 Good ☐ 😐 Neutral ☐ 😟 Stressed ☐ 😤 Frustrated</td>
          </tr>
        </tbody>
      </table>
      <CopyButton targetRef={headerRef} label="Copy Section" />
    </div>
  );

  const renderWins = () => (
    <div ref={winsRef} style={{ marginBottom: "12px" }}>
      <table style={S.tbl}>
        <thead>
          <tr>
            <td colSpan={2} style={{
              backgroundColor: "#D1FAE5", color: "#059669",
              padding: "10px 14px", fontFamily: S.font, fontSize: "14px",
              fontWeight: 800, borderBottom: "3px solid #059669",
              border: `1.5px solid ${C.border}`,
            }}>
              🏆 WINS &amp; HIGHLIGHTS
            </td>
          </tr>
        </thead>
        <tbody>
          {[
            "[e.g., Shipped the auth module 2 days early — great work managing the complexity]",
            "[e.g., Received positive feedback from client on the presentation]",
            "[e.g., Mentored the new hire through their first sprint]",
            "[Add win]",
            "[Add win]",
          ].map((text, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, width: "4%", textAlign: "center" as const, color: "#059669", fontWeight: 700 }}>★</td>
                <td style={{ ...S.td0, backgroundColor: bg }}>{text}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <CopyButton targetRef={winsRef} label="Copy Section" />
    </div>
  );

  const renderChallenges = () => (
    <div ref={challengesRef} style={{ marginBottom: "12px" }}>
      <table style={S.tbl}>
        <thead>
          <tr>
            <td colSpan={3} style={{
              backgroundColor: "#FEF3C7", color: "#D97706",
              padding: "10px 14px", fontFamily: S.font, fontSize: "14px",
              fontWeight: 800, borderBottom: "3px solid #D97706",
              border: `1.5px solid ${C.border}`,
            }}>
              ⚠️ CHALLENGES &amp; BLOCKERS
            </td>
          </tr>
          <tr>
            <th style={{ ...S.thSecondary, width: "5%", textAlign: "center" as const }}>#</th>
            <th style={S.thSecondary}>Challenge / Blocker</th>
            <th style={{ ...S.thSecondary, width: "30%" }}>How Can I Help?</th>
          </tr>
        </thead>
        <tbody>
          {[
            { challenge: "[e.g., Cross-team dependency with Platform team is slowing sprint velocity]", help: "[Schedule alignment meeting, escalate to VP if needed]" },
            { challenge: "[e.g., Feeling overwhelmed with concurrent projects — struggling to prioritize]", help: "[Help reprioritize; identify what to delegate or defer]" },
            { challenge: "[Add challenge]", help: "" },
            { challenge: "[Add challenge]", help: "" },
          ].map((row, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, color: "#D97706" }}>{i + 1}</td>
                <td style={{ ...S.td0, backgroundColor: bg }}>{row.challenge}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "12px", fontStyle: "italic" as const }}>{row.help}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <CopyButton targetRef={challengesRef} label="Copy Section" />
    </div>
  );

  const renderCareer = () => (
    <div ref={careerRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner()}>🚀 CAREER DEVELOPMENT</div>
      <CopyButton targetRef={careerRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead>
          <tr>
            <th style={{ ...S.thPrimary, width: "35%" }}>Topic</th>
            <th style={S.thPrimary}>Discussion</th>
          </tr>
        </thead>
        <tbody>
          {[
            { topic: "Short-term goal progress (this quarter)", a: "" },
            { topic: "Long-term career aspiration", a: "" },
            { topic: "Skills to develop", a: "" },
            { topic: "Stretch opportunity or project", a: "" },
            { topic: "Training / learning requested", a: "" },
          ].map((row, i) => {
            const isAlt = i % 2 === 1;
            return (
              <tr key={i}>
                <td style={{ ...(isAlt ? S.tdLabelAlt : S.tdLabel), verticalAlign: "top" as const }}>{row.topic}</td>
                <td style={{ ...(isAlt ? S.tdAlt : S.td0), height: "36px" }}>{row.a}&nbsp;</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderFeedback = () => (
    <div ref={feedbackRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(C.secondary)}>💬 FEEDBACK EXCHANGE</div>
      <CopyButton targetRef={feedbackRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead>
          <tr>
            <th style={{ ...S.thSecondary, width: "50%" }}>Manager → Direct Report</th>
            <th style={S.thSecondary}>Direct Report → Manager</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ ...S.td0, verticalAlign: "top" as const, height: "48px" }}>
              <span style={{ fontSize: "11px", fontWeight: 600, color: "#059669" }}>What&apos;s going well:</span><br />&nbsp;
            </td>
            <td style={{ ...S.td0, verticalAlign: "top" as const, height: "48px" }}>
              <span style={{ fontSize: "11px", fontWeight: 600, color: "#059669" }}>What my manager does well:</span><br />&nbsp;
            </td>
          </tr>
          <tr>
            <td style={{ ...S.tdAlt, verticalAlign: "top" as const, height: "48px" }}>
              <span style={{ fontSize: "11px", fontWeight: 600, color: "#D97706" }}>Area to improve:</span><br />&nbsp;
            </td>
            <td style={{ ...S.tdAlt, verticalAlign: "top" as const, height: "48px" }}>
              <span style={{ fontSize: "11px", fontWeight: 600, color: "#D97706" }}>How my manager can help more:</span><br />&nbsp;
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );

  const renderActions = () => (
    <div ref={actionsRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner()}>🎯 ACTION ITEMS</div>
      <CopyButton targetRef={actionsRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead>
          <tr>
            <th style={{ ...S.thPrimary, width: "5%", textAlign: "center" as const }}>☐</th>
            <th style={S.thPrimary}>Action Item</th>
            <th style={{ ...S.thPrimary, width: "14%" }}>Owner</th>
            <th style={{ ...S.thPrimary, width: "12%", textAlign: "center" as const }}>Due</th>
          </tr>
        </thead>
        <tbody>
          {[
            { action: "[e.g., Schedule alignment meeting with Platform team re: dependencies]", owner: "[Manager]", due: "[Date]" },
            { action: "[e.g., Draft proposal for new monitoring approach]", owner: "[Direct Report]", due: "[Date]" },
            { action: "[e.g., Sign up for advanced React course on Udemy]", owner: "[Direct Report]", due: "[Date]" },
            { action: "[Add action]", owner: "", due: "" },
            { action: "[Add action]", owner: "", due: "" },
          ].map((row, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "14px" }}>☐</td>
                <td style={{ ...S.td0, backgroundColor: bg }}>{row.action}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{row.owner}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "11px" }}>{row.due}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderPulse = () => (
    <div ref={pulseRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(C.secondary)}>📊 ENGAGEMENT PULSE</div>
      <CopyButton targetRef={pulseRef} label="Copy Section" />
      <table style={S.tbl}>
        <tbody>
          {[
            { q: "How engaged do you feel? (1-10)", a: "[___] / 10" },
            { q: "Workload level", a: "☐ Too Light ☐ Just Right ☐ Heavy ☐ Overwhelming" },
            { q: "Team dynamics", a: "☐ Excellent ☐ Good ☐ Needs Work ☐ Concerning" },
            { q: "Work-life balance", a: "☐ Great ☐ Manageable ☐ Struggling" },
            { q: "Anything else on your mind?", a: "" },
          ].map((row, i) => {
            const isAlt = i % 2 === 1;
            return (
              <tr key={i}>
                <td style={{ ...(isAlt ? S.tdLabelAlt : S.tdLabel), width: "35%" }}>{row.q}</td>
                <td style={isAlt ? S.tdAlt : S.td0}>{row.a}&nbsp;</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderFooter = () => (
    <table style={{ ...S.tbl, marginTop: "8px" }}>
      <tbody><tr><td style={{ backgroundColor: C.primary, color: C.footerText, padding: "8px 20px", fontSize: "10px", fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.06em" }}>ExecNoteShop &nbsp;&bull;&nbsp; The To-Do Master Template Package &nbsp;&bull;&nbsp; &copy; 2026 All Rights Reserved</td></tr></tbody>
    </table>
  );

  const renderFullLayout = () => (
    <>
      {renderTitleBanner()}{renderDateHeader()}
      <table style={LT}><tbody><tr>
        <td style={{ ...LC, width: "50%", paddingRight: "8px" }}>{renderWins()}</td>
        <td style={{ ...LC, width: "50%", paddingLeft: "8px" }}>{renderChallenges()}</td>
      </tr></tbody></table>
      {renderCareer()}
      <table style={LT}><tbody><tr>
        <td style={{ ...LC, width: "55%", paddingRight: "8px" }}>{renderFeedback()}</td>
        <td style={{ ...LC, width: "45%", paddingLeft: "8px" }}>{renderPulse()}</td>
      </tr></tbody></table>
      {renderActions()}{renderFooter()}
    </>
  );

  const renderQuickLayout = () => (
    <>{renderTitleBanner()}{renderDateHeader()}{renderWins()}{renderChallenges()}{renderActions()}{renderFooter()}</>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-fuchsia-50/20">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-fuchsia-50 border border-fuchsia-100 text-fuchsia-700 text-xs font-semibold"><Users size={11} /> 1:1 Meeting</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/todo-master" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-fuchsia-600 transition-colors"><ArrowLeft size={14} /> Back to To-Do Master</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-fuchsia-100 flex items-center justify-center"><Users size={20} className="text-fuchsia-600" /></div>
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900">1-on-1 Meeting Template</h2>
              <p className="text-xs font-medium text-fuchsia-600">Connect &bull; Coach &bull; Grow &mdash; Manager/Direct Report Framework</p>
            </div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Structured 1:1 with wins, challenges, career development, two-way feedback, engagement pulse, and action items. Full mode is a comprehensive coaching session; Quick Check-in is a focused 15-minute version.</p>
        </div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Meeting Style</p>
          <div className="flex flex-wrap gap-2">
            {LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (
              <button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-fuchsia-600 text-white border-fuchsia-600 shadow-md shadow-fuchsia-200" : "bg-white text-slate-600 border-slate-200 hover:border-fuchsia-300 hover:text-fuchsia-700"}`}>
                <Icon size={15} /> <span>{l.label}</span> <span className={`text-[10px] font-medium ${isActive ? "text-fuchsia-200" : "text-slate-400"}`}>{l.desc}</span>
              </button>
            ); })}
          </div>
        </div>
        <div ref={fullPageRef} style={{ fontFamily: S.font }}>
          {layout === "full" && renderFullLayout()}
          {layout === "quick" && renderQuickLayout()}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function OneOnOneMeetingPage() {
  return (<ThemeProvider><OneOnOneContent /></ThemeProvider>);
}
