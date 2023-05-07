import type { PropsWithChildren } from 'react'

import Content from '@/components/Content'
import Section from '@/components/Section'

export const metadata = {
	title: 'Password Generator',
	description: 'Password Generator',
}

export default function Layout({ children }: PropsWithChildren<unknown>) {
	return (
		<Content>
			<Section size="normal" direction="column">
				{children}
			</Section>
		</Content>
	)
}
