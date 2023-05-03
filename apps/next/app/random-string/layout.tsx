import type { PropsWithChildren } from 'react'

import Content from '@/components/Content'
import Section from '@/components/Section'

export const metadata = {
	title: 'Random String',
	description: 'Genrates a random string',
}

export default function Layout({ children }: PropsWithChildren<unknown>) {
	return (
		<Content>
			<Section>{children}</Section>
		</Content>
	)
}
