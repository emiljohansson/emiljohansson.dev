import type { AppProps } from 'next/app'
import { UserProvider } from '@supabase/auth-helpers-react'
import { supabaseClient } from '@supabase/auth-helpers-nextjs'
import 'ui/globals.css'
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<UserProvider supabaseClient={supabaseClient}>
			<main className="">
				<Component {...pageProps} />
			</main>
		</UserProvider>
	)
}

export default MyApp
