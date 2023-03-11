import type { GetServerSideProps, NextPage } from 'next'
import Link from 'next/link'
import { useState } from 'react'
import {
	getUser,
	supabaseServerClient,
	withPageAuth,
} from '@supabase/auth-helpers-nextjs'
import { Account } from '../@types/accounts'

export const getServerSideProps: GetServerSideProps = withPageAuth({
	redirectTo: '/login',
	async getServerSideProps(ctx) {
		// Access the user object
		const { user } = await getUser(ctx)
		// Run queries with RLS on the server
		const { data: accounts } = await supabaseServerClient(ctx)
			.from<Account>('account')
			.select('website, username, password')
			.eq('userId', user.id)

		return {
			props: {
				accounts,
				secret: ctx.query.secret,
			},
		}
	},
})

const AccountsPage: NextPage<{ accounts: Account[]; secret: string }> = ({
	accounts,
	secret,
}) => {
	return (
		<>
			<h1>Accounts</h1>
			<Link
				href={{
					pathname: '/add-account',
					query: { secret },
				}}
				className="btn-primary"
			>
				Add account
			</Link>
			<table className="table-auto">
				<thead>
					<tr>
						<th></th>
						<th>Website</th>
						<th>Username</th>
						<th>Password</th>
					</tr>
				</thead>
				<tbody>
					{accounts.map((account, index) => (
						<tr key={index}>
							<td>{index + 1}</td>
							<AccountRow account={account} secret={secret} />
						</tr>
					))}
				</tbody>
			</table>
		</>
	)
}

const AccountRow = ({
	account,
	secret,
}: {
	account: Account
	secret: string
}) => {
	const [plaintext, setPlaintext] = useState('')

	const fetchPlaintext = async () => {
		const { data } = await fetch('/api/plaintext', {
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

	return (
		<>
			<td>{account.website}</td>
			<td>{account.username}</td>
			<td onClick={fetchPlaintext}>{account.password.substring(0, 15)}...</td>
			<td>{plaintext}</td>
		</>
	)
}

export default AccountsPage
