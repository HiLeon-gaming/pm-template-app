"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, Handshake, LayoutDashboard, AlignJustify, Phone } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Details", desc: "Contact info + emergency protocol + tips", icon: LayoutDashboard },
  { id: "compact", label: "Quick Card", desc: "Contact info only", icon: AlignJustify },
];

function ContactContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const emergRef = useRef<HTMLDivElement>(null);
  const tipsRef = useRef<HTMLDivElement>(null);

  const accent = "#8B5CF6";
  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>STAKEHOLDER CONTACT DETAILS</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; Relationship &amp; Stakeholder Management Hub &nbsp;|&nbsp; Per Stakeholder</td></tr>
    </tbody></table>
  );

  const renderContact = () => (
    <div ref={contactRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accent)}>STAKEHOLDER: [NAME] &mdash; CONTACT INFORMATION</td></tr></tbody></table>
      <CopyButton targetRef={contactRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>Keep this page updated. In urgent moments, you need to reach people fast without searching through emails. Review quarterly or whenever they change roles.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "22%" }}>Field</th>
          <th style={S.thPrimary}>Details</th>
          <th style={{ ...S.thPrimary, width: "25%" }}>Usage Notes</th>
        </tr></thead>
        <tbody>
          {[
            { label: "Full Name", value: "[First Last]", note: "Confirm preferred name and pronunciation." },
            { label: "Title / Role", value: "[Job title]", note: "Update when roles change — affects communication style." },
            { label: "Organization / Team", value: "[Company, department]", note: "Know their org context for political awareness." },
            { label: "Primary Email", value: "[name@company.com]", note: "Use for formal requests and documentation." },
            { label: "Secondary Email", value: "[Personal or alternate if shared]", note: "Use only if they’ve explicitly given it to you." },
            { label: "Office Phone", value: "[+1-xxx-xxx-xxxx]", note: "Try this before mobile for non-urgent calls." },
            { label: "Mobile Phone", value: "[If shared — urgent only]", note: "Only for true emergencies. Respect boundaries." },
            { label: "Slack / Teams", value: "[@handle or display name]", note: "Best for quick questions and informal check-ins." },
            { label: "LinkedIn Profile", value: "[URL]", note: "Useful for understanding their background and network." },
            { label: "Office Location", value: "[Building, floor — or Remote]", note: "For in-person meetings and drop-by conversations." },
            { label: "Assistant Name", value: "[EA who manages their calendar]", note: "Your ally for scheduling. Build this relationship." },
            { label: "Assistant Contact", value: "[Email and/or phone]", note: "Go through the EA for meeting requests with busy execs." },
            { label: "Best Way to Reach", value: "[e.g., Slack quick, email formal, call urgent]", note: "Respect their preferences. Wrong channel = annoyance." },
            { label: "Escalation Path", value: "[If unreachable: who next and how]", note: "Have a backup plan for critical moments." },
            { label: "Backup Contact", value: "[Who covers when unavailable]", note: "Know this BEFORE you need it." },
            { label: "Notes", value: "[Preferred greeting, time zone, pronunciation]", note: "Small details signal respect and attention." },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 700, color: accent }}>{r.label}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.value}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", color: C.textMuted }}>{r.note}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderEmergency = () => (
    <div ref={emergRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner("#DC2626")}>URGENT CONTACT PROTOCOL</td></tr></tbody></table>
      <CopyButton targetRef={emergRef} label="Copy Section" />
      <p style={{ ...S.subNote, marginBottom: "6px" }}>When something critical happens and you need to reach this person immediately, follow this sequence. Don&apos;t waste time figuring it out in the moment.</p>
      <table style={S.tbl}>
        <thead><tr>
          <th style={{ ...S.thPrimary, width: "8%", textAlign: "center" as const }}>Step</th>
          <th style={{ ...S.thPrimary, width: "20%" }}>Action</th>
          <th style={S.thPrimary}>Details</th>
          <th style={{ ...S.thPrimary, width: "15%" }}>Wait Time</th>
        </tr></thead>
        <tbody>
          {[
            { step: "1", action: "Try Slack / Teams", detail: "[Send a direct message marked urgent. Check if they’re online first.]", wait: "15 minutes" },
            { step: "2", action: "Send email", detail: "[Subject: URGENT — [Topic]. Keep to 3 sentences max with the ask clear.]", wait: "30 minutes" },
            { step: "3", action: "Call office phone", detail: "[Leave a voicemail if no answer. State urgency and callback number.]", wait: "15 minutes" },
            { step: "4", action: "Call mobile", detail: "[Only if they’ve shared it. Text first: “Urgent — can I call?”]", wait: "15 minutes" },
            { step: "5", action: "Contact their EA", detail: "[Ask the EA to relay the message and help schedule an emergency call.]", wait: "30 minutes" },
            { step: "6", action: "Contact backup", detail: "[Reach out to the designated backup person with the same urgency.]", wait: "—" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, textAlign: "center" as const, fontWeight: 800, color: "#DC2626", fontSize: "12px" }}>{r.step}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 700, color: "#DC2626" }}>{r.action}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.detail}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px", color: C.textMuted }}>{r.wait}</td>
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
            <thead><tr><td style={{ backgroundColor: "#EDE9FE", color: "#8B5CF6", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #8B5CF6" }}>CONTACT MANAGEMENT TIPS</td></tr></thead>
            <tbody>
              {[
                { color: "#8B5CF6", tip: "Update contacts whenever someone changes roles.", detail: "Role changes = new email, new EA, new org. Stale contact info fails when you need it most." },
                { color: "#059669", tip: "Build a relationship with their EA.", detail: "Executive assistants are gatekeepers. Being on good terms with them is a superpower." },
                { color: "#0EA5E9", tip: "Always respect channel preferences.", detail: "Using the wrong channel sends the wrong message. Slack for quick; email for formal; call for urgent." },
                { color: "#D97706", tip: "Test your escalation path before you need it.", detail: "Confirm backup contacts and EA details proactively. Don’t discover gaps during a crisis." },
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
            <thead><tr><td style={{ backgroundColor: "#FEF3C7", color: "#D97706", padding: "8px 12px", fontFamily: S.font, fontSize: "12px", fontWeight: 800, border: `1.5px solid ${C.border}`, borderBottom: "3px solid #D97706" }}>COMMUNICATION ETIQUETTE</td></tr></thead>
            <tbody>
              {[
                { color: "#DC2626", tip: "Never call mobile without warning.", detail: "Text first: “Hi, urgent question — can I call?” Unexpected calls feel intrusive." },
                { color: "#EA580C", tip: "Don’t use personal contact info for work.", detail: "If they gave you a personal email, it was for emergencies only. Don’t abuse it." },
                { color: "#D97706", tip: "Match their formality level.", detail: "If they sign emails “Best, Maria” don’t reply “Hey!” Mirror their tone." },
                { color: "#6366F1", tip: "Respect time zones.", detail: "Note their working hours. Sending Slack messages at 11pm signals poor boundaries." },
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
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-violet-50 border border-violet-100 text-violet-700 text-xs font-semibold"><Phone size={11} />Per-Stakeholder</span>
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
            <div><h2 className="text-2xl font-extrabold text-slate-900">Stakeholder Contact Details Page</h2><p className="text-xs font-medium text-violet-600">Per Stakeholder &bull; Save Time in Urgent Moments</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">When something urgent happens, you need to reach people fast &mdash; not dig through email threads. This page consolidates every contact detail, preferred channels, and escalation paths for each stakeholder in one place.</p>
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
          {layout === "full" && <>{renderTitleBanner()}{renderContact()}{renderEmergency()}{renderTips()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderContact()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullRef} /></div>
      </div>
    </div>
  );
}

export default function StakeholderContactDetailsPage() { return <ThemeProvider><ContactContent /></ThemeProvider>; }
