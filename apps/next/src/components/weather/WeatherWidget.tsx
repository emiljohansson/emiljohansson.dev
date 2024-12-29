'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import type { Data } from '@/app/weather/types'
import { initWeather, weather } from '@/lib/weather'
import { WeatherIcon } from './WeatherIcon'

export function WeatherWidget() {
	const [data, setData] = useState<Data>()

	useEffect(() => {
		initWeather()
	}, [])

	useEffect(() => {
		weather.subscribe((data) => {
			console.log('in weather widget', data)

			if (!data) return
			setData(data)
		})
	}, [])

	return (
		<>
			{data && (
				<Link
					href="/weather"
					className="flex items-center gap-1 text-sm font-medium"
				>
					<WeatherIcon condition={data.current.condition.text} />{' '}
					{data.current.temp_c}°
				</Link>
			)}
		</>
	)
}
