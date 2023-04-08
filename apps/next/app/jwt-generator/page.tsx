'use client'

import Content from '@/components/Content'
import Section from '@/components/Section'
import { useState } from 'react'
import { Header } from 'ui'
import { sign, JwtPayload } from 'jsonwebtoken'

function generateJwt(payload: JwtPayload, secret: string): string {
	return sign(payload, secret, { expiresIn: '1h' })
}

export default function Page() {
	const [encodedValue, setEncodedValue] = useState('')
	const [subject, setSubject] = useState('')
	const [data, setData] = useState('{"name": "John Doe"}')
	const [secret, setSecret] = useState('')

	return (
		<Content>
			<Header />
			<Section size="normal" direction="column">
				<h1 className="sr-only">JWT Generator</h1>

				<article className="flex flex-col gap-4">
					<form
						className="flex flex-col gap-4"
						onSubmit={(event) => {
							event.preventDefault()
							console.log('submit')
							if (!subject || !secret) {
								return
							}
							const payload = {
								...JSON.parse(data),
								sub: subject,
								iat: Date.now(),
							}
							const token = generateJwt(payload, secret)
							console.log({
								token,
							})

							setEncodedValue(token)
						}}
					>
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
