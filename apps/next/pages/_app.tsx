import Script from 'next/script'
import '../styles/globals.css'
import GlobalStyles from '@/components/GlobalStyles'
import { AppProps } from 'next/app'

export default function App ({ Component, pageProps }: AppProps) {
  return (
    <>
      <Script id="dark-mode" strategy="beforeInteractive" src="dark-mode.js" />
      <GlobalStyles />
      <Component {...pageProps} />
    </>
  )
}
