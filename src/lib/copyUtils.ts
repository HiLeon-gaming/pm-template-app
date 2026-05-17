/**
 * Clones the target element, strips all elements marked with
 * data-copy-exclude (copy buttons, theme selectors, etc.),
 * sanitizes the HTML for OneNote / Word compatibility, then
 * writes the cleaned HTML + plain text to the clipboard.
 */
export async function copyElementToClipboard(el: HTMLElement): Promise<void> {
  const clone = el.cloneNode(true) as HTMLElement;

  // Remove any element flagged for exclusion
  clone.querySelectorAll("[data-copy-exclude]").forEach((n) => n.remove());

  // Sanitize for OneNote / Word paste fidelity
  sanitizeForOffice(clone);

  // Use outerHTML to preserve the root element's styles (e.g. font-family)
  const html = clone.outerHTML;
  const text = clone.innerText;

  try {
    await navigator.clipboard.write([
      new ClipboardItem({
        "text/html": new Blob([html], { type: "text/html" }),
        "text/plain": new Blob([text], { type: "text/plain" }),
      }),
    ]);
  } catch {
    await navigator.clipboard.writeText(text);
  }
}

/* ────────────────────────────────────────────────────────────────
 * OneNote / Word HTML sanitiser
 *
 * OneNote's HTML engine supports only a small subset of CSS and
 * ignores ALL width declarations (percentage and pixel).  Tables
 * auto-size to fit their content.
 *
 * Strategy:
 *  1. Convert banner <div>s to single-cell <table>s.
 *  2. Convert percentage widths to fixed pixel widths (720px
 *     reference) — feeds ghost-row calculations.
 *  3. Duplicate key CSS as HTML attributes (bgcolor, width,
 *     align, valign, cellspacing, cellpadding).
 *  4. Strip / convert unsupported CSS.
 *  5. Inject ghost rows with horizontal padding to physically
 *     force columns to the correct pixel widths.
 *  6. Wrap everything in a fixed-width outer table so OneNote
 *     creates a wide enough outline container.
 * ──────────────────────────────────────────────────────────── */

/**
 * Target width for the template in pixels.
 * Approximates a standard OneNote container on a letter-sized page.
 */
const TARGET_WIDTH_PX = 720;

function sanitizeForOffice(root: HTMLElement): void {
  convertBannerDivsToTables(root);
  convertPercentToPixelWidths(root);
  sanitizeTables(root);
  sanitizeCells(root);
  sanitizeAllElements(root);
  injectGhostRows(root);
  wrapInOuterTable(root);
}

/* ─── 1. Banner div → table conversion ──────────────────────── */

function convertBannerDivsToTables(root: HTMLElement): void {
  root.querySelectorAll("div").forEach((div) => {
    if (!div.style.backgroundColor || !div.style.borderBottom) return;
    if (div.querySelector("table, div")) return;

    const table = document.createElement("table");
    table.setAttribute("cellspacing", "0");
    table.setAttribute("cellpadding", "0");
    table.setAttribute("width", String(TARGET_WIDTH_PX));
    table.setAttribute("border", "0");
    table.style.width = `${TARGET_WIDTH_PX}px`;

    const tbody = document.createElement("tbody");
    const tr = document.createElement("tr");
    const td = document.createElement("td");

    td.style.cssText = div.style.cssText;
    td.setAttribute("bgcolor", div.style.backgroundColor);
    td.innerHTML = div.innerHTML;

    tr.appendChild(td);
    tbody.appendChild(tr);
    table.appendChild(tbody);

    div.parentNode?.replaceChild(table, div);
  });
}

/* ─── 2. Percentage → pixel width conversion ────────────────── */

function convertPercentToPixelWidths(root: HTMLElement): void {
  walkForWidths(root, TARGET_WIDTH_PX);
}

function walkForWidths(el: HTMLElement, availWidth: number): void {
  for (const child of Array.from(el.children)) {
    if (!(child instanceof HTMLElement)) continue;
    if (child.tagName === "TABLE") {
      resolveTableWidths(child as HTMLTableElement, availWidth);
    } else {
      walkForWidths(child, availWidth);
    }
  }
}

function resolveTableWidths(
  table: HTMLTableElement,
  availWidth: number,
): void {
  let tableWidth = availWidth;
  const pct = parsePercent(table.style.width);
  if (pct !== null) {
    tableWidth = Math.round((availWidth * pct) / 100);
  }
  table.style.width = `${tableWidth}px`;

  for (const row of Array.from(table.rows)) {
    for (const cell of Array.from(row.cells)) {
      let cellWidth: number | null = null;
      const cellPct = parsePercent(cell.style.width);
      if (cellPct !== null) {
        cellWidth = Math.round((tableWidth * cellPct) / 100);
        cell.style.width = `${cellWidth}px`;
      }
      walkForWidths(cell, cellWidth ?? tableWidth);
    }
  }
}

function parsePercent(value: string | undefined | null): number | null {
  if (!value) return null;
  const match = value.match(/^(\d+(?:\.\d+)?)%$/);
  return match ? parseFloat(match[1]) : null;
}

/* ─── 3. HTML attribute duplication ─────────────────────────── */

function sanitizeTables(root: HTMLElement): void {
  root.querySelectorAll("table").forEach((table) => {
    table.setAttribute("cellspacing", "0");
    table.setAttribute("cellpadding", "0");

    const border = table.style.border;
    if (!border || border === "none") {
      table.setAttribute("border", "0");
    }

    if (table.style.width) {
      table.setAttribute("width", stripUnits(table.style.width));
    }
  });
}

function sanitizeCells(root: HTMLElement): void {
  root.querySelectorAll("td, th").forEach((cell) => {
    const el = cell as HTMLElement;

    if (el.style.backgroundColor) {
      el.setAttribute("bgcolor", el.style.backgroundColor);
    }
    if (el.style.width) {
      el.setAttribute("width", stripUnits(el.style.width));
    }
    if (el.style.verticalAlign) {
      el.setAttribute("valign", el.style.verticalAlign);
    }
    if (el.style.textAlign) {
      el.setAttribute("align", el.style.textAlign);
    }
  });
}

function stripUnits(value: string): string {
  return value.replace(/px$/i, "").replace(/%$/i, "");
}

/* ─── 4. Unsupported CSS cleanup ────────────────────────────── */

function sanitizeAllElements(root: HTMLElement): void {
  root.querySelectorAll("*").forEach((node) => {
    const el = node as HTMLElement;
    if (!el.style) return;

    if (el.style.textTransform === "uppercase") {
      el.style.removeProperty("text-transform");
      el.childNodes.forEach((child) => {
        if (child.nodeType === Node.TEXT_NODE && child.textContent) {
          child.textContent = child.textContent.toUpperCase();
        }
      });
    }

    el.style.removeProperty("letter-spacing");
    el.style.removeProperty("border-radius");
    el.style.removeProperty("line-height");
    el.style.removeProperty("border-collapse");
  });
}

/* ─── 5. Ghost rows — force column widths via spacer images ─── */

/** 1×1 transparent GIF used as a width-forcing spacer. */
const SPACER_GIF =
  "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

/**
 * OneNote auto-sizes table columns to fit content, ignoring all
 * width declarations (CSS and HTML attributes).  Ghost rows use
 * transparent spacer images with explicit width/height attributes
 * to physically force each column to the desired pixel width.
 * OneNote MUST render <img> tags and respect their dimensions.
 */
function injectGhostRows(root: HTMLElement): void {
  root.querySelectorAll("table").forEach((table) => {
    const templateRow = findWidestRow(table);
    if (!templateRow || templateRow.cells.length <= 1) return;

    const cells = Array.from(templateRow.cells);
    const widths: number[] = cells.map((cell) => {
      const w = parseInt(cell.style.width, 10);
      return isNaN(w) ? 0 : w;
    });

    if (widths.every((w) => w === 0)) return;

    const ghostRow = document.createElement("tr");

    for (let i = 0; i < cells.length; i++) {
      const ghostCell = document.createElement("td");
      ghostCell.style.cssText =
        "padding:0;border:none;font-size:0;line-height:0;height:0";

      const w = widths[i];
      if (w > 0) {
        const img = document.createElement("img");
        img.src = SPACER_GIF;
        img.width = w;
        img.height = 1;
        img.alt = "";
        img.style.cssText = "display:block;border:none";
        ghostCell.appendChild(img);
      }

      const cs = cells[i].getAttribute("colspan");
      if (cs) ghostCell.setAttribute("colspan", cs);

      ghostRow.appendChild(ghostCell);
    }

    const firstSection =
      table.querySelector("thead") || table.querySelector("tbody");
    if (firstSection) {
      firstSection.insertBefore(ghostRow, firstSection.firstChild);
    }
  });
}

function findWidestRow(table: HTMLTableElement): HTMLTableRowElement | null {
  let best: HTMLTableRowElement | null = null;
  let maxCells = 0;
  for (const row of Array.from(table.rows)) {
    if (row.cells.length > maxCells) {
      maxCells = row.cells.length;
      best = row;
    }
  }
  return best;
}

/* ─── 6. Outer wrapper table ────────────────────────────────── */

/**
 * Wrap clipboard content in a fixed-width outer table.  A spacer
 * row contains a transparent image whose width attribute forces
 * OneNote to create a container at least TARGET_WIDTH_PX wide.
 */
function wrapInOuterTable(root: HTMLElement): void {
  const wrapper = document.createElement("table");
  wrapper.setAttribute("width", String(TARGET_WIDTH_PX));
  wrapper.setAttribute("cellspacing", "0");
  wrapper.setAttribute("cellpadding", "0");
  wrapper.setAttribute("border", "0");
  wrapper.style.cssText =
    `width:${TARGET_WIDTH_PX}px;table-layout:fixed;border:none`;

  const tbody = document.createElement("tbody");

  // Spacer row — transparent image forces the container width
  const spacerRow = document.createElement("tr");
  const spacerCell = document.createElement("td");
  spacerCell.style.cssText =
    "padding:0;border:none;font-size:0;line-height:0;height:0";
  const spacerImg = document.createElement("img");
  spacerImg.src = SPACER_GIF;
  spacerImg.width = TARGET_WIDTH_PX;
  spacerImg.height = 1;
  spacerImg.alt = "";
  spacerImg.style.cssText = "display:block;border:none";
  spacerCell.appendChild(spacerImg);
  spacerRow.appendChild(spacerCell);
  tbody.appendChild(spacerRow);

  // Content row — holds all the actual template content
  const contentRow = document.createElement("tr");
  const contentCell = document.createElement("td");
  contentCell.style.cssText = "padding:0;border:none;vertical-align:top";

  while (root.firstChild) {
    contentCell.appendChild(root.firstChild);
  }

  contentRow.appendChild(contentCell);
  tbody.appendChild(contentRow);
  wrapper.appendChild(tbody);
  root.appendChild(wrapper);
}
