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
  { id: "full", label: "Full Profile", desc: "Identity + goals + preferences + history + risks + commitments + tips", icon: LayoutDashboard },
  { id: "compact", label: "Quick Profile", desc: "Identity + goals + commitments only", icon: AlignJustify },
];

function ProfileContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullRef = useRef<HTMLDivElement>(null);
  const idRef = useRef<HTMLDivElement>(null);
  const goalsRef = useRef<HTMLDivElement>(null);
  const prefRef = useRef<HTMLDivElement>(null);
  const histRef = useRef<HTMLDivElement>(null);
  const riskRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);
  const tipsRef = useRef<HTMLDivElement>(null);

  const accent = "#8B5CF6";
  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>STAKEHOLDER PROFILE</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; Relationship &amp; Stakeholder Management Hub &nbsp;|&nbsp; &#11088; All-Star &nbsp;|&nbsp; Duplicate Per Stakeholder</td></tr>
    </tbody></table>
  );

  const renderIdentity = () => (
    <div ref={idRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(accent)}>STAKEHOLDER IDENTITY</div>
      <CopyButton targetRef={idRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>The foundation of your profile. Fill this out first, then work through the remaining sections over time as you learn more about this person.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "22%" }}>Field</th>
          <th style={S.thPrimary}>Your Entry</th>
          <th style={{ ...S.thPrimary, width: "28%" }}>Guidance</th>
        </tr></thead>
        <tbody>
          {[
            { label: "Name", value: "[Full name]", guide: "Use their preferred name. Add pronunciation if helpful." },
            { label: "Title / Role", value: "[Job title and functional role]", guide: "Be specific: \u201CSVP Operations\u201D not \u201CSenior leader.\u201D" },
            { label: "Organization / Team", value: "[Company, department, business unit]", guide: "Include division for large orgs." },
            { label: "Stakeholder Type", value: "[Sponsor / Champion / Decision Maker / Influencer / Gatekeeper / Blocker / End User / SME]", guide: "Pick the dominant role. Can be multiple \u2014 choose primary." },
            { label: "Importance", value: "[Critical / High / Medium / Low]", guide: "Critical = can make or break your initiative." },
            { label: "Relationship Health", value: "[Green / Amber / Red]", guide: "Honest assessment. Update weekly." },
            { label: "Cadence", value: "[Weekly / Biweekly / Monthly / As needed]", guide: "Match to importance. Critical = weekly minimum." },
            { label: "Reports To", value: "[Their manager or reporting line]", guide: "Helps you understand their constraints and who influences them." },
            { label: "Key Relationships", value: "[Other stakeholders they influence or are close to]", guide: "Map the network. Who do they listen to? Who listens to them?" },
            { label: "Profile Created", value: "[Date]", guide: "When you first built this profile." },
            { label: "Last Updated", value: "[Date]", guide: "Update after every significant interaction." },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 700, color: accent }}>{r.label}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.value}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", color: C.textMuted }}>{r.guide}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderGoals = () => (
    <div ref={goalsRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner("#D97706")}>WHAT THEY CARE ABOUT &mdash; GOALS, PRIORITIES &amp; PAIN POINTS</div>
      <CopyButton targetRef={goalsRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>Understanding what matters to them is the foundation of every successful interaction. If you can only fill out one section beyond Identity, make it this one.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "22%" }}>Area</th>
          <th style={S.thPrimary}>Your Entry</th>
          <th style={{ ...S.thPrimary, width: "28%" }}>Why This Matters</th>
        </tr></thead>
        <tbody>
          {[
            { label: "Their Top Goals", value: "[What are they trying to achieve this quarter/year?]", why: "Align your work to their goals and they\u2019ll support you." },
            { label: "Their KPIs", value: "[What metrics are they measured on?]", why: "If you can help move their KPIs, you become invaluable." },
            { label: "Their Pain Points", value: "[What frustrates them? What keeps them up at night?]", why: "Solving their pain points builds instant trust and credibility." },
            { label: "How They Define Success", value: "[What does \u201Cwinning\u201D look like from their perspective?]", why: "Frame your updates in terms of THEIR success criteria." },
            { label: "What They Need From You", value: "[Information, updates, deliverables, support, decisions?]", why: "Deliver this consistently and you\u2019ll be their most reliable partner." },
            { label: "What You Need From Them", value: "[Approvals, resources, decisions, political support, access?]", why: "Be explicit about your needs. Don\u2019t assume they know." },
            { label: "Political Realities", value: "[Internal dynamics, competing priorities, pressures]", why: "Understanding politics helps you frame requests they can say yes to." },
            { label: "Constraints", value: "[Budget, time, org restrictions]", why: "Work within their constraints, not against them." },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 700, color: "#D97706" }}>{r.label}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.value}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", color: C.textMuted }}>{r.why}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderPreferences = () => (
    <div ref={prefRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner("#0EA5E9")}>COMMUNICATION &amp; WORKING PREFERENCES</div>
      <CopyButton targetRef={prefRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>How they prefer to communicate and what builds or breaks trust. Getting this right makes every interaction smoother.</p>
      <table style={LT}><tbody><tr>
        <td style={{ ...LC, width: "50%", paddingRight: "4px" }}>
          <table style={S.tbl}>
            <thead><tr><td style={{ backgroundColor: "#DBEAFE", color: "#0EA5E9", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #0EA5E9" }}>HOW THEY WORK</td></tr></thead>
            <tbody>
              {[
                { label: "Preferred Channel", value: "[Email / Slack / Teams / Phone / In-person]" },
                { label: "Best Meeting Times", value: "[Mornings / Afternoons / Specific days]" },
                { label: "Communication Style", value: "[Data-driven / Big picture / Detail-oriented / Conversational]" },
                { label: "Meeting Format", value: "[Formal agenda / Casual check-in / Written updates preferred]" },
                { label: "Decision Style", value: "[Quick and decisive / Needs time to reflect / Consensus-driven]" },
              ].map((r, i) => {
                const bg = i % 2 === 1 ? C.rowAlt : C.white;
                return (
                  <tr key={i}>
                    <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 700, color: "#0EA5E9", width: "35%" }}>{r.label}</td>
                    <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.value}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </td>
        <td style={{ ...LC, width: "50%", paddingLeft: "4px" }}>
          <table style={S.tbl}>
            <thead><tr><td style={{ backgroundColor: "#D1FAE5", color: "#059669", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #059669" }}>TRUST DYNAMICS</td></tr></thead>
            <tbody>
              {[
                { label: "What They Love", value: "[Concise updates / Being consulted early / Data and evidence]" },
                { label: "What Annoys Them", value: "[Surprises / Long emails / Being left out of decisions]" },
                { label: "Trust Builders", value: "[Following through / Sharing credit / Being transparent]" },
                { label: "Trust Breakers", value: "[Missed deadlines / Surprises in public / Going over their head]" },
                { label: "Hot Buttons", value: "[Topics or behaviors that instantly trigger a negative reaction]" },
              ].map((r, i) => {
                const bg = i % 2 === 1 ? C.rowAlt : C.white;
                return (
                  <tr key={i}>
                    <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 700, color: "#059669", width: "35%" }}>{r.label}</td>
                    <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.value}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </td>
      </tr></tbody></table>
    </div>
  );

  const renderHistory = () => (
    <div ref={histRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner("#059669")}>RELATIONSHIP HISTORY &amp; KEY INTERACTIONS</div>
      <CopyButton targetRef={histRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>Track key interactions so you never lose context. Add a row after every meaningful conversation. Link to detailed meeting notes where applicable.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "10%" }}>Date</th>
          <th style={{ ...S.thPrimary, width: "20%" }}>Interaction Type</th>
          <th style={S.thPrimary}>Key Takeaway / Decision</th>
          <th style={{ ...S.thPrimary, width: "20%" }}>Follow-Up / Action</th>
        </tr></thead>
        <tbody>
          {[
            { date: "Mar 10", int: "1:1 meeting \u2014 Q2 budget review", key: "Agreed to fund Phase 2 if ROI exceeds 15%. Wants analysis before Apr 1.", follow: "Send ROI summary by Tue" },
            { date: "Mar 5", int: "Email \u2014 project timeline update", key: "No concerns raised. Requested monthly updates going forward.", follow: "Schedule recurring update Apr 5" },
            { date: "Feb 28", int: "Steering committee \u2014 risk review", key: "Asked for vendor dependency mitigation plan. Seemed concerned about single-vendor risk.", follow: "Delivered risk plan Mar 3 \u2705" },
            { date: "Feb 15", int: "Coffee chat \u2014 informal catch-up", key: "Mentioned org restructure coming in Q2. Wants to be consulted before any headcount changes.", follow: "Flag if restructure affects our team" },
            { date: "[Date]", int: "[Type of interaction]", key: "[What was decided or learned]", follow: "[Next step]" },
            { date: "[Date]", int: "[Type of interaction]", key: "[What was decided or learned]", follow: "[Next step]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontWeight: 700, fontSize: "10px" }}>{r.date}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.int}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.key}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", color: C.textMuted }}>{r.follow}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderRisks = () => (
    <div ref={riskRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner("#DC2626")}>RISKS, LANDMINES &amp; SENSITIVE NOTES</div>
      <CopyButton targetRef={riskRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>Keep these notes factual and professional. Mark as [CONFIDENTIAL] if needed. Review monthly and delete anything no longer relevant.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "22%" }}>Risk Area</th>
          <th style={S.thPrimary}>Your Notes</th>
          <th style={{ ...S.thPrimary, width: "25%" }}>Mitigation / Action</th>
        </tr></thead>
        <tbody>
          {[
            { label: "Known Friction Points", value: "[Topics or situations that create tension]", action: "[How you\u2019re managing this]" },
            { label: "Sensitive Topics", value: "[Things to avoid or handle carefully in conversation]", action: "[Alternative approaches]" },
            { label: "Red Flags Observed", value: "[Warning signs \u2014 keep factual, not judgmental]", action: "[Monitoring plan]" },
            { label: "Political Dynamics", value: "[Alliances, rivalries, org politics affecting this relationship]", action: "[How to navigate]" },
            { label: "Risk to Your Work", value: "[How they could negatively impact your project or goals]", action: "[Contingency plan]" },
            { label: "Escalation Triggers", value: "[Conditions that would require escalating to your sponsor]", action: "[Who to escalate to and when]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 700, color: "#DC2626" }}>{r.label}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.value}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", color: C.textMuted }}>{r.action}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderNextSteps = () => (
    <div ref={nextRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner("#EA580C")}>NEXT STEPS &amp; OPEN COMMITMENTS</div>
      <CopyButton targetRef={nextRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>Every commitment you make to this stakeholder goes here. Broken promises are the #1 trust killer. Review before every interaction.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={S.thPrimary}>Action / Commitment</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Owner</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Due</th>
          <th style={{ ...S.thPrimary, width: "10%", textAlign: "center" as const }}>Status</th>
        </tr></thead>
        <tbody>
          {[
            { action: "Send ROI summary deck for Phase 2 decision", owner: "You", due: "Tue", status: "Pending", sBg: C.badgeAmberBg, sFg: C.badgeAmberFg },
            { action: "Confirm QBR attendance and send agenda", owner: "Them", due: "Wed", status: "Waiting", sBg: C.badgeBlueBg, sFg: C.badgeBlueFg },
            { action: "Schedule follow-up coffee after Q2 kickoff", owner: "You", due: "Apr 5", status: "Planned", sBg: C.badgeGreenBg, sFg: C.badgeGreenFg },
            { action: "[Enter action]", owner: "[Who]", due: "[Date]", status: "[Status]", sBg: C.badgeGrayBg, sFg: C.badgeGrayFg },
            { action: "[Enter action]", owner: "[Who]", due: "[Date]", status: "[Status]", sBg: C.badgeGrayBg, sFg: C.badgeGrayFg },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.action}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "10px", fontWeight: 700 }}>{r.owner}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontSize: "10px" }}>{r.due}</td>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const }}><span style={S.badge(r.sBg, r.sFg)}>{r.status}</span></td>
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
            <thead><tr><td style={{ backgroundColor: "#EDE9FE", color: "#8B5CF6", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #8B5CF6" }}>PROFILE BEST PRACTICES</td></tr></thead>
            <tbody>
              {[
                { color: "#8B5CF6", tip: "Update after every meaningful interaction.", detail: "Even 30 seconds of notes after a meeting keeps this profile valuable." },
                { color: "#059669", tip: "Review before every 1:1.", detail: "2 minutes reading this profile before a meeting makes you 10x more effective." },
                { color: "#0EA5E9", tip: "Share selectively with your successor.", detail: "If you leave the role, this profile is institutional knowledge gold." },
                { color: "#D97706", tip: "Don\u2019t let it go stale.", detail: "A 6-month-old profile with no updates is worse than no profile at all." },
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
            <thead><tr><td style={{ backgroundColor: "#FEF3C7", color: "#D97706", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #D97706" }}>PROFILE COMPLETION CHECKLIST</td></tr></thead>
            <tbody>
              {[
                { color: accent, item: "Identity section complete", detail: "Name, role, type, importance, health \u2014 all filled in." },
                { color: "#D97706", item: "Goals & priorities documented", detail: "You know what they care about and what success looks like to them." },
                { color: "#0EA5E9", item: "Communication preferences captured", detail: "You know their preferred channel, style, and meeting format." },
                { color: "#059669", item: "At least 3 interaction entries", detail: "You have a track record of key conversations and decisions." },
                { color: "#DC2626", item: "Risks and landmines noted", detail: "You\u2019ve documented sensitive topics and political dynamics." },
                { color: "#EA580C", item: "Open commitments tracked", detail: "Every promise you\u2019ve made is visible and has a due date." },
              ].map((r, i) => {
                const bg = i % 2 === 1 ? C.rowAlt : C.white;
                return (
                  <tr key={i}><td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", padding: "5px 10px" }}>
                    <strong style={{ color: r.color }}>{r.item}</strong><br />
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
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-violet-50 border border-violet-100 text-violet-700 text-xs font-semibold"><Zap size={11} />&#11088; All-Star</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/relationship-hub" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-rose-600 transition-colors"><ArrowLeft size={14} />Back to Relationship Hub</Link>
          <CopyAllButton targetRef={fullRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-violet-100 flex items-center justify-center"><Handshake size={20} className="text-violet-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">Stakeholder Profile Template</h2><p className="text-xs font-medium text-violet-600">&#11088; All-Star &mdash; Executive Memory System &bull; Duplicate Per Stakeholder</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Your most important template. Create one copy per stakeholder. This is your &quot;executive memory&quot; for each person &mdash; what they care about, how they communicate, what you&apos;ve promised, and what risks exist. Review it before every interaction and update it after.</p>
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
          {layout === "full" && <>{renderTitleBanner()}{renderIdentity()}{renderGoals()}{renderPreferences()}{renderHistory()}{renderRisks()}{renderNextSteps()}{renderTips()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderIdentity()}{renderGoals()}{renderNextSteps()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullRef} /></div>
      </div>
    </div>
  );
}

export default function StakeholderProfilePage() { return <ThemeProvider><ProfileContent /></ThemeProvider>; }
