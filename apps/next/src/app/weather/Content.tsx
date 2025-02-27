'use client'

import { useEffect, useState } from 'react'
import { ChevronRight } from 'lucide-react'
import { Button } from '@repo/ui/button'
import { Input } from '@/components/ui/input'
import { updateLocation } from './actions'
import { WeatherIcon } from '@/components/weather/WeatherIcon'
import { useWeather, updateWeatherData } from '@/hooks/useWeather'

export function Content() {
	const data = useWeather()
	const [location, setLocation] = useState('')
	const [errorMessage, setErrorMessage] = useState('')

	async function onSubmit(formData: FormData) {
		console.log('on submit')

		setErrorMessage('')
		const data = await updateLocation(formData)

		if (data.error) {
			setErrorMessage(data.error.message)
			return
		}
		updateWeatherData(data)
	}

	useEffect(() => {
		if (!data) return
		setLocation(data.location.name)
	}, [data])

	return (
		<>
			<section className="flex flex-col gap-4 relative">
				<div className="z-20">
					<form action={onSubmit} className="relative">
						<input type="hidden" name="save" value="true" />
						<Input
							name="location"
							value={location}
							placeholder="Location"
							className="pr-11"
							onChange={(event) => setLocation(event.currentTarget.value)}
						/>
						<Button
							variant="outline"
							size="icon"
							className="absolute right-2 top-1/2 transform -translate-y-1/2 w-7 h-7 border-none"
						>
							<ChevronRight />
						</Button>
					</form>
					{errorMessage && (
						<p className="text-error text-sm pl-3">{errorMessage}</p>
					)}
				</div>
				{data && (
					<div
						className="flex gap-2 border border-input rounded-b-md rounded-bl-md px-3 py-2 pt-3 absolute w-full z-10"
						style={{
							top: '35px',
						}}
					>
						<div>
							<WeatherIcon condition={data.current.condition.text} />
						</div>
						<div>
							{data.current.temp_c}°C / {data.current.temp_f}°F
						</div>
					</div>
				)}
			</section>
		</>
	)
}
