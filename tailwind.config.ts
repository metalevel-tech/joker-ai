/* eslint-disable @typescript-eslint/no-require-imports */
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			screens: {
				"6xs": "320px",
				"5xs": "360px",
				"4xs": "380px",
				"3xs": "420px",
				"2xs": "480px",
				xs: "520px", // extra small
				xa: "580px", // extra small average
				sm: "640px",
				sb: "680px",
				sa: "720px", // small average
				md: "768px",
				mp: "780px",
				ma: "820px",
				mb: "840px",
				mc: "880px",
				mm: "905px",
				ml: "920px",
				lg: "1024px",
				xl: "1280px",
				"1xl": "1366px",
				"2xl": "1536px",
				"3xl": "1720px",
			},
			colors: {
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				scrollbar: {
					track: "hsl(var(--scrollbar-track))",
					thumb: "hsl(var(--scrollbar-thumb))",
				},
				scrollbarTrack: {
					DEFAULT: "hsl(var(--scrollbar-track))",
				},
				scrollbarThumb: {
					DEFAULT: "hsl(var(--scrollbar-thumb))",
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				chart: {
					'1': 'hsl(var(--chart-1))',
					'2': 'hsl(var(--chart-2))',
					'3': 'hsl(var(--chart-3))',
					'4': 'hsl(var(--chart-4))',
					'5': 'hsl(var(--chart-5))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
				scrollbarThumb: "var(--scrollbar-thumb-radius)",
			},
			spacing: {
				"90": "22.5rem",
				"91": "22.75rem",
				"92": "23rem",
				"93": "23.25rem",
				"94": "23.5rem",
				"95": "23.75rem",
				"128": "32rem",
				scrollbarWidth: "var(--scrollbar-width)",
				scrollbarHeight: "var(--scrollbar-height)",
			},
			typography: {
				DEFAULT: {
					css: {
						p: {
							marginTop: "0.2rem",
							marginBottom: "0.2rem"
						},
						pre: {
							overflow: "auto"
						}
					}
				}
			}
		}
	},
	plugins: [
		require('@tailwindcss/typography'),
		require("tailwindcss-animate")
	],
} satisfies Config;
