import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { AES } from 'crypto-js'
import { createClient } from '@/utils/supabase/server'
import { AddAccount } from './AddAccount'

async function savePassword(formData: FormData) {
	'use server'
	const cookieStore = cookies()
	const supabase = createClient(cookieStore)
	const {
		data: { user },
	} = await supabase.auth.getUser()

	console.log({ user })
	if (!user) {
		redirect('/login')
	}

	const secret = formData.get('secret') as string
	const website = formData.get('website') as string
	const username = formData.get('username') as string
	const actualPassword = formData.get('password') as string

	const step1 = AES.encrypt(actualPassword, secret).toString()
	const step2 = AES.encrypt(step1, user.id).toString()
	const password = AES.encrypt(step2, process.env.ENCRYPT_SECRET).toString()

	console.log(password)
	console.log({ secret, website, username, password })

	await supabase.from('account').insert({
		userId: user.id,
		website,
		username,
		password,
	})

	return {
		success: true,
	}
}

export default function AddPage() {
	return (
		<>
			<nav>
				<a href="/">Home</a>
				<a href="/accounts">Accounts</a>
			</nav>
			<h1 className="heading1">Add account</h1>
			<form action={savePassword} method="post">
				<AddAccount />
			</form>
		</>
	)
}
