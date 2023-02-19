import Head from 'next/head'
import Layout from '@/components/Layout'
import TwoWayAuthGenerate from '@/components/TwoWayAuthGenerate'
import Header from 'shared/Header'
import Content from '@/components/Content'
import Section from '@/components/Section'

const TwoWayAuthGeneratePage = () => (
	<Layout>
		<Head>
			<title>Generate Two-Factor Authentication</title>
			<meta name="description" content="Generate two-factor authentication" />
		</Head>
		<Content>
			<Header />
			<Section direction="column" size="medium">
				<TwoWayAuthGenerate />
			</Section>
		</Content>
	</Layout>
)

export default TwoWayAuthGeneratePage
