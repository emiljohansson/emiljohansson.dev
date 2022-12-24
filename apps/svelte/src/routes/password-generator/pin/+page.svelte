<script lang="ts">
	const lettersPattern = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
	const numericPattern = "0123456789"
	const symbolsPattern = ",._?-:]&*#~}$>(<)@^|{%!+="

	const letters = false
	const numeric = true
	const symbols = false
	let length = 6
	let value = randomString({ length, letters, numeric, symbols })

	$: value = randomString({ length, letters, numeric, symbols })

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

<h2 class="text-2xl font-semibold mb-6">PIN</h2>

<input class="input w-full" type="text" readonly {value} />
<div class="flex gap-2">
	<input type="range" min="3" max="15" bind:value={length} class="w-full" />
	{length}
</div>
