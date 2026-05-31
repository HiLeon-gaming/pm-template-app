"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Layout,
  BookOpen,
  LayoutDashboard,
  AlignJustify,
  Zap,
} from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "quick";

const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Guide", desc: "Complete setup", icon: LayoutDashboard },
  { id: "quick", label: "Quick Reference", desc: "Cheat sheet", icon: AlignJustify },
];

function ReadThisFirstContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");

  const fullPageRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const loopRef = useRef<HTMLDivElement>(null);
  const rhythmRef = useRef<HTMLDivElement>(null);
  const setupRef = useRef<HTMLDivElement>(null);
  const allStarRef = useRef<HTMLDivElement>(null);
  const jiraRef = useRef<HTMLDivElement>(null);
  const indexRef = useRef<HTMLDivElement>(null);

  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };

  const accent = "#0EA5E9";
  const accentDark = "#0369A1";

  /* ═══════ SECTIONS ═══════ */

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}>
      <tbody>
        <tr>
          <td style={{
            backgroundColor: C.primary, color: C.white, padding: "18px 20px",
            fontSize: "22px", fontWeight: 800, fontFamily: S.font,
            letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`,
            textAlign: "center" as const,
          }}>
            📖 READ THIS FIRST — Agile / Scrum Delivery Command Center
          </td>
        </tr>
        <tr>
          <td style={{
            backgroundColor: C.secondary, color: C.white, padding: "6px 20px",
            fontSize: "11px", fontWeight: 600, fontFamily: S.font,
            textAlign: "center" as const, letterSpacing: "0.08em",
            textTransform: "uppercase" as const,
          }}>
            ExecNoteShop &nbsp;|&nbsp; Agile / Scrum Delivery Command Center &nbsp;|&nbsp; Your Complete Setup Guide
          </td>
        </tr>
      </tbody>
    </table>
  );

  /* ── What This Pack Is ── */
  const renderIntro = () => (
    <div ref={introRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accent)}>⚡ WHAT THIS PACK IS (PLAIN ENGLISH)</td></tr></tbody></table>
      <CopyButton targetRef={introRef} label="Copy Section" />
      <table style={S.tbl}>
        <tbody>
          <tr>
            <td style={{ ...S.td0, padding: "14px 16px", fontSize: "12px", lineHeight: "1.7" }}>
              This is a <strong>complete OneNote &ldquo;command center&rdquo;</strong> for running Agile and Scrum projects.
              Think of it like a <strong>mission control room</strong>:
            </td>
          </tr>
        </tbody>
      </table>
      {/* 2-col: Your Tool vs This Pack */}
      <table style={LT}>
        <tbody>
          <tr>
            <td style={{ ...LC, width: "50%", paddingRight: "5px" }}>
              <table style={S.tbl}>
                <thead>
                  <tr>
                    <td style={{
                      backgroundColor: C.badgeBlueBg, color: C.badgeBlueFg, padding: "10px 14px",
                      fontFamily: S.font, fontSize: "13px", fontWeight: 800,
                      border: `1.5px solid ${C.border}`,
                    }}>
                      🔧 Your Jira / Asana / Trello
                    </td>
                  </tr>
                </thead>
                <tbody>
                  {[
                    "Tasks move across columns",
                    "Sprint boards & kanban",
                    "Individual assignments",
                    "Status at the task level",
                  ].map((item, i) => (
                    <tr key={i}>
                      <td style={{ ...S.td0, backgroundColor: i % 2 === 0 ? C.white : C.rowAlt, fontSize: "11px", padding: "6px 12px" }}>
                        → {item}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </td>
            <td style={{ ...LC, width: "50%", paddingLeft: "5px" }}>
              <table style={S.tbl}>
                <thead>
                  <tr>
                    <td style={{
                      backgroundColor: accent, color: C.white, padding: "10px 14px",
                      fontFamily: S.font, fontSize: "13px", fontWeight: 800,
                      border: `1.5px solid ${C.border}`,
                    }}>
                      🚀 This OneNote Command Center
                    </td>
                  </tr>
                </thead>
                <tbody>
                  {[
                    "Vision + outcomes (the WHY)",
                    "Backlog clarity & prioritization",
                    "Sprint planning decisions",
                    "Daily notes, blockers & escalations",
                    "Demos, feedback & retro actions",
                    "Metrics + simple reporting",
                  ].map((item, i) => (
                    <tr key={i}>
                      <td style={{ ...S.td0, backgroundColor: i % 2 === 0 ? C.white : C.rowAlt, fontSize: "11px", padding: "6px 12px" }}>
                        ✦ {item}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
      <table style={S.tbl}>
        <tbody>
          <tr>
            <td style={{
              backgroundColor: C.badgeAmberBg, color: C.badgeAmberFg, padding: "10px 16px",
              fontSize: "12px", fontWeight: 700, fontFamily: S.font,
              border: `1.5px solid ${C.border}`, textAlign: "center" as const,
            }}>
              ⚠️ This pack helps you avoid the #1 Agile problem: &ldquo;Everyone is busy… but nobody is sure what success is, what&apos;s next, or what&apos;s blocking us.&rdquo;
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );

  /* ── Agile Loop ── */
  const renderLoop = () => (
    <div ref={loopRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accentDark)}>🔄 AGILE / SCRUM IN 60 SECONDS</td></tr></tbody></table>
      <CopyButton targetRef={loopRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>A healthy Agile project is just this loop — repeated until the release goal is met:</p>
      <table style={S.tbl}>
        <thead>
          <tr>
            <th style={{ ...S.thPrimary, width: "6%", textAlign: "center" as const }}>Step</th>
            <th style={{ ...S.thPrimary, width: "30%" }}>What You Do</th>
            <th style={S.thPrimary}>Plain English</th>
          </tr>
        </thead>
        <tbody>
          {[
            { step: "1", what: "Define success", plain: "Decide what \u201Csuccess\u201D means — outcomes, not just tasks" },
            { step: "2", what: "Prioritize the backlog", plain: "Keep a prioritized backlog — best work at the top" },
            { step: "3", what: "Plan a short sprint", plain: "Plan one short sprint (usually 1–2 weeks)" },
            { step: "4", what: "Work daily & unblock", plain: "Work daily, remove blockers fast" },
            { step: "5", what: "Demo & get feedback", plain: "Demo what you built and get feedback" },
            { step: "6", what: "Improve how you work", plain: "Run a retro — improve how you work" },
            { step: "7", what: "Repeat", plain: "Repeat until the release goal is met 🎯" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 800, color: accent, fontSize: "14px" }}>{r.step}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 700, fontSize: "12px" }}>{r.what}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{r.plain}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  /* ── Sprint Rhythms ── */
  const renderRhythms = () => {
    const rhythmCard = (title: string, emoji: string, color: string, items: string[]) => (
      <table style={S.tbl}>
        <thead>
          <tr>
            <td style={{
              backgroundColor: color, color: C.white, padding: "10px 14px",
              fontFamily: S.font, fontSize: "13px", fontWeight: 800,
              border: `1.5px solid ${C.border}`, letterSpacing: "0.02em",
            }}>
              {emoji} {title}
            </td>
          </tr>
        </thead>
        <tbody>
          {items.map((item, i) => (
            <tr key={i}>
              <td style={{ ...S.td0, backgroundColor: i % 2 === 0 ? C.white : C.rowAlt, fontSize: "11px", padding: "5px 12px" }}>
                ☐ {item}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );

    return (
      <div ref={rhythmRef} style={{ marginBottom: "12px" }}>
        <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accent)}>📅 HOW TO USE THIS NOTEBOOK (SIMPLE RHYTHMS)</td></tr></tbody></table>
        <CopyButton targetRef={rhythmRef} label="Copy Section" />
        {/* Row 1: Setup + Sprint Start */}
        <table style={LT}>
          <tbody>
            <tr>
              <td style={{ ...LC, width: "50%", paddingRight: "5px", paddingBottom: "8px" }}>
                {rhythmCard("ONE-TIME SETUP (45 min)", "🛠️", accentDark, [
                  "Product Vision + Outcome Statement",
                  "Now/Next/Later Roadmap",
                  "Backlog Master",
                  "Backlog Prioritization (MoSCoW + WSJF-lite)",
                  "Definition of Ready",
                  "Definition of Done",
                  "Command Dashboard (your home page)",
                ])}
              </td>
              <td style={{ ...LC, width: "50%", paddingLeft: "5px", paddingBottom: "8px" }}>
                {rhythmCard("EVERY SPRINT START (60–90 min)", "🏃", "#059669", [
                  "Sprint Planning Worksheet",
                  "Capacity Planner",
                  "Sprint Goal + Sprint Backlog",
                  "Sprint Scope Change Log (if changes happen)",
                ])}
              </td>
            </tr>
          </tbody>
        </table>
        {/* Row 2: Daily + End of Sprint */}
        <table style={LT}>
          <tbody>
            <tr>
              <td style={{ ...LC, width: "50%", paddingRight: "5px", paddingBottom: "8px" }}>
                {rhythmCard("DAILY (5–10 min)", "☀️", "#F59E0B", [
                  "Daily Scrum Notes + Impediments",
                  "Impediment Log (if something is truly blocked)",
                  "Blocker Escalation (when you need leadership help)",
                ])}
              </td>
              <td style={{ ...LC, width: "50%", paddingLeft: "5px", paddingBottom: "8px" }}>
                {rhythmCard("END OF SPRINT (60 min total)", "🏁", "#DC2626", [
                  "Sprint Review / Demo Notes",
                  "Stakeholder Feedback Log",
                  "Retro Template (choose Start/Stop/Continue or 4Ls)",
                  "Retro Action Plan Tracker",
                ])}
              </td>
            </tr>
          </tbody>
        </table>
        {/* Row 3: Weekly Reporting */}
        <table style={LT}>
          <tbody>
            <tr>
              <td style={{ ...LC, width: "50%", paddingRight: "5px" }}>
                {rhythmCard("WEEKLY REPORTING (10 min)", "📊", "#8B5CF6", [
                  "Executive/Stakeholder Weekly Update",
                  "Sprint Health Snapshot",
                  "Burndown/Burnup Tracker (if you use it)",
                ])}
              </td>
              <td style={{ ...LC, width: "50%", paddingLeft: "5px" }}>
                <table style={S.tbl}>
                  <thead>
                    <tr>
                      <td style={{
                        backgroundColor: C.badgeGreenBg, color: C.badgeGreenFg, padding: "10px 14px",
                        fontFamily: S.font, fontSize: "13px", fontWeight: 800,
                        border: `1.5px solid ${C.border}`,
                      }}>
                        💡 PRO TIP
                      </td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style={{ ...S.td0, fontSize: "11px", padding: "10px 14px", lineHeight: "1.7" }}>
                        Start with just the <strong>All-Star pages</strong> (marked with ⭐ below).
                        Add more pages only when your team needs them. The pack is designed to grow with you — not overwhelm you on day one.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  };

  /* ── One-Time Setup ── */
  const renderSetup = () => (
    <div ref={setupRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accentDark)}>🛠️ ONE-TIME SETUP CHECKLIST</td></tr></tbody></table>
      <CopyButton targetRef={setupRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead>
          <tr>
            <th style={{ ...S.thSecondary, width: "5%", textAlign: "center" as const }}>☐</th>
            <th style={{ ...S.thSecondary, width: "30%" }}>Step</th>
            <th style={S.thSecondary}>What to Do</th>
            <th style={{ ...S.thSecondary, width: "10%", textAlign: "center" as const }}>Time</th>
          </tr>
        </thead>
        <tbody>
          {[
            { step: "1. Define your vision", what: "Open Product Vision + Outcome Statement and fill it in with your team", time: "10 min" },
            { step: "2. Map your roadmap", what: "Open Now/Next/Later Roadmap — what are you building this quarter?", time: "10 min" },
            { step: "3. Load the backlog", what: "Open Backlog Master — enter your current epics, features, and top stories", time: "10 min" },
            { step: "4. Prioritize", what: "Open Backlog Prioritization — score your top items by value/effort/urgency", time: "5 min" },
            { step: "5. Set quality gates", what: "Open Definition of Ready + Definition of Done — agree with team", time: "5 min" },
            { step: "6. Set up your dashboard", what: "Open the Command Dashboard — fill in sprint goal, priorities, and events", time: "5 min" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "15px" }}>☐</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 700, fontSize: "11px" }}>{r.step}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{r.what}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "11px", fontWeight: 600, color: accent }}>{r.time}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  /* ── All-Star Pages ── */
  const renderAllStar = () => (
    <div ref={allStarRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accent)}>⭐ ALL-STAR PAGES (THE ONES YOU&apos;LL USE CONSTANTLY)</td></tr></tbody></table>
      <CopyButton targetRef={allStarRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead>
          <tr>
            <th style={{ ...S.thPrimary, width: "35%" }}>Template</th>
            <th style={S.thPrimary}>Why It&apos;s All-Star</th>
            <th style={{ ...S.thPrimary, width: "14%", textAlign: "center" as const }}>Cadence</th>
          </tr>
        </thead>
        <tbody>
          {[
            { name: "Command Dashboard", why: "One page to see what matters right now", cadence: "Daily" },
            { name: "Product Vision + Outcomes", why: "Keeps the work tied to real success", cadence: "Setup" },
            { name: "Backlog Master", why: "Your single source of truth", cadence: "Weekly" },
            { name: "Backlog Prioritization", why: "Removes \u201Copinion battles\u201D", cadence: "Refinement" },
            { name: "Sprint Planning Worksheet", why: "Prevents overcommitting", cadence: "Sprint start" },
            { name: "Daily Scrum Notes", why: "Keeps momentum + visibility", cadence: "Daily" },
            { name: "Retro Action Plan Tracker", why: "Turns retros into real improvement", cadence: "Sprint end" },
            { name: "Release Readiness Checklist", why: "Prevents painful launches", cadence: "Release" },
            { name: "Burndown/Burnup Tracker", why: "Quick clarity for progress trends", cadence: "Sprint" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 700, fontSize: "12px" }}>⭐ {r.name}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{r.why}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}>
                  <span style={S.badge(C.badgeBlueBg, C.badgeBlueFg)}>{r.cadence}</span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  /* ── Jira / Tool Integration ── */
  const renderJira = () => (
    <div ref={jiraRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accentDark)}>🔗 IF YOU USE JIRA / ASANA / TRELLO</td></tr></tbody></table>
      <CopyButton targetRef={jiraRef} label="Copy Section" />
      <table style={LT}>
        <tbody>
          <tr>
            <td style={{ ...LC, width: "50%", paddingRight: "5px" }}>
              <table style={S.tbl}>
                <thead>
                  <tr>
                    <td style={{
                      backgroundColor: C.badgeGreenBg, color: C.badgeGreenFg, padding: "10px 14px",
                      fontFamily: S.font, fontSize: "13px", fontWeight: 800,
                      border: `1.5px solid ${C.border}`,
                    }}>
                      ✅ Use alongside your tool
                    </td>
                  </tr>
                </thead>
                <tbody>
                  <tr><td style={{ ...S.td0, fontSize: "11px", padding: "8px 12px", lineHeight: "1.7" }}>
                    Perfect. Keep using Jira/Asana/Trello for task tracking. This OneNote pack captures:<br />
                    • <strong>Why</strong> you chose the work<br />
                    • What <strong>&ldquo;done&rdquo;</strong> means<br />
                    • What <strong>changed</strong> and why<br />
                    • <strong>Decisions, risks, blockers, feedback</strong> & improvement actions
                  </td></tr>
                </tbody>
              </table>
            </td>
            <td style={{ ...LC, width: "50%", paddingLeft: "5px" }}>
              <table style={S.tbl}>
                <thead>
                  <tr>
                    <td style={{
                      backgroundColor: C.badgeAmberBg, color: C.badgeAmberFg, padding: "10px 14px",
                      fontFamily: S.font, fontSize: "13px", fontWeight: 800,
                      border: `1.5px solid ${C.border}`,
                    }}>
                      📋 Use OneNote as your only tool
                    </td>
                  </tr>
                </thead>
                <tbody>
                  <tr><td style={{ ...S.td0, fontSize: "11px", padding: "8px 12px", lineHeight: "1.7" }}>
                    You can — but you&apos;ll want to use these extra pages:<br />
                    • <strong>Task Breakdown / To-Do</strong> — simple task list<br />
                    • <strong>Impediment Log</strong> — detailed blocker tracking<br />
                    • <strong>Bug/Defect Log</strong> — defect management
                  </td></tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );

  /* ── Section Index ── */
  const renderIndex = () => (
    <div ref={indexRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accent)}>📑 COMPLETE SECTION INDEX (48 Templates)</td></tr></tbody></table>
      <CopyButton targetRef={indexRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead>
          <tr>
            <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Section</th>
            <th style={{ ...S.thPrimary, width: "34%" }}>Name</th>
            <th style={S.thPrimary}>Focus</th>
            <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Pages</th>
          </tr>
        </thead>
        <tbody>
          {[
            { sec: "A", name: "Start Here", focus: "Setup, orientation & team agreements", pages: "4" },
            { sec: "B", name: "Product Strategy & Value", focus: "Vision, outcomes, users & success metrics", pages: "6" },
            { sec: "C", name: "Roadmap & Release Planning", focus: "Direction, dependencies & decisions", pages: "5" },
            { sec: "D", name: "Backlog System", focus: "Epics, stories, prioritization & refinement", pages: "8" },
            { sec: "E", name: "Sprint Planning & Commitments", focus: "Capacity, goals, scope & kickoff", pages: "6" },
            { sec: "F", name: "Daily Execution", focus: "Standups, blockers, flow & collaboration", pages: "6" },
            { sec: "G", name: "Quality & Delivery", focus: "DoD, testing, defects & release readiness", pages: "5" },
            { sec: "H", name: "Review, Retro & Improvement", focus: "Demos, feedback, retros & action tracking", pages: "5" },
            { sec: "I", name: "Metrics & Reporting", focus: "Burndown, health signals & stakeholder updates", pages: "3" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            const sectionColors = ["#0EA5E9", "#8B5CF6", "#F59E0B", "#EF4444", "#059669", "#0891B2", "#DC2626", "#D946EF", "#EA580C"];
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 800, fontSize: "14px", color: sectionColors[i] }}>{r.sec}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 700, fontSize: "12px" }}>{r.name}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{r.focus}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, color: sectionColors[i] }}>{r.pages}</td>
              </tr>
            );
          })}
          <tr>
            <td style={{ ...S.td0, backgroundColor: C.labelBg, textAlign: "center" as const, fontWeight: 800, fontSize: "13px", color: C.primary }}>Total</td>
            <td colSpan={2} style={{ ...S.td0, backgroundColor: C.labelBg, fontWeight: 700, fontSize: "12px" }}>Complete Agile / Scrum Delivery Command Center</td>
            <td style={{ ...S.td0, backgroundColor: C.labelBg, textAlign: "center" as const, fontWeight: 800, fontSize: "14px", color: accent }}>48</td>
          </tr>
        </tbody>
      </table>
    </div>
  );

  const renderFooter = () => (
    <table style={{ ...S.tbl, marginTop: "8px" }}>
      <tbody>
        <tr>
          <td style={{
            backgroundColor: C.primary, color: C.footerText, padding: "8px 20px",
            fontSize: "10px", fontFamily: S.font, textAlign: "center" as const,
            letterSpacing: "0.06em",
          }}>
            ExecNoteShop &nbsp;&bull;&nbsp; Agile / Scrum Delivery Command Center &nbsp;&bull;&nbsp; &copy; 2026 All Rights Reserved
          </td>
        </tr>
      </tbody>
    </table>
  );

  /* ═══════ LAYOUTS ═══════ */

  const renderFullLayout = () => (
    <>
      {renderTitleBanner()}
      {renderIntro()}
      {renderLoop()}
      {renderRhythms()}
      {/* 2-col: Setup | All-Star */}
      <table style={LT}>
        <tbody>
          <tr>
            <td style={{ ...LC, width: "50%", paddingRight: "8px" }}>{renderSetup()}</td>
            <td style={{ ...LC, width: "50%", paddingLeft: "8px" }}>{renderAllStar()}</td>
          </tr>
        </tbody>
      </table>
      {renderJira()}
      {renderIndex()}
      {renderFooter()}
    </>
  );

  const renderQuickLayout = () => (
    <>
      {renderTitleBanner()}
      {renderLoop()}
      {renderAllStar()}
      {renderIndex()}
      {renderFooter()}
    </>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-sky-50/30">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-sky-600 flex items-center justify-center">
              <Layout size={18} className="text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1>
              <p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p>
            </div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-sky-50 border border-sky-100 text-sky-700 text-xs font-semibold">
            <BookOpen size={11} />
            Read This First
          </span>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/agile-command-center" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-sky-600 transition-colors">
            <ArrowLeft size={14} />
            Back to Agile Command Center
          </Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>

        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-sky-100 flex items-center justify-center">
              <BookOpen size={20} className="text-sky-600" />
            </div>
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900">Read This First</h2>
              <p className="text-xs font-medium text-sky-600">Complete Setup Guide &mdash; Agile / Scrum Delivery Command Center</p>
            </div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">
            Everything you need to know: what this pack is, how to set it up, sprint rhythms,
            All-Star pages, and how it works alongside Jira/Asana/Trello.
          </p>
        </div>

        <ThemeSwitcher />

        <div data-copy-exclude="true" className="mb-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Guide View</p>
          <div className="flex flex-wrap gap-2">
            {LAYOUTS.map((l) => {
              const Icon = l.icon;
              const isActive = layout === l.id;
              return (
                <button key={l.id} onClick={() => setLayout(l.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${
                    isActive ? "bg-sky-600 text-white border-sky-600 shadow-md shadow-sky-200"
                      : "bg-white text-slate-600 border-slate-200 hover:border-sky-300 hover:text-sky-700"
                  }`}>
                  <Icon size={15} />
                  <span>{l.label}</span>
                  <span className={`text-[10px] font-medium ${isActive ? "text-sky-200" : "text-slate-400"}`}>{l.desc}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div ref={fullPageRef} style={{ fontFamily: S.font }}>
          {layout === "full" && renderFullLayout()}
          {layout === "quick" && renderQuickLayout()}
        </div>

        <div className="flex justify-center mt-8 mb-12">
          <CopyAllButton targetRef={fullPageRef} />
        </div>
      </div>
    </div>
  );
}

export default function ReadThisFirstPage() {
  return (
    <ThemeProvider>
      <ReadThisFirstContent />
    </ThemeProvider>
  );
}
