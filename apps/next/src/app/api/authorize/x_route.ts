export async function GET() {}

// import { type NextRequest } from 'next/server'
// import { redirect } from 'next/navigation'
// import crypto from 'crypto'
// import { kv } from '@vercel/kv'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
// export async function GET(request: NextRequest) {
// 	console.log('GET /login/authorize')
// 	const authCodes =
// 		(await kv.get<{
// 			[key: string]: number
// 		}>('auth-codes')) || {}
// 	console.log({ authCodes })

// 	const responseType = request.nextUrl.searchParams.get('response_type')
// 	const clientId = request.nextUrl.searchParams.get('client_id')
// 	const redirectUri = request.nextUrl.searchParams.get('redirect_uri')
// 	const scope = request.nextUrl.searchParams.get('scope')
// 	const nonce = request.nextUrl.searchParams.get('nonce')

// 	console.log({
// 		responseType,
// 		clientId,
// 		redirectUri,
// 		scope,
// 		nonce,
// 	})

// 	const code = crypto.randomBytes(16).toString('hex')
// 	authCodes[code] = new Date(Date.now() + 60000).getTime()
// 	await kv.set('auth-codes', authCodes)

// 	// const codeVerifier = generateCodeVerifier()
// 	// const codeChallenge = base64UrlEncode(
// 	// 	crypto.createHash('sha256').update(codeVerifier).digest(),
// 	// )
// 	// const isMatching = verifyPKCE(codeVerifier, codeChallenge)
// 	// // console.log({ codeVerifier, codeChallenge, isMatching })
// 	// // console.log(userAgent({ headers: headers() as Headers }))
// 	// const authCodes = getCache<{ [key: string]: boolean }>('authCodes')
// 	// const found = authCodes?.[authCode]

// 	// if (!found) {
// 	// 	return NextResponse.json({
// 	// 		enteredCode: authCode,
// 	// 		error: 'not found',
// 	// 	})
// 	// }

// 	const params = new URLSearchParams({
// 		code,
// 	})

// 	return redirect(`${redirectUri}?${params.toString()}`)
// }
