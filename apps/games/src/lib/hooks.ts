import { useEffect } from 'react'
import { Deck } from '@/types/card-games'

export const usePreloadCards = (deck: Deck) => {
	useEffect(() => {
		setTimeout(() => {
			deck.forEach((card) => {
				const img = new Image()
				img.onload = () => {
					// console.log('loaded', card.combined)
				}
				img.src = `/images/cards/${card?.combined}.png`
			})
		}, 1000)
	}, [])
}
