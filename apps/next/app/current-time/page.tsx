'use client'

import useCurrentTime from 'lib/hooks/useCurrentTime'
import { Header } from 'ui'
import Content from '@/components/Content'
import Section from '@/components/Section'

const CurrentTimePage = () => {
	const { hours, minutes, meridiem } = useCurrentTime()

	return (
		<Content>
			<Header />
			<Section size="large">
				<style jsx>{`
					.meridiem {
						margin-bottom: -18px;
					}
				`}</style>
				{hours}:{minutes}
				<span className="text-3/6 meridiem">{meridiem}</span>
			</Section>
		</Content>
	)
}

export default CurrentTimePage
