"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, Handshake, LayoutDashboard, AlignJustify, Star } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Plan", desc: "State + value + friction + strategy + actions + tips", icon: LayoutDashboard },
  { id: "compact", label: "Quick Plan", desc: "Current state + actions only", icon: AlignJustify },
];

function RelPlanContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef<HTMLDivElement>(null);
  const valueRef = useRef<HTMLDivElement>(null);
  const frictionRef = useRef<HTMLDivElement>(null);
  const stratRef = useRef<HTMLDivElement>(null);
  const actRef = useRef<HTMLDivElement>(null);
  const tipsRef = useRef<HTMLDivElement>(null);
  const accent = "#0EA5E9";
  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>&#11088; RELATIONSHIP PLAN</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; Relationship &amp; Stakeholder Management Hub &nbsp;|&nbsp; All-Star Template &nbsp;|&nbsp; Per Stakeholder</td></tr>
    </tbody></table>
  );

  const renderState = () => (
    <div ref={stateRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(accent)}>CURRENT vs DESIRED RELATIONSHIP STATE</div>
      <CopyButton targetRef={stateRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>Be brutally honest about where the relationship is today. The gap between current and desired state defines your improvement plan.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "25%" }}>Area</th>
          <th style={S.thPrimary}>Your Assessment</th>
        </tr></thead>
        <tbody>
          {[
            { label: "Stakeholder", value: "[Name and role]" },
            { label: "Current Health", value: "[Green / Amber / Red] \u2014 Justify your rating with specific evidence." },
            { label: "Current State (Honest)", value: "[Where does this relationship actually stand today? Be specific about trust, communication, and alignment.]" },
            { label: "Desired State (Goal)", value: "[Where do you want this relationship to be in 90 days? Paint a clear picture.]" },
            { label: "Gap Analysis", value: "[What\u2019s the difference between current and desired? What specific behaviors or actions need to change?]" },
            { label: "Why This Matters", value: "[What happens if this relationship doesn\u2019t improve? Impact on project, career, team?]" },
            { label: "Their Perspective", value: "[How do THEY likely see this relationship? What would they say about you if asked?]" },
            { label: "Last Updated", value: "[Date \u2014 Commit to reviewing this monthly]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 700, color: accent }}>{r.label}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.value}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderValue = () => (
    <div ref={valueRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner("#059669")}>MUTUAL VALUE EXCHANGE</div>
      <CopyButton targetRef={valueRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>Strong relationships are built on mutual value. What do each of you bring to the table? If either column is empty, the relationship is at risk.</p>
      <table style={LT}><tbody><tr>
        <td style={{ ...LC, width: "50%", paddingRight: "4px" }}>
          <table style={S.tbl}>
            <thead><tr><td style={{ backgroundColor: "#D1FAE5", color: "#059669", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #059669" }}>WHAT YOU OFFER THEM</td></tr></thead>
            <tbody>
              {[
                { text: "Timely project updates and transparency", guide: "They never have to ask for status \u2014 you proactively share." },
                { text: "Data-driven recommendations that save them time", guide: "You do the analysis; they make the decision." },
                { text: "Risk identification before problems escalate", guide: "Early warning = no surprises = trust." },
                { text: "Credit and visibility for their contributions", guide: "Making them look good strengthens the partnership." },
                { text: "[Enter what you bring]", guide: "" },
              ].map((r, i) => {
                const bg = i % 2 === 1 ? C.rowAlt : C.white;
                return (
                  <tr key={i}><td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", padding: "5px 10px" }}>
                    <strong style={{ color: "#059669" }}>{r.text}</strong>
                    {r.guide && <><br /><span style={{ fontSize: "9px", color: C.textMuted }}>{r.guide}</span></>}
                  </td></tr>
                );
              })}
            </tbody>
          </table>
        </td>
        <td style={{ ...LC, width: "50%", paddingLeft: "4px" }}>
          <table style={S.tbl}>
            <thead><tr><td style={{ backgroundColor: "#EDE9FE", color: "#8B5CF6", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #8B5CF6" }}>WHAT THEY OFFER YOU</td></tr></thead>
            <tbody>
              {[
                { text: "Executive sponsorship and political cover", guide: "They protect your project from org politics." },
                { text: "Budget approval authority", guide: "They control the purse strings you need." },
                { text: "Access to their network and decision makers", guide: "Their introductions open doors you can\u2019t." },
                { text: "Strategic direction and priority clarity", guide: "They tell you what matters most." },
                { text: "[Enter what they bring]", guide: "" },
              ].map((r, i) => {
                const bg = i % 2 === 1 ? C.rowAlt : C.white;
                return (
                  <tr key={i}><td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", padding: "5px 10px" }}>
                    <strong style={{ color: "#8B5CF6" }}>{r.text}</strong>
                    {r.guide && <><br /><span style={{ fontSize: "9px", color: C.textMuted }}>{r.guide}</span></>}
                  </td></tr>
                );
              })}
            </tbody>
          </table>
        </td>
      </tr></tbody></table>
    </div>
  );

  const renderFriction = () => (
    <div ref={frictionRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner("#DC2626")}>CURRENT FRICTION &amp; ROOT CAUSES</div>
      <CopyButton targetRef={frictionRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>Identify friction honestly. The \u201CYour Role\u201D column is the hardest and most important part \u2014 own your contribution to the problem.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={S.thPrimary}>Friction Point</th>
          <th style={S.thPrimary}>Root Cause</th>
          <th style={S.thPrimary}>Your Role in It</th>
          <th style={S.thPrimary}>Path to Resolution</th>
        </tr></thead>
        <tbody>
          {[
            { friction: "They feel out of the loop on key decisions", root: "You\u2019ve been updating their team but not them directly", role: "Assumed their team was passing info along", path: "Start sending direct weekly summary" },
            { friction: "Tension around budget requests", root: "They need ROI data you haven\u2019t provided", role: "Haven\u2019t made time to build the ROI case", path: "Prepare 1-page ROI summary this week" },
            { friction: "Meetings feel unproductive to them", root: "No clear agenda or decisions requested", role: "Running status meetings instead of decision meetings", path: "Send agenda 24h before with specific asks" },
            { friction: "[Enter friction point]", root: "[Underlying cause]", role: "[Your contribution]", path: "[How to fix it]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 600, color: "#DC2626" }}>{r.friction}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", color: C.textMuted }}>{r.root}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", color: C.textMuted }}>{r.role}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", fontWeight: 600 }}>{r.path}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderStrategy = () => (
    <div ref={stratRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner("#8B5CF6")}>RELATIONSHIP IMPROVEMENT STRATEGY</div>
      <CopyButton targetRef={stratRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>Translate your gap analysis into specific, time-bound actions. Vague intentions don\u2019t improve relationships \u2014 specific commitments do.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "25%" }}>Strategy Area</th>
          <th style={S.thPrimary}>Your Commitment</th>
        </tr></thead>
        <tbody>
          {[
            { label: "Trust-Building Actions", value: "[Specific things you will do to build trust over the next 30 days. e.g., \u201CDeliver the Q2 report 2 days early.\u201D]" },
            { label: "Communication Adjustments", value: "[Changes to how, when, or what you communicate. e.g., \u201CSwitch from email to 15-min weekly standup.\u201D]" },
            { label: "Quick Win Delivery", value: "[Something you can deliver in the next 2 weeks that demonstrates value. Make it visible and impactful.]" },
            { label: "Relationship Investment", value: "[Time you\u2019ll invest: extra meetings, informal check-ins, public recognition, coffee chats.]" },
            { label: "Risk Mitigation", value: "[How you\u2019ll prevent the relationship from getting worse while you work on improving it.]" },
            { label: "Success Indicators", value: "[How will you know it\u2019s working? e.g., \u201CThey start including me in ad-hoc meetings again.\u201D]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 700, color: "#8B5CF6" }}>{r.label}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.value}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderActions = () => (
    <div ref={actRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner("#EA580C")}>90-DAY ACTION PLAN</div>
      <CopyButton targetRef={actRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>Break your strategy into concrete milestones. Review weekly and adjust based on the stakeholder\u2019s response.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "12%" }}>Timeframe</th>
          <th style={S.thPrimary}>Action</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Status</th>
        </tr></thead>
        <tbody>
          {[
            { time: "This Week", action: "Send direct update email; schedule 1:1 meeting. Show immediate change.", status: "Pending" },
            { time: "Week 2", action: "Deliver ROI summary; ask for their input on Q2 priorities. Show value.", status: "Pending" },
            { time: "Month 1", action: "Establish regular cadence; deliver on 2 commitments flawlessly.", status: "Pending" },
            { time: "Month 2", action: "Seek feedback on relationship: \u201CHow are we doing?\u201D Adjust approach.", status: "Pending" },
            { time: "Month 3", action: "Review progress against desired state. Reset plan for next quarter.", status: "Pending" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 700, color: "#EA580C" }}>{r.time}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.action}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(C.badgeAmberBg, C.badgeAmberFg)}>{r.status}</span></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderTips = () => (
    <div ref={tipsRef} style={{ marginBottom: "12px" }}>
      <CopyButton targetRef={tipsRef} label="Copy Section" />
      <table style={LT}><tbody><tr>
        <td style={{ ...LC, width: "50%", paddingRight: "4px" }}>
          <table style={S.tbl}>
            <thead><tr><td style={{ backgroundColor: "#DBEAFE", color: "#0EA5E9", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #0EA5E9" }}>RELATIONSHIP PLANNING PRINCIPLES</td></tr></thead>
            <tbody>
              {[
                { color: "#0EA5E9", tip: "Be honest about current state.", detail: "Self-deception is the enemy of improvement. Rate the relationship as they would, not as you hope." },
                { color: "#059669", tip: "Focus on behaviors, not feelings.", detail: "\u201CI\u2019ll send updates every Monday\u201D is actionable. \u201CI\u2019ll try to communicate better\u201D is not." },
                { color: "#8B5CF6", tip: "Own your 50% of the relationship.", detail: "You can only control what YOU do. Focus your plan on your actions, not on changing them." },
                { color: "#D97706", tip: "Review monthly, reset quarterly.", detail: "Relationships are dynamic. Your plan should be too." },
              ].map((r, i) => {
                const bg = i % 2 === 1 ? C.rowAlt : C.white;
                return (
                  <tr key={i}><td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", padding: "5px 10px" }}>
                    <strong style={{ color: r.color }}>{r.tip}</strong><br />
                    <span style={{ fontSize: "9px", color: C.textMuted }}>{r.detail}</span>
                  </td></tr>
                );
              })}
            </tbody>
          </table>
        </td>
        <td style={{ ...LC, width: "50%", paddingLeft: "4px" }}>
          <table style={S.tbl}>
            <thead><tr><td style={{ backgroundColor: "#FEF3C7", color: "#D97706", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #D97706" }}>COMMON PLANNING MISTAKES</td></tr></thead>
            <tbody>
              {[
                { color: "#DC2626", tip: "Planning without acting.", detail: "A beautiful plan that lives in a doc is worthless. Execute this week." },
                { color: "#EA580C", tip: "Trying to fix everything at once.", detail: "Pick the ONE friction point that matters most and fix that first." },
                { color: "#D97706", tip: "Not asking for their perspective.", detail: "Your assessment of the relationship may be wrong. Ask them directly." },
                { color: "#6366F1", tip: "Giving up after 2 weeks.", detail: "Relationship improvement takes 60\u201390 days minimum. Be patient and consistent." },
              ].map((r, i) => {
                const bg = i % 2 === 1 ? C.rowAlt : C.white;
                return (
                  <tr key={i}><td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", padding: "5px 10px" }}>
                    <strong style={{ color: r.color }}>{r.tip}</strong><br />
                    <span style={{ fontSize: "9px", color: C.textMuted }}>{r.detail}</span>
                  </td></tr>
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
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-100 text-amber-700 text-xs font-semibold"><Star size={11} />All-Star</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/relationship-hub" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-rose-600 transition-colors"><ArrowLeft size={14} />Back to Relationship Hub</Link>
          <CopyAllButton targetRef={fullRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-sky-100 flex items-center justify-center"><Handshake size={20} className="text-sky-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">Relationship Plan Template</h2><p className="text-xs font-medium text-sky-600">Per Stakeholder &bull; Intentional Relationship Management &bull; All-Star</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">The most comprehensive per-stakeholder relationship tool. Assess where you are, define where you want to be, identify friction, build a strategy, and commit to a 90-day action plan. Great PMs don&apos;t leave relationships to chance &mdash; they plan them intentionally.</p>
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
          {layout === "full" && <>{renderTitleBanner()}{renderState()}{renderValue()}{renderFriction()}{renderStrategy()}{renderActions()}{renderTips()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderState()}{renderActions()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullRef} /></div>
      </div>
    </div>
  );
}

export default function RelationshipPlanPage() { return <ThemeProvider><RelPlanContent /></ThemeProvider>; }
