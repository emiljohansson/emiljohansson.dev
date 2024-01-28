'use client'

import { atom } from 'nanostores'
import { useEffect, useState } from 'react'

type Subscriber<T> = (value: T) => void
type Unsubscriber = () => void
type Updater<T> = (value: T) => T
type Invalidator<T> = (value?: T) => void
type StartStopNotifier<T> = (
	set: (value: T) => void,
	update: (fn: Updater<T>) => void,
) => void | (() => void)

interface Readable<T> {
	subscribe(run: Subscriber<T>, invalidate?: Invalidator<T>): Unsubscriber
}
/* eslint-disable @typescript-eslint/no-explicit-any */
// type Stores =
// 	| Readable<any>
// 	| [Readable<any>, ...Array<Readable<any>>]
// 	| Array<Readable<any>>
/* eslint-enable @typescript-eslint/no-explicit-any */

interface Writable<T> extends Readable<T> {
	// store: Store<T>
	set(value: T): void
	update(updater: Updater<T>): void
}
// type StoresValues<S> = {
// 	[K in keyof S]: S[K] extends Readable<infer T> ? T : never
// }
// type Stores = {
// 	[K in string]: Readable<any>
// }

function noop() {}

function writable<T>(
	value: T,
	start: StartStopNotifier<T> | undefined = noop,
): Writable<T> {
	const store = atom(value)

	start(
		(value) => {
			store.set(value)
		},
		(fn) => {
			const newValue = fn(store.get())
			store.set(newValue)
		},
	)

	return {
		set: store.set,
		subscribe: store.subscribe,
		update(updater) {
			this.set(updater(store.get()))
		},
	}
}

function readable<T>(value: T, start?: StartStopNotifier<T> | undefined) {
	const store = writable(value, start)

	return {
		subscribe: store.subscribe,
	}
}

function derived<S, T>(
	stores: Readable<S>,
	fn: (values: S) => T,
	initialValue?: T,
): Readable<T>
function derived<S, T>(
	stores: Readable<S>[],
	fn: (values: S[]) => T,
	initialValue?: T,
): Readable<T>
function derived<S, T>(
	stores: Readable<S> | Readable<S>[],
	fn: (values: S | S[]) => T,
	initialValue?: T,
) {
	const single = !Array.isArray(stores)
	const storesArray = single ? [stores] : stores

	return readable(initialValue, (set) => {
		const values: S[] = []
		const unsubscribers = storesArray.map((store, index) => {
			return store.subscribe((value) => {
				console.log('derived.subscribe', value, values)

				values[index] = value
				set(fn(single ? values[0] : values))
			})
		})

		return () => {
			runAll(unsubscribers)
		}
	})
}

function runAll(fns: Array<() => void>) {
	fns.forEach((fn) => fn())
}

/* eslint-disable @typescript-eslint/no-explicit-any */
function get(store: Readable<any>) {
	let value: any
	store.subscribe((v) => {
		value = v
	})()
	return value
}
/* eslint-enable @typescript-eslint/no-explicit-any */

const $count = writable(0)

$count.subscribe((value) => {
	console.log('count.subscribe', value)
})
$count.set(1)
$count.update((n) => n + 1)

const $doubled = derived($count, (value) => value * 2)

const $sum = derived([$count, $doubled], ([a, b]) => a + b)

const $time = readable(new Date(), (set) => {
	set(new Date())
	if (typeof window === 'undefined') return noop

	const interval = setInterval(() => {
		set(new Date())
	}, 1000)

	return () => clearInterval(interval)
})

const $ticktock = derived(
	$time,
	(value) => (value.getSeconds() % 2 === 0 ? 'tock' : 'tick'),
	'tick',
)

function useReadable<T>(store: Readable<T>, initValue?: T) {
	const [value, setValue] = useState<T>(initValue || get(store))

	useEffect(() => {
		return store.subscribe((value) => {
			setValue(value)
		})
	}, [])

	return value!
}

export function SvelteStoreExample({ initDate }: { initDate: Date }) {
	const count = useReadable($count)
	const doubled = useReadable($doubled)
	const sum = useReadable($sum)
	const time = useReadable($time, initDate)
	const ticktock = useReadable($ticktock)

	return (
		<div className="grid">
			<h1 className="heading2">Svelte-inspired stores</h1>
			<p>
				Stores built ontop of nanostores to look and feel like svelte stores.
			</p>
			<button
				className="btn"
				onClick={() => {
					$count.set(count + 1)
				}}
			>
				{count} + {doubled} = {sum}
			</button>
			<div className="text">{time.toTimeString()}</div>
			<div className="text">{ticktock}</div>
		</div>
	)
}
