'use client'

import { useSearchParams } from 'next/navigation'
import { createTokens } from '../tokens'

export default async function Page() {
	console.log('GET /login/callback')
	const searchParams = useSearchParams()
	const code = searchParams.get('code') || 'error'
	const json = await createTokens(code)

	return (
		<main>
			<pre>{JSON.stringify(json, null, 2)}</pre>
		</main>
	)
}
