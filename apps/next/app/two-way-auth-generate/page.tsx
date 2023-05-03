'use client'

import TwoWayAuthGenerate from '@/components/TwoWayAuthGenerate'
import Content from '@/components/Content'
import Section from '@/components/Section'

const TwoWayAuthGeneratePage = () => (
	<Content>
		<Section direction="column" size="medium">
			<TwoWayAuthGenerate />
		</Section>
	</Content>
)

export default TwoWayAuthGeneratePage
