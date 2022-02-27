
import Head from 'next/head'
import Layout from '@/components/Layout'
import Section from '@/components/Section'
import Header from '@/components/Header'
import Content from '@/components/Content'
import MineSweaper from '@/components/ms/MineSweaper'

const MSPage = () => {
  return (
    <Layout>
      <Head>
        <title>ms</title>
        <meta name="description" content="ms" />
        <link
          rel="preload"
          href="/fonts/MuseoModerno-Light.ttf"
          as="font"
          crossOrigin=""
        />
      </Head>
      <Content>
        <Header />
        <Section direction="column">
          <MineSweaper />
        </Section>
      </Content>
    </Layout>
  )
}

export default MSPage
