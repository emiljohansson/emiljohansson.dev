import Head from 'next/head'
import useCurrentTime from 'lib/hooks/useCurrentTime'
import Layout from '@/components/Layout'
import Header from 'shared/Header'
import Content from '@/components/Content'
import Section from '@/components/Section'

const CurrentTimePage = () => {
  const { hours, minutes, meridiem } = useCurrentTime()

  return (
    <Layout>
      <Head>
        <title>Current Time</title>
        <meta name="description" content="Current Time" />
      </Head>
      <Content>
        <Header />
        <Section size="large">
          <style jsx>{`
            .meridiem {
              margin-bottom: -18px;
            }
          `}</style>

          {hours}:{minutes}
          <span className="text-3/6 meridiem">{meridiem}</span>
        </Section>
      </Content>
    </Layout>
  )
}

export default CurrentTimePage
