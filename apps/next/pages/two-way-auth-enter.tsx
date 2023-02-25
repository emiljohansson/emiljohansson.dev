import Head from 'next/head'
import Layout from '@/components/Layout'
import TwoWayAuthEnter from '@/components/TwoWayAuthEnter'
import Header from 'shared/Header'
import Content from '@/components/Content'
import Section from '@/components/Section'

const TwoWayAuthEnterPage = () => (
	<Layout>
		<Head>
			<title>Enter Two-Factor Authentication</title>
			<meta name="description" content="Enter two-factor authentication" />
		</Head>
		<Content>
			<Header />
			<Section>
				<TwoWayAuthEnter />
			</Section>
		</Content>
	</Layout>
)

export default TwoWayAuthEnterPage
