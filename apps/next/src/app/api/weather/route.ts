import type { Data } from '@/app/weather/types'
import { cookies } from 'next/headers'

export async function GET(request: Request) {
	const cookieStore = await cookies()
	const newLocation = new URL(request.url).searchParams.get('location')
	const location = newLocation || cookieStore.get('location')?.value || 'Denver'
	console.log({
		newLocation,
		location,
	})

	const url = `https://api.weatherapi.com/v1/current.json?key=${process.env.WEATHER_API_KEY}&q=${location}&aqi=no`
	try {
		const response = await fetch(url, { cache: 'no-store' })
		const data = (await response.json()) as Data | Error

		if (newLocation && !('error' in data)) {
			cookieStore.set('location', newLocation)
		}
		return Response.json(data)
	} catch (error) {}
}
