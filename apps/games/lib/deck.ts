import { uniqueId } from 'lib/utils/string'
import type { Card, Rank, Suit } from '@/types/card-games'

export const ranks: Rank[] = ['A', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K']

export const createCard = (rank: Rank, suit: Suit, value: number): Card => ({
  id: uniqueId(),
  suit,
  value,
  combined: `${rank}${suit}`,
  selected: false,
  hidden: false,
  color: suit === 'D' || suit === 'H'
    ? 'red'
    : 'black',
})

export const createDeck = (suits: Suit[], getCardValue: (rank: Rank) => number) => ranks
  .map(
    rank => suits.map(
      suit => createCard(rank, suit, getCardValue(rank)),
    ),
  ).flat()

export const isOppositeColors = (card1: Card, card2: Card) => card1.color !== card2.color
