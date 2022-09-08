import type { NextPage } from 'next'
import Head from 'next/head'
import { useRef, useState } from 'react'
import shuffle from 'just-shuffle'
import { isDefined } from 'lib/utils/lang'
import { classNames } from 'lib/utils/string'
import { first, last } from 'lib/utils/array'
import Header from 'shared/Header'
import type { Card, Piles, Rank, Suit } from '@/types/card-games'
import { createDeck, isOppositeColors } from '@/lib/deck'
import { scaleGame } from '@/lib/game'
import { usePreloadCards } from '@/lib/hooks'

enum RankValue {
  'J' = 11,
  'Q' = 12,
  'K' = 13,
  'A' = 1,
}

const suits: Suit[] = ['C', 'D', 'H', 'S']
const getCardValue = (rank: Rank) => typeof rank === 'number'
  ? rank
  : RankValue[rank]
const baseDeck = createDeck(suits, getCardValue)
const blankCard = {
  selected: false,
  combined: '',
  value: -1,
} as Card

export async function getServerSideProps () {
  const deck = shuffle(baseDeck)

  const initPiles = [
    deck.splice(0, 7),
    deck.splice(0, 7),
    deck.splice(0, 7),
    deck.splice(0, 7),
    deck.splice(0, 6),
    deck.splice(0, 6),
    deck.splice(0, 6),
    deck.splice(0, 6),
  ]

  return {
    props: {
      initPiles,
    },
  }
}

const getClickableIndexesFromPile = (pile: Card[]) => {
  if (pile.length < 1) return []
  let index = pile.length - 1
  const result = [index]
  while (index-- > 0) {
    const prev = pile[index + 1]
    const current = pile[index]
    if (current.hidden) return result
    if (current.suit !== prev.suit) return result
    if (current.value !== prev.value + 1) return result
    result.push(index)
  }
  return result
}

const FreeCellPage: NextPage = ({ initPiles }: { initPiles: Piles }) => {
  const [piles, setPiles] = useState<Piles>(initPiles)
  const [stack, setStack] = useState<{
    C?: Card
    D?: Card
    H?: Card
    S?: Card
  }>({})
  const [cells, setCells] = useState<(Card)[]>([
    blankCard,
    blankCard,
    blankCard,
    blankCard,
  ])
  const mainRef = useRef<HTMLElement>(null)
  usePreloadCards(baseDeck)

  function getSelectedCard () {
    for (let cellIndex = 0; cellIndex < cells.length; cellIndex++) {
      const cell = cells[cellIndex]
      if (cell?.selected) {
        return {
          selectedCard: cell,
          selectedPileIndex: cellIndex,
          selectedCardIndex: -1,
        }
      }
    }
    for (let pileIndex = 0; pileIndex < piles.length; pileIndex++) {
      const pile = piles[pileIndex]
      for (let cardIndex = 0; cardIndex < pile.length; cardIndex++) {
        const card = pile[cardIndex]
        if (card?.selected) {
          return {
            selectedCard: card,
            selectedPileIndex: pileIndex,
            selectedCardIndex: cardIndex,
          }
        }
      }
    }
    return {
      selectedCard: blankCard,
      selectedPileIndex: -1,
      selectedCardIndex: -1,
    }
  }

  function handleCell (cell: Card, index: number) {
    const { selectedCard, selectedPileIndex } = getSelectedCard()
    console.log(cell, selectedCard)

    if (cell.value !== -1) {
      selectedCard.selected = false
      cell.selected = true
      setCells([...cells])
      return
    }
    if (cell.value === -1 && selectedCard.selected) {
      selectedCard.selected = false
      const removedCard = piles[selectedPileIndex].pop()
      cells[index] = removedCard
      setPiles([...piles])
      setCells([...cells])
      return
    }
    selectedCard.selected = false
    cells[index] = selectedCard
    setPiles([...piles])
    setCells([...cells])
  }

  function handleSelectedCard (current: Card, currentPileIndex: number) {
    if (current.value === 1 || stack[current.suit]?.value === current.value - 1) {
      const removedCard = piles[currentPileIndex].pop()
      stack[removedCard.suit] = removedCard
      setPiles([...piles])
      setStack({ ...stack })
      return
    }

    const { selectedCard, selectedPileIndex, selectedCardIndex } = getSelectedCard()
    if (!current) {
      if (!selectedCard.selected) {
        return
      }
      moveCard(selectedCard, selectedPileIndex, selectedCardIndex, currentPileIndex)
      return
    }

    if (
      selectedCard.selected &&
      isOppositeColors(current, selectedCard) &&
      selectedPileIndex !== currentPileIndex &&
      selectedCard.combined !== current.combined &&
      selectedCard.value === current.value - 1 &&
      current.id === last(piles[currentPileIndex]).id
    ) {
      moveCard(selectedCard, selectedPileIndex, selectedCardIndex, currentPileIndex)
      return
    }
    selectedCard.selected = false
    current.selected = true
    setPiles([
      ...piles,
    ])
  }

  function moveCard (selectedCard: Card, selectedPileIndex: number, selectedCardIndex: number, currentPileIndex: number) {
    const newPiles = [
      ...piles,
    ]
    const removedCards = newPiles[selectedPileIndex].splice(selectedCardIndex, newPiles[selectedPileIndex].length)

    if (newPiles[selectedPileIndex].length < 1) {
      newPiles[selectedPileIndex].push(undefined)
    } else {
      newPiles[selectedPileIndex][newPiles[selectedPileIndex].length - 1].hidden = false
    }
    if (isDefined(first(newPiles[currentPileIndex]))) {
      newPiles[currentPileIndex].splice(newPiles[currentPileIndex].length, 0, ...removedCards)
    } else {
      newPiles[currentPileIndex] = removedCards
    }

    selectedCard.selected = false
    const clickableIndexes = getClickableIndexesFromPile(newPiles[currentPileIndex]).reverse()
    if (clickableIndexes.length >= 13) {
      newPiles[currentPileIndex].splice(clickableIndexes[0], clickableIndexes[clickableIndexes.length - 1] + 1)
      if (newPiles[currentPileIndex].length < 1) {
        newPiles[currentPileIndex].push(undefined)
      } else {
        last(newPiles[currentPileIndex]).hidden = false
      }
    }
    setPiles(newPiles)
    setTimeout(() => scaleGame(mainRef.current))
  }

  return (
    <>
      <Head>
        <title>Spider Solitaire</title>
        <meta name="description" content="Spider Solitaire" />
      </Head>

      <Header />

      <main ref={mainRef} className="mx-auto p-4 max-w-screen-lg">
        <h1 className="sr-only">
          Spider Solitaire
        </h1>
        <div className="flex">
          <div className="w-full">
            <img
              src={`/images/cards/${stack.C?.combined ?? 'blank_clubs'}.png`}
              alt="blank card"
              className={classNames(`
                border-4 border-transparent border-solid rounded-lg
                relative top-0 left-0
                mx-auto
              `, {
                'opacity-40': !isDefined(stack.C),
              })}
            />
          </div>
          <div className="w-full">
            <img
              src={`/images/cards/${stack.H?.combined ?? 'blank_hearts'}.png`}
              alt="blank card"
              className={classNames(`
                border-4 border-transparent border-solid rounded-lg
                relative top-0 left-0
                mx-auto
              `, {
                'opacity-40': !isDefined(stack.H),
              })}
            />
          </div>
          <div className="w-full">
            <img
              src={`/images/cards/${stack.S?.combined ?? 'blank_spades'}.png`}
              alt="blank card"
              className={classNames(`
                border-4 border-transparent border-solid rounded-lg
                relative top-0 left-0
                mx-auto
              `, {
                'opacity-40': !isDefined(stack.S),
              })}
            />
          </div>
          <div className="w-full">
            <img
              src={`/images/cards/${stack.D?.combined ?? 'blank_diamonds'}.png`}
              alt="blank card"
              className={classNames(`
                border-4 border-transparent border-solid rounded-lg
                relative top-0 left-0
                mx-auto
              `, {
                'opacity-40': !isDefined(stack.D),
              })}
            />
          </div>
          {cells.map((cell, index) => (
            <button
              key={index}
              className="w-full"
              onClick={() => handleCell(cell, index)}
            >
              <img
                src={`/images/cards/${cell?.combined || 'blank'}.png`}
                alt="blank card"
                className={classNames(`
                  border-4 border-transparent border-solid rounded-lg
                  relative top-0 left-0
                  mx-auto
                `, {
                  'bg-primary': cell.selected,
                })}
              />
            </button>
          ))}
        </div>
        <div className="flex">
          {piles.map((pile, pileIndex) => (
            <div key={pileIndex} className="w-full">
              {pile.map((card, cardIndex) => {
                const clickableIndexes = getClickableIndexesFromPile(pile)
                const clickable = !isDefined(card) || clickableIndexes.indexOf(cardIndex) > -1
                const cardImage = !isDefined(card)
                  ? 'blank'
                  : !card.hidden
                    ? card.combined
                    : 'red_back'
                const Image = () => (
                  <img
                    src={`/images/cards/${cardImage}.png`}
                    alt={card?.combined ?? 'blank card'}
                    className={classNames(`
                      border-4 border-transparent border-solid rounded-lg
                      relative top-0 left-0
                      mx-auto
                    `, {
                      'bg-primary': card?.selected,
                    })}
                  />
                )

                if (clickable) {
                  return (
                    <button
                      key={cardIndex}
                      className="-mt-[110%] first:mt-0"
                      onClick={() => handleSelectedCard(card, pileIndex)}
                    >
                      <Image />
                    </button>
                  )
                }
                return (
                  <div
                    key={cardIndex}
                    className="-mt-[110%] first:mt-0"
                  >
                    <Image />
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      </main>
    </>
  )
}

export default FreeCellPage
