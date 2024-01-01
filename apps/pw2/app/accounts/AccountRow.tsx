'use client'

import type { Account } from './types'
import { useState } from 'react'
import { EyeOpenIcon, CopyIcon } from '@radix-ui/react-icons'
import { secret } from '../store'

const hiddenText = '••••••••••••••••••'

export function AccountRow({ account }: { account: Account }) {
	const [plaintext, setPlaintext] = useState('')

	function once(fn: () => void) {
		let done = false
		return () => {
			if (!done) {
				done = true
				fn()
			}
		}
	}

	async function fetchPlaintext() {
		console.log({
			secret,
			password: account.password,
		})

		const { data, test } = await fetch('/api/plaintext', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				secret,
				password: account.password,
			}),
		}).then((res) => res.json())
		console.log({ data, test })

		setPlaintext(data)
	}

	function copyText() {
		navigator.clipboard.writeText(plaintext)
	}

	return (
		<>
			<div className="min-w-8 w-8">{account.id}</div>
			<div className="min-w-10 w-10">{account.website}</div>
			<div className="min-w-10 w-10">{account.username}</div>
			<div className="flex gap-2">
				{!plaintext ? (
					<button onClick={fetchPlaintext}>
						<EyeOpenIcon />
					</button>
				) : (
					<button onClick={copyText}>
						<CopyIcon />
					</button>
				)}
				<div className="whitespace-nowrap">{plaintext || hiddenText}</div>
			</div>
		</>
	)
}
