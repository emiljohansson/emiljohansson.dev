import React from 'react'

import './PageTemplate.scss'
import Header from '../Header/Header'
import Content from '../Content/Content'

const name: string = 'PageTemplate'

function PageTemplate () {
  return (
    <Content>
      <Header />
      <section className={`${name}__text`}>
        Page Template
      </section>
    </Content>
  )
}

export default PageTemplate
