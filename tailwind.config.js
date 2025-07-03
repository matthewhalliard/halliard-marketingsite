/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{ts,tsx}",
    "./pages/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "rgb(38,50,133)", // token-99467f17
        secondary: "rgb(26,106,180)", // token-3f9632c2
        background: "rgb(255,255,255)", // token-0610871f
        "background-dark": "rgb(0,28,56)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-fragment)", "monospace"],
      },
    },
  },
  plugins: [],
}; 