'use client'

import Link from 'next/link'
import { GitHubLogoIcon, ExternalLinkIcon } from '@radix-ui/react-icons'
import { AccessibleIcon } from '@radix-ui/react-accessible-icon'

// const AccessibleIcon = ({ children, label }): AccessibleIconPrimitive.AccessibleIcon => {
//   <AccessibleIconPrimitive.Root
//     label={label}
//   >
//     {children}
//   </AccessibleIconPrimitive.Root>
// }

const projects = [
	{
		href: 'https://emiljohansson.dev/design',
		text: 'Design System',
		external: true,
		description: 'Design system for the apps developed by Emil Johansson.',
		test: 'design-system',
	},
	{
		href: 'https://pw.emiljohansson.dev',
		text: 'Password Manager',
		external: true,
		description: 'Password manager for the apps developed by Emil Johansson.',
		test: 'password-manager',
	},
	{
		href: 'https://games.emiljohansson.dev',
		text: 'Card Games',
		external: true,
		description: 'Some simple card games.',
		test: 'games',
	},
	{
		href: '/password-generator',
		text: 'Password Generator',
		description: 'Generate a password that is difficult to guess.',
		test: 'password-generator',
	},
	{
		href: '/random-string',
		text: 'Random String',
		description: 'Generate a random string of characters.',
		test: 'random-string',
	},
	{
		href: '/current-time',
		text: 'Current Time',
		description: 'Get the current time.',
		test: 'current-time',
	},
	{
		href: '/two-way-auth-generate',
		text: 'Two-Factor Authentication - Generate Code',
		description: 'Generate a two-factor authentication code.',
		test: 'two-way-auth-generate',
	},
	{
		href: '/two-way-auth-enter',
		text: 'Two-Factor Authentication - Enter Code',
		description: 'Enter a two-factor authentication code.',
		test: 'two-way-auth-enter',
	},
	{
		href: '/progress-bar',
		text: 'Progress Bar',
		description: 'Progress bar with a percentage.',
		test: 'progress-bar',
	},
	{
		href: '/confirm-button',
		text: 'Confirm Button',
		description: 'Hold down the button to confirm the action.',
		test: 'confirm-button',
	},
	{
		href: '/ms',
		text: 'Mine Sweaper',
		description: 'Mine sweaper game.',
		test: 'mine-sweaper',
	},
	{
		href: '/calculate',
		text: 'Calculate',
		description: 'Calculate a mathematical expression from an API route.',
		test: 'calculate',
	},
	{
		href: '/hooks',
		text: 'Hooks',
		description: 'Custom React Hooks.',
		test: 'hooks',
	},
	{
		href: '/encryption',
		text: 'Encrypt and Decrypt Strings',
		description: 'Encrypts and Decrypts a string.',
		test: 'encryption',
	},
]

export default function Page() {
	return (
		<>
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
						{/* <style jsx>{`
							.title {
								background: linear-gradient(
									97.2deg,
									#ad52dd -8.65%,
									#e64937 110.27%
								);
								background-clip: border-box;
								background-clip: border-box;
								-webkit-text-fill-color: transparent;
								-webkit-background-clip: text;
							}
						`}</style> */}
						<span className="bg-gradient-to-r from-fuchsia-600 to-orange-500 bg-clip-text text-transparent">
							emiljohansson
						</span>
					</Link>
				</h1>
			</div>
			<div className="h-screen p-3 m-0 max-w-md mx-auto">
				{projects.map(({ text, href, description, external, test }, index) => (
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
							{text}{' '}
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
