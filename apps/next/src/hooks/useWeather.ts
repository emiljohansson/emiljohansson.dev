import type { Data } from '@/app/weather/types'
import { useEffect, useState } from 'react'
import { signal } from '@preact/signals-core'

const weather = signal<Data>()

let initialized = false

async function initWeather() {
	if (initialized) return
	initialized = true
	const response = await fetch('/api/weather')
	const data = (await response.json()) as Data
	weather.value = data
}

export function useWeather() {
	const [data, setData] = useState<Data>()

	useEffect(() => {
		weather.subscribe((data) => {
			console.log('in weather widget', data)

			if (!data) return
			setData(data)
		})
		initWeather()
	}, [])

	return data
}

export function updateWeatherData(newData: Data) {
	weather.value = newData
}
