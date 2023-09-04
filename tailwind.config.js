/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        blue: {
          'gradient-1': '#4796D3',
          'gradient-2': '#26507D',
        },
        'dark-grey': {
          'gradient-1': '#9C9C9C',
          'gradient-2': '#6A6A6A',
        },
        green: {
          'gradient-1': '#3F8C8C',
          'gradient-2': '#113F40',
        },
        grey: {
          'gradient-1': '#FFFFFF',
          'gradient-2': '#CCCCCC',
        },
        orange: {
          'gradient-1': '#D3BD47',
          'gradient-2': '#7D5026',
        },
        purple: {
          'gradient-1': '#813F8C',
          'gradient-2': '#3F1140',
        },
        red: {
          'gradient-1': '#D34747',
          'gradient-2': '#7D2626',
        },
        yellow: {
          'gradient-1': '#D0D261',
          'gradient-2': '#808218',
        },
      },
      fontFamily: {
        poppins_100: ['Poppins-Thin'],
        poppins_200: ['Poppins-ExtraLight'],
        poppins_300: ['Poppins-Light'],
        poppins_400: ['Poppins-Regular'],
        poppins_500: ['Poppins-Medium'],
        poppins_600: ['Poppins-SemiBold'],
        poppins_700: ['Poppins-Bold'],
        poppins_800: ['Poppins-ExtraBold'],
        poppins_900: ['Poppins-Black'],
      },
    },
  },
  plugins: [],
};
