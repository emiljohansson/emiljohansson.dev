import Head from 'next/head'
import { useEffect, useState } from 'react'
import Layout from '@/components/Layout'
import Section from '@/components/Section'
import Header from 'shared/Header'
import Content from '@/components/Content'
import MineSweaper from '@/components/MineSweaper'

const MSPage = () => {
	const [isReady, setIsReady] = useState(false)

	useEffect(() => {
		setIsReady(true)
	}, [])

	return (
		<Layout>
			<Head>
				<title>ms</title>
				<meta name="description" content="ms" />
				<link rel="preload" href="/fonts/MuseoModerno-Light.ttf" as="font" crossOrigin="" />
			</Head>
			<Content>
				<Header />
				<Section direction="column">{isReady && <MineSweaper />}</Section>
			</Content>
		</Layout>
	)
}

export default MSPage
