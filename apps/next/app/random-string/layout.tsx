import type { PropsWithChildren } from 'react'
import Content from '@/components/Content'

export const metadata = {
	title: 'Random String',
	description: 'Genrates a random string',
}

export default function Layout({ children }: PropsWithChildren<unknown>) {
	console.log(children)

	return (
		<Content>
			{children}
			{/* {cloneElement(children, { ref: randomStringRef })} */}
		</Content>
	)
}
