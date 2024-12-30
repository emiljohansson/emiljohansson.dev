'use client'

import useCurrentTime from '@repo/lib/hooks/useCurrentTime'

const CurrentTimePage = () => {
	const { hours, minutes, meridiem } = useCurrentTime()

	return (
		<>
			{hours}:{minutes}
			<span className="text-3/6 meridiem -mb-5">{meridiem}</span>
		</>
	)
}

export default CurrentTimePage
