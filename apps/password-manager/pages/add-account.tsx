import type { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import { FormEvent, useState } from 'react'
import { AES } from 'crypto-js'
import { Label } from '@radix-ui/react-label'
import {
	getUser,
	supabaseClient,
	withPageAuth,
} from '@supabase/auth-helpers-nextjs'
import { UpdateIcon } from '@radix-ui/react-icons'

interface Props {
	userId: string
	secret: string
	initActualPassword: string
	initPassword: string
}

// const symbols = ',._?-:]&*#~}$>(<)@^|{%!+='
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

const generate = (secret: string) => {
	const actual = createPassword()
	const encrypted = AES.encrypt(actual, secret).toString()

	return {
		actual,
		encrypted,
	}
}

export const getServerSideProps: GetServerSideProps = withPageAuth({
	redirectTo: '/login',
	async getServerSideProps(ctx) {
		const { user } = await getUser(ctx)
		const { query } = ctx
		const secret = query.secret as string
		const { actual: initActualPassword, encrypted: initPassword } =
			generate(secret)
		return {
			props: {
				userId: user?.id,
				secret,
				initPassword,
				initActualPassword,
			} as Props,
		}
	},
})

const AddAccountPage: NextPage<Props> = ({
	userId,
	secret,
	initPassword,
	initActualPassword,
}) => {
	const router = useRouter()
	const [error, setError] = useState('')
	const [password, setPassword] = useState(initPassword)
	const [actualPassword, setActualPassword] = useState(initActualPassword)

	const generateNewPassword = () => {
		const { actual, encrypted } = generate(secret)
		setPassword(encrypted)
		setActualPassword(actual)
	}

	const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
		setError('')
		event.preventDefault()
		const formData = Object.fromEntries(new FormData(event.currentTarget))
		const { error } = await supabaseClient.from('account').insert(
			{
				userId,
				website: formData.website,
				username: formData.username,
				password: formData.password,
			},
			{
				returning: 'minimal',
			},
		)
		if (error) {
			setError(error.message)
			return
		}
		router.push({
			pathname: '/accounts',
			query: {
				secret,
			},
		})
	}

	return (
		<>
			<h1>Add Account</h1>
			<form action="/api/add-account" method="post" onSubmit={onSubmit}>
				<input className="input" name="secret" value={secret} type="hidden" />
				<div className="mb-3">
					<Label htmlFor="website" className="block pr-3">
						Website
					</Label>
					<input id="website" name="website" className="input" required />
				</div>
				<div className="mb-3">
					<Label htmlFor="username" className="block pr-3">
						Username
					</Label>
					<input id="username" name="username" className="input" required />
				</div>
				<div className="mb-3">
					<Label htmlFor="username" className="block pr-3">
						Password
					</Label>
					<div className="flex items-center gap-4">
						<input
							className="input"
							name="password"
							value={password}
							readOnly
						/>
						{actualPassword}
						<button type="button" onClick={generateNewPassword}>
							<span className="sr-only">Generate</span>
							<UpdateIcon width={20} height={20} />
						</button>
					</div>
				</div>
				<button className="btn-primary">Add account</button>
			</form>
			{error && <p>{error}</p>}
		</>
	)
}

export default AddAccountPage
