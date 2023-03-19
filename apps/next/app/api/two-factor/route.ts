import randomString from '@emiljohansson/random-string'
import { NextResponse } from 'next/server'

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

function getDiffInSeconds(time: number) {
	const lastUpdated = new Date(time)
	const now = new Date()
	const diff = now.getTime() - lastUpdated.getTime()
	return Math.floor(diff / 1000)
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

function generateCode() {
	if (
		!getLastUpdated() ||
		!isWithinTimespan(getLastUpdated(), lifespanInSeconds)
	) {
		setValue('')
	}
	if (!getValue()) {
		setValue(randomString())
	}
	return {
		value: getValue(),
		expires: lifespanInSeconds - getDiffInSeconds(getLastUpdated()),
		lifespan: lifespanInSeconds,
	}
}

function validateCode(value: string) {
	if (
		!getLastUpdated() ||
		!isWithinTimespan(getLastUpdated(), lifespanInSeconds)
	) {
		return false
	}
	if (!getValue()) {
		return false
	}
	const isValid: boolean = value === getValue()
	if (isValid) {
		setValue('')
	}
	return isValid
}

export async function GET() {
	return NextResponse.json({
		status: 'success',
		data: generateCode(),
	})
}

export async function POST(request: Request) {
	const data = await request.json()
	const code = data.value

	return NextResponse.json({
		status: 'success',
		data: {
			isValid: validateCode(code),
		},
	})
}
