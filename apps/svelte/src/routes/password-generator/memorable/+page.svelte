<script lang="ts">
	import { faker } from "@faker-js/faker"
	import range from "just-range"

	const wordMethods = [
		faker.word.adjective,
		faker.word.adverb,
		faker.word.conjunction,
		faker.word.interjection,
		faker.word.noun,
		faker.word.preposition,
		faker.word.verb,
	]

	let numberOfWords = 4
	let value = randomWord(numberOfWords)

	$: value = randomWord(numberOfWords)

	function randomWord(numberOfWords: number) {
		return range(numberOfWords)
			.map(() => {
				const method = getWordMethod()
				return method()
			})
			.join("-")
	}

	function getWordMethod() {
		const index = Math.floor(Math.random() * wordMethods.length)
		return wordMethods[index]
	}
</script>

<h2 class="text-2xl font-semibold mb-6">Memorable Password</h2>

<input class="input w-full" type="text" readonly {value} />
<div class="flex gap-2">
	<input type="range" min="3" max="15" bind:value={numberOfWords} class="w-full" />
	{numberOfWords}
</div>
