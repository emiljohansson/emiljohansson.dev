'use client'

import { Skeleton } from '@/components/ui/skeleton'
import { WeatherIcon } from '@/components/weather/WeatherIcon'
import { useWeather } from '@/hooks/useWeather'

export function Card() {
	const data = useWeather()

	if (!data)
		return (
			<div className="flex gap-3 items-center h-full w-full">
				<div>
					<Skeleton className="h-12 w-12 rounded-full" />
				</div>
				<div className="grid gap-1">
					<Skeleton className="w-[100px] h-[24px]" />
					<Skeleton className="w-[80px] h-[20px]" />
				</div>
				<Skeleton className="h-12 w-24 rounded-sm ml-auto" />
			</div>
		)

	return (
		<div className="flex gap-3 items-center h-full">
			<div>
				<WeatherIcon condition={data.current.condition.text} size="large" />
			</div>
			<div>
				<div className="text-2xl">{data.location.name}</div>
				<div className="text-gray-600 text-xs">
					{data.current.condition.text}°
				</div>
			</div>
			<div className="text-5xl ml-auto">{data.current.temp_c}°</div>
		</div>
	)
}
