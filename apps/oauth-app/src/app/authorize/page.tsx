import { Silkscreen } from 'next/font/google'
import { headers } from 'next/headers'
import { userAgent } from 'next/server'
import crypto from 'crypto'
import { getCache, setCache } from '../cache'

const silkscreen = Silkscreen({ weight: '400', subsets: ['latin'] })

export default function Page({
	searchParams,
}: {
	searchParams: { [key: string]: string | string[] | undefined }
}) {
	// const search = searchParams.get('response_type')
	console.log({ searchParams })
	console.log(headers())
	console.log(userAgent({ headers: headers() as Headers }))
	const authCode = crypto.randomBytes(16).toString('hex')
	const authCodes = getCache<{ [key: string]: boolean }>('authCodes') || {}
	authCodes[authCode] = true
	setCache('authCodes', authCodes, 120)

	return (
		<main
			className={`${silkscreen.className} flex min-h-screen flex-col items-center justify-between p-24`}
		>
			{authCode}
		</main>
	)
}
