'use client'

import { signal, computed, effect } from '@preact/signals-react'

const gLcount = signal(0)
const gLdouble = computed(() => gLcount.value * 2)

effect(() => {
	console.log('Count:', gLcount.value)
	console.log('Double:', gLdouble.value)
})

export default function GlobalContent() {
	console.log('Render')

	return (
		<>
			<p>Count: {gLcount}</p>
			<p>Double: {gLdouble}</p>
			<div className="flex">
				<button
					className="btn-secondary"
					onClick={() => {
						gLcount.value++
					}}
				>
					Increment
				</button>
				<button
					className="btn-secondary"
					onClick={() => {
						gLcount.value--
					}}
				>
					Decrement
				</button>
				<button
					className="btn-secondary"
					onClick={() => {
						gLcount.value = 0
					}}
				>
					Reset
				</button>
				<button
					className="btn-secondary"
					onClick={() => {
						gLcount.value = 5
					}}
				>
					Set 5
				</button>
			</div>
		</>
	)
}
