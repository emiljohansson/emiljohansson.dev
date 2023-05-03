import type { PropsWithChildren } from 'react'
import type { Metadata } from 'next'
import type { Project } from './types'

import './styles.css'
import 'ui/globals.css'

import { cookies, headers } from 'next/headers'
import Link from 'next/link'
import Image from 'next/image'
import { sql } from '@vercel/postgres'
import { Analytics } from '@vercel/analytics/react'
import { CommandPrompt } from './CommandPrompt'
import { ThemeToggle } from './ThemeToggle'
import { HeaderCurrentProject } from './HeaderCurrentProject'

const name = 'Emil Johansson'
const siteTitle = 'emiljohansson.dev'
const description = "Emil's development playground."

export const metadata: Metadata = {
	title: `Welcome to ${siteTitle}`,
	description,
	authors: [
		{
			name,
			url: `https://${siteTitle}`,
		},
	],
	manifest: '/images/logo/site.webmanifest',
	icons: {
		icon: [
			{
				url: '/images/logo/favicon-32x32.png',
				sizes: '32x32',
				type: 'image/png',
			},
			{
				url: '/images/logo/favicon-16x16.png',
				sizes: '16x16',
				type: 'image/png',
			},
		],
		apple: '/images/logo/apple-touch-icon.png',
	},
	openGraph: {
		title: siteTitle,
		description,
		images: `https://og-image.vercel.app/${encodeURI(
			siteTitle,
		)}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.zeit.co%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`,
	},
	twitter: {
		card: 'summary_large_image',
	},
}

export default async function Layout({ children }: PropsWithChildren<unknown>) {
	const headersList = headers()
	const pathname = headersList.get('x-url-pathname') || ''
	const { rows: projects } = await sql<Project>`select * from projects`
	const currentProject = projects.find((project) => project.href === pathname)
	const cookieStore = cookies()
	const theme = cookieStore.get('theme')

	return (
		<html lang="en" className={`h-full ${theme?.value}`}>
			<head>
				{/* <link
					rel="apple-touch-icon"
					sizes="180x180"
					href="/images/logo/apple-touch-icon.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="32x32"
					href="/images/logo/favicon-32x32.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="16x16"
					href="/images/logo/favicon-16x16.png"
				/> */}
			</head>
			<body className="dark:bg-black-rich dark:text-white flex flex-col h-full">
				<nav className="bg-white dark:bg-black-rich border-b border-slate-200 dark:border-zinc-700 flex justify-between px-4 py-3">
					<div className="flex items-center gap-4 text-sm font-medium">
						<Link href="/" className="flex items-center gap-2">
							<Image
								src="/images/profile.jpg"
								alt=""
								width={32}
								height={32}
								className="rounded-full"
							/>
							Emil Johansson
						</Link>
						<HeaderCurrentProject
							projects={projects}
							initProject={currentProject}
						/>
					</div>
					<ThemeToggle initValue={theme?.value} />
				</nav>
				<main className="flex-1 relative">{children}</main>
				<CommandPrompt projects={projects} />
				<Analytics />
			</body>
		</html>
	)
}
