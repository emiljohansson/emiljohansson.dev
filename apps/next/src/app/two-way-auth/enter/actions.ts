'use server'

import { validateCode } from '../api/codes'

export async function validate(formData: FormData) {
	const value = formData.get('secret')?.toString() || ''
	console.log('value', value, validateCode(value))
	return { message: 'hello' }
}
