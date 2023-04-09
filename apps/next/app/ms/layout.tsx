import type { PropsWithChildren } from 'react'

export const metadata = {
	title: 'Minesweeper',
	description: 'Play Minesweeper',
}

export default function Layout({ children }: PropsWithChildren<unknown>) {
	return children
}
