import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      backgroundImage: {
        'banner-bg': "url('/images/bannerBg.jpg')",
        'contact-bg': "url('/images/worldMap.jpg')",
        'navimage-bg': "url('/images/banner.jpg')",
        'hand-bg': "url('/images/hand.png')"
      },
      fontFamily: {
        'montserrat': ['Montserrat', 'sans-serif'],
      },
      colors: {
        customBlue: '#D6F6E7',
        yellow: '#FDFD96',
        pink: '#F8C8DC',
        bleu: '#A7C7E7',
        purple: '#C3B1E1'
      },

    },
  },
  plugins: [],
}
export default config
