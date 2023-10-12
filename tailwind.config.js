/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        'RedHat':['Red Hat Display', 'sans-serif'],
        'RegFont':['Nunito', 'sans-serif']
      }
    },
  },
  plugins: [],
}

