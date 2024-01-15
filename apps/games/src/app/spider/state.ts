import { Deck, Piles } from '@/types/card-games'
import {
	compress,
	compressToBase64,
	decompressFromBase64,
	decompress,
} from 'lz-string'

export function saveGameToHash(deck: Deck, piles: Piles) {
	const data = JSON.stringify({ deck, piles })
	const compressed = compress(data)
	const encoded = compressToBase64(compressed)
	window.location.hash = encoded
}

export function restoreGameFromHash() {
	const hash = window.location.hash
	if (hash === '') return
	const encoded = hash.substring(1)
	const decoded = decompressFromBase64(encoded)
	const decompressed = decompress(decoded)
	const { deck, piles } = JSON.parse(decompressed)
	return { deck, piles }
}
