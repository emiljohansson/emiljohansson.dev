'use client'

import { useEventListener } from 'hooks/useEventListener'
import { useRandomString } from 'hooks/useRandomString'

export function RandomStringExample({
	initialValue,
}: {
	initialValue: string
}) {
	const { value: random, generate } = useRandomString(initialValue)
	const randomRef = useEventListener<HTMLParagraphElement>('click', generate)

	return (
		<article>
			<h2>Random String</h2>
			<p ref={randomRef}>{random}</p>
		</article>
	)
}
