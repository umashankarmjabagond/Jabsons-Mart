/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        coral: {
          50: "#fef7f4",
          100: "#fdeee8",
          300: "#f6bda5",
          500: "#ff9a8a",
          600: "#e8745e",
          800: "#b0442e",
          900: "#903a29",
          1000: "#714242",
          1050: "#D68E79",
          200: "#F3A792",
          400: "#E49078",
          700: "#D68E79",
        },
        gray: {
          50: "#f9f9f9",
          100: "#B8B8D2",
          200: "#E2E2E2",
          300: "#BDBDBD",
          400: "#A5A5A5",
          500: "#858597",
          600: "#737373",
          700: "#525252",
          800: "#777777",
          900: "#0000008A",
        },

        black: "#000000",
        white: "#ffffff",
        red_custom: {
          400: "#F7A9A0",
          500: "#FF8173",
          600: "#ef4444",
          700: "#A66262",
        },
        light_gray: {
          100: "#989898",
          200: "#777777",
          300: "#d1d5db",
          400: "#D8D8D8",
          500: "#9ca3af",
        },
        cyan: {
          900: "#D0E9E9",
        },
        light_salmon: {
          800: "#FFA78E",
          900: "#F1B2A0",
        },
        gray_custom: {
          100: "#F2F2F2",
          200: "#D9D9D9",
          300: "#BFBFBF",
          400: "#A6A6A6",
          500: "#8C8C8C",
          600: "#737373",
          700: "#6C6C6C",
          800: "#404040",
          900: "#262626",
          100: "#F2F2F2",
          200: "#F7F7F9",
          300: "#BFBFBF",
          400: "#A6A6A6",
          500: "#8C8C8C",
          600: "#737373",
          700: "#6C6C6C",
          800: "#404040",
          900: "#262626",
        },
        mirage: {
          100: "#171725",
        },
      },
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Oxygen",
          "Ubuntu",
          "sans-serif",
        ],
        poppins: ["Poppins", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"],
      },
      boxShadow: {
        customBlue: "0px 4.58px 91.52px 0px rgba(167, 174, 193, 0.35)",
        customCard: "0px 4.58px 91.52px 0px rgba(167, 174, 193, 0.35)",
      },
      spacing: {
        18: "4.5rem",
        88: "22rem",
      },
      screens: {
        xs: "475px",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.5s ease-out",
        "scale-in": "scaleIn 0.3s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        scaleIn: {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};
