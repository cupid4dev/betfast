/** @type {import('tailwindcss').Config} */
import withMT from "@material-tailwind/react/utils/withMT";

module.exports = withMT({
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary_light: "#126e51", // Customize the primary color
        primary_4: "color(display-p3 .282 .859 .675)",
        secondary_back: "#282828",
        secondary_3: "#383838",
        secondary_4: "#464646",
        highlight: "#DBC00D",
        link: "#4fc3f7",
      },
      fontFamily: {
        custom: ["YourCustomFont", "ariel"], // Add a custom font
      },
    },
  },
  plugins: [],
});
