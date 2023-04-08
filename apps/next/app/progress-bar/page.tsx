'use client'

import ProgressBar from '@/components/ProgressBar'
import { Header } from 'ui'
import Content from '@/components/Content'
import Section from '@/components/Section'

const ProgressBarPage = () => (
	<Content>
		<Header />
		<Section size="normal">
			<h1 className="sr-only">Progress bar</h1>
			<ProgressBar />
		</Section>
	</Content>
)

export default ProgressBarPage
