/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",

],
  theme: {
    extend: {
      colors: {
        customPurple: '#7065EF',
        customBlack: '#0A0A0A',
        customWhite:'#C4C4C4',
        mbg:'#F9FAFB',
        cbg:'#FFFFFF',
        heading:'#1A202C',
        btext:'#4A5568',
        ad:'#718096',img:'#E2E8F0 ',
        authorbg:'#EDF2F7',
        authorn:'#2563EB'
      },
    },
  },
  plugins: [],
}

