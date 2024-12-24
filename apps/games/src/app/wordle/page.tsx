import { faker } from '@faker-js/faker'
import { Game } from './Game'

const wordMethods = [
	faker.word.adjective,
	faker.word.adverb,
	faker.word.conjunction,
	faker.word.noun,
	faker.word.verb,
]
const dictionary = [
	faker.locales.en!.word!.adjective!.filter((word) => word.length === 5),
	faker.locales.en!.word!.adverb!.filter((word) => word.length === 5),
	faker.locales.en!.word!.conjunction!.filter((word) => word.length === 5),
	faker.locales.en!.word!.noun!.filter((word) => word.length === 5),
	faker.locales.en!.word!.verb!.filter((word) => word.length === 5),
]
	.flat()
	.reduce((r, w) => {
		r[w.toUpperCase()] = true
		return r
	}, {} as { [key: string]: boolean })

export const metadata = {
	title: 'Wordle',
	description: 'Bad Wordle clone',
}

export default function Page() {
	const index = Math.floor(Math.random() * wordMethods.length)
	const method = wordMethods[index]

	return <Game dictionary={dictionary} word={method(5).toUpperCase()} />
}
