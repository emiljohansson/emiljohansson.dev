// temporary solution from https://github.com/JonAbrams/signals-react-safe/tree/main

import { useEffect, useMemo, useRef, useState } from 'react'
import {
	Signal,
	signal,
	computed,
	effect,
	batch,
	type ReadonlySignal,
	untracked,
} from '@preact/signals-react'

export {
	signal,
	computed,
	effect,
	batch,
	Signal,
	type ReadonlySignal,
	untracked,
}

export function useSignalValue<T>(signal: Signal<T>): T {
	const [state, setState] = useState<T>(signal.value)
	useEffect(() => {
		return effect(() => setState(signal.value))
	}, [signal])
	return state
}

export function useSignalAndValue<T>(initialValue: T): [Signal<T>, T] {
	const signal = useSignal(initialValue)
	const value = useSignalValue<T>(signal)
	return [signal, value]
}

export function useComputedValue<T>(compute: () => T): T {
	const signal = useComputed(compute)
	const value = useSignalValue(signal)
	return value
}

// Following hooks taken from https://github.com/preactjs/signals/blob/main/packages/react/runtime/src/index.ts
export function useSignal<T>(initialValue: T): Signal<T> {
	return useMemo(() => new Signal<T>(initialValue), [])
}

export function useComputed<T>(compute: () => T): Signal<T> {
	const $compute = useRef(compute)
	$compute.current = compute
	return useMemo(() => computed<T>(() => $compute.current()), [])
}

export function useSignalEffect(cb: () => void | (() => void)): void {
	const callback = useRef(cb)
	callback.current = cb

	useEffect(() => {
		return effect(() => callback.current())
	}, [])
}

// const ReactElemType = Symbol.for('react.element') // https://github.com/facebook/react/blob/346c7d4c43a0717302d446da9e7423a8e28d8996/packages/shared/ReactSymbols.js#L15

// function SignalValue({ data }: { data: Signal }) {
// 	return useSignalValue(data)
// }

// Object.defineProperties(Signal.prototype, {
// 	$$typeof: { configurable: true, value: ReactElemType },
// 	type: { configurable: true, value: SignalValue },
// 	props: {
// 		configurable: true,
// 		get() {
// 			return { data: this }
// 		},
// 	},
// 	ref: { configurable: true, value: null },
// })
