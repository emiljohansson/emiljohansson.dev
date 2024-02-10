'use client'

import { useState } from 'react'
import { sign } from 'jsonwebtoken'
import Content from '@/components/Content'
import Section from '@/components/Section'

export default function Page() {
	const [encodedValue, setEncodedValue] = useState('')
	const [subject, setSubject] = useState('')
	const [data, setData] = useState('{"name": "John Doe"}')
	const [expiresIn, setExpiresIn] = useState('1h')
	const [secret, setSecret] = useState('')

	return (
		<Content>
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
							const token = sign(payload, secret, {
								expiresIn: expiresIn || '1h',
							})
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
