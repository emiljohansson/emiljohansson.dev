import type { PageServerLoad } from './$types'
import type { Account } from '$lib/types'
import { redirect, type Actions, fail, type Cookies } from '@sveltejs/kit'
import pkg from 'crypto-js'
import { ENCRYPT_SECRET } from '$env/static/private'
import { createClient } from '$lib/supabaseClient'

const { AES, enc } = pkg

function getKey(cookies: Cookies) {
	const key = cookies.get('key')
	if (!key) {
		return null
	}
	return AES.decrypt(key, ENCRYPT_SECRET).toString(enc.Utf8)
}

export const load: PageServerLoad = async ({ cookies }) => {
	const supabase = createClient(cookies)
	const {
		data: { user },
	} = await supabase.auth.getUser()

	if (!user) {
		redirect(302, '/login')
	}

	const { data } = await supabase
		.from('account')
		.select('*')
		.eq('user_id', user?.id)
	const key = getKey(cookies)
	return {
		user,
		key,
		accounts: (data ?? []) as Account[],
	}
}

export const actions = {
	logout: async ({ cookies }) => {
		const supabase = createClient(cookies)
		await supabase.auth.signOut()
	},
	plaintext: async ({ request, cookies }) => {
		const formData = await request.formData()
		const key = getKey(cookies)
		const password = formData.get('password') as string
		console.log({ secret: key, password })

		const supabase = createClient(cookies)
		const {
			data: { user },
		} = await supabase.auth.getUser()

		if (!key || !user) {
			return fail(400)
		}

		const step3 = AES.decrypt(password, ENCRYPT_SECRET).toString(enc.Utf8)
		const step2 = AES.decrypt(step3, user?.id || '').toString(enc.Utf8)
		const step1 = AES.decrypt(step2, key).toString(enc.Utf8)

		if (!step1) {
			return fail(400)
		}

		return step1
	},
	'add-account': async ({ request, cookies }) => {
		const formData = await request.formData()
		const website = formData.get('website') as string
		const username = formData.get('username') as string
		const password = formData.get('password') as string
		const key = getKey(cookies)
		console.log({ website, username, password, secret: key })

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

		if (!key || key !== keyId) {
			return fail(400)
		}

		const step1 = AES.encrypt(password, key).toString()
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
} satisfies Actions
