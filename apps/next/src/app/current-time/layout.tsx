import type { PropsWithChildren } from 'react'

import Content from '@/components/Content'
import Section from '@/components/Section'

export const metadata = {
	title: 'Current Time',
	description: 'Current Time',
}

export default function Layout({ children }: PropsWithChildren<unknown>) {
	return (
		<Content>
			<Section size="large">{children}</Section>
		</Content>
	)
}
