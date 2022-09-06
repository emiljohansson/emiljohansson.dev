import type { NextPage } from 'next'
import Head from 'next/head'
import { useState } from 'react'
import { faker } from '@faker-js/faker'

const dictionary = [
  faker.locales.en.word.adjective.filter(word => word.length === 5),
  faker.locales.en.word.adverb.filter(word => word.length === 5),
  faker.locales.en.word.conjunction.filter(word => word.length === 5),
  faker.locales.en.word.noun.filter(word => word.length === 5),
].flat().reduce((r, w) => {
  r[w.toUpperCase()] = true
  return r
}, {} as { [key: string]: boolean })
console.log(dictionary)

enum GameState {
  Playing,
  Won,
  Lost,
}
const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const wordMethods = [
  faker.word.adjective,
  faker.word.adverb,
  faker.word.conjunction,
  faker.word.noun,
]

export async function getServerSideProps () {
  const index = Math.floor(Math.random() * wordMethods.length)
  const method = wordMethods[index]

  return {
    props: {
      word: method(5).toUpperCase(),
    },
  }
}

const PreloadPage: NextPage = ({ word }: { word: string }) => {
  const [guesses, setGuesses] = useState<string[]>([])
  const [value, setValue] = useState<string>('')
  const [gameState, setGameState] = useState(GameState.Playing)

  return (
    <>
      <Head>
        <title>Bad Wordle "clone"</title>
        <meta name="description" content="Bad Wordle clone" />
      </Head>

      <main>
        <h1>
          Bad Wordle "clone"
        </h1>
        <p>Word: {word}</p>
        <p>Guesses: {guesses.toString()}</p>
        {gameState === GameState.Won && <p>You Won!</p>}
        {gameState === GameState.Lost && <p>You Lost...</p>}

        <form onSubmit={(event) => {
          event.preventDefault()
          if (gameState === GameState.Won) return
          if (value.length < 5) return
          if (!dictionary[value]) return
          if (value === word) setGameState(GameState.Won)
          else if (guesses.length + 1 === 5) setGameState(GameState.Lost)
          setGuesses([
            ...guesses,
            value,
          ])
          setValue('')
        }}>
          <input
            type="text"
            value={value}
            onChange={(event) => {
              const newValue = event.target.value.toUpperCase()
              if (newValue.split('').filter(letter => letters.indexOf(letter) < 0).length > 0) return
              setValue(newValue)
            }}
            maxLength={5}
          />
        </form>
      </main>
    </>
  )
}

export default PreloadPage
