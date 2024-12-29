import { Data } from '@/app/weather/types'
import { signal } from '@preact/signals-core'

export const weather = signal<Data>()

let initialized = false

export async function initWeather() {
	if (initialized) return
	initialized = true
	const response = await fetch('http://localhost:3000/api/weather')
	const data = (await response.json()) as Data
	weather.value = data
}
