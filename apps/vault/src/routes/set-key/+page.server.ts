import { redirect, type Actions } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'
import { ENCRYPT_SECRET } from '$env/static/private'
import pkg from 'crypto-js'
import { createClient } from '$lib/supabaseClient'

const { AES, enc } = pkg

export const load: PageServerLoad = async ({ cookies }) => {
	const supabase = createClient(cookies)
	const {
		data: { user },
	} = await supabase.auth.getUser()

	if (!user) {
		redirect(302, '/login')
	}

	const key = AES.decrypt(cookies.get('key') ?? '', ENCRYPT_SECRET).toString(
		enc.Utf8,
	)

	return { key }
}

export const actions = {
	'set-key': async ({ request, cookies }) => {
		const formData = await request.formData()
		const key = AES.encrypt(
			formData.get('key') as string,
			ENCRYPT_SECRET,
		).toString()

		cookies.set('key', key, {
			path: '/',
			sameSite: 'strict',
			secure: false,
			httpOnly: true,
		})

		redirect(302, '/')
	},
} satisfies Actions
