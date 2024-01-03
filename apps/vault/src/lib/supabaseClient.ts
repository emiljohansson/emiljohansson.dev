import type { Cookies } from '@sveltejs/kit'
import { createServerClient } from '@supabase/ssr'
import {
	PUBLIC_SUPABASE_URL,
	PUBLIC_SUPABASE_ANON_KEY,
} from '$env/static/public'

export const createClient = (cookies: Cookies) => {
	return createServerClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
		cookies: {
			get(cookieName: string) {
				return cookies.get(cookieName)
			},
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			set(cookieName: string, cookieValue: string, options: any) {
				cookies.set(cookieName, cookieValue, options)
			},
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			remove(cookieName: string, options: any) {
				cookies.delete(cookieName, options)
			},
		},
	})
}
