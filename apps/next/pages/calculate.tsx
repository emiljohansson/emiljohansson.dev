import Head from 'next/head'
import { FormEvent, useState } from 'react'
import Content from '@/components/Content'
import Layout from '@/components/Layout'
import Section from '@/components/Section'
import Header from '@/components/Header'

const Calculate = () => {
  const [sum, setSum] = useState(0)

  const calculate = async (event: FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget
    const formElements = form.elements as typeof form.elements & {
      q: {
        value: string
      }
    }

    event.preventDefault()

    const res = await fetch('/api/calculate', {
      body: JSON.stringify({
        q: formElements.q.value,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    })

    const result = await res.json()
    setSum(result.sum)
  }

  return (
    <Layout>
      <Head>
        <title>Calculate</title>
        <meta name="description" content="Calculate" />
      </Head>
      <Content>
        <Header />
        <Section size="normal">
          <h1 className="sr-only">Calculate</h1>
          <form onSubmit={calculate} action="/api/calculate" method="post">
            <div>
              <input className="input" type="text" name="q" aria-label="Query" /> = <span data-test-id="sum">{sum}</span>
            </div>
            <button type="submit">Calculate</button>
          </form>
        </Section>
      </Content>
    </Layout>
  )
}

export default Calculate
