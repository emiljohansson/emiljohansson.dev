'use server'

export async function updateLocation(formData: FormData) {
	'use server'
	const location = formData.get('location')

	try {
		const url = `https://api.weatherapi.com/v1/current.json?key=${process.env.WEATHER_API_KEY}&q=${location}&aqi=no`
		const response = await fetch(url)
		const data = await response.json()
		return data
	} catch (error) {
		return error
	}
}
