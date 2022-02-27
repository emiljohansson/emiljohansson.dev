import Head from 'next/head'
import randomString from '@emiljohansson/random-string'
import Layout from '@/components/Layout'
import RandomString from '@/components/RandomString'

export async function getServerSideProps () {
  return {
    props: {
      value: randomString(),
    },
  }
}

const RandomStringPage = ({ value }: { value: string }) => {
  return (
    <Layout>
      <Head>
        <title>Random String</title>
        <meta name="description" content="Genrates a random string" />
      </Head>
      <RandomString initialValue={value} />
    </Layout>
  )
}

export default RandomStringPage
