import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import 'shared/globals.css'

function App ({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <main className="prose dark:prose-invert">
        <Component {...pageProps} />
      </main >
    </SessionProvider>
  )
}

export default App
