import type { PropsWithChildren } from 'react'
import type { Metadata } from 'next'
import type { Project } from './types'

import './styles.css'
import 'ui/globals.css'

import { cookies } from 'next/headers'
import { sql } from '@vercel/postgres'
import { CommandPrompt } from './CommandPrompt'

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
	const { rows: projects } = await sql<Project>`select * from projects`
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
			<body className="dark:bg-black-rich dark:text-white h-full">
				<main className="h-full">{children}</main>
				<CommandPrompt projects={projects} />
			</body>
		</html>
	)
}
