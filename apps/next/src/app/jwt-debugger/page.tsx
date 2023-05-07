'use client'

import { verify, JsonWebTokenError, Jwt } from 'jsonwebtoken'
import Content from '@/components/Content'
import Section from '@/components/Section'
import { useEffect, useState } from 'react'

export default function Page() {
	const [encodedValue, setEncodedValue] = useState(
		'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSm9obiBEb2UiLCJzdWIiOiIxMjM0NSIsImlhdCI6MTY4MDk5MTA5MjczMSwiZXhwIjoxNjgwOTkxMDk2MzMxfQ.DNsQr2mhnP0aRK2luQcjTcZKwRTmm1MOqaZADx_quUE',
	)
	const [decodedValue, setDecodedValue] = useState<Jwt | null>(null)
	const [secret, setSecret] = useState('shhhh')
	const [errorMessage, setErrorMessage] = useState('')

	useEffect(() => {
		setErrorMessage('')
		try {
			const token = verify(encodedValue, secret, { complete: true })
			setDecodedValue(token)
		} catch (error) {
			setErrorMessage((error as JsonWebTokenError).message)
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
								<div className="flex flex-col gap-1">
									<div className="text-xs">Signature</div>
									<div className="text-sm">
										{decodedValue?.signature &&
											JSON.stringify(decodedValue.signature, null, 2)}
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
