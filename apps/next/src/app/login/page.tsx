import Image from 'next/image'
import Content from '@/components/Content'
import Section from '@/components/Section'
import { compare, hash } from 'bcryptjs'

const SALT_ROUNDS = 10

async function hashPassword(password: string) {
	return hash(password, SALT_ROUNDS)
}

async function comparePasswords(
	plainTextPassword: string,
	hashedPassword: string,
) {
	return compare(plainTextPassword, hashedPassword)
}

export default async function Page() {
	const hashedPassword = await hashPassword('password123')
	console.log(hashedPassword) // $2a$10$1
	console.log(await comparePasswords('password123', hashedPassword)) // true

	return (
		<Content>
			<Section size="normal" direction="column">
				<form
					action="/api/authorize"
					method="get"
					className="bg-white text-black text-center flex flex-col"
				>
					<input type="hidden" name="response_type" value="code" />
					<input type="hidden" name="client_id" value="id123" />
					<input
						type="hidden"
						name="redirect_uri"
						value="http://localhost:3000/login/callback"
					/>
					<input type="hidden" name="scope" value="myscope" />
					<Image
						src="/images/logo/apple-touch-icon.png"
						alt="App logo"
						width={52}
						height={52}
						className="mx-auto"
					/>
					<h1>Welcome</h1>
					<p>Log in to continue to All Applications.</p>
					<input type="text" placeholder="Email" />
					<input type="password" placeholder="Password" />
					<button>Continue</button>
				</form>
			</Section>
		</Content>
	)
}
