import { kv } from '@vercel/kv'
import { sign } from 'jsonwebtoken'

function isDateInPast(date: Date) {
	return date < new Date()
}

export async function createTokens(code: string) {
	console.log('createTokens')

	const authCodes =
		(await kv.get<{ [key: string]: number }>('auth-codes')) || {}
	console.log({ authCodes })

	const expireDate = authCodes?.[code]

	if (!expireDate || isDateInPast(new Date(expireDate))) {
		return {
			code,
			authCodes,
			error: 'not found',
		}
	}

	const accessToken = sign(
		{
			iss: 'http://localhost:3000',
			sub: 'auth0|123456',
			aud: '1234abcdef',
			name: 'Jane Doe',
			given_name: 'Jane',
			family_name: 'Doe',
		},
		'secret',
		{
			expiresIn: '1h',
		},
	)
	const idToken = sign(
		{
			iss: 'http://localhost:3000',
			sub: 'auth0|123456',
			aud: '1234abcdef',
			name: 'Jane Doe',
			given_name: 'Jane',
			family_name: 'Doe',
		},
		'secret',
		{
			expiresIn: '1h',
		},
	)

	return {
		expiresIn: 60 * 60,
		accessToken,
		idToken,
	}
}
