/** @type {import('./$types').PageLoad} */
export async function load({ fetch }) {
	const res = await fetch(`/two-way-auth`)
	const factor = await res.json()

	return { factor }
}
