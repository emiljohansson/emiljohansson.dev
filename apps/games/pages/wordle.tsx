import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { faker } from '@faker-js/faker'

enum Color {
  Green = 'green',
  Yellow = 'yellow',
  Gray = 'gray',
}

interface Guess {
  letters: string[]
  colors: Color[]
}

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

const GuessedWord = ({ guess: { letters, colors } }: { guess: Guess }) => {
  return (
    <div className="flex mb-1">
      {letters.map((letter, index) => (
        <div className={`flex items-center justify-center bg-${colors[index]}-400 ml-1 w-12 h-12`}>{letter}</div>
      ))}
    </div>
  )
}

const Field = ({ letters }: { letters: string[] }) => {
  return (
    <div className="flex mb-1">
      {letters.map((letter) => (
        <div className={'flex items-center justify-center border-2 border-gray-400 ml-1 w-12 h-12'}>{letter}</div>
      ))}
    </div>
  )
}

const PreloadPage: NextPage = ({ word }: { word: string }) => {
  const [guesses, setGuesses] = useState<Guess[]>([])
  const [currentGuess, setCurrentGuess] = useState<string[]>([])
  const [value, setValue] = useState<string>('')
  const [gameState, setGameState] = useState(GameState.Playing)

  useEffect(() => {
    console.log('effect', value)
    setCurrentGuess(value.split(''))
  }, [value])

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
        <div>
          {guesses.map((guess, index) => (
            <GuessedWord
              key={index}
              guess={guess}
            />
          ))}
          <Field letters={currentGuess} />
        </div>
        {gameState === GameState.Won && <p>You Won!</p>}
        {gameState === GameState.Lost && <p>You Lost...</p>}

        <form onSubmit={(event) => {
          event.preventDefault()
          if (gameState === GameState.Won) return
          if (value.length < 5) return
          if (!dictionary[value]) return
          if (value === word) setGameState(GameState.Won)
          else if (guesses.length + 1 === 6) setGameState(GameState.Lost)

          const letters = value.split('')
          const colors: Color[] = []
          letters.forEach((letter, index) => {
            if (word[index] === letter) colors.push(Color.Green)
            else if (word.indexOf(letter) > -1) colors.push(Color.Yellow)
            else colors.push(Color.Gray)
          })
          console.log(word)
          console.log(letters)
          console.log(colors)
          setGuesses([
            ...guesses,
            {
              letters,
              colors,
            },
          ])
          setValue('')
        }}>
          <input
            type="text"
            value={value}
            onChange={(event) => {
              const newValue = event.target.value.toUpperCase()
              if (
                newValue
                  .split('')
                  .filter(letter => letters.indexOf(letter) < 0)
                  .length > 0
              ) return
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
