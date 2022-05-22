import type { FunctionComponent } from 'lib/@types'

const Content: FunctionComponent = ({ children }) => {
  return <article className="flex flex-col h-full">{children}</article>
}

export default Content
