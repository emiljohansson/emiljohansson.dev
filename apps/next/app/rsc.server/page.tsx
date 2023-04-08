import Header from 'ui/Header'
import Content from '@/components/Content'
import Section from '@/components/Section'
import ClientItem from '@/components/rsc/ClientItem.client'
import ServerItem from '@/components/rsc/ServerItem.server'

const HooksPage = () => {
	return (
		<Content>
			<Header />
			<Section size="large">
				<h1 className="sr-only">React Server Components</h1>
				<div>
					Client component:
					<ClientItem />
				</div>
				<div>
					Server component:
					<ServerItem />
				</div>
			</Section>
		</Content>
	)
}

export default HooksPage
