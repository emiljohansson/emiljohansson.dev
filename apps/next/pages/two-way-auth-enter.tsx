import Head from 'next/head'
import Layout from '@/components/Layout'
import TwoWayAuthEnter from '@/components/TwoWayAuthEnter'

const TwoWayAuthEnterPage = () => (
  <Layout>
    <Head>
      <title>Enter Two-Factor Authentication</title>
      <meta name="description" content="Enter two-factor authentication" />
    </Head>
    <TwoWayAuthEnter />
  </Layout>
)

export default TwoWayAuthEnterPage
