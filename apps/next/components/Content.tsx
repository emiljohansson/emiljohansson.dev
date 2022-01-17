import { FunctionComponent } from 'react'
import { styled } from '@/stitches'

const Article = styled('article', {
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
})

const Content: FunctionComponent = ({ children }) => {
  return <Article>{children}</Article>
}

export default Content
