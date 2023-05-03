import randomString from '@emiljohansson/random-string'
import RandomStringPage from './random-string-page'

export const dynamic = 'force-dynamic'

export default function Page() {
	const initialValue = randomString()

	return (
		<>
			<RandomStringPage initialValue={initialValue} />
		</>
	)
}
