import { sveltekit } from '@sveltejs/kit/vite'
import glsl from 'vite-plugin-glsl'
import svgLoader from 'vite-svg-loader'
import svg from '@poppanator/sveltekit-svg'
import topLevelAwait from "vite-plugin-top-level-await";



const config = {
	server: {
		port: 3001,
		strictPort: true,
		middlewareMode: false
	},
	preview: {
		port: 3001,
		strictPort: true
	},
	plugins: [
		// topLevelAwait(),
		sveltekit({
			onwarn: () => {}
		}),
		glsl(),
		svg()
	],
	ssr: {
	},
	optimizeDeps: {
		exclude: [
			'@svuick/monaco',
			'monaco-editor'
		]
	},
	build: {
		chunkSizeWarningLimit: 3000,
		exclude: [
			'/synth'
		]
	}
}

process.env.DEBUG = 1
export default config


