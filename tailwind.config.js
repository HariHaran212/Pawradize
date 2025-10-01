/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#8EBC38",   // Main green
        secondary: "#AFD36B", // Light green
        accent: "#D4E8B0",    // Soft mint
        ivory: "#FBFFF5",// Ivory white
        highlight: "#F0FDD6",  // Pastel green
        'text-dark': '#3A4D39', // Dark Olive for main text
        'text-medium': '#557153',
        'teal': '#58B09C', // <-- Add this for Vet/Health
        'peach': '#F8C8A3', // <-- Add this for Community/Events
        grey: {
          50: "#f9fafb",
          100: "#f3f4f6",
          200: "#e5e7eb",
          300: "#d1d5db",
          400: "#9ca3af",
          500: "#6b7280",
          600: "#4b5563",
          700: "#374151",
          800: "#1f2937",
          900: "#111827",
        }
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
    }
  },
  plugins: [],
}
