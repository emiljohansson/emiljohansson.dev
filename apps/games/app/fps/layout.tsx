import { ReactNode } from 'react'

export const metadata = {
	title: 'FPS',
	description: 'FPS',
}

export default function Layout({ children }: { children: ReactNode }) {
	return <main>{children}</main>
}
