import { NextRequest, NextResponse } from 'next/server'
// import { createTokens } from '../callback/useTokens'

// https://dev-dkni3auivsj5csrk.us.auth0.com/u/login?state=hKFo2SBVUHUzeTFPTE1zTDdnVGt4b2lRUkVzUnRxSV9Wc0F0caFur3VuaXZlcnNhbC1sb2dpbqN0aWTZIHFJM1A3a2NGcnRpZC05YTk2ckNsLTlxQ1U5cElRTlZxo2NpZNkgMDdCYUk3SWhZT2ZaWTl3bGhZalNIelRTN3lFaEt3bjY
// Zol3Bwx7vj4ezcCqkmtuhmP9RNKIb-FCaUzKr9ug2Os5z
// {
//   "sub": "auth0|64493d0f5ef9b25191582031",
//   "nickname": "johanssondev",
//   "name": "johanssondev@duck.com",
//   "picture": "https://s.gravatar.com/avatar/eab7d49548c3a44e0adaac88ea87b725?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fjo.png",
//   "updated_at": "2023-04-26T15:02:51.491Z"
// }

// function generateCodeVerifier() {
// 	const codeVerifier = crypto.randomBytes(32).toString('hex')
// 	const base64UrlEncodedCodeVerifier = base64UrlEncode(codeVerifier)
// 	return base64UrlEncodedCodeVerifier
// }

// function verifyPKCE(codeVerifier: string, codeChallenge: string) {
// 	const hashedCodeVerifier = crypto
// 		.createHash('sha256')
// 		.update(codeVerifier)
// 		.digest()
// 	const base64UrlEncodedHashedCodeVerifier = base64UrlEncode(hashedCodeVerifier)
// 	// console.log({ base64UrlEncodedHashedCodeVerifier, codeChallenge })

// 	return base64UrlEncodedHashedCodeVerifier === codeChallenge
// }

// function base64UrlEncode(input: string | Buffer) {
// 	let base64 =
// 		typeof input === 'string'
// 			? Buffer.from(input).toString('base64')
// 			: input.toString('base64')
// 	base64 = base64.replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_')
// 	return base64
// }

// export async function GET() {
// 	return NextResponse.json({ message: 'hello' })
// }

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function POST(request: NextRequest) {
	console.log('POST /api/token')
	// const res = await request.text()
	// const params = new URLSearchParams(res)
	// const code = params.get('code') as string
	// const codeVerifier = generateCodeVerifier()
	// const codeChallenge = base64UrlEncode(
	// 	crypto.createHash('sha256').update(codeVerifier).digest(),
	// )
	// const isMatching = verifyPKCE(codeVerifier, codeChallenge)
	// console.log({ codeVerifier, codeChallenge, isMatching })
	// console.log(userAgent({ headers: headers() as Headers }))

	// return NextResponse.json(createTokens(code))
	return NextResponse.json({ message: 'hello' })
}
