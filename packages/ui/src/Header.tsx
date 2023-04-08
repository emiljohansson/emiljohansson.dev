import type { PropsWithChildren } from 'react'
import Link from 'next/link'
import { FiArrowLeft } from 'react-icons/fi'

export const Header = ({ children }: PropsWithChildren) => {
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
