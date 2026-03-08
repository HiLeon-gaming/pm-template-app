/**
 * Clones the target element, strips all elements marked with
 * data-copy-exclude (copy buttons, theme selectors, etc.),
 * then writes the cleaned HTML + plain text to the clipboard.
 */
export async function copyElementToClipboard(el: HTMLElement): Promise<void> {
  const clone = el.cloneNode(true) as HTMLElement;

  // Remove any element flagged for exclusion
  clone.querySelectorAll("[data-copy-exclude]").forEach((n) => n.remove());

  const html = clone.innerHTML;
  const tmp = document.createElement("div");
  tmp.innerHTML = html;
  const text = tmp.innerText;

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
