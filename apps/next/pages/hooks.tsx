import Head from 'next/head'
import { useEffect, useRef, useState } from 'react'
import randomString from '@emiljohansson/random-string'
import Layout from '@/components/Layout'
import Header from 'shared/Header'
import Content from '@/components/Content'
import Section from '@/components/Section'
import { clamp } from 'lib/utils/number'

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

const useCounter = (initialValue = 0, options?: Partial<{
  min: number
  max: number
}>) => {
  const { min, max } = { min: -Infinity, max: Infinity, ...options }
  const [count, setCount] = useState(clamp(initialValue, min, max))

  const increment = () => setCount(clamp(count + 1, min, max))
  const decrement = () => setCount(clamp(count - 1, min, max))
  const reset = () => setCount(clamp(initialValue, min, max))
  const set = (newValue: number) => setCount(clamp(newValue, min, max))

  return [count, increment, decrement, reset, set] as const
}

function useEventListener<T extends HTMLElement> (eventName: string, handler: (event: Event) => void) {
  const ref = useRef<T>()

  useEffect(() => {
    if (ref.current) {
      ref.current.addEventListener(eventName, handler)
      return () => {
        ref.current?.removeEventListener(eventName, handler)
      }
    }
  }, [eventName, handler])

  return ref
}

const useRandomString = (initialValue?: string) => {
  const [value, setValue] = useState(initialValue ?? randomString())

  function generate () {
    setValue(randomString())
  }

  return { value, generate }
}

export async function getServerSideProps () {
  return {
    props: {
      initialRandomValue: randomString(),
    },
  }
}

const HooksPage = ({ initialRandomValue }: { initialRandomValue: string }) => {
  const { value: random, generate } = useRandomString(initialRandomValue)
  const [value, setValue] = useState('')
  const [debounced] = useDebounceValue(value, 200)
  const [count, increment, decrement, reset, set] = useCounter(0, { min: 0, max: 10 })
  const randomRef = useEventListener<HTMLParagraphElement>('click', generate)
  const listenerExampleRef = useEventListener<HTMLButtonElement>('click', increment)

  return (
    <Layout>
      <Head>
        <title>Hooks</title>
        <meta name="description" content="Progress bar" />
      </Head>
      <Content>
        <Header />
        <Section size="normal">
          <h1 className="sr-only">Hooks</h1>
          <article className="flex flex-col gap-4">
            <article>
              <h2>Random String</h2>
              <p ref={randomRef}>{random}</p>
            </article>
            <article>
              <h2>Debounce</h2>
              <input className="input" type="text" value={value} onChange={(e) => setValue(e.target.value)} />
              <p>Value: {value}</p>
              <p>Debounced: {debounced}</p>
            </article>
            <article>
              <h2>Counter</h2>
              <p>Count: {count}</p>
              <div className="flex">
                <button className="btn-secondary" onClick={() => increment()}>Increment</button>
                <button className="btn-secondary" onClick={() => decrement()}>Decrement</button>
                <button className="btn-secondary" onClick={() => reset()}>Reset</button>
                <button className="btn-secondary" onClick={() => set(5)}>Set 5</button>
              </div>
            </article>
            <article>
              <h2>Event Listener</h2>
              <button className="btn-primary" ref={listenerExampleRef}>Increment {count}</button>
            </article>
          </article>
        </Section>
      </Content>
    </Layout>
  )
}

export default HooksPage
