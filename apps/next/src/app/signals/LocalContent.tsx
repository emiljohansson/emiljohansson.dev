'use client'

// import { signal, computed, effect } from '@repo/lib/hooks/signals'
// import { useSignals } from '@preact/signals-react/runtime'
import { useSignal, useComputed, useSignalEffect } from '@preact/signals-react'
// import { signal, computed, effect } from '@preact/signals-core'

export default function LocalContent() {
	const count = useSignal(0)
	const double = useComputed(() => count.value * 2)
	console.log('Render')

	useSignalEffect(() => {
		console.log('Count:', count.value)
		console.log('Double:', double.value)
	})

	return (
		<>
			<h2>Counter</h2>
			<p>Count: {count}</p>
			<p>Double: {double}</p>
			<div className="flex">
				<button
					className="btn-secondary"
					onClick={() => {
						count.value++
					}}
				>
					Increment
				</button>
				<button
					className="btn-secondary"
					onClick={() => {
						count.value--
					}}
				>
					Decrement
				</button>
				<button
					className="btn-secondary"
					onClick={() => {
						count.value = 0
					}}
				>
					Reset
				</button>
				<button
					className="btn-secondary"
					onClick={() => {
						count.value = 5
					}}
				>
					Set 5
				</button>
			</div>
		</>
	)
}
