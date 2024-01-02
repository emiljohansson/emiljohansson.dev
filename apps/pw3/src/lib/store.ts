import { writable } from 'svelte/store'

const initValue =
	typeof window === 'undefined' ? '' : localStorage.getItem('secret') || ''

export const keyCode = writable(initValue)

keyCode.subscribe((value) => {
	if (typeof window === 'undefined') return
	localStorage.setItem('secret', value)
})
