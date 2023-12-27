import generateRandomString from '@emiljohansson/random-string'
import { writable } from 'svelte/store'

export function randomString(initValue: string) {
	const value = writable(initValue || generateRandomString())

	function generate() {
		value.update(() => generateRandomString())
	}

	return {
		value,
		generate,
	}
}
