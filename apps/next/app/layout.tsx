import type { PropsWithChildren } from 'react'

import 'shared/globals.css'

import { cookies } from 'next/headers'
import { CommandPrompt } from './CommandPrompt'

export default function Layout({ children }: PropsWithChildren<unknown>) {
	const cookieStore = cookies()

	console.log('theme', cookieStore.getAll())
	cookieStore.set({
		key: 'theme',
		value: 'dark',
	})

	return (
		<html lang="en" className="h-full">
			<head>
				<script
					dangerouslySetInnerHTML={{
						__html:
							"document.documentElement.classList.toggle('dark', localStorage.theme === 'dark')",
					}}
				/>
				<script>console.log(localStorage.theme)</script>
			</head>
			<body className="dark:bg-black-rich dark:text-white h-full">
				<main className="h-full">{children}</main>
				<CommandPrompt />
			</body>
		</html>
	)
}
