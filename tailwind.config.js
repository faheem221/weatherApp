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
        'RegFont':['Nunito', 'sans-serif'],
        'satoshi':['Satoshi', 'sans-serif'],
        'clashDisplay':['Clash Display', 'sans-serif'],
        'generalSans':['General Sans', 'sans-serif'],
      },
    },
    screens: {
      'iphone': '350px',
      'android': '450px',
      'tablet': '650px',
      'ipadTablet': '750px',
      'desktop': '1336px',
    }
  },
  plugins: [],
}

