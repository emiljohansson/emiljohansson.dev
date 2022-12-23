<script lang="ts">
	const lettersPattern = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
	const numericPattern = "0123456789"
	const symbolsPattern = ",._?-:]&*#~}$>(<)@^|{%!+="

	function randomString(props?: {
		length?: number
		letters?: boolean
		numeric?: boolean
		symbols?: boolean
	}) {
		const { length, letters, numeric, symbols } = {
			length: 10,
			letters: true,
			numeric: true,
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

<h2 class="text-2xl font-semibold mb-0">Random Password</h2>

<input class="input w-full" type="text" readonly value="+MJX$4DV" />
<input type="range" min="8" max="100" value="50" class="w-full" />
