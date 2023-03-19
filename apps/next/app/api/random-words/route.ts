import { NextResponse } from 'next/server'
import { faker } from '@faker-js/faker'
import range from 'just-range'

const wordMethods = [
	faker.word.adjective,
	faker.word.adverb,
	faker.word.conjunction,
	faker.word.interjection,
	faker.word.noun,
	faker.word.preposition,
	faker.word.verb,
]

const getWordMethod = () => {
	const index = Math.floor(Math.random() * wordMethods.length)
	return wordMethods[index]
}

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url)
	const wordsFromQuery = searchParams.get('words')
	const numberOfWords = isNaN(Number(wordsFromQuery))
		? 1
		: Number(wordsFromQuery)
	const words = range(numberOfWords).map(() => {
		const method = getWordMethod()
		return method()
	})

	return NextResponse.json(words)
}
