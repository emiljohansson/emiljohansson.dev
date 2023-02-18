import type { FunctionComponent, ReactNode } from 'react'

const Layout: FunctionComponent<{ children: ReactNode }> = ({ children }) => {
	return <main>{children}</main>
}

export default Layout
