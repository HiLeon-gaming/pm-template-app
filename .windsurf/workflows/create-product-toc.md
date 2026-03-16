---
description: How to create a new product TOC (Table of Contents) landing page for a product package
---

# Create a Product TOC Page

Use this workflow when adding a brand-new product package to ExecNoteShop. This creates the main landing page that lists all sections and templates.

---

## Prerequisites

Before starting, gather:
1. **Product name** (e.g., "OKR and Operating Rhythm Hub")
2. **Product slug** (e.g., `okr-hub`)
3. **Short subtitle** (e.g., "Strategy-to-Execution System for Leaders and Teams")
4. **Product description** (2-3 sentences for the hero section)
5. **Lucide icon** to represent the product (e.g., `Target`)
6. **Sections** -- each section needs: title, subtitle, Lucide icon, hex accent color
7. **Templates per section** -- each template needs: title, 1-sentence description, URL slug

---

## Steps

### Step 1 -- Create the TOC page file

Create `src/app/[product-slug]/page.tsx` as a **server component** (no `"use client"`).

Use the following structure as the template:

```tsx
import React from "react";
import Link from "next/link";
import { Layout, ArrowLeft, [ProductIcon], Sparkles, Star, /* section icons */ } from "lucide-react";

const BASE = "/[product-slug]/templates";

interface Template {
  title: string;
  description: string;
  href: string | null;
  badge: string;
  allStar?: boolean;
  whyAllStar?: string;
}

interface Category {
  title: string;
  subtitle: string;
  icon: React.ElementType;
  color: string;
  templates: Template[];
}

const categories: Category[] = [
  // ... populate with sections and templates
];
```

### Step 2 -- Populate sections and templates

For each section, add a `Category` entry with:
- `title` -- section name (e.g., "Sprint Planning and Commitments")
- `subtitle` -- 1-sentence description of the section
- `icon` -- a Lucide icon component
- `color` -- hex color string (e.g., `"#059669"`)
- `templates[]` -- array of `Template` objects

For each template:
- Set `href: null` and `badge: "Coming Soon"` for unbuilt templates
- Set `href` to the template path and `badge: "Built"` for built templates
- Optionally set `allStar: true` and `whyAllStar` for standout templates

### Step 3 -- Render the page

The page should include these sections in order:
1. **Header** -- ExecNoteShop branding with product icon
2. **Breadcrumb** -- Back link to home page
3. **Hero section** -- Product title, subtitle, description, template count stats
4. **Category grid** -- For each category: icon, title, subtitle, and a grid of template cards
5. **Template cards** -- Show title, description, badge, link (if built), All-Star indicator

Use **Tailwind CSS** for all styling on this page (it is NOT copied to clipboard).

Each template card should be a `Link` component pointing to the template page when built, or a disabled card when not.

### Step 4 -- Register on the home page

Add an entry to the `products[]` array in `src/app/page.tsx` with:
- `id` -- the product slug
- `title` -- full product name
- `subtitle` -- role-targeted subtitle
- `description` -- 2-3 sentence description
- `icon` -- Lucide icon component
- `href` -- `"/[product-slug]"`
- Color classes: `bgClass`, `lightBgClass`, `hoverBgClass`, `textClass`, `hoverBorderClass`, `shadowClass`, `badgeClass`
- `templateCount` -- e.g., `"54+"`
- `highlights[]` -- 4 bullet points
- `commandHref` -- `"/[product-slug]/templates/command-center"` (add after command center is created)

### Step 5 -- Verify build

// turbo
Run `npx next build` and confirm 0 errors.

---

## Reference Files

- TOC example (OKR): `src/app/okr-hub/page.tsx`
- TOC example (Relationship): `src/app/relationship-hub/page.tsx`
- Home page: `src/app/page.tsx`
- See `/project-conventions` for global rules
