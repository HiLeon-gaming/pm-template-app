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
 * OneNote's HTML engine supports only a small subset of CSS.
 * Supported on cells: background-color, border, color, font-*,
 *   padding, text-align, width.
 * NOT supported: border-collapse, border-radius, letter-spacing,
 *   text-transform, line-height, display:inline-block, etc.
 *
 * Strategy:
 *  1. Duplicate key CSS as HTML attributes (bgcolor, width,
 *     align, valign, cellspacing, cellpadding) which OneNote
 *     handles more reliably than CSS equivalents.
 *  2. Strip / convert unsupported CSS so OneNote doesn't silently
 *     discard it and fall back to unwanted defaults.
 *  3. Convert section-banner <div>s to single-cell <table>s
 *     because OneNote renders table-cell backgrounds much more
 *     reliably than styled divs.
 * ──────────────────────────────────────────────────────────── */

function sanitizeForOffice(root: HTMLElement): void {
  sanitizeTables(root);
  sanitizeCells(root);
  sanitizeAllElements(root);
  convertBannerDivsToTables(root);
}

/** Add HTML table attributes that OneNote respects as fallbacks. */
function sanitizeTables(root: HTMLElement): void {
  root.querySelectorAll("table").forEach((table) => {
    // cellspacing="0" is the HTML-attribute equivalent of
    // border-collapse:collapse — critical for eliminating the
    // double-border / extra-gap problem in OneNote.
    table.setAttribute("cellspacing", "0");
    table.setAttribute("cellpadding", "0");

    // Layout tables (border:none) need an explicit attribute
    const border = table.style.border;
    if (!border || border === "none") {
      table.setAttribute("border", "0");
    }

    if (table.style.width) {
      table.setAttribute("width", table.style.width);
    }
  });
}

/** Duplicate cell CSS to HTML attributes for broader compatibility. */
function sanitizeCells(root: HTMLElement): void {
  root.querySelectorAll("td, th").forEach((cell) => {
    const el = cell as HTMLElement;

    if (el.style.backgroundColor) {
      el.setAttribute("bgcolor", el.style.backgroundColor);
    }
    if (el.style.width) {
      el.setAttribute("width", el.style.width);
    }
    if (el.style.verticalAlign) {
      el.setAttribute("valign", el.style.verticalAlign);
    }
    if (el.style.textAlign) {
      el.setAttribute("align", el.style.textAlign);
    }
  });
}

/** Strip unsupported CSS and convert text-transform to real text. */
function sanitizeAllElements(root: HTMLElement): void {
  root.querySelectorAll("*").forEach((node) => {
    const el = node as HTMLElement;
    if (!el.style) return;

    // Convert text-transform:uppercase to actual uppercase characters
    if (el.style.textTransform === "uppercase") {
      el.style.removeProperty("text-transform");
      el.childNodes.forEach((child) => {
        if (child.nodeType === Node.TEXT_NODE && child.textContent) {
          child.textContent = child.textContent.toUpperCase();
        }
      });
    }

    // Remove properties OneNote silently ignores
    el.style.removeProperty("letter-spacing");
    el.style.removeProperty("border-radius");
    el.style.removeProperty("line-height");
    el.style.removeProperty("border-collapse");
  });
}

/**
 * Section banners are styled <div>s with a background colour and
 * a bottom border.  OneNote renders table cells with background
 * colours far more reliably than standalone divs, so we wrap each
 * banner in a single-cell table during copy.
 */
function convertBannerDivsToTables(root: HTMLElement): void {
  root.querySelectorAll("div").forEach((div) => {
    // Identify section banners by their characteristic styling
    if (!div.style.backgroundColor || !div.style.borderBottom) return;
    // Skip if this div contains complex child elements (not a simple banner)
    if (div.querySelector("table, div")) return;

    const table = document.createElement("table");
    table.setAttribute("cellspacing", "0");
    table.setAttribute("cellpadding", "0");
    table.setAttribute("width", "100%");
    table.setAttribute("border", "0");
    table.style.width = "100%";

    const tbody = document.createElement("tbody");
    const tr = document.createElement("tr");
    const td = document.createElement("td");

    // Transfer all inline styles from the div to the td
    td.style.cssText = div.style.cssText;
    td.setAttribute("bgcolor", div.style.backgroundColor);
    td.innerHTML = div.innerHTML;

    tr.appendChild(td);
    tbody.appendChild(tr);
    table.appendChild(tbody);

    div.parentNode?.replaceChild(table, div);
  });
}
