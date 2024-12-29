'use server'

import { cookies } from 'next/headers'

export async function updateLocation(formData: FormData) {
	const cookieStore = await cookies()
	const location = formData.get('location')

	try {
		const url = `https://api.weatherapi.com/v1/current.json?key=${process.env.WEATHER_API_KEY}&q=${location}&aqi=no`
		const response = await fetch(url)
		const data = await response.json()
		if (formData.get('save')) {
			cookieStore.set('location', location as string)
		}
		return data
	} catch (error) {
		return error
	}
}
