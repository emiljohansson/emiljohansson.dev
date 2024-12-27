'use client'

import { SignJWT } from 'jose'
import { useEffect, useState } from 'react'

function isDateInPast(date: Date) {
	return date < new Date()
}

export function useTokens(code: string) {
	const [accessToken, setAccessToken] = useState('')
	const [idToken, setIdToken] = useState('')
	const [expiresIn] = useState(60 * 60)

	useEffect(() => {
		async function init() {
			const authCodes = {
				[code]: new Date(Date.now() + 60000).getTime(),
			}
			const expireDate = authCodes?.[code]

			if (!expireDate || isDateInPast(new Date(expireDate))) {
				return {
					code,
					authCodes,
					error: 'not found',
				}
			}

			const secretKey = new TextEncoder().encode('your-secret-key')
			const accessToken = await new SignJWT({
				sub: 'auth0|123456',
				name: 'Jane Doe',
			})
				.setProtectedHeader({ alg: 'HS256' })
				.setIssuer('http://localhost:3000')
				.setAudience('1234abcdef')
				.setExpirationTime('2h')
				.sign(secretKey)
			const idToken = await new SignJWT({
				sub: 'auth0|123456',
				name: 'Jane Doe',
				given_name: 'Jane',
				family_name: 'Doe',
			})
				.setProtectedHeader({ alg: 'HS256' })
				.setIssuer('http://localhost:3000')
				.setAudience('1234abcdef')
				.setExpirationTime('1h')
				.sign(secretKey)

			console.log({ accessToken, idToken })

			setAccessToken(accessToken)
			setIdToken(idToken)
		}
		init()
	}, [code])

	return {
		expiresIn,
		accessToken,
		idToken,
	}
}
