---
description: How to create a new template page with nested tables, dual layouts, theme integration, and copy-paste fidelity
---

# Create a Template Page

Use this workflow when building an individual template page inside a product package. This is the most complex and frequently repeated pattern in the app.

---

## Prerequisites

1. **Product slug** (e.g., `okr-hub`)
2. **Template name and slug** (e.g., "OKR Builder" / `okr-builder`)
3. **Accent color** -- hex color for section banners (e.g., `"#7C3AED"`)
4. **Layout modes** -- typically `"full"` (all sections) and `"compact"` (key sections only)
5. **Sections** -- the content sections the template needs (tables, checklists, tip boxes, etc.)
6. **Product name** for the subtitle banner (e.g., "OKR and Operating Rhythm Hub")

---

## Steps

### Step 1 -- Create the template page file

Create `src/app/[product-slug]/templates/[template-name]/page.tsx`.

The file MUST start with `"use client"`.

### Step 2 -- Set up imports and types

```tsx
"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, [TemplateIcon], LayoutDashboard, AlignJustify } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

type LayoutMode = "full" | "compact";
const LAYOUTS: { id: LayoutMode; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "full", label: "Full [Name]", desc: "All sections included", icon: LayoutDashboard },
  { id: "compact", label: "Quick [Name]", desc: "Key sections only", icon: AlignJustify },
];
```

### Step 3 -- Build the inner content component

```tsx
function [Name]Content() {
  const { colors: C, styles: S } = useTheme();
  const [layout, setLayout] = useState<LayoutMode>("full");

  // Refs -- one per section for individual copy buttons
  const fullRef = useRef<HTMLDivElement>(null);
  const section1Ref = useRef<HTMLDivElement>(null);
  // ... more refs as needed

  // Accent color for this template
  const accent = "#HEXCOLOR";

  // Layout table helpers (invisible grid for multi-column layouts)
  const LT: React.CSSProperties = {
    width: "100%", borderCollapse: "collapse" as const,
    border: "none", fontFamily: S.font,
  };
  const LC: React.CSSProperties = {
    verticalAlign: "top" as const, padding: "0", border: "none",
  };

  // Render functions for each section...
}
```

### Step 4 -- Build the title banner

Every template page starts with a 2-row title banner:

```tsx
const renderTitleBanner = () => (
  <table style={{ ...S.tbl, marginBottom: "4px" }}>
    <tbody>
      <tr>
        <td style={{
          backgroundColor: C.primary, color: C.white,
          padding: "16px 20px", fontSize: "22px", fontWeight: 800,
          fontFamily: S.font, letterSpacing: "0.04em",
          borderBottom: `4px solid ${accent}`,
          textAlign: "center" as const,
        }}>
          TEMPLATE TITLE IN UPPERCASE
        </td>
      </tr>
      <tr>
        <td style={{
          backgroundColor: C.secondary, color: C.white,
          padding: "6px 20px", fontSize: "11px", fontWeight: 600,
          fontFamily: S.font, textAlign: "center" as const,
          letterSpacing: "0.08em", textTransform: "uppercase" as const,
        }}>
          ExecNoteShop | [Product Name] | [Optional: All-Star] | [Tagline]
        </td>
      </tr>
    </tbody>
  </table>
);
```

### Step 5 -- Build content sections

Each section follows this pattern:

```tsx
const renderSectionName = () => (
  <div ref={sectionRef} style={{ marginBottom: "12px" }}>
    <div style={S.sectionBanner(accent)}>SECTION TITLE IN UPPERCASE</div>
    <CopyButton targetRef={sectionRef} label="Copy Section" />
    <p style={{ ...S.subNote, marginBottom: "6px" }}>
      Helper text explaining how to use this section.
    </p>
    <table style={S.tbl}>
      <thead>
        <tr>
          <th style={S.thPrimary}>Column Header</th>
          {/* more headers */}
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style={S.tdLabel}>Label</td>
          <td style={S.td0}>[Placeholder for user input]</td>
        </tr>
        <tr>
          <td style={S.tdLabelAlt}>Label</td>
          <td style={S.tdAlt}>[Placeholder for user input]</td>
        </tr>
      </tbody>
    </table>
  </div>
);
```

**Key rules for content:**
- Use `[bracketed placeholders]` for user-fillable fields
- Alternate `S.td0` / `S.tdAlt` and `S.tdLabel` / `S.tdLabelAlt` for zebra striping
- Use `S.badge(C.badgeGreenBg, C.badgeGreenFg)` etc. for status badges
- Use `S.subNote` for italic instructional text below section banners

### Step 6 -- Multi-column layouts

For side-by-side tables, use layout tables:

```tsx
<table style={LT}>
  <tbody>
    <tr>
      <td style={{ ...LC, width: "50%", paddingRight: "6px" }}>
        {/* Left column: inner themed table */}
      </td>
      <td style={{ ...LC, width: "50%", paddingLeft: "6px" }}>
        {/* Right column: inner themed table */}
      </td>
    </tr>
  </tbody>
</table>
```

### Step 7 -- Assemble the page JSX

```tsx
return (
  <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-[color]-50/30">
    {/* Header with ExecNoteShop branding */}
    <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      {/* ... */}
    </header>

    <div className="max-w-6xl mx-auto px-6 py-8">
      {/* Back link + CopyAllButton */}
      {/* Page title + icon */}
      {/* Layout switcher (data-copy-exclude) */}
      <ThemeSwitcher />

      {/* === COPYABLE CONTENT STARTS HERE === */}
      <div ref={fullRef} style={{ fontFamily: S.font }}>
        {renderTitleBanner()}
        {layout === "full" && renderSection1()}
        {renderSection2()}
        {/* ... conditionally render sections based on layout */}
        {/* Footer */}
      </div>
      {/* === COPYABLE CONTENT ENDS HERE === */}

      <div className="flex justify-center mt-8 mb-12">
        <CopyAllButton targetRef={fullRef} />
      </div>
    </div>
  </div>
);
```

### Step 8 -- Export with ThemeProvider wrapper

```tsx
export default function [Name]Page() {
  return (
    <ThemeProvider>
      <[Name]Content />
    </ThemeProvider>
  );
}
```

### Step 9 -- Update the product TOC page

In `src/app/[product-slug]/page.tsx`, find the template entry and update:
- `href: \`${BASE}/[template-name]\``
- `badge: "Built"`

### Step 10 -- Verify build

// turbo
Run `npx next build` and confirm 0 errors.

---

## Reference Files

- Template example (OKR): `src/app/okr-hub/templates/okr-builder/page.tsx`
- Template example (Relationship): `src/app/relationship-hub/templates/stakeholder-profile/page.tsx`
- Theme system: `src/lib/themes.ts` and `src/lib/ThemeContext.tsx`
- Copy utilities: `src/lib/copyUtils.ts`
- Components: `src/components/CopyButton.tsx`, `src/components/CopyAllButton.tsx`, `src/components/ThemeSwitcher.tsx`
- See `/project-conventions` for global rules
