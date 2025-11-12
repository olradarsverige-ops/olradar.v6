import type { Config } from "tailwindcss";
export default {content:["./app/**/*.{ts,tsx}","./components/**/*.{ts,tsx}"],
theme:{extend:{colors:{ink:"#0E0F11"},dropShadow:{glow:"0 0 44px rgba(216,162,78,0.25)"} }},plugins:[]} satisfies Config;