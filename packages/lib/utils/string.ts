const lettersPattern = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
const numericPattern = '0123456789'
const symbolsPattern = ',._?-:]&*#~}$>(<)@^|{%!+='

export function classNames(...args: (string | { [key: string]: boolean })[]) {
	const classes: string[] = []
	for (const arg of args) {
		if (typeof arg === 'string') {
			classes.push(arg)
		} else {
			for (const key in arg) {
				if (arg[key]) {
					classes.push(key)
				}
			}
		}
	}
	return classes.join(' ')
}

export async function copyToClipboard(value: string) {
	try {
		await navigator.clipboard.writeText(value)
		console.log(`Copied ${value} to clipboard`)
	} catch (error) {
		console.error('failed to copy:', error)
	}
}

export const uniqueId = (() => {
	let id = -1
	return () => '' + ++id
})()

export function randomString(props?: {
	length?: number
	letters?: boolean
	numeric?: boolean
	symbols?: boolean
}) {
	const { length, letters, numeric, symbols } = {
		length: 10,
		letters: true,
		numeric: false,
		symbols: false,
		...props,
	}
	const pattern = [
		letters && lettersPattern,
		numeric && numericPattern,
		symbols && symbolsPattern,
	]
		.filter((v) => !!v)
		.join('')
	let value = ''
	let index = length

	while (index--) {
		const charIndex = Math.floor(Math.random() * pattern.length)
		value += pattern[charIndex]
	}

	return value
}
