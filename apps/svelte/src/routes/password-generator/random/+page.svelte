<script lang="ts">
	const lettersPattern = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
	const numericPattern = "0123456789"
	const symbolsPattern = ",._?-:]&*#~}$>(<)@^|{%!+="

	let value = randomString()
	let length = 20
	let numeric = false
	let symbols = false

	$: value = randomString({ length, numeric, symbols })

	function randomString(props?: {
		length?: number
		letters?: boolean
		numeric?: boolean
		symbols?: boolean
	}) {
		const { length, letters, numeric, symbols } = {
			length: 10,
			letters: true,
			numeric: false,
			symbols: false,
			...props,
		}
		const pattern = [
			letters && lettersPattern,
			numeric && numericPattern,
			symbols && symbolsPattern,
		]
			.filter((v) => !!v)
			.join("")
		let value = ""
		let index = length

		while (index--) {
			const charIndex = Math.floor(Math.random() * pattern.length)
			value += pattern[charIndex]
		}

		return value
	}
</script>

<h2 class="text-2xl font-semibold mb-6">Random Password</h2>

<input class="input w-full" type="text" readonly {value} />
<div class="flex gap-2">
	<input type="range" min="8" max="100" bind:value={length} class="w-full" />
	{length}
</div>
<label class="flex gap-2">
	<input type="checkbox" bind:checked={numeric} />
	Numbers
</label>
<label class="flex gap-2">
	<input type="checkbox" bind:checked={symbols} />
	Symbols
</label>
