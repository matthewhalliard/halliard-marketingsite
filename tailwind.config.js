/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{ts,tsx,js,jsx}",
    "./pages/*.{ts,tsx,js,jsx}",
    "./components/**/*.{ts,tsx,js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "rgb(38,50,133)", // token-99467f17
        secondary: "rgb(26,106,180)", // token-3f9632c2
        background: "rgb(255,255,255)", // token-0610871f
        "background-dark": "rgb(0,28,56)",
        tint: "rgb(211,228,255)", // light brand tint used on home page
        'halliard-blue': '#1F3FFF',
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-fragment)", "monospace"],
        display: ["var(--font-lexend)", "sans-serif"],
      },
      borderRadius: {
        '4xl': '2rem',
      },
      fontSize: {
        '7xl': ['4.5rem', { lineHeight: '1.1' }],
        '8xl': ['6rem', { lineHeight: '1' }],
        '9xl': ['8rem', { lineHeight: '1' }],
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
  ],
}; 