"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, BookOpen, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Story", desc: "Story + AC + dependencies", icon: LayoutDashboard },
  { id: "compact", label: "Quick Story", desc: "Story + acceptance criteria", icon: AlignJustify },
];

function UserStoryContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const storyRef = useRef<HTMLDivElement>(null);
  const acRef = useRef<HTMLDivElement>(null);
  const detailRef = useRef<HTMLDivElement>(null);
  const backlogRef = useRef<HTMLDivElement>(null);

  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };

  const descStyle: React.CSSProperties = {
    fontFamily: S.font, fontSize: "11px", fontStyle: "italic", color: "#475569",
    padding: "10px 14px", lineHeight: "1.6", borderBottom: `1px solid ${C.border}`,
    backgroundColor: C.white,
  };

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "0px" }}>
      <tbody>
        <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${C.accent}`, textAlign: "center" as const }}>📖 USER STORY TEMPLATE</td></tr>
        <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; Business Analyst Command Center &nbsp;|&nbsp; BABOK Aligned</td></tr>
        <tr><td style={descStyle}>
          <strong style={{ fontStyle: "italic" }}>This template captures user stories in the standard &ldquo;As a [user], I want [goal] so that [benefit]&rdquo; format.</strong> Each story includes acceptance criteria (Given/When/Then), priority, story points, dependencies, and definition of done. Use one template per story, or the backlog view to manage multiple stories at once.<br /><br />
          Ideal for <strong style={{ fontStyle: "italic" }}>agile sprint planning, backlog grooming,</strong> or <strong style={{ fontStyle: "italic" }}>requirements workshops with development teams</strong>. Aligns with BABOK Technique: User Stories.
        </td></tr>
      </tbody>
    </table>
  );

  const renderDateHeader = () => (
    <div ref={headerRef} style={{ marginBottom: "12px" }}>
      <table style={S.tbl}>
        <tbody>
          <tr>
            <td style={{ ...S.tdLabel, width: "14%" }}>Epic / Feature</td>
            <td style={{ ...S.td0, width: "36%" }}>[e.g., Order Management Module]</td>
            <td style={{ ...S.tdLabel, width: "14%" }}>Sprint</td>
            <td style={{ ...S.td0, width: "36%" }}>[Sprint # / Release Name]</td>
          </tr>
          <tr>
            <td style={S.tdLabelAlt}>Story ID</td>
            <td style={S.tdAlt}>[US-001]</td>
            <td style={S.tdLabelAlt}>Date Created</td>
            <td style={S.tdAlt}>[MM/DD/YYYY]</td>
          </tr>
          <tr>
            <td style={S.tdLabel}>Author (BA)</td>
            <td style={S.td0}>[Your Name]</td>
            <td style={S.tdLabel}>Assigned To</td>
            <td style={S.td0}>[Developer / Team]</td>
          </tr>
        </tbody>
      </table>
      <CopyButton targetRef={headerRef} label="Copy Section" />
    </div>
  );

  const renderStory = () => (
    <div ref={storyRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner()}>📝 USER STORY</div>
      <CopyButton targetRef={storyRef} label="Copy Section" />
      <table style={S.tbl}>
        <tbody>
          <tr>
            <td style={{ ...S.tdLabel, width: "14%", verticalAlign: "top" as const }}>Story</td>
            <td style={{ ...S.td0, fontSize: "14px", fontWeight: 600, lineHeight: "1.8", padding: "14px" }}>
              <strong>As a</strong> [type of user],<br />
              <strong>I want</strong> [goal / action],<br />
              <strong>So that</strong> [benefit / value].
            </td>
          </tr>
          <tr>
            <td style={S.tdLabelAlt}>Example</td>
            <td style={{ ...S.tdAlt, fontStyle: "italic" as const, fontSize: "12px", color: "#6B7280" }}>
              As a <strong>warehouse manager</strong>, I want <strong>to receive an automated notification when inventory drops below the reorder threshold</strong>, so that <strong>I can replenish stock before we run out and avoid delays</strong>.
            </td>
          </tr>
        </tbody>
      </table>
      <table style={{ ...S.tbl, marginTop: "6px" }}>
        <tbody>
          <tr>
            <td style={{ ...S.tdLabel, width: "14%" }}>Priority</td>
            <td style={{ ...S.td0, width: "20%" }}>☐ Must ☐ Should ☐ Could ☐ Won&apos;t</td>
            <td style={{ ...S.tdLabel, width: "14%" }}>Story Points</td>
            <td style={{ ...S.td0, width: "18%" }}>[e.g., 5]</td>
            <td style={{ ...S.tdLabel, width: "14%" }}>Status</td>
            <td style={S.td0}>☐ Draft ☐ Ready ☐ In Dev ☐ Done</td>
          </tr>
        </tbody>
      </table>
    </div>
  );

  const renderAC = () => (
    <div ref={acRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(C.secondary)}>✅ ACCEPTANCE CRITERIA</div>
      <CopyButton targetRef={acRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "4px" }}>Use Given/When/Then format for testable acceptance criteria.</p>
      <table style={S.tbl}>
        <thead>
          <tr>
            <th style={{ ...S.thSecondary, width: "5%", textAlign: "center" as const }}>AC#</th>
            <th style={{ ...S.thSecondary, width: "25%" }}>Given (Context)</th>
            <th style={{ ...S.thSecondary, width: "25%" }}>When (Action)</th>
            <th style={{ ...S.thSecondary, width: "30%" }}>Then (Expected Result)</th>
            <th style={{ ...S.thSecondary, width: "7%", textAlign: "center" as const }}>Pass?</th>
          </tr>
        </thead>
        <tbody>
          {[
            { g: "[e.g., Inventory for SKU drops below reorder threshold]", w: "[e.g., System detects threshold breach during nightly scan]", t: "[e.g., Email + in-app notification sent to warehouse manager within 5 min]" },
            { g: "[e.g., Notification has been sent]", w: "[e.g., Manager clicks 'Acknowledge' in notification]", t: "[e.g., Notification status changes to 'Acknowledged' with timestamp]" },
            { g: "[e.g., Multiple SKUs drop below threshold simultaneously]", w: "[e.g., System detects multiple threshold breaches]", t: "[e.g., A single summary notification is sent listing all affected SKUs]" },
            { g: "", w: "[Add acceptance criterion]", t: "" },
            { g: "", w: "[Add acceptance criterion]", t: "" },
          ].map((row, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, color: C.accent }}>{i + 1}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{row.g}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{row.w}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{row.t}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}>☐</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderDetails = () => (
    <div ref={detailRef} style={{ marginBottom: "12px" }}>
      <table style={LT}><tbody><tr>
        <td style={{ ...LC, width: "50%", paddingRight: "5px" }}>
          <div style={S.sectionBanner()}>🔗 DEPENDENCIES &amp; NOTES</div>
          <table style={S.tbl}>
            <tbody>
              {[
                { q: "Depends on", a: "[e.g., US-005 (Inventory API), Infrastructure setup]" },
                { q: "Blocked by", a: "[e.g., Pending API documentation from vendor]" },
                { q: "Business rules", a: "[e.g., Reorder threshold = 20% of max stock level; configurable per SKU]" },
                { q: "UI/UX notes", a: "[e.g., Notification bell icon with red badge count; email uses standard template]" },
                { q: "Technical notes", a: "[e.g., Use event-driven architecture; pub/sub for notification dispatch]" },
                { q: "Out of scope", a: "[e.g., SMS notifications (Phase 2); auto-reorder functionality]" },
              ].map((row, i) => {
                const isAlt = i % 2 === 1;
                return (
                  <tr key={i}>
                    <td style={{ ...(isAlt ? S.tdLabelAlt : S.tdLabel), width: "30%", verticalAlign: "top" as const }}>{row.q}</td>
                    <td style={{ ...(isAlt ? S.tdAlt : S.td0), fontSize: "11px" }}>{row.a}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </td>
        <td style={{ ...LC, width: "50%", paddingLeft: "5px" }}>
          <div style={S.sectionBanner(C.secondary)}>✔️ DEFINITION OF DONE</div>
          <table style={S.tbl}>
            <tbody>
              {[
                "All acceptance criteria pass",
                "Unit tests written and passing (≥ 80% coverage)",
                "Code reviewed and approved by peer",
                "Integration tests passing in staging",
                "UI matches approved wireframe/mockup",
                "Documentation updated (API docs, user guide)",
                "Product Owner demo and approval",
                "No critical or high-severity bugs open",
                "[Add custom DoD criterion]",
              ].map((item, i) => {
                const bg = i % 2 === 1 ? C.rowAlt : C.white;
                return (
                  <tr key={i}>
                    <td style={{ ...S.td0, backgroundColor: bg, width: "6%", textAlign: "center" as const, fontSize: "13px" }}>☐</td>
                    <td style={{ ...S.td0, backgroundColor: bg }}>{item}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </td>
      </tr></tbody></table>
      <CopyButton targetRef={detailRef} label="Copy Section" />
    </div>
  );

  const renderBacklog = () => (
    <div ref={backlogRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner()}>📋 STORY BACKLOG (Multi-Story View)</div>
      <CopyButton targetRef={backlogRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead>
          <tr>
            <th style={{ ...S.thPrimary, width: "7%", textAlign: "center" as const }}>ID</th>
            <th style={S.thPrimary}>User Story</th>
            <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Priority</th>
            <th style={{ ...S.thPrimary, width: "6%", textAlign: "center" as const }}>Points</th>
            <th style={{ ...S.thPrimary, width: "10%" }}>Assigned</th>
            <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Status</th>
          </tr>
        </thead>
        <tbody>
          {[
            { id: "US-001", story: "As a warehouse mgr, I want automated low-stock alerts so that I can reorder before stockout", pri: "Must", priBg: "#FEE2E2", priFg: "#DC2626", pts: "5", who: "[Dev A]", stat: "Ready", sBg: "#D1FAE5", sFg: "#059669" },
            { id: "US-002", story: "As an admin, I want to configure reorder thresholds per SKU so that alerts are accurate", pri: "Must", priBg: "#FEE2E2", priFg: "#DC2626", pts: "3", who: "[Dev B]", stat: "Draft", sBg: "#FEF3C7", sFg: "#D97706" },
            { id: "US-003", story: "As a manager, I want a weekly stock summary report so that I can plan procurement", pri: "Should", priBg: "#FEF3C7", priFg: "#D97706", pts: "8", who: "[Dev A]", stat: "Draft", sBg: "#FEF3C7", sFg: "#D97706" },
            { id: "US-004", story: "As a user, I want to snooze a notification so that I can address it later today", pri: "Could", priBg: "#DBEAFE", priFg: "#2563EB", pts: "2", who: "", stat: "Backlog", sBg: "#F3F4F6", sFg: "#6B7280" },
            { id: "US-005", story: "[Add user story]", pri: "—", priBg: "#F3F4F6", priFg: "#6B7280", pts: "", who: "", stat: "—", sBg: "#F3F4F6", sFg: "#6B7280" },
            { id: "US-006", story: "[Add user story]", pri: "—", priBg: "#F3F4F6", priFg: "#6B7280", pts: "", who: "", stat: "—", sBg: "#F3F4F6", sFg: "#6B7280" },
          ].map((row, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700, color: C.accent, fontSize: "11px" }}>{row.id}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{row.story}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(row.priBg, row.priFg)}>{row.pri}</span></td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 700 }}>{row.pts}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "11px" }}>{row.who}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(row.sBg, row.sFg)}>{row.stat}</span></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderFooter = () => (
    <table style={{ ...S.tbl, marginTop: "8px" }}>
      <tbody><tr><td style={{ backgroundColor: C.primary, color: C.footerText, padding: "8px 20px", fontSize: "10px", fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.06em" }}>ExecNoteShop &nbsp;&bull;&nbsp; Business Analyst Command Center &nbsp;&bull;&nbsp; &copy; 2026 All Rights Reserved</td></tr></tbody>
    </table>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-amber-50/20">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-100 text-amber-700 text-xs font-semibold"><BookOpen size={11} /> User Story</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/ba-command-center" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-amber-600 transition-colors"><ArrowLeft size={14} /> Back to BA Command Center</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center"><BookOpen size={20} className="text-amber-600" /></div>
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900">User Story Template</h2>
              <p className="text-xs font-medium text-amber-600">Story &bull; Acceptance Criteria &bull; Dependencies &bull; Definition of Done</p>
            </div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Capture user stories with acceptance criteria (Given/When/Then), story points, dependencies, definition of done, and a multi-story backlog view. Full Story is comprehensive; Quick Story focuses on the story and acceptance criteria.</p>
        </div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Layout</p>
          <div className="flex flex-wrap gap-2">
            {LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (
              <button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-amber-600 text-white border-amber-600 shadow-md shadow-amber-200" : "bg-white text-slate-600 border-slate-200 hover:border-amber-300 hover:text-amber-700"}`}>
                <Icon size={15} /> <span>{l.label}</span> <span className={`text-[10px] font-medium ${isActive ? "text-amber-200" : "text-slate-400"}`}>{l.desc}</span>
              </button>
            ); })}
          </div>
        </div>
        <div ref={fullPageRef} style={{ fontFamily: S.font }}>
          {layout === "full" && <>{renderTitleBanner()}{renderDateHeader()}{renderStory()}{renderAC()}{renderDetails()}{renderBacklog()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderDateHeader()}{renderStory()}{renderAC()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function UserStoryPage() {
  return (<ThemeProvider><UserStoryContent /></ThemeProvider>);
}
