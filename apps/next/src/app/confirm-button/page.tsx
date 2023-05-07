'use client'

import { useState } from 'react'
import Content from '@/components/Content'
import ConfirmButton from '@/components/ConfirmButton'
import Section from '@/components/Section'

const ConfirmButtonPage = () => {
	const [confirmed, setConfirmed] = useState(false)
	return (
		<Content>
			<h1 className="sr-only">Confirm Button</h1>
			<Section>
				<div className="flex flex-col text-center">
					<ConfirmButton duration={2} onComfirm={() => setConfirmed(true)} />
					<div>Submitted: {confirmed.toString()}</div>
				</div>
			</Section>
		</Content>
	)
}

export default ConfirmButtonPage
