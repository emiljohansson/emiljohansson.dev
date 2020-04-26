import * as React from 'react'
import { Sync } from '@styled-icons/material/Sync'
import { FileCopy } from '@styled-icons/material/FileCopy'
import randomString from '@emiljohansson/random-string'
import Header from '../Header/Header'
import HeaderAction from '../HeaderAction/HeaderAction'
import Content from '../Content/Content'
import Section from '../Section'
import SrOnly from '../SrOnly'

function copyToClipboard (el: HTMLInputElement | null) {
  if (!el) {
    return
  }
  el.select()
  document.execCommand('copy')
  el.selectionEnd = el.selectionStart
}

function RandomString () {
  const [ value, setValue ] = React.useState('')
  const inputEl = React.useRef(null)

  React.useLayoutEffect(() => {
    setValue(randomString())
  }, [])

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
        <SrOnly
          as="input"
          ref={inputEl}
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
