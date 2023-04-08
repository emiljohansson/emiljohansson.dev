import type { NextPage } from 'next'
import Head from 'next/head'
import { useRef, useState } from 'react'
import shuffle from 'just-shuffle'
import { UpdateIcon } from '@radix-ui/react-icons'
import { isDefined, isEmpty } from 'lib/utils/lang'
import { classNames } from 'lib/utils/string'
import { first, last, lastIndex, chunk } from 'lib/utils/array'
import { Header, HeaderAction } from 'ui'
import type { Card, Deck, Piles, Rank, Suit } from '@/types/card-games'
import { createDeck } from '@/lib/deck'
import {
	deselectAll,
	moveCardsToPiles,
	removeEmptyLeadingCards,
	scaleGame,
} from '@/lib/game'
import { usePreloadCards } from '@/lib/hooks'

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

export async function getServerSideProps() {
	const deck = shuffle(baseDeck)
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

const IdiotPage: NextPage = ({
	remainingCards,
	initPiles,
}: {
	remainingCards: Deck
	initPiles: Piles
}) => {
	const [deck, setDeck] = useState<Deck>(remainingCards)
	const [piles, setPiles] = useState<Piles>(initPiles)
	const mainRef = useRef<HTMLElement>(null)
	usePreloadCards(baseDeck)

	function addMoreCards() {
		deselectAll(piles)
		if (isEmpty(deck)) return
		const updatedPiles = removeEmptyLeadingCards(piles)
		const [newPiles, newDeck] = moveCardsToPiles(updatedPiles, deck)
		setPiles([...newPiles])
		setDeck([...newDeck])
		setTimeout(() => scaleGame(mainRef.current))
	}

	function handleSelectedCard(current: Card, index: number) {
		if (!current) {
			const selectedIndex = getSelectedCardIndex()
			if (isDefined(selectedIndex)) {
				const moveCard = first(
					piles[selectedIndex].splice(lastIndex(piles[selectedIndex]), 1),
				)
				piles[index].splice(lastIndex(piles[index]), 1, moveCard)
				if (piles[selectedIndex].length < 1) {
					piles[selectedIndex].push(undefined)
				}
			}
			deselectAll(piles)
			setPiles([...piles])
			return
		}
		const currentCards = getCurrentCards()
		const shouldBeRemoved =
			currentCards
				.filter(isDefined)
				.filter((card) => card.combined !== current.combined)
				.filter((card) => card.suit === current.suit)
				.filter((card) => card.value > current.value).length > 0
		deselectAll(piles)
		if (shouldBeRemoved) {
			const pileIndex = currentCards
				.map((card, index) =>
					card?.combined === current.combined ? index : undefined,
				)
				.filter(isDefined)[0]
			const newPiles = [...piles]
			newPiles[pileIndex].splice(lastIndex(newPiles[pileIndex]), 1)
			if (piles[pileIndex].length < 1) {
				piles[pileIndex].push(undefined)
			}
			setPiles(newPiles)
			return
		}
		current.selected = true
		setPiles([...piles])
	}

	function getSelectedCardIndex() {
		return getCurrentCards()
			.map((card, index) => (card?.selected ? index : undefined))
			.filter(isDefined)[0]
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

			<Header>
				<HeaderAction onClick={() => location.reload()} data-test="refresh">
					<UpdateIcon width={30} height={30} />
					<span className="sr-only">New Game</span>
				</HeaderAction>
			</Header>
			<main ref={mainRef} className="mx-auto p-4 max-w-screen-lg">
				<h1 className="sr-only">The Idiot Card Game</h1>
				<div className="flex">
					{piles.map((pile, pileIndex) => (
						<div key={pileIndex} className="w-full">
							{pile.map((card, cardIndex) => {
								const currentIndexInPile = lastIndex(pile)
								const clickable = cardIndex === currentIndexInPile
								const Image = () => (
									<img
										src={`/images/cards/${card?.combined ?? 'blank'}.png`}
										alt={card?.combined ?? 'blank card'}
										className={classNames(
											`
                      border-4 border-transparent border-solid rounded-lg
                      relative top-0 left-0
                      mx-auto
                      w-[calc(100%-8px)]
                    `,
											{
												'bg-primary': card?.selected,
											},
										)}
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
									<div key={cardIndex} className="-mt-[110%] first:mt-0">
										<Image />
									</div>
								)
							})}
						</div>
					))}
				</div>
			</main>
			<footer className="h-16 relative">
				<button className="h-full w-20 ml-4 relative" onClick={addMoreCards}>
					{chunk(deck, 4).map((card, index) => (
						<img
							key={index}
							className="h-full py-1 absolute top-0"
							style={{
								left: 4 * index,
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

export default IdiotPage
