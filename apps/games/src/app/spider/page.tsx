'use client'

import shuffle from 'just-shuffle'
import { Game } from './Game'
import { createBaseDeck } from './createBaseDeck'
import { useEffect, useState } from 'react'
import { isDefined } from 'lib/utils/lang'
import { Deck, Piles } from '@/types/card-games'
import { restoreGameFromHash } from './state'

// export const metadata = {
// 	title: 'Spider Solitaire',
// 	description: 'Spider Solitaire',
// }

export default function Page() {
	const [deck, setDeck] = useState<Deck>()
	const [piles, setPiles] = useState<Piles>()

	useEffect(() => {
		const restored = restoreGameFromHash()
		if (isDefined(restored)) {
			setDeck(restored.deck)
			setPiles(restored.piles)
			return
		}
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
		setDeck(deck)
		setPiles(initPiles)
	}, [])

	return (
		<>
			{!deck || !piles ? (
				<></>
			) : (
				<Game remainingCards={deck} initPiles={piles} />
			)}
		</>
	)
}
