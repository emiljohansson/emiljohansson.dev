import { createTokens } from '../tokens'

export default async function Page({
	searchParams,
}: {
	searchParams: { [key: string]: string | string[] | undefined }
}) {
	const code = (searchParams.code as string) || 'error'
	const json = createTokens(code)

	return (
		<main>
			<code>{JSON.stringify(json)}</code>
		</main>
	)
}
