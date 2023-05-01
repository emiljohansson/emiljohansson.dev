import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import { getCache, setCache } from '../cache'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(request: NextRequest) {
	console.log('GET /authorize')

	const responseType = request.nextUrl.searchParams.get('response_type')
	const clientId = request.nextUrl.searchParams.get('client_id')
	const redirectUri = request.nextUrl.searchParams.get('redirect_uri')
	const scope = request.nextUrl.searchParams.get('scope')
	const nonce = request.nextUrl.searchParams.get('nonce')

	console.log({
		responseType,
		clientId,
		redirectUri,
		scope,
		nonce,
	})

	const code = crypto.randomBytes(16).toString('hex')
	const authCodes = getCache<{ [key: string]: boolean }>('authCodes') || {}
	authCodes[code] = true
	setCache('authCodes', authCodes, 240)

	// // export async function GET(request: NextRequest) {
	// // const authCode = request.nextUrl.searchParams.get('code') as string
	// const authCode = params.get('code') as string
	// const codeVerifier = generateCodeVerifier()
	// const codeChallenge = base64UrlEncode(
	// 	crypto.createHash('sha256').update(codeVerifier).digest(),
	// )
	// const isMatching = verifyPKCE(codeVerifier, codeChallenge)
	// // console.log({ codeVerifier, codeChallenge, isMatching })
	// // console.log(userAgent({ headers: headers() as Headers }))
	// const authCodes = getCache<{ [key: string]: boolean }>('authCodes')
	// const found = authCodes?.[authCode]

	// if (!found) {
	// 	return NextResponse.json({
	// 		enteredCode: authCode,
	// 		error: 'not found',
	// 	})
	// }

	return NextResponse.json({
		test: 123,
		code,
		responseType,
		clientId,
		redirectUri,
		scope,
		nonce,
	})
}
