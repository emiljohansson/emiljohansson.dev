import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { AccountRow } from './AccountRow'

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
	console.log({ user, accounts })

	return (
		<div className="flex-1 flex flex-col w-full p-8 gap-2">
			{accounts?.map((account, index) => (
				<div key={index} className="flex gap-4">
					<AccountRow account={account} secret="test" />
				</div>
			))}
		</div>
	)
}
