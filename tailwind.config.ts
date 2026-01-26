import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Static brand colors (work in v4)
        'brand-yellow': '#FFD700',
        'brand-pink': '#FF4D94',
        'brand-blue': '#3AAFF4',
        'brand-grey': '#3A3A3A',
        
        // Theme-aware colors (reference CSS variables)
        'bg-primary': 'var(--color-bg-primary)',
        'bg-secondary': 'var(--color-bg-secondary)',
        'bg-tertiary': 'var(--color-bg-tertiary)',
        'text-primary': 'var(--color-text-primary)',
        'text-secondary': 'var(--color-text-secondary)',
        'text-tertiary': 'var(--color-text-tertiary)',
        'border-color': 'var(--color-border)',
      },
    },
  },
};

export default config;