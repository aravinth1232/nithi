/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
    fontFamily: {
      
      primary:  ["Inter", 'serif'],
    
    },

    colors :{
      
        primary: {
          "50": "#f7fcfd",
          "100": "#ebf7fa",
          "200": "#d6f0f5",
          "300": "#b6e3ec",
          "400": "#6dc7d9",
          "500": "#30a3bb",
          "600": "#237586",
          "700": "#195561",
          "800": "#0f3239",
          "900": "#07191c",
          "950": "#040e10"
        },

    }

    },
  },
  plugins: [],
}

