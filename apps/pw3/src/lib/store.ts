import { writable } from 'svelte/store'

const initValue =
	typeof window === 'undefined' ? '' : localStorage.getItem('secret') || ''

export const keyword = writable(initValue)

keyword.subscribe((value) => {
	if (typeof window === 'undefined') return
	localStorage.setItem('secret', value)
})
