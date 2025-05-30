import { nextui } from '@nextui-org/react'
import type { Config } from 'tailwindcss'

const config: Config = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
		'./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		extend: {
			colors: {
				'main-1': '#261C73',
				background: 'var(--background)',
				foreground: 'var(--foreground)',
			},
		},
	},
	darkMode: 'class',
	plugins: [nextui()],
}
export default config
