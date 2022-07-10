import type { FunctionComponent, ReactNode } from 'react'

const Layout: FunctionComponent<{ children: ReactNode }> = ({ children }) => {
  return (
    <main role="main">{children}</main>
  )
}

export default Layout
