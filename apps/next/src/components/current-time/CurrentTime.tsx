'use client'

import { currentTime } from '@/lib/currentTime'

export function CurrentTime() {
	return (
		<div>
			{currentTime.hours}:{currentTime.minutes}
			<span className="text-3/6 mb-[-1.8%] leading-none">
				{currentTime.meridiem}
			</span>
		</div>
	)
}
