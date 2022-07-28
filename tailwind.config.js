module.exports = {
  mode: "jit",
  content: ["./src/**/*.html", "./src/**/*.{vue,js,jsx,ts,tsx}"],
  darkMode: "media",
  theme: {
    extend: {
      colors: {
        transparent: "transparent",
        current: "currentColor",
        "light-grey": "#E5EEE5",
        purple: "#7652C6",
        gray3: "#858585",
      },
      fontSize: {
        large: "80px",
        middle: "72px",
        medium: "60px",
      },
    },
    screens: {
      hd: '1441px',
      laptop: "1600px",
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
