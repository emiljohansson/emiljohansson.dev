import Head from 'next/head'
import Layout from '@/components/Layout'
import CurrentTime from '@/components/CurrentTime'
import getCurrentTime from 'lib/src/getCurrentTime'

export async function getServerSideProps () {
  return {
    props: {
      value: getCurrentTime(),
    },
  }
}

const CurrentTimePage = ({ value }) => {
  return (
    <Layout>
      <Head>
        <title>Current Time</title>
        <meta name="description" content="Current Time" />
      </Head>
      <CurrentTime initialValue={value} />
    </Layout>
  )
}

export default CurrentTimePage
