/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        white: "#FFFFFF",
        black: "#202224",
        primary: "#FD5454",
        grey: "#202224",
        lightgray: "#F5F6FA",
        borderColor: "#D5D5D",
        smoke: "#FAFBFD",
        darksmoke: "#F9F9FB",
        red: "#EE3F4C",
        gray1: "#F1F4F9",
        brown: "#565656",
        lightbrown: "#464646",
        green: "#00B69B",
        skyblue: "#42A4FF",
        yellow: "#FCBE2D",
        lightred: "#FD5454",
        stone: "#A1A1A1",
        lightgreen: "#60AFBD",
        darkgreen: "#1E6E79",
        stone1: "#828282",
        stone2: "#888383",
        darkstone: "#979797",
        whiteblack: "#A8A8A8",
        blackwhite: "#010101",
        gray2: "#6F6F6F",
        gray3: "#EDF2F7"

      },
      fontFamily: {
        lato: ["Lato", "sans-serif"],
      },
    },
  },
  daisyui: {
    darkTheme: "light"
  },
  plugins: [require("daisyui")],
};
