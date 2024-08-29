/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        spartan: ["League Spartan", "sans-serif"],
        canada: ["Radio Canada Big", "sans-serif"],
      },
      animation: {
        scroll: "animate 2s infinite",
      },
      keyframes: {
        animate: {
          "0%": {
            opacity: 0,
            transform: "rotate(45deg) translate(-20px,-20px)",
          },
          "50%": { opacity: 1 },
          "100%": {
            opacity: 0,
            transform: "rotate(45deg) translate(20px,20px)",
          },
        },
      },
    },
    screens: {
      iphone: "376px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
    },
  },
  plugins: [],
  darkMode: "class",
};
