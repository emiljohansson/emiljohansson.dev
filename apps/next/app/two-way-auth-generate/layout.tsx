import type { PropsWithChildren } from 'react'

import Content from '@/components/Content'
import Section from '@/components/Section'

export const metadata = {
	title: 'Generate Two-Factor Authentication',
	description: 'Generate Two-Factor Authentication',
}

export default function Layout({ children }: PropsWithChildren<unknown>) {
	return (
		<Content>
			<Section direction="column" size="medium">
				{children}
			</Section>
		</Content>
	)
}
