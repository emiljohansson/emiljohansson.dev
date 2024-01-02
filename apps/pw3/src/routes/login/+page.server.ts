import { createClient } from '$lib/supabaseClient'
import { redirect, type Actions } from '@sveltejs/kit'

export async function load({ cookies }) {
	const supabase = createClient(cookies)
	const {
		data: { user },
	} = await supabase.auth.getUser()

	if (user) {
		throw redirect(302, '/')
	}

	return {}
}

export const actions: Actions = {
	default: async ({ request, cookies }) => {
		const formData = await request.formData()
		const email = formData.get('email') as string
		const password = formData.get('password') as string
		console.log({ email, password })

		if (!email || !password) {
			return {
				status: 400,
				body: {
					error: 'Email and password must be provided',
				},
			}
		}
		const supabase = createClient(cookies)

		const { error, data } = await supabase.auth.signInWithPassword({
			email,
			password,
		})
		console.log({ error, data })
		if (error) {
			return {
				status: 400,
				body: {
					error: error.message,
				},
			}
		}
		throw redirect(302, '/')
	},
}
