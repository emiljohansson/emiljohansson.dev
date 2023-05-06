import { ReactNode } from 'react'

export const metadata = {
	title: 'Preload',
	description: 'Preload',
}

export default function Layout({ children }: { children: ReactNode }) {
	return <main>{children}</main>
}
