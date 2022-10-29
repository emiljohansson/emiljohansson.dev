import Head from 'next/head'
import Link from 'next/link'
import Layout from '@/components/Layout'

const NotFoundPage = () => (
  <Layout>
    <Head>
      <title>404: Not found</title>
    </Head>
    <h1>NOT FOUND</h1>
    <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
    <Link href="/">
      Home
    </Link>
  </Layout>
)

export default NotFoundPage
