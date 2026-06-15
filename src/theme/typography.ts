/**
 * Design System - Typography Scale
 * Font family: Poppins (sans-serif)
 * All sizes in pixels with line heights
 */

export const fontFamily = {
  default: "Poppins",
};

export const fontSize = {
  // Headings
  h1: 32,
  h2: 24,
  h3: 20,
  h4: 16,

  // Body text
  bodyLarge: 16,
  bodyMedium: 14,
  bodySmall: 13,

  // Caption
  caption: 11,
};

export const fontWeight = {
  regular: "400",
  medium: "500",
  semibold: "600",
  bold: "700",
};

export const lineHeight = {
  tight: 1.2,
  snug: 1.3,
  normal: 1.4,
  relaxed: 1.6,
};

/**
 * Typography preset objects combining size, weight, and line height
 */
export const typography = {
  h1: {
    fontSize: fontSize.h1,
    fontWeight: fontWeight.bold,
    lineHeight: lineHeight.tight,
    description: "Page / Screen Title",
  },
  h2: {
    fontSize: fontSize.h2,
    fontWeight: fontWeight.semibold,
    lineHeight: lineHeight.snug,
    description: "Section Title",
  },
  h3: {
    fontSize: fontSize.h3,
    fontWeight: fontWeight.semibold,
    lineHeight: lineHeight.snug,
    description: "Card / Module Title",
  },
  h4: {
    fontSize: fontSize.h4,
    fontWeight: fontWeight.medium,
    lineHeight: lineHeight.normal,
    description: "Subheading",
  },
  bodyLarge: {
    fontSize: fontSize.bodyLarge,
    fontWeight: fontWeight.regular,
    lineHeight: lineHeight.relaxed,
    description: "Important content",
  },
  bodyMedium: {
    fontSize: fontSize.bodyMedium,
    fontWeight: fontWeight.regular,
    lineHeight: lineHeight.relaxed,
    description: "Body text",
  },
  bodySmall: {
    fontSize: fontSize.bodySmall,
    fontWeight: fontWeight.regular,
    lineHeight: lineHeight.relaxed,
    description: "Supporting text",
  },
  caption: {
    fontSize: fontSize.caption,
    fontWeight: fontWeight.regular,
    lineHeight: lineHeight.normal,
    description: "Labels, meta text",
  },
};

export default typography;
