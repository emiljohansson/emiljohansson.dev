'use client'

import { useEffect, useState } from 'react'
import Section from '@/components/Section'
import Content from '@/components/Content'
import MineSweaper from '@/components/MineSweaper'

const MSPage = () => {
	const [isReady, setIsReady] = useState(false)

	useEffect(() => {
		setIsReady(true)
	}, [])

	return (
		<Content>
			<Section direction="column">{isReady && <MineSweaper />}</Section>
		</Content>
	)
}

export default MSPage
