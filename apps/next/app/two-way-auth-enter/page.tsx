'use client'

import TwoWayAuthEnter from '@/components/TwoWayAuthEnter'
import { Header } from 'ui'
import Content from '@/components/Content'
import Section from '@/components/Section'

const TwoWayAuthEnterPage = () => (
	<Content>
		<Header />
		<Section>
			<TwoWayAuthEnter />
		</Section>
	</Content>
)

export default TwoWayAuthEnterPage
