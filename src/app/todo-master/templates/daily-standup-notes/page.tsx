"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Layout,
  MessageSquare,
  LayoutDashboard,
  AlignJustify,
  Star,
} from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "individual" | "team";

const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "individual", label: "Individual", desc: "Your personal standup", icon: AlignJustify },
  { id: "team", label: "Team View", desc: "Track full team", icon: LayoutDashboard },
];

const TEAM_MEMBERS = [
  "Team Member 1",
  "Team Member 2",
  "Team Member 3",
  "Team Member 4",
  "Team Member 5",
];

function DailyStandupContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("individual");

  const fullPageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const yesterdayRef = useRef<HTMLDivElement>(null);
  const todayRef = useRef<HTMLDivElement>(null);
  const blockersRef = useRef<HTMLDivElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);
  const teamRef = useRef<HTMLDivElement>(null);
  const parkingRef = useRef<HTMLDivElement>(null);

  /* ── Layout table styles ── */
  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };

  /* ═══════ SECTIONS ═══════ */

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}>
      <tbody>
        <tr>
          <td style={{
            backgroundColor: C.primary, color: C.white, padding: "16px 20px",
            fontSize: "22px", fontWeight: 800, fontFamily: S.font,
            letterSpacing: "0.04em", borderBottom: `4px solid ${C.accent}`,
            textAlign: "center" as const,
          }}>
            💬 DAILY STANDUP NOTES
          </td>
        </tr>
        <tr>
          <td style={{
            backgroundColor: C.secondary, color: C.white, padding: "6px 20px",
            fontSize: "11px", fontWeight: 600, fontFamily: S.font,
            textAlign: "center" as const, letterSpacing: "0.08em",
            textTransform: "uppercase" as const,
          }}>
            ExecNoteShop &nbsp;|&nbsp; The To-Do Master Template Package &nbsp;|&nbsp; Yesterday &bull; Today &bull; Blockers
          </td>
        </tr>
      </tbody>
    </table>
  );

  const renderDateHeader = () => (
    <div ref={headerRef} style={{ marginBottom: "12px" }}>
      <table style={S.tbl}>
        <tbody>
          <tr>
            <td style={{ ...S.tdLabel, width: "14%" }}>Date</td>
            <td style={{ ...S.td0, width: "22%" }}>[MM/DD/YYYY]</td>
            <td style={{ ...S.tdLabel, width: "10%" }}>Sprint</td>
            <td style={{ ...S.td0, width: "18%" }}>[Sprint ##]</td>
            <td style={{ ...S.tdLabel, width: "12%" }}>Day of Sprint</td>
            <td style={{ ...S.td0, width: "24%" }}>[Day ## of ##]</td>
          </tr>
          <tr>
            <td style={S.tdLabelAlt}>Meeting Time</td>
            <td style={S.tdAlt}>[9:00 AM]</td>
            <td style={S.tdLabelAlt}>Duration</td>
            <td style={S.tdAlt}>[15 min]</td>
            <td style={S.tdLabelAlt}>Facilitator</td>
            <td style={S.tdAlt}>[Name]</td>
          </tr>
        </tbody>
      </table>
      <CopyButton targetRef={headerRef} label="Copy Section" />
    </div>
  );

  /* ── Yesterday (What I completed) ── */
  const renderYesterday = () => (
    <div ref={yesterdayRef} style={{ marginBottom: "12px" }}>
      <table style={S.tbl}>
        <thead>
          <tr>
            <td colSpan={3} style={{
              backgroundColor: C.badgeGreenBg, color: C.badgeGreenFg,
              padding: "10px 14px", fontFamily: S.font, fontSize: "15px",
              fontWeight: 800, letterSpacing: "0.02em",
              borderBottom: `3px solid ${C.badgeGreenFg}`,
              border: `1.5px solid ${C.border}`,
            }}>
              ✅ YESTERDAY — What I Completed
            </td>
          </tr>
          <tr>
            <th style={{ ...S.thSecondary, width: "5%", textAlign: "center" as const }}>☑</th>
            <th style={S.thSecondary}>Accomplishment</th>
            <th style={{ ...S.thSecondary, width: "20%", textAlign: "center" as const }}>Status</th>
          </tr>
        </thead>
        <tbody>
          {[
            "[e.g., Completed sprint planning for Project Alpha]",
            "[e.g., Reviewed and merged 3 pull requests]",
            "[e.g., Sent weekly stakeholder update]",
            "[Add item]",
            "[Add item]",
          ].map((text, i) => {
            const isAlt = i % 2 === 1;
            const bg = isAlt ? C.rowAlt : C.white;
            const isExample = i < 3;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "15px" }}>{isExample ? "☑" : "☐"}</td>
                <td style={{ ...S.td0, backgroundColor: bg }}>{text}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}>
                  <span style={S.badge(isExample ? C.badgeGreenBg : C.badgeGrayBg, isExample ? C.badgeGreenFg : C.badgeGrayFg)}>
                    {isExample ? "Done" : "—"}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <CopyButton targetRef={yesterdayRef} label="Copy Section" />
    </div>
  );

  /* ── Today (What I'm working on) ── */
  const renderToday = () => (
    <div ref={todayRef} style={{ marginBottom: "12px" }}>
      <table style={S.tbl}>
        <thead>
          <tr>
            <td colSpan={4} style={{
              backgroundColor: C.badgeBlueBg, color: C.badgeBlueFg,
              padding: "10px 14px", fontFamily: S.font, fontSize: "15px",
              fontWeight: 800, letterSpacing: "0.02em",
              borderBottom: `3px solid ${C.badgeBlueFg}`,
              border: `1.5px solid ${C.border}`,
            }}>
              🎯 TODAY — What I&apos;m Working On
            </td>
          </tr>
          <tr>
            <th style={{ ...S.thSecondary, width: "5%", textAlign: "center" as const }}>☐</th>
            <th style={S.thSecondary}>Task / Deliverable</th>
            <th style={{ ...S.thSecondary, width: "16%", textAlign: "center" as const }}>Priority</th>
            <th style={{ ...S.thSecondary, width: "16%", textAlign: "center" as const }}>ETA</th>
          </tr>
        </thead>
        <tbody>
          {[
            { task: "[e.g., Build API endpoint for user dashboard]", pri: "High", priBg: C.badgeRedBg, priFg: C.badgeRedFg, eta: "12:00 PM" },
            { task: "[e.g., Design review with UX team]", pri: "High", priBg: C.badgeRedBg, priFg: C.badgeRedFg, eta: "2:00 PM" },
            { task: "[e.g., Update project burndown chart]", pri: "Med", priBg: C.badgeAmberBg, priFg: C.badgeAmberFg, eta: "4:00 PM" },
            { task: "[Add task]", pri: "—", priBg: C.badgeGrayBg, priFg: C.badgeGrayFg, eta: "" },
            { task: "[Add task]", pri: "—", priBg: C.badgeGrayBg, priFg: C.badgeGrayFg, eta: "" },
          ].map((row, i) => {
            const isAlt = i % 2 === 1;
            const bg = isAlt ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "15px" }}>☐</td>
                <td style={{ ...S.td0, backgroundColor: bg }}>{row.task}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}>
                  <span style={S.badge(row.priBg, row.priFg)}>{row.pri}</span>
                </td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "11px" }}>{row.eta}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <CopyButton targetRef={todayRef} label="Copy Section" />
    </div>
  );

  /* ── Blockers ── */
  const renderBlockers = () => (
    <div ref={blockersRef} style={{ marginBottom: "12px" }}>
      <table style={S.tbl}>
        <thead>
          <tr>
            <td colSpan={4} style={{
              backgroundColor: C.badgeRedBg, color: C.badgeRedFg,
              padding: "10px 14px", fontFamily: S.font, fontSize: "15px",
              fontWeight: 800, letterSpacing: "0.02em",
              borderBottom: `3px solid ${C.badgeRedFg}`,
              border: `1.5px solid ${C.border}`,
            }}>
              🚧 BLOCKERS &amp; IMPEDIMENTS
            </td>
          </tr>
          <tr>
            <th style={{ ...S.thSecondary, width: "5%", textAlign: "center" as const }}>#</th>
            <th style={S.thSecondary}>Blocker Description</th>
            <th style={{ ...S.thSecondary, width: "18%", textAlign: "center" as const }}>Impact</th>
            <th style={{ ...S.thSecondary, width: "20%" }}>Help Needed From</th>
          </tr>
        </thead>
        <tbody>
          {[
            { desc: "[e.g., Waiting on API credentials from DevOps]", impact: "High", impBg: C.badgeRedBg, impFg: C.badgeRedFg, help: "[DevOps Team]" },
            { desc: "[e.g., Design specs incomplete for Feature X]", impact: "Med", impBg: C.badgeAmberBg, impFg: C.badgeAmberFg, help: "[UX Lead]" },
            { desc: "[Add blocker]", impact: "—", impBg: C.badgeGrayBg, impFg: C.badgeGrayFg, help: "" },
            { desc: "[Add blocker]", impact: "—", impBg: C.badgeGrayBg, impFg: C.badgeGrayFg, help: "" },
          ].map((row, i) => {
            const isAlt = i % 2 === 1;
            const bg = isAlt ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, color: C.textMuted }}>{i + 1}</td>
                <td style={{ ...S.td0, backgroundColor: bg }}>{row.desc}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}>
                  <span style={S.badge(row.impBg, row.impFg)}>{row.impact}</span>
                </td>
                <td style={{ ...S.td0, backgroundColor: bg }}>{row.help}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <CopyButton targetRef={blockersRef} label="Copy Section" />
    </div>
  );

  /* ── Action Items ── */
  const renderActions = () => (
    <div ref={actionsRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(C.secondary)}>📋 ACTION ITEMS &amp; FOLLOW-UPS</td></tr></tbody></table>
      <CopyButton targetRef={actionsRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead>
          <tr>
            <th style={{ ...S.thSecondary, width: "5%", textAlign: "center" as const }}>☐</th>
            <th style={S.thSecondary}>Action Item</th>
            <th style={{ ...S.thSecondary, width: "18%" }}>Owner</th>
            <th style={{ ...S.thSecondary, width: "14%", textAlign: "center" as const }}>Due</th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 5 }).map((_, i) => {
            const isAlt = i % 2 === 1;
            const bg = isAlt ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "15px" }}>☐</td>
                <td style={{ ...S.td0, backgroundColor: bg }}>{i === 0 ? "[e.g., Follow up with DevOps on credentials]" : ""}&nbsp;</td>
                <td style={{ ...S.td0, backgroundColor: bg }}>{i === 0 ? "[Your Name]" : ""}&nbsp;</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "11px" }}>{i === 0 ? "Today" : ""}&nbsp;</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  /* ── Parking Lot (offline discussion topics) ── */
  const renderParking = () => (
    <div ref={parkingRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner()}>🅿️ PARKING LOT — Discuss After Standup</div>
      <CopyButton targetRef={parkingRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead>
          <tr>
            <th style={{ ...S.thPrimary, width: "5%", textAlign: "center" as const }}>#</th>
            <th style={S.thPrimary}>Topic</th>
            <th style={{ ...S.thPrimary, width: "20%" }}>People Needed</th>
            <th style={{ ...S.thPrimary, width: "14%", textAlign: "center" as const }}>Scheduled?</th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 4 }).map((_, i) => {
            const isAlt = i % 2 === 1;
            const bg = isAlt ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 600, color: C.textMuted }}>{i + 1}</td>
                <td style={{ ...S.td0, backgroundColor: bg }}>&nbsp;</td>
                <td style={{ ...S.td0, backgroundColor: bg }}>&nbsp;</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}>☐ Y &nbsp;☐ N</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  /* ── Team View: compact grid per team member ── */
  const renderTeamGrid = () => (
    <div ref={teamRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner()}>👥 TEAM STANDUP TRACKER</div>
      <CopyButton targetRef={teamRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead>
          <tr>
            <th style={{ ...S.thPrimary, width: "16%" }}>Team Member</th>
            <th style={{ ...S.thPrimary, width: "28%" }}>✅ Yesterday</th>
            <th style={{ ...S.thPrimary, width: "28%" }}>🎯 Today</th>
            <th style={{ ...S.thPrimary, width: "18%" }}>🚧 Blockers</th>
            <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Status</th>
          </tr>
        </thead>
        <tbody>
          {TEAM_MEMBERS.map((name, i) => {
            const isAlt = i % 2 === 1;
            const bg = isAlt ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 700, color: C.primary, height: "50px", verticalAlign: "top" as const }}>[{name}]</td>
                <td style={{ ...S.td0, backgroundColor: bg, verticalAlign: "top" as const, fontSize: "12px" }}>&nbsp;</td>
                <td style={{ ...S.td0, backgroundColor: bg, verticalAlign: "top" as const, fontSize: "12px" }}>&nbsp;</td>
                <td style={{ ...S.td0, backgroundColor: bg, verticalAlign: "top" as const, fontSize: "12px" }}>&nbsp;</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}>
                  <span style={S.badge(C.badgeGreenBg, C.badgeGreenFg)}>On Track</span>
                </td>
              </tr>
            );
          })}
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
            ExecNoteShop &nbsp;&bull;&nbsp; The To-Do Master Template Package &nbsp;&bull;&nbsp; &copy; 2026 All Rights Reserved
          </td>
        </tr>
      </tbody>
    </table>
  );

  /* ═══════ LAYOUTS ═══════ */

  const renderIndividual = () => (
    <>
      {renderTitleBanner()}
      {renderDateHeader()}
      {/* 3-section colored cards stacked with 2-col for Yesterday | Today */}
      <table style={LT}>
        <tbody>
          <tr>
            <td style={{ ...LC, width: "50%", paddingRight: "8px" }}>{renderYesterday()}</td>
            <td style={{ ...LC, width: "50%", paddingLeft: "8px" }}>{renderToday()}</td>
          </tr>
        </tbody>
      </table>
      {renderBlockers()}
      {/* 2-col: Actions | Parking */}
      <table style={LT}>
        <tbody>
          <tr>
            <td style={{ ...LC, width: "55%", paddingRight: "8px" }}>{renderActions()}</td>
            <td style={{ ...LC, width: "45%", paddingLeft: "8px" }}>{renderParking()}</td>
          </tr>
        </tbody>
      </table>
      {renderFooter()}
    </>
  );

  const renderTeam = () => (
    <>
      {renderTitleBanner()}
      {renderDateHeader()}
      {renderTeamGrid()}
      {renderBlockers()}
      {/* 2-col: Actions | Parking */}
      <table style={LT}>
        <tbody>
          <tr>
            <td style={{ ...LC, width: "55%", paddingRight: "8px" }}>{renderActions()}</td>
            <td style={{ ...LC, width: "45%", paddingLeft: "8px" }}>{renderParking()}</td>
          </tr>
        </tbody>
      </table>
      {renderFooter()}
    </>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center">
              <Layout size={18} className="text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1>
              <p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p>
            </div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold">
            <MessageSquare size={11} />
            Agile Ready
          </span>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/todo-master" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-indigo-600 transition-colors">
            <ArrowLeft size={14} />
            Back to To-Do Master
          </Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>

        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center">
              <MessageSquare size={20} className="text-indigo-600" />
            </div>
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900">Daily Standup Notes</h2>
              <p className="text-xs font-medium text-indigo-600">Yesterday &bull; Today &bull; Blockers &mdash; 15 Minutes, Maximum Clarity</p>
            </div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">
            Structured standup notes for agile teams. Individual mode captures your personal
            updates; Team mode tracks the whole squad in one view. Includes blockers, action
            items, and a parking lot for offline discussions.
          </p>
        </div>

        <ThemeSwitcher />

        <div data-copy-exclude="true" className="mb-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Standup Mode</p>
          <div className="flex flex-wrap gap-2">
            {LAYOUTS.map((l) => {
              const Icon = l.icon;
              const isActive = layout === l.id;
              return (
                <button key={l.id} onClick={() => setLayout(l.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${
                    isActive ? "bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-200"
                      : "bg-white text-slate-600 border-slate-200 hover:border-indigo-300 hover:text-indigo-700"
                  }`}>
                  <Icon size={15} />
                  <span>{l.label}</span>
                  <span className={`text-[10px] font-medium ${isActive ? "text-indigo-200" : "text-slate-400"}`}>{l.desc}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div ref={fullPageRef} style={{ fontFamily: S.font }}>
          {layout === "individual" && renderIndividual()}
          {layout === "team" && renderTeam()}
        </div>

        <div className="flex justify-center mt-8 mb-12">
          <CopyAllButton targetRef={fullPageRef} />
        </div>
      </div>
    </div>
  );
}

export default function DailyStandupNotesPage() {
  return (
    <ThemeProvider>
      <DailyStandupContent />
    </ThemeProvider>
  );
}
