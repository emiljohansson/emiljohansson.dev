import type { Rank, Suit } from '@/types/card-games'

import { createDeck } from '@/lib/deck'

enum RankValue {
	'J' = 11,
	'Q' = 12,
	'K' = 13,
	'A' = 1,
}

const suits: Suit[] = ['H', 'S']
const getCardValue = (rank: Rank) =>
	typeof rank === 'number' ? rank : RankValue[rank]

export const createBaseDeck = () => createDeck(suits, getCardValue)
