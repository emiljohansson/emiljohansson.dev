import TwoWayAuthEnter from './TwoWayAuthEnter'
import Content from '@/components/Content'
import Section from '@/components/Section'
import { validate } from './actions'

export default function TwoWayAuthEnterPage() {
	return (
		<Content>
			<Section>
				<TwoWayAuthEnter validate={validate} />
			</Section>
		</Content>
	)
}
