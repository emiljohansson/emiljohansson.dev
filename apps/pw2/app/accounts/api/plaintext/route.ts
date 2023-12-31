import { NextResponse } from 'next/server'
import { AES, enc } from 'crypto-js'

export async function POST(request: Request) {
	const data = await request.json()
	const bytes = AES.decrypt(data.password, data.secret)
	return NextResponse.json({
		data: bytes.toString(enc.Utf8),
	})
}
