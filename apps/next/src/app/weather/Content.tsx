'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { updateLocation } from './actions'
import { ChevronRight } from 'lucide-react'

type Data = {
	location: {
		name: string
	}
	current: {
		temp_f: number
		temp_c: number
		condition: {
			text: string
		}
	}
}

export function Form({ initData }: { initData: Data }) {
	const [data, setData] = useState<Data>(initData)
	const [location, setLocation] = useState('Denver')
	const [errorMessage, setErrorMessage] = useState('')

	async function onSubmit(formData: FormData) {
		setErrorMessage('')
		const data = await updateLocation(formData)

		if (data.error) {
			setErrorMessage(data.error.message)
			return
		}
		setData(data)
	}

	return (
		<>
			<div className="absolute top-2 right-2">
				<form action={onSubmit} className="relative">
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
			<section className="flex flex-col gap-4">
				<div>
					<h2 className="text-2xl font-bold">Location</h2>
					<p>{data.location.name}</p>
				</div>
				<div>
					<h2 className="text-2xl font-bold">Temperature</h2>
					<p>{data.current.temp_c}°C</p>
					<p>{data.current.temp_f}°F</p>
				</div>
				<div>
					<h2 className="text-2xl font-bold">Condition</h2>
					<p>{data.current.condition.text}</p>
				</div>
			</section>
		</>
	)
}
