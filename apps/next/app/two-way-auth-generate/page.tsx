'use client'

import TwoWayAuthGenerate from '@/components/TwoWayAuthGenerate'
import { Header } from 'ui'
import Content from '@/components/Content'
import Section from '@/components/Section'

const TwoWayAuthGeneratePage = () => (
	<Content>
		<Header />
		<Section direction="column" size="medium">
			<TwoWayAuthGenerate />
		</Section>
	</Content>
)

export default TwoWayAuthGeneratePage
