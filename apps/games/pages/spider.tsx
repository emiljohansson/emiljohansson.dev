import type { NextPage } from 'next'
import Head from 'next/head'
import { useRef, useState } from 'react'
import shuffle from 'just-shuffle'
import { ReloadIcon, ResetIcon } from '@radix-ui/react-icons'
import { isDefined, isEmpty } from 'lib/utils/lang'
import { classNames } from 'lib/utils/string'
import { chunk, first, last } from 'lib/utils/array'
import Header from 'shared/Header'
import HeaderAction from 'shared/HeaderAction'
import type { Card, Deck, Piles, Rank, Suit } from '@/types/card-games'
import { createDeck } from '@/lib/deck'
import { deselectAll, moveCardsToPiles, removeEmptyLeadingCards, scaleGame } from '@/lib/game'
import { usePreloadCards } from '@/lib/hooks'

enum RankValue {
  'J' = 11,
  'Q' = 12,
  'K' = 13,
  'A' = 1,
}

const suits: Suit[] = ['H', 'S']
const getCardValue = (rank: Rank) => typeof rank === 'number'
  ? rank
  : RankValue[rank]
const createBaseDeck = () => createDeck(suits, getCardValue)

export async function getServerSideProps () {
  const deck = shuffle([
    createBaseDeck(),
    createBaseDeck(),
    createBaseDeck(),
    createBaseDeck(),
  ].flat())

  const initPiles = [
    deck.splice(0, 6),
    deck.splice(0, 6),
    deck.splice(0, 6),
    deck.splice(0, 6),
    deck.splice(0, 5),
    deck.splice(0, 5),
    deck.splice(0, 5),
    deck.splice(0, 5),
    deck.splice(0, 5),
    deck.splice(0, 5),
  ]
  initPiles.forEach(pile => {
    pile.slice(0, pile.length - 1).forEach(card => {
      card.hidden = true
    })
  })

  return {
    props: {
      remainingCards: deck,
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

const SpiderPage: NextPage = ({ remainingCards, initPiles }: { remainingCards: Deck, initPiles: Piles }) => {
  const [deck, setDeck] = useState<Deck>(remainingCards)
  const [piles, setPiles] = useState<Piles>(initPiles)
  // const [prevMove, setPrevMove] = useState<number[]>([])
  const mainRef = useRef<HTMLElement>(null)
  usePreloadCards(createBaseDeck())

  function addMoreCards () {
    deselectAll(piles)
    if (isEmpty(deck)) return
    const updatedPiles = removeEmptyLeadingCards(piles)
    const [newPiles, newDeck] = moveCardsToPiles(updatedPiles, deck)
    setPiles([...newPiles])
    setDeck([...newDeck])
    setTimeout(() => scaleGame(mainRef.current))
  }

  function getSelectedCard () {
    for (let pileIndex = 0; pileIndex < piles.length; pileIndex++) {
      const pile = piles[pileIndex]
      for (let cardIndex = 0; cardIndex < pile.length; cardIndex++) {
        const card = pile[cardIndex]
        if (card?.selected) return [card, pileIndex, cardIndex] as const
      }
    }
    return [undefined, -1, -1] as const
  }

  function handleSelectedCard (current: Card, currentPileIndex: number) {
    console.log(current)

    const [selectedCard, selectedPileIndex, selectedCardIndex] = getSelectedCard()
    if (!current) {
      if (!isDefined(selectedCard)) {
        return
      }
      moveCard(selectedCard, selectedPileIndex, selectedCardIndex, currentPileIndex)
      return
    }
    const shouldBeMoved =
      isDefined(selectedCard) &&
      selectedPileIndex !== currentPileIndex &&
      selectedCard.combined !== current.combined &&
      selectedCard.value === current.value - 1 &&
      current.id === last(piles[currentPileIndex]).id

    if (shouldBeMoved) {
      moveCard(selectedCard, selectedPileIndex, selectedCardIndex, currentPileIndex)
      return
    }
    deselectAll(piles)
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

      <Header>
        <HeaderAction
          onClick={() => location.reload()}
          data-test="new-game"
        >
          <ReloadIcon width={30} height={30} />
          <span className="sr-only">New Game</span>
        </HeaderAction>
        <HeaderAction
          onClick={() => console.log('undo')}
          data-test="undo"
        >
          <ResetIcon width={30} height={30} />
          <span className="sr-only">Undo</span>
        </HeaderAction>
      </Header>
      <main ref={mainRef} className="mx-auto p-4 max-w-screen-lg">
        <h1 className="sr-only">
          Spider Solitaire
        </h1>
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
                      w-[calc(100%-0px)]
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
      <footer className="h-16 relative">
        <button
          className="h-full w-20 ml-4 relative"
          onClick={addMoreCards}
        >
          {chunk(deck, 10).map((card, index) => (
            <img
              key={index}
              className="h-full py-1 absolute top-0"
              style={{
                left: (4 * index),
              }}
              src="/images/cards/red_back.png"
              alt="add more cards"
            />
          ))}
        </button>
      </footer>
    </>
  )
}

export default SpiderPage
