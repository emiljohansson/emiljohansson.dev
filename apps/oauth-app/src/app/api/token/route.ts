import { headers } from 'next/headers'
import { NextRequest, NextResponse, userAgent } from 'next/server'
import crypto from 'crypto'
import { getCache } from '../../cache'

function generateCodeVerifier() {
	const codeVerifier = crypto.randomBytes(32).toString('hex')
	const base64UrlEncodedCodeVerifier = base64UrlEncode(codeVerifier)
	return base64UrlEncodedCodeVerifier
}

function verifyPKCE(codeVerifier: string, codeChallenge: string) {
	const hashedCodeVerifier = crypto
		.createHash('sha256')
		.update(codeVerifier)
		.digest()
	const base64UrlEncodedHashedCodeVerifier = base64UrlEncode(hashedCodeVerifier)
	console.log({ base64UrlEncodedHashedCodeVerifier, codeChallenge })

	return base64UrlEncodedHashedCodeVerifier === codeChallenge
}

function base64UrlEncode(input: string | Buffer) {
	let base64 =
		typeof input === 'string'
			? Buffer.from(input).toString('base64')
			: input.toString('base64')
	base64 = base64.replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_')
	return base64
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function POST(request: NextRequest) {
	// const { code } = await request.json()
	// const { CLIENT_ID, CLIENT_SECRET } = import.meta.env
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(request: NextRequest) {
	const authCode = request.nextUrl.searchParams.get('code') as string
	const codeVerifier = generateCodeVerifier()
	const codeChallenge = base64UrlEncode(
		crypto.createHash('sha256').update(codeVerifier).digest(),
	)
	const isMatching = verifyPKCE(codeVerifier, codeChallenge)
	console.log({ codeVerifier, codeChallenge, isMatching })
	console.log(userAgent({ headers: headers() as Headers }))
	const authCodes = getCache<{ [key: string]: boolean }>('authCodes')
	const found = authCodes[authCode]

	return NextResponse.json({
		clientCode: authCode,
		serverCode: found ? 'found' : 'not found',
	})
}
