import type { Tables } from '@/lib/database.types'
import Link from 'next/link'
import { AccessibleIcon } from '@radix-ui/react-accessible-icon'
import { GrGithub } from 'react-icons/gr'
import { ArrowUpRightFromSquare } from 'lucide-react'
import { CommandTrigger } from './CommandMenu'
import { Card as CurrentTimeCard } from './current-time/Card'
import { Card as RandomStringCard } from './random-string/Card'
import { Card as WeatherCard } from './weather/Card'

const customCards = {
	default: DefaultCard,
	'current-time': CurrentTimeCard,
	'random-string': RandomStringCard,
	weather: WeatherCard,
}
type CardKeys = keyof typeof customCards

function DefaultCard({
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
			<p className="text-gray-600 text-xs no-underline">{description}</p>
		</>
	)
}

export function Content({ projects }: { projects: Tables<'project'>[] }) {
	return (
		<>
			<div className="flex flex-col gap-4 items-center justify-center text-center h-1/2">
				<h1 className="mx-auto text-5xl font-bold">
					<Link
						href="https://github.com/emiljohansson"
						className="px-2 pb-2"
						target="_blank"
						rel="noreferrer"
					>
						<AccessibleIcon label="GitHub">
							<GrGithub
								width="50"
								height="50"
								className="inline-block text-fuchsia-600"
							/>
						</AccessibleIcon>{' '}
						<span className="bg-gradient-to-r from-fuchsia-600 to-orange-500 bg-clip-text text-transparent">
							emiljohansson
						</span>
					</Link>
				</h1>
				<CommandTrigger />
			</div>
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 h-screen p-3 m-0 max-w-7xl mx-auto">
				{projects.map((project, index) => {
					const { href, test } = project
					const external = href.startsWith('http')
					const key = (
						test !== null && test in customCards ? test : 'default'
					) as CardKeys
					const Card = customCards[key]

					return (
						<Link
							key={index}
							href={href}
							className="
              rounded-md p-4 m-3 relative
							min-h-[100px]
							bg-white dark:bg-black
              ease-in-out duration-100
							shadow-sm 
              hover:no-underline hover:-translate-y-1 hover:shadow-lg
              dark:shadow-lg-white
            "
							target={external ? '_blank' : undefined}
							data-test={test}
						>
							<Card {...project} external={external} />
						</Link>
					)
				})}
			</div>
		</>
	)
}
