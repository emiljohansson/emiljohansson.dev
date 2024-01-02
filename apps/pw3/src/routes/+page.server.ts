import type { Actions } from '@sveltejs/kit'
import pkg from 'crypto-js'
import { ENCRYPT_SECRET } from '$env/static/private'
import { createClient } from '$lib/supabaseClient'

const { AES, enc } = pkg

export async function load({ cookies }) {
	const supabase = createClient(cookies)
	const {
		data: { user },
	} = await supabase.auth.getUser()
	const { data } = await supabase
		.from('account')
		.select('*')
		.eq('user_id', user?.id)
	return {
		user,
		accounts: data ?? [],
	}
}

export const actions: Actions = {
	logout: async ({ cookies }) => {
		const supabase = createClient(cookies)
		await supabase.auth.signOut()
	},
	plaintext: async ({ request, cookies }) => {
		const formData = await request.formData()
		const secret = formData.get('secret') as string
		const password = formData.get('password') as string
		console.log({ secret, password })

		const supabase = createClient(cookies)
		const {
			data: { user },
		} = await supabase.auth.getUser()

		const step3 = AES.decrypt(password, ENCRYPT_SECRET).toString(enc.Utf8)
		const step2 = AES.decrypt(step3, user?.id || '').toString(enc.Utf8)
		const step1 = AES.decrypt(step2, secret).toString(enc.Utf8)

		return step1
	},
	'add-account': async ({ request, cookies }) => {
		const formData = await request.formData()
		const website = formData.get('website') as string
		const username = formData.get('username') as string
		const password = formData.get('password') as string
		const secret = formData.get('secret') as string
		console.log({ website, username, password, secret })

		const supabase = createClient(cookies)
		const {
			data: { user },
		} = await supabase.auth.getUser()
		const { data: keysData } = await supabase
			.from('key')
			.select('id')
			.eq('user_id', user?.id)
			.single()
		const keyId = keysData?.id

		if (secret !== keyId) {
			return {
				status: 400,
				body: {
					error: 'Secret does not match',
				},
			}
		}

		const step1 = AES.encrypt(password, secret).toString()
		const step2 = AES.encrypt(step1, user?.id || '').toString()
		const step3 = AES.encrypt(step2, ENCRYPT_SECRET).toString()

		const { data } = await supabase.from('account').insert([
			{
				website,
				username,
				password: step3,
				user_id: user?.id,
			},
		])
		return data
	},
}
