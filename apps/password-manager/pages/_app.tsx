import type { AppProps } from 'next/app'

import 'ui/globals.css'
import '../styles/globals.css'

import { UserProvider } from '@supabase/auth-helpers-react'
import { supabaseClient } from '@supabase/auth-helpers-nextjs'
import { Inter } from 'next/font/google'

const inter = Inter({ weight: ['400', '500', '700'], subsets: ['latin'] })

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<UserProvider supabaseClient={supabaseClient}>
			<main className={inter.className}>
				<Component {...pageProps} />
			</main>
		</UserProvider>
	)
}

export default MyApp
