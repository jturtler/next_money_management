import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    // "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    // "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "teeny-greeny": "#ebf6f5",
        "gainsboro": "#E4EDED",
        "background-color": "#E4EDED",
        "light-sand": "#F4EDE8",
        'soft-coral': "##fff6f5",
        "brutal-blue": "#0049B7",

        'ultra-violet': '#6A0DAD',
        "purple-mountains-majesty": "#8076a3",
        'slate-blue': '#6A5ACD',

        "paradise-pink": "#f44566",
        "deep-pink": "#f25394",
        "hot-pink": "#f476af",
        'soft-pink': '#FFB6C1',

        'sunset-orange': '#FD5E53',
        'deep-coral': "#D96A5B",
        'living-coral': '#FF6F61',
        'light-coral': "#fc7e6e",

        'sunny-yellow': "#F2D86D",
        'gold': '#FFD700',
        'bright-yellow': '#FFD700',
        "yellow-gloves": "#f2d53c",
        "sandstorm": "#f4db71",

        'pale-yellow': '#FFFACD',
        'soft-peach': "#FFD3B4",
        'muted-salmon': "#FFAD91",
        "grandpa-orange": "#ffb766",

        'warm-gray': '#A9A9A9',

        'dark-teal': '#008080',
        "teal-green": "#2A9D8F",
        'tiffany-blue': '#23aaa6',
        "blue-greeny": "#5cbdb9",
        "hightlight-green": "#59ce8f",
        'mint-green': '#98FF98',
        "bright-lime-green": "#89fa19",
        
        'sky-blue': '#87CEEB',
        "blue-navy": "#1d3a82",
        
        "dark-slate": "#1A2A2A"
      },
    },
  },
  plugins: [],
};
export default config;
