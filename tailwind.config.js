/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        black: "#000000",
        white: "#FFFFFF",
        gray: "#F5F5F5",
        red: "#DB4444",
        lightRed: "#FFCCCB",
        green: "#00FF66",
        yellow: "#EEFF61",
        borderColor: "#B3B3B3",
      },
    },
  },
  plugins: [],
};
