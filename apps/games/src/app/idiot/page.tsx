'use client'

import type { Card, Rank, Suit } from '@/types/card-games'

import { useEffect, useState } from 'react'
import shuffle from 'just-shuffle'
import { Game } from './Game'
import { createDeck } from '@/lib/deck'

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

// export const metadata = {
// 	title: 'Idiot',
// 	description: 'The Idiot Card Game',
// }

export default function Page() {
	const [deck, setDeck] = useState<Card[]>()
	const [initPiles, setInitPiles] = useState<Card[][]>()

	useEffect(() => {
		const initDeck = shuffle(baseDeck)
		setDeck(initDeck)
		setInitPiles([
			initDeck.splice(0, 1),
			initDeck.splice(0, 1),
			initDeck.splice(0, 1),
			initDeck.splice(0, 1),
		])
	}, [])

	if (!deck || !initPiles) return <></>

	return (
		<Game baseDeck={baseDeck} initPiles={initPiles} remainingCards={deck} />
	)
}
