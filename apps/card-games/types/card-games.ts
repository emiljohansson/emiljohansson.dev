export interface Card {
  id: string
  suit: string
  value: number
  combined: string
  selected: boolean
  hidden: boolean
}

// type Suit = 'C' | 'D' | 'H' | 'S'

export type Rank = 'A' | 'J' | 'Q' | 'K' | number
