/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/sections/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    screens: {
      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }
      "3xl": "1600px",
    },
    colors: {
      white: "#fff",
      "white-10": "#FAFAFA",
      "white-50": "#e5e7eb",
      blue: "#1fb6ff",
      purple: "#7e5bef",
      pink: "#ff49db",
      orange: "#ff7849",
      red: "#DC2626",
      green: "#13ce66",
      yellow: "#ffc82c",
      indigo: "#240d80",
      muted: "#27272A",
      "gray-10": "#A1A1AA",
      "gray-50": "rgba(49, 49, 49, 0.6)",
      "gray-100": "#F8F9FA",
      "gray-200": "#E9ECEF",
      "gray-300": "#DEE2E6",
      "gray-400": "#CED4DA",
      "gray-500": "#ADB5BD",
      "gray-600": "#6C757D",
      "gray-700": "#495057",
      "gray-800": "#343A40",
      "gray-900": "#212529",
      "gray-1000": "#494949",
      "orange-100": "#FFB600",
      "orange-200": "#FFAA00",
      "orange-300": "#FF9E00",
      "orange-400": "#FF9100",
      "orange-500": "#FF8500",
      "orange-600": "#FF7900",
      "orange-700": "#FF6D00",
      "orange-800": "#FF6000",
      "orange-900": "#FF5400",
      "gray-light": "#d3dce6",
      "indigo-200": "#240d80",
      "indigo-300": "#560bad",
      "indigo-400": "#480ca8",
      "indigo-500": "#3a0ca3",
      black: "#000000",
      "black-50": "#09090B",
      dark: "#181818",
      light: "#E9ECEF",
    },
    container: {
      padding: {
        DEFAULT: "1rem",
        sm: "2rem",
        lg: "6rem",
        xl: "7rem",
        "2xl": "9rem",
      },
    },
    minHeight: {
      0: "0",
      "1/4": "25%",
      "1/2": "50%",
      "3/4": "75%",
      full: "100%",
    },
    minWidth: {
      "1/2": "50%",
    },
    backgroundSize: {
      auto: "auto",
      cover: "cover",
      contain: "contain",
      "50%": "50%",
      16: "4rem",
    },
    // borderRadius: {
    //   xl: "0.75rem",
    //   lg: "var(--radius)",
    //   md: "calc(var(--radius) - 2px)",
    //   sm: "calc(var(--radius) - 4px)",
    //   full: "9999px",
    // },
  },
};
