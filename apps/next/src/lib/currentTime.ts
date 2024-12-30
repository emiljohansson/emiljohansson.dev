import { Signal, signal } from '@preact/signals-react'
import { getCurrentTime } from '@repo/lib/utils/date'

type Reactive<T> = { [K in keyof T]: Signal<T[K]> }

export const currentTime = reactive(getCurrentTime())

function reactive<T extends object>(obj: T) {
	const reactive = {} as Reactive<T>
	for (const i in obj) reactive[i] = signal(obj[i])
	return reactive
}

if (typeof window !== 'undefined') {
	setInterval(() => {
		const newTime = getCurrentTime()

		if (newTime.minutes !== currentTime.minutes.value) {
			currentTime.hours.value = newTime.hours
			currentTime.minutes.value = newTime.minutes
			currentTime.meridiem.value = newTime.meridiem
		}
	}, 1000)
}
