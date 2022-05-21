import type { FunctionComponent, ReactNode } from 'react'

const Content: FunctionComponent<{ children: ReactNode }> = ({ children }) => {
  return <article className="flex flex-col h-full">{children}</article>
}

export default Content
