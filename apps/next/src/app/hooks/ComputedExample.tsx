'use client'

import { useState } from 'react'
import { useCounter } from '@/hooks/useCounter'
import { useComputed } from '@/hooks/useComputed'
import { Button } from '@/components/ui/button'

export function ComputedExample() {
	const [count, increment] = useCounter(0)
	const doubled = useComputed(() => count * 2, [count])
	const [firstName, setFirstName] = useState('John')
	const [lastName, setLastName] = useState('Doe')
	const fullName = useComputed(
		() => `${firstName} ${lastName}`,
		[firstName, lastName],
	)

	return (
		<article>
			<h2 className="heading2">Computed</h2>
			<p>Count: {count}</p>
			<p>Doubled: {doubled}</p>
			<div className="flex">
				<Button variant="outline" onClick={() => increment()}>
					Increment
				</Button>
			</div>
			<div className="flex flex-col">
				<label>
					First name
					<input
						className="input"
						value={firstName}
						onChange={(e) => setFirstName(e.target.value)}
					/>
				</label>
				<label>
					Last name
					<input
						className="input"
						value={lastName}
						onChange={(e) => setLastName(e.target.value)}
					/>
				</label>
				<p>Full name: {fullName}</p>
			</div>
		</article>
	)
}
