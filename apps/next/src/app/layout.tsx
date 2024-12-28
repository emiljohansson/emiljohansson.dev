import type { PropsWithChildren } from 'react'
import type { Metadata } from 'next'

import '@repo/ui/styles.css'
import './styles.css'

import { headers } from 'next/headers'
import Link from 'next/link'
import Image from 'next/image'
import { Analytics } from '@vercel/analytics/react'
import { CommandMenu } from './CommandMenu'
// import { ThemeToggle } from './ThemeToggle'
import { HeaderCurrentProject } from './HeaderCurrentProject'
import { Inter } from 'next/font/google'
import { getProjects } from '@/lib/supabase'
import { Tables } from '@/lib/database.types'
import { WeatherWidget } from '@/components/WeatherWidget'

const inter = Inter({ weight: ['400', '500', '700'], subsets: ['latin'] })

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
	const headersList = await headers()
	const pathname = headersList.get('x-url-pathname') || ''
	const projects = await getProjects()
	const currentProject = (projects as Tables<'project'>[]).find(
		(project) => project.href === pathname,
	)
	// const cookieStore = cookies()
	// const theme = cookieStore.get('theme')
	// ${theme?.value}

	return (
		<html lang="en" className={`h-full`}>
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
			<body
				className={`
					${inter.className}
					bg-[length:15px_15px] bg-dots
					bg-slate-50 dark:bg-gray-900
					dark:text-white
					flex flex-col h-full`}
			>
				{/* background-image: conic-gradient(at 92% 8%, rgb(134, 143, 151) 90deg, transparent 0deg, transparent 225deg, transparent 0deg);
				background-size: 15px 15px; */}
				<nav
					className="
						flex justify-between items-center
						bg-white dark:bg-black
						border-b border-slate-200 dark:border-zinc-700
						px-4 py-3
					"
				>
					<div className="flex items-center gap-4 text-sm font-medium">
						<Link href="/" className="flex items-center gap-2">
							<Image
								src="/images/profile2.jpeg"
								alt=""
								width={32}
								height={32}
								quality={100}
								className="rounded-full scale-x-[-1]"
							/>
							Emil Johansson
						</Link>
						<HeaderCurrentProject
							projects={projects || []}
							initProject={currentProject}
						/>
					</div>
					{/* <ThemeToggle initValue={theme?.value} /> */}
					<WeatherWidget />
				</nav>
				<main className="flex-1 relative">{children}</main>
				<CommandMenu projects={projects || []} />
				<Analytics />
			</body>
		</html>
	)
}
