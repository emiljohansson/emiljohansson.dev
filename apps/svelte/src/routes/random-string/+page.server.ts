import randomString from "@emiljohansson/random-string"

/** @type {import('./$types').PageLoad} */
export function load() {
	return {
		value: randomString(),
	}
}
