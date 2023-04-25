import { Silkscreen } from 'next/font/google'
import { headers } from 'next/headers'
import { userAgent } from 'next/server'
import crypto from 'crypto'
import { getCache, setCache } from '../cache'

const silkscreen = Silkscreen({ weight: '400', subsets: ['latin'] })

export default async function Page({
	searchParams,
}: {
	searchParams: { [key: string]: string | string[] | undefined }
}) {
	const code = searchParams.code
	console.log({ code })
	const formData = new URLSearchParams({
		grant_type: 'authorization_code',
		code,
		redirect_uri: 'http://localhost:3000',
	} as Record<string, string>)
	const response = await fetch('http://localhost:3006/token', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json',
		},
		body: formData.toString(),
	})
	const json = await response.json()
	console.log({ json })
	// // console.log(headers())
	// // console.log(userAgent({ headers: headers() as Headers }))
	// const authCode = crypto.randomBytes(16).toString('hex')
	// const authCodes = getCache<{ [key: string]: boolean }>('authCodes') || {}
	// authCodes[authCode] = true
	// setCache('authCodes', authCodes, 120)

	return (
		<main
			className={`${silkscreen.className} flex min-h-screen flex-col items-center justify-between p-24`}
		>
			<div>{code}</div>
			<code>{JSON.stringify(json)}</code>
		</main>
	)
}
