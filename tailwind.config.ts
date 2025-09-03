import type { Config } from 'tailwindcss';

export default {
  content: ['./app/**/*.{ts,tsx,mdx}', './components/**/*.{ts,tsx}', './pages/**/*.{ts,tsx}'],
  theme: {
    extend: {}
  },
  plugins: []
} satisfies Config;
