import type { PropsWithChildren, RefObject } from 'react'
import Link from 'next/link'
import { FiArrowLeft } from 'react-icons/fi'

export const Header = ({
	children,
	ref,
}: PropsWithChildren<{
	ref?: RefObject<HTMLElement | null>
}>) => {
	return (
		<header ref={ref} className="ui-flex ui-p-4">
			<Link href="/" data-test="back-link">
				<FiArrowLeft size={30} strokeWidth="1.5" />
				<span className="ui-sr-only">Back</span>
			</Link>
			<div className="ui-ml-auto">{children}</div>
		</header>
	)
}
