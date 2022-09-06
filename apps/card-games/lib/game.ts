import { Card, Deck, Piles } from '@/types/card-games'

export function scaleGame (gameEl: HTMLElement) {
  const visibleHeight = gameEl.offsetHeight
  const fullHeight = gameEl.scrollHeight
  if (fullHeight <= visibleHeight) return
  const newWidth = (gameEl.offsetWidth - 32) * (visibleHeight / fullHeight)
  gameEl.style.width = `${newWidth}px`
}

export function deselectAll (piles: Card[][]) {
  for (const card of piles.flat()) {
    if (card?.selected) {
      card.selected = false
      return
    }
  }
}

export function moveCardsToPiles (piles: Piles, deck: Deck) {
  const newCards = deck.slice(0, piles.length)
  const remainingDeck = deck.slice(piles.length)
  newCards.forEach((newCard, index) => {
    piles[index].push(newCard)
  })
  return [piles, remainingDeck] as const
}

export function removeEmptyLeadingCards (piles: Piles) {
  return piles.map(pile => {
    if (pile[0] === undefined) {
      pile.splice(0, 1)
    }
    return pile
  })
}
