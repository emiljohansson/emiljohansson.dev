import { NextResponse } from 'next/server'
import { add } from '@repo/lib/utils/math'

const toNumber = (value: string): number => parseFloat(value)

export async function POST(request: Request) {
	const data = await request.json()
	const query = data.query
	const sum = query.split('+').map(toNumber).reduce(add)

	return NextResponse.json({
		query,
		sum,
	})
}
