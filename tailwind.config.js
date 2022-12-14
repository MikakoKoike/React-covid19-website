/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      sans: [
        "Helvetica Neue",
        "Arial",
        "Hiragino Kaku Gothic ProN",
        "Hiragino Sans",
        "Meiryo",
        "sans-serif",
      ],
    },
    extend: {},
  },
  plugins: [
    // tailwindcss("./tailwind.config.js"),
    // autoprefixer({
    //   add: true,
    //   grid: true
    // }),
  ],
};
