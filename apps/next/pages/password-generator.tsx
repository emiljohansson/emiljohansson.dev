import { NextPage } from 'next'
import Head from 'next/head'
import { ChangeEvent, PropsWithChildren, useState } from 'react'
import * as Tabs from '@radix-ui/react-tabs'
import useSWR from 'swr'
import Content from '@/components/Content'
import Header from '@/components/Header'
import Layout from '@/components/Layout'
import Section from '@/components/Section'

interface Selection {
  length: number
  numeric: boolean
  symbols: boolean
}

const lettersPattern = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
const numericPattern = '0123456789'
const symbolsPattern = ',._?-:]&*#~}$>(<)@^|{%!+='

const randomString = (props?: {
  length?: number
  letters?: boolean
  numeric?: boolean
  symbols?: boolean
}) => {
  const {
    length,
    letters,
    numeric,
    symbols,
  } = {
    length: 10,
    letters: true,
    numeric: true,
    symbols: false,
    ...props,
  }
  const pattern = [
    letters && lettersPattern,
    numeric && numericPattern,
    symbols && symbolsPattern,
  ].filter(v => !!v).join('')
  let value = ''
  let index = length

  while (index--) {
    const charIndex = Math.floor(Math.random() * pattern.length)
    value += pattern[charIndex]
  }

  return value
}

const Trigger = ({ value, children }: PropsWithChildren<{ value: string }>) => (
  <Tabs.Trigger
    value={value}
    className="
      bg-white
      px-5
      h-11
      flex
      flex-1
      items-center
      justify-center
      text-sm
      leading-none
      select-none
      first:rounded-t-md
      last:rounded-t-md
      hover:text-primary
      hover:shadow-inner
      focus:shadow-sm
    "
  >
    { children }
  </Tabs.Trigger>
)

const fetchWords = async (url: string) => {
  const words = await (await fetch(url)).json() as string[]
  return words.join('-')
}

const PasswordGeneratorPage: NextPage = () => {
  const [randomSelection, setRandomSelection] = useState<Selection>({
    length: 20,
    numeric: false,
    symbols: false,
  })
  const [randomPassword, setRandomPassword] = useState(randomString(randomSelection))
  const [numberOfWords, setNumberOfWords] = useState(4)
  const { data: memorablePassword } = useSWR(`/api/random-words?words=${numberOfWords}`, fetchWords)
  const [pinSelection, setPinSelection] = useState({
    length: 6,
    letters: false,
    numeric: true,
    symbols: false,
  })
  const [pin, setPin] = useState(randomString(pinSelection))

  const onLengthChanged = (event: ChangeEvent<HTMLInputElement>) => {
    let value = parseInt(event.currentTarget.value, 10)
    if (value < 8) value = 8
    if (value > 100) value = 100
    if (value === randomSelection.length) return

    updateRandomSelection({
      ...randomSelection,
      length: isNaN(value)
        ? 1
        : value,
    })
  }

  const onNumericToggled = (event: ChangeEvent<HTMLInputElement>) => {
    updateRandomSelection({
      ...randomSelection,
      numeric: event.currentTarget.checked,
    })
  }

  const onSymbolsToggled = (event: ChangeEvent<HTMLInputElement>) => {
    updateRandomSelection({
      ...randomSelection,
      symbols: event.currentTarget.checked,
    })
  }

  const updateRandomSelection = (newSelection: Selection) => {
    setRandomSelection(newSelection)
    setRandomPassword(randomString(newSelection))
  }

  const onNumberOfWordsChanged = (event: ChangeEvent<HTMLInputElement>) => {
    let value = parseInt(event.currentTarget.value, 10)
    if (value < 3) {
      value = 3
    }
    if (value > 15) {
      value = 15
    }

    setNumberOfWords(isNaN(value)
      ? 1
      : value,
    )
  }

  const onPinLengthChanged = (event: ChangeEvent<HTMLInputElement>) => {
    let value = parseInt(event.currentTarget.value, 10)
    if (value < 3) value = 3
    if (value > 12) value = 12
    if (value === pinSelection.length) return

    const newSelection = {
      ...pinSelection,
      length: isNaN(value)
        ? 1
        : value,
    }
    setPinSelection(newSelection)
    setPin(randomString(newSelection))
  }

  return (
    <Layout>
      <Head>
        <title>Password Generator</title>
        <meta name="description" content="Password Generator" />
      </Head>
      <Content>
        <Header />
        <Section size="normal" direction="column">
          <h1 className="sr-only">Password Generator</h1>
          <div>
            <Tabs.Root defaultValue="random-tab" className="flex flex-col w-80 shadow">
              <Tabs.List className="flex shrink-0 bottom-px border-gray-200">
                <Trigger value="random-tab">Random Password</Trigger>
                <Trigger value="memorable-tab">Memorable Password</Trigger>
                <Trigger value="pin-tab">PIN</Trigger>
              </Tabs.List>
              <Tabs.Content value="random-tab">
                <h2>Random password</h2>
                <input className="input w-full" type="text" value={randomPassword} readOnly />
                <fieldset>
                  <label>
                    <input type="number" value={randomSelection.length} onChange={onLengthChanged} />
                  </label>
                  <label>
                    <input type="checkbox" checked={randomSelection.numeric} onChange={onNumericToggled} /> Number
                  </label>
                  <label>
                    <input type="checkbox" checked={randomSelection.symbols} onChange={onSymbolsToggled} /> Symbols
                  </label>
                </fieldset>
              </Tabs.Content>
              <Tabs.Content value="memorable-tab">
                <h2>Memorable password</h2>
                <input className="w-full" type="text" value={memorablePassword} readOnly />
                <fieldset>
                  <label>
                    <input type="number" value={numberOfWords} onChange={onNumberOfWordsChanged} />
                  </label>
                </fieldset>
              </Tabs.Content>
              <Tabs.Content value="pin-tab">
                <h2>PIN</h2>
                <input className="w-full" type="text" value={pin} readOnly />
                <fieldset>
                  <label>
                    <input type="number" value={pinSelection.length} onChange={onPinLengthChanged} />
                  </label>
                </fieldset>
              </Tabs.Content>
            </Tabs.Root>
          </div>
        </Section>
      </Content>
    </Layout>
  )
}

export default PasswordGeneratorPage
