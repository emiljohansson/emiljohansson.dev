import { create } from 'zustand'
import { persist, StateStorage, createJSONStorage } from 'zustand/middleware'

interface Store {
	secret: string
	setSecret: (secret: string) => void
}

const getUrlSearch = () => {
	return window.location.search.slice(1)
}

const persistentStorage: StateStorage = {
	getItem: (key): string => {
		// Check URL first
		if (getUrlSearch()) {
			const searchParams = new URLSearchParams(getUrlSearch())
			const storedValue = searchParams.get(key)
			return JSON.parse(storedValue as string)
		} else {
			// Otherwise, we should load from localstorage or alternative storage
			return JSON.parse(localStorage.getItem(key) as string)
		}
	},
	setItem: (key, newValue): void => {
		// Check if query params exist at all, can remove check if always want to set URL
		if (getUrlSearch()) {
			const searchParams = new URLSearchParams(getUrlSearch())
			searchParams.set(key, JSON.stringify(newValue))
			window.history.replaceState(null, '', `?${searchParams.toString()}`)
		}

		localStorage.setItem(key, JSON.stringify(newValue))
	},
	removeItem: (key): void => {
		const searchParams = new URLSearchParams(getUrlSearch())
		searchParams.delete(key)
		window.location.search = searchParams.toString()
	},
}

const storageOptions = {
	name: 'secret',
	storage: createJSONStorage<Store>(() => persistentStorage),
}

export const useStore = create(
	persist<Store>(
		(set) => ({
			secret: '',
			setSecret: (secret: string) => set({ secret }),
		}),
		storageOptions,
	),
)

// export const useStore = create<Store>((set) => ({
// 	secret: '',
// 	setSecret: (secret: string) => set({ secret }),
// }))
