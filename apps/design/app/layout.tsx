import type { PropsWithChildren } from 'react'

import '@repo/ui/styles.css'
import './styles.css'

import { Inter } from 'next/font/google'

const inter = Inter({ weight: ['400', '500', '700'], subsets: ['latin'] })

export default function Layout({ children }: PropsWithChildren<unknown>) {
	return (
		<html lang="en">
			<head />

			<body className={`${inter.className} dark:bg-black-rich dark:text-white`}>
				<main>{children}</main>
			</body>
		</html>
	)
}
