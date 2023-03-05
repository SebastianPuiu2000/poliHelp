/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}", // Note the addition of the `app` directory.
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    { pattern: /.*-(mahogany,mantis)-(400|500|600)/ }
  ],
  theme: {
    colors: {
      'mantis': {
        '50': '#f6faf3',
        '100': '#e9f5e3',
        '200': '#d3eac8',
        '300': '#afd89d',
        '400': '#82bd69',
        '500': '#61a146',
        '600': '#4c8435',
        '700': '#3d692c',
        '800': '#345427',
        '900': '#2b4522',
      },
      'mahogany': {
        '50': '#fdf3f3',
        '100': '#fce4e5',
        '200': '#faced0',
        '300': '#f5acaf',
        '400': '#ed7c81',
        '500': '#e15259',
        '600': '#c43037',
        '700': '#ac292f',
        '800': '#8f252a',
        '900': '#772529',
      },
    },

  },
  plugins: [],
}
