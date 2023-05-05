import type { PropsWithChildren } from 'react'

import Section from '@/components/Section'
import Content from '@/components/Content'

export const metadata = {
	title: 'Minesweeper',
	description: 'Play Minesweeper',
}

export default function Layout({ children }: PropsWithChildren<unknown>) {
	return (
		<Content>
			<Section direction="column">{children}</Section>
		</Content>
	)
}
