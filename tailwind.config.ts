import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'banner-bg': "url('/images/bannerBg.jpg')",
        'contact-bg': "url('/images/worldMap.jpg')",
      },
      fontFamily: {
        'montserrat': ['Montserrat', 'sans-serif'],
      },
      colors: {
        customBlue: 'rgba(1, 111, 160, 0.45)',
      },

    },
  },
  plugins: [],
}
export default config
