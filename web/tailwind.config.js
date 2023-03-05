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
    { pattern: /.*-(red|blue|green)-(500|600)/ }
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
      }
    },

  },
  plugins: [],
}
