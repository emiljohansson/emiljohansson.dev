import type { Actions } from "@sveltejs/kit"
import type { PageServerLoad } from "./$types"

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

const count = 0

function randomWords(numberOfWords: number) {
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

export const load: PageServerLoad = () => {
	return {
		words: randomWords(4),
	}
}

export const actions: Actions = {
	newWords: async ({ request }) => {
		const data = await request.formData()
		const numberOfWords = data.get("numberOfWords")?.toString() || "4"

		return {
			success: true,
			words: randomWords(parseInt(numberOfWords, 10)),
			count,
		}
	},
}
