import type { PropsWithChildren, ReactNode } from 'react'

export const HeaderAction = ({
	children,
	onClick,
	...attributes
}: PropsWithChildren<{
	children?: ReactNode
	onClick: () => void
	attributes?: { [key: string]: string }[]
}>) => (
	<button className="ui-ml-2" onClick={onClick} {...attributes}>
		{children}
	</button>
)
