'use client'

import useCurrentTime from '@repo/lib/hooks/useCurrentTime'

export function Card() {
	const { hours, minutes, meridiem } = useCurrentTime()

	return (
		<div className="flex items-center justify-center text-5xl h-full">
			<div>
				{hours}:{minutes}
				<span className="text-3/6 meridiem -mb-5">{meridiem}</span>
			</div>
		</div>
	)
}
