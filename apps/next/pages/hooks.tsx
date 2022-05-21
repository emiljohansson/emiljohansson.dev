import Head from 'next/head'
import { useEffect, useState } from 'react'
import Layout from '@/components/Layout'
import Header from '@/components/Header'
import Content from '@/components/Content'
import Section from '@/components/Section'

const useDebounceValue = <T, >(value: T, delay = 300) => {
  const [debouncedValue, setDebouncedValue] = useState(value)
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)
    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])
  return [debouncedValue]
}

const HooksPage = () => {
  const [value, setValue] = useState('')
  const [debounced] = useDebounceValue(value, 200)

  return (
    <Layout>
      <Head>
        <title>Hooks</title>
        <meta name="description" content="Progress bar" />
      </Head>
      <Content>
        <Header />
        <Section size="large">
          <h1 className="sr-only">Hooks</h1>
          <input type="text" value={value} onChange={(e) => setValue(e.target.value)} />
          <p>Value: {value}</p>
          <p>Debounced: {debounced}</p>
        </Section>
      </Content>
    </Layout>
  )
}

export default HooksPage
