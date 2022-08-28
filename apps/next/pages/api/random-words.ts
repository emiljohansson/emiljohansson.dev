import type { NextApiRequest, NextApiResponse } from 'next'
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

export default (req: NextApiRequest, res: NextApiResponse<string[]>) => {
  const numberOfWords = isNaN(Number(req.query.words))
    ? 1
    : Number(req.query.words)
  const words = range(numberOfWords).map(() => {
    const method = getWordMethod()
    return method()
  })

  res.status(200).json(words)
}
