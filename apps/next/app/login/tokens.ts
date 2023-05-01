import { sign } from 'jsonwebtoken'
import { getCache } from './cache'

export function createTokens(code: string) {
	const authCodes = getCache<{ [key: string]: boolean }>('authCodes')
	console.log({ authCodes })
	const found = authCodes?.[code]
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

	if (!found) {
		return { error: 'not found' }
	}

	return {
		expiresIn: 60 * 60,
		accessToken,
		idToken,
	}
}
