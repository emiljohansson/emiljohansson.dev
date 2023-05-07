import type { PropsWithChildren } from 'react'

export const metadata = {
	title: 'JWT Debugger',
	description: 'Encode and Decode JWTs',
}

export default function Layout({ children }: PropsWithChildren<unknown>) {
	return children
}
