/** @type {import('tailwindcss').Config} */
import withMT from "@material-tailwind/react/utils/withMT";

module.exports = withMT({
  content: ["./pages/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#ff4500', // Customize the primary color
        link: "#4fc3f7"
      },
      fontFamily: {
        custom: ['YourCustomFont', 'ariel'], // Add a custom font
      },
    },
  },
  plugins: [],
});
