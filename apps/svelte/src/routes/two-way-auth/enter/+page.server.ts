/** @type {import('./$types').Actions} */
export const actions = {
	default: async ({ request }) => {
		const data = await request.formData()
		const value = data.get('value')
		console.log({ value })

		const res = await fetch(`/two-way-auth`)
		const factor = await res.json()
		console.log(factor)
	},
}
