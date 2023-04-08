'use client'

import { FormEvent, useState } from 'react'
import Content from '@/components/Content'
import Section from '@/components/Section'
import { Header } from 'ui'

const Calculate = () => {
	const [sum, setSum] = useState(0)

	const calculate = async (event: FormEvent<HTMLFormElement>) => {
		const form = event.currentTarget
		const formElements = form.elements as typeof form.elements & {
			q: {
				value: string
			}
		}

		event.preventDefault()

		const res = await fetch('/api/calculate', {
			body: JSON.stringify({
				query: formElements.q.value,
			}),
			headers: {
				'Content-Type': 'application/json',
			},
			method: 'POST',
		})

		const result = await res.json()
		setSum(result.sum)
	}

	return (
		<Content>
			<Header />
			<Section size="normal">
				<h1 className="sr-only">Calculate</h1>
				<form onSubmit={calculate} action="/api/calculate" method="post">
					<input className="input" type="text" name="q" aria-label="Query" />
					<span className="ml-3" data-test="sum">
						{sum}
					</span>
					<button className="btn-primary mt-3 block" data-test="submit">
						Calculate
					</button>
				</form>
			</Section>
		</Content>
	)
}

export default Calculate
