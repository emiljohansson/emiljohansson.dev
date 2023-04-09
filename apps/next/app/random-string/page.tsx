import randomString from '@emiljohansson/random-string'
import { Header } from 'ui/dist/Header'
import RandomStringPage from './random-string-page'

export const dynamic = 'force-dynamic'

export default function Page() {
	const initialValue = randomString()

	return (
		<>
			<Header />
			<RandomStringPage initialValue={initialValue} />
		</>
	)
}
