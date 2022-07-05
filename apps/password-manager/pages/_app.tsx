import type { AppProps } from 'next/app'
import 'shared/globals.css'

function MyApp ({ Component, pageProps }: AppProps) {
  return (
    <main className="prose dark:prose-invert">
      <Component {...pageProps} />
    </main>
  )
}

export default MyApp
