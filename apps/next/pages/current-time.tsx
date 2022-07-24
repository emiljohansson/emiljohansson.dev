import Head from 'next/head'
import { getCurrentTime } from 'lib/utils/date'
import { Time } from 'types/time'
import Layout from '@/components/Layout'
import CurrentTime from '@/components/CurrentTime'
import Header from '@/components/Header'
import Content from '@/components/Content'
import Section from '@/components/Section'

export async function getServerSideProps () {
  return {
    props: {
      value: getCurrentTime(),
    },
  }
}

const CurrentTimePage = ({ value }: { value: Time }) => {
  return (
    <Layout>
      <Head>
        <title>Current Time</title>
        <meta name="description" content="Current Time" />
      </Head>
      <Content>
        <Header />
        <Section size="large">
          <CurrentTime initialValue={value} />
        </Section>
      </Content>
    </Layout>
  )
}

export default CurrentTimePage
