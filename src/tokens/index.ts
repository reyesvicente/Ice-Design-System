/**
 * Design tokens exported for use in stories, docs, and any non-Tailwind context.
 * These mirror `tailwind.config.js` exactly. Keep them in sync.
 */

export const colors = {
  "neo-yellow": "#FFDE59",
  "neo-blue": "#5CE1E6",
  "neo-pink": "#FF66C4",
  "neo-green": "#7ED957",
  "neo-purple": "#C678DD",
  "neo-black": "#0F0F0F",
  "neo-offwhite": "#FFFDF5",
  "neo-red": "#EF4444",
  "neo-amber": "#F59E0B",
} as const;

export const brandColors = [
  { token: "neo-yellow", hex: "#FFDE59", role: "Primary CTA, active, critical emphasis" },
  { token: "neo-green", hex: "#7ED957", role: "Secondary action, success, shipped" },
  { token: "neo-pink", hex: "#FF66C4", role: "Accent, featured, new markers" },
  { token: "neo-blue", hex: "#5CE1E6", role: "Info, calm surfaces, technical accent" },
  { token: "neo-purple", hex: "#C678DD", role: "Premium, rare use, special features" },
  { token: "neo-black", hex: "#0F0F0F", role: "All text, all borders, structural blocks" },
  { token: "neo-offwhite", hex: "#FFFDF5", role: "Default background, text on dark" },
] as const;

export const semanticColors = [
  { token: "neo-green", hex: "#7ED957", intent: "success" },
  { token: "neo-blue", hex: "#5CE1E6", intent: "info" },
  { token: "neo-amber", hex: "#F59E0B", intent: "warning" },
  { token: "neo-red", hex: "#EF4444", intent: "error" },
] as const;

export const shadows = [
  { token: "shadow-brutal-sm", value: "3px 3px 0 0 #0F0F0F", use: "Dense UI, tables, small cards" },
  { token: "shadow-brutal", value: "4px 4px 0 0 #0F0F0F", use: "Buttons, inputs" },
  { token: "shadow-brutal-md", value: "6px 6px 0 0 #0F0F0F", use: "Default cards" },
  { token: "shadow-brutal-lg", value: "10px 10px 0 0 #0F0F0F", use: "Hero cards, featured sections" },
  { token: "shadow-brutal-xl", value: "14px 14px 0 0 #0F0F0F", use: "Rare, maximum impact" },
] as const;

export const typeScale = [
  { token: "display", size: "5.5rem / 88px", use: "Landing hero only" },
  { token: "h1", size: "3.75rem / 60px", use: "Page titles" },
  { token: "h2", size: "2.75rem / 44px", use: "Section headers" },
  { token: "h3", size: "2rem / 32px", use: "Subsections" },
  { token: "h4", size: "1.5rem / 24px", use: "Card titles" },
  { token: "h5", size: "1.25rem / 20px", use: "Small headers" },
  { token: "h6", size: "1rem / 16px", use: "Uppercase eyebrow" },
  { token: "body-lg", size: "1.125rem / 18px", use: "Lead paragraphs" },
  { token: "body", size: "1rem / 16px", use: "Default" },
  { token: "body-sm", size: "0.875rem / 14px", use: "Captions, meta" },
  { token: "micro", size: "0.75rem / 12px", use: "Uppercase labels, badges" },
] as const;
