import * as React from 'react'
import { Sync } from '@styled-icons/material/Sync'
import { FileCopy } from '@styled-icons/material/FileCopy'
import randomString from '@emiljohansson/random-string'
import Header from '../Header/Header'
import HeaderAction from '../HeaderAction/HeaderAction'
import Content from '../Content/Content'
import Section from '../Section'

function copyToClipboard (el: HTMLInputElement | null) {
  if (!el) {
    return
  }
  el.select()
  document.execCommand('copy')
  el.selectionEnd = el.selectionStart
}

function RandomString () {
  const [ value, setValue ] = React.useState(randomString())
  const inputEl = React.useRef(null)

  return (
    <Content>
      <Header>
        <HeaderAction
          onClick={() => setValue(randomString())}
        >
          <Sync size="30" title="Refresh" />
        </HeaderAction>
        <HeaderAction
          onClick={() => copyToClipboard(inputEl.current)}
        >
          <FileCopy size="30" title="Copy" />
        </HeaderAction>
      </Header>
      <Section>
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
