'use client'

import { useEffect, useState } from 'react'
import { JWTPayload, SignJWT, jwtVerify, JWTVerifyResult } from 'jose'
import Content from '@/components/Content'
import Section from '@/components/Section'

const authSecret = 'very long secret'
const key = new TextEncoder().encode(authSecret)

async function signToken(payload: JWTPayload, expiresIn = '1h') {
	return await new SignJWT(payload)
		.setProtectedHeader({ alg: 'HS256' })
		.setIssuedAt()
		.setExpirationTime(expiresIn)
		.sign(key)
}

export default function Page() {
	const [encodedValue, setEncodedValue] = useState('')
	const [decodedValue, setDecodedValue] =
		useState<JWTVerifyResult<JWTPayload> | null>(null)
	const [secret, setSecret] = useState('shhhh')
	const [errorMessage, setErrorMessage] = useState('')

	useEffect(() => {
		async function initToken() {
			const payload = {
				sub: '1234567890',
				name: 'John Doe',
			}
			const token = await signToken(payload)
			return token
		}

		async function sign() {
			const token = encodedValue || (await initToken())
			const verified = await jwtVerify(token, key, { algorithms: ['HS256'] })

			setEncodedValue(token)
			setDecodedValue(verified)
		}
		setErrorMessage('')
		try {
			sign()
		} catch (error) {
			setErrorMessage((error as Error).message)
		}
	}, [encodedValue, secret])

	return (
		<Content>
			<Section size="normal" direction="column">
				<h1 className="sr-only">Encoder and Decoder</h1>
				<article className="flex flex-col gap-4">
					<div className="flex flex-col gap-2">
						<label htmlFor="jwt">Encoded</label>
						<textarea
							id="jwt"
							className="w-full h-32"
							value={encodedValue}
							onChange={(event) => setEncodedValue(event.target.value)}
						/>
						<label htmlFor="secret">Secret</label>
						<input
							id="secret"
							className="input"
							value={secret}
							onChange={(event) => setSecret(event.target.value)}
						/>
					</div>
					{decodedValue && (
						<div className="flex flex-col gap-2">
							<div>Decoded</div>
							<div className="flex flex-col gap-2">
								<div className="flex flex-col gap-1">
									<div className="text-xs">Header</div>
									<div className="text-sm">
										{decodedValue?.protectedHeader &&
											JSON.stringify(decodedValue.protectedHeader, null, 2)}
									</div>
								</div>
								<div className="flex flex-col gap-1">
									<div className="text-xs">Payload</div>
									<div className="text-sm">
										{decodedValue?.payload &&
											JSON.stringify(decodedValue.payload, null, 2)}
									</div>
								</div>
							</div>
						</div>
					)}
					<div>{errorMessage}</div>
				</article>
			</Section>
		</Content>
	)
}
