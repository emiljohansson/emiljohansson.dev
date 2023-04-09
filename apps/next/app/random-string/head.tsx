import type { PropsWithChildren } from 'react'

export const metadata = {
	title: 'Random String',
	description: 'Genrates a random string',
}

export default function Layout({ children }: PropsWithChildren<unknown>) {
	return children
}
