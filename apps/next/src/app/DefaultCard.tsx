import type { Tables } from '@/lib/database.types'
import { ArrowUpRightFromSquare } from 'lucide-react'

export function DefaultCard({
	title,
	description,
	external,
}: Partial<Tables<'project'>> & { external: boolean }) {
	return (
		<>
			<span className="flex items-center mb-1">
				{title}{' '}
				{external && (
					<ArrowUpRightFromSquare size={18} className="absolute right-3" />
				)}
			</span>
			<DefaultCardSubTitle description={description} />
		</>
	)
}

export function DefaultCardSubTitle({ description }: { description?: string }) {
	return (
		<p className="text-gray-600 dark:text-gray-400 text-xs no-underline">
			{description}
		</p>
	)
}
