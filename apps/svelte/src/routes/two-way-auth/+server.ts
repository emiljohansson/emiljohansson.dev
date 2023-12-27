import { json } from '@sveltejs/kit'
import randomString from '@emiljohansson/random-string'

interface Factor {
	value: string
	expires: number
	lifespan: number
}

let lastUpdated = -1
let value = ''

const lifespanInSeconds = 15

function updateLastUpdated() {
	lastUpdated = getNewUpdatedTime()
}

function getNewUpdatedTime() {
	const date = new Date()
	return date.getTime()
}

function isWithinTimespan(time: number, seconds = 0) {
	return getDiffInSeconds(time) <= seconds
}

function getLastUpdated() {
	return lastUpdated
}

function getValue() {
	return value
}

function setValue(newValue: string) {
	updateLastUpdated()
	value = newValue
}

function getDiffInSeconds(time: number) {
	const lastUpdated = new Date(time)
	const now = new Date()
	const diff = now.getTime() - lastUpdated.getTime()
	return Math.floor(diff / 1000)
}

function generateCode() {
	if (!getLastUpdated() || !isWithinTimespan(getLastUpdated(), lifespanInSeconds)) {
		setValue('')
	}
	if (!getValue()) {
		setValue(randomString())
	}
	return {
		value: getValue(),
		expires: lifespanInSeconds - getDiffInSeconds(getLastUpdated()),
		lifespan: lifespanInSeconds,
	} as Factor
}

function validateCode(value: string) {
	if (!getLastUpdated() || !isWithinTimespan(getLastUpdated(), lifespanInSeconds)) {
		return false
	}
	if (!getValue()) {
		return false
	}
	const isValid = value === getValue()
	if (isValid) {
		setValue('')
	}
	return isValid
}

export function GET() {
	const number = generateCode()

	return json(number)
}

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
	const { value } = await request.json()
	return json({
		isValid: validateCode(value),
	})
}
