import type { PropsWithChildren } from 'react'

import 'ui/globals.css'
import '../styles/globals.css'

export const metadata = {
	title: 'Games',
	description: 'Games by Emil',
}

export default async function Layout({ children }: PropsWithChildren<unknown>) {
	return (
		<html lang="en">
			<head></head>
			<body>
				<main>{children}</main>
			</body>
		</html>
	)
}
