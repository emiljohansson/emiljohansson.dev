'use client'

import { PropsWithChildren, useEffect, useMemo, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useClickOutside } from '@/hooks/useClickOutside'
import { Tables } from '@/lib/database.types'
import { action, atom } from 'nanostores'
import { useStore } from '@nanostores/react'

export const $commandMenuIsOpen = atom(false)
export const openCommandMenu = action(
	$commandMenuIsOpen,
	'openCommandMenu',
	() => $commandMenuIsOpen.set(true),
)
export const closeCommandMenu = action(
	$commandMenuIsOpen,
	'closeCommandMenu',
	() => $commandMenuIsOpen.set(false),
)

export function CommandMenu({ projects }: { projects: Tables<'project'>[] }) {
	const commandMenuIsOpen = useStore($commandMenuIsOpen)
	const initList = useMemo(
		() => [
			{
				href: '/',
				title: 'Home',
				description: 'Return to the home page.',
				test: 'home-page',
			} as Tables<'project'>,
			...projects,
		],
		[],
	)
	const router = useRouter()
	const [selectedIndex, setSelectedIndex] = useState(0)
	const [list, setList] = useState(initList)
	const fieldRef = useRef<HTMLInputElement>(null)

	const handleAction = (action?: Tables<'project'>) => {
		if (!action) return
		setList([...initList])
		closeCommandMenu()
		router.push(action.href)
	}

	useEffect(() => {
		fieldRef.current?.focus()
		const onKeyDown = (event: KeyboardEvent) => {
			if (event.metaKey && event.key === 'k') {
				event.preventDefault()
				openCommandMenu()
				return
			}
			if (!commandMenuIsOpen) return
			if (!['ArrowUp', 'ArrowDown', 'Escape', 'Enter'].includes(event.key)) {
				return
			}
			event.preventDefault()
			if (event.key === 'ArrowUp') {
				let newIndex = selectedIndex - 1
				if (newIndex < 0) newIndex = list.length - 1
				setSelectedIndex(newIndex)
			}
			if (event.key === 'ArrowDown') {
				let newIndex = selectedIndex + 1
				if (newIndex >= list.length) newIndex = 0
				setSelectedIndex(newIndex)
			}
			if (event.key === 'Escape') closeCommandMenu()
			if (event.key === 'Enter') {
				handleAction(list[selectedIndex])
			}
		}

		document.addEventListener('keydown', onKeyDown)

		return () => document.removeEventListener('keydown', onKeyDown)
	}, [selectedIndex, list, commandMenuIsOpen])

	if (!commandMenuIsOpen) return null

	return (
		<Modal onClose={closeCommandMenu}>
			<div className="flex items-center border-gray-200 border-b">
				<input
					ref={fieldRef}
					id="input1"
					className="input text-sm border-none px-4 py-6 flex-1"
					placeholder="Type a command or search..."
					onChange={(event) => {
						setSelectedIndex(0)
						setList(
							initList.filter(
								({ title }) =>
									title.toLowerCase().indexOf(event.currentTarget.value) > -1,
							),
						)
					}}
				/>
			</div>
			<span className="sr-only">{selectedIndex}</span>
			<div className="p-2">
				{list.map((project, index) => (
					<div
						key={index}
						className="aria-selected:bg-gray-300 text-sm px-2 py-2 rounded"
						aria-selected={index === selectedIndex}
						onMouseOver={() => setSelectedIndex(index)}
						onClick={() => handleAction(list[index])}
					>
						{project.title}
					</div>
				))}
			</div>
		</Modal>
	)
}

const Modal = ({
	children,
	onClose,
}: PropsWithChildren<{ onClose: () => void }>) => {
	const rootRef = useClickOutside<HTMLDivElement>(onClose)

	return (
		<>
			<div className="fixed inset-0 z-40 min-h-screen">
				<div
					ref={rootRef}
					className="w-full max-w-md rounded shadow-xl overflow-hidden mx-auto mt-20"
				>
					<div className="bg-white dark:bg-black-rich rounded border-gray-200 border">
						{children}
					</div>
				</div>
			</div>
			<div className="fixed inset-0 z-30 bg-gray-100 bg-opacity-10 backdrop-blur"></div>
		</>
	)
}
