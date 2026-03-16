---
description: Global project conventions and rules for the ExecNoteShop template app
---

# ExecNoteShop — Project Conventions

These rules apply to every file and every workflow in this project. Always follow them.

---

## Tech Stack

- **Framework**: Next.js App Router (TypeScript)
- **Styling (UI chrome)**: Tailwind CSS — used for headers, breadcrumbs, layout switchers, and other non-copyable UI
- **Styling (copyable content)**: Inline `React.CSSProperties` only — never Tailwind inside the `ref` div that gets copied
- **Icons**: Lucide React (`lucide-react`)
- **Fonts**: `'Segoe UI', Calibri, Arial, sans-serif` (accessed via `S.font`)

## Theme System

All template pages use the shared theme system:

```tsx
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

// Inside the content component:
const { colors: C, styles: S } = useTheme();
```

- `C` = `ThemeColors` object (primary, secondary, accent, white, border, rowAlt, textBody, textMuted, footerText, badge colors, etc.)
- `S` = `buildStyles(colors)` output with pre-built `React.CSSProperties`:
  - `S.tbl` — base table (full-width, collapsed borders, font)
  - `S.thPrimary` — header cell with `C.primary` bg
  - `S.thSecondary` — header cell with `C.secondary` bg
  - `S.td0` — standard data cell
  - `S.tdAlt` — alternating-row data cell
  - `S.tdLabel` — bold label column (30% width, `C.labelBg`)
  - `S.tdLabelAlt` — alternating label column
  - `S.sectionBanner(color?)` — full-width colored banner
  - `S.badge(bg, fg)` — inline badge
  - `S.subNote` — italic helper text
  - `S.font` — font family string

## Layout Tables (Multi-Column Grids)

For multi-column layouts that copy-paste cleanly, use invisible layout tables:

```tsx
const LT: React.CSSProperties = {
  width: "100%", borderCollapse: "collapse" as const,
  border: "none", fontFamily: S.font,
};
const LC: React.CSSProperties = {
  verticalAlign: "top" as const, padding: "0", border: "none",
};
```

Pattern: outer `<table style={LT}>` → `<td style={LC}>` per column → inner themed tables with visible borders inside each cell.

## Copy-Paste System

- `CopyButton` — per-section copy (takes a `targetRef`)
- `CopyAllButton` — full-page copy (takes a `targetRef`)
- `ThemeSwitcher` — color theme picker
- All three carry `data-copy-exclude` so they are stripped from clipboard output
- Layout switchers also carry `data-copy-exclude`
- The `copyElementToClipboard()` utility in `src/lib/copyUtils.ts` clones the DOM, strips `[data-copy-exclude]` elements, then writes HTML + plain text to clipboard

## File & Naming Conventions

- **Product route**: kebab-case slug → `src/app/[product-slug]/page.tsx`
- **Template pages**: `src/app/[product-slug]/templates/[template-name]/page.tsx`
- **Command Center**: `src/app/[product-slug]/templates/command-center/page.tsx`
- **Template names**: kebab-case matching the URL slug

## Component Structure

Every template page follows this pattern:

```
"use client";

function [Name]Content() {          // inner component using useTheme()
  const { colors: C, styles: S } = useTheme();
  // state, refs, render functions, JSX
}

export default function [Name]Page() {   // outer wrapper
  return (
    <ThemeProvider>
      <[Name]Content />
    </ThemeProvider>
  );
}
```

## Content Rules

- **Guided sample content**: Use `[bracketed placeholders]` for fields the user fills in
- **Footer text**: `ExecNoteShop • [Product Name] • © 2026 All Rights Reserved`
- **No emojis** in file content unless the user explicitly requests them
- **Title banner**: Always a 2-row table — row 1 = `C.primary` bg with bold uppercase title; row 2 = `C.secondary` bg with product line + metadata
- **Section banners**: `S.sectionBanner(accentColor)` with uppercase text

## Build Verification

After creating or modifying pages, always run:

```bash
npx next build
```

The build must compile with **0 errors** before considering the work complete.

## Home Page Registration

Every product must have an entry in `src/app/page.tsx` → `products[]` array with:
- `id`, `title`, `subtitle`, `description`, `icon`, `href`, color classes, `templateCount`, `highlights[]`
- `commandHref` pointing to the Command Center page
