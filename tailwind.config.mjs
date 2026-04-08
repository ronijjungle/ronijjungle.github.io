// ─────────────────────────────────────────────────────────
// Tailwind Configuration — "Visual Identity System"
//
// Dark monochromatic palette. Space Grotesk typeface.
// Bratus-inspired: generous spacing, large type, content-first.
// ─────────────────────────────────────────────────────────

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          black: "#191919",
          "off-black": "#222222",
          "dark-grey": "#646464",
          "mid-grey": "#A0A0A0",
          "light-grey": "#E6E6E6",
          "paper-grey": "#F2F2F2",
          "off-white": "#FDFDFD",
          "cream": "#F9F6EE",
        },
      },

      fontFamily: {
        sans: ['"Space Grotesk"', "system-ui", "sans-serif"],
      },

      // Bratus-inspired type scale: large, bold, editorial
      fontSize: {
        // Display sizes — hero statements
        "display-hero": ["clamp(3rem, 7vw, 6.5rem)", { lineHeight: "1.0", letterSpacing: "-0.03em", fontWeight: "700" }],
        "display-lg": ["clamp(2.5rem, 5vw, 4.5rem)", { lineHeight: "1.05", letterSpacing: "-0.025em", fontWeight: "700" }],
        "display": ["clamp(2rem, 3.5vw, 3rem)", { lineHeight: "1.1", letterSpacing: "-0.02em", fontWeight: "700" }],
        // Heading sizes
        "heading-lg": ["clamp(1.5rem, 2.5vw, 2rem)", { lineHeight: "1.15", letterSpacing: "-0.015em", fontWeight: "600" }],
        "heading": ["clamp(1.25rem, 2vw, 1.5rem)", { lineHeight: "1.2", letterSpacing: "-0.01em", fontWeight: "600" }],
        // Body — 20px baseline (premium editorial feel)
        "body-xl": ["1.375rem", { lineHeight: "1.65" }],
        "body-lg": ["1.25rem", { lineHeight: "1.65" }],
        "body": ["1.125rem", { lineHeight: "1.7" }],
        // Small / labels
        "caption": ["0.875rem", { lineHeight: "1.5", letterSpacing: "0.02em" }],
        "micro": ["0.75rem", { lineHeight: "1.5", letterSpacing: "0.08em" }],
      },

      // Modular spacing scale (~1.5x ratio, bratus-style)
      spacing: {
        18: "4.5rem",
        22: "5.5rem",
        26: "6.5rem",
        30: "7.5rem",
        36: "9rem",
        40: "10rem",
        48: "12rem",
      },

      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s ease-out forwards",
        "fade-in": "fade-in 0.5s ease-out forwards",
      },
    },
  },
  plugins: [],
};
