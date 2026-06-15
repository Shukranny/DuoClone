/** @type {import('tailwindcss').Config} */
const { linguaColors } = require("./src/theme/colors");
const { fontSize, fontWeight, lineHeight } = require("./src/theme/typography");
const { spacing, borderRadius } = require("./src/theme/spacing");

module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        // Brand colors
        primary: {
          DEFAULT: linguaColors.purple,
          "deep-purple": linguaColors.deepPurple,
          blue: linguaColors.blue,
          green: linguaColors.green,
        },

        // Semantic colors
        success: linguaColors.success,
        warning: linguaColors.warning,
        streak: linguaColors.streak,
        error: linguaColors.error,
        info: linguaColors.info,

        // Neutral colors
        text: {
          primary: linguaColors.textPrimary,
          secondary: linguaColors.textSecondary,
        },
        border: linguaColors.border,
        surface: linguaColors.surface,
        background: linguaColors.background,

        // Aliases for common use
        "lingua-purple": linguaColors.purple,
        "lingua-blue": linguaColors.blue,
        "lingua-green": linguaColors.green,
      },

      fontSize: {
        h1: [
          fontSize.h1,
          {
            lineHeight: lineHeight.tight,
            fontWeight: fontWeight.bold,
          },
        ],
        h2: [
          fontSize.h2,
          {
            lineHeight: lineHeight.snug,
            fontWeight: fontWeight.semibold,
          },
        ],
        h3: [
          fontSize.h3,
          {
            lineHeight: lineHeight.snug,
            fontWeight: fontWeight.semibold,
          },
        ],
        h4: [
          fontSize.h4,
          {
            lineHeight: lineHeight.normal,
            fontWeight: fontWeight.medium,
          },
        ],
        "body-lg": [
          fontSize.bodyLarge,
          {
            lineHeight: lineHeight.relaxed,
            fontWeight: fontWeight.regular,
          },
        ],
        "body-md": [
          fontSize.bodyMedium,
          {
            lineHeight: lineHeight.relaxed,
            fontWeight: fontWeight.regular,
          },
        ],
        "body-sm": [
          fontSize.bodySmall,
          {
            lineHeight: lineHeight.relaxed,
            fontWeight: fontWeight.regular,
          },
        ],
        caption: [
          fontSize.caption,
          {
            lineHeight: lineHeight.normal,
            fontWeight: fontWeight.regular,
          },
        ],
      },

      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },

      fontWeight: {
        regular: fontWeight.regular,
        medium: fontWeight.medium,
        semibold: fontWeight.semibold,
        bold: fontWeight.bold,
      },

      lineHeight: {
        tight: lineHeight.tight,
        snug: lineHeight.snug,
        normal: lineHeight.normal,
        relaxed: lineHeight.relaxed,
      },

      spacing,

      borderRadius,
    },
  },
};
