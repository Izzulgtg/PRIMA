/** @type {import('tailwindcss').Config} */
export default {

  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {

      colors: {

        prima: {

          background: "#F5F0E8",

          card: "#FFFFFF",

          text: "#1E1E1E",

          muted: "#6B7280",

          green: "#6B8F71",

          teal: "#4A7C8E",

          terracotta: "#C4846A",

          sand: "#EDE8DC",
        },
      },

    },
  },

  plugins: [],
}