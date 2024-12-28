import { updateLocation } from './actions'
import { Content } from './Content'

export default async function Page() {
	const formData = new FormData()
	formData.set('location', 'Denver')
	const data = await updateLocation(formData)

	return (
		<>
			<h1 className="sr-only">Current Weather</h1>

			<Content initData={data} />
		</>
	)
}
