export const isDefined = (value: unknown) =>
	value !== undefined && value !== null

export const isEmpty = (value: unknown[]) => value.length < 1
