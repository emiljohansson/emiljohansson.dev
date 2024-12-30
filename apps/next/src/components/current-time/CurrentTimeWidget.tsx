import { CurrentTime } from '@/components/current-time/CurrentTime'
import Link from 'next/link'

export function CurrentTimeWidget() {
	return (
		<Link href="/current-time" className="flex items-center">
			<CurrentTime />
		</Link>
	)
}
