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
      blue: "#1fb6ff",
      purple: "#7e5bef",
      pink: "#ff49db",
      orange: "#ff7849",
      green: "#13ce66",
      yellow: "#ffc82c",
      indigo: "#240d80",
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
      dark: "#181818",
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
    fontSize: {
      sm: ["14px", "20px"],
      base: ["16px", "24px"],
      lg: ["18px", "28px"],
      xl: ["20px", "28px"],
      "2xl": ["24px", "32px"],
      "3xl": ["30px", "36px"],
      "4xl": ["36px", "40px"],
      "5xl": ["48px", "1"],
      "6xl": ["60px", "1"],
      "7xl": ["72px", "1"],
      "8xl": ["96px", "1"],
      "9xl": ["128px", "1"],
    },
    backgroundSize: {
      auto: "auto",
      cover: "cover",
      contain: "contain",
      "50%": "50%",
      16: "4rem",
    },
    fontWeight: {
      thin: "50",
      hairline: "100",
      extralight: "200",
      light: "300",
      normal: "400",
      medium: "500",
      semibold: "600",
      bold: "700",
      extrabold: "800",
      black: "900",
    },
    boxShadow: {
      sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
      shadow: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
      md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
      lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
      xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
      "3xl": "0 35px 60px -15px rgba(0, 0, 0, 0.3)",
    },
  },
};
