'use client'

import type { Account } from './types'
import { AccountRow } from './AccountRow'
import { useState } from 'react'
import { useStore } from '../store'

export function Accounts({ accounts }: { accounts: Account[] }) {
	const { secret, setSecret } = useStore()
	const [filter, setFilter] = useState('')

	return (
		<>
			Secret: {secret}
			<div className="flex w-full">
				<input
					type="text"
					placeholder="Secret"
					className="w-full p-4"
					value={secret}
					onChange={({ target }) => {
						setSecret(target.value)
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
							<AccountRow account={account} />
						</div>
					))}
			</div>
		</>
	)
}
