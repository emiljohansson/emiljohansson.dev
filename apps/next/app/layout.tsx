import type { PropsWithChildren } from 'react'

import './styles.css'
import 'ui/globals.css'

import { cookies } from 'next/headers'
import { CommandPrompt } from './CommandPrompt'

export default function Layout({ children }: PropsWithChildren<unknown>) {
	const cookieStore = cookies()
	const theme = cookieStore.get('theme')

	return (
		<html lang="en" className={`h-full ${theme?.value}`}>
			<body className="dark:bg-black-rich dark:text-white h-full">
				<main className="h-full">{children}</main>
				<CommandPrompt />
			</body>
		</html>
	)
}
