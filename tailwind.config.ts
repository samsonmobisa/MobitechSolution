module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: { 50: '#eef6ff', 500: '#2563eb', 600: '#1d4ed8', 700: '#1e40af' },
        accent: '#f59e0b',
        slate: { 950: '#020817' }
      },
      boxShadow: {
        soft: '0 20px 45px rgba(15, 23, 42, 0.12)'
      }
    }
  },
  plugins: []
};
