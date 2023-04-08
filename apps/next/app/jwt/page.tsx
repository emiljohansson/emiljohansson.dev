'use client'

import Content from '@/components/Content'
import Section from '@/components/Section'
import { useEffect, useState } from 'react'
import { Header } from 'ui'

interface JwtPayload {
	sub: string
	iat: number
	exp: number
}

interface Jwt {
	header: object
	payload: JwtPayload
	signature: string
}

function decode(token: string): Jwt | null {
	const [headerEncoded, payloadEncoded, signature] = token.split('.')
	if (!headerEncoded || !payloadEncoded || !signature) {
		return null
	}

	try {
		const header = JSON.parse(atob(headerEncoded))
		const payload = JSON.parse(atob(payloadEncoded))
		if (!header || !payload) {
			return null
		}
		return {
			header,
			payload,
			signature,
		}
	} catch (error) {
		return null
	}
}

export default function Page() {
	const [encodedValue, setEncodedValue] = useState(
		'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
	)
	const [decodedValue, setDecodedValue] = useState<Jwt | null>(null)

	useEffect(() => {
		const payload = decode(encodedValue)
		console.log(payload)
		setDecodedValue(payload)
	}, [encodedValue])
	return (
		<Content>
			<Header />
			<Section size="normal">
				<h1 className="sr-only">JWT Encoder and Decoder</h1>
				<article className="flex flex-col gap-4">
					<div className="flex flex-col gap-2">
						<label htmlFor="jwt">Encoded</label>
						<textarea
							id="jwt"
							className="w-full h-32"
							value={encodedValue}
							onChange={(event) => setEncodedValue(event.target.value)}
						/>
					</div>
					{decodedValue ? (
						<div className="flex flex-col gap-2">
							<div>Decoded</div>
							<div className="flex flex-col gap-2">
								<div className="flex flex-col gap-1">
									<div className="text-xs">Header</div>
									<div className="text-sm">
										{decodedValue?.header &&
											JSON.stringify(decodedValue.header, null, 2)}
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
					) : (
						<div>Invalid JWT</div>
					)}
				</article>
			</Section>
		</Content>
	)
}
