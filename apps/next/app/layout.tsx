'use client'

import 'shared/globals.css'

import { PropsWithChildren, useEffect, useState } from 'react'
import { keysAreDown } from 'keyboard-handler'
import { useRouter } from 'next/navigation'

const projects = [
	{
		href: 'https://emiljohansson.dev/design',
		text: 'Design System',
		// external: true,
		description: 'Design system for the apps developed by Emil Johansson.',
		test: 'design-system',
	},
	{
		href: 'https://pw.emiljohansson.dev',
		text: 'Password Manager',
		// external: true,
		description: 'Password manager for the apps developed by Emil Johansson.',
		test: 'password-manager',
	},
	{
		href: 'https://games.emiljohansson.dev',
		text: 'Card Games',
		// external: true,
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
type Project = (typeof projects)[number]

export default function Layout({ children }: PropsWithChildren<unknown>) {
	const [showCommand, setShowCommand] = useState(false)

	useEffect(() => {
		const removeKeysAreDown = keysAreDown(['Meta', 'k'], () => {
			console.log('Enter')
			setShowCommand(true)
		})

		return () => {
			console.log('remove')

			removeKeysAreDown()
		}
	}, [])
	return (
		<html lang="en" className="h-full">
			<body className="dark:bg-black-rich dark:text-white h-full">
				<main className="h-full">{children}</main>
				{showCommand && <Command onClose={() => setShowCommand(false)} />}
			</body>
		</html>
	)
}

const Command = ({ onClose }: { onClose: () => void }) => {
	const router = useRouter()
	const [selectedIndex, setSelectedIndex] = useState(0)

	const handleAction = (action?: Project) => {
		console.log(action)
		if (!action) return
		router.push(action.href)
	}

	useEffect(() => {
		const onKeyDown = (event: KeyboardEvent) => {
			if (!['ArrowUp', 'ArrowDown', 'Escape', 'Enter'].includes(event.key)) {
				return
			}
			event.preventDefault()
			console.log('key', event.key, selectedIndex, selectedIndex - 1, selectedIndex + 1)
			if (event.key === 'ArrowUp') setSelectedIndex(selectedIndex - 1)
			if (event.key === 'ArrowDown') setSelectedIndex(selectedIndex + 1)
			if (event.key === 'Escape') onClose()
			if (event.key === 'Enter') {
				handleAction(projects[selectedIndex])
				onClose()
			}
		}

		document.addEventListener('keydown', onKeyDown)

		return () => {
			document.removeEventListener('keydown', onKeyDown)
		}
	}, [selectedIndex])

	return (
		<Modal>
			<div>search field and close button - {selectedIndex}</div>
			<div>
				{projects.map((project, index) => (
					<div
						key={index}
						className="aria-selected:bg-black-500"
						aria-selected={index === selectedIndex}
					>
						{project.text}
					</div>
				))}
			</div>
		</Modal>
	)
}

const Modal = ({ children }: PropsWithChildren) => {
	return (
		<div>
			<div className="fixed inset-0 z-40 min-h-screen flex items-center justify-center">
				<div className="w-full max-w-md rounded border-gray-100 shadow-xl overflow-hidden">
					<div className="bg-white p-4">{children}</div>
				</div>
			</div>
			<div className="fixed inset-0 z-30 bg-gray-100 bg-opacity-10 backdrop-blur"></div>
		</div>
	)
}
