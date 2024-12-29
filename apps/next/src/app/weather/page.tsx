import { Content } from './Content'

export default async function Page() {
	return (
		<>
			<h1 className="sr-only">Current Weather</h1>

			<Content />
		</>
	)
}
