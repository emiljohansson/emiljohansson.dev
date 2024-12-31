import type { Tables } from '@/lib/database.types'
import randomString from '@emiljohansson/random-string'
import { DefaultCardSubTitle } from '../DefaultCard'

export function Card({ title }: Tables<'project'>) {
	const initialValue = randomString()

	return (
		<div className="grid grid-1">
			<div>{title}</div>
			<DefaultCardSubTitle description={initialValue} />
		</div>
	)
}
