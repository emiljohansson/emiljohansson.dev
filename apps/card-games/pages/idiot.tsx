import type { NextPage } from 'next'
import Head from 'next/head'
import { useState } from 'react'
import shuffle from 'just-shuffle'
import { isDefined } from 'lib/utils/lang'
import { classNames } from 'lib/utils/string'

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

export async function getServerSideProps () {
  const deck = shuffle(createDeck())
  const initPiles = [
    deck.splice(0, 1),
    deck.splice(0, 1),
    deck.splice(0, 1),
    deck.splice(0, 1),
  ]

  return {
    props: {
      remainingCards: deck,
      initPiles,
    },
  }
}

const first = <T, > (array: T[] = []) => array[0]
const last = <T, > (array: T[] = []) => array[array.length - 1]
const lastIndex = <T, > (array: T[] = []) => array.length - 1

const IdiotPage: NextPage = ({ remainingCards, initPiles }: { remainingCards: Card[], initPiles: Card[][] }) => {
  const [deck, setDeck] = useState<Card[]>(remainingCards)
  const [piles, setPiles] = useState<Card[][]>(initPiles)

  function addMoreCards () {
    if (deck.length < 1) return
    piles.forEach(pile => {
      if (pile[0] === undefined) {
        pile.splice(0, 1)
      }
    })
    setPiles([...piles])
    const newCards = deck.splice(0, 4)
    piles[0].push(newCards[0])
    piles[1].push(newCards[1])
    piles[2].push(newCards[2])
    piles[3].push(newCards[3])
    setDeck([...deck])
  }

  function handleSelectedCard (current: Card, index: number) {
    if (!current) {
      const selectedIndex = getSelectedCardIndex()
      if (isDefined(selectedIndex)) {
        const moveCard = first(piles[selectedIndex].splice(lastIndex(piles[selectedIndex]), 1))
        piles[index].splice(lastIndex(piles[index]), 1, moveCard)
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
    const currentCards = getCurrentCards()
    const shouldBeRemoved = currentCards
      .filter(isDefined)
      .filter(card => card.combined !== current.combined)
      .filter(card => card.suit === current.suit)
      .filter(card => card.value > current.value)
      .length > 0
    deselectAll()
    if (shouldBeRemoved) {
      const pileIndex = currentCards
        .map((card, index) => card?.combined === current.combined ? index : undefined)
        .filter(isDefined)[0]
      const newPiles = [
        ...piles,
      ]
      newPiles[pileIndex].splice(lastIndex(newPiles[pileIndex]), 1)
      if (piles[pileIndex].length < 1) {
        piles[pileIndex].push(undefined)
      }
      setPiles(newPiles)
      return
    }
    current.selected = true
    setPiles([
      ...piles,
    ])
  }

  function getSelectedCardIndex () {
    return getCurrentCards()
      .map((card, index) => card?.selected ? index : undefined)
      .filter(isDefined)[0]
  }

  function deselectAll () {
    getCurrentCards()
      .filter(isDefined)
      .forEach(card => {
        card.selected = false
      })
  }

  const getCurrentCards = () => [
    last(piles[0]),
    last(piles[1]),
    last(piles[2]),
    last(piles[3]),
  ]

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
            <div className="cardsLeft">{deck.length}</div>
            <button
              className="mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab mdl-button--colored"
              onClick={() => addMoreCards()}
            >
              <i className="material-icons">add</i>
            </button>
          </div>
          <div className="flex">
            {piles.map((pile, pileIndex) => (
              <div key={pileIndex} className="w-full">
                {pile.map((card, cardIndex) => {
                  const currentIndexInPile = lastIndex(pile)
                  const clickable = cardIndex === currentIndexInPile
                  const Image = () => (
                    <img
                      src={`/images/cards/${card?.combined ?? 'blank'}.png`}
                      className={classNames(`
                        border-4 border-transparent border-solid rounded-lg
                        relative top-0 left-0
                        mx-auto
                        w-[calc(100%-8px)]
                      `, {
                        'bg-blue': card?.selected,
                      })}
                    />
                  )

                  if (clickable) {
                    return (
                      <button
                        key={cardIndex}
                        className="-mt-[120%] first:mt-0"
                        onClick={() => handleSelectedCard(card, pileIndex)}
                      >
                        <Image />
                      </button>
                    )
                  }
                  return (
                    <div
                      key={cardIndex}
                      className="-mt-[120%] first:mt-0"
                    >
                      <Image />
                    </div>
                  )
                })}
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  )
}

export default IdiotPage