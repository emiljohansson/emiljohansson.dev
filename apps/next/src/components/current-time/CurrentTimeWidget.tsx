'use client'

import { CurrentTime } from '@/components/current-time/CurrentTime'
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'

export function CurrentTimeWidget() {
	return (
		<Link
			href="/current-time"
			className={`flex items-center ${buttonVariants({
				variant: 'ghost',
			})}`}
		>
			<CurrentTime />
		</Link>
	)
}
