'use client'

import { currentTime } from '@/lib/currentTime'

const CurrentTimePage = () => {
	return (
		<>
			{currentTime.hours}:{currentTime.minutes}
			<span className="text-3/6 meridiem -mb-5">{currentTime.meridiem}</span>
		</>
	)
}

export default CurrentTimePage
