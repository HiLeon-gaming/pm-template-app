"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, CheckSquare, LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full Checklist", desc: "Packing + documents + tech + last-minute", icon: LayoutDashboard },
  { id: "compact", label: "Quick List", desc: "Essentials only", icon: AlignJustify },
];

function PackingReadinessContent() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");
  const fullPageRef = useRef<HTMLDivElement>(null);
  const essentialsRef = useRef<HTMLDivElement>(null);
  const techRef = useRef<HTMLDivElement>(null);
  const lastMinRef = useRef<HTMLDivElement>(null);

  const LT: React.CSSProperties = { width: "100%", borderCollapse: "collapse" as const, border: "none", fontFamily: S.font };
  const LC: React.CSSProperties = { verticalAlign: "top" as const, padding: "0", border: "none" };
  const accent = "#EA580C";

  const renderTitleBanner = () => (
    <table style={{ ...S.tbl, marginBottom: "4px" }}><tbody>
      <tr><td style={{ backgroundColor: C.primary, color: C.white, padding: "16px 20px", fontSize: "22px", fontWeight: 800, fontFamily: S.font, letterSpacing: "0.04em", borderBottom: `4px solid ${accent}`, textAlign: "center" as const }}>PACKING &amp; READINESS CHECKLIST</td></tr>
      <tr><td style={{ backgroundColor: C.secondary, color: C.white, padding: "6px 20px", fontSize: "11px", fontWeight: 600, fontFamily: S.font, textAlign: "center" as const, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>ExecNoteShop &nbsp;|&nbsp; EA / Chief of Staff Command Center &nbsp;|&nbsp; Travel, Events &amp; Logistics</td></tr>
    </tbody></table>
  );

  const renderEssentials = () => (
    <div ref={essentialsRef} style={{ marginBottom: "12px" }}>
      <table style={LT}><tbody><tr>
        <td style={{ ...LC, width: "50%", paddingRight: "4px" }}>
          <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner(accent)}>DOCUMENTS &amp; TRAVEL</td></tr></tbody></table>
          <table style={S.tbl}><tbody>
            {["Passport / ID (check expiry)", "Boarding passes (printed + digital)", "Hotel confirmation", "Car service confirmation", "Meeting agenda + materials (printed)", "Business cards", "Expense receipts folder", "Travel insurance info"].map((item, i) => {
              const bg = i % 2 === 1 ? C.rowAlt : C.white;
              return <tr key={i}><td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", padding: "6px 12px" }}>&#9744; {item}</td></tr>;
            })}
          </tbody></table>
        </td>
        <td style={{ ...LC, width: "50%", paddingLeft: "4px" }}>
          <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner("#7C3AED")}>CLOTHING &amp; PERSONAL</td></tr></tbody></table>
          <table style={S.tbl}><tbody>
            {["Business attire (suits / blazers)", "Casual / dinner outfit", "Shoes (dress + comfortable)", "Workout clothes + shoes", "Toiletries bag (TSA-compliant)", "Medications / vitamins", "Umbrella / weather gear", "Glasses / contacts / spares"].map((item, i) => {
              const bg = i % 2 === 1 ? C.rowAlt : C.white;
              return <tr key={i}><td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", padding: "6px 12px" }}>&#9744; {item}</td></tr>;
            })}
          </tbody></table>
        </td>
      </tr></tbody></table>
      <CopyButton targetRef={essentialsRef} label="Copy Section" />
    </div>
  );

  const renderTech = () => (
    <div ref={techRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner("#0EA5E9")}>TECH &amp; ELECTRONICS</td></tr></tbody></table>
      <CopyButton targetRef={techRef} label="Copy Section" />
      <table style={S.tbl}><tbody>
        {["Laptop + charger", "Phone + charger + portable battery", "Presentation adapter (HDMI / USB-C)", "Headphones / AirPods", "International power adapter (if needed)", "Hotspot device (if no reliable WiFi)", "Backup of presentation on USB drive"].map((item, i) => {
          const bg = i % 2 === 1 ? C.rowAlt : C.white;
          return <tr key={i}><td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", padding: "6px 12px" }}>&#9744; {item}</td></tr>;
        })}
      </tbody></table>
    </div>
  );

  const renderLastMin = () => (
    <div ref={lastMinRef} style={{ marginBottom: "12px" }}>
      <table style={{ ...S.tbl, marginBottom: "0px" }}><tbody><tr><td style={S.sectionBanner("#DC2626")}>LAST-MINUTE CHECKS (Day Before)</td></tr></tbody></table>
      <CopyButton targetRef={lastMinRef} label="Copy Section" />
      <table style={S.tbl}><tbody>
        {["Calendar confirmed for travel days", "Out-of-office set on email", "Team notified of absence", "Backup / delegate briefed", "Itinerary sent to exec + spouse (if applicable)", "Car service confirmed for airport", "Weather checked at destination", "Downloaded offline maps / entertainment"].map((item, i) => {
          const bg = i % 2 === 1 ? C.rowAlt : C.white;
          return <tr key={i}><td style={{ ...S.td0, backgroundColor: bg, fontSize: "10px", padding: "6px 12px" }}>&#9744; {item}</td></tr>;
        })}
      </tbody></table>
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
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-orange-50 border border-orange-100 text-orange-700 text-xs font-semibold"><CheckSquare size={11} />Packing</span>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/ea-cos-command-center" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-orange-600 transition-colors"><ArrowLeft size={14} />Back to EA/CoS Command Center</Link>
          <CopyAllButton targetRef={fullPageRef} />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center"><CheckSquare size={20} className="text-orange-600" /></div>
            <div><h2 className="text-2xl font-extrabold text-slate-900">Packing &amp; Readiness Checklist</h2><p className="text-xs font-medium text-orange-600">Don&apos;t Forget Anything</p></div>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">Customizable packing and &ldquo;don&apos;t forget&rdquo; list. Reduces travel friction for every trip.</p>
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
          {layout === "full" && <>{renderTitleBanner()}{renderEssentials()}{renderTech()}{renderLastMin()}{renderFooter()}</>}
          {layout === "compact" && <>{renderTitleBanner()}{renderEssentials()}{renderFooter()}</>}
        </div>
        <div className="flex justify-center mt-8 mb-12"><CopyAllButton targetRef={fullPageRef} /></div>
      </div>
    </div>
  );
}

export default function PackingReadinessChecklistPage() { return <ThemeProvider><PackingReadinessContent /></ThemeProvider>; }
