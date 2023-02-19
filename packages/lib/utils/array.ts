export function includes<T>(list: T[], value: T) {
	return list.indexOf(value) > -1
}

export const first = <T>(array: T[] = []) => array[0]

export const last = <T>(array: T[] = []) => array[array.length - 1]

export const lastIndex = <T>(array: T[] = []) => array.length - 1

export const chunk = <T>(array: T[] = [], chunks = 1) => {
	if (chunks < 1) return array
	const result = []
	const length = array.length
	let index = 0
	while (index < length) {
		result.push(array.slice(index, index + chunks))
		index += chunks
	}
	return result
}
