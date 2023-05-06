import type { Rank, Suit } from '@/types/card-games'
import shuffle from 'just-shuffle'
import { createDeck } from '@/lib/deck'
import { Game } from './Game'

enum RankValue {
	'J' = 11,
	'Q' = 12,
	'K' = 13,
	'A' = 14,
}

const suits: Suit[] = ['C', 'D', 'H', 'S']
const getCardValue = (rank: Rank) =>
	typeof rank === 'number' ? rank : RankValue[rank]
const baseDeck = createDeck(suits, getCardValue)

export const metadata = {
	title: 'Idiot',
	description: 'The Idiot Card Game',
}

export default function IdiotPage() {
	const deck = shuffle(baseDeck)
	const initPiles = [
		deck.splice(0, 1),
		deck.splice(0, 1),
		deck.splice(0, 1),
		deck.splice(0, 1),
	]

	return (
		<Game baseDeck={baseDeck} initPiles={initPiles} remainingCards={deck} />
	)
}
