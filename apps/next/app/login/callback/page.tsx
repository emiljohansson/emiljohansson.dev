import { getCache } from '../cache'
import { createTokens } from '../tokens'

export default async function Page({
	searchParams,
}: {
	searchParams: { [key: string]: string | string[] | undefined }
}) {
	const code = (searchParams.code as string) || 'error'
	const authCodes = getCache<{ [key: string]: boolean }>('authCodes')
	const found = authCodes?.[code]
	const json = found ? createTokens(code) : { error: 'not found' }

	return (
		<main>
			<code>{JSON.stringify(json)}</code>
		</main>
	)
}
