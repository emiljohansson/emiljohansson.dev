'use client'

import { signal, computed } from './signals'

const count = signal(0)
const double = computed(() => count.value * 2)

export default function Content() {
	return (
		<>
			<h2>Counter</h2>
			<p>Count: {count}</p>
			<p>Double: {double}</p>
			<div className="flex">
				<button className="btn-secondary" onClick={() => count.value++}>
					Increment
				</button>
				<button className="btn-secondary" onClick={() => count.value--}>
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
