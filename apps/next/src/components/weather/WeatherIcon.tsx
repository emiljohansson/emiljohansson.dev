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

const hex = {
	blue: '#4CBFD9',
	yellow: '#FFE168',
}
const colors: Partial<Record<Condition, string>> = {
	Clear: hex.yellow,
	Rain: hex.blue,
	Cloudy: hex.blue,
	Overcast: hex.blue,
}

export function WeatherIcon({
	condition,
	size = 'small',
}: {
	condition: Condition
	size?: 'small' | 'large'
}) {
	const Icon = conditionsToIcon[condition || 'Clear']
	const color = colors[condition] || 'currentColor'
	const fontSize = size === 'small' ? 22 : 40

	return <Icon size={fontSize} strokeWidth={1.75} color={color} />
}
