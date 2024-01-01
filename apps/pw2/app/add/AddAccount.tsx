'use client'

import { useState } from 'react'
import { useStore } from '../store'

const numbers = '0123456789'
const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

const r = (length: number, pattern: string) => {
	let value = ''
	let index = length
	while (index--) {
		const charIndex = Math.floor(Math.random() * pattern.length)
		value += pattern[charIndex]
	}
	return value
}

const createPassword = () =>
	`${r(3, characters)}-${r(3, characters)}${r(1, numbers)}${r(
		3,
		characters,
	)}-${r(3, characters)}${r(1, numbers)}${r(3, characters)}`

// function generate(secret: string) {
// 	const actual = createPassword()
// 	const encrypted = encrypt(actual, secret)

// 	return {
// 		actual,
// 		encrypted,
// 	}
// }

// function encrypt(value: string, secret: string, userId: string) {
// 	const step1 = AES.encrypt(value, secret).toString()
// 	const step2 = AES.encrypt(step1, userId).toString()
// 	const step3 = AES.encrypt(
// 		step2,
// 		process.env.NEXT_PUBLIC_ENCODE_SECRET,
// 	).toString()
// 	return step3
// }

// function decrypt(password: string, secret: string, userId: string) {
// 	const step3 = AES.decrypt(
// 		password,
// 		process.env.NEXT_PUBLIC_ENCODE_SECRET,
// 	).toString(enc.Utf8)
// 	const step2 = AES.decrypt(step3, userId).toString(enc.Utf8)
// 	const step1 = AES.decrypt(step2, secret).toString(enc.Utf8)
// 	console.log({
// 		x: process.env.NEXT_PUBLIC_ENCODE_SECRET,
// 		secret,
// 		step1,
// 		step2,
// 		step3,
// 	})

// 	return step1
// }

export function AddAccount() {
	const [actual, setActual] = useState(createPassword())
	const { secret, setSecret } = useStore()

	return (
		<>
			Secret: {secret}
			<input type="text" name="website" placeholder="Website" className="p-4" />
			<input
				type="text"
				name="username"
				placeholder="Username"
				className="p-4"
			/>
			<input
				type="text"
				name="password"
				className="p-4"
				value={actual}
				onChange={({ target }) => {
					console.log(target.value)

					setActual(target.value)
				}}
			/>
			<input
				type="text"
				name="secret"
				value={secret}
				onChange={({ target }) => {
					setSecret(target.value)
				}}
			/>
			<button type="submit">Save</button>
		</>
	)
}
