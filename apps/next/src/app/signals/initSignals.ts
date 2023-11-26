import type { Signal } from '@preact/signals-react'

import { Signal as SignalBase, effect } from '@preact/signals-core'
import { useEffect, useState } from 'react'

export function useSignalState<T>(signal: Signal<T>) {
	const [state, setState] = useState<T>(signal.value)

	useEffect(() => {
		return effect(() => setState(signal.value))
	}, [signal])

	return state
}

const ReactElemType = Symbol.for('react.element') // https://github.com/facebook/react/blob/346c7d4c43a0717302d446da9e7423a8e28d8996/packages/shared/ReactSymbols.js#L15

function SignalValue({ data }: { data: Signal }) {
	return useSignalState(data)
}

Object.defineProperties(SignalBase.prototype, {
	$$typeof: { configurable: true, value: ReactElemType },
	type: { configurable: true, value: SignalValue },
	props: {
		configurable: true,
		get() {
			return { data: this }
		},
	},
	ref: { configurable: true, value: null },
})
