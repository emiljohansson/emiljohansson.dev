import type { PropsWithChildren } from 'react'

import '@repo/ui/styles.css'
import './globals.css'

import { Inter } from 'next/font/google'

const inter = Inter({ weight: ['400', '500', '700'], subsets: ['latin'] })

export const metadata = {
	title: 'Games',
	description: 'Games by Emil',
}

export default function Layout({ children }: PropsWithChildren<unknown>) {
	return (
		<html lang="en">
			<head></head>
			<body className={inter.className}>{children}</body>
		</html>
	)
}
