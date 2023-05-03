import randomString from '@emiljohansson/random-string'
import Content from './Content'

export default function Page() {
	const initialValue = randomString()

	return <Content initialValue={initialValue} />
}
