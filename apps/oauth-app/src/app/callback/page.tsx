'use client'

import { Silkscreen } from 'next/font/google'
import { useSearchParams } from 'next/navigation'
import { Suspense, useEffect, useState } from 'react'

const silkscreen = Silkscreen({ weight: '400', subsets: ['latin'] })

function Code() {
	const [json, setJson] = useState()
	const searchParams = useSearchParams()
	const code = searchParams.get('code')
	console.log({ code })

	useEffect(() => {
		async function createTokens() {
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
			setJson(json)
			// // console.log(headers())
			// // console.log(userAgent({ headers: headers() as Headers }))
			// const authCode = crypto.randomBytes(16).toString('hex')
			// const authCodes = getCache<{ [key: string]: boolean }>('authCodes') || {}
			// authCodes[authCode] = true
			// setCache('authCodes', authCodes, 120)
		}
		createTokens()
	}, [code])

	return (
		<>
			<div>{code}</div>
			{json && <code>{JSON.stringify(json)}</code>}
		</>
	)
}

export default function Page() {
	return (
		<main
			className={`${silkscreen.className} flex min-h-screen flex-col items-center justify-between p-24`}
		>
			<Suspense>
				<Code />
			</Suspense>
		</main>
	)
}
