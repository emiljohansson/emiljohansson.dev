import Head from 'next/head'
import Layout from '../components/Layout'
import ProgressBar from '../components/ProgressBar'

const SecondPage = () => (
  <Layout>
    <Head>
      <title>Progress Bar</title>
      <meta name="description" content="Progress bar" />
    </Head>
    <ProgressBar />
  </Layout>
)

export default SecondPage
