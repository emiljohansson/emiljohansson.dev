'use client'

import { currentTime } from '@/lib/currentTime'

export function Card() {
	return (
		<div className="flex items-center justify-center text-5xl h-full">
			<div>
				{currentTime.hours}:{currentTime.minutes}
				<span className="text-3/6 meridiem -mb-5">{currentTime.meridiem}</span>
			</div>
		</div>
	)
}
