import type { Tables } from '@/lib/database.types'
import randomString from '@emiljohansson/random-string'

export function Card({ title }: Tables<'project'>) {
	const initialValue = randomString()

	return (
		<div className="grid grid-1">
			<div>{title}</div>
			<p className="text-gray-600 text-xs no-underline">{initialValue}</p>
		</div>
	)
}
