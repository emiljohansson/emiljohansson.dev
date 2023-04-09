import randomString from '@emiljohansson/random-string'
import Link from 'next/link'
import RandomStringPage from './random-string-page'
// import { Header } from 'ui'
import { FiArrowLeft } from 'react-icons/fi'
import { PropsWithChildren } from 'react'

// TODO fix this
const Header = ({ children }: PropsWithChildren) => {
	return (
		<header className="flex font p-4">
			<Link href="/" data-test="back-link">
				<FiArrowLeft size={30} strokeWidth="1.5" />
				<span className="sr-only">Back</span>
			</Link>
			<div className="ml-auto">{children}</div>
		</header>
	)
}

export const dynamic = 'force-dynamic'

export default function Page() {
	const initialValue = randomString()

	return (
		<>
			<Header />
			<RandomStringPage initialValue={initialValue} />
		</>
	)
}
