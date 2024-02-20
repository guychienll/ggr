/** @type {import('tailwindcss').Config} */
module.exports = {
  corePlugins: {
    // preflight: false, // 如果是 true 會預設帶入一些 normalize 的 css
  },
  content: ['./src/**/*.{ts,tsx}'], // 侷限 tailwind 的範圍，有涵蓋到的範圍才會自動加入 css
  theme: {
    extend: {},
  },
  plugins: [],
};
