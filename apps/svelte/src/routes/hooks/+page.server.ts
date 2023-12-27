import type { PageServerLoad } from './$types'
import randomString from '@emiljohansson/random-string'

export const load: PageServerLoad<{ randomValue: string }> = () => {
	return {
		randomValue: randomString(),
	}
}
