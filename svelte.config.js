
import fs from 'fs-extra'
import preprocess from 'svelte-preprocess'
import glob from 'glob-promise'

import autoAdaptor from '@sveltejs/adapter-auto'
import staticAdaptor from '@sveltejs/adapter-static'
import nodeAdaptor from '@sveltejs/adapter-node'
const dev = process.argv.includes('dev');


const adapters = {
	static: staticAdaptor({
		fallback: '/index.html',
		trailingSlash: 'always' 
	}),
	auto: autoAdaptor(),
	node: nodeAdaptor()
}

/** @type {import('@sveltejs/kit').Config} */

export default (await ( async e => {

	/* add aliases for each app */

	let alias = {}

	const apis = (await glob('src/**/api.js'))

	for (const api of apis) {
		const split = api.split('/')
		const name = '$' + split.splice(1,split.length-2).map( str => {
			return str.replaceAll('_','').split('.')[0]
		}).join('_').toLowerCase()
		if (name != '$') alias[name] = api
	}

	const dirs = await fs.readdirSync('src', { withFileTypes: true } )
	for ( const dir of dirs ) {
		let key = dir.name.toLowerCase()
		if (key[0]=='_') key = key.substring(1)
		if (dir.isDirectory()) alias['$'+key] = 'src/'+dir.name+'/api.js'
	}

	alias = {
		...alias,
		'$assets': 'assets',
		'$api': 'src/api.js'
	}

	console.log('ALIASES', alias)
	console.log('=====================')

	return {
		onwarn: () => {
			// disable warning messages
		},
		vitePlugin: {
			hot: false
		},
		kit: {
			alias,
			adapter: adapters.static,
			paths: {
				base: '/hello'
			},
			files: {
			  assets: 'assets',
		      routes: 'src',
		      lib: 'src'
			}
		}
}})())