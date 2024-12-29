import type { Condition } from '@/app/weather/types'
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

export function WeatherIcon({ condition }: { condition: Condition }) {
	const Icon = conditionsToIcon[condition || 'Clear']

	return <Icon size={22} strokeWidth={1.75} />
}
