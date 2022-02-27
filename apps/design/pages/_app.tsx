import { AppProps } from 'next/app'
import Script from 'next/script'
import '../styles/globals.css'

export default function App ({ Component, pageProps }: AppProps) {
  return (
    <>
      <Script id="dark-mode" strategy="beforeInteractive" src="dark-mode.js" />
      <Component {...pageProps} />
    </>
  )
}
