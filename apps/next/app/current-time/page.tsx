'use client'

import useCurrentTime from 'lib/hooks/useCurrentTime'

const CurrentTimePage = () => {
	const { hours, minutes, meridiem } = useCurrentTime()

	return (
		<>
			{hours}:{minutes}
			<span className="text-3/6 meridiem -mb-4.5">{meridiem}</span>
		</>
	)
}

export default CurrentTimePage
