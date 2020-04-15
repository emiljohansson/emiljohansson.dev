import * as React from 'react'
import randomString from '@emiljohansson/random-string'
import './RandomString.scss'
import Header from '../Header/Header'
import HeaderAction from '../HeaderAction/HeaderAction'
import Content from '../Content/Content'
import Section from '../Section'

const name: string = 'RandomString'

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
          <i className="fas fa-sync" />
        </HeaderAction>
        <HeaderAction
          onClick={() => copyToClipboard(inputEl.current)}
        >
          <i className="fas fa-copy" />
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
        <div className={`${name}__text`}>{value}</div>
      </Section>
    </Content>
  )
}

export default RandomString
