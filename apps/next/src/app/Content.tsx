'use client'

import Link from 'next/link'
import { AccessibleIcon } from '@radix-ui/react-accessible-icon'
import { FiCommand, FiExternalLink } from 'react-icons/fi'
import { GrGithub } from 'react-icons/gr'
import { useCommandMenu } from './CommandMenu'
import { Tables } from '@/lib/database.types'

export function Content({ projects }: { projects: Tables<'project'>[] }) {
	const { openCommandMenu } = useCommandMenu()
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
				<button className="btn-outline flex" onClick={() => openCommandMenu()}>
					Command Menu{' '}
					<span
						className="
							flex items-center gap-1
							bg-gray-300 dark:bg-zinc-900
							px-1 py-0.5 
							text-xs text-gray-600 
							rounded
						"
					>
						<FiCommand /> K
					</span>
				</button>
			</div>
			<div className="h-screen p-3 m-0 max-w-md mx-auto">
				{projects.map(({ title, href, description, test }, index) => {
					const external = href.startsWith('http')

					return (
						<Link
							key={index}
							href={href}
							className="
              flex flex-col rounded-md p-4 m-3 relative
							bg-white dark:bg-black
              ease-in-out duration-100
							shadow-sm 
              hover:no-underline hover:-translate-y-1 hover:shadow-lg
              dark:shadow-lg-white
            "
							target={external ? '_blank' : undefined}
							data-test={test}
						>
							<span className="flex items-center mb-1">
								{title}{' '}
								{external && (
									<FiExternalLink
										width={18}
										height={18}
										className="absolute right-3"
									/>
								)}
							</span>
							<p className="text-gray-600 text-xs no-underline">
								{description}
							</p>
						</Link>
					)
				})}
			</div>
		</>
	)
}
