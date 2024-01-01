import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { AES, enc } from 'crypto-js'
import { createClient } from '@/utils/supabase/server'

export async function POST(request: Request) {
	const cookieStore = cookies()
	const supabase = createClient(cookieStore)
	const {
		data: { user },
	} = await supabase.auth.getUser()

	console.log({ user })
	if (!user) {
		return NextResponse.redirect('/login')
	}

	const data = await request.json()
	console.log({ data })
	console.log(process.env.ENCRYPT_SECRET)

	const step3 = AES.decrypt(data.password, process.env.ENCRYPT_SECRET).toString(
		enc.Utf8,
	)
	console.log({ step3 })
	const step2 = AES.decrypt(step3, user.id).toString(enc.Utf8)
	console.log({ step2 })
	const step1 = AES.decrypt(step2, data.secret).toString(enc.Utf8)
	console.log({ step1 })
	return NextResponse.json({
		data: step1,
		test: 'test',
	})
}
