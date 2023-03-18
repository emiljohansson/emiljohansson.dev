'use client'

import { useEffect, useState } from 'react'
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
		<Content>
			<Header />
			<Section direction="column">{isReady && <MineSweaper />}</Section>
		</Content>
	)
}

export default MSPage
