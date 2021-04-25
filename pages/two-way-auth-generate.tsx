import Head from 'next/head'
import Layout from '../components/Layout'
import TwoWayAuthGenerate from '../components/TwoWayAuthGenerate'

const SecondPage = () => (
  <Layout>
    <Head>
      <title>Generate Two-Factor Authentication</title>
      <meta name="description" content="Generate two-factor authentication" />
    </Head>
    <TwoWayAuthGenerate />
  </Layout>
)

export default SecondPage
