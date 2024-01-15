import type { Card, Deck, Piles } from 'src/types/card-games'

export function scaleGame(viewEl: HTMLElement, gameEl: HTMLElement) {
	const visibleHeight = viewEl.offsetHeight
	const fullHeight = document.body.offsetHeight
	if (fullHeight <= visibleHeight) return
	const newWidth = (viewEl.offsetWidth - 32) * (visibleHeight / fullHeight)
	gameEl.style.width = `${newWidth}px`
}

export function deselectAll(piles: Card[][]) {
	for (const card of piles.flat()) {
		if (card?.selected) {
			card.selected = false
			return
		}
	}
}

export function moveCardsToPiles(piles: Piles, deck: Deck) {
	const newCards = deck.slice(0, piles.length)
	const remainingDeck = deck.slice(piles.length)
	newCards.forEach((newCard, index) => {
		piles[index].push(newCard)
	})
	return [piles, remainingDeck] as const
}

export function removeEmptyLeadingCards(piles: Piles) {
	return piles.map((pile) => {
		if (pile[0] === undefined) {
			pile.splice(0, 1)
		}
		return pile
	})
}
