import { FunctionComponent } from 'react'
import styled from 'styled-components'

const Article = styled.article`
  display: flex;
  flex-direction: column;
  height: 100%;
`

const Content: FunctionComponent = ({ children }) => {
  return (
    <Article>
      {children}
    </Article>
  )
}

export default Content
