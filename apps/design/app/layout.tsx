import type { PropsWithChildren } from 'react'

import '@repo/ui/styles.css'
import './styles.css'

import { GeistSans } from 'geist/font/sans'

export default function Layout({ children }: PropsWithChildren<unknown>) {
	return (
		<html lang="en">
			<head />

			<body
				className={`${GeistSans.className} dark:bg-black-rich dark:text-white`}
			>
				<main>{children}</main>
			</body>
		</html>
	)
}
