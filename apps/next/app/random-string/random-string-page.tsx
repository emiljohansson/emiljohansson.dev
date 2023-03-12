'use client'

import type { Ref } from '@/components/RandomString'

import { useRef } from 'react'
import { CopyIcon, UpdateIcon } from '@radix-ui/react-icons'
import RandomString from '@/components/RandomString'
import Section from '@/components/Section'
import { copyToClipboard } from 'lib/utils/string'
import HeaderAction from 'shared/HeaderAction'

export default function RandomStringPage({
	initialValue,
}: {
	initialValue: string
}) {
	const randomStringRef = useRef<Ref>(null)
	console.log(randomStringRef.current)

	return (
		<Section size="large" direction="column">
			<div>
				<HeaderAction
					onClick={() => randomStringRef.current?.generateNewValue()}
					data-test="refresh"
				>
					<UpdateIcon width={30} height={30} />
					<span className="sr-only">Refresh</span>
				</HeaderAction>
				<HeaderAction
					onClick={() =>
						copyToClipboard(randomStringRef.current?.getValue() || '')
					}
					data-test="copy"
				>
					<CopyIcon width={30} height={30} />
					<span className="sr-only">Copy</span>
				</HeaderAction>
			</div>
			<h1 className="sr-only">Random string</h1>
			<RandomString ref={randomStringRef} initialValue={initialValue} />
		</Section>
	)
}
