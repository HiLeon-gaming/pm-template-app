"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, MapPin, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Itinerary", desc: "Flights + hotel + ground + schedule", icon: LayoutDashboard },
  { id: "compact", label: "Quick View", desc: "Day-by-day schedule only", icon: AlignJustify },
];

function TravelItineraryContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const bookingsRef = useRef<HTMLDivElement>(null);
  const scheduleRef = useRef<HTMLDivElement>(null);

  const accent = "#EA580C";

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>TRAVEL ITINERARY BUILDER</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; EA / Chief of Staff Command Center &nbsp;|&nbsp; Travel, Events &amp; Logistics</td></tr>
    </tbody></table>
  );

  const renderBookings = () => (
    <div ref={bookingsRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner(accent)}>BOOKINGS &amp; CONFIRMATIONS</div>
      <CopyButton targetRef={bookingsRef} label="Copy Section" />
      <table style={S.tbl}>
        <thead><tr>
          <th style={S.thPrimary}>Category</th>
          <th style={{ ...S.thPrimary, width: "25%" }}>Details</th>
          <th style={{ ...S.thPrimary, width: "15%" }}>Confirmation #</th>
          <th style={{ ...S.thPrimary, width: "15%" }}>Contact / Phone</th>
        </tr></thead>
        <tbody>
          {[
            { cat: "Outbound Flight", details: "[AA 1234 — JFK → LAX — 03/20 @ 8:00 AM — Arrives 11:30 AM PT]", conf: "[ABCDEF]", contact: "[800-433-7300]" },
            { cat: "Return Flight", details: "[AA 5678 — LAX → JFK — 03/22 @ 6:00 PM — Arrives 2:30 AM ET]", conf: "[GHIJKL]", contact: "[800-433-7300]" },
            { cat: "Hotel", details: "[Four Seasons Los Angeles — 300 S Doheny Dr — Check-in: 03/20, Check-out: 03/22]", conf: "[FS-789012]", contact: "[(310) 273-2222]" },
            { cat: "Ground (Arrival)", details: "[Car service — LAX pickup at Terminal 4, 11:45 AM — Driver: [Name]]", conf: "[CS-3456]", contact: "[(310) 555-0100]" },
            { cat: "Ground (Departure)", details: "[Car service — Hotel pickup at 3:30 PM — to LAX]", conf: "[CS-3457]", contact: "[(310) 555-0100]" },
            { cat: "Dinner Reservation", details: "[Nobu Malibu — 03/20 @ 7:30 PM — Party of 4]", conf: "[Verbal — ask for Maria]", contact: "[(310) 317-9140]" },
          ].map((r, i) => {
            const bg = i % 2 === 1 ? C.rowAlt : C.white;
            return (
              <tr key={i}>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 700, color: accent }}>{r.cat}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.details}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", fontWeight: 600 }}>{r.conf}</td>
                <td style={{ ...S.td0, backgroundColor: bg, fontSize: "9px" }}>{r.contact}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderSchedule = () => (
    <div ref={scheduleRef} style={{ marginBottom: "12px" }}>
      <div style={S.sectionBanner("#059669")}>DAY-BY-DAY SCHEDULE</div>
      <CopyButton targetRef={scheduleRef} label="Copy Section" />
      {["Day 1 — 03/20 (Travel + Evening)", "Day 2 — 03/21 (Full Day)", "Day 3 — 03/22 (Morning + Departure)"].map((day, di) => (
        <React.Fragment key={di}>
          <table style={{ ...S.tbl, marginTop: di > 0 ? "6px" : "0" }}><tbody>
            <tr><td style={{ backgroundColor: "#059669", color: C.white, padding: "6px 14px", fontSize: "11px", fontWeight: 700, fontFamily: S.font }}>{day}</td></tr>
          </tbody></table>
          <table style={S.tbl}>
            <tbody>
              {(di === 0 ? [
                { time: "8:00 AM", act: "[Depart JFK — Flight AA 1234]" },
                { time: "11:30 AM", act: "[Arrive LAX — Car service to hotel]" },
                { time: "1:00 PM", act: "[Check in + freshen up]" },
                { time: "2:30 PM", act: "[Prep for dinner meeting — review talking points]" },
                { time: "7:30 PM", act: "[Dinner at Nobu with [Client Name] — relationship building]" },
              ] : di === 1 ? [
                { time: "7:00 AM", act: "[Breakfast at hotel — review presentation]" },
                { time: "9:00 AM", act: "[Client meeting at [Venue] — main presentation]" },
                { time: "12:00 PM", act: "[Lunch with client team]" },
                { time: "2:00 PM", act: "[Follow-up session / workshop]" },
                { time: "4:30 PM", act: "[Return to hotel — debrief call with CoS]" },
                { time: "7:00 PM", act: "[Team dinner — [Restaurant]]" },
              ] : [
                { time: "7:00 AM", act: "[Breakfast — prep recap notes]" },
                { time: "9:00 AM", act: "[Check out — luggage stored]" },
                { time: "9:30 AM", act: "[Morning coffee with [Local Contact]]" },
                { time: "11:00 AM", act: "[Airport transfer — car service]" },
                { time: "3:30 PM", act: "[Depart LAX — Flight AA 5678]" },
              ]).map((r, i) => {
                const bg = i % 2 === 1 ? C.rowAlt : C.white;
                return (
                  <tr key={i}>
                    <td style={{ ...S.td0, backgroundColor: bg, width: "12%", textAlign: "center" as const, fontWeight: 700, fontSize: "10px", color: accent }}>{r.time}</td>
                    <td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px" }}>{r.act}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </React.Fragment>
      ))}
    </div>
  );

  const renderFooter = () => (
    <table style={{ ...S.tbl, marginTop: "8px" }}><tbody><tr>
      <td style={{ backgroundColor: C.primary, color: C.footerText, padding: "8px 20px", fontSize: "10px", fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.06em" }}>
        ExecNoteShop &bull; EA / Chief of Staff Command Center &bull; &copy; 2026 All Rights Reserved
      </td>
    </tr></tbody></table>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-orange-50/30">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-orange-600 flex items-center justify-center"><Layout size={18} className="text-white" /></div>
            <div><h1 className="text-lg font-bold text-slate-900 leading-tight">ExecNoteShop</h1><p className="text-xs text-slate-500 -mt-0.5">Professional Template Studio</p></div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-orange-50 border border-orange-100 text-orange-700 text-xs font-semibold"><MapPin size={11} />Itinerary</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/ea-cos-command-center" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-orange-600 transition-colors"><ArrowLeft size={14} />Back to EA/CoS Command Center</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center"><MapPin size={20} className="text-orange-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">Travel Itinerary Builder</h2><p className="text-xs font-medium text-orange-600">One-Page Travel Clarity</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Flight/hotel/ground, confirmation numbers, contacts, schedule. Everything on one page.</p>
        </div>
        <ThemeSwitcher />
        <div data-copy-exclude="true" className="mb-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">View Mode</p>
          <div className="flex flex-wrap gap-2">
            {LAYOUTS.map((l) => { const Icon = l.icon; const isActive = layout === l.id; return (
              <button key={l.id} onClick={() => setLayout(l.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${isActive ? "bg-orange-600 text-white border-orange-600 shadow-md shadow-orange-200" : "bg-white text-slate-600 border-slate-200 hover:border-orange-300 hover:text-orange-700"}`}>
                <Icon size={15} /><span>{l.label}</span><span className={`text-[10px] font-medium ${isActive ? "text-orange-200" : "text-slate-400"}`}>{l.desc}</span>
              </button>
            ); })}
          </div>
        </div>
        <div ref={fullPageRef} style={{ fontFamily: S.font }}>
          {layout === "full" && <>{renderTitleBanner()}{renderBookings()}{renderSchedule()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderSchedule()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function TravelItineraryBuilderPage() { return <ThemeProvider><TravelItineraryContent /></ThemeProvider>; }
