---
description: End-to-end workflow for adding an entire new product package to ExecNoteShop
---

# Add a New Product Package (End-to-End)

Master workflow that orchestrates the creation of a complete product package: TOC page, all template pages, Command Center page, home page registration, and deployment.

---

## Prerequisites

Gather the following before starting:

1. **Product name** -- full display name (e.g., "OKR and Operating Rhythm Hub")
2. **Product slug** -- kebab-case URL path (e.g., `okr-hub`)
3. **Subtitle** -- role-targeted tagline (e.g., "Strategy-to-Execution System for Leaders and Teams")
4. **Description** -- 2-3 sentences for the home page card
5. **Lucide icon** -- icon component name (e.g., `Target`)
6. **Color scheme** -- Tailwind color name (e.g., `amber`) + hex accent colors per section
7. **Sections** -- list of sections with: title, subtitle, icon, hex color
8. **Templates** -- for each section, list of templates with: title, description, slug, accent color
9. **Highlights** -- 4 bullet points for the home page card

---

## Steps

### Step 1 -- Create the product TOC page

Follow the `/create-product-toc` workflow:
- Create `src/app/[product-slug]/page.tsx`
- Define all sections and templates (initially with `href: null` and badge "Coming Soon")
- Add the product to `src/app/page.tsx` `products[]` array (without `commandHref` for now)

// turbo
Verify build: `npx next build`

### Step 2 -- Build template pages

For each template in the product, follow the `/create-template-page` workflow:
- Create `src/app/[product-slug]/templates/[template-name]/page.tsx`
- Include: title banner, section banners, themed tables, layout switcher, copy buttons
- Use `[bracketed placeholders]` for user-fillable content
- After each template is created, update the TOC page: set `href` and `badge: "Built"`

**Recommended order:** Build templates section by section, starting with "Start Here" templates.

Build in batches and verify periodically:
// turbo
`npx next build`

### Step 3 -- Create the Command Center page

Follow the `/create-command-center` workflow:
- Create `src/app/[product-slug]/templates/command-center/page.tsx`
- Extract all sections and templates from the TOC page
- Write explanation text at 8th-grade reading level with all acronyms defined
- Build the 3-column hyperlinked index grid
- Build the "How to Use This Package" section

### Step 4 -- Register Command Center on home page

In `src/app/page.tsx`, add `commandHref` to the product entry:
```tsx
commandHref: "/[product-slug]/templates/command-center",
```

### Step 5 -- Final build verification

// turbo
Run `npx next build` and confirm 0 errors.

### Step 6 -- Commit and deploy

```bash
git add .
git commit -m "Add [Product Name] package ([N] templates, [M] sections)"
git push origin main
vercel --prod
```

---

## Quality Checklist

Before considering the package complete, verify:

- [ ] TOC page lists all templates with correct hrefs and badges
- [ ] Every template page has: title banner, section banners, themed tables, layout switcher, CopyButton per section, CopyAllButton
- [ ] All content uses inline styles (no Tailwind inside copyable refs)
- [ ] `[Bracketed placeholders]` used for all user-fillable fields
- [ ] Command Center has: 3-column index grid, intro blurb, per-section explanations, footer
- [ ] Command Center explanations are 8th-grade reading level with all acronyms defined
- [ ] Product registered on home page with all required fields including `commandHref`
- [ ] `npx next build` compiles with 0 errors
- [ ] Theme switcher works on all pages
- [ ] Copy buttons copy clean HTML to clipboard (no UI chrome included)

---

## Reference Files

- TOC example (OKR): `src/app/okr-hub/page.tsx`
- TOC example (Relationship): `src/app/relationship-hub/page.tsx`
- Template example (OKR): `src/app/okr-hub/templates/okr-builder/page.tsx`
- Template example (Relationship): `src/app/relationship-hub/templates/stakeholder-profile/page.tsx`
- Command Center example (OKR): `src/app/okr-hub/templates/command-center/page.tsx`
- Command Center example (Relationship): `src/app/relationship-hub/templates/command-center/page.tsx`
- Home page: `src/app/page.tsx`
- Theme system: `src/lib/themes.ts`, `src/lib/ThemeContext.tsx`
- Copy system: `src/lib/copyUtils.ts`, `src/components/CopyButton.tsx`, `src/components/CopyAllButton.tsx`
- See `/project-conventions` for global rules
