import * as React from 'react'
import styled from 'styled-components'

const Article = styled.article`
  display: flex;
  flex-direction: column;
  height: 100%;
`

function Content ({
  children
}: React.Props<any>) {
  return (
    <Article>
      {children}
    </Article>
  )
}

export default Content
