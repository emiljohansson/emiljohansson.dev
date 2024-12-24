import type { FunctionComponent, ReactNode } from 'react'
import { classNames } from '@repo/lib/utils/string'

const Section: FunctionComponent<{
	children: ReactNode
	size?: 'normal' | 'medium' | 'large'
	direction?: 'row' | 'column'
}> = ({ children, direction = 'row', size = 'normal' }) => (
	<div
		className={classNames('flex items-center justify-center h-full', {
			'flex-col': direction === 'column',
			'text-base': size === 'normal',
			'text-3xl': size === 'medium',
			'text-5xl': size === 'large',
		})}
	>
		{children}
	</div>
)

export default Section
