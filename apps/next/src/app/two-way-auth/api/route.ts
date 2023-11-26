import { NextResponse } from 'next/server'
import { generateCode, validateCode } from './codes'

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
