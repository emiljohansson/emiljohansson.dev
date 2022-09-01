import Head from 'next/head'
import Layout from '@/components/Layout'
import ProgressBar from '@/components/ProgressBar'
import Header from 'shared/Header'
import Content from '@/components/Content'
import Section from '@/components/Section'

const ProgressBarPage = () => (
  <Layout>
    <Head>
      <title>Progress Bar</title>
      <meta name="description" content="Progress bar" />
    </Head>
    <Content>
      <Header />
      <Section size="normal">
        <h1 className="sr-only">Progress bar</h1>
        <ProgressBar />
      </Section>
    </Content>
  </Layout>
)

export default ProgressBarPage
