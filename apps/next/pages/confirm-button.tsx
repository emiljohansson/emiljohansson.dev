import { useState } from 'react'
import Head from 'next/head'
import { styled } from '@/stitches'
import Layout from '@/components/Layout'
import Content from '@/components/Content'
import ConfirmButton from '@/components/ConfirmButton'
import Section from '@/components/Section'
import Header from '@/components/Header'

const spacers = {
  0: 0,
  1: 0.25,
  2: 0.5,
  3: 1,
  4: 1.25,
  5: 1.5,
  6: 2,
}

const createSpacingFn = (parameters) => (spacer) => {
  const value = spacers[spacer]

  return parameters.reduce((result, param) => {
    result[param] = `${value}rem`
    return result
  }, {})
}
const mx = createSpacingFn(['marginLeft', 'marginRight'])
// const mt = createSpacingFn(['margin-top']);
// const m = createSpacingFn(['margin']);
// const px = createSpacingFn(['padding-left', 'padding-right']);

const FlexColumn = styled('div', {
  ...mx(2),
  display: 'flex',
  flexDirection: 'column',
  textAlign: 'center',
})

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
          <FlexColumn>
            <ConfirmButton onComfirm={() => setConfirmed(true)} />
            <div>Submitted: {confirmed.toString()}</div>
          </FlexColumn>
        </Section>
      </Content>
    </Layout>
  )
}

export default ConfirmButtonPage
