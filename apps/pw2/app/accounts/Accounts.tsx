'use client'

import type { Account } from './types'
import { useSignal } from 'lib/hooks/signals'
import { AccountRow } from './AccountRow'
import { useState } from 'react'

export function Accounts({ accounts }: { accounts: Account[] }) {
	const secret = useSignal('')
	const [filter, setFilter] = useState('')

	return (
		<>
			<div className="flex w-full">
				<input
					type="text"
					placeholder="Secret"
					className="w-full p-4"
					onChange={({ target }) => {
						secret.value = target.value
					}}
				/>
				<input
					type="text"
					placeholder="filter"
					className="w-full p-4"
					onChange={({ target }) => {
						setFilter(target.value)
					}}
				/>
			</div>
			<div className="flex-1 flex flex-col w-full p-8 gap-2">
				{accounts
					.filter((account) => account.website.includes(filter))
					.map((account, index) => (
						<div key={index} className="flex gap-4">
							<AccountRow account={account} secret="test" />
						</div>
					))}
			</div>
		</>
	)
}
