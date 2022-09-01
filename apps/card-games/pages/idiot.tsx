import type { NextPage } from 'next'
import Head from 'next/head'
import { useState } from 'react'
import { isDefined } from 'lib/utils/lang'

interface Card {
  suit: string
  value: number
  combined: string
  selected: boolean
}

enum RankValue {
  'J' = 11,
  'Q' = 12,
  'K' = 13,
  'A' = 14,
}
// type Suit = 'C' | 'D' | 'H' | 'S'
type Rank = 'A' | 'J' | 'Q' | 'K' | number

const suits = ['C', 'D', 'H', 'S']
const ranks = ['A', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K'] as Rank[]
const createCard = (rank: Rank, suit: string) => ({
  suit,
  value: typeof rank === 'number'
    ? rank
    : RankValue[rank],
  combined: `${rank}${suit}`,
  selected: false,
} as Card)
const createDeck = () => ranks.map(rank => [
  createCard(rank, suits[0]),
  createCard(rank, suits[1]),
  createCard(rank, suits[2]),
  createCard(rank, suits[3]),
]).flat()
const deck = createDeck()
// .map(() => {
//   return [
//     deck.splice(Math.floor(Math.random() * deck.length), 1),
//     deck.splice(Math.floor(Math.random() * deck.length), 1),
//     deck.splice(Math.floor(Math.random() * deck.length), 1),
//     deck.splice(Math.floor(Math.random() * deck.length), 1),
//     deck.splice(Math.floor(Math.random() * deck.length), 1),
//     deck.splice(Math.floor(Math.random() * deck.length), 1),
//     deck.splice(Math.floor(Math.random() * deck.length), 1),
//     deck.splice(Math.floor(Math.random() * deck.length), 1),
//     deck.splice(Math.floor(Math.random() * deck.length), 1),
//     deck.splice(Math.floor(Math.random() * deck.length), 1),
//     deck.splice(Math.floor(Math.random() * deck.length), 1),
//     deck.splice(Math.floor(Math.random() * deck.length), 1),
//     deck.splice(Math.floor(Math.random() * deck.length), 1),
//   ]
// })

export async function getServerSideProps () {
  const initPiles = [
    [deck.splice(Math.floor(Math.random() * deck.length), 1)[0]],
    [deck.splice(Math.floor(Math.random() * deck.length), 1)[0]],
    [deck.splice(Math.floor(Math.random() * deck.length), 1)[0]],
    [deck.splice(Math.floor(Math.random() * deck.length), 1)[0]],
  ]

  return {
    props: {
      initPiles,
    },
  }
}

const IdiotPage: NextPage = ({ initPiles }: { initPiles: Card[][] }) => {
  console.log(initPiles)

  const [piles, setPiles] = useState<Card[][]>(initPiles)

  function handleSelectedCard (current: Card, index: number) {
    if (!current) {
      const selectedIndex = getSelectedCardIndex()
      if (isDefined(selectedIndex)) {
        console.log('selected', selectedIndex, '>', index)
        const moveCard = piles[selectedIndex].splice(0, 1)[0]
        piles[index].splice(0, 1, moveCard)
        if (piles[selectedIndex].length < 1) {
          piles[selectedIndex].push(undefined)
        }
      }
      deselectAll()
      setPiles([
        ...piles,
      ])
      return
    }
    const currentCards = [
      piles[0][0],
      piles[1][0],
      piles[2][0],
      piles[3][0],
    ]
    const shouldBeRemoved = currentCards
      .filter(isDefined)
      .filter(card => card.combined !== current.combined)
      .filter(card => card.suit === current.suit)
      .filter(card => card.value > current.value)
      .length > 0
    console.log(current)
    console.log(shouldBeRemoved)
    deselectAll()
    if (shouldBeRemoved) {
      const pileIndex = currentCards
        .map((card, index) => card.combined === current.combined ? index : undefined)
        .filter(isDefined)[0]
      const newPiles = [
        ...piles,
      ]
      newPiles[pileIndex].splice(0, 1, undefined)
      setPiles(newPiles)
      return
    }
    current.selected = true
    setPiles([
      ...piles,
    ])
  }

  function getSelectedCardIndex () {
    return [
      piles[0][0],
      piles[1][0],
      piles[2][0],
      piles[3][0],
    ]
      .map((card, index) => card?.selected ? index : undefined)
      .filter(isDefined)[0]
  }

  function deselectAll () {
    [
      piles[0][0],
      piles[1][0],
      piles[2][0],
      piles[3][0],
    ]
      .filter(isDefined)
      .forEach(card => {
        card.selected = false
      })
  }

  return (
    <>
      <Head>
        <title>The Idiot Card Game</title>
        <meta name="description" content="The Idiot Card Game" />
      </Head>

      <main>
        <h1 className="sr-only">
          The Idiot Card Game
        </h1>
        <div className="mx-auto p-4 max-w-7xl">
          <div className="takeFour">
            <div className="cardsLeft">48</div>
            <div className="mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab mdl-button--colored">
              <i className="material-icons">add</i>
            </div>
          </div>
          <div className="flex">
            {piles.map((pile, pileIndex) => (
              <div key={pileIndex}>
                {pile.map((card, cardIndex) => (
                  <button
                    key={cardIndex}
                    className="-mt-[120%] first:mt-0"
                    onClick={() => handleSelectedCard(card, pileIndex)}
                  >
                    <img
                      src={`/images/cards/${card?.combined ?? 'blank'}.png`}
                      className="
                        border-4 border-transparent border-solid rounded-lg
                        relative top-0 left-0
                        mx-auto
                        w-[calc(100%-8px)]
                      "
                    /> selected: {card?.selected.toString()}
                  </button>
                ))}
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  )
}

export default IdiotPage
