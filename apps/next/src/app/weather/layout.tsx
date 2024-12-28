import type { PropsWithChildren } from 'react'

import Content from '@/components/Content'
import Section from '@/components/Section'

export const metadata = {
	title: 'Current Weather',
	description: 'Get the current weather for a location',
}

export default function Layout({ children }: PropsWithChildren<unknown>) {
	return (
		<Content>
			<Section>{children}</Section>
		</Content>
	)
}
