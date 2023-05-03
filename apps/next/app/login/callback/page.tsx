import { createTokens } from '../tokens'

export default async function Page({
	searchParams,
}: {
	searchParams: { [key: string]: string }
}) {
	console.log('GET /login/callback')

	const code = searchParams.code || 'error'
	const json = await createTokens(code)

	return (
		<main>
			<pre>{JSON.stringify(json, null, 2)}</pre>
		</main>
	)
}
