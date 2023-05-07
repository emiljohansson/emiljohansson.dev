import { useState } from 'react'
import randomString from '@emiljohansson/random-string'

export const useRandomString = (initialValue?: string) => {
	const [value, setValue] = useState(initialValue ?? randomString())

	function generate() {
		setValue(randomString())
	}

	return { value, generate }
}
