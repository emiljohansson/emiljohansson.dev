import type { PageServerLoad } from "./$types"
import randomString from "@emiljohansson/random-string"

export const load: PageServerLoad<{ value: string }> = () => {
	return {
		value: randomString(),
	}
}
