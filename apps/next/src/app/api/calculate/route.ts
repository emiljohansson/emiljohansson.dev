import { NextResponse } from 'next/server'
import { add } from 'lib/utils/math'

const toNumber = (value: string): number => parseFloat(value)

export async function POST(request: Request) {
	const response = await request
	const data = await response.json()
	const query = data.query
	const sum = query.split('+').map(toNumber).reduce(add)

	return NextResponse.json({
		query,
		sum,
	})
}
