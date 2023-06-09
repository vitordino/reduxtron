/** @type {import('tailwindcss').Config} */
module.exports = {
	// mode: "jit",
	content: ['./src/renderer/**/*.{html,js,jsx,ts,tsx}'],
	darkMode: 'media',
	theme: {
		screens: {
			sm: '640px',
			md: '768px',
			lg: '1024px',
			xl: '1280px',
		},
		// radix colors handled by windy-radix-palette
		colors: {},
		fontFamily: {
			sans: [
				'Inter',
				'SF\\ Pro\\ Display',
				'-apple-system',
				'BlinkMacSystemFont',
				'Segoe\\ UI',
				'Roboto',
				'Oxygen',
				'Ubuntu',
				'Cantarell',
				'Open\\ Sans',
				'Helvetica\\ Neue',
				'sans-serif',
			],
		},
		borderWidth: {
			DEFAULT: '1px',
			0: '0',
			2: '2px',
			3: '3px',
			4: '4px',
			6: '6px',
			8: '8px',
		},
		extend: {
			boxShadow: {
				modal: 'rgb(0 0 0 / 9%) 0px 3px 12px',
				'large-modal': 'rgb(0 0 0 / 50%) 0px 16px 70px',
			},
			spacing: {
				2.5: '10px',
				4.5: '18px',
				3.5: '14px',
				34: '136px',

				70: '280px',
				140: '560px',
				100: '400px',
				175: '700px',
				53: '212px',
				90: '360px',
			},
			fontSize: {
				xxs: '0.5rem',
				xs: '0.75rem', // 12px
				sm: '0.8125rem', // 13px
				md: '0.9357rem', //15px
				14: '0.875rem',
				base: '1.0rem', // 16px
			},
			zIndex: {
				100: 100,
			},
			keyframes: {
				slideDownAndFade: {
					from: { opacity: 0, transform: 'translateY(-2px)' },
					to: { opacity: 1, transform: 'translateY(0)' },
				},
				slideLeftAndFade: {
					from: { opacity: 0, transform: 'translateX(2px)' },
					to: { opacity: 1, transform: 'translateX(0)' },
				},
				slideUpAndFade: {
					from: { opacity: 0, transform: 'translateY(2px)' },
					to: { opacity: 1, transform: 'translateY(0)' },
				},
				slideRightAndFade: {
					from: { opacity: 0, transform: 'translateX(-2px)' },
					to: { opacity: 1, transform: 'translateX(0)' },
				},
			},
			animation: {
				slideDownAndFade: 'slideDownAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
				slideLeftAndFade: 'slideLeftAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
				slideUpAndFade: 'slideUpAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
				slideRightAndFade: 'slideRightAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
			},
		},
	},
	variants: {
		extend: {
			backgroundColor: ['checked'],
			borderColor: ['checked'],
		},
	},
	plugins: [
		require('windy-radix-palette/packages/palette'),
		require('@tailwindcss/forms')({ strategy: 'class' }),
	],
}
