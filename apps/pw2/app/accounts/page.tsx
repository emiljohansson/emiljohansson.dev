import type { Account } from './types'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { Accounts } from './Accounts'

export default async function AccountsPage() {
	const cookieStore = cookies()
	const supabase = createClient(cookieStore)

	const {
		data: { user },
	} = await supabase.auth.getUser()
	if (!user) {
		redirect('/login')
	}
	const { data: accounts } = await supabase
		.from('account')
		.select('*')
		.eq('userId', user.id)
		.returns<Account[]>()
	console.log({ user, accounts })

	return (
		<>
			<nav>
				<a href="/">Home</a>
				<a href="/add">Add account</a>
			</nav>
			<h1 className="heading1">Accounts</h1>
			<Accounts accounts={accounts || []} />
		</>
	)
}
