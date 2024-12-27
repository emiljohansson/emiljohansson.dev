'use client'

import { useState } from 'react'
import Content from '@/components/Content'
import Section from '@/components/Section'
import { JWTPayload, SignJWT } from 'jose'

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
	const [subject, setSubject] = useState('')
	const [data, setData] = useState('{"name": "John Doe"}')
	const [expiresIn, setExpiresIn] = useState('1h')
	const [secret, setSecret] = useState('')

	async function onSubmit(event: React.FormEvent) {
		event.preventDefault()
		if (!subject || !secret) {
			return
		}
		const payload = {
			...JSON.parse(data),
			sub: subject,
			iat: Date.now(),
		}
		const token2 = signToken(payload, expiresIn)

		setEncodedValue(await token2)
	}

	return (
		<Content>
			<Section size="normal" direction="column">
				<h1 className="sr-only">JWT Generator</h1>

				<article className="flex flex-col gap-4">
					<form className="flex flex-col gap-4" onSubmit={onSubmit}>
						<div className="flex flex-col gap-2">
							<label htmlFor="jwt-sub">Subject</label>
							<input
								id="jwt-sub"
								className="input"
								value={subject}
								onChange={(event) => setSubject(event.currentTarget.value)}
							/>
						</div>
						<div className="flex flex-col gap-2">
							<label htmlFor="jwt-sub">Data</label>
							<input
								id="jwt-data"
								className="input"
								value={data}
								onChange={(event) => setData(event.currentTarget.value)}
							/>
						</div>
						<div className="flex flex-col gap-2">
							<label htmlFor="jwt-sub">setExpiresIn</label>
							<input
								id="jwt-data"
								className="input"
								value={expiresIn}
								onChange={(event) => setExpiresIn(event.currentTarget.value)}
							/>
						</div>
						<div className="flex flex-col gap-2">
							<label htmlFor="jwt-secret">Secret</label>
							<input
								id="jwt-secret"
								className="input"
								value={secret}
								onChange={(event) => setSecret(event.currentTarget.value)}
							/>
						</div>
						<button className="btn btn-primary" type="submit">
							Generate
						</button>
					</form>
					<div>
						<input
							className="input"
							type="text"
							disabled
							value={encodedValue}
						/>
					</div>
				</article>
			</Section>
		</Content>
	)
}
