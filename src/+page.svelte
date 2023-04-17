<script>
	import { onMount } from 'svelte'
	import CODES from './ascii/defs.js'
	import { CreateLogger } from '$api'
	const SAY = CreateLogger(import.meta.url)

	const fonts = ['_04B03B.ttf', 'andina.ttf', 'peepo.ttf', 'quinny.ttf', 'rse.ttf', 'tandy.otf', 'thintel.ttf']
	const sizes = [ 8, 10, 0, 10, 16, 13, 16 ]
	let input = 'Hello!'
	let canvas = null
	let fontNames = []
	let index = 4
	$: current = fontNames[index]
	$: size = sizes[index]
	$: code = CODES[codeIndex]

	onMount( loadFonts )

	async function loadFonts() {
		for (let font of fonts) {
			const name = font.split('.')?.[0]
			const url = `/hello/pxfonts/${font}`

			try {
				const response = await fetch(url)
				const buffer = await response.arrayBuffer()
				const fontFace = new FontFace(name, buffer)
				document.fonts.add(fontFace)
				fontNames = [...fontNames, name]
				await fontFace.load()
				SAY('✅', name, 'Font loaded successfully', url)
			} catch (err) {
				SAY('❌', name, err.message, url)
			}
		}
		draw()
	}

	function draw( ) {
		if (!canvas) return

		const ctx = canvas.getContext('2d')

		const linesTotal = input.split('\n').length
		const height = linesTotal * size

		ctx.letterSpacing = 1
		ctx.font = `${size}px ${current}`

		const { width, fontBoundingBoxAscent, fontBoundingBoxDescent } = ctx.measureText(input.split('\n').sort( (a,b) => {
			return  b.length - a.length
		})?.[0])

		canvas.width = width + 3
		canvas.height = height + 2


		const x = Math.floor(canvas.width / 2) - Math.floor(ctx.measureText(input).width / 2);
		const y = Math.floor(canvas.height / 2) + Math.floor(size / 2)

		canvas.style.imageRendering = 'pixelated'
		ctx.imageSmoothingEnabled = false
		ctx.font = `${size}px ${current}`
		ctx.letterSpacing = 100

		input.split('\n').forEach( (line, i) => {
			ctx.fillText(line, 2, (size * (i + 1)) )
		})

		// console.log({width, height, linesTotal, size, bitmap})
		text = ''
		// window.requestAnimationFrame( writeForwardslash )
		window.requestAnimationFrame( writeBackslash )

	}

	let text = ''
	let bitmap

	function getPixel(x,y) {
		return bitmap.data[((y * bitmap.width + x) * 4)+3]
	}
	function isPixel(x,y) {
		return (bitmap.data[((y * bitmap.width + x) * 4)+3]) > 255/2
	}

	function writeBasic() {
		if (input == '') return
		const ctx = canvas.getContext('2d')
		bitmap = ctx.getImageData(0, 0, canvas.width, canvas.height)
		text = ''

		for (let y = 0; y < bitmap.height; y++) {
			for (let x = 0; x < bitmap.width; x++) {
				if (isPixel(x,y)) {
					text += 'x'
				} else {
					text += ' '
				}
			}
			text += '\n'
		}
	}

	/*
		/\\---/\\    
		\/\\--\/\\   
		-\/\\\\\\\\  
		--\/\\////\\ 
		---\/\\--\/\\
		----\//---\//
	*/

	const X_ = '\\'
	const _X = '/'
	const __ = '-'

	function writeBackslash() {
		if (input == '') return
		const ctx = canvas.getContext('2d')
		bitmap = ctx.getImageData(0, 0, canvas.width, canvas.height)

		for (let y = 0; y < bitmap.height + 1; y++) {

			for (let i = 0; i < y; i++) text += ' '

			for (let x = 0; x < bitmap.width; x++) {
				let c1, c2, c3
				if (isPixel(x,y)) {
					c1 = X_
					c2 = code
					c3 = X_
				} else {
					c1 = __
					c2 = code ? __ : ''
					c3 = __
					if (isPixel(x+1,y-1)) {
						c3 = _X || '?'
					}
					if (isPixel(x+1,y)) {
						c3 = _X || '!'
					}
					if (isPixel(x,y-1)) {
						c1 = _X || '|'
					}
					if (isPixel(x+1,y-1) && !isPixel(x,y-1)) {
						c1 = X_
					} 
				}

				text += c1 + c2 + c3
			}
			text += '\n'
		}
	}

	function writeForwardslash() {
		if (input == '') return
		const ctx = canvas.getContext('2d')
		bitmap = ctx.getImageData(0, 0, canvas.width, canvas.height)

		for (let y = 0; y < bitmap.height + 1; y++) {

			for (let i = 0; i < bitmap.height - y; i++) text += ' '

			for (let x = 0; x < bitmap.width; x++) {
				let c1, c2, c3
				if (isPixel(x,y)) {
					c2 = ' ' // ignore

					c1 = _X
					c3 = _X
				} else {
					c2 = __ // ignore

					c1 = __
					c3 = __
					if (isPixel(x-1,y-1)) {
						c1 = X_ || '?'
					}
					if (isPixel(x-1,y)) {
						c1 = X_ || '!'
					}
					if (isPixel(x,y-1)) {
						c3 = X_ || '|'
					}
					if (isPixel(x-1,y-1) && !isPixel(x,y-1)) {
						c3 = _X
					} 
				}

				c2 = ''
				text += c1 + c2 + c3
			}
			text += '\n'
		}
	}

	let codeIndex = 0

	$:(draw)(input,index,codeIndex)
</script>


<div class="flex row grow h100vh">

	<div class="flex column p1 cmb1 no-basis ">
		<div>Font:</div>
		<div class="flex col cmb0-5 cmr0-5">
			{#each fonts as font, i}
				<button
					class:none={i == 2}
					on:click={e => index = i}
					class:italic={index == i}
					class:bold={index == i}>
					{font}
				</button>
			{/each}
		</div>
		<div>Fill:</div>
		<input type="range" max={CODES.length-1} min="0" bind:value={codeIndex} />
		<div>Textarea:</div>
		<textarea
			bind:value={input} />
		<div>Size:</div>
		<div style={`font-family: ${current}; font-size: ${size}px`}>
			{sizes[index]}px
		</div>
		<div>Pixels:</div>
		<canvas 
			class="border no-grow w-auto"
			bind:this={canvas} />
	</div>

	<div class="flex column-center-center bg color grow m1 border">
		<pre 
			class="flex f0 bold mb4">
			{text}
		</pre>

	</div>


</div>