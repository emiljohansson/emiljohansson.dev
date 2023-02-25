export type Suit = 'C' | 'D' | 'H' | 'S'

export type Rank = 'A' | 'J' | 'Q' | 'K' | number

export interface Card {
	id: string
	suit: Suit
	value: number
	combined: string
	selected: boolean
	hidden: boolean
}

export type Piles = Card[][]

export type Deck = Card[]
