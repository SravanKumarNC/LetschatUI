// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}", // ✅ Important for Vite + React
    ],
    theme: {
      extend: {},
    },
    plugins: [],
  }