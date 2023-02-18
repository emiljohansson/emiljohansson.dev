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
