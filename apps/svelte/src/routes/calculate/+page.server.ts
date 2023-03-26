import type { Actions } from "@sveltejs/kit"

function add(a: number, b: number) {
	return a + b
}
const toNumber = (value: string): number => parseFloat(value)

export const actions: Actions = {
	default: async ({ request }) => {
		const data = await request.formData()
		const query = data.get("query") as string
		console.log(query)

		if (!query) return { success: false, error: "No query provided" }
		const sum = query.split("+").map(toNumber).reduce(add)
		return { success: true, sum, query }
	},
}
