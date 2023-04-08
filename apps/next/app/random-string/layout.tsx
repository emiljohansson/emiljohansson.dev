'use client'

import type { PropsWithChildren } from 'react'
import { Header } from 'ui'
import Content from '@/components/Content'

export default function Layout({ children }: PropsWithChildren<unknown>) {
	console.log(children)

	return (
		<Content>
			<Header></Header>
			{children}
			{/* {cloneElement(children, { ref: randomStringRef })} */}
		</Content>
	)
}
