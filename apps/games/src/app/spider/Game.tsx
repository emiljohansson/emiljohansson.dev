'use client'

import type { Card, Deck, Piles } from '@/types/card-games'

import { useRouter } from 'next/navigation'
import { useRef, useState } from 'react'
import { FiRefreshCw, FiRotateCcw } from 'react-icons/fi'
import { isDefined, isEmpty } from '@repo/lib/utils/lang'
import { chunk, first, last } from '@repo/lib/utils/array'
import { Header, HeaderAction } from '@repo/ui'
import {
	deselectAll,
	moveCardsToPiles,
	removeEmptyLeadingCards,
} from '@/lib/game'
import { usePreloadCards } from '@/lib/hooks'
import { createBaseDeck } from './createBaseDeck'
import { Image } from './Image'
import { restoreGameFromHash, saveGameToHash } from './state'

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

export function Game({
	remainingCards,
	initPiles,
}: {
	remainingCards: Deck
	initPiles: Piles
}) {
	const router = useRouter()
	const [deck, setDeck] = useState<Deck>(remainingCards)
	const [piles, setPiles] = useState<Piles>(initPiles)
	const mainRef = useRef<HTMLElement>(null)

	usePreloadCards(createBaseDeck())

	function addMoreCards() {
		deselectAll(piles)
		initHashState()
		if (isEmpty(deck)) return
		const updatedPiles = removeEmptyLeadingCards(piles)
		const [newPiles, newDeck] = moveCardsToPiles(updatedPiles, deck)
		setPiles([...newPiles])
		setDeck([...newDeck])
		saveGameToHash(newDeck, newPiles)
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
		initHashState()

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
			newPiles[selectedPileIndex].push(undefined as unknown as Card)
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
				newPiles[currentPileIndex].push(undefined as unknown as Card)
			} else {
				last(newPiles[currentPileIndex]).hidden = false
			}
		}
		setPiles(newPiles)
		saveGameToHash(deck, piles)
	}

	function undoMove() {
		if (window.location.hash === '') return
		router.back()
		setTimeout(() => {
			const restored = restoreGameFromHash()
			if (!isDefined(restored)) return
			setDeck(restored.deck)
			setPiles(restored.piles)
		})
	}

	function initHashState() {
		if (window.location.hash !== '') return
		console.log('init game')
		saveGameToHash(deck, piles)
	}

	return (
		<>
			<Header>
				<HeaderAction
					onClick={() => {
						window.location.hash = ''
						location.reload()
					}}
					data-test="new-game"
				>
					<FiRefreshCw size={30} strokeWidth="1.5" />
					New Game
				</HeaderAction>
				<HeaderAction onClick={undoMove} data-test="undo">
					<FiRotateCcw size={30} strokeWidth="1.5" />
					Undo
				</HeaderAction>
			</Header>
			<nav className="h-16">
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
			</nav>
			<main ref={mainRef} className="mx-auto px-4 max-w-screen-lg">
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
		</>
	)
}
