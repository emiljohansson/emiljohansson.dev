'use client'

import type { Card, Deck, Piles } from '@/types/card-games'

import { useRef, useState } from 'react'
import { FiRefreshCw, FiRotateCcw } from 'react-icons/fi'
import { isDefined, isEmpty } from 'lib/utils/lang'
import { classNames } from 'lib/utils/string'
import { chunk, first, last } from 'lib/utils/array'
import { Header, HeaderAction } from 'ui'
import {
	deselectAll,
	moveCardsToPiles,
	removeEmptyLeadingCards,
	scaleGame,
} from '@/lib/game'
import { usePreloadCards } from '@/lib/hooks'
import { createBaseDeck } from './createBaseDeck'

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

const Image = ({ card, cardImage }: { card: Card; cardImage: string }) => (
	<img
		src={`/images/cards/${cardImage}.png`}
		alt={card?.combined ?? 'blank card'}
		className={classNames(
			`
			border-4 border-transparent border-solid rounded-lg
			relative top-0 left-0
			mx-auto
			w-[calc(100%-0px)]
		`,
			{
				'bg-primary': card?.selected,
			},
		)}
	/>
)

export function Game({
	remainingCards,
	initPiles,
}: {
	remainingCards: Deck
	initPiles: Piles
}) {
	const [deck, setDeck] = useState<Deck>(remainingCards)
	const [piles, setPiles] = useState<Piles>(initPiles)
	// const [prevMove, setPrevMove] = useState<number[]>([])
	const mainRef = useRef<HTMLElement>(null)
	usePreloadCards(createBaseDeck())

	function addMoreCards() {
		deselectAll(piles)
		if (isEmpty(deck)) return
		const updatedPiles = removeEmptyLeadingCards(piles)
		const [newPiles, newDeck] = moveCardsToPiles(updatedPiles, deck)
		setPiles([...newPiles])
		setDeck([...newDeck])
		setTimeout(() => scaleGame(mainRef.current))
	}

	function getSelectedCard() {
		for (let pileIndex = 0; pileIndex < piles.length; pileIndex++) {
			const pile = piles[pileIndex]
			for (let cardIndex = 0; cardIndex < pile.length; cardIndex++) {
				const card = pile[cardIndex]
				if (card?.selected) return [card, pileIndex, cardIndex] as const
			}
		}
		return [undefined, -1, -1] as const
	}

	function handleSelectedCard(current: Card, currentPileIndex: number) {
		console.log(current)

		const [selectedCard, selectedPileIndex, selectedCardIndex] =
			getSelectedCard()
		if (!current) {
			if (!isDefined(selectedCard)) {
				return
			}
			moveCard(
				selectedCard,
				selectedPileIndex,
				selectedCardIndex,
				currentPileIndex,
			)
			return
		}
		const shouldBeMoved =
			isDefined(selectedCard) &&
			selectedPileIndex !== currentPileIndex &&
			selectedCard.combined !== current.combined &&
			selectedCard.value === current.value - 1 &&
			current.id === last(piles[currentPileIndex]).id

		if (shouldBeMoved) {
			moveCard(
				selectedCard,
				selectedPileIndex,
				selectedCardIndex,
				currentPileIndex,
			)
			return
		}
		deselectAll(piles)
		current.selected = true
		setPiles([...piles])
	}

	function moveCard(
		selectedCard: Card,
		selectedPileIndex: number,
		selectedCardIndex: number,
		currentPileIndex: number,
	) {
		const newPiles = [...piles]
		const removedCards = newPiles[selectedPileIndex].splice(
			selectedCardIndex,
			newPiles[selectedPileIndex].length,
		)

		if (newPiles[selectedPileIndex].length < 1) {
			newPiles[selectedPileIndex].push(undefined)
		} else {
			newPiles[selectedPileIndex][
				newPiles[selectedPileIndex].length - 1
			].hidden = false
		}
		if (isDefined(first(newPiles[currentPileIndex]))) {
			newPiles[currentPileIndex].splice(
				newPiles[currentPileIndex].length,
				0,
				...removedCards,
			)
		} else {
			newPiles[currentPileIndex] = removedCards
		}

		selectedCard.selected = false
		const clickableIndexes = getClickableIndexesFromPile(
			newPiles[currentPileIndex],
		).reverse()
		if (clickableIndexes.length >= 13) {
			newPiles[currentPileIndex].splice(
				clickableIndexes[0],
				clickableIndexes[clickableIndexes.length - 1] + 1,
			)
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
			<Header>
				<HeaderAction onClick={() => location.reload()} data-test="new-game">
					<FiRefreshCw size={30} strokeWidth="1.5" />
					<span className="sr-only">New Game</span>
				</HeaderAction>
				<HeaderAction onClick={() => console.log('undo')} data-test="undo">
					<FiRotateCcw size={30} strokeWidth="1.5" />
					<span className="sr-only">Undo</span>
				</HeaderAction>
			</Header>
			<main ref={mainRef} className="mx-auto p-4 max-w-screen-lg">
				<h1 className="sr-only">Spider Solitaire</h1>
				<div className="flex">
					{piles.map((pile, pileIndex) => (
						<div key={pileIndex} className="w-full">
							{pile.map((card, cardIndex) => {
								const clickableIndexes = getClickableIndexesFromPile(pile)
								const clickable =
									!isDefined(card) || clickableIndexes.indexOf(cardIndex) > -1
								const cardImage = !isDefined(card)
									? 'blank'
									: !card.hidden
									? card.combined
									: 'red_back'

								if (clickable) {
									return (
										<button
											key={cardIndex}
											className="-mt-[110%] first:mt-0"
											onClick={() => handleSelectedCard(card, pileIndex)}
										>
											<Image card={card} cardImage={cardImage} />
										</button>
									)
								}
								return (
									<div key={cardIndex} className="-mt-[110%] first:mt-0">
										<Image card={card} cardImage={cardImage} />
									</div>
								)
							})}
						</div>
					))}
				</div>
			</main>
			<footer className="h-16 relative">
				<button className="h-full w-20 ml-4 relative" onClick={addMoreCards}>
					{chunk(deck, 10).map((card, index) => (
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
