import { useState, useRef } from 'react'
import { CopyIcon, UpdateIcon } from '@radix-ui/react-icons'
import randomString from '@emiljohansson/random-string'
import Header from './Header'
import HeaderAction from './HeaderAction'
import Content from './Content'
import Section from './Section'

function copyToClipboard (el: HTMLInputElement | null) {
  if (!el) {
    return
  }
  el.select()
  document.execCommand('copy')
  el.selectionEnd = el.selectionStart
}

function RandomString ({ initialValue }: { initialValue: string }) {
  const [value, setValue] = useState(initialValue)
  const inputEl = useRef(null)

  return (
    <Content>
      <Header>
        <HeaderAction onClick={() => setValue(randomString())} data-test="refresh">
          <UpdateIcon width={30} height={30} />
          <span className="sr-only">Refresh</span>
        </HeaderAction>
        <HeaderAction onClick={() => copyToClipboard(inputEl.current)} data-test="copy">
          <CopyIcon width={30} height={30} />
          <span className="sr-only">Copy</span>
        </HeaderAction>
      </Header>
      <Section size="large">
        <input
          ref={inputEl}
          className="sr-only"
          type="text"
          value={value}
          readOnly
        />
        {value}
      </Section>
    </Content>
  )
}

export default RandomString
