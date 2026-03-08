/**
 * Shared theme definitions for all ExecNoteShop templates.
 * Every color is used as an inline style value so it survives
 * copy-paste into OneNote / Word.
 *
 * To add a new theme: add an entry to THEMES and it will
 * automatically appear in the ThemeSwitcher component.
 */

export interface TemplateTheme {
  id: string;
  name: string;
  /** Short preview description */
  description: string;
  /** Swatch colors shown in the theme picker (primary, secondary, accent) */
  swatches: [string, string, string];
  colors: ThemeColors;
}

export interface ThemeColors {
  /** Darkest color — document title banner, section banners */
  primary: string;
  /** Medium color — table header rows */
  secondary: string;
  /** Accent — underline / highlight stripe */
  accent: string;
  /** Light tint — label column background (odd rows) */
  labelBg: string;
  /** Slightly darker tint — label column background (alt rows) */
  labelBgAlt: string;
  /** Alternating row background */
  rowAlt: string;
  /** Table border color */
  border: string;
  /** Darker border for header cells */
  borderDark: string;
  /** Badge backgrounds & text */
  badgeRedBg: string;
  badgeRedFg: string;
  badgeAmberBg: string;
  badgeAmberFg: string;
  badgeGreenBg: string;
  badgeGreenFg: string;
  badgeBlueBg: string;
  badgeBlueFg: string;
  badgeGrayBg: string;
  badgeGrayFg: string;
  /** Text colors */
  textDark: string;
  textBody: string;
  textMuted: string;
  /** Surface colors */
  white: string;
  /** Footer banner text */
  footerText: string;
}

/* ─────────────────────────── THEME DEFINITIONS ─────────────────────────── */

const executive: TemplateTheme = {
  id: "executive",
  name: "Executive Navy",
  description: "Classic navy & steel blue — boardroom-ready",
  swatches: ["#1B2A4A", "#4472C4", "#ED7D31"],
  colors: {
    primary: "#1B2A4A",
    secondary: "#4472C4",
    accent: "#ED7D31",
    labelBg: "#EAF0F7",
    labelBgAlt: "#D6E4F0",
    rowAlt: "#F2F2F2",
    border: "#B4C6E7",
    borderDark: "#8FAADC",
    badgeRedBg: "#FCE4EC",
    badgeRedFg: "#C00000",
    badgeAmberBg: "#FFF2CC",
    badgeAmberFg: "#BF8F00",
    badgeGreenBg: "#E2EFDA",
    badgeGreenFg: "#548235",
    badgeBlueBg: "#D6E4F0",
    badgeBlueFg: "#2B4066",
    badgeGrayBg: "#F2F2F2",
    badgeGrayFg: "#6B7280",
    textDark: "#1E293B",
    textBody: "#334155",
    textMuted: "#6B7280",
    white: "#FFFFFF",
    footerText: "#F2F2F2",
  },
};

const charcoal: TemplateTheme = {
  id: "charcoal",
  name: "Charcoal & Gold",
  description: "Sophisticated dark gray with gold accents",
  swatches: ["#2D2D2D", "#505050", "#C8A951"],
  colors: {
    primary: "#2D2D2D",
    secondary: "#505050",
    accent: "#C8A951",
    labelBg: "#F5F5F0",
    labelBgAlt: "#EAEAE2",
    rowAlt: "#F7F7F5",
    border: "#C8C8C0",
    borderDark: "#9E9E96",
    badgeRedBg: "#FCE4EC",
    badgeRedFg: "#B71C1C",
    badgeAmberBg: "#FFF8E1",
    badgeAmberFg: "#8D6E00",
    badgeGreenBg: "#E8F5E9",
    badgeGreenFg: "#2E7D32",
    badgeBlueBg: "#E8EAF0",
    badgeBlueFg: "#37474F",
    badgeGrayBg: "#F0F0F0",
    badgeGrayFg: "#757575",
    textDark: "#212121",
    textBody: "#424242",
    textMuted: "#757575",
    white: "#FFFFFF",
    footerText: "#E0E0E0",
  },
};

const forest: TemplateTheme = {
  id: "forest",
  name: "Forest Executive",
  description: "Deep green & warm bronze — earthy & refined",
  swatches: ["#1B3A2A", "#3D7A5F", "#B8860B"],
  colors: {
    primary: "#1B3A2A",
    secondary: "#3D7A5F",
    accent: "#B8860B",
    labelBg: "#EAF4EE",
    labelBgAlt: "#D4E8DC",
    rowAlt: "#F4F7F5",
    border: "#A8C5B4",
    borderDark: "#7BA892",
    badgeRedBg: "#FCE4EC",
    badgeRedFg: "#C62828",
    badgeAmberBg: "#FFF8E1",
    badgeAmberFg: "#8D6E00",
    badgeGreenBg: "#E8F5E9",
    badgeGreenFg: "#1B5E20",
    badgeBlueBg: "#E0F2F1",
    badgeBlueFg: "#1B3A2A",
    badgeGrayBg: "#F0F2F0",
    badgeGrayFg: "#6B7B72",
    textDark: "#1A2E22",
    textBody: "#334D3D",
    textMuted: "#6B7B72",
    white: "#FFFFFF",
    footerText: "#D4E8DC",
  },
};

const slate: TemplateTheme = {
  id: "slate",
  name: "Slate & Cobalt",
  description: "Cool blue-gray with vibrant cobalt highlights",
  swatches: ["#2C3E50", "#2980B9", "#E74C3C"],
  colors: {
    primary: "#2C3E50",
    secondary: "#2980B9",
    accent: "#E74C3C",
    labelBg: "#EBF2F8",
    labelBgAlt: "#D4E6F1",
    rowAlt: "#F4F6F7",
    border: "#AEC6DC",
    borderDark: "#7FB3D3",
    badgeRedBg: "#FDEDEC",
    badgeRedFg: "#C0392B",
    badgeAmberBg: "#FEF9E7",
    badgeAmberFg: "#B7950B",
    badgeGreenBg: "#EAFAF1",
    badgeGreenFg: "#1E8449",
    badgeBlueBg: "#D4E6F1",
    badgeBlueFg: "#1A5276",
    badgeGrayBg: "#F2F3F4",
    badgeGrayFg: "#707B7C",
    textDark: "#1C2833",
    textBody: "#2C3E50",
    textMuted: "#707B7C",
    white: "#FFFFFF",
    footerText: "#D5DBDB",
  },
};

const burgundy: TemplateTheme = {
  id: "burgundy",
  name: "Burgundy & Ivory",
  description: "Rich wine tones with warm ivory — classic prestige",
  swatches: ["#4A1528", "#8B3A62", "#D4A44C"],
  colors: {
    primary: "#4A1528",
    secondary: "#8B3A62",
    accent: "#D4A44C",
    labelBg: "#F8EEF2",
    labelBgAlt: "#F0DCE4",
    rowAlt: "#FAF7F5",
    border: "#D4A8BA",
    borderDark: "#BA7E96",
    badgeRedBg: "#FCE4EC",
    badgeRedFg: "#880E4F",
    badgeAmberBg: "#FFF8E1",
    badgeAmberFg: "#8D6E00",
    badgeGreenBg: "#E8F5E9",
    badgeGreenFg: "#2E7D32",
    badgeBlueBg: "#F3E5F5",
    badgeBlueFg: "#4A1528",
    badgeGrayBg: "#F5F0F2",
    badgeGrayFg: "#7D6B73",
    textDark: "#2E0A18",
    textBody: "#4A2636",
    textMuted: "#7D6B73",
    white: "#FFFFFF",
    footerText: "#F0DCE4",
  },
};

/* ─────────────────────────── EXPORTS ─────────────────────────── */

export const THEMES: TemplateTheme[] = [
  executive,
  charcoal,
  forest,
  slate,
  burgundy,
];

export const DEFAULT_THEME = executive;

/**
 * Build all the inline CSSProperties objects for a given theme.
 * These are consumed directly in JSX `style` attributes to guarantee
 * copy-paste fidelity into OneNote / Word.
 */
export function buildStyles(t: ThemeColors) {
  const font = "'Segoe UI', Calibri, Arial, sans-serif";

  const tbl: React.CSSProperties = {
    width: "100%",
    borderCollapse: "collapse",
    fontFamily: font,
    fontSize: "13px",
    lineHeight: "1.45",
  };

  const thBase: React.CSSProperties = {
    border: `1.5px solid ${t.borderDark}`,
    padding: "9px 12px",
    fontWeight: 700,
    fontSize: "12px",
    letterSpacing: "0.03em",
    textTransform: "uppercase",
    textAlign: "left",
    verticalAlign: "middle",
  };

  const thPrimary: React.CSSProperties = {
    ...thBase,
    backgroundColor: t.primary,
    color: t.white,
  };

  const thSecondary: React.CSSProperties = {
    ...thBase,
    backgroundColor: t.secondary,
    color: t.white,
  };

  const td0: React.CSSProperties = {
    border: `1px solid ${t.border}`,
    padding: "8px 12px",
    verticalAlign: "top",
    color: t.textBody,
  };

  const tdLabel: React.CSSProperties = {
    ...td0,
    fontWeight: 700,
    color: t.primary,
    backgroundColor: t.labelBg,
    width: "30%",
  };

  const tdAlt: React.CSSProperties = {
    ...td0,
    backgroundColor: t.rowAlt,
  };

  const tdLabelAlt: React.CSSProperties = {
    ...tdLabel,
    backgroundColor: t.labelBgAlt,
  };

  const sectionBanner = (color?: string): React.CSSProperties => ({
    backgroundColor: color ?? t.primary,
    color: t.white,
    padding: "10px 16px",
    fontFamily: font,
    fontSize: "15px",
    fontWeight: 800,
    letterSpacing: "0.02em",
    borderBottom: `3px solid ${t.accent}`,
    marginBottom: "0px",
  });

  const badge = (bg: string, fg: string): React.CSSProperties => ({
    display: "inline-block",
    padding: "2px 10px",
    borderRadius: "3px",
    fontSize: "11px",
    fontWeight: 700,
    backgroundColor: bg,
    color: fg,
    letterSpacing: "0.02em",
  });

  const subNote: React.CSSProperties = {
    fontFamily: font,
    fontSize: "11px",
    color: t.textMuted,
    fontStyle: "italic",
    padding: "6px 12px 0",
    margin: 0,
  };

  return {
    font,
    tbl,
    thBase,
    thPrimary,
    thSecondary,
    td0,
    tdLabel,
    tdAlt,
    tdLabelAlt,
    sectionBanner,
    badge,
    subNote,
  };
}
