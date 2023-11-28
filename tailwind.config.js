/** @type {import('tailwindcss').Config} */
import withMT from "@material-tailwind/react/utils/withMT";

module.exports = withMT({
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2196F380", // Customize the primary color
        link: "#4fc3f7",
      },
      fontFamily: {
        custom: ["YourCustomFont", "ariel"], // Add a custom font
      },
    },
  },
  plugins: [],
});
