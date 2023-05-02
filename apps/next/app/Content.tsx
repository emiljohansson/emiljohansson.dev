'use client'

import type { Project } from './types'

import Link from 'next/link'
import { GitHubLogoIcon, ExternalLinkIcon } from '@radix-ui/react-icons'
import { AccessibleIcon } from '@radix-ui/react-accessible-icon'
import { ThemeToggle } from 'ui'

export function Content({ projects }: { projects: Project[] }) {
	return (
		<>
			<ThemeToggle />
			<div className="flex items-center text-5xl h-screen font-bold">
				<h1 className="mx-auto">
					<Link
						href="https://github.com/emiljohansson"
						className="px-2 pb-2"
						target="_blank"
						rel="noreferrer"
					>
						<AccessibleIcon label="GitHub">
							<GitHubLogoIcon
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
			</div>
			<div className="h-screen p-3 m-0 max-w-md mx-auto">
				{projects.map(({ title, href, description, external, test }, index) => (
					<Link
						key={index}
						href={href}
						className="
              flex flex-col link shadow-md rounded-2xl p-4 m-3 relative
              ease-in-out duration-100
              hover:no-underline hover:-translate-y-1 hover:shadow-lg
              dark:hover:bg-black-900 dark:shadow-lg-white
            "
						target={external ? '_blank' : undefined}
						data-test={test}
					>
						<span className="flex items-center mb-1">
							{title}{' '}
							{external && (
								<ExternalLinkIcon
									width={18}
									height={18}
									className="absolute right-3"
								/>
							)}
						</span>
						<p className="text-gray-600 text-xs no-underline">{description}</p>
					</Link>
				))}
			</div>
		</>
	)
}
