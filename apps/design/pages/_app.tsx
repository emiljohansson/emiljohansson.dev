import type { AppProps } from 'next/app'
import Head from 'next/head'
import 'ui/globals.css'
import '../styles/styles.css'

export default function App({ Component, pageProps }: AppProps) {
	return (
		<>
			<Head>
				<script
					dangerouslySetInnerHTML={{
						__html:
							"document.documentElement.classList.toggle('dark', localStorage.theme === 'dark')",
					}}
				/>
			</Head>
			<Component {...pageProps} />
		</>
	)
}
