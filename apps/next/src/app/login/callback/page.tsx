'use client'

import { useSearchParams } from 'next/navigation'
import { useTokens } from './useTokens'

export default function Page() {
	const searchParams = useSearchParams()
	const code = searchParams.get('code') || 'error'
	const json = useTokens(code)

	return (
		<main>
			<pre>{JSON.stringify(json, null, 2)}</pre>
		</main>
	)
}
