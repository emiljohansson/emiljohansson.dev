import type { FunctionComponent, ReactNode } from 'react'

const Layout: FunctionComponent<{ children: ReactNode }> = ({ children }) => {
	return (
		<div id="app" className="h-screen overflow-scroll">
			{children}
		</div>
	)
}

export default Layout
