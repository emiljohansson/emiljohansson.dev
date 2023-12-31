'use client'

import type { Account } from './types'
import { useState } from 'react'
import { EyeOpenIcon, CopyIcon } from '@radix-ui/react-icons'

const hiddenText = '••••••••••••••••••'

export function AccountRow({
	account,
	secret,
}: {
	account: Account
	secret: string
}) {
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
		const { data } = await fetch('/accounts/api/plaintext', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				secret,
				password: account.password,
			}),
		}).then((res) => res.json())
		setPlaintext(data)
	}

	function copyText() {
		navigator.clipboard.writeText(plaintext)
	}

	return (
		<>
			<div className="w-8">{account.id}</div>
			<div className="w-2/12">{account.website}</div>
			<div className="w-2/12">{account.username}</div>
			<div className="flex gap-2">
				{!plaintext ? (
					<button onClick={once(fetchPlaintext)}>
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
