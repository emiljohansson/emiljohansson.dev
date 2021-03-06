import Layout from '../components/Layout'
import CurrentTime from '../components/CurrentTime'
import Head from 'next/head'
import getCurrentTime from '../lib/getCurrentTime'

export async function getServerSideProps() {
  return {
    props: {
      value: getCurrentTime()
    }
  }
}

const CurrentTimePage = ({ value }) => {
  return (
    <Layout>
      <Head>
        <title>Current Time</title>
        <meta name="description" content="Current Time" />
      </Head>
      <CurrentTime
        initialValue={value}
      />
    </Layout>
  )
}

export default CurrentTimePage
