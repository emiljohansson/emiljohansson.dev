'use client'

import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { Header } from 'ui'

enum Color {
	Green = 'green',
	Yellow = 'yellow',
	Gray = 'gray',
}
interface Guess {
	letters: string[]
	colors: Color[]
}

const from = <T,>(length: number, value: T): T[] =>
	Array.from({ length }, () => value)

enum GameState {
	Playing,
	Won,
	Lost,
}
const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

const GuessedWord = ({ guess: { letters, colors } }: { guess: Guess }) => (
	<div className="flex justify-center">
		<div className="flex mb-1">
			{letters.map((letter, index) => (
				<div
					key={index}
					className={`flex items-center justify-center bg-${colors[index]}-400 ml-1 w-12 h-12`}
				>
					{letter}
				</div>
			))}
		</div>
	</div>
)

const Field = ({ letters }: { letters: string[] }) => {
	const missing = 5 - letters.length
	const fixedList = [...letters, ...from(missing, '')]

	return (
		<>
			{fixedList.map((letter, index) => (
				<div
					key={index}
					className={
						'flex items-center justify-center border-2 border-gray-400 ml-1 w-12 h-12'
					}
				>
					{letter}
				</div>
			))}
		</>
	)
}

const BlankRow = () => {
	const fixedList = from(5, '')

	return (
		<div className="flex justify-center">
			<div className="flex mb-1">
				{fixedList.map((_, index) => (
					<div
						key={index}
						className={
							'flex items-center justify-center border-2 border-gray-400 ml-1 w-12 h-12'
						}
					/>
				))}
			</div>
		</div>
	)
}

export function Game({
	dictionary,
	word,
}: {
	dictionary: {
		[key: string]: boolean
	}
	word: string
}) {
	console.log(word)

	const [guesses, setGuesses] = useState<Guess[]>([])
	const [currentGuess, setCurrentGuess] = useState<string[]>([])
	const [gameState, setGameState] = useState(GameState.Playing)
	const [shake, setShake] = useState(0)

	function enterLetter(letter: string) {
		if (currentGuess.length >= 5) return
		currentGuess.push(letter)
		setCurrentGuess([...currentGuess])
	}

	function removeLastLetter() {
		currentGuess.pop()
		setCurrentGuess([...currentGuess])
	}

	useEffect(() => {
		function onKeyDown(event: KeyboardEvent) {
			const newLetter = event.key.toUpperCase()

			if (letters.indexOf(newLetter) > -1) {
				enterLetter(newLetter)
				return
			}
			if (newLetter === 'BACKSPACE') {
				removeLastLetter()
				return
			}
			if (newLetter !== 'ENTER') {
				return
			}

			if (gameState === GameState.Won) return
			if (!dictionary[currentGuess.join('')]) {
				setShake(shake + 1)
				return
			}
			if (currentGuess.join('') === word) setGameState(GameState.Won)
			else if (guesses.length + 1 === 6) setGameState(GameState.Lost)

			const colors: Color[] = []
			currentGuess.forEach((letter, index) => {
				if (word[index] === letter) colors.push(Color.Green)
				else if (word.indexOf(letter) > -1) colors.push(Color.Yellow)
				else colors.push(Color.Gray)
			})
			setGuesses([
				...guesses,
				{
					letters: currentGuess,
					colors,
				},
			])
			setCurrentGuess([])
		}
		document.addEventListener('keydown', onKeyDown)
		return () => document.removeEventListener('keydown', onKeyDown)
	}, [currentGuess, guesses, shake])

	return (
		<>
			<Header />
			<main>
				<h1 className="heading1">Bad Wordle "clone"</h1>
				<div dangerouslySetInnerHTML={{ __html: `<!-- ${word} -->` }} />
				<div className="flex flex-col justify-center">
					{guesses.map((guess, index) => (
						<GuessedWord key={index} guess={guess} />
					))}
					{gameState === GameState.Playing && (
						<div className="flex justify-center">
							<motion.div
								key={shake}
								initial={shake !== 0}
								className="flex mb-1"
								animate={{
									x: [0, 2, -2, 2, 0],
								}}
								transition={{
									duration: 0.2,
									ease: 'easeInOut',
									repeat: 1,
								}}
							>
								<Field letters={currentGuess} />
							</motion.div>
						</div>
					)}
					{from(5 - guesses.length, '').map((_, index) => (
						<BlankRow key={index} />
					))}
				</div>
				{gameState === GameState.Won && <p>You Won!</p>}
				{gameState === GameState.Lost && <p>You Lost...</p>}
			</main>
		</>
	)
}
