import Layout from '@/components/Layout'
import type { AppProps } from 'next/app'
import 'shared/globals.css'
import '../styles/globals.css'

function MyApp ({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
