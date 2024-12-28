'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import {
	Sun,
	Wind,
	Cloud,
	CloudRain,
	CloudSnow,
	CloudHail,
	Tornado,
	LucideIcon,
} from 'lucide-react'
import { Condition, Data } from '@/app/weather/types'
import { updateLocation } from '@/app/weather/actions'

const conditionsToIcon: Record<Condition, LucideIcon> = {
	Clear: Sun,
	'Partly cloudy': Cloud,
	Cloudy: Cloud,
	Overcast: Cloud,
	Mist: Cloud,
	Fog: Cloud,
	Drizzle: CloudRain,
	Rain: CloudRain,
	Thunderstorms: CloudRain,
	Snow: CloudSnow,
	Hail: CloudHail,
	Sleet: Cloud,
	Tornado: Tornado,
	Hurricane: Wind,
	Blizzard: CloudSnow,
	Dust: Wind,
	Sand: Wind,
	'Volcanic ash': Cloud,
}

export function WeatherWidget() {
	const [data, setData] = useState<Data>()
	const condition: Condition = data?.current.condition.text || 'Clear'
	console.log('condition', condition)

	const Icon = conditionsToIcon[condition] || Sun

	useEffect(() => {
		const fetchWeather = async () => {
			const formData = new FormData()
			formData.append('location', 'Denver')
			const data = await updateLocation(formData)
			setData(data)
		}

		fetchWeather()
	}, [])

	return (
		<>
			{data && (
				<Link
					href="/weather"
					className="flex items-center gap-1 text-sm font-medium"
				>
					<Icon size={22} strokeWidth={1.75} /> {data?.current.temp_c}°
				</Link>
			)}
		</>
	)
}
