"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, Handshake, LayoutDashboard, AlignJustify, Zap } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Dashboard", desc: "Hot stakeholders + follow-ups + commitments + risks + touchpoints + tips", icon: LayoutDashboard },
  { id: "compact", label: "Quick View", desc: "Hot stakeholders + follow-ups only", icon: AlignJustify },
];

function DashboardContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullRef = useRef<HTMLDivElement>(null);
  const hotRef = useRef<HTMLDivElement>(null);
  const followRef = useRef<HTMLDivElement>(null);
  const commitRef = useRef<HTMLDivElement>(null);
  const riskRef = useRef<HTMLDivElement>(null);
  const touchRef = useRef<HTMLDivElement>(null);
  const tipsRef = useRef<HTMLDivElement>(null);

  const accent = "#E11D48";

  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>RELATIONSHIP COMMAND DASHBOARD</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; Relationship &amp; Stakeholder Management Hub &nbsp;|&nbsp; &#11088; All-Star &nbsp;|&nbsp; Your Daily Home Base</td></tr>
    </tbody></table>
  );

  const renderHotStakeholders = () => (
    <div ref={hotRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(accent)}>HOT STAKEHOLDERS &mdash; NEED ATTENTION THIS WEEK</div>
      <CopyButton targetRef={hotRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>These are the people who can make or break your week. Review every Monday morning. If a stakeholder is &quot;Red,&quot; they should be your first conversation today.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "5%", textAlign: "center" as const }}>#</th>
          <th style={S.thPrimary}>Stakeholder</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Health</th>
          <th style={S.thPrimary}>Why Hot</th>
          <th style={S.thPrimary}>Next Action</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Due</th>
        </tr></thead>
        <tbody>
          {[
            { n: "1", name: "Sarah Chen, VP Product", health: "Amber", hBg: C.badgeAmberBg, hFg: C.badgeAmberFg, why: "Missed 2 follow-ups; alignment drifting on Q2 roadmap priorities", action: "Schedule 1:1 this week; bring updated timeline + 3 options", due: "Mon" },
            { n: "2", name: "David Park, CFO", health: "Red", hBg: C.badgeRedBg, hFg: C.badgeRedFg, why: "Budget concerns escalating; asked for ROI data twice with no response", action: "Send 1-page financial summary with projected savings", due: "Tue" },
            { n: "3", name: "Maria Lopez, Sponsor", health: "Green", hBg: C.badgeGreenBg, hFg: C.badgeGreenFg, why: "Quarterly review prep needed; she presents to board Friday", action: "Prep executive brief + confirm agenda by Wednesday", due: "Wed" },
            { n: "4", name: "James Wu, Engineering Lead", health: "Amber", hBg: C.badgeAmberBg, hFg: C.badgeAmberFg, why: "Critical API dependency at risk; no response to last 2 emails", action: "Escalate via his manager or schedule walk-up conversation", due: "Thu" },
            { n: "5", name: "Lisa Tran, Legal Counsel", health: "Red", hBg: C.badgeRedBg, hFg: C.badgeRedFg, why: "Contract review blocking vendor onboarding; 3 weeks overdue", action: "Call directly + offer to simplify scope to unblock", due: "Mon" },
            { n: "6", name: "[Enter name, title]", health: "[RAG]", hBg: C.badgeGrayBg, hFg: C.badgeGrayFg, why: "[Why they need attention right now]", action: "[Specific next step with timeline]", due: "[Day]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 800, fontSize: "12px", color: accent }}>{r.n}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 700 }}>{r.name}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.hBg, r.hFg)}>{r.health}</span></td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.why}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.action}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, fontSize: "10px" }}>{r.due}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderFollowUps = () => (
    <div ref={followRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner("#DC2626")}>FOLLOW-UPS DUE THIS WEEK</div>
      <CopyButton targetRef={followRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>Every missed follow-up erodes trust. Check this list daily. Mark items &quot;Done&quot; immediately after completing them so you always know where you stand.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "5%", textAlign: "center" as const }}>#</th>
          <th style={{ ...S.thPrimary, width: "15%" }}>Stakeholder</th>
          <th style={S.thPrimary}>What You Owe Them</th>
          <th style={{ ...S.thPrimary, width: "22%" }}>Context / Why It Matters</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Due</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Status</th>
        </tr></thead>
        <tbody>
          {[
            { n: "1", who: "Sarah Chen", what: "Send revised project timeline with Phase 2 milestones", ctx: "She needs this for her planning meeting Thursday", due: "Mon", s: "Pending", sBg: C.badgeAmberBg, sFg: C.badgeAmberFg },
            { n: "2", who: "David Park", what: "Share ROI summary deck (1-page, financials only)", ctx: "He asked twice already; this is trust-critical", due: "Tue", s: "Pending", sBg: C.badgeAmberBg, sFg: C.badgeAmberFg },
            { n: "3", who: "Maria Lopez", what: "Confirm QBR agenda + send pre-read materials", ctx: "Board presentation Friday; she needs time to review", due: "Wed", s: "Done", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg },
            { n: "4", who: "James Wu", what: "Follow up on API dependency timeline", ctx: "Blocks 3 downstream tasks; team waiting", due: "Thu", s: "Pending", sBg: C.badgeAmberBg, sFg: C.badgeAmberFg },
            { n: "5", who: "Lisa Tran", what: "Send simplified contract scope for faster legal review", ctx: "Original scope too broad; offer reduced version to unblock", due: "Mon", s: "Pending", sBg: C.badgeAmberBg, sFg: C.badgeAmberFg },
            { n: "6", who: "[Name]", what: "[What you promised to deliver]", ctx: "[Why this matters to them]", due: "[Day]", s: "[Status]", sBg: C.badgeGrayBg, sFg: C.badgeGrayFg },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 800, fontSize: "12px", color: "#DC2626" }}>{r.n}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 700 }}>{r.who}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.what}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", color: C.textMuted }}>{r.ctx}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, fontSize: "10px" }}>{r.due}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.sBg, r.sFg)}>{r.s}</span></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderCommitments = () => (
    <div ref={commitRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner("#EA580C")}>COMMITMENTS DUE &mdash; PROMISES TO KEEP</div>
      <CopyButton targetRef={commitRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>Promises you made to stakeholders. Broken promises = broken trust. If you cannot deliver on time, proactively communicate BEFORE the deadline &mdash; never after.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={S.thPrimary}>Commitment (What You Promised)</th>
          <th style={{ ...S.thPrimary, width: "14%" }}>To Whom</th>
          <th style={{ ...S.thPrimary, width: "18%" }}>Impact If Missed</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Due</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Status</th>
        </tr></thead>
        <tbody>
          {[
            { what: "Deliver budget impact analysis with 3 scenarios", who: "David Park", impact: "He will escalate to CEO; project funding at risk", due: "Tue", s: "At Risk", sBg: C.badgeRedBg, sFg: C.badgeRedFg },
            { what: "Share draft roadmap with Phase 2 dependencies mapped", who: "Sarah Chen", impact: "Her team can't start planning without this", due: "Fri", s: "On Track", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg },
            { what: "Send meeting recap + action items to steering committee", who: "Maria Lopez", impact: "Committee loses context; decisions get revisited", due: "Wed", s: "Done", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg },
            { what: "Provide vendor comparison matrix for procurement review", who: "Lisa Tran", impact: "Legal review delayed further; vendor timeline slips", due: "Thu", s: "On Track", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg },
            { what: "[What you committed to deliver]", who: "[Stakeholder]", impact: "[What happens if you miss this]", due: "[Day]", s: "[Status]", sBg: C.badgeGrayBg, sFg: C.badgeGrayFg },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.what}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 700 }}>{r.who}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", color: C.textMuted }}>{r.impact}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, fontSize: "10px" }}>{r.due}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.sBg, r.sFg)}>{r.s}</span></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderRisks = () => (
    <div ref={riskRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner("#6366F1")}>STAKEHOLDER RISKS &amp; LANDMINES</div>
      <CopyButton targetRef={riskRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>Risks that come from people, not projects. A disengaged sponsor or a blocker in legal can derail everything. Track them here and mitigate proactively.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={S.thPrimary}>Risk / Landmine</th>
          <th style={{ ...S.thPrimary, width: "14%" }}>Stakeholder</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Severity</th>
          <th style={S.thPrimary}>Mitigation / Next Step</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Deadline</th>
        </tr></thead>
        <tbody>
          {[
            { risk: "CFO may block Phase 2 funding if ROI is unclear", who: "David Park", sev: "High", sBg: C.badgeRedBg, sFg: C.badgeRedFg, mit: "Prepare 1-page ROI summary with projected savings and payback period", dead: "Tue" },
            { risk: "Engineering lead unresponsive; API dependency at risk", who: "James Wu", sev: "High", sBg: C.badgeRedBg, sFg: C.badgeRedFg, mit: "Escalate to his manager if no reply by Thursday; prepare fallback plan", dead: "Thu" },
            { risk: "Legal review creating 3-week delay on vendor contract", who: "Lisa Tran", sev: "Med", sBg: C.badgeAmberBg, sFg: C.badgeAmberFg, mit: "Offer simplified contract scope; schedule 30-min working session", dead: "Wed" },
            { risk: "Sponsor distracted by board prep; may lose attention", who: "Maria Lopez", sev: "Low", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg, mit: "Keep updates ultra-brief this week; send 3-bullet summary only", dead: "Fri" },
            { risk: "[Describe the stakeholder-driven risk]", who: "[Name]", sev: "[H/M/L]", sBg: C.badgeGrayBg, sFg: C.badgeGrayFg, mit: "[Specific action to reduce risk]", dead: "[Day]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.risk}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 700 }}>{r.who}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.sBg, r.sFg)}>{r.sev}</span></td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.mit}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, fontSize: "10px" }}>{r.dead}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderTouchpoints = () => (
    <div ref={touchRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner("#059669")}>UPCOMING TOUCHPOINTS &amp; KEY MEETINGS</div>
      <CopyButton targetRef={touchRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>Prep before every meeting. Walking in unprepared to a stakeholder meeting is worse than canceling it. Your goal should be clear BEFORE you sit down.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Date</th>
          <th style={{ ...S.thPrimary, width: "14%" }}>Stakeholder</th>
          <th style={S.thPrimary}>Meeting / Touchpoint</th>
          <th style={S.thPrimary}>Your Goal for This Meeting</th>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Prep?</th>
        </tr></thead>
        <tbody>
          {[
            { date: "Mon", who: "Sarah Chen", meet: "1:1 catch-up (30 min)", goal: "Re-align on timeline; present 3 options; rebuild trust after missed follow-ups", prep: "No", pBg: C.badgeAmberBg, pFg: C.badgeAmberFg },
            { date: "Wed", who: "Maria Lopez", meet: "QBR prep call (45 min)", goal: "Confirm agenda + pre-reads; ensure she has what she needs for board", prep: "Yes", pBg: C.badgeGreenBg, pFg: C.badgeGreenFg },
            { date: "Thu", who: "Steering Committee", meet: "Monthly review (60 min)", goal: "Get budget approval for Phase 2; present ROI summary", prep: "No", pBg: C.badgeAmberBg, pFg: C.badgeAmberFg },
            { date: "Fri", who: "Lisa Tran", meet: "Contract working session (30 min)", goal: "Simplify scope; get verbal approval to proceed", prep: "No", pBg: C.badgeAmberBg, pFg: C.badgeAmberFg },
            { date: "[Day]", who: "[Stakeholder]", meet: "[Type + duration]", goal: "[What success looks like for this meeting]", prep: "[Y/N]", pBg: C.badgeGrayBg, pFg: C.badgeGrayFg },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, fontSize: "10px" }}>{r.date}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 700 }}>{r.who}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.meet}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.goal}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.pBg, r.pFg)}>{r.prep}</span></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderTipsAndHealth = () => (
    <div ref={tipsRef} style={{ marginBottom: "12px" }}>
      <CopyButton targetRef={tipsRef} label="Copy Section" />
      <table style={LT}><tbody><tr>
        <td style={{ ...LC, width: "50%", paddingRight: "4px" }}>
          <table style={S.tbl}>
            <thead><tr><td style={{ backgroundColor: "#DBEAFE", color: "#0EA5E9", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #0EA5E9" }}>HEALTH SCORING GUIDE</td></tr></thead>
            <tbody>
              {[
                { score: "Green", bg: C.badgeGreenBg, fg: C.badgeGreenFg, desc: "Relationship is strong. Regular cadence, mutual trust, no outstanding issues. Maintain rhythm." },
                { score: "Amber", bg: C.badgeAmberBg, fg: C.badgeAmberFg, desc: "Warning signs: missed follow-ups, slow responses, slight misalignment. Needs proactive attention this week." },
                { score: "Red", bg: C.badgeRedBg, fg: C.badgeRedFg, desc: "Relationship at risk: broken commitments, active conflict, blocked decisions. Fix this TODAY." },
              ].map((r, i) => {
                const rowBg = i % 2 === 1 ? C.rowAlt : C.white;
                return (
                  <tr key={i}>
                    <td style={{ ...S.td0, backgroundColor: rowBg, fontSize: "10px", padding: "6px 10px" }}>
                      <span style={S.badge(r.bg, r.fg)}>{r.score}</span><br />
                      <span style={{ fontSize: "9px", color: C.textMuted }}>{r.desc}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </td>
        <td style={{ ...LC, width: "50%", paddingLeft: "4px" }}>
          <table style={S.tbl}>
            <thead><tr><td style={{ backgroundColor: "#D1FAE5", color: "#059669", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #059669" }}>WEEKLY DASHBOARD TIPS</td></tr></thead>
            <tbody>
              {[
                { color: accent, tip: "Review every Monday morning.", detail: "5 minutes: scan hot stakeholders, follow-ups, and commitments. Set your week." },
                { color: "#059669", tip: "Never have more than 5 hot stakeholders.", detail: "If everyone is hot, nobody is. Prioritize ruthlessly." },
                { color: "#D97706", tip: "Follow-ups before new work.", detail: "Delivering on promises builds more trust than starting new things." },
                { color: "#DC2626", tip: "Red = same-day action.", detail: "A Red stakeholder should never stay Red for more than 48 hours without a plan." },
                { color: "#6366F1", tip: "Update this AFTER every key meeting.", detail: "2 minutes after each meeting: update status, add follow-ups, adjust risks." },
              ].map((r, i) => {
                const rowBg = i % 2 === 1 ? C.rowAlt : C.white;
                return (
                  <tr key={i}>
                    <td style={{ ...S.td0, backgroundColor: rowBg, fontSize: "10px", padding: "5px 10px" }}>
                      <strong style={{ color: r.color }}>{r.tip}</strong><br />
                      <span style={{ fontSize: "9px", color: C.textMuted }}>{r.detail}</span>
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
        ExecNoteShop &bull; Relationship &amp; Stakeholder Management Hub &bull; &copy; 2026 All Rights Reserved
      </td>
    </tr></tbody></table>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-rose-50/30">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-rose-600 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-100 text-amber-700 text-xs font-semibold"><Zap size={11} />All-Star</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/relationship-hub" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-rose-600 transition-colors"><ArrowLeft size={14} />Back to Relationship Hub</Link>
          <CopyAllButton targetRef={fullRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-rose-100 flex items-center justify-center"><Handshake size={20} className="text-rose-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">Relationship Command Dashboard</h2><p className="text-xs font-medium text-rose-600">&#11088; All-Star &mdash; Your Daily Home Base</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Your single-page command center for stakeholder relationships. Open this every Monday morning to see who needs attention, what you owe people, and where risks are building. This is how you stay proactive instead of reactive.</p>
        </div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">View Mode</p>
          <div className="flex flex-wrap gap-2">
            {LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (
              <button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-rose-600 text-white border-rose-600 shadow-md shadow-rose-200" : "bg-white text-slate-600 border-slate-200 hover:border-rose-300 hover:text-rose-700"}`}>
                <Icon size={15} /><span>{l.label}</span><span className={`text-[10px] font-medium ${isActive ? "text-rose-200" : "text-slate-400"}`}>{l.desc}</span>
              </button>
            ); })}
          </div>
        </div>
        <div ref={fullRef} style={{ fontFamily: S.font }}>
          {layout === "full" && <>{renderTitleBanner()}{renderHotStakeholders()}{renderFollowUps()}{renderCommitments()}{renderRisks()}{renderTouchpoints()}{renderTipsAndHealth()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderHotStakeholders()}{renderFollowUps()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullRef} /></div>
      </div>
    </div>
  );
}

export default function RelationshipCommandDashboard() { return <ThemeProvider><DashboardContent /></ThemeProvider>; }
