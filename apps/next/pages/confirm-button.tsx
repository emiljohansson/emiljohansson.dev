import { useState } from 'react'
import Head from 'next/head'
import Layout from '@/components/Layout'
import Content from '@/components/Content'
import ConfirmButton from '@/components/ConfirmButton'
import Section from '@/components/Section'
import Header from 'shared/Header'

const ConfirmButtonPage = () => {
  const [confirmed, setConfirmed] = useState(false)
  return (
    <Layout>
      <Head>
        <title>Confirm button</title>
        <meta name="description" content="Confirm button" />
      </Head>
      <Content>
        <h1 className="sr-only">Confirm Button</h1>
        <Header />
        <Section>
          <div className="flex flex-col text-center">
            <ConfirmButton onComfirm={() => setConfirmed(true)} />
            <div>Submitted: {confirmed.toString()}</div>
          </div>
        </Section>
      </Content>
    </Layout>
  )
}

export default ConfirmButtonPage
