import { NextPage } from 'next'
import Head from 'next/head'
import { ChangeEvent, PropsWithChildren, useState } from 'react'
import * as Tabs from '@radix-ui/react-tabs'
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
  console.log({
    length,
    letters,
    numeric,
    symbols,
  })

  const pattern = [
    letters && lettersPattern,
    numeric && numericPattern,
    symbols && symbolsPattern,
  ].filter(v => !!v).join('')
  console.log(pattern)

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
    {/* '&:focus': { position: 'relative', boxShadow: `0 0 0 2px black` }, */}

    { children }
  </Tabs.Trigger>
)

const PasswordGeneratorPage: NextPage = () => {
  const [selection, setSelection] = useState<Selection>({
    length: 10,
    numeric: false,
    symbols: false,
  })
  const [randomPassword, setRandomPassword] = useState(randomString(selection))

  const onLengthChanged = (event: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.currentTarget.value, 10)

    updateSelection({
      ...selection,
      length: isNaN(value)
        ? 0
        : value,
    })
  }

  const onNumericToggled = (event: ChangeEvent<HTMLInputElement>) => {
    updateSelection({
      ...selection,
      numeric: event.currentTarget.checked,
    })
  }

  const onSymbolsToggled = (event: ChangeEvent<HTMLInputElement>) => {
    updateSelection({
      ...selection,
      symbols: event.currentTarget.checked,
    })
  }

  const updateSelection = (newSelection: Selection) => {
    setSelection(newSelection)
    setRandomPassword(randomString(newSelection))
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
                <input className="w-full" type="text" value={randomPassword} readOnly />
                <fieldset>
                  <label>
                    <input type="number" value={selection.length} onChange={onLengthChanged} />
                  </label>
                  <label>
                    <input type="checkbox" checked={selection.numeric} onChange={onNumericToggled} /> Number
                  </label>
                  <label>
                    <input type="checkbox" checked={selection.symbols} onChange={onSymbolsToggled} /> Symbols
                  </label>
                </fieldset>
              </Tabs.Content>
              <Tabs.Content value="memorable-tab">
              </Tabs.Content>
              <Tabs.Content value="pin-tab">
              </Tabs.Content>
            </Tabs.Root>
          </div>
        </Section>
      </Content>
    </Layout>
  )
}

export default PasswordGeneratorPage
