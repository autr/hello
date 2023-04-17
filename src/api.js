
/* ====================================== */
/*                                        */
/*                  API                   */
/*                                        */
/* ====================================== */

import { browser } from '$app/environment'
import { page } from '$app/stores'
import { get } from 'svelte/store'
const SAY = CreateLogger(import.meta.url)

/* ============= INDENT CODE ============= */

export function IndentCode( code ) {

	const lines = code.split('\n').map( line => line.replaceAll('\t','').trim() )
	let indent = 0
	code = ''
	for (const line of lines) {
		if (line != '') {
			const open = line.includes('{')
			const close = line.includes('}')
			const both = open && close
			if (close) indent -= 1
			code += `${new Array(Math.max(0,indent)).fill('\t').join('')}${line}\n`
			if (open) indent += 1
		}
	}
	return code
}

/* ============= DEBOUNCER & LOCALSAVE ============= */

export function CreateLocalStorage( key, ms ) {
	const p = get(page)
	const defaultKey = p?.url?.pathname + ':localstorage'
	if (key == undefined) key = defaultKey
	key = key.replace('{page}', defaultKey)
	if (ms == undefined) ms = 200
	SAY(`🗄️ init: ${key}, ${ms}ms`)
	let isLoaded = false

	// ------------------ SAVE ------------------

	const save = CreateDebouncer( data => {
		if (browser) {
			const str = JSON.stringify(data)
			window.localStorage.setItem( key, str )
			SAY(`🗄️ 🪲 saved: ${key}`)
		}
	}, ms)

	// ------------------ LOAD ------------------

	function load(data, quiet) {
		isLoaded = true
		try {
			if (!browser) throw { message: 'SSR' }
			const json = JSON.parse(window.localStorage.getItem(key))
			if (json == null || json == undefined) throw { message: 'empty'}
			if (!quiet) SAY(`🗄️ 🍀 loaded: ${key}`)
			return json
		} catch(err) {
			if (!quiet) SAY(`🗄️ 🚨 loaded: ${key},`, err.message)
			return data
		}
	}

	// ------------------ CLEAR ------------------

	function clear() {
		if (!browser) return
		SAY(`🗄️ 🔺 cleared: ${key}`)
		window.localStorage.removeItem(key)
	}

	// ------------------ MERGE ------------------

	const merge = CreateDebouncer( data => {
		if (!browser) return
		try {
			if (!isLoaded) throw {message: `wait for load.`}
			const existing = load( null, true )
			const str = JSON.stringify({ ...existing, ...data})
			window.localStorage.setItem( key, str )
			SAY(`🗄️ 🦠 merged: ${key}`)
		} catch(err) {
			SAY(`🗄️ 🚨 merge: ${key},`, err.message)
		}
	}, ms)

	return { save, load, clear, merge }
}

export function CreateDebouncer( method, ms ) {
	let timeout
	return async args => {
		if (timeout) clearTimeout( timeout )
		timeout = setTimeout( e => method( args ), ms )
	}
}
/* ============= INDEXES, GRIDS, ARRAYS ============= */

// SHUFFLE ARRAY

export function ShuffleArray(arr) {
	for (let i = arr.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[arr[i], arr[j]] = [arr[j], arr[i]];
	}
  return arr;
}

// LOOP THROUGH GRID

export function LoopWidthHeight( width, height, callback ) {

	let index = 0
	for (let y = 0; y < height; y++) {
		for (let x = 0; x < width; x++) {
			callback({x,y, index})
			index += 1
		}
	}
}

// INDEX TO POSITION

export function IndexToPosition( index, width, height ) {
	const x = index % width
	const y = Math.floor(index / width)
	return { x, y }
}

// POSITION TO INDEX

export function PositionToIndex(x, y, width, height) {
	return y * width + x;
}

// ARRAY TO GRID

export function ArrayToGrid(array, width, height) {
	const grid = []
	for (let y = 0; y < height; y++) {
		const row = []
		for (let x = 0; x < width; x++) {
			const index = y * width + x
			row.push(array?.[index])
		}
		grid.push(row)
	}
	return grid
}


/* ============= CLAMP RANGES ============= */

export function ClampRange(input, outmins_, outmaxs_) {

	const inputIsArray = Array.isArray(input)
	input = inputIsArray ? input : [input]

	outmins_ = (Array.isArray(outmins_) ? outmins_ : [outmins_])
	outmaxs_ = (Array.isArray(outmaxs_) ? outmaxs_ : [outmaxs_])

	const output = []

	let l_outmin, l_outmax

	for (let i = 0; i < input.length; i++) {

		const outmin = outmins_?.[i] !== undefined ? outmins_?.[i] : l_outmin
		const outmax = outmaxs_?.[i] !== undefined ? outmaxs_?.[i] : l_outmax
		let out = input[i]
		out = Math.min(Math.max(out, outmin), outmax)
		output.push(out)

		l_outmin = outmin
		l_outmax = outmax
	}
	return !inputIsArray ? output[0] : output
}


/* ============= MERGE ARRAY ============= */

// ie. subtract items etc

export function ArrayBlend( input, operate, cb ) {

	const inputIsArray = Array.isArray(input)
	input = inputIsArray ? input : [input]

	operate = (Array.isArray(operate) ? operate : [operate])
	const output = []

	let l_oper

	for (let i = 0; i < input.length; i++) {

		const oper = operate?.[i] !== undefined ? operate?.[i] : l_oper
		let out = cb( input[i], oper )
		output.push(out)
		l_oper = oper
	}
	return !inputIsArray ? output[0] : output
}

/* ============= MAP RANGES ============= */

// maps either arrays or numbers freely

export function MapRange(input, inmins_, inmaxs_, outmins_, outmaxs_, clamp, exponent) {
	const inputIsArray = Array.isArray(input)
	input = inputIsArray ? input : [input]

	inmins_ = (Array.isArray(inmins_) ? inmins_ : [inmins_])
	inmaxs_ = (Array.isArray(inmaxs_) ? inmaxs_ : [inmaxs_])
	outmins_ = (Array.isArray(outmins_) ? outmins_ : [outmins_])
	outmaxs_ = (Array.isArray(outmaxs_) ? outmaxs_ : [outmaxs_])

	clamp = clamp !== undefined ? clamp : false
	exponent = exponent !== undefined ? exponent : 1

	const output = []

	let l_inmin, l_inmax, l_outmin, l_outmax

	for (let i = 0; i < input.length; i++) {

		const inmin = inmins_?.[i] !== undefined ? inmins_?.[i] : l_inmin
		const inmax = inmaxs_?.[i] !== undefined ? inmaxs_?.[i] : l_inmax
		const outmin = outmins_?.[i] !== undefined ? outmins_?.[i] : l_outmin
		const outmax = outmaxs_?.[i] !== undefined ? outmaxs_?.[i] : l_outmax

		let norm = (input[i] - inmin) / (inmax - inmin)
		norm = Math.pow(norm, exponent)
		let out = norm * (outmax - outmin) + outmin
		if (clamp) out = Math.min(Math.max(out, outmin), outmax)
		output.push(out)

		l_inmin = inmin
		l_inmax = inmax
		l_outmin = outmin
		l_outmax = outmax
	}
	return !inputIsArray ? output[0] : output
}


/* ============= UPPCASE KEYS ============= */

export function UppercaseObjectKeys(obj, recursive) {
	if (typeof obj !== 'object' || obj === null) return obj;
	if (Array.isArray(obj)) {
		return obj.map(element => UppercaseObjectKeys(element, recursive));
	}
	const newObj = {};
	for (const key in obj) {
		if (Object.hasOwnProperty.call(obj, key)) {
			newObj[key.toUpperCase()] = recursive ? UppercaseObjectKeys(obj[key], true) : obj[key];
		}
	}
	
	return newObj;
}
/* ============= LOGGER ============= */

export function CreateLogger( url ) {
	const capitalise = arr => arr.map( str => {
		return str.charAt(0).toUpperCase() + str.slice(1)
	})
	const name = url.split('/').reverse().slice(0,2).map( str => {
		if (str.charAt(0) == '_' || str.charAt(0) == '$') str = str.substring(1)
		let split = str.split('.')
		split = split.slice(0,Math.max(split.length-1,1))
		return capitalise( split ).join('')

	}).reverse().join(':')
	return (...a) => {
		const trace = a.find( s => typeof s == 'string' ? s.includes('trace') : false )
		console.log(`[${name}]`, ...a.filter(s=>s!=trace))
		if (trace) GetStackTrace( `[${name}] 🔍 trace` )
	}
}

/* ============= STRING SIZE IN KB ============= */

export function StringFileSize(str) {
  const bytes = new Blob([str]).size;
  const kilobytes = bytes / 1024;
  return Math.round(kilobytes) + 'KB';
}

/* ============= GET ORIGIN ============= */

export function GetStackTrace( name ) {
	if (console && console.trace) {
		console.groupCollapsed(name)
		console.trace()
		console.groupEnd()
	}
}

/* ============= JAVASCRIPT GLOB IMPORT ============= */

export async function JavascriptGlobImport( globImport, processed  ) {
	if (!processed) processed = {}
	for (const [path, promise] of Object.entries(globImport)) {
		const filename = path.split('/').reverse()[0]
		const split = filename.split('.')
		const name = split[split.length-2]
		const object = await promise()
		processed[name] = object.default
	}
	SAY(`✨ imported: ${Object.keys(processed).join(', ')}`)
	return processed
}

/* ============= JAVASCRIPT GLOB IMPORT ============= */

export async function SvelteGlobImport( globImport, processed  ) {
	if (!processed) processed = {}
	for (const [path, promise] of Object.entries(globImport)) {
		const filename = path.split('/').reverse()[0]
		const split = filename.split('.')
		const name = split[split.length-2]
		const object = await promise()
		processed[name] = object.default
	}
	SAY(`✨ imported: ${Object.keys(processed).join(', ')}`)
	return processed
}

/* ============= SLUGIFY ============= */

export function Slugify (str) {
	str = str.replace(/^\s+|\s+$/g, ''); // trim
	str = str.toLowerCase()
  
	// remove accents, swap ñ for n, etc
	var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;"
	var to   = "aaaaeeeeiiiioooouuuunc------"
	for (var i=0, l=from.length ; i<l ; i++) {
		str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i))
	}

	str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
		.replace(/\s+/g, '-') // collapse whitespace and replace by -
		.replace(/-+/g, '-'); // collapse dashes

	return str;
}

/* ============= VAR TO PIX ============= */

export function GetComputedVariableAsPx( el, key, override ) {
	const variable = el ? window.getComputedStyle( el ).getPropertyValue( key ) : '0px'
	const ref = override || el
	let px = CalculatePixels( variable, ref, override )
	px = parseFloat(px) || 0
	return parseFloat(px)
}

/* ============= CALC PIX ============= */

export function CalculatePixels( str, el, override ) {
	try {


		const reg = /\(([^)]+)\)/
		let value = parseFloat( str )
		if (!value) {
			str = getComputedStyle(document.documentElement).getPropertyValue( reg.exec(str)?.[1] )
			value = parseFloat( str )
		}
		const bounds = override ? override : (el?.parentElement ? el.parentElement.getBoundingClientRect() : {})
		const unit = str.replace(value, '').toLowerCase().trim()
		const { innerWidth, innerHeight } = window
		const run = {
			['%']: () => ((Math.min(bounds?.width||0,bounds?.height||0) * (value/100))),
			px: () => value,
			vw: () => (innerWidth * (value/100)),
			vh: () => (innerHeight * (value/100)),
			vmax: () => (Math.max(innerWidth,innerHeight) * (value/100)),
			vmin: () => (Math.min(innerWidth,innerHeight) * (value/100)),
			em: () => (parseFloat(getComputedStyle(el?.parentElement || document.body).fontSize) * value),
			rem: () => (parseFloat(getComputedStyle(document.body).fontSize) * value),
			['']: () => value
		}

		const out = run[unit]()
		return out
	} catch(err) {
		SAY(`❌ could not parse ${str}:`, err.message)
		return 0
	}
} 

/* ============= NON-SCALING STROKE ============= */

export function SetNonScalingStroke( outerEl ) {

	if (outerEl) {
		for (const el of outerEl.querySelectorAll('svg *') || []) {
			el.setAttribute('vector-effect','non-scaling-stroke')
		}
	}
}