import shuffle from 'just-shuffle'
import { Game } from './Game'
import { createBaseDeck } from './createBaseDeck'

export const metadata = {
	title: 'Spider Solitaire',
	description: 'Spider Solitaire',
}

export default function Page() {
	const deck = shuffle(
		[
			createBaseDeck(),
			createBaseDeck(),
			createBaseDeck(),
			createBaseDeck(),
		].flat(),
	)

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
	initPiles.forEach((pile) => {
		pile.slice(0, pile.length - 1).forEach((card) => {
			card.hidden = true
		})
	})

	return <Game remainingCards={deck} initPiles={initPiles} />
}
