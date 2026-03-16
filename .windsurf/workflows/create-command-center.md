---
description: How to create a Command Center page for a product package with hyperlinked index and explanatory text
---

# Create a Command Center Page

Use this workflow to create the "Command Center" page for a product package. This is a one-page guide that provides a hyperlinked index to every template and explains the entire package at an 8th-grade reading level.

---

## Prerequisites

1. **Product slug** (e.g., `okr-hub`)
2. **Product name** (e.g., "OKR and Operating Rhythm Hub")
3. **Total template count** and **section count**
4. **Sections and templates** -- extracted from the product's TOC page (`src/app/[product-slug]/page.tsx`)
5. **Accent color** -- primary accent hex for the product
6. **Accent dark color** -- darker shade for the "How to Use" banner

---

## Steps

### Step 1 -- Extract sections and templates from the TOC

Read the product's TOC page and extract:
- Section titles and their accent colors
- Template names and their href paths
- Template counts per section

### Step 2 -- Create the command center file

Create `src/app/[product-slug]/templates/command-center/page.tsx`.

The file MUST start with `"use client"`.

### Step 3 -- Set up imports and data structures

```tsx
"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { ArrowLeft, Layout, ClipboardList } from "lucide-react";
import CopyAllButton from "@/components/CopyAllButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

const BASE = "/[product-slug]/templates";

interface TmplEntry { name: string; href: string }
interface Section {
  title: string;
  color: string;
  templates: TmplEntry[];
  explanation: string;
}
```

### Step 4 -- Populate the sections array

For each section, include:
- `title` -- section name
- `color` -- hex accent color (match the TOC page)
- `templates[]` -- array of `{ name, href }` for every template in the section
- `explanation` -- a detailed paragraph explaining the section and every template within it

**Explanation text rules:**
- Written at an **8th-grade reading level**
- Every acronym spelled out on first use with the abbreviation in parentheses (e.g., "OKR (Objectives and Key Results)")
- Clear, intuitive tone that sets the stage for using the entire package
- Mention every template by name and explain what it does and why it is included
- Connect templates to each other so the user understands the workflow

### Step 5 -- Build the inner content component

```tsx
function CommandCenterContent() {
  const { colors: C, styles: S } = useTheme();
  const fullPageRef = useRef<HTMLDivElement>(null);

  const LT: React.CSSProperties = {
    width: "100%", borderCollapse: "collapse" as const,
    border: "none", fontFamily: S.font,
  };
  const LC: React.CSSProperties = {
    verticalAlign: "top" as const, padding: "0", border: "none",
  };

  const accent = "#HEXCOLOR";      // product accent
  const accentDark = "#HEXCOLOR";   // darker shade for "How to Use" banner

  const linkStyle: React.CSSProperties = {
    color: C.secondary, textDecoration: "underline",
    fontSize: "12px", fontWeight: 600, fontFamily: S.font,
  };

  // Section box renderer (nested table with colored header + linked template names)
  const renderSectionBox = (section: Section) => ( /* ... */ );

  // Grid rows -- 3 columns per row
  const gridRows: Section[][] = [];
  for (let i = 0; i < sections.length; i += 3) {
    gridRows.push(sections.slice(i, i + 3));
  }

  // ... return JSX
}
```

### Step 6 -- Assemble the page structure

The copyable content div (`ref={fullPageRef}`) must contain these sections in order:

1. **Title banner** -- 2-row table
   - Row 1: `C.primary` bg, product name in uppercase, `4px solid ${accent}` bottom border
   - Row 2: `C.secondary` bg, "ExecNoteShop | [count] Templates | [count] Sections | [tagline]"

2. **Intro blurb** -- 1 table cell with 2-3 sentences describing the package

3. **Section banner**: "TEMPLATE INDEX -- QUICK NAVIGATION"

4. **3-column index grid** -- for each row of 3 sections:
   ```
   <table style={LT}>
     <tr>
       <td style={{ ...LC, width: "33%" }}>{renderSectionBox(section)}</td>
       <td style={{ ...LC, width: "33%" }}>{renderSectionBox(section)}</td>
       <td style={{ ...LC, width: "33%" }}>{renderSectionBox(section)}</td>
     </tr>
   </table>
   ```
   Each section box is a nested table with:
   - Colored header row (`section.color` bg) showing "Section Title (count)"
   - Rows of hyperlinked template names with zebra striping

5. **Section banner**: "HOW TO USE THIS PACKAGE"

6. **Overview paragraph** -- explains the package as a whole:
   - What it is
   - Who it is for
   - How to get started (recommend specific templates)
   - Copy-paste instructions

7. **Per-section explanations** -- for each section:
   - Colored header bar with "Section N: Title (count templates)"
   - Explanation paragraph covering every template

8. **Footer** -- "ExecNoteShop | [Product Name] | (c) 2026 All Rights Reserved"

### Step 7 -- Export with ThemeProvider wrapper

```tsx
export default function [Product]CommandCenter() {
  return (
    <ThemeProvider>
      <CommandCenterContent />
    </ThemeProvider>
  );
}
```

### Step 8 -- Register on the home page

In `src/app/page.tsx`, find the product entry in `products[]` and add:
```tsx
commandHref: "/[product-slug]/templates/command-center",
```

### Step 9 -- Verify build

// turbo
Run `npx next build` and confirm 0 errors.

---

## Reference Files

- Command Center example (OKR): `src/app/okr-hub/templates/command-center/page.tsx`
- Command Center example (Relationship): `src/app/relationship-hub/templates/command-center/page.tsx`
- Product TOC example: `src/app/okr-hub/page.tsx`
- Home page: `src/app/page.tsx`
- See `/project-conventions` for global rules
