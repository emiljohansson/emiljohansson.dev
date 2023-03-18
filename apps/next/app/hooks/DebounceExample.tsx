'use client'

import { useState } from 'react'
import { useDebounceValue } from 'hooks/useDebounceValue'

export function DebounceExample() {
	const [value, setValue] = useState('')
	const [debounced] = useDebounceValue(value, 200)

	return (
		<article>
			<h2>Debounce</h2>
			<input
				className="input"
				type="text"
				value={value}
				onChange={(e) => setValue(e.target.value)}
			/>
			<p>Value: {value}</p>
			<p>Debounced: {debounced}</p>
		</article>
	)
}
