'use client'

import Link from 'next/link'
import { WeatherIcon } from './WeatherIcon'
import { useWeather } from '@/hooks/useWeather'
import { Skeleton } from '../ui/skeleton'
import { buttonVariants } from '@/components/ui/button'

export function WeatherWidget() {
	const data = useWeather()

	if (!data)
		return (
			<div className="flex items-center gap-1">
				<Skeleton className="h-4 w-[22px]" />
				<Skeleton className="w-[28px] h-[18px]" />
			</div>
		)

	return (
		<Link
			href="/weather"
			className={`flex items-center gap-1 ${buttonVariants({
				variant: 'ghost',
			})}`}
		>
			<WeatherIcon condition={data.current.condition.text} />{' '}
			{data.current.temp_c}°
		</Link>
	)
}
