'use client'

import { createContext, useContext as useReactContext } from 'react'
import { atom, type WritableAtom } from 'nanostores'
import { useStore } from '@nanostores/react'

const NanoContext = createContext<WritableAtom>({} as WritableAtom)
function NanoProvider<T>({
	children,
	store,
}: {
	children: React.ReactNode
	store: WritableAtom<T>
}) {
	return <NanoContext.Provider value={store}>{children}</NanoContext.Provider>
}
function useContext() {
	const atom = useReactContext(NanoContext)
	if (!atom) throw new Error('No store')
	const store = useStore(atom!)

	return [
		store,
		(newValue: unknown) => {
			atom.set(newValue)
		},
		atom,
	]
}

function Count() {
	const [count, setCount] = useContext()

	return (
		<button
			onClick={() => {
				setCount(count + 1)
			}}
		>
			{count}
		</button>
	)
}

export function NanoContextExample() {
	return (
		<div className="grid">
			<NanoProvider store={atom(0)}>
				<Count />
				<Count />
			</NanoProvider>
			<hr />
			<NanoProvider store={atom(0)}>
				<Count />
				<Count />
			</NanoProvider>
		</div>
	)
}
