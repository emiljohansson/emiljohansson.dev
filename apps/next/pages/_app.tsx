import Script from 'next/script'
import '../styles/globals.css'
import GlobalStyles from '@/components/GlobalStyles'

export default function App ({ Component, pageProps }) {
  return (
    <>
      <Script id="dark-mode" strategy="beforeInteractive" src="dark-mode.js" />
      <GlobalStyles />
      <Component {...pageProps} />
    </>
  )
}
